import { createReducer, on, Action } from "@ngrx/store";
import * as showsActions from "./actions";
import { Show } from "../shows/shows.service";

const showsReducer = createReducer<Array<Show>>(
  [],
  on(showsActions.getAllSuccess, (state, { shows }) => [...shows]),
  on(showsActions.favoriteShowClicked, (state, { showId }) =>
    state.map(show =>
      show.id === showId ? { ...show, isFavorite: true } : show
    )
  ),
  on(showsActions.unfavoriteShowClicked, (state, { showId }) =>
    state.map(show =>
      show.id === showId ? { ...show, isFavorite: false } : show
    )
  ),
  on(showsActions.removeShowClicked, (state, { showId }) =>
    state.filter(show => show.id !== showId)
  )
);

export function reducer(state: Array<Show>, action: Action) {
  return showsReducer(state, action);
}
