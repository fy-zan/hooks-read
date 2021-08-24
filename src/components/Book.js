import React, {useEffect, useState} from "react";

const Book = (props) =>  {
  const [status, setStatus] = useState(props.status)
  const handleSelectChange = (e) => {
    //console.log("This was status", status)
    setStatus(e.target.value);
    //props.onBookShelfUpdate({props, state: {status}});
  };
  //USE USEEFFECT AND CALL IT WHEN STATE IS CHANGED. CALL THE ON BOOK SHELF UPDATE INSIDE IT!! 
  useEffect(() => {
    props.onBookShelfUpdate({props, state: {status}});
  }, [status])
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 192,
            backgroundImage: props.link
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={status}
            onChange={(e) => {
              handleSelectChange(e)}}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-authors">{props.author}</div>
    </div>
  );
}

export default Book;
