import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (description.length > 1000) {
      setError("Description cannot exceed 1000 characters");
      return;
    }

    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title,
        body: description,
      });

      setSuccessMessage("Post created successfully!");
      setTitle("");
      setDescription("");
      setError("");

      setTimeout(() => {
        navigate(-1); // Navigate back
      }, 500);
    } catch (err) {
      console.error(err);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg max-w-md w-full"
      >
        <h1 className="text-2xl font-bold text-center mb-4 sm:text-3xl">
          Create a New Post
        </h1>

        {/* Display Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Display Success Message */}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}

        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="5"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
