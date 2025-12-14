/**
 * هذا الملف يحتوي على دوال API وهمية (Mock API Functions)
 * لمحاكاة التفاعل مع الخادم (الباك إند) في تطبيق React.
 */

// ----------------------------------------------------
// دوال وهمية لنظام CRUD (إنشاء، قراءة، تحديث، حذف)
// ----------------------------------------------------

/**
 * محاكاة طلب POST إلى الخادم.
 *
 * @param {string} route - مسار API (مثل /auth/login).
 * @param {object} data - البيانات المرسلة في جسم الطلب.
 * @returns {Promise<object>} - وعد (Promise) بإرجاع استجابة الخادم.
 */
export async function apiPost(route, data) {
  // ⬅️ منطق تسجيل الدخول الوهمي
  if (route === "/auth/login") {
    console.log(`Mock POST: Attempting login with data:`, data);
    
    // محاكاة تسجيل الدخول الناجح: حفظ التوكن (Token)
    localStorage.setItem("token", "demo-token-from-mock-api");
    
    // إرجاع استجابة النجاح
    return { 
        success: true, 
        message: "Login successful (Mock)",
        token: "demo-token-from-mock-api" // إرسال التوكن في الاستجابة
    };
  }

  // محاكاة إنشاء النفقات أو أي POST آخر
  if (route === "/expenses/add") {
    console.log(`Mock POST: Adding expense:`, data);
    return { success: true, id: Date.now() };
  }

  // الاستجابة الافتراضية لأي مسار POST غير مُعرّف
  return { success: false, error: "Route not mocked" };
}

/**
 * محاكاة طلب GET (جلب بيانات).
 * @returns {Promise<Array>} - وعد بإرجاع مصفوفة فارغة.
 */
export const apiGet = async (route) => {
    console.log(`Mock GET: Retrieving data from ${route}`);
    // يمكن هنا إرجاع بيانات وهمية (Mock Data) مختلفة حسب المسار (route)
    return [];
};

/**
 * محاكاة طلب PUT (تحديث بيانات).
 * @returns {Promise<object>} - وعد بإرجاع كائن استجابة فارغ.
 */
export const apiPut = async (route, data) => {
    console.log(`Mock PUT: Updating data at ${route} with:`, data);
    return { success: true, message: "Update successful (Mock)" };
};

/**
 * محاكاة طلب DELETE (حذف بيانات).
 * @returns {Promise<object>} - وعد بإرجاع كائن استجابة فارغ.
 */
export const apiDelete = async (route) => {
    console.log(`Mock DELETE: Deleting data at ${route}`);
    return { success: true, message: "Deletion successful (Mock)" };
};