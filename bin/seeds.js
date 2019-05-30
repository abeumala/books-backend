
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
    description: "One of the most iconoclastic philosophers of all time, Nietzsche dramatically rejected notions of good and evil, truth and God. Beyond Good and Evil demonstrates that the world is steeped in false piety and infected with a 'slave morality'. With wit and subversive energy, Nietzsche demands that the individual impose their own 'will to power' upon the world.",
    author: "F. Nietzsche",
    coverUrl: "book1Cover.jpg",
    bookCoverUrl: "book1Detail.jpg"
  },

  {
    title: "The Republic",
    description: "lato's Republic is widely acknowledged as the cornerstone of Western philosophy. Presented in the form of a dialogue between Socrates and three different interlocutors, it is an enquiry into the notion of a perfect community and the ideal individual within it. During the conversation other questions are raised: what is goodness; what is reality; what is knowledge?",
    author: "Plato",
    coverUrl: "book2Cover.jpg",
    bookCoverUrl: "book2Detail.jpg"
  },

  {
    title: "The Illiad",
    description: "This is the Iliad: an ancient story of enduring power; magnetic characters defined by stirring and momentous speeches; a panorama of human lives locked in a heroic struggle beneath a mischievous or indifferent heaven. Above all, this is a tale of the devastation, waste and pity of war.",
    author: "Homer",
    coverUrl: "book3Cover.jpg",
    bookCoverUrl: "book3Detail.jpg"
  },

  {
    title: "Discipline and Punish",
    description: "In the Middle Ages there were gaols and dungeons, but punishment was for the most part a spectacle. The economic changes and growing popular dissent of the 18th century made necessary a more systematic control over the individual members of society, and this in effect meant a change from punishment, which chastised the body, to reform, which touched the soul.",
    author: "Michael Foucault",
    coverUrl: "book4Cover.jpg",
    bookCoverUrl: "book4Detail.jpg"
  },

  {
    title: "Critique of Pure Reason",
    description: "Kant's Critique of Pure Reason. It presents a profound and challenging investigation into the nature of human reason, its knowledge and illusions. Reason, Kant argues, is the seat of certain concepts that precede experience and make it possible, but we are not therefore entitled to draw conclusions about the natural world from these concepts. ",
    author: "Immanuel Kant",
    coverUrl: "book5Cover.jpg",
    bookCoverUrl: "book5Detail.jpg"
  },

  {
    title: "Das Kapital",
    description: "One of the most notorious works of modern times, as well as one of the most influential, Capital is an incisive critique of private property and the social relations it generates. Living in exile in England, where this work was largely written, Marx drew on a wide-ranging knowledge of its society to support his analysis and generate fresh insights. Arguing that capitalism would create an ever-increasing division in wealth and welfare, he predicted its abolition and replacement by a system with common ownership of the means of production.",
    author: "Karl Marx",
    coverUrl: "book6Cover.jpg",
    bookCoverUrl: "book6Detail.jpg"
    
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