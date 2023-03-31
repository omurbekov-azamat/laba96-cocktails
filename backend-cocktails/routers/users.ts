import express from 'express';
import {promises as fs} from "fs";
import {Error} from "mongoose";
import crypto from "crypto";
import {OAuth2Client} from 'google-auth-library';
import {imagesUpload} from '../multer';
import User from '../modules/User';
import config from '../config';
import {downloadFile} from '../helpers';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
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
        return res.status(400).send({error: 'Email not found'});
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

usersRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        });
        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).send({error: 'Wrong Google token!'});
        }

        const email = payload['email'];
        const googleId = payload['sub'];
        const displayName = payload['name'];
        const avatar = payload['picture'];

        if (!email) {
            return res.status(400).send({error: 'Not enough user data'});
        }

        let user = await User.findOne({googleId});

        const photoName = 'images/' + crypto.randomUUID() + '.jpg';

        await downloadFile(avatar!, photoName);

        if (!user) {
            user = new User({
                email,
                password: crypto.randomUUID(),
                displayName,
                googleId,
                avatar: photoName,
            });
        }

        user.generateToken();
        await user.save();
        return res.send({message: 'Login with Google successful!', user});
    } catch (e) {
        return next(e);
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