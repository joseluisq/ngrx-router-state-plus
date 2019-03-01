import { ModuleWithProviders, NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { DEFAULT_ROUTER_FEATURENAME, RouterStateSerializer } from '@ngrx/router-store'

import {
  createConfig,
  INITIAL_OPTIONS,
  RouterStorePlusOptions,
  STORE_ROUTE_PLUS_CONFIG } from './config'
import { RouterStateSerializerPlus } from './serializer'
import { RouterNavigationEffects } from './navigation.effects'
import { routerNavigationReducer } from './navigation.reducers'

@NgModule({
  imports: [
    EffectsModule.forFeature([ RouterNavigationEffects ]),
    StoreModule.forFeature(DEFAULT_ROUTER_FEATURENAME, routerNavigationReducer)
  ]
})
export class RouterStorePlusModule {
  public static forRoot (
    options: RouterStorePlusOptions = {}
  ): ModuleWithProviders<RouterStorePlusModule> {
    return {
      ngModule: RouterStorePlusModule,
      providers: [
        RouterStateSerializerPlus,
        {
          provide: INITIAL_OPTIONS,
          useValue: options
        },
        {
          provide: STORE_ROUTE_PLUS_CONFIG,
          deps: [ INITIAL_OPTIONS ],
          useFactory: createConfig
        },
        {
          provide: RouterStateSerializer,
          deps: [ STORE_ROUTE_PLUS_CONFIG ],
          useExisting: RouterStateSerializerPlus
        }
      ]
    }
  }
}
