import React, { Component } from 'react'
import { Input, Button, Form, TextArea, Checkbox, Container, Divider } from 'semantic-ui-react'

class AddBook extends Component {

    render() {
        const {submit, title, genre, cover, description, titleValue, genreValue, coverValue, descriptionValue} = this.props
        return (
            <Container >
                <Divider />
                <Form onSubmit={submit}>
                    <Form.Group widths='equal'>
                        <Form.Field onChange={title} control={Input} value={titleValue} label='Title' placeholder='Title' />
                        <Form.Field onChange={genre} control={Input} value={genreValue} label='Genre' placeholder='Genre' />
                        <Form.Field onChange={cover} control={Input} value={coverValue} label='Cover Url'  placeholder='Cover Url' />
                    </Form.Group>

                    <Form.Group inline>
                        <label>Quantity</label>
                    </Form.Group>
                    <Form.Field onChange={description} control={TextArea} value={descriptionValue} label='Description' placeholder='Summary...' />
                    <Form.Field control={Checkbox} label='I agree to the Terms and Conditions' />
                    <Form.Field color='green' control={Button}>Add Book</Form.Field>
                </Form>
                <Divider />
            </Container>
        )
    }
}

export default AddBook