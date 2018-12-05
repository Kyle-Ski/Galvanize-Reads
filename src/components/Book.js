import React, { Component } from 'react'
import { Card, Icon, Image, Divider, Header, Button, Modal, Input, TextArea } from 'semantic-ui-react'

const style = {
    card: {
        width: '75vw'
    },
    textArea: {
        width: '60vw',
        height: '30vh',
        borderRadius: '5px',
        border: 'solid #DEDEDF 1px'
    }
}

class Book extends Component {

    state = {
        bookId: false,
        bookTitle: '',
        bookDescription: '',
        bookGenre: ''
    }

    editButton = () => {
        console.log(this.props.title)
        this.setState({bookId: !this.state.bookId})
    }

    submitButton = () => {
        const data = {
            title: this.state.bookTitle,
            genre: this.state.bookGenre,
            description: this.state.bookDescription
        }
        if(data.title === ''){
            data.title = this.props.title
        } else if (data.genre === '') {
            data.genre = this.props.genre
        } else if (data.description === '') {
            data.description = this.props.description
        }
        fetch(`http://localhost:3222/books/${this.props.id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(res => {
            if(res.error){
                return alert(res.error)
            } else {
                return alert('success')
            }
        })
        .then(()=> this.setState({bookId: !this.state.bookId}))
        .then(this.props.fetchBooks)
    }

    render() {
        const{isTeacher} = this.props
        return (
            <Card style={style.card}>
                <Card.Content>
                    <Card.Header>{this.state.bookId ? <Input placeholder={this.props.title} onChange={(e) => this.setState({bookTitle: e.target.value})}/> : this.props.title }</Card.Header>
                    <Divider />
                    <Image floated='left' size='small' src={this.props.img} />
                    <Card.Content>
                        {this.state.bookId ? <TextArea style={style.textArea} onChange={(e) => this.setState({bookDescription: e.target.value})} placeholder={this.props.description}/> : <Card.Description floated='right'>{this.props.description}</Card.Description>}
                        <Card.Meta style={style.authors}>
                            Genre: {this.state.bookId ? <Input onChange={(e) => this.setState({bookGenre: e.target.value})} placeholder={this.props.genre} /> : this.props.genre}
                        </Card.Meta>
                    </Card.Content>
                </Card.Content>
                <Card.Content>
                {isTeacher ? '' : <div className='ui two buttons'>
                    <Button basic color='blue' onClick={this.editButton}>Edit</Button>
                    {this.state.bookId ? <Button basic color='green' onClick={this.submitButton}>Submit</Button> : ''}
                </div>}
                </Card.Content>
            </Card>
            
        )
    }
}

export default Book