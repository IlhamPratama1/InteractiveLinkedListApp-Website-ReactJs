import { ListType } from '../../type';
import { PostNewList } from '../../api/listRequest';
import { useNavigate } from 'react-router-dom';
import Hashids from 'hashids';


type TypeProjectInterface = {
    type: string
}

export default function TypeProject({ type }: TypeProjectInterface) {
    // --- Lib
    const navigate = useNavigate();
    const hashids = new Hashids(process.env.REACT_APP_HASH_ID, 20);

    // --- Func
    async function SubmitListType(type: string) {
        const list: ListType = await PostNewList(type);
        const encodedId: string = hashids.encode(list.id);
        navigate(`/struct/${type}/${encodedId}`);
    }

    return(
        <div onClick={() => SubmitListType(type)} className="cursor-pointer py-4 px-6 border rounded-xl hover:border-yellow-main transition duration-300">
            <div className="flex items-center space-x-8">
                <img className="w-12" src="/static/icons/document.png" alt="single-link" />
                <h1 className="font-source text-xl">{type} Linked-List</h1>
                <div className="flex justify-end w-auto">
                    <img className="w-4" src="/static/icons/plus.png" alt="plus" />
                </div>
            </div>
        </div>
    );
}