import React from "react";

const Comment = ({ _id, username, content, createdAt }) => {
  return (
    <>
      <li>
        <div className="post__comment">
          <div className="comment__wrapper">
            <div className="comment__content">
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
