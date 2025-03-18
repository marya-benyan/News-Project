import React from 'react';

const StatisticsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* إحصائية 1 - المقالات */}
          <div className="relative overflow-hidden bg-white border border-[#28696A] rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-28 h-28 bg-[#28696A] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#28696A]/10 text-[#28696A] group-hover:bg-[#28696A] group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="relative">
                <h3 className="text-5xl font-bold text-[#213058] mb-3 group-hover:scale-110 transition-transform duration-300">1,254</h3>
                <div className="h-0.5 w-12 bg-[#F4AE3F] mx-auto mb-3"></div>
                <p className="text-[#28696A] font-medium text-lg">مقال منشور</p>
              </div>
            </div>
          </div>

          {/* إحصائية 2 - الثقافات */}
          <div className="relative overflow-hidden bg-white border border-[#28696A] rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-28 h-28 bg-[#28696A] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#28696A]/10 text-[#28696A] group-hover:bg-[#28696A] group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="relative">
                <h3 className="text-5xl font-bold text-[#213058] mb-3 group-hover:scale-110 transition-transform duration-300">75</h3>
                <div className="h-0.5 w-12 bg-[#F4AE3F] mx-auto mb-3"></div>
                <p className="text-[#28696A] font-medium text-lg">ثقافة حول العالم</p>
              </div>
            </div>
          </div>

          {/* إحصائية 3 - الوثائقيات */}
          <div className="relative overflow-hidden bg-white border border-[#28696A] rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-28 h-28 bg-[#28696A] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#28696A]/10 text-[#28696A] group-hover:bg-[#28696A] group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="relative">
                <h3 className="text-5xl font-bold text-[#213058] mb-3 group-hover:scale-110 transition-transform duration-300">483</h3>
                <div className="h-0.5 w-12 bg-[#F4AE3F] mx-auto mb-3"></div>
                <p className="text-[#28696A] font-medium text-lg">وثائقي مميز</p>
              </div>
            </div>
          </div>

          {/* إحصائية 4 - المتابعين */}
          <div className="relative overflow-hidden bg-white border border-[#28696A] rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-28 h-28 bg-[#28696A] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#28696A]/10 text-[#28696A] group-hover:bg-[#28696A] group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="relative">
                <h3 className="text-5xl font-bold text-[#213058] mb-3 group-hover:scale-110 transition-transform duration-300">1280</h3>
                <div className="h-0.5 w-12 bg-[#F4AE3F] mx-auto mb-3"></div>
                <p className="text-[#28696A] font-medium text-lg">متابع شهرياً</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;