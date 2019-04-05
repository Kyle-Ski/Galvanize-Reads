import React, { useState } from "react"
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

const Author = ({
  firstName,
  lastName,
  biography,
  genre,
  description,
  title,
  id,
  fetchAuthors,
  isTeacher,
  img
}) => {
  const [edit, setEdit] = useState(false)
  const [authorFirstName, setFirst] = useState(firstName)
  const [authorSecondName, setSecond] = useState(lastName)
  const [authorSummary, setSummary] = useState(biography)
  const editButton = () => setEdit(!edit)

  const submitButton = () => {
    const data = {
      firstName: authorFirstName,
      lastName: authorSecondName,
      biography: authorSummary
    }
    if (data.title === "") {
      data.title = title
    } else if (data.genre === "") {
      data.genre = genre
    } else if (data.description === "") {
      data.description = description
    }
    fetch(`https://galvanize-reads-ski.herokuapp.com/authors/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          return alert(res.error)
        } else {
          return alert(`${firstName} ${lastName} was successfully edited!`)
        }
      })
      .then(() => setEdit(!edit))
      .then(fetchAuthors)
      .catch(err => console.error(err))
  }

  return (
    <Card style={style.card}>
      <Card.Content>
        <Card.Header>
          {edit ? (
            <div>
              <Input
                placeholder={firstName}
                value={authorFirstName}
                onChange={e => setFirst(e.target.value)}
              />{" "}
              <Input
                placeholder={lastName}
                value={authorSecondName}
                onChange={e => setSecond(e.target.value)}
              />{" "}
            </div>
          ) : (
            `${firstName} ${lastName}`
          )}
        </Card.Header>
        <Divider />
        <Image floated="left" size="medium" src={img} />
        <Card.Content>
          {edit ? (
            <TextArea
              style={style.textArea}
              onChange={e => setSummary(e.target.value)}
              value={authorSummary}
              placeholder={biography}
            />
          ) : (
            <Card.Description floated="right">
              <strong>About:</strong> <br />
              <br /> {biography}
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
              onClick={editButton}
            >
              Edit
            </Button>
            {edit ? (
              <Button
                style={style.button}
                basic
                color="green"
                onClick={submitButton}
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

export default Author
