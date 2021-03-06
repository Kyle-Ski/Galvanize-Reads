import React from "react"
import { Loader } from "semantic-ui-react"
import NavBar from "./NavBar"
import Library from "./Library"
import College from "./College"
import AppContext from "../context"
import Login from "./Login"

const StudentView = ({ books, switchViews }) => {
  if (books) {
    return (
      <div className="App">
        <NavBar />
        <Login />
        {switchViews ? <Library /> : <College />}
      </div>
    )
  } else {
    return <Loader active />
  }
}

export default () => (
  <AppContext.Consumer>
    {({ data }) => (
      <StudentView books={data.books} switchViews={data.switchViews} />
    )}
  </AppContext.Consumer>
)
