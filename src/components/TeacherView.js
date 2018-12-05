import React, { Component } from 'react'
import {Loader} from 'semantic-ui-react'
import TeacherNav from './TeacherNav'
import Library from './Library'
import AddBook from './AddBook'
class TeacherView extends Component {

    state = {
        showAdd: false,
        showDelete: false
    }

    showAdd = () => {
        this.setState({showAdd: !this.state.showAdd})
    }

    render(){
        const {handleItemClick, teacherLogin, activeItem, books, dropdownOptions, bookSubmit, title, genre, cover, description, titleValue, genreValue, coverValue, descriptionValue} = this.props
        return(
            <div className="App">
                <TeacherNav 
                    dropdownOptions={dropdownOptions} 
                    handleItemClick={handleItemClick} 
                    teacherLogin={teacherLogin} 
                    activeItem={activeItem} 
                    books={books}
                    showAdd={this.showAdd}
                />
                {this.state.showAdd ? <AddBook title={title} genre={genre} cover={cover} description={description} submit={bookSubmit} titleValue={titleValue} genreValue={genreValue} coverValue={coverValue} descriptionValue={descriptionValue}/> : ''}
                {books ? <Library books={books}/> : ''}
            </div>
        )
    }
}

export default TeacherView