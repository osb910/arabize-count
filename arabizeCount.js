const removeParsingSign = w => w.replace(/[\u064B-\u0650]$/, ''); // حذف علامة الإعراب
const trimEndingYeh = w => w.replace(/\u064A$/g, '\u064D'); // حذف ياء الاسم المنقوص
const nominativeToAccusativePlr = w =>
  w.replace(/\u0648\u0646$/, '\u064A\u0646'); // نصب جمع المذكر السالم (أو جره)
const sign = (w, sign) =>
  w.replace(/([ء-ي\u0651])[\u064B-\u0650]?$/, `$1${sign}`);

const arabizeCount = (
  num,
  {
    sng = 'مرة',
    pair = 'مرتين',
    plr = 'مرات',
    zero = 'صفر',
    isSngVaried = true,
    isPlrVaried = true,
    parsing = null,
    decimal = 0,
    before = '',
    after = '',
    dir = 'rtl',
    // sngType = 'm', // for written numerals (TODO)
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

  const formattedNum = num.toLocaleString(
    'ar-EG',
    decimal && {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    }
  );

  // Distinctive formatting | ضبط التمييز

  sng = removeParsingSign(sng);
  plr = removeParsingSign(plr);

  const sngDistinctive = trimEndingYeh(sng); // تمييز مفرد
  const plrDistinctive = nominativeToAccusativePlr(trimEndingYeh(plr)); // تمييز جمع

  // علامة النصب
  const accusativeSign = /[\u0627\u0649]$/.test(sng)
    ? ''
    : isSngVaried
    ? '\u064B' // تنوين نصب
    : '\u064E'; // فتحة للممنوع من الصرف

  // ألف تنوين النصب
  const nunationAlif =
    /[\u0627\u0629\u0649]$/.test(sng) || !isSngVaried ? '' : '\u0627';

  // علامة جر المفرد
  const sngGenitiveSign = /[\u0627\u0649]$/.test(sng)
    ? ''
    : isSngVaried
    ? '\u064D' // تنوين جر
    : '\u064E'; // فتحة للممنوع من الصرف

  // علامة جر الجمع
  const plrGenitiveSign = /([\u0627\u0649]|\u064A\u0646)$/.test(plrDistinctive)
    ? ''
    : isPlrVaried
    ? '\u064D' // تنوين جر
    : '\u064E'; // فتحة للممنوع من الصرف

  const plrGenitiveDistinctive = sign(plrDistinctive, plrGenitiveSign); // تمييز جمع مجرور
  const accusativeDistinctive = sign(sng, accusativeSign) + nunationAlif; // تمييز (مفرد) منصوب
  const sngGenitiveDistinctive = sign(sngDistinctive, sngGenitiveSign); // تمييز مفرد مجرور

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
      ? pair.replace(/[يا]ن$/, '\u064E' + 'ين')
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
