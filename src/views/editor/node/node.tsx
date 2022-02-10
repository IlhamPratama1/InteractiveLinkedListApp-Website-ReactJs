import EditModal from "./editModal";

type NodeType = {
    index: number,
    data: any
}

export default function Node({ index, data }: NodeType) {
    return (
        <div className="w-52">
            <div className="flex justify-center">
                <button className={`focus:outline-none cursore-pointer py-4 px-12 text-xl text-white rounded-xl bg-purple-main`}>{index}</button>
            </div>
            <EditModal />
        </div>
    );
}