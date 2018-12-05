import React, { Component } from 'react'
import { Input, Button, Form, TextArea, Checkbox, Container, Divider, Message, Dropdown } from 'semantic-ui-react'

class DeleteBook extends Component {

    render() {
        const {submit, dropdownOptions, fetchDeleteBook} = this.props
        return (
            <Container >
                <Divider />
                <Form onSubmit={fetchDeleteBook}>
                    <Form.Group widths='equal'>
                        <Dropdown onChange={submit} control={Dropdown} search selection options={dropdownOptions} label='Select A Book to Delete' placeholder='Books' />
                    </Form.Group>

                    <Message success header='Book Submitted' content="You have added a book to the Library!" />
                    <Message
                        warning
                        header='Could you check something!'
                        list={[
                            'You may have not filled out all the fields.',
                        ]}
                    />
                    <Form.Field color='red' control={Button}>Delete Book</Form.Field>
                </Form>
                <Divider />
            </Container>
        )
    }
}

export default DeleteBook