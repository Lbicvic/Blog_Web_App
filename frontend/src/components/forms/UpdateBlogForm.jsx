import React, { useEffect } from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const UpdateBlogForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [post, setPost] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    axios
      .get(`posts/${state}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setIsLoading(false);
        setPost(response.data);
        setPrevLocation(`/postDetails/${state}`);
      })
      .catch((err) => {
        setIsLoading(true);
        console.log(err.response.data);
      });
  }, [state]);

  async function handleSubmit(e) {
    e.preventDefault();

    const updatePostData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    };

    axios
      .patch(`posts/${state}`, JSON.stringify(updatePostData), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setError("");
        navigate(prevLocation);
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data.error);
      });
  }

  return (
    <>
      <Navbar />
      {isLoading && <p className="text-center">Loading...</p>}
      {!isLoading && (
        <section className="update">
          <div className="update__wrapper">
            <h2> Update Service</h2>
            <form onSubmit={handleSubmit} className="form__wrapper">
              <input
                type="text"
                name="title"
                placeholder="Title"
                ref={titleRef}
                defaultValue={post.title}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                ref={descriptionRef}
                defaultValue={post.description}
                required
              />
              <button type="submit">Update</button>
              {error && <div className="error"> {error} </div>}
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default UpdateBlogForm;
