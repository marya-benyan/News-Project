import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrendingSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const API_BASE_URL = 'http://localhost:8000/admin';

  const fetchTrendingArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/articles`,{withCredentials: true} ,{
        params: {
          page: 1,
          limit: 10, 
          search: '', 
        },
      });

      const { articles: fetchedArticles } = response.data;

      
      const formattedArticles = fetchedArticles.map(article => ({
        ...article,
        id: article._id,
        title: article.title,
        views: article.views || 0, 
        comments: article.likes ? article.likes.length : 0, 
        featured: article.featured || false, 
      }));

     
      const trendingArticles = formattedArticles.sort((a, b) => b.views - a.views);
      setArticles(trendingArticles);
    } catch (err) {
      setError('فشل في جلب المقالات الرائجة. يرجى المحاولة لاحقًا.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingArticles();
  }, []); 

  const handleFeatureToggle = (articleId) => {
    setArticles(prevArticles =>
      prevArticles.map(article =>
        article.id === articleId ? { ...article, featured: !article.featured } : article
      )
    );
  };


  if (loading) {
    return <div className="text-center p-6">جارٍ التحميل...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">إدارة المحتوى الرائج</h3>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
            وضع مميز للمختار
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-right">
              <th className="p-3 text-sm font-semibold">عنوان المقال</th>
              <th className="p-3 text-sm font-semibold">المشاهدات</th>
              <th className="p-3 text-sm font-semibold">التعليقات</th>
              <th className="p-3 text-sm font-semibold">مميز</th>
              <th className="p-3 text-sm font-semibold">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  لا توجد مقالات متاحة حاليًا
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="border-b">
                  <td className="p-3">{article.title}</td>
                  <td className="p-3">{article.views.toLocaleString()}</td>
                  <td className="p-3">{article.comments}</td>
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={article.featured}
                      onChange={() => handleFeatureToggle(article.id)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        عرض
                      </button>
                      {article.featured ? (
                        <button
                          onClick={() => handleFeatureToggle(article.id)}
                          className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs"
                        >
                          إلغاء التمييز
                        </button>
                      ) : (
                        <button
                          onClick={() => handleFeatureToggle(article.id)}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                        >
                          تمييز
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6"></div>
    </div>
  );
};

export default TrendingSection;