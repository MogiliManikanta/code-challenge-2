import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, setCurrentPage } from "../redux/postSlice";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading, error, currentPage, limit } = useSelector(
    (state) => state.post
  );

  const startIndex = (currentPage - 1) * limit;
  const currentPosts = posts.slice(startIndex, startIndex + limit);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts]);

  const handleNext = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
        Posts
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
          <button
            onClick={() => navigate("/create")}
            className="block mx-auto mb-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:mx-0 sm:block sm:w-auto"
          >
            Add New Post
          </button>

          <ul className="space-y-6">
            {currentPosts.map((post) => (
              <li
                key={post.id}
                className="border bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition-all duration-300"
              >
                <h3
                  className="text-xl font-semibold cursor-pointer mb-2 text-indigo-600 hover:text-indigo-700"
                  onClick={() => navigate(`/posts/${post.id}`)}
                >
                  {post.title}
                </h3>
                <p className="text-gray-600">{post.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-center sm:justify-between space-x-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              Previous
            </button>
            <button
              disabled={currentPage === 10}
              onClick={handleNext}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
