import React, { useState } from 'react';
import {graphql} from 'react-apollo';
import { compose } from 'recompose';

import { getAuthorsQuery, getBooksQuery, addBookMutation } from '../queries/queries';

function AddBook(props) {
  console.log('AddBook props >', props);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const displayAuthors = () => {
    let data = props.getAuthorsQuery;
    if(data.loading) {
      return (<option disabled>Loading...</option>);
    } else {
      return data.authors.map(author => (<option value={author.id} key={author.id}>{author.name}</option>));
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    // Call mutation = write to DB:
    props.addBookMutation({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId
      },
      // refresh the list - diff component and query:
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  };
  return (
    <form id="add-book" onSubmit= {submitForm}>
      <div className="field">
          <label>Book name:</label>
          <input value={name} type="text" onChange={ (e) => setName(e.target.value)} />
      </div>
      <div className="field">
          <label>Genre:</label>
          <input value={genre} type="text" onChange={ (e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
          <label>Author:</label>
          <select onChange={ (e) => setAuthorId(e.target.value) }>
              <option>Select author</option>
              { displayAuthors() }
          </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
