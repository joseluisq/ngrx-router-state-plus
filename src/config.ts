import { InjectionToken } from '@angular/core'

/**
 * RouterStorePlus configuration
 */
export class RouterStorePlusConfig {
  /** A list of custom segment keys to map the "RouterStatePlus" payload segments */
  public segmentKeys: string[]
}

export const STORE_ROUTE_PLUS_CONFIG = new InjectionToken<RouterStorePlusConfig>(
  'ngrx-router-state-plus Options'
)

export const INITIAL_OPTIONS = new InjectionToken<RouterStorePlusConfig>(
  'ngrx-router-state-plus Initial Config'
)

export type RouterStorePlusOptions =
  | Partial<RouterStorePlusConfig>
  | (() => Partial<RouterStorePlusConfig>)

export function createConfig (
  _options: RouterStorePlusOptions
): RouterStorePlusConfig {
  const DEFAULT_OPTIONS: RouterStorePlusConfig = {
    segmentKeys: []
  }

  const options = typeof _options === 'function' ? _options() : _options
  const config = Object.assign({}, DEFAULT_OPTIONS, options)

  return config
}
