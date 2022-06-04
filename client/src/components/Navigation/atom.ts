import {atom} from 'recoil';

export const windowWideState = atom<boolean> ({
    key: 'windowWideState',
    default: false
});