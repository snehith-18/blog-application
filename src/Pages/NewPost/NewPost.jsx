import React, { useState } from "react";

const NewPost = () => {
  const [postData, setPostData] = useState({
    UserId: parseInt(sessionStorage.getItem("UserId")), // ✅ use sessionStorage if you stored it there
    category: "",
    title: "",
    content: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if UserId exists
    if (!postData.UserId) {
      alert("User not logged in!");
      return;
    }

    fetch("http://localhost:3000/blog/newBlog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Post created:", data);

        // Reset form but keep UserId
        setPostData({
          UserId: parseInt(sessionStorage.getItem("UserId")),
          category: "",
          title: "",
          content: "",
        });
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="container my-5">
      <div className="card p-4 shadow w-100 mx-auto" style={{ maxWidth: "600px" }}>
        <h4 className="mb-4 text-center">Create a Post</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={postData.category}
              onChange={handleInput}
            >
              <option value="">Select category</option>
              <option value="General">General</option>
              <option value="Fitness">Fitness</option>
              <option value="Programming">Programming</option>
              <option value="Travel">Travel</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter title"
              value={postData.title}
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              name="content"
              className="form-control"
              rows="5"
              placeholder="Write your thoughts here..."
              value={postData.content}
              onChange={handleInput}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
