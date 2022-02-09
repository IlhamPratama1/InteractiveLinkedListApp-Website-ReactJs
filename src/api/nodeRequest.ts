import axiosInstance from "../axios";

export async function GetNodeDetail(listId: string | number): Promise<any> {
    try {
        const node = await axiosInstance.get(`/node/detail/${listId}`);
        return node.data;
    }
    catch (err) {
        console.log(err);
    }
}