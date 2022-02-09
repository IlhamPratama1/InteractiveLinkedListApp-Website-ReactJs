// lib
import { useCallback, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

// External funtion
import { GetListDetail } from '../../api/listRequest';
import { DecodeId } from '../../encrypt/hashId';
import { GetNodeDetail } from '../../api/nodeRequest';
import { GetCodeDetail, PostNewCode, PostNewLog, PostNewOperation } from '../../api/codeRequest';

// Redux component
import { CodeType, ListType, LogType, NodeType, OperationType } from '../../type';
import { ActionType } from '../../state/action-types';
import { StructAction } from '../../state/actions';
import { CodeAction } from '../../state/actions/codeAction';
import { selectCode, selectStruct } from '../../state/dispatch';
import { CodeStateInterface, StructStateInterface } from '../../interface';


export default function EditorView() {
    // Lib
    const dispatch = useDispatch();
    let { encodedId } = useParams();

    const Code: CodeStateInterface = useSelector(selectCode);
    const Struct: StructStateInterface = useSelector(selectStruct);

    const SetInitialNode = useCallback( async () => {
        const decodedId = Number(DecodeId(encodedId));
        const node: NodeType = await GetNodeDetail(decodedId);
        console.log(node);
    }, [encodedId]);

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
            }
        });
    }, [encodedId, dispatch]);

    const CreateNewCodeData = useCallback( async() => {
        const decodedId = Number(DecodeId(encodedId));
        const code: CodeType = await PostNewCode(decodedId);

        const log: LogType = await PostNewLog(code.id);
        const operation: OperationType = await PostNewOperation(code.id);

        dispatch<CodeAction>({
            type: ActionType.SETCODELOGOPERATION,
            payload: {
                id: code.id,
                code: code.data,
                log: log.data,
                operation: operation.data
            }
        });
    }, [dispatch, encodedId]);

    const CheckInitialData = useCallback( async () => {
        const decodedId = Number(DecodeId(encodedId));
        const listDetail: ListType = await GetListDetail(decodedId);

        dispatch<StructAction>({
            type: ActionType.SETSTRUCT,
            payload: {
                structName: listDetail.struct.name,
                structData: listDetail.struct.data
            }
        });

        if (listDetail.code) SetInitialCode();
        else CreateNewCodeData();

        if (listDetail.node) SetInitialNode();
        else console.log("create node");

    }, [encodedId, dispatch, SetInitialCode, SetInitialNode, CreateNewCodeData]);

    useEffect(() => {
        CheckInitialData();
    }, [CheckInitialData])

    return (
        <div className="container mx-auto">
            {Code.operation}
            {Struct.structData.map((data, i) => {
                return (<div key={i} className=''>{data.type}</div>);
            })}
        </div>
    );
}