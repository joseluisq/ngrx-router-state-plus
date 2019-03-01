import { Action } from '@ngrx/store'
import { ROUTER_NAVIGATION, RouterNavigationPayload } from '@ngrx/router-store'
import { RouterStatePlusActivatedSnapshot } from './router-state'

export enum RouterNavigationTypes {
  SUCCESS = '[Router Nav] Navigation Success',
  ERROR = '[Router Nav] Navigation Failure'
}

/** NgRx router navigation (ROUTER_NAVIGATION) */
export class RouterNavigation<RouterTokenSegments = {}> implements Action {
  public readonly type = ROUTER_NAVIGATION

  constructor (public payload: RouterNavigationPayload<RouterStatePlusActivatedSnapshot<RouterTokenSegments>>) {}
}

export class RouterNavigationSuccess<RouterTokenSegments = {}> implements Action {
  public readonly type = RouterNavigationTypes.SUCCESS

  constructor (public payload: RouterNavigationPayload<RouterStatePlusActivatedSnapshot<RouterTokenSegments>>) {}
}

export class RouterNavigationError implements Action {
  public readonly type = RouterNavigationTypes.ERROR

  constructor (public payload: Error) {}
}

export type RouterNavigationActions = RouterNavigation | RouterNavigationSuccess | RouterNavigationError
