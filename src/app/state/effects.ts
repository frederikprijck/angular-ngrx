import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import * as showsActions from "./actions";
import { ShowsService } from "../shows/shows.service";
import { exhaustMap, map } from "rxjs/operators";
import { of } from "rxjs";

const x = of(showsActions.getAllSuccess({ shows: null }));

@Injectable()
export class ShowsEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showsActions.appLoaded),
      exhaustMap(() =>
        this.showsService
          .getAll()
          .pipe(map(shows => showsActions.getAllSuccess({ shows })))
      )
    )
  );

  constructor(private actions$: Actions, private showsService: ShowsService) {}
}
