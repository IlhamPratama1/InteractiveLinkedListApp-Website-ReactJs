// lib
import React, { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { TransformWrapper } from 'react-zoom-pan-pinch';

// External funtion
import { GetListDetail } from '../../api/listRequest';
import { DecodeId } from '../../encrypt/hashId';
import { GetNodeDetail, PostNewNode } from '../../api/nodeRequest';
import { GetCodeDetail, PostNewCode, PostNewLog, PostNewOperation, PostNewSearchLog } from '../../api/codeRequest';
import { GetMyQuests } from '../../api/questRequest';
import { GetMyProfile } from '../../api/userRequest';

// Redux component
import { CodeType, ListType, LogType, NodeType, OperationType, ProfileType, QuestType, SearchLogType } from '../../type';
import { StructAction, CodeAction, NodeAction, ListAction, SearchAction, QuestAction, ProfileAction } from '../../state/actions';
import { ActionType } from '../../state/action-types';
import { ToolStateInterface, UserStateInterface } from '../../interface';
import { State } from '../../state';

// React component
import NodeEditor from './node';
import CodeEditor from './code';
import ToolEditor from './tools';
import Navbar from '../template/editorNavbar';
import ZoomEditor from './zoom';


export default function EditorView() {
    // --- Lib
    const dispatch = useDispatch();
    let { encodedId } = useParams();
    let navigate = useNavigate();

    // --- Redux State
    const auth: UserStateInterface = useSelector((state: State) => state.auth);
    const { disabledPinch }: ToolStateInterface = useSelector((state: State) => state.tool);

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
    }, [encodedId, dispatch])

    const CheckInitialData = useCallback( async () => {
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

        if (listDetail.code) SetInitialCode();
        else CreateNewCodeData();

        if (listDetail.node) SetInitialNode();
        else CreateNewNodeData();

    }, [encodedId, dispatch, SetInitialCode, SetInitialNode, CreateNewCodeData, CreateNewNodeData]);

    useEffect(() => {
        if (!auth.token) navigate('/login');
        else CheckInitialData();
    }, [CheckInitialData, auth.token, navigate])

    return (
        <div className="h-screen mx-auto bg-white-gray">
            <TransformWrapper
                initialScale={1}
                minScale={1}
                disabled={disabledPinch}
                panning={ {excluded: ["input", "button"]} }
                maxScale={10} >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                        <Navbar />
                        <ToolEditor />
                        <ZoomEditor
                            ZoomIn={zoomIn}
                            ZoomOut={zoomOut}
                            ResetZoom={resetTransform}
                        />
                        <NodeEditor />
                        <CodeEditor />
                    </React.Fragment>
                )}
            </TransformWrapper>
        </div>
    );
}