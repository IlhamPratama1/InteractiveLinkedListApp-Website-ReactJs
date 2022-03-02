type NewProjectType = {
    type: string,
    selectedProject: string,
    SubmitFunction: Function
}

export default function NewProject({ type, selectedProject, SubmitFunction }: NewProjectType) {
    return (
        <button onClick={() => SubmitFunction(type)} className={`focus:outline-none flex w-full h-14 rounded-md px-6 ${selectedProject === type ? 'bg-cyan-light' : 'bg-white'}`}>
            <div className='rounded-full h-4 w-4 bg-cyan-dark my-auto'></div>
            <h1 className={`font-roboto ${selectedProject === type && 'font-bold'} text-lg m-auto capitalize`}>{type} Linked List</h1>
        </button>
    );
}