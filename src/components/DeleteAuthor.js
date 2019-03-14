import React from "react"
import {
  Button,
  Form,
  Container,
  Divider,
  Message,
  Dropdown
} from "semantic-ui-react"
import AppContext from "../context"
const DeleteAuthor = ({
  submit,
  authorOptions,
  fetchDeleteAuthor,
  deleteAuthorWarning,
  showDelete
}) => {
  return (
    <Container>
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
          <Form.Field color="grey" control={Button} onClick={showDelete}>
            Done
          </Form.Field>
        </Form.Group>
      </Form>
      <Divider />
    </Container>
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
        showDelete={actions.showAuthorDelete}
      />
    )}
  </AppContext.Consumer>
)
