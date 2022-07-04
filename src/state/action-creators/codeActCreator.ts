import { Dispatch } from "react";
import { State } from "..";
import { UpdateCodeData, UpdateLogData, UpdateOperationData, UpdateSearchLogData } from "../../api/codeRequest";
import CodeGenerator from "../../code/codeGenerator";
import SingleLinkCodeGerator from "../../code/singleCodeGenerator";
import DoubleLinkCodeGenerator from "../../code/doubleCodeGenerator";
import CircularLinkCodeGenerator from "../../code/circularCodeGenerator";
import { CodeStateInterface, StructStateInterface, UserStateInterface } from "../../interface";
import { ActionType } from "../action-types";
import { CodeAction } from "../actions";

export const SetLastOperation = (operation: string) => {
    return (dispatch: Dispatch<CodeAction>) => {
        dispatch({
            type: ActionType.SETLASTOPERATION,
            payload: operation
        });
    }
}

export const SetSearchLog = (searchType: string) => {
    return (dispatch: Dispatch<CodeAction>, getState: () => State) => {
        let { searchLog }: CodeStateInterface = getState().code;
        let searchArr = [...searchLog, searchType];
        dispatch({
            type: ActionType.SETSEARCHLOG,
            payload: searchArr
        })
    }
}

export const ResetCode = () => {
    return (dispatch: Dispatch<CodeAction>) => {
        dispatch({
            type: ActionType.RESETCODE
        });
    }
}

export const GenerateCode = (index: number, data: string | number, searchType: string) => {
    return (dispatch: Dispatch<CodeAction>, getState: () => State) => {
        const projectType: string = getState().projectType;
        const { id, operation, log, lastOperation, searchLog }: CodeStateInterface = getState().code;
        const { listId, structName, structData }: StructStateInterface = getState().struct;
        const nodeData: Array<any> = getState().node;
        const { token }: UserStateInterface = getState().auth;
        
        let sourceCode: CodeGenerator;
        switch (projectType) {
            case 'single':
                sourceCode = new SingleLinkCodeGerator(structData, structName);
                break;
            case 'double':
                sourceCode = new DoubleLinkCodeGenerator(structData, structName);
                break;
            case 'circular':
                sourceCode = new CircularLinkCodeGenerator(structData, structName);
                break;
            default:
                sourceCode = new CodeGenerator(structData, structName);
                break;
        }

        let operationArr = [...operation];
        if(!operation.includes(lastOperation)) {
            operationArr.push(lastOperation);
        }

        let operateMainFunction = sourceCode.OperateMainFunction(lastOperation, nodeData[index], data, searchType);
        let logArr = [...log];
        logArr.push(operateMainFunction);

        let mainFunction = sourceCode.GenerateMainFunction(logArr);

        let code = sourceCode.GenerateSourceCode(operationArr, searchLog) + mainFunction;

        if (token) {
            UpdateCodeData(listId, code);
            UpdateOperationData(id, operationArr);
            UpdateLogData(id, logArr);
            UpdateSearchLogData(id, searchLog);
        }

        return dispatch({
            type: ActionType.SETCODELOGOPERATION,
            payload: {
                id: id,
                code: code,
                operation: operationArr,
                log: logArr,
                lastOperation: lastOperation,
                searchLog: searchLog
            }
        });
    }
}