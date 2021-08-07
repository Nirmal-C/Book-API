const express = require("express");

//Database
const database = require("./database");


//Initialise express 

const booky = express();

/*
Route         /
Description   Get all the books
Access        PUBLIC
Parameter     NONE
Methods       GET
*/


booky.get("/",(req,res) => {
    return res.json({books: database.books});
});

/*
Route         /is
Description   Get specific book on ISBN
Access        PUBLIC
Parameter     ISBN
Methods       GET
*/

booky.get("/is/:isbn",(req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn

    );

    if(getSpecificBook.length === 0) {
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`})
    }

    return res.json({book: getSpecificBook});
});

/*
Route         /c
Description   Get specific book on ISBN
Access        PUBLIC
Parameter     category
Methods       GET
*/

booky.get("/c/:category",(req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    )

    if (getSpecificBook.length === 0){
        return res.json({error: `NO book found for the category of ${req.params.category}`})
    }

    return res.json({book: getSpecificBook });
});


/*
Route         /author
Description   Get all authors
Access        PUBLIC
Parameter     None
Methods       GET
*/

booky.get("/author", (req,res) => {
    return res.json({authors: database.author});
});


/*
Route         /author/book
Description   Get all authors based on books
Access        PUBLIC
Parameter     ISBN
Methods       GET
*/

booky.get("/author/book/:isbn",(req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)

    )

    if (getSpecificAuthor.length === 0){
        return res.json({error: `NO author found for the book of ${req.params.isbn}`})
    }

    return res.json({authors: getSpecificAuthor});


});

/*
Route         /author/book
Description   Get all publication
Access        PUBLIC
Parameter     NONE
Methods       GET
*/

booky.get("/publications",(req,res) =>{
    return res.json({publications: database.publication});
})




booky.listen(4000,() => {
    console.log("Server is up and running");
});

