import React from "react"

const Context = React.createContext()
const booksWithAuthorsUrl =
  "https://galvanize-reads-ski.herokuapp.com/book_authors/books"
const booksUrl = "https://galvanize-reads-ski.herokuapp.com/books"
const authorsUrl = "https://galvanize-reads-ski.herokuapp.com/authors/"
let book_authorsJoinUrl =
  "https://galvanize-reads-ski.herokuapp.com/book_authors/"

class AppContextProvider extends React.Component {
  state = {
    open: false,
    books: "",
    authors: "",
    isTeacher: true,
    dropdownOptions: "",
    bookTitle: "",
    bookGenre: "",
    bookUrl: "",
    bookDescription: "",
    warning: null,
    bookToDelete: "",
    deleteWarning: null,
    searchedBook: "",
    seardchedAuthor: "",
    switchViews: true,
    first: "",
    last: "",
    about: "",
    url: "",
    warningState: null,
    authorOptions: "",
    authorToDelete: "",
    deleteAuthorWarning: null,
    newAuthors: [{ firstName: "", lastName: "", id: "" }],
    showAdd: false,
    showDelete: false,
    showAuthorAdd: false,
    showAuthorDelete: false,
    activeItem: null,
    modalOpen: false
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  teacherLogin = (e, { name }) => {
    switch (name) {
      case "login":
        this.setState({
          isTeacher: !this.state.isTeacher,
          modalOpen: false
        })
        break
      case "back":
        this.setState({ modalOpen: false })
        break
      case "Logout":
        this.setState({ isTeacher: !this.state.isTeacher })
        break
      default:
        this.setState({ modalOpen: false })
    }
  }

  showAdd = () => this.setState({ showAdd: !this.state.showAdd })
  showDelete = () => this.setState({ showDelete: !this.state.showDelete })
  showAuthorAdd = () =>
    this.setState({ showAuthorAdd: !this.state.showAuthorAdd })
  showAuthorDelete = () =>
    this.setState({ showAuthorDelete: !this.state.showAuthorDelete })

  handleRemoveAuthor = index => e => {
    e.preventDefault()
    this.setState({
      newAuthors: this.state.newAuthors.filter(
        (item, subIndex) => index !== subIndex
      )
    })
  }

  handleAddAuthor = e => {
    e.preventDefault()
    this.setState({
      newAuthors: this.state.newAuthors.concat([
        { firstName: "", lastName: "", id: "" }
      ])
    })
  }

  handleUserAuthorAdd = index => evt => {
    if (!evt.target.type) {
      const targetSpaces = evt.target.innerText
      const noTargetSpaces = targetSpaces.replace(/\s/g, "")
      const chosenAuthor = this.state.authors.filter(author => {
        let spaces = `${author.firstName} ${author.lastName}`
        let noSpaces = spaces.replace(/\s/g, "")
        return noSpaces == noTargetSpaces
      })[0]
      const authors = this.state.newAuthors.map((author, subIndex) => {
        if (index !== subIndex) {
          return author
        } else {
          return {
            ...author,
            firstName: chosenAuthor.firstName,
            lastName: chosenAuthor.lastName,
            id: chosenAuthor.id
          }
        }
      })

      this.setState({ newAuthors: authors })
    }
  }

  structureDropdown = () => {
    const options = this.state.books.map((book, i) => {
      return {
        key: i,
        value: book.id,
        text: book.title
      }
    })
    this.setState({ dropdownOptions: options })
  }

  structureAuthorDropdown = () => {
    const options = this.state.authors.map((author, i) => {
      return {
        key: i,
        value: author.id,
        text: `${author.firstName} ${author.lastName}`
      }
    })
    this.setState({ authorOptions: options })
  }

  fetchBooks = () => {
    return fetch(booksWithAuthorsUrl)
      .then(res => res.json())
      .then(data =>
        this.setState({ books: data.books, searchedBook: data.books })
      )
  }

  fetchAuthors = () => {
    return fetch(authorsUrl)
      .then(res => res.json())
      .then(data =>
        this.setState({ authors: data.authors, seardchedAuthor: data.authors })
      )
  }

  componentDidMount() {
    this.fetchBooks()
      .then(this.fetchAuthors)
      .then(this.structureDropdown)
      .then(this.structureAuthorDropdown)
      .catch(err => {
        console.error(err)
        return this.setState({ error: !null })
      })
  }

  submitAuthor = e => {
    e.preventDefault()
    const currentAuthors = this.state.authors
    const data = {
      firstName: this.state.first,
      lastName: this.state.last,
      biography: this.state.about,
      imageURL: this.state.url
    }
    if (
      !data.firstName ||
      !data.lastName ||
      !data.biography ||
      !data.imageURL
    ) {
      return this.setState({ warning: "warning" })
    } else {
      fetch(authorsUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            this.setState({ warningState: "warning" })
          } else {
            this.setState({
              authors: currentAuthors.concat(res.author),
              first: "",
              last: "",
              about: "",
              url: "",
              warningState: "success"
            })
            setTimeout(() => this.setState({ warningState: null }), 2000)
          }
        })
        .then(this.structureAuthorDropdown)
        .then(this.fetchAuthors)
        .catch(err => console.error(err))
    }
  }

  switchThatView = (e, { name }) => {
    switch (name) {
      case "Authors":
        return this.setState({ switchViews: false, activeItem: name })
      case "Books":
        return this.fetchBooks().then(() =>
          this.setState({ switchViews: true, activeItem: name })
        )
      default:
        alert("Wait, what did you click on?")
        break
    }
  }

  searchBooks = e => {
    const chosenBook = this.state.books.filter(
      book => book.title === e.target.innerText
    )
    if (chosenBook !== undefined) {
      this.setState({ searchedBook: chosenBook })
    } else {
      return
    }
  }

  bookSubmit = e => {
    e.preventDefault()
    const data = {
      title: this.state.bookTitle,
      genre: this.state.bookGenre,
      description: this.state.bookDescription,
      coverURL: this.state.bookUrl
    }
    const authors = this.state.newAuthors.map(author => author.id)
    if (!data.title || !data.genre || !data.description || !data.coverURL) {
      return this.setState({ warning: "warning" })
    } else {
      return (
        fetch(booksUrl, {
          method: "POST",
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
            if (authors.length === 1) {
              authors = authors[0]
            }
            const bookAuthorData = {
              book_id: bookId,
              author_id: authors
            }
            return (
              fetch(book_authorsJoinUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(bookAuthorData)
              })
                .then(res => res.json())
                // .then(this.checkError)
                .then(data => {
                  return { data }
                })
            )
            // })
          })
          // .then(pending => Promise.all(pending))
          .then(res => {
            if (res.error) {
              this.setState({ warning: "warning" })
            } else {
              return this.fetchBooks().then(res => {
                this.setState({
                  bookTitle: "",
                  bookGenre: "",
                  bookDescription: "",
                  bookUrl: "",
                  warning: "success"
                })
                setTimeout(() => this.setState({ warning: null }), 2000)
                return res
              })
            }
          })
          .then(this.structureDropdown)
          .then(this.fetchBooks)
          .catch(error => {
            this.setState({ warning: "warning", error })
          })
      )
    }
  }

  checkError = response => {
    if (response.error) {
      throw new Error("Error submitting to server")
    }
    return response
  }

  fetchDeleteBook = () => {
    fetch(
      "https://galvanize-reads-ski.herokuapp.com/books/" +
        this.state.bookToDelete,
      {
        method: "DELETE",
        mode: "cors"
      }
    )
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          this.setState({ deleteWarning: "warning" })
        } else {
          this.setState({ deleteWarning: "success" })
          setTimeout(() => this.setState({ deleteWarning: null }), 2000)
          return res
        }
      })
      .then(data => {
        const newBooks = this.state.books.filter(
          item => item.id !== data.deleted.id
        )
        return this.setState({ books: newBooks })
      })
      .then(this.structureDropdown)
      .then(this.fetchBooks)
  }

  fetchDeleteAuthor = () => {
    fetch(authorsUrl + this.state.authorToDelete, {
      method: "DELETE",
      mode: "cors"
    })
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          this.setState({ deleteAuthorWarning: "warning" })
        } else {
          this.setState({ deleteAuthorWarning: "success" })
          setTimeout(() => this.setState({ deleteAuthorWarning: null }), 2000)
          return res
        }
      })
      .then(data => {
        const newAuthors = this.state.authors.filter(
          item => item.id !== data.deleted.id
        )
        return this.setState({ authors: newAuthors })
      })
      .then(this.structureAuthorDropdown)
      .then(this.fetchAuthors)
  }

  bookDelete = e => {
    e.preventDefault()
    const chosenBook = this.state.books.filter(
      book => book.title === e.target.innerText
    )[0]
    if (chosenBook !== undefined) {
      this.setState({ bookToDelete: chosenBook.id })
    }
  }

  authorDelete = e => {
    e.preventDefault()
    const targetSpaces = e.target.innerText
    const noTargetSpaces = targetSpaces.replace(/\s/g, "")
    const chosenAuthor = this.state.authors.filter(author => {
      let spaces = `${author.firstName} ${author.lastName}`
      let noSpaces = spaces.replace(/\s/g, "")
      return noSpaces == noTargetSpaces
    })[0]
    if (chosenAuthor !== undefined) {
      this.setState({ authorToDelete: chosenAuthor.id })
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    })

  render() {
    return (
      <Context.Provider
        value={{
          data: { ...this.state },
          actions: {
            handleRemoveAuthor: this.handleRemoveAuthor,
            handleAddAuthor: this.handleAddAuthor,
            handleUserAuthorAdd: this.handleUserAuthorAdd,
            structureDropdown: this.structureDropdown,
            structureAuthorDropdown: this.structureAuthorDropdown,
            fetchAuthors: this.fetchAuthors,
            fetchBooks: this.fetchBooks,
            handleChange: this.handleChange,
            submitAuthor: this.submitAuthor,
            switchThatView: this.switchThatView,
            searchBooks: this.searchBooks,
            bookSubmit: this.bookSubmit,
            checkError: this.checkError,
            fetchDeleteBook: this.fetchDeleteBook,
            fetchDeleteAuthor: this.fetchDeleteAuthor,
            bookDelete: this.bookDelete,
            authorDelete: this.authorDelete,
            handleItemClick: this.handleItemClick,
            teacherLogin: this.teacherLogin,
            showAuthorAdd: this.showAuthorAdd,
            showAdd: this.showAdd,
            showDelete: this.showDelete,
            showAuthorDelete: this.showAuthorDelete,
            handleOpen: this.handleOpen,
            handleClose: this.handleClose
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default { Provider: AppContextProvider, Consumer: Context.Consumer }
