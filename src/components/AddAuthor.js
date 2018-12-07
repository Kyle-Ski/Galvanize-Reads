import React, { Component } from 'react'
import { Input, Button, Form, TextArea, Checkbox, Container, Divider, Message } from 'semantic-ui-react'

class AddAuthor extends Component {

    state = {
        first: '',
        last: '', 
        about: '',
        url: '',
        warningState: null
    }

    render(){
        return (
            <Container >
                <Divider />
                <Form className={this.props.warningState} onSubmit={this.props.submitAuthor}>
                    <Form.Group widths='equal'>
                        <Form.Field onChange={this.props.firstName} control={Input} value={this.props.first} label='First Name' placeholder='First Name' />
                        <Form.Field onChange={this.props.lastName} control={Input} value={this.props.last} label='Last Name' placeholder='Last Name' />
                        <Form.Field onChange={this.props.getUrl} control={Input} value={this.props.url} label='Image Url'  placeholder='Image Url' />
                    </Form.Group>

                    <Form.Group inline>
                    </Form.Group>
                    <Form.Field onChange={this.props.getAbout} control={TextArea} value={this.props.about} label='Description' placeholder='Summary...' />
                    <Message success header='Author Submitted' content="You have added an author to the list!" />
                    <Message
                        warning
                        header='Could you check something!'
                        list={[
                            'You may have not filled out all the fields.',
                        ]}
                    />
                    <Form.Group inline>
                    <Form.Field color='green' control={Button}>Add Author</Form.Field>
                    <Form.Field color='grey' control={Button} onClick={this.props.showAdd}>Done</Form.Field>
                    </Form.Group>
                </Form>
                <Divider />
            </Container>
        )
    }
}

export default AddAuthor