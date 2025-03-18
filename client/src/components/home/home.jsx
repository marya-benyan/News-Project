import React from "react";

import HeroSection from "../HeroSection/HeroSection";
import NewsCard from "../NewsCard/NewsCard";
import NewsSubscriptionBanner from "../NewsSubscriptionBanner/NewsSubscriptionBanner";
import GamesSection from "../GamesSection/GamesSection";
import BreakingNews from "../BreakingNews/BreakingNews";
import ArabicNewsLayout from "../ArabicNewsLayout/ArabicNewsLayout";
import NewsSection from "../NewsSection/NewsSection";
import NewsTicker from "../NewsTicker/NewsTicker";
import NewsDashboard from "../NewsDashboard/NewsDashboard";
import StatisticsSection from '../StatisticsSection/StatisticsSection';
import Categories from "../catageroies/catageries"
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Home = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       setError(null); // امسح أي خطأ قديم
//       console.log('Fetching categories from:', 'http://localhost:8000/api/categories');
      
//       const response = await axios.get('http://localhost:8000/api/categories');
//       console.log('API Response (Categories):', JSON.stringify(response.data, null, 2));

//       if (response.data && Array.isArray(response.data.data)) {
//         setCategories(response.data.data);
//       } else {
//         console.log('Unexpected response structure:', response.data);
//         setCategories([]);
//       }
//     } catch (err) {
//       console.error('Error fetching categories:', err.message, err.response?.data || 'No response data');
//       setError('فشل في تحميل الفئات. حاول مرة أخرى لاحقًا.');
//       setCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-10">جاري التحميل...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-10 text-red-600">{error}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-beige p-6">
//       <div className="container mx-auto">
//         <h1 className="text-4xl font-bold text-blue-gray mb-6 text-center">الفئات</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {categories.length > 0 ? (
//             categories.map((category) => (
//               <Link to={`/articles/${category._id}`} key={category._id}>
//                 <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
//                   <h2 className="text-2xl font-semibold text-blue-gray mb-2">{category.name}</h2>
//                   <p className="text-gray-600">{category.description}</p>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p className="text-center text-gray-600">لا توجد فئات متاحة</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React from "react";

// import HeroSection from "../HeroSection/HeroSection";
// import NewsCard from "../NewsCard/NewsCard";
// import NewsSubscriptionBanner from "../NewsSubscriptionBanner/NewsSubscriptionBanner";
// import GamesSection from "../GamesSection/GamesSection";
// import BreakingNews from "../BreakingNews/BreakingNews";
// import SudokuGame from "../ArabicNewsLayout/ArabicNewsLayout";
// import Catageries from "../catageroies/catageries"
// import NewsTicker from "../NewsTicker/NewsTicker";
// import NewsDashboard from "../NewsDashboard/NewsDashboard";

function Home() {
  return (
    <>
      <HeroSection />
      <NewsTicker />
      <div className="container mx-auto px-4 space-y-6">
      <NewsDashboard />
      <Categories />
      <StatisticsSection />

      {/* <ArabicNewsLayout /> */}
      <ArabicNewsLayout />
      {/* <NewsCard /> */}
      <NewsSubscriptionBanner />
      <GamesSection />
    </div>
    </>

  );
}

  
  

export default Home;