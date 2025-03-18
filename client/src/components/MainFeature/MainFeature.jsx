// components/MainFeature.jsx
import React from 'react';

function MainFeature() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="relative">
        <img 
          src="pexels-kirandeepsingh-27105596.jpg" 
          alt="Main feature image" 
          className="w-full h-100 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h2 className="text-3xl font-bold text-white mb-2">«نسمات أيلول»... كوميديا اليوميات الرتيبة والوقت الضائع</h2>
          <p className="text-white">
            وسط ضجة تكرسة أعمال رمضانية وتألقها تخرج في ساحة الحال, يضيء «نسمات أيلول» أن يكون الضيف اللطيف الذي تستقبله المنازل وتشتهي زيارته القبيلة.
          </p>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center text-gray-500 text-sm">
        <span>منذ 35 دقيقة</span>
        <span>الجمعة 14/03 - 22:00</span>
      </div>
    </div>
  );
}

export default MainFeature;