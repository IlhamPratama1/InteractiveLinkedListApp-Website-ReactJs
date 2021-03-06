export enum ActionType {
    // Auth
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',

    // Struct
    SETSTRUCT = 'SETSTRUCT',
    SETSTRUCTNAME = 'SETSTRUCTNAME',
    SETSTRUCTDATA = 'SETSTRUCTDATA',
    RESETSTRUCTDATA = 'RESETSTRUCTDATA',
    
    // Project Type
    SETTYPE = 'SETTYPE',
    
    // Operation
    SETCODELOGOPERATION = 'SETCODELOGOPERATION',
    SETLASTOPERATION = 'SETLASTOPERATION',
    
    // Code & Log
    RESETCODE = 'RESETCODE',
    SETSEARCHLOG = 'SETSEARCHLOG',

    // Node
    SETNODE = 'SETNODE',
    RESETNODE = 'RESETNODE',
    OPENNODEINDEX = 'OPENNODEINDEX',
    OPENTOOLINDEX = 'OPENTOOLINDEX',
    EDITNODEINDEX = 'EDITNODEINDEX',

    // Tools
    CLOSEDETAILINDEX = 'CLOSEDETAILINDEX',
    SETSEARCHRESULT = 'SETSEARCHRESULT',
    RESETSEARCHRESULT = 'RESETSEARCHRESULT',
    RESETALLTOOLS = 'RESETALLTOOLS',

    // Quest
    SETQUESTDATA = 'SETQUESTDATA',
    SETQUESTCOMPLETE = 'SETQUESTCOMPLETE',

    // Profile
    SETPROFILE = 'SETPROFILE',

    // Snackbar
    OPENSNACKBAR = 'OPENSNACKBAR',
    CLOSESNACKBAR = 'CLOSESNACKBAR',

    // Animation
    SETANIMATION = 'SETANIMATION',
    RESETANIMATION = 'RESETANIMATION',
}