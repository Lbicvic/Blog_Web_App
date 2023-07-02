import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Comment = ({ _id, username, content, createdAt }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const deleteComment = (id) => {
    axios
      .delete(`/comments/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        navigate(location.pathname);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <>
      <li>
        <div className="post__comment">
          <div className="comment__wrapper">
            <div className="comment__content">
            {currentUser.username === username && <button onClick={() => deleteComment(_id)}>Delete</button>}
              <p>
                <span className="text-italic">{username}</span>
              </p>
              <p>{content}</p>
              <p>Posted On: {new Date(createdAt).toDateString()}</p>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Comment;
