import React, { createContext, useReducer } from "react"
import { Action, reducer } from "src/reducers"

export interface IUser {
    authenticated: boolean
    user: Record<string, string>
}

export interface ITodo {
    _id: string
    completed: boolean
}

export interface IProject {
    _id: string
    todos: ITodo[]
}

export interface InitialStateType {
    user?: IUser
    projects: IProject[]
    dispatch: React.Dispatch<Action>
}

const initialState: InitialStateType = {
    user: undefined,
    projects: [],
    dispatch: () => null,
}

export const AppContext = createContext<InitialStateType>(initialState)

export const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}
