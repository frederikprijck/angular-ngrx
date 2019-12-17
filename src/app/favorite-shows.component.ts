import { Component } from '@angular/core';
import { ShowsService } from './shows/shows.service';

import { Store, select } from '@ngrx/store';
import { selectFavoriteShows } from './state/selectors';
import * as showsActions from './state/actions';

@Component({
  selector: 'app-favorite-shows',
  templateUrl: './favorite-shows.component.html'
})
export class FavoriteShowsComponent {
  shows$ = this.store.pipe(select(selectFavoriteShows))

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
