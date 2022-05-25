import {atom} from 'recoil';

export const char = atom<number> ({
    key: 'fontIdState',
    default: 1
});

export const tagIdState = atom<number> ({
    key: 'tagIdState',
    default: 1
});