import React, { Component } from 'react';
import {Loader} from 'semantic-ui-react'
import './App.css';
import NavBar from './components/NavBar'
import Library from './components/Library'
import TeacherNav from './components/TeacherNav'
import TeacherView from './components/TeacherView'
import StudentView from './components/StudentView'
const booksUrl = 'http://localhost:3222/books/'

class App extends Component {

  state = {
    books: '',
    authors: '',
    cat: 'meow',
    isTeacher: true,
    dropdownOptions: ''
  }

  structureDropdown = () => {
    const options = this.state.books.map(book => {
        return(
            {
                text: book.title,
                value: book.id,
            }
        )
    })
    this.setState({dropdownOptions: options})
}

  componentDidMount(){
    fetch(booksUrl)
      .then(res => res.json())
      .then(data => this.setState({ books: data.books }))
      .then(this.structureDropdown)
      .catch(err => {
        console.error(err)
        return this.setState({error: !null})
      })
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  teacherLogin = (e, { name }) => {
    this.setState({
      isTeacher: !this.state.isTeacher,
      activeItem: name
    })
  }

render() {
  const {books, isTeacher, dropdownOptions} = this.state;
    return (
      <div className="App">
        {isTeacher ? <StudentView dropdownOptions={this.state.dropdownOptions} handleItemClick={this.handleItemClick} teacherLogin={this.teacherLogin} activeItem={this.state.activeItem}/> : <TeacherView dropdownOptions={this.state.dropdownOptions} handleItemClick={this.handleItemClick} teacherLogin={this.teacherLogin} activeItem={this.state.activeItem}/>}
        {books ? <Library books={this.state.books}/> : <Loader active />}
       
      </div>
    );
  }
}

export default App;
