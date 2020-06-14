import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'; // inject received data into the app

import styled from 'styled-components';
import GlobalStyle from './components/styled/globalStyles';

import BookList from './components/BookList';
import AddBook from './components/AddBook';
import Button from './components/Button';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const Title = styled.h1`
  color: red;
  font-size: 2rem;
`;

const MainWrapper = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

function App() {

  return (
    <ApolloProvider client={client} >
      <>
        <GlobalStyle />
        <MainWrapper>
            <Title>John's list</Title>
            <BookList />
            <AddBook />
            <br />
            <Button primary margin="1px">Styled Button</Button>
            <Button>Styled Button</Button>
        </MainWrapper>
      </>
    </ApolloProvider>
  );
}

export default App;
