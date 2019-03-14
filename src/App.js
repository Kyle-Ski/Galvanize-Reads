import React, { Component } from "react"
import "./App.css"
import TeacherView from "./components/TeacherView"
import StudentView from "./components/StudentView"
import AppContext from "./context"

class App extends Component {
  render() {
    const { isTeacher } = this.props
    return (
      <div className="App">{isTeacher ? <StudentView /> : <TeacherView />}</div>
    )
  }
}

export default () => (
  <AppContext.Consumer>
    {({ data }) => <App isTeacher={data.isTeacher} />}
  </AppContext.Consumer>
)
