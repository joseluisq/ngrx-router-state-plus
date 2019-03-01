import { DEFAULT_ROUTER_FEATURENAME } from '@ngrx/router-store'

import { RouterStatePlusActivatedSnapshot } from './router-state'

interface RouterState<ISegments> {
  [key: string]: {
    state: RouterStatePlusActivatedSnapshot<ISegments>
  }
}

type RootState<IRootState, ISegments> = IRootState & RouterState<ISegments>

/**
 * Selects current Router state feature
 *
 * @param featureName Router feature name (DEFAULT_ROUTER_FEATURENAME = 'router' by default)
 */
export const selectRouterState = <IRootState, ISegments = {}>(
  featureName = DEFAULT_ROUTER_FEATURENAME
) => (routerState: RootState<IRootState, ISegments>) => {
  // According to `RouterReducerState` type
  // https://github.com/ngrx/platform/blob/master/modules/router-store/src/reducer.ts
  if (routerState.hasOwnProperty(featureName)) {
    const feature = routerState[featureName]
    return feature ? feature['state'] : feature
  } else {
    throw new Error(`Router state feature '${featureName}' not found.`)
  }
}
