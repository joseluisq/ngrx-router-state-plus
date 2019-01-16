import { Action } from '@ngrx/store'
import { ROUTER_NAVIGATION, RouterNavigationPayload } from '@ngrx/router-store'

import { RouterStatePlus } from './router-state'

/**
 * Router Navigation Action with a custom `RouterSegmentType` definition for the payload
 */
export class RouterNavigationActionPlus<RouterSegmentType> implements Action {
  public readonly type = ROUTER_NAVIGATION
  constructor (public payload: RouterNavigationPayload<RouterStatePlus<RouterSegmentType>>) { }
}
