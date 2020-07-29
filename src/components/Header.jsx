import React from "react";

export default function Header(props) {
  return (
    <div className="border-bottom border-dark py-2">
      <img
        className="btn btn-outline-success rounded-circle border-0 p-1"
        style={{ position: "absolute" }}
        onClick={() => {
          props.setAddNewNote(true);
          props.setSelectedNote({ text: "" });
        }}
        alt="add a note"
        src="https://img.icons8.com/material-sharp/24/000000/plus-math.png"
      />
      <div className="w-100 text-center py-1">My Awesome Notepad</div>
    </div>
  );
}
