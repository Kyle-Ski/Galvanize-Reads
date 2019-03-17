import React from "react"
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react"
import AppContext from "../context"
const LoginModal = ({ handleClose, modalOpen }) => {
  return (
    <Modal open={modalOpen} onClose={handleClose} basic size="small">
      <Header icon="browser" content="Faculty Login" />
      <Modal.Content>
        <Form onSubmit={handleClose} name="login" value={1}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Email" placeholder="Email@domain.com" />
            <Form.Input
              fluid
              label="Password"
              placeholder="Password..."
              type="password"
            />
          </Form.Group>
          <Button name="login" type="submit" color="green" inverted>
            Login
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button value={2} name="back" color="red" onClick={handleClose}>
          <Icon name="arrow alternate circle left outline" /> Back
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default () => (
  <AppContext.Consumer>
    {({ data, actions }) => (
      <LoginModal
        handleClose={actions.teacherLogin}
        handleOpen={actions.handleOpen}
        modalOpen={data.modalOpen}
      />
    )}
  </AppContext.Consumer>
)
