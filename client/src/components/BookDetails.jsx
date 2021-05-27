import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import imgErrorIcon from '../images/img_unavailable.png';
import API from '../api';

export default function BookDetails() {
  const { bookID } = useParams();
  const { token } = useContext(UserContext)

  const queryClient = useQueryClient()
  const mutation = useMutation((newShelfKey) => API.moveBook(book.id, newShelfKey, token), {
    onSuccess: () => queryClient.invalidateQueries(bookID)
  })

  // Maybe query "ID" should be book id?
  // That way we can use invalidation dynamicall for each viewBook req
  const { isLoading, error, data } = useQuery(bookID, () => API.viewBook(bookID, token))
  
  if (isLoading) return "Loading..."
  if (error) return "An error occurred while fetching data."

  const { book } = data
  return (
    <div className="container m-4">
      <h2>{book.title}</h2>
      {book.subtitle && <h5>{book.subtitle}</h5>}
      <p>
        {'by '}
        {book.authors && book.authors.map((author, index) => index === book.authors.length - 1 
            ? author
            : `${author}, `)}
      </p>
      <div className="row">

        <div className="col-2">
          <img
            src={book.imageLinks ? book.imageLinks.thumbnail || book.imageLinks.smallThumbnail || imgErrorIcon : imgErrorIcon}
            alt={book.title}
            className="mt-2"/>
        </div>

        <div className="col">
          <h6>Description:</h6>
          <p>{book.description || "No description available for this book..."}</p>
        </div>

        <div className="col">

          <ul className="list-group list-group-flush">
            <li className="list-group-item form-inline d-flex justify-content-between">
              <b>Shelf: </b>
              <select
                id={`${book.id}-change-shelf`}
                value={book.shelf || ""}
                onChange={e => (e.target.value && e.target.value !== book.shelf) && mutation.mutate(e.target.value)}
                className="form-control p-1">

                <option value="">Move book to...</option>
                <option value="wantToRead">Want to Read</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="read">Read</option>

              </select>
            </li>
            {book.categories && <li className="list-group-item d-flex justify-content-between"><b>Category: </b>{book.categories[0] || "N/A"}</li>}
            {book.pageCount && <li className="list-group-item d-flex justify-content-between"><b>Pages: </b>{book.pageCount || "N/A"}</li>}
            {book.publisher && <li className="list-group-item d-flex justify-content-between"><b>Publisher: </b>{book.publisher || "N/A"}</li>}
            {book.publishedDate && <li className="list-group-item d-flex justify-content-between"><b>Published date: </b>{new Date(book.publishedDate).toDateString() || "N/A"}</li>}
            {book.infoLink && <li className="list-group-item d-flex justify-content-between"><a href={book.infoLink}>More info</a></li>}
          </ul>

        </div>
        
      </div>
    </div>
  )
}