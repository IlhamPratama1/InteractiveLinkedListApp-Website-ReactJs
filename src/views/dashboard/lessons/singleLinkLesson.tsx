import { Link } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';

export default function SingleLinkLesson() {
    const struct1 = `   struct Node {
        Node* next;
        int data;
    };`;

    const mahasiswa = `   struct Mahasiswa {
        Node* next;
        int NIM;
        string nama;
    };`

    const add_new_node = `
    struct Mahasiswa *add_new_node(struct Mahasiswa *start, int NIM, string nama)
    {
        Mahasiswa *new_node, *ptr;

        new_node = (struct Mahasiswa*)malloc(sizeof(struct Mahasiswa));
        new_node -> NIM = NIM;
        new_node -> nama = nama;
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
    }`;

    const insert_before = `
    struct Mahasiswa *insert_before_index(struct Mahasiswa *start, int index, int NIM, string nama)
    {
        Mahasiswa *new_node, *ptr;

    	new_node = (struct Mahasiswa *)malloc(sizeof(struct Mahasiswa));
    	new_node -> NIM = NIM;
        new_node -> nama = nama;
    	
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

    const insert_after = `
    struct Mahasiswa *insert_after_index(struct Mahasiswa  *start, int index, int NIM, string nama)
    {
        Mahasiswa  *new_node, *ptr;

    	new_node = (struct Mahasiswa  *)malloc(sizeof(struct Mahasiswa ));
    	new_node -> NIM = NIM;
        new_node -> nama = nama;
    	
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

    const delete_index = `
    struct Mahasiswa *delete_in_index(struct Mahasiswa *start, int index)
    {
        Mahasiswa *ptr;
        ptr = start;

        if (index < 1) {
            start = ptr -> next;
            ptr -> next = NULL;
            free(ptr);
        } else {
            for(int i = 0; i < index-1; i++) {
                ptr = ptr -> next;
            }
            Mahasiswa *deleteNode = ptr -> next;
            ptr -> next = ptr -> next -> next;
            deleteNode -> next = NULL;
            free(deleteNode);
        }
        cout << "- Delete node in index " << index << endl;
        return start;
    }
    `;

    const search_data = `
    struct Mahasiswa *search_data_by_NIM(struct Mahasiswa *start, int NIM)
    {
        Mahasiswa *ptr;
        ptr = start;
        int index = 0;
        cout << "- Seach node" << endl;
        while (ptr != NULL) 
        { 
            if (ptr -> NIM == NIM) {
                cout << " => NIM : " << NIM << endl;
                cout << " => Node in index "<< index << endl;
                return start;
            }
            ptr = ptr->next; 
            index++;
        }
        cout << " => NIM : " << NIM << endl;
        cout << " => Node data not found" << endl;
        return start; 
    }
    `;

    return (
        <div className="space-y-6 font-roboto lg:w-3/4">
            <h1 className='text-2xl font-bold'>Materi Single Linked List</h1>
            <div className="space-y-3">
                <h5 className='text-lg font-bold'>Pengertian Single Linked List</h5>
                <p>Single linked list adalah satu jenis linked list dimana setiap node terhubung dengan 
                    node lainnya oleh sebuah pointer tunggal. Masing-masing node dalam single linked list terdiri 
                    dari dua bagian, yaitu sebuah data dan sebuah pointer next yang menghubungkan node 
                    tersebut dengan node sesudahnya. Ilustrasi dari Single Linked List dapat dilihat pada Gambar
                </p>
                <img className='scale-90' src='/static/images/lessons/singleVisual.PNG' alt='project' />
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
            <div className="space-y-3">
                <h5 className='text-lg font-bold'>Sisip Depan</h5>
                <p>Operasi sisip depan digunakan untuk menambahkan node baru di depan node 
                    head. Operasi ini diawali dengan pengecekan apakah Linked List dalam kondisi 
                    kosong atau tidak. Jika Linked List dalam keadaan kosong, operasi ini memerintahkan 
                    komputer agar node baru yang ditambahkan menjadi head sekaligus tail. Namun bila 
                    Linked List sedang tidak dalam kondisi kosong, operasi tersebut akan langsung 
                    mengarahkan pointer next dari node baru ke head. Selanjutnya, operasi tersebut akan 
                    memerintahkan komputer agar node yang baru ditambahkan dicatat sebagai node 
                    head.
                </p>
                <p>
                    Dalam visualisasinya struct akan muncul pada node dan code yang ter-generate seperti pada gambar. visualisasi strut akan memiliki
                    atribut atau elemen yang sama dengan atribut dan elemen yang diinput pada form.
                </p>
            </div>
            <div className="space-y-3">
                <h5 className='text-lg font-bold'>Sisip Belakang</h5>
                <p>Operasi sisip belakang digunakan untuk menambahkan node baru di belakang 
                    node tail. Operasi ini diawali dengan pengecekan apakah Linked List dalam kondisi 
                    kosong atau tidak. Jika Linked List dalam keadaan kosong, operasi ini memerintahkan 
                    komputer agar node baru yang ditambahkan menjadi head sekaligus tail. Namun bila 
                    Linked List sedang tidak dalam kondisi kosong, operasi tersebut akan langsung 
                    mengarahkan pointer next dari tail ke node baru yang ditambahkan. Selanjutnya, 
                    operasi tersebut akan memerintahkan komputer agar node yang baru ditambahkan 
                    dicatat sebagai node tail.
                </p>
                <SyntaxHighlighter language="cpp" customStyle={{ backgroundColor: "#FCFCFC" }}>
                    {add_new_node}
                </SyntaxHighlighter>
            </div>
            <div className="space-y-3">
                <h5 className='text-lg font-bold'>Sisip Sebelum Index</h5>
                <p>Operasi Sisip Sebelum digunakan untuk menambahkan node baru yang berada pada posisi
                    sebelum index node yang dipilih. operasi dimulai dengan mengecek index apakah value index lebih dari 0, 
                    jika tidak kita bisa langsung menyisipkan node pada start. jika iya kita melakukan iterasi pada ptr agar menuju ke index
                    sebelum index node yang dituju kemudian mengarahkan pointer next ke pointer ptr, dan mengubah pointer
                    ptr ke node yang baru.
                </p>
                <SyntaxHighlighter language="cpp" customStyle={{ backgroundColor: "#FCFCFC" }}>
                    {insert_before}
                </SyntaxHighlighter>
            </div>
            <div className="space-y-3">
                <h5 className='text-lg font-bold'>Sisip Sesudah Index</h5>
                <p>Operasi Sisip Sebelum digunakan untuk menambahkan node baru yang berada pada posisi
                    sesudah index node yang dipilih. operasi dimulai dengan melakukan iterasi pada node ptr sehingga
                    ptr berada pada posisi tepat pada index node yang dipilih. kemudian mengarahkan pointer next dari node baru ke
                    ptr next, setelah itu mengarahkan pointer dari ptr ke node yang baru.
                </p>
                <SyntaxHighlighter language="cpp" customStyle={{ backgroundColor: "#FCFCFC" }}>
                    {insert_after}
                </SyntaxHighlighter>
            </div>
            <div className="space-y-3">
                <h5 className='text-lg font-bold'>Delete Index</h5>
                <p>Operasi Delete Index digunakan untuk menghapus node pada index yang dipilih. operasi dimulai 
                    dengan mengecek apakah index lebih dari 0 atau index kurang dari 1 jika iya, kita bisa menggukanan node bantuan ptr
                    dan mengarahkan ke start lalu mengganti pointer next ke null. kemudian menghapus node ptr.
                    jika tidak maka kita gunakan iterasi untuk memindahkan ptr ke node sebelum index dari node yang akan dihapus
                    kemudian membuat inisialisai node yang akan dihapus pada pointer next dari ptr, lalu memindahkan pointer next dari ptr ke
                    posisi setelah node yang akan dihapus, kemudian mengganti pointer next dari node yang akan dihapus ke null
                    lalu delete node.
                </p>
                <SyntaxHighlighter language="cpp" customStyle={{ backgroundColor: "#FCFCFC" }}>
                    {delete_index}
                </SyntaxHighlighter>
            </div>
            <div className="space-y-3">
                <h5 className='text-lg font-bold'>Search Data</h5>
                <p>Operasi Search Data digunakan untuk mencari data yang sudah diinput, operasi ini menghasilkan index dari node data
                    yang ditemukan. Operasi dimulai dengan melakukan iterasi dari start sampai ke node akhir atau index akhir dari list,
                    selama iterasi, dilakukan pengecekan apakah terdapat data yang sama dengan data yang sudah diinput, jika data ditemukan
                    maka tampilkan index dari data tersebut.
                </p>
                <SyntaxHighlighter language="cpp" customStyle={{ backgroundColor: "#FCFCFC" }}>
                    {search_data}
                </SyntaxHighlighter>
            </div>
            <div className='flex justify-between	'>
                <div className='flex space-x-4 items-center'>
                    <h5 className='text-md font-bold'>Struct</h5>
                    <Link to={`/dashboard/lesson/struct`} className="flex justify-center items-center rounded-md w-24 h-12 bg-blue-dark text-white hover:text-yellow font-bold font-roboto text-sm md:text-md lg:text-lg transition duration-300">Prev</Link>
                </div>
                <div className='flex space-x-4 items-center'>
                    <Link to={`/dashboard/lesson/double-link`} className="flex justify-center items-center rounded-md w-24 h-12 bg-blue-dark text-white hover:text-yellow font-bold font-roboto text-sm md:text-md lg:text-lg transition duration-300">Next</Link>
                    <h5 className='text-md font-bold'>Double Linked List</h5>
                </div>
            </div>
        </div>
    );
}