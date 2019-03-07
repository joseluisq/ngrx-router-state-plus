import { Type } from '@angular/core'
import { Data, Params, UrlSegment } from '@angular/router'
import { RouterNavigationPayload } from '@ngrx/router-store'

/** RouterStateSegments intersection type (token segments mapping object) */
export type RouterStateTokenSegments<T> = T & { [key: string]: string }

/**
 * Router activated snapshot state based on `@angular/router/ActivatedRouteSnapshot`
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
}

/** The router navigation payload extended of NgRx RouterNavigationPayload */
export interface RouterNavPayload<RouterTokenSegments = {}>
  extends RouterNavigationPayload<RouterStatePlusActivatedSnapshot<RouterTokenSegments>> {
}
