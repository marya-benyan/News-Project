import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userComments, setUserComments] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);

  // Tabs for profile content
  const tabs = [
    { id: 0, label: "Saved Articles", icon: "📑" },
    { id: 1, label: "Recent Activity", icon: "🕒" },
    { id: 2, label: "Statements", icon: "💬" },
  ];

  // Fetch user profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // After user loads, fetch user comments and saved articles
  useEffect(() => {
    if (user) {
      fetchUserComments();
      fetchSavedArticles();
      setLoading(false);
    }
  }, [user]);

  // Fetch user profile using token
  // Fetch user profile using token
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ No token found in localStorage");
        return;
      }
      const decodedToken = jwtDecode(token);
      if (!decodedToken.userId) {
        console.error("❌ No user ID found in token");
        return;
      }

      const response = await axios.get(
        "http://localhost:8000/api/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user);

      // Fetch user comments and saved articles after user profile is loaded
      fetchUserComments();
      fetchSavedArticles();
    } catch (error) {
      console.error(
        "❌ Error fetching profile:",
        error.response?.data || error.message
      );
    }
  };

  // Fetch user comments (Statements) from the server
  const fetchUserComments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("❌ No token found");

      const response = await axios.get(
        "http://localhost:8000/api/articles/user-comments",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserComments(response.data.comments);
    } catch (error) {
      console.error(
        "❌ Error fetching comments:",
        error.response?.data || error.message
      );
    }
  };

  const handleRemoveSavedArticle = async (articleId) => {
    console.log(articleId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8000/api/saved/article/remove-saved-article/${articleId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error(
        "❌ Error removing saved article:",
        error.response?.data || error.message
      );
    }
  };

  // Fetch saved articles
  // Fetch bookmarked articles
  const fetchSavedArticles = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("❌ No token found");

      const response = await axios.get(
        "http://localhost:8000/api/articles/bookmarked", // Endpoint to fetch bookmarked articles
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSavedArticles(response.data.savedArticles);
    } catch (error) {
      console.error(
        "❌ Error fetching saved articles:",
        error.response?.data || error.message
      );
    }
  };

  // Edit user handlers
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:8000/api/users/${user._id}`,
        editedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser({ ...user, ...editedUser });
      setIsEditing(false);
    } catch (error) {
      console.error(
        "❌ Error updating profile:",
        error.response?.data || error.message
      );
    }
  };

  // Format date
  const dateFormatter = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Delete comment handler
  const handleDeleteComment = (commentId) => {
    console.log("Delete comment", commentId);
    // Implement delete functionality here
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-xl font-bold text-[#61090b] animate-pulse">
          Loading Profile Data...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-xl font-bold text-[#61090b]">
          User not found or login required
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#61090b] uppercase">
          CrimeGazette
        </h1>
        <h2 className="text-xl text-gray-700 mt-1">
          Case File: {user.username.toUpperCase()}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-4">
          <div className="bg-white rounded-lg shadow-lg border border-[#61090b] overflow-hidden">
            <div className="p-6 flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#61090b] text-white flex items-center justify-center text-3xl font-bold border-4 border-[#61090b] shadow-xl">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    user.username.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="absolute bottom-0 right-0 text-[#61090b] text-xl">
                  👤
                </span>
              </div>

              <h3 className="text-xl font-bold mt-4 text-black">
                {user.username}
              </h3>
              <p className="text-[#61090b] uppercase text-sm tracking-wider">
                {user.role || "Criminal Enthusiast"}
              </p>
            </div>

            <div className="px-6 pb-6">
              <div className="border-t border-[#61090b] my-3"></div>
              <div className="mb-4">
                <p className="text-black mb-2">
                  <strong>CASE ID:</strong> #{user._id?.slice(-6) || "unknown"}
                </p>
                <p className="text-black mb-2">
                  <strong>CONTACT:</strong> {user.email}
                </p>
                <p className="text-black">
                  <strong>STATUS:</strong> Active
                </p>
              </div>

              <button
                onClick={handleEdit}
                className="w-full bg-[#61090b] text-white py-2 px-4 flex items-center justify-center uppercase font-bold tracking-wider hover:bg-[#8b0d11] transition-colors border-l-4 border-[#400608] mt-4"
              >
                <span className="mr-2">✏️</span> Edit Case File
              </button>
            </div>
          </div>
        </div>

        {/* Tabs & Content */}
        <div className="md:col-span-8">
          <div className="bg-white rounded-lg shadow-lg border border-[#61090b] overflow-hidden">
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-[#61090b]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTabValue(tab.id)}
                  className={`px-4 py-3 font-medium uppercase tracking-wider flex-1 transition-colors flex items-center justify-center ${
                    tabValue === tab.id
                      ? "border-b-3 border-[#61090b] text-black font-bold"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 bg-white">
              {tabValue === 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-4 pb-2 border-b-2 border-[#61090b] text-black">
                    SAVED ARTICLES
                  </h3>
                  {loading ? (
                    <div className="text-center text-gray-500">
                      Loading saved articles...
                    </div>
                  ) : savedArticles.length > 0 ? (
                    <div className="space-y-4">
                      {savedArticles.map((article) => (
                        <div
                          key={article._id}
                          className="border-b border-gray-200 pb-3 pl-3 relative hover:bg-gray-50 transition-colors"
                        >
                          <div className="border-l-2 border-[#61090b] pl-3">
                            <h4 className="font-bold text-black">
                              {article.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Published on {dateFormatter(article.publishDate)}
                            </p>
                          </div>
                          {/* زر الحذف */}
                          <button
                            onClick={() =>
                              handleRemoveSavedArticle(article._id)
                            }
                            className="absolute top-3 right-3 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-300"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-gray-500">
                      No saved articles.
                    </div>
                  )}
                </div>
              )}

              {tabValue === 1 && (
                <div>
                  <h3 className="text-lg font-bold mb-4 pb-2 border-b-2 border-[#61090b] text-black">
                    RECENT ACTIVITY
                  </h3>
                  <div className="py-6 text-center text-gray-500">
                    No recent activity to display.
                  </div>
                </div>
              )}

              {tabValue === 2 && (
                <div>
                  <h3 className="text-lg font-bold mb-4 pb-2 border-b-2 border-[#61090b] text-black">
                    STATEMENTS
                  </h3>
                  {loading ? (
                    <div className="text-center text-gray-500">
                      Loading statements...
                    </div>
                  ) : userComments.length > 0 ? (
                    <div className="space-y-4">
                      {userComments.map((comment) => (
                        <div
                          key={comment._id}
                          className="border-b border-gray-200 pb-3 pl-3 relative hover:bg-gray-50 transition-colors"
                        >
                          <div className="border-l-2 border-[#61090b] pl-3 pr-8">
                            <p className="font-bold text-black">
                              {comment.text}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              Posted on {dateFormatter(comment.createdAt)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="absolute right-2 top-2 text-red-600 hover:text-red-800"
                            title="Delete statement"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-gray-500">
                      No statements recorded.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={editedUser.username || user.username}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, username: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editedUser.email || user.email}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 hover:text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#61090b] text-white rounded hover:bg-[#8b0d11]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
