import React, { Component } from 'react'
import {Loader} from 'semantic-ui-react'
import TeacherNav from './TeacherNav'
import Library from './Library'
import AddBook from './AddBook'
import DeleteBook from './DeleteBook'
import College from './College'
import AddAuthor from './AddAuthor'
class TeacherView extends Component {

    state = {
        showAdd: false,
        showDelete: false,
        showAuthorAdd: false,
        showAuthorDelete: false
    }

    showAdd = () => {
        this.setState({showAdd: !this.state.showAdd})
    }
    showDelete = () => {
        this.setState({showDelete: !this.state.showDelete})
    }

    showAuthorAdd = () => {
        this.setState({showAuthorAdd: !this.state.showAuthorAdd})
    }

    showAuthorDelete = () => {
        this.setState({showAuthorDelete: !this.state.showAuthorDelete})
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
                    showAuthorAdd={this.showAuthorAdd}
                    showAuthorDelete={this.showAuthorDelete}
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
                {this.state.showAuthorAdd ? <AddAuthor 
                                                submitAuthor={this.props.submitAuthor}
                                                first={this.props.first}
                                                last={this.props.last} 
                                                about={this.props.about}
                                                url={this.props.url}
                                                warningState={this.props.warningState}
                                                firstName={this.props.firstName}
                                                lastName={this.props.lastName}
                                                getUrl={this.props.getUrl}
                                                getAbout={this.props.getAbout}
                                            /> : ''}
                {/* {this.state.showAuthorDelete ? <DeleteAuthor />} */}
                    {switchView ? <Library books={this.props.searchedBook} isTeacher={this.props.isTeacher}/> : <College authors={this.props.seardchedAuthor} isTeacher={this.props.isTeacher} />}
            </div>
        )
    }
}

export default TeacherView