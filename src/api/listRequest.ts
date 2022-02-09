import axiosInstance from "../axios";

export async function GetMyLists(): Promise<any> {
    try {
        const lists = await axiosInstance.get('/list/my-lists');
        return lists.data;
    } catch (err) {
        console.log(err);
    }
}

export async function PostNewList(type: string): Promise<any> {
    try {
        const list = await axiosInstance.post('/list/create', { type: type });
        return list.data.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function GetListDetail(listId: string | number): Promise<any> {
    try {
        const list = await axiosInstance.get(`/list/detail/${listId}`);
        return list.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function DeleteList(listId: string | number): Promise<any> {
    try {
        const message = await axiosInstance.delete(`/list/delete/${listId}`);
        console.log(message);
    }
    catch (err) {
        console.log(err);
    }
}