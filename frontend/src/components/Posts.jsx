import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

const Posts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "/posts/",
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setIsLoading(false);
        setPosts(response.data);
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
            {posts.map((post) => {
              return <Post {...post} key={post._id} />;
            })}
          </ul>
          {posts.length == 0 && (
            <p className="text-center">No posts available</p>
          )}
        </>
      )}
    </>
  );
};

export default Posts;
