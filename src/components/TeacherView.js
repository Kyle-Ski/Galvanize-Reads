import React, { Component } from 'react'
import {Loader} from 'semantic-ui-react'
import TeacherNav from './TeacherNav'
import Library from './Library'
import AddBook from './AddBook'
import DeleteBook from './DeleteBook';
class TeacherView extends Component {

    state = {
        showAdd: false,
        showDelete: false
    }

    showAdd = () => {
        this.setState({showAdd: !this.state.showAdd})
    }
    showDelete = () => {
        this.setState({showDelete: !this.state.showDelete})
    }

    render(){
        const {warning, handleItemClick, teacherLogin, activeItem, books, dropdownOptions, bookSubmit, bookDelete, title, genre, cover, description, titleValue, genreValue, coverValue, descriptionValue, fetchDeleteBook, fetchBooks} = this.props
        return(
            <div className="App">
                <TeacherNav 
                    dropdownOptions={dropdownOptions} 
                    handleItemClick={handleItemClick} 
                    teacherLogin={teacherLogin} 
                    activeItem={activeItem} 
                    books={books}
                    showAdd={this.showAdd}
                    showDelete={this.showDelete}
                />
                {this.state.showAdd ? <AddBook 
                                        title={title} 
                                        genre={genre} 
                                        cover={cover} 
                                        description={description} 
                                        submit={bookSubmit} 
                                        titleValue={titleValue} 
                                        genreValue={genreValue} 
                                        coverValue={coverValue} 
                                        descriptionValue={descriptionValue} 
                                        warningState={warning}/> 
                                        : ''}
                {this.state.showDelete ? <DeleteBook 
                                            dropdownOptions={dropdownOptions}
                                            submit={bookDelete}
                                            fetchDeleteBook={fetchDeleteBook}
                                            /> : ''}
                {books ? <Library books={books} fetchBooks={fetchBooks}/> : <Loader active/>}
            </div>
        )
    }
}

export default TeacherView