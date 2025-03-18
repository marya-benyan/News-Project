import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // تحقق من حالة المستخدم عند تحميل المكون
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/check", {
          withCredentials: true,
        });
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("فشل في التحقق من المصادقة:", error);
      }
    };

    checkAuth();
  }, []);

  // تسجيل الخروج
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("فشل في تسجيل الخروج:", error);
    }
  };

  return (
    <div className="relative">
      {/* خلفية متدرجة جميلة للنافبار مع خاصية sticky */}
      <nav className="bg-gradient-to-r from-[#28696A] via-[#213058] to-[#213058] text-white py-4 px-6 flex items-center justify-between shadow-lg fixed top-0 left-0 right-0 z-50">
        {/* الشعار + الاسم */}
        <div className="flex items-center space-x-3">
          <img
            src="src/image-logoo-removebg-preview.png"
            alt="شعار الموقع"
            className="w-48 h-16 object-contain"
          />
        </div>

        {/* قائمة سطح المكتب مع تأثيرات جميلة */}
        <ul className="hidden md:flex space-x-8 text-sm font-semibold">
          <li>
            <Link 
              className="hover:text-[#F4AE3F] transition-all duration-300 relative pb-1 after:content-[''] after:absolute after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:bg-[#F4AE3F] hover:after:w-full after:transition-all after:duration-300" 
              to="/"
            >
              الرئيسية
            </Link>
          </li>
          <li>
            <Link 
              className="hover:text-[#F4AE3F] transition-all duration-300 relative pb-1 after:content-[''] after:absolute after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:bg-[#F4AE3F] hover:after:w-full after:transition-all after:duration-300" 
              to="/about"
            >
              من نحن
            </Link>
          </li>
          <li>
            <Link 
              className="hover:text-[#F4AE3F] transition-all duration-300 relative pb-1 after:content-[''] after:absolute after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:bg-[#F4AE3F] hover:after:w-full after:transition-all after:duration-300" 
              to="/contact"
            >
              تواصل معنا
            </Link>
          </li>
          <li>
            <Link 
              className="hover:text-[#F4AE3F] transition-all duration-300 relative pb-1 after:content-[''] after:absolute after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:bg-[#F4AE3F] hover:after:w-full after:transition-all after:duration-300" 
              to="/bookmarks"
            >
              المشاهدة لاحقا
            </Link>
          </li>
          <li>
            <Link 
              className="hover:text-[#F4AE3F] transition-all duration-300 relative pb-1 after:content-[''] after:absolute after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:bg-[#F4AE3F] hover:after:w-full after:transition-all after:duration-300" 
              to="/categories"
            >
              التصنيفات
            </Link>
          </li>
          
          {user && user.role === "صحفي" && (
            <li>
              <Link 
                className="hover:text-[#F4AE3F] transition-all duration-300 relative pb-1 after:content-[''] after:absolute after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:bg-[#F4AE3F] hover:after:w-full after:transition-all after:duration-300" 
                to="/journalist"
              >
                لوحة الصحفي
              </Link>
            </li>
          )}
          {user && user.role === "admin" && (
            <li>
              <Link 
                className="hover:text-[#F4AE3F] transition-all duration-300 relative pb-1 after:content-[''] after:absolute after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:bg-[#F4AE3F] hover:after:w-full after:transition-all after:duration-300" 
                to="/admin"
              >
                لوحة الإدارة
              </Link>
            </li>
          )}
          <li>
            <Link 
              className="hover:text-[#F4AE3F] transition-all duration-300 relative pb-1 after:content-[''] after:absolute after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:bg-[#F4AE3F] hover:after:w-full after:transition-all after:duration-300" 
              to="/videos"
            >
              بودكاست
            </Link>
          </li>
        </ul>

        {/* العناصر في أقصى اليمين */}
        <div className="flex items-center space-x-3">
          {!user ? (
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/login"
                className="bg-[#F0E6D7] text-[#213058] px-4 py-2 rounded-lg hover:bg-[#F4AE3F] hover:text-white transition-all duration-300 shadow-md font-bold"
              >
                تسجيل دخول
              </Link>
              <Link
                to="/register"
                className="bg-[#28696A] text-white px-4 py-2 rounded-lg hover:bg-[#F4AE3F] hover:shadow-lg transition-all duration-300 shadow-md font-bold"
              >
                إنشاء حساب
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="hover:text-[#F4AE3F] transition-colors duration-300 flex items-center"
              >
                <div className="bg-[#F0E6D7] p-2 rounded-full text-[#213058]">
                  <FaUser className="text-xl" />
                </div>
              </Link>
              <Link
                to="/bookmarks"
                className="hover:text-[#F4AE3F] transition-colors duration-300 flex items-center"
              >
                <div className="bg-[#F0E6D7] p-2 rounded-full text-[#213058]">
                  <FaBookmark className="text-xl" />
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-[#F4AE3F] flex items-center space-x-2 cursor-pointer transition-colors duration-300"
              >
                <div className="bg-[#F0E6D7] p-2 rounded-full text-[#213058]">
                  <FaSignOutAlt className="text-xl" />
                </div>
                <span className="hidden md:block text-sm">تسجيل الخروج</span>
              </button>
            </div>
          )}

          {/* زر القائمة للجوال مع تصميم جديد */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none bg-[#F0E6D7] p-2 rounded-lg text-[#213058] hover:bg-[#F4AE3F] hover:text-white transition-all duration-300"
          >
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </nav>

      {/* قائمة الجوال مع تصميم جديد وانتقالات متحركة */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#213058] to-[#28696A] text-white p-6 space-y-4 shadow-lg fixed top-24 right-0 left-0 z-40 animate-fadeIn rounded-b-lg">
          <Link
            to="/"
            className="block text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all flex items-center justify-between"
            onClick={() => setIsOpen(false)}
          >
            <span>الرئيسية</span>
            <span className="text-[#F0E6D7] text-xl">›</span>
          </Link>
          <Link
            to="/about"
            className="block text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all flex items-center justify-between"
            onClick={() => setIsOpen(false)}
          >
            <span>من نحن</span>
            <span className="text-[#F0E6D7] text-xl">›</span>
          </Link>
          <Link
            to="/contact"
            className="block text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all flex items-center justify-between"
            onClick={() => setIsOpen(false)}
          >
            <span>تواصل معنا</span>
            <span className="text-[#F0E6D7] text-xl">›</span>
          </Link>
          <Link
            to="/payment"
            className="block text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all flex items-center justify-between"
            onClick={() => setIsOpen(false)}
          >
            <span>اشتراك</span>
            <span className="text-[#F0E6D7] text-xl">›</span>
          </Link>
          <Link
            to="/categories"
            className="block text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all flex items-center justify-between"
            onClick={() => setIsOpen(false)}
          >
            <span>التصنيفات</span>
            <span className="text-[#F0E6D7] text-xl">›</span>
          </Link>
          <Link
            to="/articles"
            className="block text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all flex items-center justify-between"
            onClick={() => setIsOpen(false)}
          >
            <span>المقالات</span>
            <span className="text-[#F0E6D7] text-xl">›</span>
          </Link>
          {user && user.role === "صحفي" && (
            <Link
              to="/journalist"
              className="block text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all flex items-center justify-between"
              onClick={() => setIsOpen(false)}
            >
              <span>لوحة الصحفي</span>
              <span className="text-[#F0E6D7] text-xl">›</span>
            </Link>
          )}
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all flex items-center justify-between"
              onClick={() => setIsOpen(false)}
            >
              <span>لوحة الإدارة</span>
              <span className="text-[#F0E6D7] text-xl">›</span>
            </Link>
          )}
          <Link
            to="/videos"
            className="block text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all flex items-center justify-between"
            onClick={() => setIsOpen(false)}
          >
            <span>الفيديوهات</span>
            <span className="text-[#F0E6D7] text-xl">›</span>
          </Link>

          <div className="h-px bg-gradient-to-r from-transparent via-[#F0E6D7] to-transparent my-3"></div>

          {!user ? (
            <div className="space-y-3 mt-4">
              <Link
                to="/login"
                className="block text-center text-sm bg-[#F0E6D7] text-[#213058] py-3 rounded-lg hover:bg-[#F4AE3F] hover:text-white transition-all font-bold"
              >
                تسجيل دخول
              </Link>
              <Link
                to="/register"
                className="block text-center text-sm bg-[#28696A] text-white py-3 rounded-lg hover:bg-[#F4AE3F] transition-all font-bold"
              >
                إنشاء حساب
              </Link>
            </div>
          ) : (
            <div className="space-y-3 mt-4">
              <Link
                to="/profile"
                className="block text-sm hover:bg-[#F4AE3F] p-3 rounded-lg transition-all flex items-center space-x-2 justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div className="bg-[#F0E6D7] p-1.5 rounded-full text-[#213058]">
                    <FaUser className="text-lg" />
                  </div>
                  <span>البروفايل</span>
                </div>
                <span className="text-[#F0E6D7] text-xl">›</span>
              </Link>
              <Link
                to="/bookmarks"
                className="block text-sm hover:bg-[#F4AE3F] p-3 rounded-lg transition-all flex items-center space-x-2 justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div className="bg-[#F0E6D7] p-1.5 rounded-full text-[#213058]">
                    <FaBookmark className="text-lg" />
                  </div>
                  <span>المفضلة</span>
                </div>
                <span className="text-[#F0E6D7] text-xl">›</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-sm text-right hover:bg-[#F4AE3F] p-3 rounded-lg transition-all flex items-center space-x-2 justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div className="bg-[#F0E6D7] p-1.5 rounded-full text-[#213058]">
                    <FaSignOutAlt className="text-lg" />
                  </div>
                  <span>تسجيل الخروج</span>
                </div>
                <span className="text-[#F0E6D7] text-xl">›</span>
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* مساحة فارغة لتعويض ارتفاع Navbar الثابت */}
      <div className="pt-24"></div>
    </div>
  );
};

export default Navbar;