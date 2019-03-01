import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { catchError, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { ofRouterNav } from '../router-operators'
import { RouterNavigationActionPlus } from '../navigation.actions'
import { RouterNavigationError, RouterNavigationSuccess } from './router-navigation.actions'

@Injectable()
export class RouterNavigationEffects {

  @Effect()
  public nav$ = this.actions$.pipe(
    ofRouterNav(),
    switchMap((state) => of(new RouterNavigationSuccess(state.payload))),
    catchError((error) => of(new RouterNavigationError(error)))
  )

  constructor (private readonly actions$: Actions<RouterNavigationActionPlus>) { }

}
