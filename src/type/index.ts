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

// GLobal type for input struct
export type StructFormType = {
    type: string,
    value: string
}

// Global type for struct
export type StructType = {
    id: number,
    listId: number,
    name: string,
    data: Array<StructFormType>
}

// Global type for Node data
export type NodeType = {
    id: number,
    listId: number,
    data: Array<any>
}

export type LogType = {
    id: number,
    codeId: number,
    data: Array<string>
}

export type OperationType = {
    id: number,
    codeId: number,
    data: Array<string>
}

// Global type for code data
export type CodeType = {
    id: number,
    listId: number,
    data: string,
    log: LogType,
    operation: OperationType
}

// Global type for list
export type ListType = {
    id: number,
    type: string,
    struct: StructType,
    node: NodeType,
    code: CodeType
}