import { Action } from '@ngrx/store'
import { RouterNavigationPayload } from '@ngrx/router-store'
import { RouterStatePlusActivatedSnapshot } from '../router-state'

export enum RouterNavigationTypes {
  SUCCESS = '[Router Navigation] Navigation Success',
  ERROR = '[Router Navigation] Navigation Failure'
}

export class RouterNavigationSuccess<RouterTokenSegments = {}> implements Action {
  public readonly type = RouterNavigationTypes.SUCCESS

  constructor (public payload: RouterNavigationPayload<RouterStatePlusActivatedSnapshot<RouterTokenSegments>>) {}
}

export class RouterNavigationError implements Action {
  public readonly type = RouterNavigationTypes.ERROR

  constructor (public payload: Error) {}
}

export type RouterNavigationActions = RouterNavigationSuccess | RouterNavigationError
