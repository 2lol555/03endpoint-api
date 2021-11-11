import {Book} from "./types/Book";

export function lookupBook(id:number, books:Array<Book>){
    for (var i=0; i < books.length; i++) {
        if (books[i]._id == id.toString()){
            return books[i]
        }
    }
}

