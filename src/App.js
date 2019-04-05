import React from "react"
import "./App.css"
import TeacherView from "./components/TeacherView"
import StudentView from "./components/StudentView"
import AppContext from "./context"

const App = ({ isTeacher }) => (
  <div className="App">{isTeacher ? <StudentView /> : <TeacherView />}</div>
)

export default () => (
  <AppContext.Consumer>
    {({ data }) => <App isTeacher={data.isTeacher} />}
  </AppContext.Consumer>
)
