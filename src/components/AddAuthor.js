import React from "react"
import {
  Input,
  Button,
  Form,
  TextArea,
  Divider,
  Message,
  Modal,
  Header,
  Icon
} from "semantic-ui-react"
import AppContext from "../context"

const AddAuthor = ({
  handleChange,
  warningState,
  submit,
  firstValue,
  lastValue,
  urlValue,
  aboutValue,
  showAuthorAdd,
  showAdd
}) => {
  return (
    <Modal open={showAuthorAdd} onClose={showAuthorAdd} basic size="small">
      <Header icon="browser" content="Add Author" />
      <Modal.Content>
        <Divider />
        <Form className={warningState} onSubmit={submit}>
          <Form.Group widths="equal">
            <Form.Field
              onChange={handleChange}
              name="first"
              control={Input}
              value={firstValue}
              label="First Name"
              placeholder="First Name"
            />
            <Form.Field
              onChange={handleChange}
              name="last"
              control={Input}
              value={lastValue}
              label="Last Name"
              placeholder="Last Name"
            />
            <Form.Field
              onChange={handleChange}
              name="url"
              control={Input}
              value={urlValue}
              label="Image Url"
              placeholder="Image Url"
            />
          </Form.Group>

          <Form.Group inline />
          <Form.Field
            onChange={handleChange}
            name="about"
            control={TextArea}
            value={aboutValue}
            label="Description"
            placeholder="Summary..."
          />
          <Message
            success
            header="Author Submitted"
            content="You have added an author to the list!"
          />
          <Message
            warning
            header="Could you check something!"
            list={["You may have not filled out all the fields."]}
          />
          <Form.Group inline>
            <Form.Button color="green" control={Button} type="submit">
              Add Author
            </Form.Button>
            <Form.Field color="grey" control={Button} onClick={showAuthorAdd}>
              Done
            </Form.Field>
          </Form.Group>
        </Form>
        <Divider />
      </Modal.Content>
      <Modal.Actions>
        <Button value={2} name="back" color="red" onClick={showAuthorAdd}>
          <Icon name="arrow alternate circle left outline" /> Back
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default () => (
  <AppContext.Consumer>
    {({ data, actions }) => (
      <AddAuthor
        warningState={data.warningState}
        showAdd={actions.showAdd}
        submit={actions.submitAuthor}
        handleChange={actions.handleChange}
        firstValue={data.first}
        lastValue={data.last}
        urlValue={data.url}
        aboutValue={data.about}
        showAuthorAdd={actions.showAuthorAdd}
      />
    )}
  </AppContext.Consumer>
)
