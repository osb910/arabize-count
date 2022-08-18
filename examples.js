const {arabizeCount} = require('./arabizeCount');

/**
 * sng = singular (مفرد)
 * pair = مثنى
 * plr = plural (جمع)
 * before = عبارة سابقة
 * after = عبارة لاحقة
 */

[5, 50, 100].forEach(num =>
  console.log(
    arabizeCount(num, {
      sng: 'مسلم',
      pair: 'مسلمان',
      plr: 'مسلمين',
      before: 'في الحي',
    })
  )
);

// في الحي ٥ مسلمين
// في الحي ٥٠ مسلمًا
// في الحي ١٠٠ مسلمٍ

[2, 5, 50, 100].forEach(num =>
  console.log(
    arabizeCount(num, {
      sng: 'أفعى',
      pair: 'أفعيين',
      plr: 'أفاعي',
      before: 'رأيت',
    })
  )
);

// رأيت أفعيين
// رأيت ٥ أفاعٍ
// رأيت ٥٠ أفعى
// رأيت ١٠٠ أفعى

[5, 1, 17, 100].forEach(num =>
  console.log(
    arabizeCount(num, {
      sng: 'قاضي',
      pair: 'قاضيان',
      plr: 'قضاة',
      before: 'في هذا البلد',
    })
  )
);

// في هذا البلد ٥ قضاةٍ
// في هذا البلد قاضٍ
// في هذا البلد ١٧ قاضيًا
// في هذا البلد ١٠٠ قاضٍ

/**
 * Varied = مصروف
 * Prohibited from variation = ممنوع من الصرف
 * isSngVaried = هل المفرد مصروف
 * isPlrVaried = هل الجمع مصروف
 */

[5, 25, 100].forEach(num =>
  console.log(
    arabizeCount(num, {
      sng: 'صحراء',
      pair: 'صحراوان',
      plr: 'صحاري',
      isSngVaried: false, // كلمة "صحراء" ممنوعة
      // (من الصرف (مختومة بألف التأنيث الممدودة
      before: 'عدَّ أهل الإحصاء',
      after: 'على الأرض.',
    })
  )
);

// عدَّ أهل الإحصاء ٥ صحارٍ على الأرض.
// عدَّ أهل الإحصاء ٢٥ صحراءَ على الأرض.
/* عدَّ أهل الإحصاء ١٠٠ صحراءَ على الأرض.
(تمييز مجرور وعلامة جره الفتحة) */

/**
 * Varied = مصروف
 * Prohibited from variation = ممنوع من الصرف
 * isSngVaried = هل المفرد مصروف
 * isPlrVaried = هل الجمع مصروف
 */

[5, 50, 100, 0].forEach(num =>
  console.log(
    arabizeCount(num, {
      sng: 'نتيجة',
      pair: 'نتيجتين',
      plr: 'نتائج',
      zero: 'لم نجد شيئًا',
      isPlrVaried: false, // كلمة "نتائج" ممنوعة
      // (من الصرف (صيغة منتهى الجموع
      before: 'وجدنا',
    })
  )
);

// تمييز مجرور وعلامة جره الفتحة // وجدنا ٥ نتائجَ
// وجدنا ٥٠ نتيجةً
// وجدنا ١٠٠ نتيجةٍ
// لم نجد شيئًا

[9, 70, 200, 2].forEach(num =>
  console.log(
    arabizeCount(num, {
      // يجب وضع الشدة على الياء
      // لكيلا تُحذف على أن الاسم منقوص
      sng: 'جنديّ',
      pair: 'جنديّان',
      plr: 'جنود',
      before: 'احتشد',
    })
  )
);

// احتشد ٩ جنودٍ
// احتشد ٧٠ جنديًّا
// احتشد ٢٠٠ جنديٍّ
// احتشد جنديّان
