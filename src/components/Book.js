import React, { Component } from 'react'
import { Card, Icon, Image, Divider, Header, Button } from 'semantic-ui-react'

const style = {
    card: {
        width: '75vw'
    },
}

class Book extends Component {

    render() {
        return (
            <Card style={style.card}>
                <Card.Content>
                    <Card.Header>{this.props.title}</Card.Header>
                    <Divider />
                    <Image floated='left' size='small' src={this.props.img} />
                    <Card.Content>
                        <Card.Description floated='right'>{this.props.description}</Card.Description>
                        <Card.Meta style={style.authors}>
                            Author(s): {this.props.authors}
                        </Card.Meta>
                    </Card.Content>
                </Card.Content>
                <Card.Content>
                <div className='ui two buttons'>
                    <Button basic color='blue' >Edit</Button>
                    <Button basic color='red' >Delete</Button>
                </div>
                </Card.Content>
            </Card>
        )
    }
}

export default Book