const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID, 
  GraphQLInt, 
  GraphQLList, 
  GraphQLNonNull,
  GraphQLSchema } = graphql;

// temp data
/*
const books = [
  {name: 'Book A', genre: 'Fantasy', id: '1', authorId: '1'},
  {name: 'Book B', genre: 'Fantasy', id: '2', authorId: '2'},
  {name: 'Book C', genre: 'Sci-Fi', id: '3', authorId: '3'},
  {name: 'Book D', genre: 'Fantasy', id: '4', authorId: '2'},
  {name: 'Book E', genre: 'Fantasy', id: '5', authorId: '3'},
  {name: 'Book F', genre: 'Fantasy', id: '6', authorId: '3'},
];

const authors = [
  {name: 'Patrick Roth', age: 56, id: '1'},
  {name: 'Brandon Sanderson', age: 43, id: '2'},
  {name: 'Shaen Smith', age: 34, id: '3'}
];
*/

// Fields are in a function so declaration order doesn't matter for relationships
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { 
      type: AuthorType,
      resolve(parent, args) {
        // link Author to Book by ID
        // parent is the BOOK  WE JUST FOUND - OBJ
        //return authors.find( author => author.id == parent.authorId );
        return Author.findById(parent.authorId); // Author is a Mongoose model
      }
    }
  })
});

// GraphQLList is explained = wrap the type inside GraphQLList()
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // parent is the author
        // return books.filter( book => book.authorId == parent.id );
        return Book.find({ authorId: parent.id }) // Book is a Mongoose model
      }
    }
  })
});

// Fields not in a function 
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: {type: GraphQLID} },
      resolve(parent, args){
        // code to get data from DB etc
        // has access to args.id - Find a match to it
        /* possible Query:
          book(id: "2"){
            name
            genre
          }
        */
       // Must return the Book Object
      //  return books.find( book => book.id == args.id);
      return Book.findById(args.id); // Book is a Mongoose model
      }
    },

    author: {
      type: AuthorType,
      args: { id: {type: GraphQLID} },
      resolve(parent, args){
        // return authors.find( author => author.id == args.id);
        return Author.findById(args.id); // Author is a Mongoose model
      }
    },

    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // all / list
        // automatically links from book to author if already individually set up
        return Book.find({});
      }
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }

  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        // Author is the Mongoose model - imported 
        let author = new Author({
          name: args.name,
          age: args.age
        });
        // return whatever you want in response
        // GraphQL will pick from that what to show based on user query
        return author.save(); // save to db
      }
    },

    addBook: {
      type: BookType,
      // wrap inside new GraphQLNonNull() to make required
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }    

  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});