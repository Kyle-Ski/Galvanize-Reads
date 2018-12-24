import React from 'react'

const BookAuthors = ({authors}) => authors.map(author => (<a onClick={()=>console.log(author.author_id)}>{author.firstName} {author.lastName}<br/></a>))

export default BookAuthors