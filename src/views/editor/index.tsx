// lib
import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

// External funtion
import { GetListDetail } from '../../api/listRequest';
import { DecodeId } from '../../encrypt/hashId';
import { GetNodeDetail, PostNewNode } from '../../api/nodeRequest';
import { GetCodeDetail, PostNewCode, PostNewLog, PostNewOperation, PostNewSearchLog } from '../../api/codeRequest';
import { GetMyQuests } from '../../api/questRequest';
import { GetMyProfile } from '../../api/userRequest';

// Redux component
import { CodeType, ListType, LogType, NodeType, OperationType, ProfileType, QuestType, SearchLogType } from '../../type';
import { StructAction, CodeAction, NodeAction, ListAction, SearchAction, QuestAction, ProfileAction, ToolAction } from '../../state/actions';
import { ActionType } from '../../state/action-types';
import { StructStateInterface, UserStateInterface } from '../../interface';
import { State } from '../../state';

// React component
import NodeEditor from './node';
import CodeEditor from './code';
import ToolEditor from './tools';
import Navbar from '../template/editorNavbar';
import ZoomEditor from './zoom';
import TutorialView from './tutorials';
import Snackbar from '../template/snackbar/snackbar';


export default function EditorView() {
    // --- Lib
    const dispatch = useDispatch();
    let { type, encodedId } = useParams();
    let navigate = useNavigate();

    // --- Redux State
    const auth: UserStateInterface = useSelector((state: State) => state.auth);

    // --- React State
    const [ firstTime, setFirstTime ] = useState<boolean>(true);
    const [ editorReady, setEditorReady ] = useState<boolean>(false);

    // --- Func
    const SetInitialNode = useCallback( async () => {
        const decodedId = Number(DecodeId(encodedId));
        const node: NodeType = await GetNodeDetail(decodedId);
        
        dispatch<NodeAction>({
            type: ActionType.SETNODE,
            payload: node.data
        });
    }, [dispatch, encodedId]);

    const SetInitialCode = useCallback( async () => {
        const decodedId = Number(DecodeId(encodedId));
        const code: CodeType = await GetCodeDetail(decodedId);

        dispatch<CodeAction>({
            type: ActionType.SETCODELOGOPERATION,
            payload: {
                id: code.id,
                code: code.data,
                log: code.log.data,
                operation: code.operation.data,
                lastOperation: '',
                searchLog: code.searchLog.data
            }
        });
    }, [encodedId, dispatch]);

    const CreateNewCodeData = useCallback( async() => {
        const decodedId = Number(DecodeId(encodedId));
        const code: CodeType = await PostNewCode(decodedId);

        const log: LogType = await PostNewLog(code.id);
        const operation: OperationType = await PostNewOperation(code.id);
        const searchLog: SearchLogType = await PostNewSearchLog(code.id);

        dispatch<CodeAction>({
            type: ActionType.SETCODELOGOPERATION,
            payload: {
                id: code.id,
                code: code.data,
                log: log.data,
                operation: operation.data,
                lastOperation: '',
                searchLog: searchLog.data
            }
        });
    }, [dispatch, encodedId]);

    const CreateNewNodeData = useCallback( async() => {
        const decodedId = Number(DecodeId(encodedId));
        const node: NodeType = await PostNewNode(decodedId);
        dispatch<NodeAction>({
            type: ActionType.SETNODE,
            payload: node.data
        });
    }, [encodedId, dispatch]);

    const CheckInitialData = useCallback( async () => {
        dispatch<NodeAction>({
            type: ActionType.RESETNODE
        });
        
        const decodedId = Number(DecodeId(encodedId));
        const listDetail: ListType = await GetListDetail(decodedId);
        const quests: Array<QuestType> = await GetMyQuests();
        const profile: ProfileType = await GetMyProfile();

        dispatch<ListAction>({
            type: ActionType.SETTYPE,
            payload: listDetail.type
        });
        dispatch<StructAction>({
            type: ActionType.SETSTRUCT,
            payload: {
                listId: listDetail.id,
                structName: listDetail.struct.name,
                structData: listDetail.struct.data
            }
        });
        dispatch<SearchAction>({
            type: ActionType.RESETSEARCHRESULT
        });
        dispatch<ToolAction>({
            type: ActionType.RESETALLTOOLS
        });
        dispatch<QuestAction>({
            type: ActionType.SETQUESTDATA,
            payload: quests
        });
        dispatch<ProfileAction>({
            type: ActionType.SETPROFILE,
            payload: {
                username: profile.username,
                email: profile.email
            }
        });

        if (listDetail.code) await SetInitialCode();
        else await CreateNewCodeData();

        if (listDetail.node) await SetInitialNode();
        else await CreateNewNodeData();

        setEditorReady(true);
    }, [encodedId, dispatch, SetInitialCode, SetInitialNode, CreateNewCodeData, CreateNewNodeData]);

    const CreateInitialData = useCallback( () => {
        const struct: StructStateInterface = JSON.parse(localStorage.getItem('struct_data') as string);
        dispatch<NodeAction>({
            type: ActionType.RESETNODE
        });
        dispatch<CodeAction>({
            type: ActionType.RESETCODE
        });
        dispatch<ToolAction>({
            type: ActionType.RESETALLTOOLS
        });
        dispatch<ListAction>({
            type: ActionType.SETTYPE,
            payload: type ? type : 'single'
        });
        dispatch<StructAction>({
            type: ActionType.SETSTRUCT,
            payload: {
                listId: 0,
                structName: struct.structName,
                structData: struct.structData
            }
        });
        dispatch<SearchAction>({
            type: ActionType.RESETSEARCHRESULT
        });

        setEditorReady(true);
    }, [dispatch, type]);

    useEffect(() => {
        const cookies = new Cookies();
        setFirstTime(cookies.get('thirdTutorial'));
        
        if (!auth.token) CreateInitialData();
        else CheckInitialData();
    }, [CheckInitialData, auth.token, navigate, CreateInitialData])

    return (
        <div className="h-screen mx-auto bg-white-gray">
            {editorReady ?
                <React.Fragment>
                    <Navbar />
                    <Snackbar timeout={2000} />
                    <ToolEditor />
                    <ZoomEditor />
                    <NodeEditor />
                    <CodeEditor />
                    {firstTime 
                        ? null
                        : <TutorialView setFirstTime={setFirstTime} /> 
                    }
                </React.Fragment> :
                <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
                    <svg role="status" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-dark" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            }
        </div>
    );
}