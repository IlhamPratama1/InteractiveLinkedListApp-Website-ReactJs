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
    listId: number,
    structName: string,
    structData: Array<StructFormInterface>
}

// Initial Code state data in reducer
export interface CodeStateInterface {
    id: number,
    code: string,
    operation: Array<string>,
    log: Array<string>,
    lastOperation: string,
    searchLog: Array<string>
}

// Initial Tool state in reducer
export interface ToolStateInterface {
    toolIndex: number,
    nodeIndex: number,
    editIndex: number,
}

// Initial Search state in reducer
export interface QuestStateInterface {
    id: number,
    isComplete: boolean,
    quest: {
        name: string,
        detail: string,
        tool: string,
        type: string
    }
}

// Initial Profile State in Reducer
export interface ProfileStateInterface {
    username: string,
    email: string
}