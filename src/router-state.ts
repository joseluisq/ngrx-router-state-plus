import { Type } from '@angular/core'
import { ActivatedRouteSnapshot, Data, ParamMap, Params, Route, UrlSegment } from '@angular/router'

/** RouterStateSegments intersection type (token segments mapping object) */
export type RouterStateTokenSegments<T> = T & { [key: string]: string }

/**
 * Router activated snapshot state extended of `@angular/router/ActivatedRouteSnapshot`
 *
 * - ActivatedRouteSnapshot: https://angular.io/api/router/ActivatedRouteSnapshot#description
 * - ActivatedRouteSnapshot source: https://github.com/angular/angular/blob/master/packages/router/src/router_state.ts
 */
export interface RouterStatePlusActivatedSnapshot<RouterTokenSegments> {
  /** The string URL matched by this route */
  url: string
  /** The URL segments matched by this route (ActivatedRouteSnapshot `url` prop) */
  urlSegments: UrlSegment[]
  /** The composed token segments mapping object (defined with custom keys) */
  urlTokenSegments: RouterStateTokenSegments<RouterTokenSegments>
  /** The matrix parameters scoped to this route */
  params: Params
  /** The query parameters shared by all the routes */
  queryParams: Params
  /** The URL fragment shared by all the routes */
  fragment: string
  /** The static and resolved data of this route */
  data: Data
  /** The outlet name of the route */
  outlet: string
  /** The component of the route */
  component: Type<any> | string | null
  /** The configuration used to match this route */
  readonly routeConfig: Route | null
  /** The root of the router state */
  readonly root: ActivatedRouteSnapshot
  /** The parent of this route in the router state tree */
  readonly parent: ActivatedRouteSnapshot | null
  /** The first child of this route in the router state tree */
  readonly firstChild: ActivatedRouteSnapshot | null
  /** The children of this route in the router state tree */
  readonly children: ActivatedRouteSnapshot[]
  /** The path from the root of the router state tree to this route */
  readonly pathFromRoot: ActivatedRouteSnapshot[]
  readonly paramMap: ParamMap
  readonly queryParamMap: ParamMap
  toString (): string
}
