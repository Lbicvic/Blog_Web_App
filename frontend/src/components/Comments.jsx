import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";

const Comments = ({postId}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `/comments/${postId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setIsLoading(false);
        setComments(response.data);
      })
      .catch((err) => {
        setIsLoading(true);
        console.log(err.response.data);
      });
  });

  return (
    <>
      {isLoading && <p className="text-center">Loading...</p>}
      {!isLoading && (
        <>
          <ul>
            {comments.map((comment) => {
              return <Comment {...comment} key={comment._id} />;
            })}
          </ul>
          {comments.length == 0 && (
            <p className="text-center">No available comments for this blog post</p>
          )}
        </>
      )}
    </>
  );
};

export default Comments;
