import React, { Component } from 'react'
import { Menu, Segment, Header, Dropdown, Image } from 'semantic-ui-react'

const style = {
  image: {
    maxHeight: '40px',
    maxWidth: '40px',
    alignSelf: 'center',
    margin: '10px'
  }
}

class NavBar extends Component {

    render() {
        const { activeItem, handleItemClick, dropdownOptions, searchBooks, fetchBooks, switchThatView } = this.props
        return (
            <Segment inverted>
            <Menu inverted pointing secondary stackable>
            <Image style={style.image} src='/G.png'/>
            <Header as='h1' inverted color='olive'>Galvanize Reads</Header>
            <Menu.Menu position='right' >
              <Menu.Item name='home' active={activeItem === 'home'} onClick={handleItemClick} color='olive'/>
              <Menu.Item
                name='Books'
                active={activeItem === 'Books'}
                onClick={switchThatView}
                color='olive'
              />
              <Menu.Item
                name='Authors'
                active={activeItem === 'Authors'}
                onClick={switchThatView}
                color='olive'
              />
               <Menu.Item
                name='Teacher Login'
                active={activeItem === 'Teacher Login'}
                onClick={this.props.teacherLogin}
                color='olive'
              />
            <Menu.Item>
              <Dropdown icon='search' placeholder='Search For a Book' search selection options={dropdownOptions} onChange={searchBooks}/>
            </Menu.Item>
              
                </Menu.Menu>
            </Menu>
          </Segment>
    
        )
    }
}

export default NavBar