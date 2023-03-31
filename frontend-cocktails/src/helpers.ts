import {Rating} from './types';

export const getAverage = (array: Rating[]) => {
    if (array.length > 0) {
        const sum = array.reduce((acc, item) => acc + item.grade, 0);
        const total = sum / array.length;
        return total.toFixed(1)
    } else {
        return 0;
    }
};