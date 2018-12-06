import React, { Component } from 'react'
import {Loader} from 'semantic-ui-react'
import NavBar from './NavBar'
import Library from './Library'

class StudentView extends Component {

    render(){
        const {handleItemClick, teacherLogin, activeItem, books, dropdownOptions, isTeacher, searchBooks, searchedBook, fetchBooks} = this.props
        return(
            <div className="App">
                <NavBar dropdownOptions={dropdownOptions} handleItemClick={handleItemClick} teacherLogin={teacherLogin} activeItem={activeItem} searchBooks={searchBooks} fetchBooks={fetchBooks}/>
                {books ? <Library books={searchedBook} isTeacher={isTeacher}/> : <Loader active/>}

            </div>
        )
    }
}

export default StudentView

