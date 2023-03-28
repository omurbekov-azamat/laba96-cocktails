import express from 'express';
import {imagesUpload} from '../multer';
import {promises as fs} from "fs";
import {Error} from "mongoose";
import crypto from "crypto";
import User from '../modules/User';

const usersRouter = express.Router();

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.file && req.file.filename,
            token: crypto.randomUUID(),
        });
        return res.send({message: 'Registered successfully', user});
    } catch (error) {
        if (req.file) {
            await fs.unlink(req.file.path);
        }
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

usersRouter.post('/sessions', async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(400).send({error: 'Username not found'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Password is wrong'});
    }

    try {
        user.generateToken();
        await user.save();
        return res.send({message: 'Username and password correct', user});
    } catch (e) {
        return res.status(400);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
   try {
       const token = req.get('Authorization');
       const success = {message: 'OK'};

       if (!token) {
           return res.send(success);
       }

       const user = await User.findOne({token});

       if (!user) {
           return res.send(success);
       }

       user.generateToken();
       await user.save();
       return res.send(success);
   }  catch (e) {
       return next(e);
   }
});

export default usersRouter;