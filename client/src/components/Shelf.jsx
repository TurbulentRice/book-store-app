import BookCard from './BookCard';

export default function Shelf ({ title, shelfKey, books }) {
  return (
    <div className="border rounded mt-4">

      <h4 className="ml-4 mt-2 mb-0">
        {title}
      </h4>

      <div className="row my-2 mx-2 p-2">

        {books.map(book => <BookCard book={book} shelfKey={shelfKey} key={book.id}/>)}

      </div>
    </div>
  )
}