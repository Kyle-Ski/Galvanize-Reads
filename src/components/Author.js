import React, { Component } from "react"
import {
  Card,
  Image,
  Divider,
  Button,
  Input,
  TextArea
} from "semantic-ui-react"
const style = {
  card: {
    width: "75vw"
  },
  textArea: {
    width: "40vw",
    height: "30vh",
    borderRadius: "5px",
    border: "solid #DEDEDF 1px"
  },
  button: {
    minWidth: "75px"
  }
}

class Author extends Component {
  state = {
    edit: false,
    authorFirstName: this.props.firstName,
    authorSecondName: this.props.lastName,
    authorSummary: this.props.biography
  }

  editButton = () => {
    this.setState({ edit: !this.state.edit })
  }

  submitButton = () => {
    const data = {
      firstName: this.state.authorFirstName,
      lastName: this.state.authorSecondName,
      biography: this.state.authorSummary
    }
    if (data.title === "") {
      data.title = this.props.title
    } else if (data.genre === "") {
      data.genre = this.props.genre
    } else if (data.description === "") {
      data.description = this.props.description
    }
    fetch(
      `https://galvanize-reads-ski.herokuapp.com/authors/${this.props.id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      }
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          return alert(res.error)
        } else {
          return alert(
            `${this.props.firstName} ${
              this.props.lastName
            } was successfully edited!`
          )
        }
      })
      .then(() => this.setState({ edit: !this.state.edit }))
      .then(this.props.fetchAuthors)
      .catch(err => console.error(err))
  }

  render() {
    const { isTeacher } = this.props
    return (
      <Card style={style.card}>
        <Card.Content>
          <Card.Header>
            {this.state.edit ? (
              <div>
                <Input
                  placeholder={this.props.firstName}
                  value={this.state.authorFirstName}
                  onChange={e =>
                    this.setState({ authorFirstName: e.target.value })
                  }
                />{" "}
                <Input
                  placeholder={this.props.lastName}
                  value={this.state.authorSecondName}
                  onChange={e =>
                    this.setState({ authorSecondName: e.target.value })
                  }
                />{" "}
              </div>
            ) : (
              `${this.props.firstName} ${this.props.lastName}`
            )}
          </Card.Header>
          <Divider />
          <Image floated="left" size="medium" src={this.props.img} />
          <Card.Content>
            {this.state.edit ? (
              <TextArea
                style={style.textArea}
                onChange={e => this.setState({ authorSummary: e.target.value })}
                value={this.state.authorSummary}
                placeholder={this.props.biography}
              />
            ) : (
              <Card.Description floated="right">
                <strong>About:</strong> <br />
                <br /> {this.props.biography}
              </Card.Description>
            )}
            <Card.Meta style={style.authors} />
          </Card.Content>
        </Card.Content>
        <Card.Content>
          {isTeacher ? (
            ""
          ) : (
            <div className="ui two buttons">
              <Button
                style={style.button}
                basic
                color="blue"
                onClick={this.editButton}
              >
                Edit
              </Button>
              {this.state.edit ? (
                <Button
                  style={style.button}
                  basic
                  color="green"
                  onClick={this.submitButton}
                >
                  Submit
                </Button>
              ) : (
                ""
              )}
            </div>
          )}
        </Card.Content>
      </Card>
    )
  }
}

export default Author
