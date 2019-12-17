import { createAction, props } from '@ngrx/store';

export const appLoaded = createAction('[App] App Loaded');

export const getAllSuccess = createAction(
  '[Shows API] Get all shows success',
  props<{ shows }>()
);


export const favoriteShowClicked = createAction(
  '[Shows] favorite show',
  props<{ showId }>()
);

export const unfavoriteShowClicked = createAction(
  '[Shows] unfavorite show',
  props<{ showId }>()
);

export const removeShowClicked = createAction(
  '[Shows] remove show',
  props<{ showId }>()
);

export const getAllFailed = createAction('[Shows API] Get all shows failed');

export const favoriteShowSuccess = createAction(
  '[Shows API] favorite show success',
  props<{ showId }>()
);

export const unfavoriteShowSuccess = createAction(
  '[Shows API] unfavorite show success',
  props<{ showId }>()
);

export const removeShowSuccess = createAction(
  '[Shows API] remove show success',
  props<{ showId }>()
);
