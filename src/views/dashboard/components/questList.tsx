type QuestListType = {
    isComplete: boolean,
    detail: string,
    type: string
}

export default function QuestList({ isComplete, detail, type}: QuestListType) {
    return (
        <div className={`border-l-8 ${isComplete ? 'border-cyan-dark': 'border-orange'}  pl-4 space-y-1`}>
            <h1 className='font-roboto text-md'>{detail}</h1>
            <h1 className='font-roboto text-sm opacity-40 capitalize'>{type} Linked List</h1>
            <div className="flex items-center space-x-3">
                <img className='w-6' src='/static/icons/star.png' alt='star' />
                <h1 className='font-roboto text-sm font-bold opacity-80'>120</h1>
                <img className='w-6' src='/static/icons/trophy.png' alt='star' />
                <h1 className='font-roboto text-sm font-bold opacity-80'>8</h1>
            </div>
        </div>
    );
}