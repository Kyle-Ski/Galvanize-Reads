import React from "react"
import Book from "./Book"
import { Card } from "semantic-ui-react"
import AppContext from "../context"

const Library = ({ books, isTeacher, fetchBooks, authorClick }) => (
  <Card.Group centered>
    {books.map((book, i) => {
      return (
        <Book
          thisKey={i}
          key={i}
          title={book.title}
          genre={book.genre}
          description={book.description}
          img={book.coverURL}
          authors={book.authors}
          id={book.id}
          isTeacher={isTeacher}
          fetchBooks={fetchBooks}
          authorClick={authorClick}
        />
      )
    })}
  </Card.Group>
)

export default () => (
  <AppContext.Consumer>
    {({ data, actions }) => (
      <Library
        books={data.searchedBook}
        isTeacher={data.isTeacher}
        fetchBooks={actions.fetchBooks}
        authorClick={actions.searchAuthors}
      />
    )}
  </AppContext.Consumer>
)
