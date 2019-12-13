import { Component } from '@angular/core';
import { ShowsService } from './shows/shows.service';
import { Subject } from 'rxjs';

import { switchMap, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-shows',
  templateUrl: './favorite-shows.component.html'
})
export class FavoriteShowsComponent {
  refreshShows$ = new Subject();
  shows$ = this.refreshShows$.pipe(
    startWith(null),
    switchMap(() => this.showsService.getAll()),
    map(shows => shows.filter(show => show.isFavorite))
  );

  constructor(private showsService: ShowsService) {}

  favoriteShow(showId) {
    this.showsService
      .favoriteShow(showId)
      .subscribe(() => this.refreshShows$.next());
  }

  unfavoriteShow(showId) {
    this.showsService
      .unfavoriteShow(showId)
      .subscribe(() => this.refreshShows$.next());
  }

  removeShow(showId) {
    this.showsService
      .removeShow(showId)
      .subscribe(() => this.refreshShows$.next());
  }
}
