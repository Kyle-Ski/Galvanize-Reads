import React, { Component } from 'react'
import { Input, Button, Form, TextArea, Dropdown, Container, Divider, Message } from 'semantic-ui-react'

class AddBook extends Component {

    render() {
        const {handleRemoveAuthor, handleUserAuthorAdd, newAuthors, handleAddAuthor, dropdownOptions, warningState, submit, title, genre, cover, description, titleValue, genreValue, coverValue, descriptionValue, showAdd} = this.props
        return (
            <Container >
                <Divider />
                <Form className={warningState} onSubmit={submit}>
                    <Form.Group widths='equal'>
                        <Form.Field onChange={title} control={Input} value={titleValue} label='Title' placeholder='Title' />
                        <Form.Field onChange={genre} control={Input} value={genreValue} label='Genre' placeholder='Genre' />
                        <Form.Field onChange={cover} control={Input} value={coverValue} label='Cover Url'  placeholder='Cover Url' />
                    </Form.Group>
                        <Form.Field color='blue' control={Button} onClick={handleAddAuthor}> + Another Author</Form.Field>
                        {newAuthors.map((author, idx) =>(
                            <div>
                            <Form.Field control={Dropdown} onChange={handleUserAuthorAdd(idx)} search selection options={dropdownOptions} label='Select an Author' placeholder='Authors..' />
                            <Form.Field control={Button} color='red' onClick={handleRemoveAuthor(idx)}>- Author</Form.Field>
                            </div>
                        ))
                        }
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
                    <Form.Group inline>
                    <Form.Field color='green' control={Button}>Add Book</Form.Field>
                    <Form.Field color='grey' control={Button} onClick={showAdd}>Done</Form.Field>
                    </Form.Group>
                </Form>
                <Divider />
            </Container>
        )
    }
}

export default AddBook