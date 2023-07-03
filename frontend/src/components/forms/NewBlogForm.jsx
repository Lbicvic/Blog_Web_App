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

  const convertFileToBase64 = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
    reader.onerror = (error) => console.log(error);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const post = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      image: image,
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
            <label htmlFor="postImage">Choose Picture:</label>
            <input
              type="file"
              name="postImage"
              accept="image/*"
              onChange={(e) => {
                convertFileToBase64(e.target.files[0]);
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
