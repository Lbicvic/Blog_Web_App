import React, { useContext } from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import postPic from "../../assets/default-post-image.png";

const NewBlogForm = () => {
  const { currentUser } = useContext(AuthContext);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [image, setImage] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const post = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      image: postPic,
      username: currentUser.username,
    };

    axios
      .post("/posts/", JSON.stringify(post), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setError("");
        navigate("/homepage");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data.error);
      });
  }

  return (
    <section className="new-post">
      {currentUser && (
        <div className="new-post__wrapper">
          <h2>Post New Blog</h2>
          {error && <div className="error"> {error} </div>}
          <form onSubmit={handleSubmit} className="form__wrapper">
            <input
              type="text"
              name="title"
              placeholder="Title"
              ref={titleRef}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              ref={descriptionRef}
              required
            />
            <label htmlFor="picture">Choose Picture:</label>
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={(e) => {
                setImage(URL.createObjectURL(e.target.files[0]));
              }}
              required
            />
            <img src={image} alt="Blog Image Preview" />
            <button type="submit">Post Blog</button>
          </form>
        </div>
      )}
    </section>
  );
};

export default NewBlogForm;
