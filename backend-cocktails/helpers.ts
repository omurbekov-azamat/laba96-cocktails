import axios from 'axios';
import path from 'path';
import config from './config';
import fs from 'fs';

export const downloadFile = async (url: string, name: string) => {
    await axios.get(url, {responseType: 'stream'}).then((res) => {
        const photoPath = path.resolve((path.join(config.publicPath, name)));
        res.data.pipe(fs.createWriteStream(photoPath))
    });
};