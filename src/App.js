import React, { Component } from 'react';
import {Loader} from 'semantic-ui-react'
import './App.css';
import NavBar from './components/NavBar'
import Library from './components/Library'
import TeacherNav from './components/TeacherNav'
import TeacherView from './components/TeacherView'
import StudentView from './components/StudentView'
const booksUrl = 'https://galvanize-reads-ski.herokuapp.com/books/'
const authorsUrl = 'https://galvanize-reads-ski.herokuapp.com/authors/'

class App extends Component {

  state = {
    open: false,
    books: '',
    authors: '',
    isTeacher: true,
    dropdownOptions: '',
    bookTitle: '',
    bookGenre: '',
    bookUrl: '',
    bookDescription: '',
    warning: null,
    bookToDelete: '',
    deleteWarning: null,
    searchedBook: '',
    seardchedAuthor: '',
    switchViews: true,
    first: '',
    last: '', 
    about: '',
    url: '',
    warningState: null
  }

  structureDropdown = () => {
    const options = this.state.books.map((book, i) => {
        return(
            {
                key: i,
                value: book.id,
                text: book.title,
            }
        )
    })
    this.setState({dropdownOptions: options})
}

  fetchBooks = () => {
    return fetch(booksUrl)
      .then(res => res.json())
      .then(data => this.setState({ books: data.books, searchedBook: data.books }))
  }

  fetchAuthors = () => {
    return fetch(authorsUrl)
      .then(res => res.json())
      .then(data => this.setState({authors: data.authors, seardchedAuthor: data.authors}))
  }

  componentDidMount(){
    this.fetchBooks()
      .then(this.fetchAuthors)
      .then(this.structureDropdown)
      .catch(err => {
        console.error(err)
        return this.setState({error: !null})
      })
  }

  firstName = (e) => this.setState({first: e.target.value})
  lastName = (e) => this.setState({last: e.target.value})
  url = (e) => this.setState({url: e.target.value})
  about = (e) => this.setState({about: e.target.value})

  submitAuthor = (e) => {
    e.preventDefault()
    const data = {
      firstName: this.state.first,
      lastName: this.state.last,
      biography: this.state.about,
      imageURL: this.state.url
    }
    if (!data.firstName || !data.lastName || !data.biography || !data.imageURL){
        return this.setState({warning: 'warning'})
    } else {
      fetch(authorsUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if(res.error){
          this.setState({warningState: 'warning'})
        } else {
          this.setState({
            authors: [...this.state.authors, res.author], 
            first: '',
            last: '', 
            about: '',
            url: '',
            warningState: 'success'
          })
        }
      })
      .then(this.fetchAuthors)
    }
}

  switchThatView = (e , {name}) => {
    switch (name) {
      case 'Authors':
        return this.setState({switchViews: false})
      case 'Books' :
        return this.fetchBooks()
        .then(() => this.setState({switchViews: true}))
      default: 
        alert('Wait, what did you click on?')
        break;
   } 
  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })

  searchBooks = (e) => {
    const chosenBook = this.state.books.filter(book => book.title === e.target.innerText)
    if(chosenBook !== undefined){
      this.setState({searchedBook: chosenBook})
    } else {
      console.log('else')
    }
  }

  bookSubmit = (e) => {
    e.preventDefault()
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

  deleteHandler = (data) => {
    const newBooks = this.state.books.filter(item => item.id !== data.deleted.id)
    return this.setState({books: newBooks})
 }

  fetchDeleteBook = () => {
    fetch(booksUrl + this.state.bookToDelete, {
      method: 'DELETE',
      mode: 'cors'
    })
      .then(response => response.json())
      .then(res => {
        if(res.error){
          this.setState({deleteWarning: 'warning'})
        } else {
          this.setState({deleteWarning: 'success'})
          return res
        }
      })
      .then(data => {
        const newBooks = this.state.books.filter(item => item.id !== data.deleted.id)
        return this.setState({books: newBooks})
      })
      .then(this.structureDropdown)
  }

  bookDelete = (e) => {
    e.preventDefault()
    const chosenBook = this.state.books.filter(book => book.title === e.target.innerText)[0]
    if(chosenBook !== undefined){
      this.setState({bookToDelete: chosenBook.id})
    } 
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
  const {books, isTeacher, dropdownOptions, authors} = this.state;
    return (
      <div className="App">
        {isTeacher ? <StudentView 
        dropdownOptions={this.state.dropdownOptions} 
        handleItemClick={this.handleItemClick} 
        teacherLogin={this.teacherLogin} 
        activeItem={this.state.activeItem}
        books={books}
        isTeacher={this.state.isTeacher}
        searchBooks={this.searchBooks}
        searchedBook={this.state.searchedBook}
        fetchBooks={this.fetchBooks}
        authors={authors}
        seardchedAuthor={this.state.seardchedAuthor}
        fetchAuthors={this.fetchAuthors}
        switchThatView={this.switchThatView}
        switchViews={this.state.switchViews}
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
          fetchDeleteBook={this.fetchDeleteBook}
          books={books}
          fetchBooks={this.fetchBooks}
          deleteWarning={this.state.deleteWarning}
          searchBooks={this.searchBooks}
          searchedBook={this.state.searchedBook}
          authors={authors}
          seardchedAuthor={this.state.seardchedAuthor}
          fetchAuthors={this.fetchAuthors}
          switchThatView={this.switchThatView}
          switchView={this.state.switchViews}
          submitAuthor={this.submitAuthor}
          first={this.state.first}
          last={this.state.last} 
          about={this.state.about}
          url={this.state.url}
          warningState={this.state.warningState}
          firstName={this.firstName}
          lastName={this.lastName}
          getUrl={this.url}
          getAbout={this.about}
          />}       
      </div>
    );
  }
}

export default App;
