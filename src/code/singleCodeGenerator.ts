import CodeGenerator from "./codeGenerator";

export default class SingleLinkCodeGerator extends CodeGenerator {
    // Map all paramater in function of node operation
    MapParamInFunction(): string {
        let struct_type_param: string = ``;
        for (let i = 0; i < this._structType.length; i++) {
            if (i !== 0 ) {
                if (i !== this._structType.length - 1) {
                    struct_type_param = struct_type_param + `${this._structType[i].type} ${this._structType[i].value}, `;
                } else {
                    struct_type_param = struct_type_param + `${this._structType[i].type} ${this._structType[i].value}`;
                }
            }
        }

        return struct_type_param;
    }

    // Map all node value inside of node operation function
    MapNodeValue(new_node: string): string {
        let struct_data: string = ``
        for (let i = 0; i < this._structType.length; i++) {
            if (i !== 0) {
                struct_data = struct_data + `${new_node} -> ${this._structType[i].value} = ${this._structType[i].value};`;
                if (i !== this._structType.length - 1) {
                    struct_data = struct_data + `
        `;
                }
            }
        }
        return struct_data;
    }

    // Map paramater in function call
    MapParamInCall(structData: any) {
        let struct_type_param = ``;
        let variableData = ``;
        for (let i = 0; i < this._structType.length; i++) {
            if (i !== 0 ) {
                if(this._structType[i].type === 'string') {
                    variableData = `"${structData[this._structType[i].value]}"`;
                }
                else {
                    variableData = `${structData[this._structType[i].value]}`;
                }
                if (i !== this._structType.length - 1) {
                    struct_type_param = struct_type_param + `${variableData}, `;
                } else {
                    struct_type_param = struct_type_param + `${variableData}`;
                }
            }
        }
        return struct_type_param;
    }

    // Map struct data in display function
    MapDisplayValue(): string {
        let struct_data: string = ``
        for (let i = 0; i < this._structType.length; i++) {
            if (i !== 0) {
                struct_data = struct_data + `cout << "${this._structType[i].value} : " << ptr -> ${this._structType[i].value} << endl;`;
                if (i !== this._structType.length - 1) {
                    struct_data = struct_data + `
            `;
                }
            }
        }
        return struct_data;
    }

    // return display function
    Display(): string {
        let display: string = `
    struct ${this._structName} *display(struct ${this._structName} *start)
    {
        struct ${this._structName} *ptr;
        int index = 0;
        ptr = start;
        cout << endl << "LINKED LIST RESULT :" << endl;
        while(ptr != NULL) {
            cout << "Index " << index << endl;
            cout << "DATA " << endl;
            ${this.MapDisplayValue()}
            cout << endl;
            ptr = ptr -> next;
            index++;
        }
        return start;
    }
    `;
    return display;
    }

    // Add new node function
    AddNode(): string {
        let add: string = `
    struct ${this._structName} *add_new_node(struct ${this._structName} *start, ${this.MapParamInFunction()})
    {
        ${this._structName} *new_node, *ptr;

        new_node = (struct ${this._structName}*)malloc(sizeof(struct ${this._structName}));
        ${this.MapNodeValue('new_node')}
        ptr = start;

        if (start != NULL) {
            while(ptr -> next != NULL) {
                ptr = ptr -> next;
            }

            ptr -> next = new_node;
            new_node -> next = NULL;
        } else {
            new_node -> next = NULL;
            start = new_node;
        }
        cout << "- Adding new node" << endl;
        return start;
    }
    `;
    return add;
    }

    // Insert node before index function
    InsertBeforeIndex(): string {
        let insertInIndex = `
    struct ${this._structName} *insert_before_index(struct ${this._structName} *start, int index, ${this.MapParamInFunction()})
    {
        ${this._structName} *new_node, *ptr;

    	new_node = (struct ${this._structName} *)malloc(sizeof(struct ${this._structName}));
    	${this.MapNodeValue('new_node')}
    	
    	if(index < 1) {
    	    new_node -> next = start;
    	    start = new_node;
    	    
    	} else {
    	    ptr = start;
    	    for (int i = 0; i < index - 1; i++) {
    	        ptr = ptr -> next;
    	    }
    	    
    	    new_node -> next = ptr -> next;
    	    ptr -> next = new_node;
    	}
        cout << "- Insert node before index " << index << endl;
    	return start;
    }
    `;
    return insertInIndex;
    }

