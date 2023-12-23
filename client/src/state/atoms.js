import { atom } from 'recoil';

export const recipesState = atom({
  key: 'recipesState',
  default: [],
});

export const listDisplayState = atom({
  key: 'listDisplayState',
  default: false,
});