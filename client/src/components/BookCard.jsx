import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { UserContext } from '../contexts/UserContext';

import imgErrorIcon from '../images/img_unavailable.png';
import API from '../api';

export default function BookCard({ book, shelfKey }) {
  const { token } = useContext(UserContext);
  const queryClient = useQueryClient()
  let history = useHistory();

  const openBook = () => history.push(`book/${book.id}`)

  const mutation = useMutation(newShelfKey => {
    newShelfKey === 'remove'
      ? API.removeBook(book.id, token)
      : API.moveBook(book.id, newShelfKey, token)
  }, {
    // Invaldiate bookshelf query to cause refetch+rerender of bookshelf
    onSuccess: () => queryClient.invalidateQueries('bookshelf')
  })

  return (
    <div className="book-card mb-2">
      <div className="card-body p-1">

        {/* Book title and author(s) */}
        <h6 className="card-title mb-0">
          <button className="btn btn-link text-left p-0 m-0" onClick={openBook}>{book.title}</button>
        </h6>
        <div className="card-text">  
          <small>
            {'by '}
            {book.authors && book.authors.map((author, index) => index === book.authors.length - 1 
                ? <b key={author}>{author}</b> 
                : <b key={author}>{author}, </b>)}
          </small>
        </div>

        <hr className="my-1" />
        <div className="form-group row ml-0">

          {/* Thumbnail */}
          <img className="book-thumbnail m-2"
            onClick={openBook}
            src={book.imageLinks ? book.imageLinks.thumbnail || book.imageLinks.smallThumbnail || imgErrorIcon : imgErrorIcon}
            alt={book.title}/>

          {/* Change shelf */}
          <div className="col mr-4 ml-0">

            <label htmlFor={`${book.id}-change-shelf`}>
              Change shelf:
            </label>

            <select
              id={`${book.id}-change-shelf`}
              value={shelfKey}
              onChange={e => (e.target.value !== shelfKey) && mutation.mutate(e.target.value)}
              className="form-control p-1">

              <option value="wantToRead">Want to Read</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="read">Read</option>
              <option value="remove">Remove from shelf</option>

            </select>
          </div>
        </div>

      </div>
    </div>
)
}