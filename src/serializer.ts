import { Inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { RouterStateSerializer } from '@ngrx/router-store'

import { RouterStorePlusConfig, STORE_ROUTE_PLUS_CONFIG } from './config'
import { RouterStatePlusActivatedSnapshot, RouterStateTokenSegments } from './router-state'

/**
 * Router erializer that takes a `RouterStateSnapshot` and return an `RouterStatePlusActivatedSnapshot` object
 */
@Injectable()
export class RouterStateSerializerPlus<RouterTokenSegments> implements
  RouterStateSerializer<RouterStatePlusActivatedSnapshot<RouterTokenSegments>> {

  private readonly config: RouterStorePlusConfig

  constructor (@Inject(STORE_ROUTE_PLUS_CONFIG) config: RouterStorePlusConfig) {
    this.config = config
  }

  public serialize (routerState: RouterStateSnapshot) {
    return this.serializeWithSegments(routerState, this.config.urlTokenSegmentKeys)
  }

  /**
   * Serialize a `RouterStateSnapshot` into composed object
   *
   * @param routerState Router state
   * @param segmentKeys Router segment keys
   */
  public serializeWithSegments (
    routerState: RouterStateSnapshot,
    segmentKeys: string[]
  ): RouterStatePlusActivatedSnapshot<RouterTokenSegments> {
    let route = routerState.root

    if (route.firstChild) {
      route = route.firstChild
    }

    const urlTokenSegments = this.createUrlTokenSegments<RouterTokenSegments>(route, segmentKeys)

    return {
      url: routerState.url,
      urlSegments: route.url,
      urlTokenSegments,
      params: route.params,
      queryParams: route.queryParams,
      fragment: route.fragment,
      data: route.data,
      outlet: route.outlet,
      component: route.component,
      routeConfig: route.routeConfig,
      root: route.root,
      parent: route.parent,
      firstChild: route.firstChild,
      children: route.children,
      pathFromRoot: route.pathFromRoot,
      paramMap: route.paramMap,
      queryParamMap: route.queryParamMap
    }
  }

  /**
   * Create a composed mapping object by token segment urls
   *
   * @param route Route activated snapshot
   * @param keys Token segment keys
   */
  private createUrlTokenSegments<T = {}> (route: ActivatedRouteSnapshot, keys: string[]): RouterStateTokenSegments<T> {
    const segments = {} as RouterStateTokenSegments<T>

    keys.forEach((key, index) => {
      const segment = route.url[index] || null
      const value = segment ? segment.path : ''

      segments[key] = value
    })

    return segments
  }
}
