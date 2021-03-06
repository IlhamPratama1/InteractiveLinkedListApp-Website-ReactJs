
// Regex validation function
// paramater type of variable
export function CheckRegexValidation(type: string) {
    const numRegex: RegExp = /^[0-9\b]+$/;
    const floatRegex: RegExp = /^\d{0,7}(\.\d{0,7}){0,1}$/;
    const letterNumRegex: RegExp = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/;
    const doubleRegex: RegExp = /^\d{0,15}(\.\d{0,15}){0,1}$/;

    switch (type) {
        case 'int':
            return numRegex;
        case 'string':
            return letterNumRegex;
        case 'float':
            return floatRegex;
        case 'double':
            return doubleRegex;
        default:
            return letterNumRegex;
    }
}