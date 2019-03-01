import { Action } from '@ngrx/store'
import { ROUTER_NAVIGATION } from '@ngrx/router-store'

import { RouterNavPayload } from './router-state'

/**
 * Router Navigation Action with a custom `RouterTokenSegments` definition for the payload
 */
export class RouterNavigationActionPlus<RouterTokenSegments = {}> implements Action {
  public readonly type = ROUTER_NAVIGATION
  constructor (public payload: RouterNavPayload<RouterTokenSegments>) { }
}
