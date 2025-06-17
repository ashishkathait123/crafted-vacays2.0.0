import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaStar, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const CommentSection = ({ slug }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [location, setLocation] = useState("");

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
  traveler_name: name,
  hometown: location,
  rating: rating,
  travel_story: text,
  slug: slug   
};

    try {
      const res = await axios.post(`${API_URL}/add-comment.php`, newComment, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        setComments([
    {
      traveler_name: name,
      hometown: location,
      rating,
      travel_story: text,
      created_at: new Date().toISOString(),
    },
          ...comments,
        ]);
        setName("");
        setText("");
        setRating(0);
        setLocation("");
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
    <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
        Traveler's Tales & Tips
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Share your experience with fellow explorers! Your insights help others discover hidden gems.
      </p>

      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
        {comments.length === 0 && !loading ? (
          <div className="text-center py-8">
            <FaMapMarkerAlt className="mx-auto text-3xl text-gray-400 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Be the first to share your adventure!</p>
          </div>
        ) : (
          comments.map((c, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-3">
                  <FaUser className="text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800 dark:text-gray-100">{c.traveler_name}</p>
                    {c.rating > 0 && (
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`text-sm ${i < c.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {c.hometown && (
  <div className="flex items-center text-xs text-blue-600 dark:text-blue-400 mb-1">
    <FaMapMarkerAlt className="mr-1" />
    <span>{c.hometown}</span>
  </div>
)}
                  
                 <p className="text-gray-600 dark:text-gray-300 mt-2">
  {c.travel_story}
</p>

                  
                {new Date(c.created_at).toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})}

                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 space-y-4">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
          Share Your Journey
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Traveler name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Where did you visit from?
            </label>
            <input
              type="text"
              placeholder="Your hometown or country"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-2xl cursor-pointer ${
                  star <= rating
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Travel Story
          </label>
          <textarea
            rows={4}
            placeholder="Tell us about your experience... What surprised you? Any hidden gems to share? Tips for future visitors?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center justify-center w-full md:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
        >
          <FaPaperPlane className="mr-2" />
          Share Your Adventure
        </button>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          Your insights help create better travel experiences for everyone!
        </p>
      </div>
    </div>
  );
};

export default CommentSection;