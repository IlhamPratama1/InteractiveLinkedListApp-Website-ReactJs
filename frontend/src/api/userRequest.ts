import axiosInstance from "../axios";

export async function GetMyProfile(): Promise<any> {
    try {
        const profile = await axiosInstance.get('/auth/my-detail');
        return profile.data;
    } catch (err) {
        console.log(err);
    }
}