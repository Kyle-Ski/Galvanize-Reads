import React from 'react'
import Author from './Author'
import { Card } from 'semantic-ui-react';

const College = ({authors, isTeacher, fetchBooks, fetchAuthors}) =>  ( 
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


export default College
