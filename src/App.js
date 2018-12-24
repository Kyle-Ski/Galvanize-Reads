import React, { Component } from 'react';
import {Loader} from 'semantic-ui-react'
import './App.css';
import TeacherView from './components/TeacherView'
import StudentView from './components/StudentView'
// const booksUrl = 'http://localhost:3222/book_authors/books'
const booksWithAuthorsUrl = 'https://galvanize-reads-ski.herokuapp.com/book_authors/books'
const booksUrl = 'https://galvanize-reads-ski.herokuapp.com/books'
const authorsUrl = 'https://galvanize-reads-ski.herokuapp.com/authors/'
let book_authorsJoinUrl = 'https://galvanize-reads-ski.herokuapp.com/book_authors/'
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
    warningState: null,
    authorOptions: '',
    authorToDelete : '',
    deleteAuthorWarning : null,
    newAuthors: [{firstName: '', lastName: '', id: ''}]
  }

  handleRemoveAuthor = (idx) => (e) => {
    e.preventDefault()
    this.setState({
    newAuthors: this.state.newAuthors.filter((s, sidx) => idx !== sidx)
    })
  }

  handleAddAuthor =  (e) => {
    e.preventDefault()
    this.setState({
      newAuthors: this.state.newAuthors.concat([{firstName: '', lastName: '', id: ''}])
    })
  }

  handleUserAuthorAdd = (idx) => (evt) => {
    if (!evt.target.type){
      const targetSpaces = evt.target.innerText
      const noTargetSpaces = targetSpaces.replace(/\s/g,'')
      const chosenAuthor = this.state.authors.filter(author => {
        let spaces =`${author.firstName} ${author.lastName}` 
        let noSpaces = spaces.replace(/\s/g,'')
        return noSpaces == noTargetSpaces
      })[0]  
      const authors = this.state.newAuthors.map((author, sidx) => {
        if (idx !== sidx){
          return author
        } else {
          return { ...author, firstName: chosenAuthor.firstName, lastName: chosenAuthor.lastName, id: chosenAuthor.id, }
        }
      })
      
      this.setState({newAuthors: authors})
    }   
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

  structureAuthorDropdown = () => {
    const options = this.state.authors.map((author, i) => {
      return(
          {
              key: i,
              value: author.id,
              text: `${author.firstName} ${author.lastName}`,
          }
      )
  })
    this.setState({authorOptions: options})
  }

  fetchBooks = () => {
    return fetch(booksWithAuthorsUrl)
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
      .then(this.structureAuthorDropdown)
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
    const currentAuthors = this.state.authors
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
        if(res.error){
          this.setState({warningState: 'warning'})
        } else {
          this.setState({
            authors: currentAuthors.concat(res.author), 
            first: '',
            last: '', 
            about: '',
            url: '',
            warningState: 'success'
          })
          setTimeout(()=>this.setState({warningState: null}), 2000)
        }
      })
      .then(this.structureAuthorDropdown)
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
    const authors = this.state.newAuthors.map(author => author.id)
    if (!data.title || !data.genre || !data.description || !data.coverURL){
        return this.setState({warning: 'warning'})
    } else {
      return fetch(booksUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(this.checkError)
      //NEED TO ADD ROUTE TO POST TO JOIN TABLE 
      .then(bookResult => {
        const bookId = bookResult.book.id
        // return authors.map(author => {
          const bookAuthorData = {
            book_id: bookId,
            author_id: authors
          }
          return fetch(book_authorsJoinUrl, {
            method: 'POST',
            headers:{
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(bookAuthorData)
          })
          .then(res => res.json())
          // .then(this.checkError)
          .then(data => ({data, bookResult}))
        // })
      })
      // .then(pending => Promise.all(pending))
      .then(res => {
        if(res.error){
          this.setState({warning: 'warning'})
        } else {
          this.setState({
            books: [...this.state.books, res.bookResult.book], 
            bookTitle: '',
            bookGenre: '',
            bookDescription: '',
            bookUrl: '',
            warning: 'success'
          })
          setTimeout(()=>this.setState({warning: null}), 2000)
        }
        return res
      })
      .then(this.structureDropdown)
      .then(this.fetchBooks)
      .catch(error => {
        this.setState({warning: 'warning', error})
      })
    }
  }

  checkError = response => {
    if(response.error){
      throw new Error('Error submitting to server')
    }
    return response
  }

  fetchDeleteBook = () => {
    fetch('https://galvanize-reads-ski.herokuapp.com/books/' + this.state.bookToDelete, {
      method: 'DELETE',
      mode: 'cors'
    })
      .then(response => response.json())
      .then(res => {
        if(res.error){
          this.setState({deleteWarning: 'warning'})
        } else {
          this.setState({deleteWarning: 'success'})
          setTimeout(()=>this.setState({deleteWarning: null}), 2000)
          return res
        }
      })
      .then(data => {
        const newBooks = this.state.books.filter(item => item.id !== data.deleted.id)
        return this.setState({books: newBooks})
      })
      .then(this.structureDropdown)
      .then(this.fetchBooks)
  }

  fetchDeleteAuthor = () => {
    fetch(authorsUrl + this.state.authorToDelete, {
      method: 'DELETE',
      mode: 'cors'
    })
      .then(response => response.json())
      .then(res => {
        if(res.error){
          this.setState({deleteAuthorWarning: 'warning'})
        } else {
          this.setState({deleteAuthorWarning: 'success'})
          setTimeout(()=>this.setState({deleteAuthorWarning: null}), 2000)
          return res
        }
      })
      .then(data => {
        const newAuthors = this.state.authors.filter(item => item.id !== data.deleted.id)
        return this.setState({authors: newAuthors})
      })
      .then(this.structureAuthorDropdown)
      .then(this.fetchAuthors)
  }

  bookDelete = (e) => {
    e.preventDefault()
    const chosenBook = this.state.books.filter(book => book.title === e.target.innerText)[0]
    if(chosenBook !== undefined){
      this.setState({bookToDelete: chosenBook.id})
    } 
  }

  authorDelete = (e) => {
    e.preventDefault()
    const targetSpaces = e.target.innerText
    const noTargetSpaces = targetSpaces.replace(/\s/g,'')
    const chosenAuthor = this.state.authors.filter(author => {
      let spaces =`${author.firstName} ${author.lastName}` 
      let noSpaces = spaces.replace(/\s/g,'')
      return noSpaces == noTargetSpaces
    })[0]
    if(chosenAuthor !== undefined){
      this.setState({authorToDelete: chosenAuthor.id})
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
          fetchDeleteAuthor={this.fetchDeleteAuthor}
          authorDelete={this.authorDelete}
          authorOptions={this.state.authorOptions}
          deleteAuthorWarning={this.state.deleteAuthorWarning}
          handleAddAuthor={this.handleAddAuthor}
          newAuthors={this.state.newAuthors}
          handleUserAuthorAdd={this.handleUserAuthorAdd}
          handleRemoveAuthor={this.handleRemoveAuthor}
          />}       
      </div>
    );
  }
}

export default App;
