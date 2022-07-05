import SyntaxHighlighter from 'react-syntax-highlighter';

export default function SingleInsertAfterContent() {
    const sectionCode1 = `
    Node new_node, ptr = new Node()
    new_node.data = data
    ptr = start
    `;
    const sectionCode2 = `
    for (int i = 0; i < index; i++) ptr = ptr.next
    new_node.next = ptr.next
    ptr.next = new_node
    `;
    return (
        <div className="font-roboto space-y-3 text-md">
            <h5 className='text-lg font-bold'>Insert Node after Index</h5>
            <p>Menginisiasi node baru dengan nama new_node dan ptr. ptr digunakan sebagai indexing atau pembantu dalam posisi dan index node tujuan. lalu masukkan data pada new_node. kemudian posisikan ptr pada start.</p>
            <SyntaxHighlighter language="javascript" customStyle={{ width: '26rem', backgroundColor: "#FAFAFA" }}>
                {sectionCode1}
            </SyntaxHighlighter>
            <p>kemudian code dibawah digunakan untuk mengecek apakah data kosong, jika tidak maka posisikan pointer di akhir index node, lalu ubah pointer next dari ptr ke new_node, untuk pointer new_node ganti ke null, sebagai indikasi bahwa new_node merupakan data terakhir pada list.</p>
            <SyntaxHighlighter language="javascript" customStyle={{ width: '36rem', backgroundColor: "#FAFAFA" }}>
                {sectionCode2}
            </SyntaxHighlighter>
        </div>
    );
}