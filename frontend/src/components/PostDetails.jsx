import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import NewCommentForm from "./forms/NewCommentForm";
import Comments from "./Comments";

const PostDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
      .get(`/posts/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setIsLoading(false);
        setPost(response.data);
      })
      .catch((err) => {
        setIsLoading(true);
        console.log(err.response.data);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      {isLoading && <p className="text-center">Loading...</p>}
      {!isLoading && (
        <>
          <Post {...post} key={post._id} is_postDetails={true} />
          <NewCommentForm postId={post._id} />
          <Comments postId={post._id} />
        </>
      )}
    </>
  );
};

export default PostDetails;
