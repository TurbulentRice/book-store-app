import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import imgErrorIcon from '../images/img_unavailable.png';
import API from '../api.js';

export default function Search() {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let history = useHistory()
  const { token } = useContext(UserContext)

  // const { isLoading, error, data, refetch } = useQuery('search', () => searchString && API.search(searchString, token))
  // if (isLoading) return "Loading..."
  // if (error) return "An error occurred while fetching data."
  useEffect(() => {
    errorMessage && setErrorMessage("")
    searchString && setIsLoading(true)
    searchString
      ? API.search(searchString, token).then(results => {
        results.message && setErrorMessage(results.message)
        results.books && setSearchResults(results.books) 
        setIsLoading(false)
      })
      : setSearchResults([])
    
  }, [searchString])

  const handleOpenBook = (bookID) => {
    history.push(`book/${bookID}`)
  }

  return (
    <div className="container m-4">

      {/* Search bar */}
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text border-0">
            <i className="fas fa-search"></i>
          </span>
        </div>

        <input
          type="search"
          value={searchString}
          onChange={e => setSearchString(e.target.value.trimStart())}
          autoFocus={true}
          className="form-control"
          placeholder="Search"/>
      </div>

      {/* Search results */}

      {errorMessage && <div>{errorMessage}</div>}
      {isLoading && <div>Loading...</div>}

      {searchResults && searchResults.map((book, index) => {
        return (
          <div className="row my-4" key={book.id+index}>

            <div className="col-2">
              <img
              src={book.imageLinks ? book.imageLinks.thumbnail || book.imageLinks.smallThumbnail || imgErrorIcon : imgErrorIcon}
              alt={book.title || "N/A"}
              className=""/>
            </div>

            <div className="col">
              {book.title ? <button className="btn btn-link text-left p-0 m-0" onClick={() => handleOpenBook(book.id)}><h5>{book.title}</h5></button> : <h5>{'N/A'}</h5>}
              <p>
                {'by '}
                {book.authors && book.authors.map((author, index) => index === book.authors.length - 1 
                    ? author
                    : `${author}, `)}
              </p>
              <p>
                {book.publishedDate && new Date(book.publishedDate).getFullYear()}
              </p>
            </div>

          </div>
        )
      })
      }


    </div>
  )
}