import React, { Component } from 'react'
import { Input, Button, Form, TextArea, Checkbox, Container, Divider, Message, Dropdown } from 'semantic-ui-react'

class DeleteBook extends Component {

    render() {
        const {submit, dropdownOptions, fetchDeleteBook, deleteWarning} = this.props
        return (
            <Container >
                <Divider />
                <Form className={deleteWarning} onSubmit={fetchDeleteBook}>
                    <Form.Group widths='equal'>
                        <Dropdown onChange={submit} search selection options={dropdownOptions} label='Select A Book to Delete' placeholder='Books' />
                    </Form.Group>

                    <Message success header='Book deleted!' content="You have deleted a book from the Library!" />
                    <Message
                        warning
                        header='Look out!'
                        list={[
                            'Something may have went wrong.',
                            'Check to see if the book you removed is still here.'
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