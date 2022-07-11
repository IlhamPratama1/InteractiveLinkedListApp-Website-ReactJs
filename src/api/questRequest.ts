import axiosInstance from "../axios";

export async function GetMyQuests(): Promise<any> {
    try {
        const quests = await axiosInstance.get('/quest/my-quest');
        return quests.data;
    } catch (err) {
        console.log(err);
    }
}

export async function UpdateQuest(id: number, isComplete: boolean): Promise<any> {
    try {
        const quest = await axiosInstance.put('/quest/update', {
            id: id,
            isComplete: isComplete
        });
        return quest.data.data;
    } catch (err) {
        console.log(err);
    }
}

export async function GetFilterQuest(): Promise<any> {
    try {
        const quests = await axiosInstance.get(`/quest/filter-quest`);
        return quests.data;
    } catch (err) {
        console.log(err);
    }
}