import React from "react"
import TeacherNav from "./TeacherNav"
import Library from "./Library"
import AddBook from "./AddBook"
import DeleteBook from "./DeleteBook"
import College from "./College"
import AddAuthor from "./AddAuthor"
import DeleteAuthor from "./DeleteAuthor"
import AppContext from "../context"

const TeacherView = ({
  showAdd,
  showAuthorAdd,
  switchView,
  showDelete,
  showAuthorDelete
}) => {
  return (
    <div className="App">
      <TeacherNav />
      {showAdd ? <AddBook /> : ""}
      {showDelete ? <DeleteBook /> : ""}
      {showAuthorAdd ? <AddAuthor /> : ""}
      {showAuthorDelete ? <DeleteAuthor /> : ""}
      {switchView ? <Library /> : <College />}
    </div>
  )
}

export default () => (
  <AppContext.Consumer>
    {({ data }) => (
      <TeacherView
        showAdd={data.showAdd}
        showDelete={data.showDelete}
        showAuthorDelete={data.showAuthorDelete}
        showAuthorAdd={data.showAuthorAdd}
        switchView={data.switchViews}
      />
    )}
  </AppContext.Consumer>
)
