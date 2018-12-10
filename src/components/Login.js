import React, {Component} from 'react'
import { Button, Checkbox, Form, Input, Container, Header, Segment, Menu, Image} from 'semantic-ui-react'
import { Route, Link } from 'react-router-dom'
import SignUp from './SignUp';
import TeacherView from './TeacherView';
  

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    formSubmit = (e) => {
        e.preventDefault()
        console.log('submit', this.state)
    }

    render() {
        const {title, genre, cover, description, bookSubmit, dropdownOptions, handleItemClick, teacherLogin, activeItem, titleValue, genreValue, coverValue, descriptionValue, warning, bookDelete, fetchDeleteBook, books, fetchBooks, deleteWarning, searchBooks, searchedBook, authors, seardchedAuthor, fetchAuthors, switchThatView, switchView, submitAuthor, first, last, about, url, warningState, firstName, lastName, getUrl, getAbout, fetchDeleteAuthor, authorDelete, authorOptions, deleteAuthorWarning, handleAddAuthor, newAuthors, handleUserAuthorAdd, handleRemoveAuthor} = this.props
        return (
            <div>
            <Container>
            <Header as='h1'>Welcome To Galvanize Reads!</Header>
            <Header as='h2'>Please Sign in to Continue</Header>
                <Form onSubmit={this.formSubmit}>
                    <Form.Field control={Input} onChange={(e) => this.setState({ email: e.target.value })} label='Email' placeholder='Email' />

                    <Form.Field control={Input} onChange={(e) => this.setState({ password: e.target.value })} label='Password' placeholder='Password' type='password' />
                    <Button type='submit'><Link to='/teacher'>Submit</Link></Button>
                    <Button><Link to='/signup'>Sign Up</Link></Button>
                </Form>
            </Container>
            <Route path='/signup' render={props => <SignUp {...props}/>} />
            <Route path='/teacher' render={props=><TeacherView {...props} 
                                                    title={title}
                                                    genre={genre}
                                                    cover={cover}
                                                    description={description}
                                                    bookSubmit={bookSubmit}
                                                    dropdownOptions={dropdownOptions}
                                                    handleItemClick={handleItemClick}
                                                    teacherLogin={teacherLogin}
                                                    activeItem={activeItem}
                                                    titleValue={titleValue}
                                                    genreValue={genreValue}
                                                    coverValue={coverValue}
                                                    descriptionValue={descriptionValue}
                                                    warning={warning}
                                                    bookDelete={bookDelete}
                                                    fetchDeleteBook={fetchDeleteBook}
                                                    books={books}
                                                    fetchBooks={fetchBooks}
                                                    deleteWarning={deleteWarning}
                                                    searchBooks={searchBooks}
                                                    searchedBook={searchedBook}
                                                    authors={authors}
                                                    seardchedAuthor={seardchedAuthor}
                                                    fetchAuthors={fetchAuthors}
                                                    switchThatView={switchThatView}
                                                    switchView={switchView}
                                                    submitAuthor={submitAuthor}
                                                    first={first}
                                                    last={last}
                                                    about={about}
                                                    url={url}
                                                    warningState={warningState}
                                                    firstName={firstName}
                                                    lastName={lastName}
                                                    getUrl={getUrl}
                                                    getAbout={getAbout}
                                                    fetchDeleteAuthor={fetchDeleteAuthor}
                                                    authorDelete={authorDelete}
                                                    authorOptions={authorOptions}
                                                    deleteAuthorWarning={deleteAuthorWarning}
                                                    handleAddAuthor={handleAddAuthor}
                                                    newAuthors={newAuthors}
                                                    handleUserAuthorAdd={handleAddAuthor}
                                                    handleRemoveAuthor={handleRemoveAuthor}

                                                    />}/>
            </div>
        )
    }
}
export default Login

