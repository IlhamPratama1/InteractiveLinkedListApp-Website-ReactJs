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

// Globa type for Node Modal
export type NodeModalType = {
    index: number,
    data: any
}

// Global type for get res data
export type StateDataType<T> = {
    isLoading: boolean,
    data: Array<T>
}

export type TwoStateDataType<T> = {
    isLoading: boolean,
    data: Array<T>
    data2: Array<T>
}

export type FourStateDataType<T> = {
    isLoading: boolean,
    data: Array<T>
    data2: Array<T>
    data3: Array<T>
    data4: Array<T>
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

// Global type for Log data
export type LogType = {
    id: number,
    codeId: number,
    data: Array<string>
}

// Global type for Operation data
export type OperationType = {
    id: number,
    codeId: number,
    data: Array<string>
}

// export type for Searchlog
export type SearchLogType = {
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
    operation: OperationType,
    searchLog: SearchLogType
}

// Global type for list
export type ListType = {
    id: number,
    type: string,
    struct: StructType,
    node: NodeType,
    code: CodeType
}

// GLobal type for Quest data
export type QuestType = {
    id: number,
    isComplete: boolean,
    quest: {
        name: string,
        detail: string,
        tool: string,
        type: string
    }
}

// GLobal type for Profile data
export type ProfileType = {
    username: string,
    email: string,
    lists: number,
    quests: number
}

// Global type for feedback type data
export type FeedbackType = {
    id: number,
    question: string,
    type: string
}

export type UserFeedbackType = {
    id?: number,
    userId: number,
    feedbackId: number,
    answer: string
}

export type UserQuizType = {
    id: number,
    result: number,
    createdAt: string,
    updatedAt: string
}

export type AnswerType = {
    id: number, 
    answer: string
}

export type QuestionType = {
    id: number,
    question: string,
    answers: AnswerType[]
}

export type UserResponse = {
    answer: string
}

export type FeedbackResponse = { 
    id: number,
    question: string,
    type: string,
    user_feedbacks: Array<UserResponse>
}