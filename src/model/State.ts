export type AuthState = {
    loggedIn: boolean,
    token: string
}

export type RootState = {
    auth: AuthState
}
