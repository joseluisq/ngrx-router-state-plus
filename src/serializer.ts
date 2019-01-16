import { Inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { RouterStateSerializer } from '@ngrx/router-store'

import { RouterStorePlusConfig, STORE_ROUTE_PLUS_CONFIG } from './config'
import { RouterStatePlus, RouterStateSegments } from './router-state'

/**
 * Router serializer that takes a `RouterStateSnapshot` and return a composed state object (RouterStatePlus)
 */
@Injectable()
export class RouterStateSerializerPlus<RouterSegmentType> implements
  RouterStateSerializer<RouterStatePlus<RouterSegmentType>> {

  private readonly config: RouterStorePlusConfig

  constructor (@Inject(STORE_ROUTE_PLUS_CONFIG) config: RouterStorePlusConfig) {
    this.config = config
  }

  public serialize (routerState: RouterStateSnapshot) {
    return this.serializeWithSegments(routerState, this.config.segmentKeys)
  }

  /**
   * Serialize a `RouterStateSnapshot` into composed object
   *
   * @param routerState
   * @param segmentKeys
   * @returns RouterStateUrl with segments
   */
  public serializeWithSegments (
    routerState: RouterStateSnapshot,
    segmentKeys: string[]
  ): RouterStatePlus<RouterSegmentType> {
    let route = routerState.root

    if (route.firstChild) {
      route = route.firstChild
    }

    const { url, root: { queryParams } } = routerState
    const { params } = route
    const segments = this.createSegmentsURI<RouterSegmentType>(route, segmentKeys)

    return { url, params, queryParams, segments }
  }

  /**
   * Create a composed segment object
   *
   * @param route
   * @param keys
   * @returns Return a segments object
   */
  private createSegmentsURI<T = {}> (route: ActivatedRouteSnapshot, keys: string[]): RouterStateSegments<T> {
    const segments = {} as RouterStateSegments<T>

    keys.forEach((key, index) => {
      const segment = route.url[index] || null
      const value = segment ? segment.path : ''

      segments[key] = value
    })

    return segments
  }
}
