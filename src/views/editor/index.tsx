// lib
import { useCallback, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';

// External funtion
import { GetListDetail } from '../../api/listRequest';
import { DecodeId } from '../../encrypt/hashId';
import { GetNodeDetail, PostNewNode } from '../../api/nodeRequest';
import { GetCodeDetail, PostNewCode, PostNewLog, PostNewOperation, PostNewSearchLog } from '../../api/codeRequest';
import { GetMyQuests } from '../../api/questRequest';

// Redux component
import { CodeType, ListType, LogType, NodeType, OperationType, QuestType, SearchLogType } from '../../type';
import { StructAction, CodeAction, NodeAction, ListAction, SearchAction, QuestAction } from '../../state/actions';
import { ActionType } from '../../state/action-types';

// React component
import NodeEditor from './node';
import CodeEditor from './code';
import ToolEditor from './tools';
import Navbar from '../template/navbar';


export default function EditorView() {
    // --- Lib
    const dispatch = useDispatch();
    let { encodedId } = useParams();

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

        if (listDetail.code) SetInitialCode();
        else CreateNewCodeData();

        if (listDetail.node) SetInitialNode();
        else CreateNewNodeData();

    }, [encodedId, dispatch, SetInitialCode, SetInitialNode, CreateNewCodeData, CreateNewNodeData]);

    useEffect(() => {
        CheckInitialData();
    }, [CheckInitialData])

    return (
        <div className="mx-auto">
            <Navbar />
            <ToolEditor />
            <CodeEditor />
            <NodeEditor />
        </div>
    );
}