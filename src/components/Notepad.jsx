import React from "react";

export default function Notepad(props) {
  return (
    <form>
      <div className="form-group">
        <textarea
          placeholder="Type your note here..."
          className="form-control border-0"
          style={{ height: "300px" }}
          value={props.selectedNote.text}
          onChange={(e) => {
            props.setSelectedNote({
              ...props.selectedNote,
              text: e.target.value,
            });
          }}
        />
      </div>
    </form>
  );
}
