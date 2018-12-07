import React, { Component } from 'react'
import { Menu, Segment, Header, Icon, Dropdown } from 'semantic-ui-react'

class TeacherNav extends Component {

      render(){
        const { activeItem, handleItemClick, books, teacherLogin, dropdownOptions, showAdd, showDelete, searchBooks, switchThatView } = this.props
        return (
            <Segment inverted>
            <Menu inverted pointing secondary >
            <Icon name='edit' size='big' inverted color='olive'/>
            <Header as='h1' inverted color='olive'>Teacher Dashboard</Header>
            <Menu.Menu position='right' >
            <Menu.Item name='Logout' active={activeItem === 'Logout'} onClick={teacherLogin} color='olive'/>
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

            <Dropdown item text='Edit Books'>
              <Dropdown.Menu>
              <Dropdown.Item onClick={showAdd}>Add Book</Dropdown.Item>
              <Dropdown.Item onClick={showDelete}>Delete Book</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
              <Menu.Item>
                <Dropdown icon='search' placeholder='Search Books' search selection options={dropdownOptions} onChange={searchBooks}/>
              </Menu.Item>
                </Menu.Menu>
            </Menu>
          </Segment>
    
        )
      }
    
}

export default TeacherNav

{/* <Dropdown.Item name='Logout' active={activeItem === 'Logout'} onClick={teacherLogin} color='olive'/>
<Dropdown.Item
  name='Add Book'
  active={activeItem === 'Add Book'}
  onClick={showAdd}
  color='olive'
/>
<Dropdown.Item
  name='Delete Book'
  active={activeItem === 'Delete Book'}
  onClick={showDelete}
  color='olive'
/> */}
