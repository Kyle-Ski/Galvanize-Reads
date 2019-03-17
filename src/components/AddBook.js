import React from "react"
import {
  Input,
  Button,
  Form,
  TextArea,
  Dropdown,
  Divider,
  Message,
  Modal,
  Icon,
  Header
} from "semantic-ui-react"
import AppContext from "../context"

const AddBook = ({
  handleRemoveAuthor,
  handleUserAuthorAdd,
  newAuthors,
  handleAddAuthor,
  dropdownOptions,
  warningState,
  submit,
  titleValue,
  genreValue,
  coverValue,
  descriptionValue,
  showAdd,
  handleChange
}) => {
  return (
    <Modal open={showAdd} onClose={showAdd} basic size="small">
      <Header icon="browser" content="Add Book" />
      <Modal.Content>
        <Divider />

        <Form className={warningState} onSubmit={submit}>
          <Form.Group widths="equal">
            <Form.Field
              onChange={handleChange}
              name="bookTitle"
              control={Input}
              value={titleValue}
              label="Title"
              placeholder="Title"
            />
            <Form.Field
              onChange={handleChange}
              name="bookGenre"
              control={Input}
              value={genreValue}
              label="Genre"
              placeholder="Genre"
            />
            <Form.Field
              onChange={handleChange}
              name="bookUrl"
              control={Input}
              value={coverValue}
              label="Cover Url"
              placeholder="Cover Url"
            />
          </Form.Group>
          <Form.Field color="blue" control={Button} onClick={handleAddAuthor}>
            {" "}
            + Another Author
          </Form.Field>
          {newAuthors.map((author, idx) => (
            <div key={idx}>
              <Form.Field
                control={Dropdown}
                onChange={handleUserAuthorAdd(idx)}
                search
                selection
                options={dropdownOptions}
                label="Select an Author"
                placeholder="Authors.."
              />
              <Form.Field
                control={Button}
                color="red"
                onClick={handleRemoveAuthor(idx)}
              >
                - Author
              </Form.Field>
            </div>
          ))}
          <Form.Group inline />
          <Form.Field
            onChange={handleChange}
            name="bookDescription"
            control={TextArea}
            value={descriptionValue}
            label="Description"
            placeholder="Summary..."
          />
          <Message
            success
            header="Book Submitted"
            content="You have added a book to the Library!"
          />
          <Message
            warning
            header="Could you check something!"
            list={["You may have not filled out all the fields."]}
          />
          <Form.Group inline>
            <Form.Field color="green" control={Button}>
              Add Book
            </Form.Field>
            <Form.Field color="grey" control={Button} onClick={showAdd}>
              Done
            </Form.Field>
          </Form.Group>
        </Form>
        <Divider />
      </Modal.Content>
      <Modal.Actions>
        <Button value={2} name="back" color="red" onClick={showAdd}>
          <Icon name="arrow alternate circle left outline" /> Back
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default () => (
  <AppContext.Consumer>
    {({ data, actions }) => (
      <AddBook
        handleChange={actions.handleChange}
        submit={actions.bookSubmit}
        titleValue={data.bookTitle}
        genreValue={data.bookGenre}
        coverValue={data.bookUrl}
        descriptionValue={data.bookDescription}
        warningState={data.warning}
        showAdd={actions.showAdd}
        dropdownOptions={data.authorOptions}
        handleAddAuthor={actions.handleAddAuthor}
        newAuthors={data.newAuthors}
        handleUserAuthorAdd={actions.handleUserAuthorAdd}
        handleRemoveAuthor={actions.handleRemoveAuthor}
      />
    )}
  </AppContext.Consumer>
)
