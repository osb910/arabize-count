/**
 * STATIC VARIABLES AND HELPER FUNCTIONS
 */

// الحركات والتشكيل
const diacs = {
  f: '\u064E', // فتح
  d: '\u064F', // ضم
  k: '\u0650', // كسر
  s: '\u0652', // سكون
  fn: '\u064B', // تنوين فتح
  dn: '\u064C', // تنوين ضم
  kn: '\u064D', // تنوين كسر
  sh: '\u0651', // شدة
};

const removeParsingSign = w => w.replace(/[\u064B-\u0650]$/, ''); // حذف علامة الإعراب
const trimEndingYeh = w => w.replace(/\u064A$/g, diacs.kn); // حذف ياء الاسم المنقوص
const nominativeToAccusativePlr = w =>
  w.replace(/\u0648\u0646$/, '\u064A\u0646'); // نصب جمع المذكر السالم (أو جره)
const sign = (w, sign) =>
  w.replace(/([ء-ي\u0651])[\u064B-\u0650]?$/, `$1${sign}`); // وضع علامة الإعراب

/**
 * MAIN FUNCTION
 */
const arabizeCount = (
  num,
  {
    sng = 'مرة', // صيغة المفرد
    pair = 'مرتين', // صيغة المثنى
    plr = 'مرات', // صيغة الجمع
    zero = 'صفر', // صيغة الناتج إن كان العدد صفرًا
    isSngVaried = true, // هل المفرد مصروف
    isPlrVaried = true, // هل الجمع مصروف
    parsing = null, // حالة الإعراب
    keepSign = true, // وضع علامة الإعراب
    decimal = 0, // عدد الكسور المطلوبة
    before = '', // عبارة سابقة
    after = '', // عبارة لاحقة
    dir = 'rtl', // اتجاه قراءة العدد (أثره غير ملحوظ حتى الآن إلا قليلًا)
    // sngType = 'm', // for written numerals (TODO) // المعدود مذكر أم مؤنث
  } = {}
) => {
  // Numeral formatting | ضبط العدد

  let int = Math.floor(num);

  if (dir === 'ltr') {
    const match = `${int}`.match(/\d{1,2}$/);
    const idx = match.index;
    int = +match[0];
    int = int >= 0 && int <= 2 && idx ? 100 + int : int;
  }

  // استعمال الأرقام المشرقية وضبط الكسور
  const formattedNum = num.toLocaleString(
    'ar-EG',
    decimal && {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    }
  );

  // Distinctive formatting | ضبط التمييز

  // إزالة الإعراب إن وُجد
  sng = removeParsingSign(sng);
  plr = removeParsingSign(plr);

  const sngDistinctive = trimEndingYeh(sng); // تمييز مفرد
  const plrDistinctive = nominativeToAccusativePlr(trimEndingYeh(plr)); // تمييز جمع

  // علامة النصب
  const accusativeSign = /[\u0627\u0649]$/.test(sng)
    ? ''
    : isSngVaried
    ? diacs.fn // تنوين نصب
    : diacs.f; // فتحة للممنوع من الصرف

  // ألف تنوين النصب
  const nunationAlif =
    /[\u0627\u0629\u0649]$/.test(sng) || !isSngVaried ? '' : '\u0627';

  // علامة جر المفرد
  const sngGenitiveSign = /[\u0627\u0649]$/.test(sng)
    ? ''
    : isSngVaried
    ? diacs.kn // تنوين جر
    : diacs.f; // فتحة للممنوع من الصرف

  // علامة جر الجمع
  const plrGenitiveSign = /([\u0627\u0649]|\u064A\u0646)$/.test(plrDistinctive)
    ? ''
    : isPlrVaried
    ? diacs.kn // تنوين جر
    : diacs.f; // فتحة للممنوع من الصرف

  const plrGenitiveDistinctive = sign(
    plrDistinctive,
    keepSign ? plrGenitiveSign : ''
  ); // تمييز جمع مجرور
  const accusativeDistinctive =
    sign(sng, keepSign ? accusativeSign : '') + nunationAlif; // تمييز (مفرد) منصوب
  const sngGenitiveDistinctive = sign(
    sngDistinctive,
    keepSign ? sngGenitiveSign : ''
  ); // تمييز مفرد مجرور

  const zeroResult = num === 0 ? zero : `${formattedNum} ${sngDistinctive}`;

  const oneResult =
    parsing === 'accusative'
      ? accusativeDistinctive
      : parsing === 'genitive'
      ? sngGenitiveDistinctive
      : sngDistinctive;

  const twoResult =
    parsing === 'nominative'
      ? pair.replace(/[يا]ن$/, 'ان')
      : parsing === 'accusative' || parsing === 'genitive'
      ? pair.replace(/[يا]ن$/, diacs.f + 'ين')
      : pair;

  const arabicCount =
    int === 0
      ? zeroResult
      : int === 1
      ? oneResult
      : int === 2
      ? twoResult
      : int >= 3 && int <= 10
      ? `${formattedNum} ${plrGenitiveDistinctive}`
      : int >= 11 && int <= 99
      ? `${formattedNum} ${accusativeDistinctive}`
      : `${formattedNum} ${sngGenitiveDistinctive}`;

  return num
    ? `${before && before + ' '}${arabicCount}${after && ' ' + after}`
    : arabicCount;
};

module.exports = {
  arabizeCount,
};
