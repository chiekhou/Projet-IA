import { atom } from 'recoil';

export const recipesState = atom({
  key: 'recipesState',
  default: [],
});

export const listDisplayState = atom({
  key: 'listDisplayState',
  default: false,
});


export const chatDisplayState = atom({
  key: 'chatDisplayState',
  default: false,
});

export const selectedRecipeState = atom({
  key: 'selectedRecipeState',
  default: null,
});
