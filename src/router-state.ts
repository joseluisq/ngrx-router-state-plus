import { Params } from '@angular/router'

/** RouterStateSegments intersection type (mapping segments object) */
export type RouterStateSegments<T> = T & { [key: string]: string }

/**
 * Represents a common interface for navigation payload (RouterNavigationPayload)
 */
export interface RouterStatePlus<RouterSegmentType> {
  /** The string URL matched by this route */
  url: string

  /** The matrix parameters scoped to this route */
  params: Params

  /** The query parameters shared by all the routes */
  queryParams: Params

  /**
   * The composed segments mapping object (with custom keys) based on UrlSegments
   * https://angular.io/api/router/UrlSegment
   */
  segments: RouterStateSegments<RouterSegmentType>
}
