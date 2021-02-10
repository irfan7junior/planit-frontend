import { InitialStateType } from 'src/context'
import { IUser } from '../context/index'

export type Action = {
  type: 'SET_USER'
  payload: IUser
}

export const reducer = (
  state: InitialStateType,
  action: Action
): InitialStateType => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload,
      }
    }
  }
}
