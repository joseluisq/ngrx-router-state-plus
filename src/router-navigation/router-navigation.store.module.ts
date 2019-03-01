import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { routerNavigationReducer } from './router-navigation.reducers'
import { RouterNavigationEffects } from './router-navigation.effects'
import { DEFAULT_ROUTER_FEATURENAME } from './router-navigation.config'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([ RouterNavigationEffects ]),
    StoreModule.forFeature(DEFAULT_ROUTER_FEATURENAME, routerNavigationReducer)
  ],
  providers: []
})
export class RouterNavigationStoreModule { }
