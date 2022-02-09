import axiosInstance from "../axios";
import { StructFormType } from "../type";

export async function PostNewStruct(structName: string, structFormData: Array<StructFormType>, listId: number): Promise<any> {
    try {
        const stuct = await axiosInstance.post('/struct/create', {
            name: structName,
            data: structFormData,
            listId: listId
        });
        return stuct.data.data;
    }
    catch (err) {
        console.log(err);
    }
}