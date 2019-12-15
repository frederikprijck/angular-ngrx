import { Component } from "@angular/core";
import { ShowsService } from "./shows/shows.service";
import { Subject } from "rxjs";

import { Store, select } from "@ngrx/store";
import { selectShows } from "./state/selectors";
import * as showsActions from "./state/actions";

@Component({
  selector: "app-all-shows",
  templateUrl: "./all-shows.component.html"
})
export class AllShowsComponent {
  refreshShows$ = new Subject();
  shows$ = this.store.pipe(select(selectShows));

  constructor(private showsService: ShowsService, private store: Store<any>) {}

  favoriteShow(showId) {
    this.store.dispatch(showsActions.favoriteShowClicked({ showId }));
  }

  unfavoriteShow(showId) {
    this.store.dispatch(showsActions.unfavoriteShowClicked({ showId }));
  }

  removeShow(showId) {
    this.store.dispatch(showsActions.removeShowClicked({ showId }));
  }
}
