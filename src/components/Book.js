import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

class Book extends Component {

    render() {
        return (
            <Card>
                <Image src={this.props.img} />
                <Card.Content>
                    <Card.Header>{this.props.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Joined in 2015</span>
                    </Card.Meta>
                    <Card.Description>{this.props.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        
                    </a>
                </Card.Content>
            </Card>
        )
    }
}

export default Book