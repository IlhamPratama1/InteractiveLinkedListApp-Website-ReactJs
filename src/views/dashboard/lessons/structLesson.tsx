import { Link } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';

export default function StructLesson() {
    const struct1 = `   struct [nama struct]{
        deklarasi elemen struct
    };`
    const struct2 = `   struct Mahasiswa {
        Mahasiswa* next;
        int NIM;
        string nama;
    };`

    return (
        <div className="space-y-4 font-roboto lg:w-3/4">
            <h1 className='text-2xl font-bold'>Materi Struct</h1>
            <div className="space-y-3">
                <h5 className='text-lg font-bold'>Pengertian Struct</h5>
                <p>Struct adalah tipe data buatan yang memuat beberapa variabel sebagai anggotanya. 
                    Variabel-variabel yang menjadi anggota struct disebut dengan elemen struct. Struct biasa 
                    digunakan untuk merepresentasikan sebuah objek yang memiliki atribut tertentu dan nilainya 
                    harus disimpan di dalam satu variabel. Contoh objek yang biasa direpresentasikan dalam 
                    struct adalah mahasiswa. Dalam sebuah objek mahasiswa, minimal terdapat dua buah atribut 
                    yaitu nama dan nomor induk mahasiswa (NIM). Oleh karena itu, objek mahasiswa dapat 
                    disimpan ke dalam struct dengan dua elemen struct yaitu nama dan nomor NIM.
                    dalam aplikasi struct dapat divisualisasikan ke dalam form data seperti pada gambar dibawah ini.
                </p>
                <img className='scale-90' src='/static/images/lessons/struct.PNG' alt='project' />
            </div>
            <div className="space-y-3">
                <h5 className='text-lg font-bold'>Pembuatan tipe data struct</h5>
                <p>Struct termasuk tipe data buatan (User-defined) sehingga pendeklarasian struct harus 
                    diawali dengan pembuatan tipe data terlebih dahulu. Dalam pembuatan tipe data struct, kita 
                    harus mendefinisikan nama struct serta mendeklarasikan elemen-elemen yang ada di 
                    dalamnya.
                </p>
                <SyntaxHighlighter language="cpp" customStyle={{ width: "22rem", backgroundColor: "#FCFCFC" }}>
                    {struct1}
                </SyntaxHighlighter>
                <p>
                    Sedangkan contoh implementasi pembuatan struct mahasiswa menggunakan bahasa C++ terdapat pada gambar dibawah ini
                </p>
                <SyntaxHighlighter language="cpp" customStyle={{ width: "22rem", backgroundColor: "#FCFCFC" }}>
                    {struct2}
                </SyntaxHighlighter>
                <p>
                    Dalam visualisasinya struct akan muncul pada node dan code yang ter-generate seperti pada gambar. visualisasi strut akan memiliki
                    atribut atau elemen yang sama dengan atribut dan elemen yang diinput pada form.
                </p>
                <img className='scale-90' src='/static/images/lessons/visualStruct.PNG' alt='project' />
                <img className='scale-90' src='/static/images/lessons/codeStruct.PNG' alt='project' />
            </div>
            <div className='flex items-center space-x-4'>
                <Link to={`/dashboard/lesson/single-link`} className="flex justify-center items-center rounded-md w-24 h-12 bg-blue-dark text-white hover:text-yellow font-bold font-roboto text-sm md:text-md lg:text-lg transition duration-300">Next</Link>
                <h5 className='text-md font-bold'>Single Linked List</h5>
            </div>
        </div>
    );
}