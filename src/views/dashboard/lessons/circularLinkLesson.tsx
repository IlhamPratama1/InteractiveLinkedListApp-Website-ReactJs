import { Link } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';

export default function CircularLinkLesson() {
    const struct1 = `   struct Node {
        Node* next;
        int data;
    };`;

    const mahasiswa = `   struct Mahasiswa {
        Node* next;
        int NIM;
        string nama;
    };`

    return (
        <div className="space-y-6 font-roboto lg:w-3/4">
            <h1 className='text-2xl font-bold'>Materi Circular Linked List</h1>
            <div className="space-y-3">
                <h5 className='text-lg font-bold'>Pengertian Circular Linked List</h5>
                <p> Circular Linked List memiliki kemiripan dengan Single Linked List, tapi penerapannya berbeda. pada Circular Linked List
                    tidak terdapat nilai null pada pointer next di Node, artinya semua node yang terdapat pada suatu list, tersambung satu sama lainnya
                    dengan pointer next. Circular Linked List sebenarnya juga dapat diterapkan pada Double Linked List dimana pointer next dan prev saling bersambung dengan node yang lain.
                    pada circular linked list antara start dan tail saling bersambung sehingga tidak ada nilai null pada pointer atau data pada suatu node.
                </p>
                <img className='scale-90' src='/static/images/lessons/circularVisual.PNG' alt='project' />
                <p>
                    akses node dalam Single Linked List dimulai dari head kemudian bergeser ke node-node berikutnya dengan menggunakan pointer next. Dengan Single Linked List, proses 
                    pengaksesan node hanya dapat dilakukan dalam satu arah dari head ke tail karena masing-masing node tidak memiliki pointer penghubung dengan node sebelumnya. Dalam bahasa 
                    C++, implementasi sebuah node adalah
                </p>
                <SyntaxHighlighter language="cpp" customStyle={{ width: "22rem", backgroundColor: "#FCFCFC" }}>
                    {struct1}
                </SyntaxHighlighter>
                <SyntaxHighlighter language="cpp" customStyle={{ width: "22rem", backgroundColor: "#FCFCFC" }}>
                    {mahasiswa}
                </SyntaxHighlighter>
            </div>
            <div className='flex justify-between	'>
                <div className='flex space-x-4 items-center'>
                    <h5 className='text-md font-bold'>Double Linked List</h5>
                    <Link to={`/dashboard/lesson/double-link`} className="flex justify-center items-center rounded-md w-24 h-12 bg-blue-dark text-white hover:text-yellow font-bold font-roboto text-sm md:text-md lg:text-lg transition duration-300">Prev</Link>
                </div>
            </div>
        </div>
    );
}