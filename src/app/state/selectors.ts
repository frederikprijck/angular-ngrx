import { createSelector } from '@ngrx/store';
 
export interface FeatureState {
  counter: number;
}
 
export interface AppState {
  feature: FeatureState;
}
 
export const selectShows = (state: {shows}) => state.shows;
 
export const selectFavoriteShows = createSelector(
    selectShows,
  (shows) => shows.filter(show => show.isFavorite)
);