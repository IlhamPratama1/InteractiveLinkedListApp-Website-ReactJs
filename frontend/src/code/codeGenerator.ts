import { StructFormInterface } from "../interface";

export default class CodeGenerator {
    // Initial variable
    _structType: Array<StructFormInterface> = [];
    _structName: string = '';

    // Const variable
    head: string = `
    #include <stdio.h>
    #include <stdlib.h>
    #include <malloc.h>
    #include <iostream>
    #include <string>
    using namespace std;
    `;
    
    // Constructor
    constructor(structType:  Array<StructFormInterface>, structName: string) {
        this._structType = structType;
        this._structName = structName;
    }

    // Map all struct value
    MapStructValue(): string {
        let struct_type: string = ``;
        for (let i = 0; i < this._structType.length; i++) {
            struct_type = struct_type + `${this._structType[i].type} ${this._structType[i].value};`;
            if (i !== this._structType.length - 1) {
                struct_type = struct_type + `
        `;
            }
        }

        return struct_type;
    }

    // Generate struct function
    GenerateStruct(): string {
        let struct: string = `
    struct ${this._structName} {
        ${this.MapStructValue()}
    };

    struct ${this._structName} *start = NULL;
    `;
        return struct;
    }

    // Map all search paramater
    MapSearchParam(searchType: string) {
        let struct_type_param: string = ``;
        for (let i = 0; i <  this._structType.length; i++) {
            if ( this._structType[i].value === searchType) {
                struct_type_param = struct_type_param + `${ this._structType[i].type} ${ this._structType[i].value}`;
            }
        }

        return struct_type_param;
    }

    // Map all search param in main
    MainSearchParam(index: string, searchType: string) {
        let searchParam = ``;
        for (let i = 0; i < this._structType.length; i++) {
            if(this._structType[i].value === searchType) {
                if (this._structType[i].type === "string") {
                    searchParam = `"${index}"`;
                } else if (this._structType[i].type === "int") {
                    searchParam = index;
                } else {
                    searchParam = index;
                }
            }
        }
        return searchParam;
    }

    // Search data
    SearchData(searchType: string) {
        let searchData: string = `
    struct ${this._structName} *search_data_by_${searchType}(struct ${this._structName} *start, ${this.MapSearchParam(searchType)})
    {
        ${this._structName} *ptr;
        ptr = start;
        int index = 0;
        while (ptr != NULL) 
        { 
            if (ptr -> ${searchType} == ${searchType}) {
                cout << "${searchType} : " << ${searchType} << endl;
                cout << "Ada di INDEX "<< index << endl << endl;
                return start;
            }
            ptr = ptr->next; 
            index++;
        }
        cout << "${searchType} : " << ${searchType} << endl;
        cout << "TIDAK ADA" << endl << endl;
        return start; 
    }
    `;

    return searchData
    }

    // generate main function
    MainOperation(operateMainFunction: Array<string>){
        let functionOperation = ``;
        for(let i = 0; i < operateMainFunction.length; i++) {
            functionOperation = functionOperation + `start = ${operateMainFunction[i]}
        `;
        }
        let mainFunction = `
    int main(int argc, char *argv[]) {
        ${functionOperation}
        start = display(start);
        return 0;
    };
        `;
        return mainFunction
    }

    // Override Function
    MapParamInFunction(): string { return this._structName };
    MapNodeValue(new_node: string): string { return this._structName };
    MapParamInCall(structData: any): string { return this._structName };
    MapDisplayValue(): string { return this._structName };
    Display(): string { return this._structName };
    AddNode(): string { return this._structName };
    InsertBeforeIndex(): string { return this._structName };
    InsertAfterIndex(): string { return this._structName };
    DeleteInIndex(): string { return this._structName };
    GenerateSourceCode(operations: Array<string>, searchType: Array<string>): string { return this._structName };
    OperateMainFunction(operation: string, structData: any, data: number | string, searchType: string): string { return this._structName };
    GenerateMainFunction(operateMainFunction: Array<string>): string { return this._structName };
}