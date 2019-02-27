import { ROUTER_NAVIGATION } from '@ngrx/router-store'
import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators'
import { RouterNavigationActionPlus } from './navigation.actions'
import { ofType } from '@ngrx/effects'

/**
 * RxJS filter by router navigation (ROUTER_NAVIGATION)
 *
 * @returns Observable<RouterNavigationAction<RouterTokenSegments>>
 */
export function ofRouterNav <RouterTokenSegments = {}> () {
  return (source: Observable<RouterNavigationActionPlus<RouterTokenSegments>>) => {
    return source.pipe(
      ofType<RouterNavigationActionPlus<RouterTokenSegments>>(ROUTER_NAVIGATION),
      filter((routeAction) => routeAction.type === ROUTER_NAVIGATION)
    )
  }
}

/**
 * RxJS filter by router token segment of the payload segments map (ROUTER_NAVIGATION)
 *
 * @param key Token segment key (mapping key)
 * @param value Token segment value or values to matching. No comparing if `value` is 'undefined'
 * @returns Observable<RouterNavigationAction<RouterTokenSegments>>
 */
export function ofRouterTokenSegmentsNav <RouterTokenSegments = {}> (key: string, value?: string | string[]) {
  return (source: Observable<RouterNavigationActionPlus<RouterTokenSegments>>) => {
    return source.pipe(
      ofType<RouterNavigationActionPlus<RouterTokenSegments>>(ROUTER_NAVIGATION),
      filter((routeAction) => {
        const isRouteAction = routeAction.type === ROUTER_NAVIGATION

        if (isRouteAction) {
          const { urlTokenSegments } = routeAction.payload.routerState

          // return false if `key` is 'undefined'
          if (!urlTokenSegments.hasOwnProperty(key)) {
            return false
          }

          // no comparing if `value` is 'undefined'
          if (typeof value === 'undefined') {
            return true
          }

          // otherwise, check corresponding values
          if (Array.isArray(value)) {
            return value.includes(urlTokenSegments[key])
          } else {
            return (urlTokenSegments[key] === value)
          }
        }

        return isRouteAction
      })
    )
  }
}
