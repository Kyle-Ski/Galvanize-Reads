import React, { Component } from 'react'
import { Card, Icon, Image, Divider, Header } from 'semantic-ui-react'

const style = {
    card: {
        width: '75vw'
    },
    edit: {
        display: 'inline'
    }
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
                    <Header as='a' style={style.edit}>Edit    </Header>
                    <Header as='h2' style={style.edit}>|</Header>
                    <Header as='a' style={style.edit}>    Delete</Header>
                </Card.Content>
            </Card>
        )
    }
}

export default Book