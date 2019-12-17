import { createSelector } from "@ngrx/store";
import { Show } from "../shows/shows.service";

export interface AppState {
  shows: Array<Show>;
}

export const selectShows = (state: AppState) => state.shows;
export const selectFavoriteShows = createSelector(
  selectShows,
  shows => shows.filter(show => show.isFavorite)
);
