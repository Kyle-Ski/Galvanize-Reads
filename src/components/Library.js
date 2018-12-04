import React, { Component } from 'react'
import Book from './Book'

const Library = ({books}) => {


    const loadBooks = (books) => {
        return books.map((book, i) => {
            return (
                <Book 
                    key={i}
                    title={book.title}
                    genre={book.genre}
                    description={book.description}
                    img={book.coverURL}
                    authors={book.authors}
                />
            )

        })
    }

        return (
            <div className='library'>
                {loadBooks(books)}
            </div>
        )
    
}

export default Library