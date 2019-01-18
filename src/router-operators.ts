import { ROUTER_NAVIGATION } from '@ngrx/router-store'
import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators'
import { RouterNavigationActionPlus } from './navigation.actions'
import { ofType } from '@ngrx/effects'

/**
 * RxJS filter by Router Segment of the payload segments map
 *
 * @param key Segment key
 * @param value Segment value or Segment array expected
 * @returns Observable<RouterNavigationAction<CustomSegmentType>>
 */
export function ofRouterSegment <T> (key: string, value: string | string[]) {
  return (source: Observable<RouterNavigationActionPlus<T>>) => {
    return source.pipe(
      ofType<RouterNavigationActionPlus<T>>(ROUTER_NAVIGATION),
      filter((routeAction) => {
        const isRouteAction = routeAction.type === ROUTER_NAVIGATION

        if (isRouteAction) {
          const { segments } = routeAction.payload.routerState

          if (segments) {
            if (Array.isArray(value)) {
              return value.includes(segments[key])
            } else {
              return segments[key] === value
            }
          }
        }

        return isRouteAction
      })
    )
  }
}
