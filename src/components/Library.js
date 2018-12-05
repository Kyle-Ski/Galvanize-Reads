import React from 'react'
import Book from './Book'
import { Card } from 'semantic-ui-react';

const Library = ({books, cardDeleteButton, isOpen, open, close, isTeacher, fetchBooks}) =>  ( 
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
                cardDeleteButton={cardDeleteButton}
                isOpen={isOpen}
                open={open}
                close={close}
                isTeacher={isTeacher}
                id={book.id}
                fetchBooks={fetchBooks}
            />
        )

    })}
    </Card.Group>
)


export default Library

// export default class Library extends React.Component {


//     render() {
//         // const bookTitle = this.props.books.map(book => book.title)
//         // return(
//         //     <p>{bookTitle}</p>
//         // )
//         return(
//             // <p>{this.props.books.map((book)=>book.title)}</p>
//             <p>Library</p>
//         )
//     }
// }