# ngrx-router-state-plus [![npm](https://img.shields.io/npm/v/ngrx-router-state-plus.svg)](https://www.npmjs.com/package/ngrx-router-state-plus) [![npm](https://img.shields.io/npm/dt/ngrx-router-state-plus.svg)](https://www.npmjs.com/package/ngrx-router-state-plus) [![Build Status](https://travis-ci.org/joseluisq/ngrx-router-state-plus.svg?branch=master)](https://travis-ci.org/joseluisq/ngrx-router-state-plus) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> [@ngrx/router-store](https://github.com/ngrx/platform/tree/master/modules/router-store) extension that provides [router state serialization](https://ngrx.io/guide/router-store/configuration#custom-router-state-serializer) with [a common payload-composed state](./src/router-state.ts) data.

## Features

- [Router state serialization](https://ngrx.io/guide/router-store/configuration#custom-router-state-serializer) out of the box.
- Route state payload that extend all [ActivatedRouteSnapshot](https://angular.io/api/router/ActivatedRouteSnapshot#description) properties.
- Selectors:
  - `selectRouterState()` selector to get current router state.
- RxJS operators for using with effects:
  - `ofRouterNav()` operator to filter by router navigation ([NgRx ROUTER_NAVIGATION](https://ngrx.io/guide/router-store/actions)).
  - `ofRouterTokenSegmentsNav()` operator to filter by router token segment (E.g `page/:token_segment`).

## Install

[Yarn](https://github.com/yarnpkg/)

```sh
yarn add ngrx-router-state-plus
```

[NPM](https://www.npmjs.com/)

```sh
npm install ngrx-router-state-plus --save
```

## Usage

Here a small example illustrating its usage.
Sample route path used: `/page/:my_token_segment`

__app.module.ts__

```ts
import { NgModule } from '@angular/core'

@NgModule({
  imports: [
    // StoreModule, StoreRouterConnectingModule, EffectsModule ...

    RouterStorePlusModule.forRoot({
      // Token segment keys to mapping
      urlTokenSegmentKeys: [ 'my_token_segment', 'another-key' ]
    })
  ]
})
export class AppModule { }
```

__page.effects.ts__

```ts
import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { ofRouterNav, ofRouterTokenSegmentsNav } from 'ngrx-router-state-plus'

import { PageNew, PageEdit } from 'some/actions/page.actions'

// Router token segment to using
// E.g `page/:my_token_segment`
const TOKEN_SEGMENT_KEY = 'my_token_segment'

@Injectable()
export class PageEffects {

  // Example 1
  // If you want to filter by router navigation only (ROUTER_NAVIGATION)
  @Effect()
  public page$ = this.actions$.pipe(
    ofRouterNav(),
    // switchMap()
    // catchError()
    // etc...
  )

  // Example 2
  // If you want to filter by router navigation with token segment checks (ROUTER_NAVIGATION)

  // New page effect
  @Effect()
  public pageNew$ = this.actions$.pipe(
    ofRouterTokenSegmentsNav(TOKEN_SEGMENT_KEY, 'new'),
    mapTo(() => new PageNew()),
    // catchError(),
    // etc...
  )

  // Edit page effect
  @Effect()
  public pageEdit$ = this.actions$.pipe(
    ofRouterTokenSegmentsNav(TOKEN_SEGMENT_KEY, 'edit'),
    mapTo(() => new PageEdit()),
    // catchError(),
    // etc...
  )

  constructor (private actions$: Actions) { }
}
```

__page.component.ts__

Normally you will only need to subscribe to your individual states dispatched from your effects, but if you need access to Router state data directly you can do it out as follow:

```ts
import { Component, OnInit } from '@angular/core'

import { selectRouterState } from 'ngrx-router-state-plus'

interface MyTokenSegments {
  my_token_segment: string
  // other token segment...
}

@Component({
  selector: 'app-page',
  template: `...`
})
export class PageComponent {
  // Some custom subscriptions here...

  // 1. Router State subscription
  private route$ = this.store.pipe(select(
    // Selects current Router State feature
    selectRouterState<MyRootState, MyTokenSegments>()
  ))

  constructor (private store: Store<MyRootState>) { }

  // 2. Displaying current Router State values
  ngOnInit () {
    this.route$
      // For example, `urlTokenSegments` gives you back all segments previously defined
      // Since `state` based on `ActivatedRouteSnapshot`, you can also access to their properties as usual
      .subscribe((state) => console.log(state.urlTokenSegments))
      .unsubscribe()
  }
}
```

## API

### Modules

__RouterStorePlusModule__ is the main module to importing into your app.

### Serializer

[Router state serialization](https://ngrx.io/guide/router-store/configuration#custom-router-state-serializer) is out of the box.

### Router State Plus

[`RouterStatePlusActivatedSnapshot<RouterTokenSegments>`](./src/router-state.ts) is router activated state interface that extend of [Angular ActivatedRouteSnapshot](https://angular.io/api/router/ActivatedRouteSnapshot#description).

But there are only three differences at properties level:

- `url` type is `string` (updated prop)
- `urlSegments` type is `UrlSegment[]` (new prop). `url` in `ActivatedRouteSnapshot`.
- `urlTokenSegments` is RouterStateTokenSegments<RouterTokenSegments> (new prop)

Since it's based on `ActivatedRouteSnapshot`, you can also access to their properties as usual with the exception that `url` was moved to `urlSegments` and `url` is now current string url.

### Operators

[RxJS](https://angular.io/guide/rx-library) operators for using with effects:

- __ofRouterNav__: Operator to filter by router navigation ([NgRx ROUTER_NAVIGATION](https://ngrx.io/guide/router-store/actions)).
- __ofRouterTokenSegmentsNav__: Operator to filter by router navigation with token segment checks (E.g `page/:token_segment`).

### Selectors

- __selectRouterState__: Selects current Router state feature.


## Contributions

[Pull requests](https://github.com/joseluisq/slendr/pulls) or [issues](https://github.com/joseluisq/slendr/issues) are very appreciated.

## License
MIT license

© 2019 [Jose Quintana](http://git.io/joseluisq)
