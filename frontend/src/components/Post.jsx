import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

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
  return (
    <>
      {!is_postDetails && (
        <>
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
                  <p>Posted by: {username}</p>
                  <p>Created: {createdAt}</p>
                </div>
              </div>
            </div>
          </Link>
        </>
      )}
      {is_postDetails && (
        <>
          {currentUser.username === username && (
            <div className="post">
              <div className="post__wrapper is-details">
                <h3>{title}</h3>
                {image && (
                  <img
                    src={image}
                    alt="Post Image"
                    width={"auto"}
                    height={"300px"}
                  ></img>
                )}
                <p>{description}</p>
                <p>Posted by: {username}</p>
                <p>Created: {createdAt}</p>
                <p>Last Update: {updatedAt}</p>
              </div>
              <button>Update Post</button>
              <button>Delete Post</button>
            </div>
          )}
          {currentUser.username !== username && (
            <div className="post">
              <div className="post__wrapper is-details">
                <h3>{title}</h3>
                {image && (
                  <img
                    src={image}
                    alt="Post Image"
                    width={"auto"}
                    height={"300px"}
                  ></img>
                )}
                <p>{description}</p>
                <p>Posted by: {username}</p>
                <p>Created: {createdAt}</p>
                <p>Last Update: {updatedAt}</p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Post;
