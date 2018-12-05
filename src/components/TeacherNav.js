import React, { Component } from 'react'
import { Menu, Segment, Header, Icon, Dropdown } from 'semantic-ui-react'

const TeacherNav = ({ activeItem, handleItemClick, books, teacherLogin, dropdownOptions }) => {


        return (
            <Segment inverted>
            <Menu inverted pointing secondary >
            <Icon name='edit' size='big' inverted color='olive'/>
            <Header as='h1' inverted color='olive'>Teacher Dashboard</Header>
            <Menu.Menu position='right' >
              <Menu.Item name='home' active={activeItem === 'home'} onClick={teacherLogin} color='olive'/>
              <Menu.Item
                name='Add Book'
                active={activeItem === 'Add Book'}
                onClick={handleItemClick}
                color='olive'
              />
              <Menu.Item
                name='Delete Book'
                active={activeItem === 'Delete Book'}
                onClick={handleItemClick}
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

export default TeacherNav