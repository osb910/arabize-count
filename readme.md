# Arabize Count

## This is a function that returns correctly parsed Arabic numeral distinctive (تمييز العدد). It accepts the number as a required argument, and an object of optional arguments that help identify the case of the distinctive:

- `sng`: the distinctive in the singular form. If not provided, it defaults to "مرة" which means "once".
- `pair`: the distinctive in the pair form. If not provided, it defaults to "مرتين" which means "twice".
- `plr`: the distinctive in the plural form. If not provided, it defaults to "مرات" which means "times".
- `zero`: the form of the whole output if the number is 0. If not provided, it defaults to "صفر" which means "zero".
- `isSngVaried`: whether the singular form is varied or prohibited from variation (مصروف أم ممنوع من الصرف). It affects the parsing sign. It's `true` by default.
- `isPlrVaried`: whether the plural form is varied or prohibited from variation (مصروف أم ممنوع من الصرف). It affects the parsing sign. It's `true` by default.
- `parsing`: `nominative` (مرفوع), `accusative` (منصوب), or `genitive` (مجرور). It's `null` by default which means the word is invariable (مبني غير مُعرب). Currently, it affects only the pair result. You can ignore it and pass the correct pair form if you know the correct parsing in your context.
- `keepSign`: whether you want the parsing sign in the output or not. It's `true` by default.
- `decimal`: number of decimal places in the numeral.
- `before`: an optional previous phrase.
- `after`: an optional next phrase.
- `dir`: direction of reading the Arabic numeral. It affects the parsing of the distinctve in some cases. The default is `rtl` and it can be `ltr`. Currently, its effect is almost unnoticable as the numeral is written in numbers not letters.
