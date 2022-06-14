import { StructFormType } from "../../type";

// Initial data double link list struct form
export const doubleLinkedData = (structName: string) => {
    const data: Array<StructFormType> = [
        {
            type: structName + "*",
            value: 'next',
        },
        {
            type: structName + "*",
            value: 'prev',
        },
        {
            type: 'int',
            value: '',
        }
    ]
    return data;
}

// Initial data single link list struct form
export const singleLinkedData = (structName: string) => {
    const data: Array<StructFormType> = [
        {
            type: structName + "*",
            value: 'next',
        },
        {
            type: 'int',
            value: '',
        }
    ]
    return data;
}
