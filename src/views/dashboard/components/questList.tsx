type QuestListType = {
    isComplete: boolean,
    detail: string,
    type: string
}

export default function QuestList({ isComplete, detail, type}: QuestListType) {
    return (
        <div className={`border-l-8 ${isComplete ? 'border-cyan-dark': 'border-orange'}  pl-4 space-y-2`}>
            <h1 className='font-roboto text-md'>{detail}</h1>
            <h1 className='font-roboto text-sm opacity-40 capitalize'>{type} Linked List</h1>
        </div>
    );
}