import React, { Component } from "react"
import { Loader } from "semantic-ui-react"
import TeacherNav from "./TeacherNav"
import Library from "./Library"
import AddBook from "./AddBook"
import DeleteBook from "./DeleteBook"
import College from "./College"
import AddAuthor from "./AddAuthor"
import DeleteAuthor from "./DeleteAuthor"
import AppContext from "../context"

const TeacherView = ({
  showAuthorAdd,
  bookSubmit,
  dropdownOptions,
  handleItemClick,
  teacherLogin,
  activeItem,
  titleValue,
  genreValue,
  coverValue,
  descriptionValue,
  warning,
  bookDelete,
  fetchDeleteBook,
  books,
  fetchBooks,
  deleteWarning,
  searchBooks,
  searchedBook,
  authors,
  seardchedAuthor,
  fetchAuthors,
  switchThatView,
  switchView,
  submitAuthor,
  first,
  last,
  about,
  url,
  warningState,
  fetchDeleteAuthor,
  authorDelete,
  authorOptions,
  deleteAuthorWarning,
  handleAddAuthor,
  newAuthors,
  handleUserAuthorAdd,
  handleRemoveAuthor,
  handleChange,
  showDelete,
  showAuthorDelete
}) => {
  return (
    <div className="App">
      <TeacherNav
        dropdownOptions={dropdownOptions}
        handleItemClick={handleItemClick}
        teacherLogin={teacherLogin}
        activeItem={activeItem}
        books={books}
        showAdd={showAuthorAdd}
        showDelete={showDelete}
        searchBooks={searchBooks}
        switchThatView={switchThatView}
        showAuthorAdd={showAuthorAdd}
        showAuthorDelete={showAuthorDelete}
      />
      {showAuthorAdd ? (
        <AddBook
          handleChange={handleChange}
          submit={bookSubmit}
          titleValue={titleValue}
          genreValue={genreValue}
          coverValue={coverValue}
          descriptionValue={descriptionValue}
          warningState={warning}
          showAdd={showAuthorAdd}
          dropdownOptions={authorOptions}
          handleAddAuthor={handleAddAuthor}
          newAuthors={newAuthors}
          handleUserAuthorAdd={handleUserAuthorAdd}
          handleRemoveAuthor={handleRemoveAuthor}
        />
      ) : (
        ""
      )}
      {showDelete ? (
        <DeleteBook
          dropdownOptions={dropdownOptions}
          submit={bookDelete}
          fetchDeleteBook={fetchDeleteBook}
          deleteWarning={deleteWarning}
          showDelete={this.showDelete}
        />
      ) : (
        ""
      )}
      {showAuthorAdd ? <AddAuthor /> : ""}
      {showAuthorDelete ? (
        <DeleteAuthor
          fetchDeleteAuthor={fetchDeleteAuthor}
          submit={authorDelete}
          authorOptions={authorOptions}
          deleteAuthorWarning={deleteAuthorWarning}
          showDelete={this.showAuthorDelete}
        />
      ) : (
        ""
      )}
      {switchView ? <Library /> : <College />}
    </div>
  )
}
// }

export default () => (
  <AppContext.Consumer>
    {({ data, actions }) => (
      <TeacherView
        showDelete={data.showdelete}
        showAuthorDelete={data.showAuthorDelete}
        showAuthorAdd={data.showAuthorAdd}
        bookSubmit={actions.bookSubmit}
        dropdownOptions={data.dropdownOptions}
        handleItemClick={actions.handleItemClick}
        teacherLogin={actions.teacherLogin}
        activeItem={data.activeItem}
        titleValue={data.bookTitle}
        genreValue={data.bookGenre}
        coverValue={data.bookUrl}
        descriptionValue={data.bookDescription}
        warning={data.warning}
        bookDelete={actions.bookDelete}
        fetchDeleteBook={actions.fetchDeleteBook}
        books={data.books}
        fetchBooks={actions.fetchBooks}
        deleteWarning={data.deleteWarning}
        searchBooks={actions.searchBooks}
        searchedBook={data.searchedBook}
        authors={data.authors}
        seardchedAuthor={data.seardchedAuthor}
        fetchAuthors={actions.fetchAuthors}
        switchThatView={actions.switchThatView}
        switchView={data.switchViews}
        submitAuthor={actions.submitAuthor}
        first={data.first}
        last={data.last}
        about={data.about}
        url={data.url}
        warningState={data.warningState}
        fetchDeleteAuthor={actions.fetchDeleteAuthor}
        authorDelete={actions.authorDelete}
        authorOptions={data.authorOptions}
        deleteAuthorWarning={data.deleteAuthorWarning}
        handleAddAuthor={actions.handleAddAuthor}
        newAuthors={data.newAuthors}
        handleUserAuthorAdd={actions.handleUserAuthorAdd}
        handleRemoveAuthor={actions.handleRemoveAuthor}
        handleChange={actions.handleChange}
      />
    )}
  </AppContext.Consumer>
)
