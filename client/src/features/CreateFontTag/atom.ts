import {atom} from 'recoil';

export const fontIdState = atom<number> ({
    key: 'fontIdState',
    default: 0
});

export const tagIdState = atom<number> ({
    key: 'tagIdState',
    default: 0
});