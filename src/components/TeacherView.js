import React, { Component } from 'react'
import {Loader} from 'semantic-ui-react'
import TeacherNav from './TeacherNav'
import Library from './Library'
import AddBook from './AddBook'
import DeleteBook from './DeleteBook';
import College from './College'
class TeacherView extends Component {

    state = {
        showAdd: false,
        showDelete: false,
        
    }

    showAdd = () => {
        this.setState({showAdd: !this.state.showAdd})
    }
    showDelete = () => {
        this.setState({showDelete: !this.state.showDelete})
    }

    handleViewChange = () =>{
        if (this.props.authors){
            return(
                <div className="App">
                    {this.props.switchViews ? <Library books={this.props.searchedBook} isTeacher={this.props.isTeacher}/> : <College authors={this.props.seardchedAuthor} isTeacher={this.props.isTeacher} />}
                    {/* {books ? <Library books={searchedBook} isTeacher={isTeacher}/> : <Loader active/>} */}
                    {/* {authors ? <College authors={seardchedAuthor} isTeacher={isTeacher} /> : <Loader active/>} */}
                </div>
            )
        } else {
            return (<Loader active/>)
        }
    }

    render(){
        const {warning, handleItemClick, teacherLogin, activeItem, books, dropdownOptions, bookSubmit, bookDelete, title, genre, cover, description, titleValue, genreValue, coverValue, descriptionValue, fetchDeleteBook, fetchBooks, deleteWarning, searchedBook, searchBooks, switchThatView, switchView} = this.props
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
                    searchBooks={searchBooks}
                    switchThatView={switchThatView}
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
                                            deleteWarning={deleteWarning}
                                            /> : ''}
                    {switchView ? <Library books={this.props.searchedBook} isTeacher={this.props.isTeacher}/> : <College authors={this.props.seardchedAuthor} isTeacher={this.props.isTeacher} />}
            </div>
        )
    }
}

export default TeacherView