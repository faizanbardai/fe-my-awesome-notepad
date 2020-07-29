import React from "react";

export default function Header(props) {
  return (
    <div className="d-flex border-bottom border-dark py-2">
      <div className="flex-shrink-1">
        <img
          className="btn btn-outline-success rounded-circle border-0 p-1"
          onClick={() => {
            props.setAddNewNote(true);
            props.setSelectedNote({ text: "" });
          }}
          alt="add a note"
          src="https://img.icons8.com/material-sharp/24/000000/plus-math.png"
        />
      </div>
      <div className="w-100 text-center py-1">My Awesome Notepad</div>
    </div>
  );
}
