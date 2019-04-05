import React from "react"
import Author from "./Author"
import { Card } from "semantic-ui-react"
import AppContext from "../context"

const College = ({ authors, isTeacher, fetchBooks, fetchAuthors }) => (
  <Card.Group centered>
    {authors.map((author, i) => {
      return (
        <Author
          key={i}
          firstName={author.firstName}
          lastName={author.lastName}
          biography={author.biography}
          img={author.imageURL}
          isTeacher={isTeacher}
          id={author.id}
          fetchBooks={fetchBooks}
          fetchAuthors={fetchAuthors}
        />
      )
    })}
  </Card.Group>
)

export default () => (
  <AppContext.Consumer>
    {({ data, actions }) => (
      <College
        authors={data.searchedAuthor}
        isTeacher={data.isTeacher}
        fetchBooks={actions.fetchBooks}
        fetchAuthors={actions.fetchAuthors}
      />
    )}
  </AppContext.Consumer>
)
