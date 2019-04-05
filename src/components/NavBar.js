import React from "react"
import { Menu, Segment, Header, Dropdown, Image } from "semantic-ui-react"
import AppContext from "../context"

const style = {
  image: {
    maxHeight: "40px",
    maxWidth: "40px",
    alignSelf: "center",
    margin: "10px"
  }
}

const NavBar = ({
  activeItem,
  dropdownOptions,
  searchBooks,
  switchThatView,
  modalOpen
}) => {
  return (
    <Segment>
      <Menu pointing secondary stackable>
        <Image style={style.image} src="/G.png" />
        <Header as="h1" inverted color="olive">
          Galvanize Reads
        </Header>
        <Menu.Menu position="right">
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={switchThatView}
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
          <Menu.Item
            name="Teacher Login"
            active={activeItem === "Teacher Login"}
            onClick={modalOpen}
            color="olive"
          />
          <Menu.Item>
            <Dropdown
              icon="search"
              placeholder="Search For a Book"
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
      <NavBar
        teacherLogin={actions.teacherLogin}
        activeItem={data.activeItem}
        dropdownOptions={data.dropdownOptions}
        searchBooks={actions.searchBooks}
        switchThatView={actions.switchThatView}
        modalOpen={actions.handleOpen}
      />
    )}
  </AppContext.Consumer>
)
