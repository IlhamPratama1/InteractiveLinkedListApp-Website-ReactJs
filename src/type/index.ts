// Use Type for react component or state

// Type for error message in auth form
export type ErrorMessageType = {
    404?: string,
    username?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    match?: string
}

// Type for input form data
export type FormDataType = {
    username?: string,
    email: string,
    password: string,
    confirmPassword?: string
}

// Global type for get res data
export type StateDataType<T> = {
    isLoading: boolean,
    data: Array<T>
}

// Global type for list
export type ListType = {
    id: number,
    type: string,
}