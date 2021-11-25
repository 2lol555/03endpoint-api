import {Book} from "./types/Book";
import * as fs from "fs";

export function lookupBook(id:string, books:Array<Book>){
    for (let i=0; i < books.length; i++) {
        if (books[i]._id == id.toString()){
            return books[i]
        }
    }
}

export function checkIfBookExists(book: any){
    return book != undefined;
}

export function saveFile(books:Book[]){
    console.log(JSON.stringify(books))


    console.log("Data written to a different location to avoid damage")
    fs.writeFile("myFile.json", JSON.stringify(books), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    })
}