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

export async function PostNewSearchLog(codeId: string | number): Promise<any> {
    try {
        const searchLog = await axiosInstance.post('/search-log/create', { data:[], codeId: codeId });
        return searchLog.data.data;
    } catch (err) {
        console.log(err);
    }
}

export async function UpdateCodeData(listId: string | number, data: string): Promise<any> {
    try {
        const code = await axiosInstance.put('/code/update', { data: data, listId: listId });
        return code.data;
    } catch (err) {
        console.log(err);
    }
}

export async function UpdateLogData(codeId: string | number | undefined, data: Array<string>): Promise<any> {
    try {
        const log = await axiosInstance.put('/log/update', { data: data, codeId: codeId });
        return log.data;
    } catch (err) {
        console.log(err);
    }
}

export async function UpdateOperationData(codeId: string | number | undefined, data: Array<string>): Promise<any> {
    try {
        const operation = await axiosInstance.put('/operation/update', { data: data, codeId: codeId });
        return operation.data;
    } catch (err) {
        console.log(err);
    }
}

export async function UpdateSearchLogData(codeId: string | number | undefined, data: Array<string>): Promise<any> {
    try {
        const searchLog = await axiosInstance.put('/search-log/update', { data: data, codeId: codeId });
        return searchLog.data;
    } catch (err) {
        console.log(err);
    }
}