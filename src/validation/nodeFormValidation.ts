import { StructFormInterface } from "../interface";

export function NodeFormValidation(start: number, data: any, structData: Array<StructFormInterface>, callback: Function): boolean {
    let isError: boolean = false;
    let errorMessage: any = {};

    for (let i = start; i < structData.length; i++) {
        if (data[structData[i].value] === undefined || data[structData[i].value] === '') {
            errorMessage[structData[i].type] = 'value cannot empty';
            isError = true;
        }
        if (i === structData.length - 1 && isError) {
            callback(errorMessage);
        }
    };
    return isError;
}