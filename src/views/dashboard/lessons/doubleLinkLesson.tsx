import { Link } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';

export default function DoubleLinkLesson() {
    const struct1 = `   struct Node {
        Node* next;
        Node* prev;
        int data;
    };`;

    const mahasiswa = `   struct Mahasiswa {
        Node* next;
        Node* prev;
        int NIM;
        string nama;
    };`

    return (
        <div className="space-y-6 font-roboto lg:w-3/4">
            <h1 className='text-2xl font-bold'>Materi Double Linked List</h1>
            <div className="space-y-3">
                <h5 className='text-lg font-bold'>Pengertian Double Linked List</h5>
                <p>Double linked list adalah satu jenis linked list dimana setiap node terhubung dengan 
                    node lainnya oleh dua buah pointer. Masing-masing node dalam double linked list terdiri dari 
                    tiga bagian, yaitu sebuah data, sebuah pointer next yang menghubungkan node tersebut 
                    dengan node sesudahnya, serta sebuah pointer prev yang menghubungkan node tersebut 
                    dengan node sebelumnya.
                </p>
                <img className='scale-90' src='/static/images/lessons/singleVisual.PNG' alt='project' />
                <p>
                    Berbeda dengan Single Linked List, akses node dalam Double Linked List dapat 
                    dilakukan dalam dua arah yaitu dari head ke tail atau dari tail ke head. Hal ini disebabkan 
                    oleh dua pointer yang dimiliki oleh Double Linked List.
                    Untuk mengakses node dari arah head ke tail, akses node dapat dimulai dari head 
                    kemudian bergeser ke node-node berikutnya dengan menggunakan pointer next. Sedangkan 
                    untuk mengakses node dari arah tail ke head, akses node dapat dimulai dari tail kemudian 
                    bergeser ke node-node lain dengan menggunakan pointer prev. 
                </p>
                <SyntaxHighlighter language="cpp" customStyle={{ width: "22rem", backgroundColor: "#FCFCFC" }}>
                    {struct1}
                </SyntaxHighlighter>
                <SyntaxHighlighter language="cpp" customStyle={{ width: "22rem", backgroundColor: "#FCFCFC" }}>
                    {mahasiswa}
                </SyntaxHighlighter>
                <p>Pada Gambar diatas, kita dapat melihat bahwa node dari Double Linked List 
                    diimplementasikan dalam bentuk struktur lengkap dengan atributnya serta dua buah pointer 
                    yang menghubungkan node tersebut dengan node sebelumnya dan node sesudahnya. 
                    Double Linked List memiliki operasi-operasi yang sama dengan Single Linked List. 
                    Algoritma masing-masing operasi pada Double Linked List juga hampir sama dengan Single 
                    Linked List. Namun karena Double Linked List memiliki dua pointer, maka implementasi 
                    operasi-operasi Double Linked List pada bahasa C++ menjadi sedikit berbeda dengan operasi-operasi pada Single Linked List</p>
            </div>
            <div className='flex justify-between'>
                <div className='flex space-x-4 items-center'>
                    <h5 className='text-md font-bold'>Single Linked List</h5>
                    <Link to={`/dashboard/lesson/single-link`} className="flex justify-center items-center rounded-md w-24 h-12 bg-blue-dark text-white hover:text-yellow font-bold font-roboto text-sm md:text-md lg:text-lg transition duration-300">Prev</Link>
                </div>
                <div className='flex space-x-4 items-center'>
                    <Link to={`/dashboard/lesson/circular-link`} className="flex justify-center items-center rounded-md w-24 h-12 bg-blue-dark text-white hover:text-yellow font-bold font-roboto text-sm md:text-md lg:text-lg transition duration-300">Next</Link>
                    <h5 className='text-md font-bold'>Circular Linked List</h5>
                </div>
            </div>
        </div>
    );
}