import axiosInstance from "../axios";

export async function GetCodeDetail(listId: string | number): Promise<any> {
    try {
        const code = await axiosInstance.get(`/code/detail/${listId}`);
        return code.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function PostNewCode(listId: string | number): Promise<any> {
    try {
        const code = await axiosInstance.post('/code/create', { data: '', listId: listId });
        return code.data.data;
    } catch (err) {
        console.log(err);
    }
}

export async function PostNewLog(codeId: string | number): Promise<any> {
    try {
        const log = await axiosInstance.post('/log/create', { data: [], codeId: codeId });
        return log.data.data;
    } catch (err) {
        console.log(err);
    }
}

export async function PostNewOperation(codeId: string | number): Promise<any> {
    try {
        const operation = await axiosInstance.post('/operation/create', { data: [], codeId: codeId });
        return operation.data.data;
    } catch (err) {
        console.log(err);
    }
}