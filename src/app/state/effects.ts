import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import {
  appLoaded,
  getAllSuccess,
  favoriteShowClicked,
  favoriteShowSuccess,
  unfavoriteShowClicked,
  unfavoriteShowSuccess,
  removeShowClicked,
  removeShowSuccess
} from './actions';
import { ShowsService } from '../shows/shows.service';
import { exhaustMap, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ShowsEffects {
  getAllShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appLoaded),
      exhaustMap(() =>
        this.showsService.getAll().pipe(map(shows => getAllSuccess({ shows })))
      )
    )
  );

  favoriteShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteShowClicked),
      mergeMap(({ showId }) =>
        this.showsService
          .favoriteShow(showId)
          .pipe(map(() => favoriteShowSuccess({ showId })))
      )
    )
  );

  unfavoriteShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unfavoriteShowClicked),
      mergeMap(({ showId }) =>
        this.showsService
          .unfavoriteShow(showId)
          .pipe(map(() => unfavoriteShowSuccess({ showId })))
      )
    )
  );

  removeShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeShowClicked),
      mergeMap(({ showId }) =>
        this.showsService
          .removeShow(showId)
          .pipe(map(() => removeShowSuccess({ showId })))
      )
    )
  );

  constructor(private actions$: Actions, private showsService: ShowsService) {}
}
