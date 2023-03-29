import crypto from 'crypto';
import mongoose from "mongoose";
import config from "./config";
import User from './modules/User';
import Cocktail from './modules/Cocktail';

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('cocktails');
    } catch (e) {
        console.log('Collections were not present');
    }

    const [user, admin] = await User.create({
        email: 'user',
        password: '123',
        displayName: 'user',
        avatar: 'fixtures/anonymous.jpg',
        token: crypto.randomUUID(),
    }, {
        email: 'admin',
        password: '123',
        displayName: 'admin',
        avatar: 'fixtures/anonymous.jpg',
        token: crypto.randomUUID(),
        role: 'admin'
    });

    await Cocktail.create({
        user: user._id,
        name: 'Pina colada',
        image: 'fixtures/pina-colada.jpg',
        recipe: 'Pulse all the ingredients along with a handful of ice in a blender until smooth. Pour into a tall glass and garnish as you like.',
        ingredients: [
            {name: 'pineapple juice', amount: '120ml'},
            {name: 'white rum', amount: '60ml'},
            {name: 'coconut cream', amount: '60ml'},
            {name: 'wedge of pineapple, to garnish ', amount: '1 piece'},
        ],
    }, {
        user: user._id,
        name: 'Long island iced tea',
        image: 'fixtures/long-island-iced-tea.jpg',
        recipe: 'Add the vodka, rum, tequila, gin, triple sec, simple syrup and lemon juice to a Collins glass filled with ice. Top with a splash of the cola and stir briefly. Garnish with a lemon wedge. Serve with a straw.',
        ingredients: [
            {name: 'silver tequila', amount: '15ml'},
            {name: 'gin', amount: '15ml'},
            {name: 'triple sec', amount: '15ml'},
            {name: 'vodka', amount: '15ml'},
            {name: 'white rum', amount: '15ml'},
            {name: 'sugar syrup', amount: '15ml'},
            {name: 'lemon juice', amount: '15ml'},
            {name: 'cola', amount: '250ml'},
            {name: 'Garnish: lemon wedge', amount: '1 piece'},
        ],
        isPublished: true,
    }, {
        user: admin._id,
        name: 'cosmopolitan',
        image: 'fixtures/cosmopolitan.jpg',
        recipe: 'Shake ingredients in a cocktail shaker with ice and strain into a cocktail glass.',
        ingredients: [
            {name: 'vodka', amount: '45ml'},
            {name: 'triple sec', amount: '15ml'},
            {name: 'cranberry juice', amount: '30ml'},
            {name: 'lime juice', amount: '10ml'},
        ],
    });

    await db.close();
}

void run();