import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators'
import { select } from '@ngrx/store'
import { DEFAULT_ROUTER_FEATURENAME } from '@ngrx/router-store'

import { RouterNavPayload } from './router-state'

/**
 * RxJS operator to select current router state navigation
 *
 * @returns Observable<RouterNavigationAction<RouterTokenSegments>>
 */
export function selectRouterNav <RootState, RouterTokenSegments = {}> () {
  return (source: Observable<RootState>) => source.pipe(
    select(DEFAULT_ROUTER_FEATURENAME),
    filter<RouterNavPayload<RouterTokenSegments>>((state) => (!!state && !!state.routerState))
  )
}
