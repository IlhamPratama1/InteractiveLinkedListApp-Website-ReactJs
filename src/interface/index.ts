// Save all interface from json data here
// Use Interface for ordinary function data and non react state

// Interface for initial user data in reducer state
export interface UserStateInterface {
    loggedIn: boolean,
    token: string | null
}

// Global Form interface
export interface FormInterface {
    username?: string,
    email: string,
    password: string,
    confirmPassword?: string
}

// Global Error interface
export interface ErrorMessageInterface {
    404?: string,
    username?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    match?: string
}

// Struct form input interface
export interface StructFormInterface {
    type: string,
    value: string
}

// Initial Struct state data in reducer
export interface StructStateInterface {
    structName: string,
    structData: Array<StructFormInterface>
}

// Initial Code state data in reducer
export interface CodeStateInterface {
    id: number,
    code: string,
    operation: Array<string>,
    log: Array<string>
}