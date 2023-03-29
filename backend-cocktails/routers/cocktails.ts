import {promises as fs} from 'fs';
import mongoose, {HydratedDocument} from 'mongoose';
import express from 'express';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import {imagesUpload} from '../multer';
import Cocktail from '../modules/Cocktail';
import User from '../modules/User';
import {ICocktail} from '../types';

const cocktailsRouter = express.Router();

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const cocktail = await Cocktail.create({
            user: req.body.user,
            name: req.body.name,
            image: req.file && req.file.filename,
            recipe: req.body.recipe,
            ingredients: req.body.ingredients,
        });
        return res.send(cocktail);
    } catch (e) {
        if (req.file) {
            await fs.unlink(req.file.path);
        }
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

cocktailsRouter.get('/', async (req, res, next) => {
    const token = req.get('Authorization');
    try {
        if (!token) {
            const cocktails = await Cocktail.find({isPublished: true}).select(['image', 'name', 'isPublished']);
            if (!cocktails) {
                return res.status(404).send({error: 'Cocktails are not found'});
            }
            return res.send(cocktails);
        }

        const user = await User.findOne({token});

        if (!user) {
            return res.status(401).send({error: 'Wrong token!'});
        }

        if (user.role === 'user') {
            const cocktails = await Cocktail.find({user}).select(['image', 'name', 'isPublished']);
            if (!cocktails) {
                return res.status(404).send({error: 'Cocktails are not found'});
            }
            return res.send(cocktails);
        }

        if (user.role === 'admin') {
            const cocktails = await Cocktail.find().select(['image', 'name', 'isPublished']);
            if (!cocktails) {
                return res.status(404).send({error: 'Cocktails are not found'});
            }
            return res.send(cocktails);
        }
    } catch (e) {
        return next(e);
    }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
    const token = req.get('Authorization');
    try {
        if (!token) {
            const cocktail = await Cocktail.find({isPublished: true, _id: req.params.id});
            if (!cocktail) {
                return res.status(404).send({error: 'Cocktail is not found'});
            }
            return res.send(cocktail);
        }

        const user = await User.findOne({token});
        if (!user) {
            return res.status(401).send({error: 'Wrong token!'});
        }

        if (user.role === 'user') {
            const cocktail = await Cocktail.findById(req.params.id);
            if (!cocktail) {
                return res.status(404).send({error: 'Cocktail is not found'});
            }
            return res.send(cocktail);
        }

        if (user.role === 'admin') {
            const cocktail = await Cocktail.findById(req.params.id);
            if (!cocktail) {
                return res.status(404).send({error: 'Cocktail is not found'});
            }
            return res.send(cocktail);
        }
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);

        if (!cocktail) {
            return res.status(404).send({error: 'Cocktail is not found'});
        }

        await Cocktail.deleteOne(cocktail._id);
        return res.send({message: 'Delete was successfully!'});
    } catch (e) {
        return next(e);
    }
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    const cocktail: HydratedDocument<ICocktail> | null = await Cocktail.findById(req.params.id);

    if (!cocktail) {
        return res.status(404).send({error: 'Cocktail is not found'});
    }

    cocktail.isPublished = !cocktail.isPublished;

    try {
        await cocktail.save();
        return res.send({message: 'isPublished successfully changed!', cocktail});
    } catch (e) {
        return next(e);
    }
});

export default cocktailsRouter;