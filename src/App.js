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
    dropdownOptions: '',
    bookTitle: '',
    bookGenre: '',
    bookUrl: '',
    bookDescription: '',
    warning: null,
    bookToDelete: ''
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

  bookSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    const data = {
      title: this.state.bookTitle,
      genre: this.state.bookGenre,
      description: this.state.bookDescription,
      coverURL: this.state.bookUrl
    }
    if (!data.title || !data.genre || !data.description || !data.coverURL){
        return this.setState({warning: 'warning'})
    } else {
      fetch(booksUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => {
        if(res.error){
          this.setState({warning: 'warning'})
        } else {
          this.setState({
            books: [...this.state.books, res.book], 
            bookTitle: '',
            bookGenre: '',
            bookDescription: '',
            bookUrl: '',
            warning: 'success'
          })
        }
      })
      .then(this.structureDropdown)
        
    }
  }

  bookDelete = (e) => {
    e.preventDefault()
    console.log('delete', e.target.innerText)
  }

  getTitle = (e) => {
    this.setState({bookTitle: e.target.value})
  }
  
  getGenre = (e) => {
    this.setState({bookGenre : e.target.value})
  }

  getBookUrl = (e) => {
    this.setState({bookUrl : e.target.value})
  }

  getDescription = (e) => {
    this.setState({bookDescription : e.target.value})
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
        {isTeacher ? <StudentView 
        dropdownOptions={this.state.dropdownOptions} 
        handleItemClick={this.handleItemClick} 
        teacherLogin={this.teacherLogin} 
        activeItem={this.state.activeItem}
        /> : 
        <TeacherView 
          title={this.getTitle} 
          genre={this.getGenre} 
          cover={this.getBookUrl} 
          description={this.getDescription} 
          bookSubmit={this.bookSubmit} 
          dropdownOptions={this.state.dropdownOptions} 
          handleItemClick={this.handleItemClick} 
          teacherLogin={this.teacherLogin} 
          activeItem={this.state.activeItem}
          titleValue={this.state.bookTitle} 
          genreValue={this.state.bookGenre} 
          coverValue={this.state.bookUrl} 
          descriptionValue={this.state.bookDescription}
          warning={this.state.warning}
          bookDelete={this.bookDelete}
          />}
        {books ? <Library books={this.state.books}/> : <Loader active />}
       
      </div>
    );
  }
}

export default App;
