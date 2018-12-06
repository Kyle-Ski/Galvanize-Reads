import React, { Component } from 'react'
import {Loader} from 'semantic-ui-react'
import NavBar from './NavBar'
import Library from './Library'
import College from './College';

const StudentView = ({handleItemClick, teacherLogin, activeItem, books, dropdownOptions, isTeacher, searchBooks, searchedBook, fetchBooks, authors, seardchedAuthor, fetchAuthors, switchView, switchThatView}) => {
       
        if(books){
            return(
                <div className="App">
                    <NavBar dropdownOptions={dropdownOptions} handleItemClick={handleItemClick} teacherLogin={teacherLogin} activeItem={activeItem} searchBooks={searchBooks} fetchBooks={fetchBooks}/>
                    {swithcView ? <Library books={searchedBook} isTeacher={isTeacher}/> : <College authors={seardchedAuthor} isTeacher={isTeacher} />}
                    {/* {books ? <Library books={searchedBook} isTeacher={isTeacher}/> : <Loader active/>} */}
                    {/* {authors ? <College authors={seardchedAuthor} isTeacher={isTeacher} /> : <Loader active/>} */}
                </div>
            )
        } else {
            return (<Loader active/>)
        }
    
}

export default StudentView

