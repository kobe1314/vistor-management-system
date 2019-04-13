import { CHANGE_bread } from './actionTypes';

export const changeBread = breadText => ({
  type: CHANGE_bread,
  payload: {
    breadText:breadText
  }
});


