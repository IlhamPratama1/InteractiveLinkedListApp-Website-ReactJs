import axiosInstance from "../axios";

export async function GetNodeDetail(listId: string | number): Promise<any> {
    try {
        const node = await axiosInstance.get(`/node/detail/${listId}`);
        return node.data;
    } catch (err) {
        console.log(err);
    }
}

export async function PostNewNode(listId: string | number): Promise<any> {
    try {
        const node = await axiosInstance.post('/node/create', {
            data: [],
            listId: listId
        });
        return node.data.data;
    } catch (err) {
        console.log(err);
    }
}

export async function UpdateNodeData(listId: string | number, data: Array<any>): Promise<any> {
    try {
        const node = await axiosInstance.put('/node/update', {
            data: data,
            listId: listId
        });
        return node.data;
    } catch (err) {
        console.log(err);
    }
}