
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(x => console.log('MongoDB connected'))
    .catch(err => {
      console.error('Error connecting to mongo', err);
  });

const Book = require('./../models/book');
const books =[
  {
    title: "Beyond good and evil",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    author: "F. Nietzsche",
    coverUrl: "book1Cover.jpg",
    bookCoverUrl: "book1Detail.jpg"
  },

  {
    title: "The Republic",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    author: "Plato",
    coverUrl: "book2Cover.jpg",
    bookCoverUrl: "book2Detail.jpg"
  },

  {
    title: "The Illiad",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    author: "Homer",
    coverUrl: "book3Cover.jpg",
    bookCoverUrl: "book3Detail.jpg"
  },

  {
    title: "Discipline and Punish",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    author: "Michael Foucault",
    coverUrl: "book4Cover.jpg",
    bookCoverUrl: "book4Detail.jpg"
  },

  {
    title: "Critique of Pure Reason",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    author: "Immanuel Kant",
    coverUrl: "book5Cover.jpg",
    bookCoverUrl: "book5Detail.jpg"
  },

  {
    title: "Das Kapital",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    author: "Karl Marx",
    coverUrl: "book6Cover.jpg",
    bookCoverUrl: "book5Detail.jpg"
    
  }
]

const getBooks = () => {

  books.forEach((book) => {
    const { title, description, author, coverUrl, bookCoverUrl } = book;

        const newBook = new Book({ title, description, author, coverUrl, bookCoverUrl });

      newBook.save()
      .then((result) => console.log('Created book', result.title))
      .catch(error => console.log('heep' + error));
  return;
  });
}

getBooks();