/**
 * Action types
 */

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';

/**
 * Action creator
 */

export function setMovies(value) {
  console.log('SET_MOVIES action called');
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  console.log('SET_FILTER action called');
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  console.log('SET_USER action called');
  return { type: SET_USER, value };
}
