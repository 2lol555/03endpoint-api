import fs from "fs"
import express, {json, urlencoded} from "express";
import cors from "cors";
import http from "http";

import {Book} from "./types/Book";
import {checkIfBookExists, lookupBook, saveFile} from "./MyMethods";

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
        let myBook = lookupBook(id, myJson)

        if (myBook == undefined){
            res.json({Response:"Kniha s daným ID nebola nájdená"})
        }
        else {
            res.json({ID:myBook._id, Nazov:myBook.nazov, Autor:myBook.autor, Zaner:myBook.zaner})
        }

    })

    app.post("/api/library/book/:id/info", (req, res) => {
        const id = req.params["id"]

        let myBook = lookupBook(id, myJson)

        if (checkIfBookExists(myBook)){
            res.json(myBook)
        }
        else {
            res.json({Response:"Kniha s daným ID nebola nájdená"})
        }

    })

    app.put("/api/library/book/:id/add", (req, res) => {
        const id = req.params["id"]

        let myBook = lookupBook(id, myJson)

        if (checkIfBookExists(myBook)){
            res.json({Response:"Kniha s daným ID už existuje"})
        }
        else {
            console.log(myJson)
            myJson.push(
                {
                _id: id.toString(),
                nazov: req.body["name"],
                autor: req.body["autor"],
                zaner: req.body["zaner"],
                rok_vydania: req.body["rok_vydania"],
                vydavatelstvo: req.body["vydavatelstvo"],
                krajina_vydania: req.body["krajina_vydania"],
                pocet_stran: req.body["pocet_stran"],
            }
            )
            saveFile(myJson)
            console.log(myJson)
            res.json({Response:"Kniha bola úspešne uložená"})
        }
    })

    app.delete("/api/library/book/:id/delete", (req, res) => {
        const id = req.params["id"]
        let myBook = lookupBook(id, myJson)

        if (checkIfBookExists(myBook)){
            for (let i=0; i < myJson.length; i++) {
                if (myJson[i]._id == id.toString()){
                    myJson.splice(i, 1)
                }
            }
            saveFile(myJson)
            res.json({Response:"Kniha bola úspešne vymazaná"})
        }else {
            res.json({Response:"Kniha s daným ID nebola nájdená"})
        }


    })
}

const myFile = fs.readFileSync("myFile.json")
console.log(myFile.toString())
const myJson: Book[] = JSON.parse(myFile.toString())


createServer()