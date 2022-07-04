export function addNewNode(projectType: string): string {
    let pseudocode = '';
    if (projectType === 'single') {
        pseudocode = `    Node new_node, ptr = new Node()
    new_node.data = data
    ptr = start
    if (start) {
        while (ptr.next) ptr = ptr.next
        ptr.next = new_node
        new_node.next = null
    } else {
        new_node.next = null
        start = new_node
    }`;

    } else if (projectType === 'double') {
        pseudocode = `    Node new_node, ptr = new Node()
    new_node.data = data
    ptr = start
    if (start) {
        while (ptr.next) ptr = ptr.next
        new_node.prev = ptr
        ptr.next = new_node
        new_node.next = null
    } else {
        new_node.next = null
        new_node.prev = null
        start = new_node
    }`;

    } else if (projectType === 'circular') {
        pseudocode = `    Node newNode, ptr = new Node()
    newNode.data = data
    ptr = start
    if (start) {
        while (ptr.next != start) ptr = ptr.next
        ptr.next = new_node
        new_node.next = start
    } else {
        new_node.next = new_node
        start = new_node
    }`;
        
    }

    return pseudocode;
}

export function insertBefore(projectType: string): string {
    let pseudocode = '';
    if (projectType === 'single') {
        pseudocode = `    Node newNode, ptr = new Node()
    newNode.data = data
    ptr = start
    if (index > 0) {
        for (int i = 0; i < index; i++) ptr = ptr.next
        new_node.next = ptr.next
        ptr.next = new_node
    } else {
        newNode.next = start
        start = newNode
    }`;

    } else if (projectType === 'double') {
        pseudocode = `    Node newNode, ptr = new Node()
    newNode.data = data
    ptr = start
    if (index > 0) {
        for (int i = 0; i < index - 1; i++) ptr = ptr.next
    	new_node.next = ptr.next
        new_node.prev = ptr
    	ptr.next = new_node
        ptr.next.prev = new_node
    } else {
        new_node.next = start
        new_node.prev = start.prev
    	start = new_node
    }`;

    } else if (projectType === 'circular') {
        pseudocode = `    Node newNode, ptr = new Node()
    newNode.data = data
    ptr = start
    for (int i = 0; i < index - 1; i++) ptr = ptr.next
    new_node.next = ptr.next
    ptr.next = new_node`;
    }

    return pseudocode;
}

export function insertAfter(projectType: string): string {
    let pseudocode = '';
    if (projectType === 'single') {
        pseudocode = `    Node newNode, ptr = new Node()
    newNode.data = data
    ptr = start
    for (int i = 0; i < index; i++) ptr = ptr.next
    new_node.next = ptr.next
    ptr.next = new_node`;

    } else if (projectType === 'double') {
        pseudocode = `    Node newNode, ptr = new Node()
    newNode.data = data
    ptr = start
    for (int i = 0; i < index; i++) ptr = ptr.next
    new_node.next = ptr.next
    new_node.prev = ptr
    ptr.next = new_node
    ptr.next.prev = new_node`;

    } else if (projectType === 'circular') {
        pseudocode = `    Node newNode, ptr = new Node()
    newNode.data = data
    ptr = start
    for (int i = 0; i < index; i++)
    	ptr = ptr.next
    new_node.next = ptr.next
    ptr.next = new_node
    `;
    }

    return pseudocode;
}

export function deleteIndex(projectType: string): string {
    let pseudocode = '';
    if (projectType === 'single') {
        pseudocode = `    Node newNode, ptr = new Node()
    ptr = start
    if (index > 0) {
        for(int i = 0; i < index-1; i++) ptr = ptr.next
        Node deleteNode = ptr.next
        ptr.next = ptr.next.next
        deleteNode.next = null
        free(deleteNode)
    } else {
        start = ptr.next
        ptr.next = null
        delete(ptr)
    }`;

    } else if (projectType === 'double') {
        pseudocode = `    Node newNode, ptr = new Node()
    newNode.data = data
    ptr = start
    for(int i = 0; i < index - 1; i++) ptr = ptr.next
    Node deleteNode = ptr.next
    if (deleteNode.next == null) ptr.next = null
    else {
        ptr.next = deleteNode.next
        ptr.next.prev = ptr
    }
    deleteNode.next = null
    deleteNode.prev = null
    free(deleteNode)`;
    
    } else if (projectType === 'circular') {
        pseudocode = `    Node newNode, ptr = new Node()
    for(int i = 0; i < index - 1; i++) ptr = ptr.next
    Node deleteNode = ptr.next
    ptr.next = ptr.next.next
    deleteNode.next = null
    free(deleteNode)
    `;
    }

    return pseudocode;
}


export function searchData(projectType: string): string {
    let pseudocode = '';
    if (projectType === 'single') {
        pseudocode = `    Node newNode, ptr = new Node()
    newNode.data = data
    ptr = start
    while (ptr) {
        if (start) {
            if (ptr.data == data) return start
            ptr = ptr.next
            index++
        }
    }`;
    } else if (projectType === 'double') {
        pseudocode = `    Node newNode, ptr = new Node()
    newNode.data = data
    ptr = start
    if (start) {
        while (ptr.next) ptr = ptr.next
        ptr.next = newNode
        new_node.next = null
    } else {
        newNode = null
        start = newNode
    }`;
    } else if (projectType === 'circular') {
        pseudocode = `    Node newNode, ptr = new Node()
    newNode.data = data
    ptr = start
    while (true) 
    { 
        if (ptr.data == data) return start
        ptr = ptr.next
        index ++
        if (ptr == start) break
    }`;
    }

    return pseudocode;
}
