import React, { Component } from 'react'
import { Input, Button, Form, TextArea, Checkbox, Container, Divider, Message } from 'semantic-ui-react'

class AddBook extends Component {

    render() {
        const {warningState, submit, title, genre, cover, description, titleValue, genreValue, coverValue, descriptionValue} = this.props
        return (
            <Container >
                <Divider />
                <Form className={warningState} onSubmit={submit}>
                    <Form.Group widths='equal'>
                        <Form.Field onChange={title} control={Input} value={titleValue} label='Title' placeholder='Title' />
                        <Form.Field onChange={genre} control={Input} value={genreValue} label='Genre' placeholder='Genre' />
                        <Form.Field onChange={cover} control={Input} value={coverValue} label='Cover Url'  placeholder='Cover Url' />
                    </Form.Group>

                    <Form.Group inline>
                    </Form.Group>
                    <Form.Field onChange={description} control={TextArea} value={descriptionValue} label='Description' placeholder='Summary...' />
                    <Message success header='Book Submitted' content="You have added a book to the Library!" />
                    <Message
                        warning
                        header='Could you check something!'
                        list={[
                            'You may have not filled out all the fields.',
                        ]}
                    />
                    <Form.Field color='green' control={Button}>Add Book</Form.Field>
                </Form>
                <Divider />
            </Container>
        )
    }
}

export default AddBook