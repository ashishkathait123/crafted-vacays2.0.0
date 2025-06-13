import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentSection = ({ slug }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost/craft"; // Adjust if needed

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    axios
      .get(`${API_URL}/get-comments.php?slug=${slug}`)
      .then((res) => {
        if (res.data.success) {
          setComments(res.data.comments);
          setError("");
        } else {
          setError(res.data.message || "Failed to fetch comments.");
        }
      })
      .catch(() => setError("Network error while fetching comments."))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async () => {
    if (!name || !text) return;

    const newComment = {
      slug,
      name,
      comment: text,
    };

    try {
      const res = await axios.post(`${API_URL}/add-comments.php`, newComment, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        setComments([
          { name, comment: text, created_at: new Date().toISOString() },
          ...comments,
        ]);
        setName("");
        setText("");
        setError("");
      } else {
        setError(res.data.message || "Failed to submit comment.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Network error while submitting comment.");
    }
  };

  return (
    <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Comments</h3>

      {loading && <p className="text-sm text-gray-600 dark:text-gray-300">Loading comments...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="space-y-2">
        {comments.map((c, idx) => (
          <div key={idx} className="border-b pb-2">
            <p className="font-medium text-gray-800 dark:text-gray-100">{c.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{c.comment}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(c.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
        />

        <textarea
          rows={3}
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
        ></textarea>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
