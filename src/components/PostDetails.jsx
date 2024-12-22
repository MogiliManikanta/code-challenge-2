import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    const fetchPostDetails = async () => {
      const foundPost = posts.find((post) => post.id === parseInt(postId));

      if (foundPost) {
        setPost(foundPost);
      } else {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        setPost(response.data);
      }
    };

    fetchPostDetails();
  }, [postId, posts]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700">{post.body}</p>
      </div>
    </div>
  );
};

export default PostDetails;
