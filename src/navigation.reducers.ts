import { RouterNavigationActions, RouterNavigationTypes } from './navigation.actions'

export interface RouterNavigationState {
  [key: string]: any
}

const routerState = {
  url: '/',
  params: {},
  queryParams: {},
  urlTokenSegments: {}
}

export const INITIAL_STATE: RouterNavigationState = {
  navigationId: 0,
  event: {
    id: 0,
    url: routerState.url,
    state: routerState,
    urlAfterRedirects: ''
  },
  routerState
}

export function routerNavigationReducer (state = INITIAL_STATE, action: RouterNavigationActions) {
  switch (action.type) {
    case RouterNavigationTypes.SUCCESS: {
      return action.payload
    }

    case RouterNavigationTypes.ERROR: {
      return action.payload
    }

    default:
      return state
  }
}
