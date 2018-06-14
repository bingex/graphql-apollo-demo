import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const AuthorInfo = () => (
  <Query
    query={gql`
      {
        author(id: 4432) {
          name
          books {
            title
            isbn
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <div>
          <h3>Author name: {data.author.name}</h3>
          <div className="list">
            {data.author.books
              ? data.author.books.map((book, index) => (
                  <div className="item" key={index}>
                    {book.title ? (
                      <div>
                        <span className="item__name">Title:</span> {book.title}
                      </div>
                    ) : null}
                    {book.isbn ? (
                      <div>
                        <span className="item__name">ISBN:</span> {book.isbn}
                      </div>
                    ) : null}
                  </div>
                ))
              : null}
          </div>
        </div>
      );
    }}
  </Query>
);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <AuthorInfo />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
