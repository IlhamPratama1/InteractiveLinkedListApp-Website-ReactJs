import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

type QuestListType = {
    isComplete: boolean,
    detail: string,
    type: string
}

export default function QuestList({ isComplete, detail, type }: QuestListType) {
    return (
        <div className='flex items-center space-x-2'>
            <div className='w-14'>
                {isComplete ? <CheckCircleIcon className='text-cyan-dark' /> : <XCircleIcon className='text-red' /> }
            </div>
            <div className='w-full'>
                <h1 className='text-sm'>{detail}</h1>
                <h1 className='text-xs opacity-40 capitalize'>{type} Linked List</h1>
            </div>
        </div>
    );
}