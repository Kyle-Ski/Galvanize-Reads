import React, {Component} from 'react'
import { Button, Checkbox, Form, Input, Container, Header} from 'semantic-ui-react'

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        first: '',
        last: ''
    }

    formSubmit = (e) => {
        e.preventDefault()
        console.log('submit', this.state)
    }

    render() {
        return (
            <Container>
            <Header as='h2'>Create An Account</Header>
                <Form onSubmit={this.formSubmit}>
                    <Form.Field control={Input} onChange={(e) => this.setState({ email: e.target.value })} label='Email' placeholder='Email' />
                    <Form.Field control={Input} onChange={(e) => this.setState({ password: e.target.value })} label='Password' placeholder='Password' type='password' />
                    <Form.Field control={Input} onChange={(e) => this.setState({ first: e.target.value })} label='First Name' placeholder='First Name' />
                    <Form.Field control={Input} onChange={(e) => this.setState({ last: e.target.value })} label='Last Name' placeholder='Last Name' />
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        )
    }
}
export default SignUp