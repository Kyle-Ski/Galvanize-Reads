import React, { Component } from "react"
import { Menu, Segment, Header, Icon, Dropdown } from "semantic-ui-react"
import AppContext from "../context"

const TeacherNav = ({
  activeItem,
  teacherLogin,
  dropdownOptions,
  showAdd,
  showDelete,
  searchBooks,
  switchThatView,
  showAuthorAdd,
  showAuthorDelete
}) => {
  return (
    <Segment inverted>
      <Menu inverted pointing secondary stackable>
        <Icon name="edit" size="big" inverted color="olive" />
        <Header as="h1" inverted color="olive">
          Teacher Dashboard
        </Header>
        <Menu.Menu position="right">
          <Menu.Item
            name="Logout"
            active={activeItem === "Logout"}
            onClick={teacherLogin}
            color="olive"
          />
          <Menu.Item
            name="Books"
            active={activeItem === "Books"}
            onClick={switchThatView}
            color="olive"
          />
          <Menu.Item
            name="Authors"
            active={activeItem === "Authors"}
            onClick={switchThatView}
            color="olive"
          />

          <Dropdown item text="Edit Library">
            <Dropdown.Menu>
              <Dropdown.Item onClick={showAdd}>Add Book</Dropdown.Item>
              <Dropdown.Item onClick={showDelete}>Delete Book</Dropdown.Item>
              <Dropdown.Item onClick={showAuthorAdd}>Add Author</Dropdown.Item>
              <Dropdown.Item onClick={showAuthorDelete}>
                Remove Author
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item>
            <Dropdown
              icon="search"
              placeholder="Search Books"
              search
              selection
              options={dropdownOptions}
              onChange={searchBooks}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
  )
}

export default () => (
  <AppContext.Consumer>
    {({ data, actions }) => (
      <TeacherNav
        activeItem={data.activeItem}
        teacherLogin={actions.teacherLogin}
        dropdownOptions={data.dropdownOptions}
        showAdd={actions.showAdd}
        showDelete={actions.showDelete}
        searchBooks={actions.searchBooks}
        switchThatView={actions.switchThatView}
        showAuthorAdd={actions.showAuthorAdd}
        showAuthorDelete={actions.showAuthorDelete}
      />
    )}
  </AppContext.Consumer>
)
