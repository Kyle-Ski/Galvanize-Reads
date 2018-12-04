import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Library from './components/Library'

const booksUrl = 'http://localhost:3222/books/'
class App extends Component {

  state = {
    books: '',
    authors: ''
  }

  fetchBooks = () => {
    fetch(booksUrl)
      .then(res => res.json())
      .then(res => this.setState({ books: res.books }))
  }

  componentDidMount() {
    this.fetchBooks()
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Library books={this.state.books}/>
      </div>
    );
  }
}

export default App;
