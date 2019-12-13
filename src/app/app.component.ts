import { Component } from "@angular/core";
import { ShowsService } from "./shows/shows.service";
import { Subject } from "rxjs";

import { switchMap, startWith, map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "thisdot-ngrx";
  refreshShows$ = new Subject();
  shows$ = this.refreshShows$.pipe(
    startWith(null),
    switchMap(() => this.showsService.getAll())
  );

  favoriteShows$ = this.shows$.pipe(map(shows => shows.filter(show => show.isFavorite)));

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
}
