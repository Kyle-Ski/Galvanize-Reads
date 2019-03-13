import React from 'react'
import {Loader} from 'semantic-ui-react'
import NavBar from './NavBar'
import Library from './Library'
import College from './College';
import AppContext from "../context"

const StudentView = ({handleItemClick, teacherLogin, activeItem, books, dropdownOptions, isTeacher, searchBooks, searchedBook, fetchBooks, seardchedAuthor, switchViews, switchThatView}) => {
    
        if(books){
            return(
                <div className="App">
                    <NavBar dropdownOptions={dropdownOptions} handleItemClick={handleItemClick} teacherLogin={teacherLogin} activeItem={activeItem} searchBooks={searchBooks} fetchBooks={fetchBooks} switchThatView={switchThatView}/>
                    {switchViews ? <Library books={searchedBook} isTeacher={isTeacher}/> : <College authors={seardchedAuthor} isTeacher={isTeacher} />}
                </div>
            )
        } else {
            return (<Loader active/>)
        }
    
}

export default () => (
    <AppContext.Consumer>
        {({ data, actions }) => (
            <StudentView 
                handleItemClick={actions.handleItemClick} 
                teacherLogin={actions.teacherLogin} 
                activeItem={data.activeItem} 
                books={data.books} 
                dropdownOptions={data.dropdownOptions} 
                isTeacher={data.isTeacher} 
                searchBooks={actions.searchBooks}
                searchedBook={data.searchedBook} 
                fetchBooks={actions.fetchBooks} 
                authors={data.authors} 
                seardchedAuthor={data.seardchedAuthor} 
                fetchAuthors={actions.fetchAuthors} 
                switchViews={data.switchViews} 
                switchThatView={actions.switchThatView}
            />
            )}
    </AppContext.Consumer>
)

