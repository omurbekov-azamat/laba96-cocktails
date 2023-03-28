import crypto from 'crypto';
import mongoose from "mongoose";
import config from "./config";
import User from './modules/User';

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present');
    }

    await User.create({
        email: 'user@gmail.com',
        password: '123',
        displayName: 'user',
        avatar: null,
        token: crypto.randomUUID(),
    }, {
        email: 'admin@gmail.com',
        password: '123',
        displayName: 'admin',
        avatar: null,
        token: crypto.randomUUID(),
        role: 'admin'
    });
    await db.close();
}

void run();