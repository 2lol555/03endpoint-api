import fs from "fs"
import express, {json, urlencoded} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";

import {Book} from "./types/Book";
import {lookupBook} from "./MyMethods";

let app;

function createServer(){
    app = express()

    app.use(cors())
    app.use(json())
    app.use(urlencoded({extended: false}))

    http.createServer(app).listen(3000, () => {
        console.log("Running server on port 3000");
    });

    app.get("/api/library/book/:id/info", (req, res) => {
        const id = req.params["id"]

        let myBook = lookupBook(parseInt(id) , myJson)

        if (myBook == undefined){
            res.json({Response:"Kniha s daným ID nebola nájdená"})
        }
        else {
            res.json({ID:myBook._id, Nazov:myBook.nazov, Autor:myBook.autor, Zaner:myBook.zaner})
        }

    })

    app.post("/api/library/book/:id/info", (req, res) => {
        const id = req.params["id"]

        let myBook = lookupBook(parseInt(id) , myJson)

        if (myBook == undefined){
            res.json({Response:"Kniha s daným ID nebola nájdená"})
        }
        else {
            res.json(myBook)
        }

    })
}

const myFile = fs.readFileSync("myFile.json")

const myJson: Book[] = JSON.parse(myFile.toString())

createServer()