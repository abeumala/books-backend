
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
    coverUrl: "book1Cover.jpg"
  },

  {
    title: "The Republic",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    author: "Plato",
    coverUrl: "book2Cover.jpg"
  },

  {
    title: "Being and Time",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    author: "M. Heidegger",
    coverUrl: "book3Cover.jpg"
  },

  {
    title: "Discipline and Punish",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    author: "Michael Foucault",
    coverUrl: "book4Cover.jpg"
  },

  {
    title: "Critique of Pure Reason",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    author: "Immanuel Kant",
    coverUrl: "book5Cover.jpg"
  },

  {
    title: "Das Kapital",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    author: "Karl Marx",
    coverUrl: "book6Cover.jpg"
  }
]

const getBooks = () => {

  books.forEach((book) => {
    const { title, description, author, coverUrl } = book;

        const newBook = new Book({ title, description, author, coverUrl  });

      newBook.save()
      .then((result) => console.log('Created book', result.title))
      .catch(error => console.log('heep' + error));
  return;
  });
}

getBooks();