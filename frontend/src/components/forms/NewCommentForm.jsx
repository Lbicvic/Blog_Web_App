import React, { useContext, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const NewCommentForm = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const contentRef = useRef();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const comment = {
      username: currentUser.username,
      postId: postId,
      content: contentRef.current.value,
    };

    axios
      .post("/comments/", JSON.stringify(comment), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setError("");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data.error);
      });
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <div className="comment">
      <p className="text-italic">{currentUser.username}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="commentContent"
          placeholder="Enter Comment"
          ref={contentRef}
          onKeyDown={handleKeyDown}
          required
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default NewCommentForm;
