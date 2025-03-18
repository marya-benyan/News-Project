import React from 'react';
import JournalistCard from './JournalistCard';

const JournalistsSection = ({ journalists }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">إدارة الصحفيين</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
          إضافة صحفي جديد
        </button>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-2">الطلبات المعلقة</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-3 text-sm font-semibold">الاسم</th>
                <th className="p-3 text-sm font-semibold">البريد الإلكتروني</th>
                <th className="p-3 text-sm font-semibold">التخصص</th>
                <th className="p-3 text-sm font-semibold">تاريخ الطلب</th>
                <th className="p-3 text-sm font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {journalists.map((journalist) => (
                <tr key={journalist.id} className="border-b">
                  <td className="p-3">{journalist.name}</td>
                  <td className="p-3">{journalist.email}</td>
                  <td className="p-3">{journalist.specialty}</td>
                  <td className="p-3">{journalist.application}</td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        موافقة
                      </button>
                      <button className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                        رفض
                      </button>
                      <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        عرض التفاصيل
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     

</div>
  );
};

export default JournalistsSection;