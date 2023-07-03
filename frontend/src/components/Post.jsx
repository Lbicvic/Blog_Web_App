import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Post = ({
  _id,
  title,
  description,
  image,
  username,
  createdAt,
  updatedAt,
  is_postDetails,
}) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const updatePost = (id) => {
    navigate("/updatePost", { state: id });
  };

  const deletePost = (id) => {
    axios
      .delete(`/posts/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        navigate("/homepage");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      {!is_postDetails && (
        <>
          <li>
            <Link to={`/postDetails/${_id}`}>
              <div className="post">
                <div className="post__wrapper">
                  {image && (
                    <img
                      src={image}
                      alt="Post Image"
                      width={"auto"}
                      height={"300px"}
                    ></img>
                  )}
                  <div className="post__content">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <p>
                      Posted by: <span className="text-italic">{username}</span>
                    </p>
                    <p className="text-date">Created On: {new Date(createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        </>
      )}
      {is_postDetails && (
        <>
          {currentUser.username === username && (
            <div className="post is-details">
              <div className="post__wrapper is-details">
                {image && (
                  <img
                    src={image}
                    alt="Post Image"
                    width={"auto"}
                    height={"300px"}
                  ></img>
                )}
                <div className="post__content">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <p>
                    Posted by: <span className="text-italic">{username}</span>
                  </p>
                  {createdAt !== updatedAt && (
                    <>
                      <p className="text-date">Created On: {new Date(createdAt).toLocaleString()}</p>
                      <p className="text-date">Last Update: {new Date(updatedAt).toLocaleString()}</p>
                    </>
                  )}
                  {createdAt === updatedAt && (
                    <>
                      <p className="text-date">Created On: {new Date(createdAt).toLocaleString()}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="post__buttons">
                <button onClick={() => updatePost(_id)}>Update</button>
                <button onClick={() => deletePost(_id)}>Delete</button>
              </div>
            </div>
          )}
          {currentUser.username !== username && (
            <div className="post is-details">
              <div className="post__wrapper is-details">
                {image && (
                  <img
                    src={image}
                    alt="Post Image"
                    width={"auto"}
                    height={"300px"}
                  ></img>
                )}
                <div className="post__content">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <p>
                    Posted by: <span className="text-italic">{username}</span>
                  </p>
                  {createdAt !== updatedAt && (
                    <>
                      <p className="text-date">Created On: {new Date(createdAt).toLocaleString()}</p>
                      <p className="text-date">Last Update: {new Date(updatedAt).toLocaleString()}</p>
                    </>
                  )}
                  {createdAt === updatedAt && (
                    <>
                      <p className="text-date">Created On: {new Date(createdAt).toLocaleString()}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Post;
