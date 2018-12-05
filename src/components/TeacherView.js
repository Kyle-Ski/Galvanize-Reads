import React, { Component } from 'react'
import {Loader} from 'semantic-ui-react'
import TeacherNav from './TeacherNav'
import Library from './Library'

class TeacherView extends Component {

    render(){
        const {handleItemClick, teacherLogin, activeItem, books, dropdownOptions} = this.props
        return(
            <div className="App">
                <TeacherNav dropdownOptions={dropdownOptions} handleItemClick={handleItemClick} teacherLogin={teacherLogin} activeItem={activeItem} books={books}/>
                {books ? <Library books={books}/> : ''}
            </div>
        )
    }
}

export default TeacherView