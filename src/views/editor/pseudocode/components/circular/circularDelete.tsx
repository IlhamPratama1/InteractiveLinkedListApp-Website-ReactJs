import SyntaxHighlighter from 'react-syntax-highlighter';

export default function CircularDeleteContent() {
    const sectionCode1 = `
    Node new_node, ptr = new Node()
    ptr = start
    `;
    const sectionCode2 = `
    if (index > 0) {
        for(int i = 0; i < index-1; i++) ptr = ptr.next
        Node deleteNode = ptr.next
        ptr.next = ptr.next.next
        deleteNode.next = null
        free(deleteNode)
    }
    `;
    const sectionCode3 =`
    else {
        start = ptr.next
        ptr.next = null
        delete(ptr)
    }
    `;
    return (
        <div className="font-roboto space-y-3 text-md">
            <h5 className='text-lg font-bold'>Menghapus Node</h5>
            <p>Menginisiasi node baru dengan nama new_node dan ptr. ptr digunakan sebagai indexing atau pembantu dalam posisi dan index node tujuan. lalu masukkan data pada new_node. kemudian posisikan ptr pada start.</p>
            <SyntaxHighlighter language="javascript" customStyle={{ width: '26rem', backgroundColor: "#FAFAFA" }}>
                {sectionCode1}
            </SyntaxHighlighter>
            <p>kemudian code dibawah digunakan untuk mengecek apakah data kosong, jika tidak maka posisikan pointer di akhir index node, lalu ubah pointer next dari ptr ke new_node, untuk pointer new_node ganti ke null, sebagai indikasi bahwa new_node merupakan data terakhir pada list.</p>
            <SyntaxHighlighter language="javascript" customStyle={{ width: '26rem', backgroundColor: "#FAFAFA" }}>
                {sectionCode2}
            </SyntaxHighlighter>
            <p>jika data kosong, kita tinggal ubah pointer next dari new_node ke null untuk menandakan bahwa new_node merupakand data pertama dari list</p>
            <SyntaxHighlighter language="javascript" customStyle={{ width: '26rem', backgroundColor: "#FAFAFA" }}>
                {sectionCode3}
            </SyntaxHighlighter>
        </div>
    );
}