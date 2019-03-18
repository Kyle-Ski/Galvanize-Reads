import React from "react"
import {
  Button,
  Form,
  Divider,
  Message,
  Dropdown,
  Modal,
  Header,
  Icon
} from "semantic-ui-react"
import AppContext from "../context"
const DeleteBook = ({
  submit,
  dropdownOptions,
  fetchDeleteBook,
  deleteWarning,
  showDelete,
  showDeleteAction
}) => {
  return (
    <Modal open={showDelete} basic size="small">
      <Header icon="browser" content="Delete Book" />
      <Modal.Content>
        <Divider />
        <Form className={deleteWarning} onSubmit={fetchDeleteBook}>
          <Form.Group widths="equal">
            <Dropdown
              onChange={submit}
              search
              selection
              options={dropdownOptions}
              label="Select A Book to Delete"
              placeholder="Books"
            />
          </Form.Group>

          <Message
            success
            header="Book deleted!"
            content="You have deleted a book from the Library!"
          />
          <Message
            warning
            header="Look out!"
            list={[
              "Something may have went wrong.",
              "Check to see if the book you removed is still here."
            ]}
          />
          <Form.Group inline>
            <Form.Field color="red" control={Button}>
              Delete Book
            </Form.Field>
          </Form.Group>
        </Form>
        <Divider />
      </Modal.Content>
      <Modal.Actions>
        <Button name="back" color="red" onClick={showDeleteAction}>
          <Icon name="arrow alternate circle left outline" /> Back
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default () => (
  <AppContext.Consumer>
    {({ data, actions }) => (
      <DeleteBook
        dropdownOptions={data.dropdownOptions}
        submit={actions.bookDelete}
        fetchDeleteBook={actions.fetchDeleteBook}
        deleteWarning={data.deleteWarning}
        showDelete={data.showDelete}
        showDeleteAction={actions.showDelete}
      />
    )}
  </AppContext.Consumer>
)