    // Insert node after index function
    InsertAfterIndex(): string {
        let insertAfterIndex = `
    struct ${this._structName}  *insert_after_index(struct ${this._structName}  *start, int index, ${this.MapParamInFunction()})
    {
        ${this._structName}  *new_node, *ptr;

    	new_node = (struct ${this._structName}  *)malloc(sizeof(struct ${this._structName} ));
    	${this.MapNodeValue('new_node')}
    	
    	ptr = start;
    	for (int i = 0; i < index; i++) {
    	    ptr = ptr -> next;
    	}
    	
    	new_node -> next = ptr -> next;
    	ptr -> next = new_node;
        cout << "- Insert node after index " << index << endl;
    	return start;
    }
    `;
    return insertAfterIndex;
    }

    // Delete node in index function
    DeleteInIndex(): string {  
    let deleteInIndex: string = `
    struct ${this._structName} *delete_in_index(struct ${this._structName} *start, int index)
    {
        ${this._structName} *ptr;
        ptr = start;

        if (index < 1) {
            start = ptr -> next;
            ptr -> next = NULL;
            free(ptr);
        } else {
            for(int i = 0; i < index-1; i++) {
                ptr = ptr -> next;
            }
            ${this._structName} *deleteNode = ptr -> next;
            ptr -> next = ptr -> next -> next;
            deleteNode -> next = NULL;
            free(deleteNode);
        }
        cout << "- Delete node in index " << index << endl;
        return start;
    }
    `;
    return deleteInIndex;
    }

    // Generate source code function
    GenerateSourceCode(operations: Array<string>, searchType: Array<string>) {
        let operateFunction = ``;
        let searchIndex = 0;
        for(let i = 0; i < operations.length; i++) {
            switch(operations[i]) {
                case 'add':
                    operateFunction = operateFunction + this.AddNode();
                    break;
                case 'before':
                    operateFunction = operateFunction + this.InsertBeforeIndex();
                    break;
                case 'after':
                    operateFunction = operateFunction + this.InsertAfterIndex();
                    break;
                case `search${searchType[searchIndex]}`:
                    operateFunction = operateFunction + this.SearchData(searchType[searchIndex]);
                    searchIndex = searchIndex + 1;
                    break;
                case 'delete':
                    operateFunction = operateFunction + this.DeleteInIndex();
                    break;
                default:
                    console.log("operation not found");
            }
        }
        operateFunction = operateFunction + this.Display();
        let sourceCode = this.head + this.GenerateStruct() + operateFunction;
        return sourceCode;
    }

    // Add Call function in main
    OperateMainFunction(operation: string, structData: any, data: number | string, searchType: string) {
        let operateMainFunction = ``;
        switch(operation) {
            case 'add':
                operateMainFunction = `add_new_node(start, ${this.MapParamInCall(structData)});`;
                break;
            case 'before':
                operateMainFunction = `insert_before_index(start, ${data}, ${this.MapParamInCall(structData)});`
                break;
            case 'after':
                operateMainFunction = `insert_after_index(start, ${Number(data) - 1}, ${this.MapParamInCall(structData)});`
                break;
            case `search${searchType}`:
                operateMainFunction = `search_data_by_${searchType}(start, ${this.MainSearchParam(data.toString(), searchType)});`
                break;
            case 'delete':
                operateMainFunction = `delete_in_index(start, ${data});`
                break;
            default:
                console.log("operation not found");
        }
        return operateMainFunction;
    }

    // Genereate main in function
    GenerateMainFunction(operateMainFunction: Array<string>) {
        let mainFunction = this.MainOperation(operateMainFunction);
        return mainFunction;
    }
}