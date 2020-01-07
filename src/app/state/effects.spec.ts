import { Observable } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { ShowsEffects } from "./effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import {
  appLoaded,
  getAllSuccess,
  favoriteShowSuccess,
  favoriteShowClicked,
  unfavoriteShowClicked,
  unfavoriteShowSuccess,
  removeShowClicked,
  removeShowSuccess
} from "./actions";

import { TestScheduler } from "rxjs/testing";
import { ShowsService } from "../shows/shows.service";

describe("OriginEffects", () => {
  const initialState = { shows: [] };
  let effects: ShowsEffects;
  let actions: Observable<any>;
  let showsService = jasmine.createSpyObj("showsService", [
    "getAll",
    "favoriteShow",
    "unfavoriteShow",
    "removeShow"
  ]);
  let store: MockStore<any>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShowsEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: ShowsService, useValue: showsService }
      ]
    });

    effects = TestBed.get(ShowsEffects);
    store = TestBed.get(Store);
    store.setState({});

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });

  describe("getAllShows$", () => {
    it("should return action", () => {
      const shows = [];
      const action = appLoaded();
      const outcome = getAllSuccess({ shows });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot("-a", { a: action });
        const response = cold("-b|", { b: shows });
        showsService.getAll.and.returnValue(response);

        expectObservable(effects.getAllShows$).toBe("--b", { b: outcome });
      });
    });
  });

  describe("favoriteShow$", () => {
    it("should return action", () => {
      const showId = 1;
      const action = favoriteShowClicked({ showId });
      const outcome = favoriteShowSuccess({ showId });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot("-a", { a: action });
        const response = cold("-b|", { b: "a" });
        showsService.favoriteShow.and.returnValue(response);

        expectObservable(effects.favoriteShow$).toBe("--b", { b: outcome });
      });
    });
  });

  describe("unfavoriteShow$", () => {
    it("should return action", () => {
      const showId = 1;
      const action = unfavoriteShowClicked({ showId });
      const outcome = unfavoriteShowSuccess({ showId });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot("-a", { a: action });
        const response = cold("-b|", { b: "a" });
        showsService.unfavoriteShow.and.returnValue(response);

        expectObservable(effects.unfavoriteShow$).toBe("--b", {
          b: outcome
        });
      });
    });
  });

  describe("removeShow$", () => {
    it("should return action", () => {
      const showId = 1;
      const action = removeShowClicked({ showId });
      const outcome = removeShowSuccess({ showId });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot("-a", { a: action });
        const response = cold("-b|", { b: "a" });
        showsService.removeShow.and.returnValue(response);

        expectObservable(effects.removeShow$).toBe("--b", {
          b: outcome
        });
      });
    });
  });
});
