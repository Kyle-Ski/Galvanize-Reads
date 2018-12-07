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

    submitAuthor = () => {
        console.log('submit')
    }

    render(){
        const {warningState} = this.state
        return (
            <Container >
                <Divider />
                <Form className={warningState} onSubmit={this.submitAuthor}>
                    <Form.Group widths='equal'>
                        <Form.Field onChange={(e) => this.setState({first: e.target.value})} control={Input} value={this.state.first} label='First Name' placeholder='First Name' />
                        <Form.Field onChange={(e) => this.setState({last: e.target.value})} control={Input} value={this.state.last} label='Last Name' placeholder='Last Name' />
                        <Form.Field onChange={(e) => this.setState({url: e.target.value})} control={Input} value={this.state.url} label='Image Url'  placeholder='Image Url' />
                    </Form.Group>

                    <Form.Group inline>
                    </Form.Group>
                    <Form.Field onChange={(e) => this.setState({about: e.target.value})} control={TextArea} value={this.state.about} label='Description' placeholder='Summary...' />
                    <Message success header='Author Submitted' content="You have added an author to the list!" />
                    <Message
                        warning
                        header='Could you check something!'
                        list={[
                            'You may have not filled out all the fields.',
                        ]}
                    />
                    <Form.Field color='green' control={Button}>Add Author</Form.Field>
                </Form>
                <Divider />
            </Container>
        )
    }
}

export default AddAuthor