import React, { Component } from 'react'
import { Menu, Segment, Header, Icon, Dropdown } from 'semantic-ui-react'

class NavBar extends Component {



    render() {
        const { activeItem, handleItemClick, dropdownOptions } = this.props
        return (
            <Segment inverted>
            <Menu inverted pointing secondary >
            <Icon name='book' size='big' inverted color='olive'/>
            <Header as='h1' inverted color='olive'>Galvanize Reads</Header>
            <Menu.Menu position='right' >
              <Menu.Item name='home' active={activeItem === 'home'} onClick={handleItemClick} color='olive'/>
              <Menu.Item
                name='Books'
                active={activeItem === 'Books'}
                onClick={handleItemClick}
                color='olive'
              />
              <Menu.Item
                name='Authors'
                active={activeItem === 'Authors'}
                onClick={handleItemClick}
                color='olive'
              />
               <Menu.Item
                name='Teacher Login'
                active={activeItem === 'Teacher Login'}
                onClick={this.props.teacherLogin}
                color='olive'
              />
            <Menu.Item>
              <Dropdown icon='search' placeholder='Search For a Book' search selection options={dropdownOptions} />
            </Menu.Item>
              
                </Menu.Menu>
            </Menu>
          </Segment>
    
        )
    }
}

export default NavBar