import axiosInstance from "../axios";

export async function GetMyLists(): Promise<any> {
    try {
        const lists = await axiosInstance.get('list/my-lists');
        return lists.data;
    } catch (err) {
        console.log(err);
    }
}

export async function PostNewList(type: string): Promise<any> {
    try {
        const list = await axiosInstance.post('list/create', { type: type });
        return list.data.data;
    }
    catch (err) {
        console.log(err);
    }
}