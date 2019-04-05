import React, { useState } from "react"
import {
  Card,
  Image,
  Divider,
  Button,
  Input,
  TextArea
} from "semantic-ui-react"

const bookPutUrl = `https://galvanize-reads-ski.herokuapp.com/books/`
const style = {
  card: {
    width: "75vw"
  },
  textArea: {
    width: "60vw",
    height: "30vh",
    borderRadius: "5px",
    border: "solid #DEDEDF 1px"
  },
  button: {
    minWidth: "75px"
  }
}

const Book = ({
  title,
  description,
  genre,
  authors,
  fetchBooks,
  isTeacher,
  img,
  authorClick,
  id
}) => {
  const [bookId, setBookId] = useState(false)
  const [bookTitle, setBookTitle] = useState(title)
  const [bookDescription, setBookDescription] = useState(description)
  const [bookGenre, setBookGenre] = useState(genre)

  const editButton = () => setBookId(!bookId)

  const submitButton = () => {
    const data = {
      title: bookTitle,
      genre: bookGenre,
      description: bookDescription
    }
    if (data.title === "") {
      data.title = title
    } else if (data.genre === "") {
      data.genre = genre
    } else if (data.description === "") {
      data.description = description
    }
    fetch(bookPutUrl + id, {
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
          return alert(`${title} was successfully edited!`)
        }
      })
      .then(() => setBookId(!bookId))
      .then(fetchBooks)
      .catch(err => console.error(err))
  }

  return (
    <Card style={style.card}>
      <Card.Content>
        <Card.Header>
          {bookId ? (
            <Input
              placeholder={title}
              value={bookTitle}
              onChange={e => setBookTitle(e.target.value)}
            />
          ) : (
            title
          )}
        </Card.Header>
        <Divider />
        <Image floated="left" size="small" src={img} />
        <Card.Content>
          {bookId ? (
            <TextArea
              style={style.textArea}
              onChange={e => setBookDescription(e.target.value)}
              value={bookDescription}
              placeholder={description}
            />
          ) : (
            <Card.Description floated="right">{description}</Card.Description>
          )}
          <Card.Meta style={style.authors}>
            Genre:{" "}
            {bookId ? (
              <Input
                onChange={e => setBookGenre(e.target.value)}
                value={bookGenre}
                placeholder={genre}
              />
            ) : (
              genre
            )}
          </Card.Meta>
          Author(s) : <br />
          {authors.map((author, i) => (
            <button
              className="author_link"
              key={i}
              onClick={() => authorClick(author.author_id)}
            >
              {author.firstName} {author.lastName}
              <br />
            </button>
          ))}
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
            {bookId ? (
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

export default Book
