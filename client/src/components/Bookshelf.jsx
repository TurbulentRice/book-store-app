import { useContext } from 'react';
import { useQuery } from 'react-query';
import { UserContext } from '../contexts/UserContext';
import Shelf from './Shelf'
import API from '../api.js';

// Display user's "shelves"

export default function Bookshelf() {
  const { token } = useContext(UserContext)
  const { isLoading, error, data } = useQuery('bookshelf', () => API.getBookshelf(token))

  if (isLoading) return "Loading..."
  if (error) return "An error occurred while fetching data."

  const { wantToRead, currentlyReading, read } = data.books

  return (
    <div className="container-fluid">

      {!!wantToRead.length && <Shelf title='Want to Read' shelfKey='wantToRead' books={wantToRead} />}

      {!!currentlyReading.length && <Shelf title='Currently Reading' shelfKey='currentlyReading' books={currentlyReading} />}

      {!!read.length && <Shelf title='Read' shelfKey='read' books={read} />}

    </div>
  )
}