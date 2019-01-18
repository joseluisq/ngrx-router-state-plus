# ngrx-router-state-plus [![npm](https://img.shields.io/npm/v/ngrx-router-state-plus.svg)](https://www.npmjs.com/package/ngrx-router-state-plus) [![npm](https://img.shields.io/npm/dt/ngrx-router-state-plus.svg)](https://www.npmjs.com/package/ngrx-router-state-plus) [![Build Status](https://travis-ci.org/joseluisq/ngrx-router-state-plus.svg?branch=master)](https://travis-ci.org/joseluisq/ngrx-router-state-plus) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> [@ngrx/router-store](https://github.com/ngrx/platform/tree/master/modules/router-store) extension that provides [router state serialization](https://ngrx.io/guide/router-store/configuration#custom-router-state-serializer) with [a common payload-composed state](./src/router-state.ts) data.

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

Sample route path: `/page/:subpage`

__page.effects.ts__

```ts
import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { mapTo } from 'rxjs/operators'
import { ofRouterSegment } from 'ngrx-router-state-plus'

import { PageNew, PageEdit } from '@actions/page.actions'

const KEY = 'page-key-url-segment'

@Injectable()
export class PageEffects {

  @Effect()
  public pageNew$ = this.actions$.pipe(
    ofRouterSegment(KEY, 'new'),
    mapTo(new PageNew())
  )

  @Effect()
  public pageEdit$ = this.actions$.pipe(
    ofRouterSegment(KEY, 'edit'),
    mapTo(new PageEdit())
  )

  constructor (private actions$: Actions) { }
}
```

__app.module.ts__

```ts
@NgModule({
  imports: [
    // StoreModule, StoreRouterConnectingModule, EffectsModule, etc

    RouterStorePlusModule.forRoot({
      // the segment keys mapping object
      segmentKeys: ['page-key-url-segment', 'another-key']
    })
  ]
})
export class AppModule { }
```

## Options

### segmentKeys

An array of string keys for mapping your router navigation [UrlSegments](https://angular.io/api/router/UrlSegment).

Since [UrlSegments](https://angular.io/api/router/UrlSegment) is an array, `segmentKeys` order should match with it. For instance, If your URL is `/page/:subpage` then your `segmentKeys` value would be `[ 'page-key', 'subpage-key' ]`

__Note:__ For example, if you define two keys or more and your URL has only one segment then the value for the second key will be setted to a empty string.

## Router State

Represents a common interface for navigation payload state data. See [router state payload interface](./src/router-state.ts).

## Operators

### ofRouterSegment

A [RxJS operator](https://rxjs-dev.firebaseapp.com/api) that filters by `Router Segment` of the payload segments object.

```ts
function ofRouterSegment <SegmentType> (key: string, value: string | string[])
```

## Contributions

[Pull requests](https://github.com/joseluisq/slendr/pulls) or [issues](https://github.com/joseluisq/slendr/issues) are very appreciated.

## License
MIT license

© 2019 [Jose Quintana](http://git.io/joseluisq)
