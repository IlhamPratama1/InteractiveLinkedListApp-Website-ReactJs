type TypeProjectInterface = {
    SubmitFunction: Function,
    type: string
}

export default function TypeProject({ SubmitFunction, type }: TypeProjectInterface) {
    return(
        <div onClick={() => SubmitFunction(type)} className="cursor-pointer py-4 px-6 border rounded-xl hover:border-yellow-main transition duration-300">
            <div className="flex items-center space-x-8">
                <img className="w-12" src="/static/icons/document.png" alt="single-link" />
                <h1 className="font-source text-xl">Single Linked-List</h1>
                <div className="flex justify-end w-auto">
                    <img className="w-4" src="/static/icons/plus.png" alt="plus" />
                </div>
            </div>
        </div>
    );
}