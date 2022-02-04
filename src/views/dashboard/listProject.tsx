import { Link } from "react-router-dom";
import { ListType } from "../../type";
import Hashids from 'hashids';

type ListProjectType = {
    index: number,
    list: ListType
}

export default function ListProject({ index, list }: ListProjectType) {
    const hashids = new Hashids(process.env.REACT_APP_HASH_ID, 20);

    return (
        <Link to={`/struct/${list.type}/${hashids.encode(list.id)}`} key={index} className="py-4 px-6 border rounded-xl hover:border-yellow-main transition duration-300">
            <div className="flex justify-end w-auto">
                <img className="w-4" src="/static/icons/plus.png" alt="plus" />
            </div>
            <div className="my-6 flex justify-center w-auto">
                <img className="w-12" src="/static/icons/zip-folder.png" alt="single-link" />
            </div>
            <h1 className="font-source text-xl">Circular Linked-List</h1>
            <h2 className="font-source opacity-50 text-md">12 Maret 2022</h2>
        </Link>
    );
}