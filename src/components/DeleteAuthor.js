import React from "react"
import {
  Button,
  Form,
  Divider,
  Message,
  Dropdown,
  Modal,
  Icon,
  Header
} from "semantic-ui-react"
import AppContext from "../context"
const DeleteAuthor = ({
  submit,
  authorOptions,
  fetchDeleteAuthor,
  deleteAuthorWarning,
  showDelete,
  showDeleteAction
}) => {
  return (
    <Modal open={showDelete} basic size="small">
      <Header icon="browser" content="Remove Author" />
      <Modal.Content>
        <Divider />
        <Form className={deleteAuthorWarning} onSubmit={fetchDeleteAuthor}>
          <Form.Group widths="equal">
            <Dropdown
              onChange={submit}
              search
              selection
              options={authorOptions}
              label="Select an Author to Delete"
              placeholder="Author.."
            />
          </Form.Group>

          <Message
            success
            header="Author deleted!"
            content="You have deleted an Author from the list!"
          />
          <Message
            warning
            header="Look out!"
            list={[
              "Something may have went wrong.",
              "Check to see if the author you removed is still here."
            ]}
          />
          <Form.Group inline>
            <Form.Field color="red" control={Button}>
              Remove Author
            </Form.Field>
          </Form.Group>
        </Form>
        <Divider />
      </Modal.Content>
      <Modal.Actions>
        <Button value={2} name="back" color="red" onClick={showDeleteAction}>
          <Icon name="arrow alternate circle left outline" /> Back
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default () => (
  <AppContext.Consumer>
    {({ data, actions }) => (
      <DeleteAuthor
        fetchDeleteAuthor={actions.fetchDeleteAuthor}
        submit={actions.authorDelete}
        authorOptions={data.authorOptions}
        deleteAuthorWarning={data.deleteAuthorWarning}
        showDelete={data.showAuthorDelete}
        showDeleteAction={actions.showAuthorDelete}
      />
    )}
  </AppContext.Consumer>
)
