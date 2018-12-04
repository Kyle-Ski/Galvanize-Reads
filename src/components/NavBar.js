import React, { Component } from 'react'
import { Menu, Segment, Header, Icon } from 'semantic-ui-react'

class NavBar extends Component {

    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    render() {
        const { activeItem } = this.state
        return (
            <Segment inverted>
            <Menu inverted pointing secondary >
            <Icon name='book' size='big' inverted color='olive'/>
            <Header as='h1' inverted color='olive'>Galvanize Reads</Header>
            <Menu.Menu position='right' >
              <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} color='olive'/>
              <Menu.Item
                name='messages'
                active={activeItem === 'messages'}
                onClick={this.handleItemClick}
                color='olive'
              />
              <Menu.Item
                name='friends'
                active={activeItem === 'friends'}
                onClick={this.handleItemClick}
                color='olive'
              />
                </Menu.Menu>
            </Menu>
          </Segment>
    
        )
    }
}

export default NavBar