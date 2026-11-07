

class User {
    public id: number;
    public name: string;
    public email: string;
    private password: string;
    public phone: string;

    private _age: number = 18;
    protected accountType: string = "User";

    
    private notebooks: NoteBook[] = [];

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        if (value < 18 || value > 60) {
            throw new Error("Age must be between 18 and 60");
        }

        this._age = value;
    }

    displayInfo(): void {
        console.log("User ID: " + this.id);
        console.log("Name: " + this.name);
        console.log("Email: " + this.email);
        console.log("Phone: " + this.phone);
        console.log("Age: " + this.age);
        console.log("Account Type: " + this.accountType);
    }

    addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
    }

    removeNotebook(notebook: NoteBook): boolean {
        const index = this.notebooks.indexOf(notebook);

        if (index === -1) {
            return false;
        }

        this.notebooks.splice(index, 1);
        return true;
    }

    getNotebooks(): NoteBook[] {
        return [...this.notebooks];
    }
}



class Admin extends User {

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number
    ) {
        super(id, name, email, password, phone, age);
        this.accountType = "Admin";
    }

    manageNotes(
        notebook: NoteBook,
        action: "add" | "remove",
        note: Note
    ): void {

        if (action === "add") {
            notebook.addNote(note);
            console.log("Note added successfully.");
        }

        else if (action === "remove") {
            const removed = notebook.removeNote(note);

            if (removed) {
                console.log("Note removed successfully.");
            } else {
                console.log("Note not found.");
            }
        }
    }
}



class Note {
    public id: number;
    public title: string;
    public content: string;
    public author: User;

    constructor(
        id: number,
        title: string,
        content: string,
        author: User
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
    }

    get userId(): number {
        return this.author.id;
    }

    preview(): string {
        if (this.content.length <= 50) {
            return this.content;
        }

        return this.content.substring(0, 50) + "...";
    }
}



class NoteBook {
    public id: number;
    public name: string;

    private notes: Note[] = [];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    addNote(note: Note): void {
        this.notes.push(note);
    }

    removeNote(note: Note): boolean {
        const index = this.notes.indexOf(note);

        if (index === -1) {
            return false;
        }

        this.notes.splice(index, 1);
        return true;
    }

    getAllNotes(): Note[] {
        return [...this.notes];
    }
}



class ItemStorage<T> {
    private items: T[] = [];

    addItem(item: T): void {
        this.items.push(item);
    }

    removeItem(item: T): boolean {
        const index = this.items.indexOf(item);

        if (index === -1) {
            return false;
        }

        this.items.splice(index, 1);
        return true;
    }

    getAllItems(): T[] {
        return [...this.items];
    }
}



const user1 = new User(
    1,
    "Ahmed",
    "ahmed@gmail.com",
    "123456",
    "01012345678",
    22
);

console.log("===== User Information =====");
user1.displayInfo();



const admin1 = new Admin(
    2,
    "Admin",
    "admin@gmail.com",
    "admin123",
    "01112345678",
    30
);

console.log("\n===== Admin Information =====");
admin1.displayInfo();



const notebook1 = new NoteBook(1, "My First Notebook");

user1.addNotebook(notebook1);



const note1 = new Note(
    1,
    "First Note",
    "This is my first note in the notes management system.",
    user1
);

const note2 = new Note(
    2,
    "Second Note",
    "This is another note for testing the system.",
    user1
);

console.log("\n===== Admin Management =====");

admin1.manageNotes(notebook1, "add", note1);
admin1.manageNotes(notebook1, "add", note2);

console.log("\n===== Notes =====");

notebook1.getAllNotes().forEach((note) => {
    console.log("Note ID: " + note.id);
    console.log("Title: " + note.title);
    console.log("Content Preview: " + note.preview());
    console.log("Author ID: " + note.userId);
    console.log("--------------------");
});

console.log("\n===== Storage Testing =====");

const noteStorage = new ItemStorage<Note>();

noteStorage.addItem(note1);
noteStorage.addItem(note2);

console.log("Stored Notes:", noteStorage.getAllItems());



noteStorage.removeItem(note1);

console.log("\n===== After Removing First Note =====");
console.log(noteStorage.getAllItems());