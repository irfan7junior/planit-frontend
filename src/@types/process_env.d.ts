declare namespace NodeJS {
    export interface ProcessEnv {
        REACT_APP_API: string
        NODE_ENV: string
        [key: string]: string
    }
}
