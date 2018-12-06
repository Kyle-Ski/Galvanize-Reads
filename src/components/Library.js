import React from 'react'
import Book from './Book'
import { Card } from 'semantic-ui-react';

const Library = ({books, isTeacher, fetchBooks}) =>  ( 
    <Card.Group centered>
    {books.map((book, i) => {
        return (
            <Book 
                key={i}
                title={book.title}
                genre={book.genre}
                description={book.description}
                img={book.coverURL}
                authors={book.authors}
                isTeacher={isTeacher}
                id={book.id}
                fetchBooks={fetchBooks}
            />
        )

    })}
    </Card.Group>
)


export default Library