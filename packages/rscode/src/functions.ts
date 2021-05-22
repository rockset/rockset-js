const functions = [
  {
    text: 'CAST(x AS type)',
    link: 'https://docs.rockset.com/type-functions',
    description:
      'Lexical cast that, in addition to `STATIC_CAST`, supports casting between `string` and other scalar types. Errors the query if the cast is not supported.',
  },
  {
    text: 'IS_SCALAR(x)',
    link: 'https://docs.rockset.com/type-functions',
    description:
      'Returns `true` if `x` is a scalar, which is any type except `array`, `object`, and `null`.',
  },
  {
    text: 'STATIC_CAST(x AS type)',
    link: 'https://docs.rockset.com/type-functions',
    description:
      'Static cast that converts values from one data type to another. Supports casts between numeric types and casts to `bool` with Python semantics. Errors the query if the cast is not supported.',
  },
  {
    text: 'TRY_CAST(x AS type)',
    link: 'https://docs.rockset.com/type-functions',
    description:
      "Same as `CAST`, except it doesn't error out the query for an unsupported cast; a `null` is returned instead.",
  },
  {
    text: 'TRY_STATIC_CAST(x AS type)',
    link: 'https://docs.rockset.com/type-functions',
    description:
      "Same as `STATIC_CAST`, except it doesn't error out the query for an unsupported cast; a `null` is returned instead.",
  },
  {
    text: 'TYPEOF(x)',
    link: 'https://docs.rockset.com/type-functions',
    description:
      'Returns a `string`, name of the type of `x`. See the [page on data types](/data-types) for a list of type names.',
  },
  {
    text: 'HASH(x, digest)',
    link: 'https://docs.rockset.com/cryptographic-functions',
    description:
      'Computes the hash of the `bytes` value `x` using `digest`, where `digest` is the string name of any digest method supported by OpenSSL.',
  },
  {
    text: 'MD5(x)',
    link: 'https://docs.rockset.com/cryptographic-functions',
    description: 'Computes the MD5 hash of the `bytes` value `x`.',
  },
  {
    text: 'SHA1(x)',
    link: 'https://docs.rockset.com/cryptographic-functions',
    description: 'Computes the SHA1 hash of the `bytes` value `x`.',
  },
  {
    text: 'SHA256(x)',
    link: 'https://docs.rockset.com/cryptographic-functions',
    description: 'Computes the SHA256 hash of the `bytes` value `x`.',
  },
  {
    text: 'SHA512(x)',
    link: 'https://docs.rockset.com/cryptographic-functions',
    description: 'Computes the SHA512 hash of the `bytes` value `x`.',
  },
  {
    text: 'HMAC_MD5(x, key)',
    link: 'https://docs.rockset.com/cryptographic-functions',
    description:
      'Computes the MD5 HMAC of the `bytes` value `x` using `key` as the key.',
  },
  {
    text: 'HMAC_SHA1(x, key)',
    link: 'https://docs.rockset.com/cryptographic-functions',
    description:
      'Computes the SHA1 HMAC of the `bytes` value `x` using `key` as the key.',
  },
  {
    text: 'HMAC_SHA256(x, key)',
    link: 'https://docs.rockset.com/cryptographic-functions',
    description:
      'Computes the SHA256 HMAC of the `bytes` value `x` using `key` as the key.',
  },
  {
    text: 'HMAC_SHA512(x, key)',
    link: 'https://docs.rockset.com/cryptographic-functions',
    description:
      'Computes the SHA512 HMAC of the `bytes` value `x` using `key` as the key.',
  },
  {
    text: 'HMAC(x, key, digest)',
    link: 'https://docs.rockset.com/cryptographic-functions',
    description:
      'Computes the HMAC of the `bytes` value `x` using `key` as the key and `digest` as the digest method, where `digest` is the string name of any digest method supported by OpenSSL.',
  },
  {
    text: 'OBJECT(keys, values)',
    link: 'https://docs.rockset.com/object-functions',
    description:
      'Construct an object from an array of keys and an array of values. `keys` must be an array of strings. `values` must be an arbitrary array of the same length as `keys`.',
  },
  {
    text: 'ZIP(entries)',
    link: 'https://docs.rockset.com/object-functions',
    description:
      'Construct an object from an array of entries. Each entry in `entry` must itself be an array of size 2: the first element is the key (and must be a string), and the second element is the value.',
  },
  {
    text: 'ELEMENT_AT(obj, key)',
    link: 'https://docs.rockset.com/object-functions',
    description:
      'Return the value corresponding to `key`, or `NULL` if `key` does not exist in `obj`.',
  },
  {
    text: 'LENGTH(obj)',
    link: 'https://docs.rockset.com/object-functions',
    description: 'Returns number of elements in `obj`.',
  },
  {
    text: 'KEYS(obj)',
    link: 'https://docs.rockset.com/object-functions',
    description:
      'Return an array containing the keys of `obj`. The order is unspecified, but will be the same between `KEYS()`, `VALUES()`, and `ITEMS()`.',
  },
  {
    text: 'VALUES(obj)',
    link: 'https://docs.rockset.com/object-functions',
    description:
      'Return an array containing the values of `obj`. The order is unspecified, but will be the same between `KEYS()`, `VALUES()`, and `ITEMS()`.',
  },
  {
    text: 'ITEMS(obj)',
    link: 'https://docs.rockset.com/object-functions',
    description:
      'Return an array containing the entries of `obj`. Each entry is a 2-element array; the first is the key, the second is the value. The order is unspecified, but will be the same between `KEYS()`, `VALUES()`, and `ITEMS()`.',
  },
  {
    text: 'MERGE(a, b)',
    link: 'https://docs.rockset.com/object-functions',
    description:
      'Return a new object containing the values from `a` and `b`. If the same key exists in both `a` and `b`, the value from `b` will overwrite the value from `a`.',
  },
  {
    text: 'ERASE(obj, k)',
    link: 'https://docs.rockset.com/object-functions',
    description:
      'If `k` is a string, return a new object where the key `k` is erased. If `k` is an array of strings, return a new object where the keys in `k` are erased.',
  },
  {
    text: 'CONCAT(x, ...)',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Returns concatenated strings given in the arguments. Supports variable number of arguments.',
  },
  {
    text: 'LENGTH(x)',
    link: 'https://docs.rockset.com/string-functions',
    description: 'Returns length of string `x`.',
  },
  {
    text: 'LOWER(x)',
    link: 'https://docs.rockset.com/string-functions',
    description: 'Returns locale-independent lowercase string `x`.',
  },
  {
    text: 'LTRIM(string)',
    link: 'https://docs.rockset.com/string-functions',
    description: 'Returns `string` with leading whitespace removed.',
  },
  {
    text: 'NORMALIZE(string[, form])',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Returns Unicode-normalized form of `string`. `form` is an identifier and must be one of `NFC`, `NFD`, `NFKC`, `NFKD`, which are the four Unicode normalization methods; `NFC` is default.',
  },
  {
    text: 'UPPER(x)',
    link: 'https://docs.rockset.com/string-functions',
    description: 'Returns locale-independent uppercase string `x`.',
  },
  {
    text: 'REPLACE(string, search[, replacement])',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Returns a string with all instances of `search` replaced with `replacement` in `string`. `replacement` is optional, which if not specified removes all instance of `search` from `string`.',
  },
  {
    text: 'RTRIM(string)',
    link: 'https://docs.rockset.com/string-functions',
    description: 'Returns `string` with trailing whitespace removed.',
  },
  {
    text: 'SPLIT(string, delimiter[, limit])',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Splits `string` on `delimiter` and returns an array. With `limit`, returns an array of size at most `limit`. The last element in the array always contains everything left in the string. `limit` must be a positive number.',
  },
  {
    text: 'STRPOS(string, substring)',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Returns the starting position of the first instance of `substring` in `string`. Positions start with 1. If not found, 0 is returned.',
  },
  {
    text: 'SUBSTR(string, start[, length])',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Returns substring of `string` starting at character at index given by `start` (1-based index) and of length `length`. If `length` is not given, returns the substring starting at `start` until the end of `string`.',
  },
  {
    text: 'TRIM(string)',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Returns `string` with leading and trailing whitespace removed.',
  },
  {
    text: 'FROM_HEX(s)',
    link: 'https://docs.rockset.com/string-functions',
    description: 'Decodes the hex string `s` into a `bytes` value.',
  },
  {
    text: 'FROM_UTF8(b)',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'If `b` is a `bytes` value that represents a valid UTF-8 string, return it as a `string`. Otherwise, raise an error.',
  },
  {
    text: 'TO_HEX(b)',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Encodes the `bytes` value `b` into a hex `string` representation.',
  },
  {
    text: 'TO_UTF8(s)',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Return the `bytes` UTF-8 representation of the `string` value `s`.',
  },
  {
    text: 'REGEXP_EXTRACT(string, pattern[, group])',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Returns the first match of `pattern` in `string`, or `null` if the pattern does not match. If `group` is specified and greater than zero, returns the  `group`th capturing group; if `group` is not specified or is zero, returns the full match.',
  },
  {
    text: 'REGEXP_EXTRACT_ALL(string, pattern[, group])',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Returns an array containing all matches of `pattern` in `string`. If `group` is specified and greater than zero, extracts the `group`th capturing group from each match; if `group` is not specified or is zero, returns the full matches.',
  },
  {
    text: 'REGEXP_LIKE(string, pattern)',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Returns `true` if `string` matches the regular expression `pattern`, `false` otherwise.',
  },
  {
    text: 'REGEXP_REPLACE(string, pattern[, replacement])',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Returns `string` with all places where `pattern` matches replaced with `replacement` (or erased if `replacement` is not specified). `replacement` may use `\\1` .. `\\9` escape sequences to refer to capturing groups, or `\\0` to refer to the entire match.',
  },
  {
    text: 'REGEXP_SPLIT(string, pattern)',
    link: 'https://docs.rockset.com/string-functions',
    description:
      'Returns an array with the components of `string` when split by `pattern`.',
  },
  {
    text: 'APPROX_DISTINCT(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description:
      'Returns the approximate number of distinct elements in `x`. Calculated using HyperLogLog algorithm. Use `COUNT(DISTINCT x)` for an exact count.',
  },
  {
    text: 'ARBITRARY(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description: 'Returns an arbitrary non-null element in `x`.',
  },
  {
    text: 'ARRAY_AGG(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description: 'Returns an array created from all the elements in `x`.',
  },
  {
    text: 'COUNT(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description: 'Returns the number of non-null elements in `x`.',
  },
  {
    text: 'COUNT(*)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description: 'Returns the number of input rows.',
  },
  {
    text: 'GROUPING(col1, col1, ... col_n)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description:
      'Returns the grouping mask, which is a bitmask associating one bit with every column (the first column in the list of arguments corresponds to the most significant bit in the result).',
  },
  {
    text: 'BITWISE_AND_AGG(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description:
      "Returns the bitwise AND of all input values in 2's complement representation.",
  },
  {
    text: 'BITWISE_OR_AGG(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description:
      "Returns the bitwise OR of all input values in 2's complement representation.",
  },
  {
    text: 'BOOL_AND(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description:
      'Returns `true` if every value in the input is `true`, `false` otherwise.  Return value and all arguments are `boolean`.',
  },
  {
    text: 'BOOL_OR(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description:
      'Returns `true` if one value in the input is `true`, `false` otherwise. Return value and all arguments are `boolean`.',
  },
  {
    text: 'COUNT_IF(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description: 'Returns the number of elements in `x` which are `true`.',
  },
  {
    text: 'EVERY(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description: 'An alias of `BOOL_AND` function.',
  },
  {
    text: 'AVG(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description:
      'Returns an average of all the elements in `x`. All elements are implicitly promoted to `float`. Return value is of type `float`.',
  },
  {
    text: 'GEOMETRIC_MEAN(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description:
      'Returns the geometric mean of elements in `x`. All elements are implicitly promoted to `float`. Return value is of type `float`.',
  },
  {
    text: 'MAX(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description: 'Returns the maximum value of all elements in `x`.',
  },
  {
    text: 'MAX_BY(x, y)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description:
      'Returns the value of column `x` associated with the maximum value of column `y`.',
  },
  {
    text: 'MIN(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description: 'Returns the minimum value of all elements in `x`.',
  },
  {
    text: 'MIN_BY(x, y)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description:
      'Returns the value of column `x` associated with the minimum value of column `y`.',
  },
  {
    text: 'STDDEV_SAMP(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description: 'Returns the sample standard deviation of all input values.',
  },
  {
    text: 'SUM(x)',
    link: 'https://docs.rockset.com/aggregate-functions',
    description:
      'Returns the sum of all elements in `x`. Returns a value of type `int` if all of the input elements are `int`, `float` otherwise.',
  },
  {
    text: 'BOOST(boost_value, term)',
    link: 'https://docs.rockset.com/text-search-functions',
    description:
      'Set the boost value (a positive floating point value) for a specific search term. Unboosted terms have a default boost value of `1.0`.',
  },
  {
    text: 'CONTAINS(field, search_string[, locale])',
    link: 'https://docs.rockset.com/text-search-functions',
    description:
      'Add terms to the query that correspond to the given search string, tokenized in the given locale (default: `en_US`). The terms will be placed in a proximity range.',
  },
  {
    text: 'HAS_TERM(field, term_value)',
    link: 'https://docs.rockset.com/text-search-functions',
    description:
      'Search term that matches when the specified field contains the specified term value.',
  },
  {
    text: 'PROXIMITY(term[, term]*)',
    link: 'https://docs.rockset.com/text-search-functions',
    description:
      'Create a proximity range for these terms. These terms will contribute 1 point to the final score, just like other terms in the `SEARCH` query, but will also contribute a score that depends on the longest consecutive match.',
  },
  {
    text: 'PROXIMITY_BOOST(boost_value, proximity_range)',
    link: 'https://docs.rockset.com/text-search-functions',
    description:
      "Set the proximity range boost value (a positive floating point value) for a specific search proximity range. This affects the range's specific contribution to the score, not the contributions of the individual terms in the range.",
  },
  {
    text: 'SEARCH(term[, term]*)',
    link: 'https://docs.rockset.com/text-search-functions',
    description:
      'Return documents that match all of the terms (by default), or at least one of the terms (with `OPTION(match_all=false)`). The terms are arbitrary SQL boolean expressions, optionally boosted.',
  },
  {
    text: 'TOKENIZE(text[, locale])',
    link: 'https://docs.rockset.com/text-search-functions',
    description:
      'Tokenize `text`, interpreted as text in the language specified by `locale`.',
  },
  {
    text: 'ABS(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description:
      'Returns absolute value of `x`. Return type is the same as input.',
  },
  {
    text: 'CEIL(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description:
      'Returns the smallest integral value that is not less than `x`.',
  },
  {
    text: 'CEILING(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Alias of `CEIL`.',
  },
  {
    text: 'GREATEST(a, b, c, ...)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description:
      'Returns the argument that is greater than or equal to all other arguments.',
  },
  {
    text: 'LEAST(a, b, c, ...)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description:
      'Returns the argument that is less than or equal to all other arguments.',
  },
  {
    text: 'SIGN(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description:
      'Returns sign of `x` as an integer: `-1` if `x` is negative, `0` if `x` is zero, `1` if `x` is positive.',
  },
  {
    text: 'FLOOR(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description:
      'Returns the largest integral value that is not greater than `x`.',
  },
  {
    text: 'EXP(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes `e` to the power of `x`.',
  },
  {
    text: 'POW(x, y)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes `x` to the power of `y`.',
  },
  {
    text: 'POWER(x, y)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Alias of `POW`.',
  },
  {
    text: 'SQRT(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the square root of `x`.',
  },
  {
    text: 'LN(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the natural logarithm of `x`.',
  },
  {
    text: 'LOG10(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the base-10 logarithm of `x`.',
  },
  {
    text: 'LOG2(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the base-2 logarithm of `x`.',
  },
  {
    text: 'ACOS(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the arc cosine of `x`.',
  },
  {
    text: 'ACOSH(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the inverse hyperbolic cosine of `x`.',
  },
  {
    text: 'ASIN(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the arc sine of `x`.',
  },
  {
    text: 'ASINH(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the inverse hyperbolic sine of `x`.',
  },
  {
    text: 'ATAN(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the arc tangent of `x`.',
  },
  {
    text: 'ATAN2(y, x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description:
      'Computes the arc tangent of `y / x`, but with proper sign for quadrant correction. That is, correctly computes the angle `\u03b8` when converting from the Cartesian coordinates `(x, y)` to the polar coordinates `(r, \u03b8)`.',
  },
  {
    text: 'ATANH(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the inverse hyperbolic tangent of `x`.',
  },
  {
    text: 'COS(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the cosine of `x`.',
  },
  {
    text: 'COSH(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the hyperbolic cosine of `x`.',
  },
  {
    text: 'HYPOT(x, y)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description:
      'Computes `SQRT(x*x + y*y)`, that is, the length of the hypothenuse of a right-angled triangle with sides of lengths `x` and `y`, or the distance between the point at coordinates `(x, y)` and origin.',
  },
  {
    text: 'SIN(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the sine of `x`.',
  },
  {
    text: 'SINH(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the hyperbolic sine of `x`.',
  },
  {
    text: 'TAN(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the tangent of `x`.',
  },
  {
    text: 'TANH(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description: 'Computes the hyperbolic tangent of `x`.',
  },
  {
    text: 'BIT_COUNT(x, bits)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description:
      'Count the number of bits set in `x` (treated as `bits`-bit signed integer) in 2\u2019s complement representation.',
  },
  {
    text: 'BITWISE_NOT(x)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description:
      'Returns the bitwise NOT of `x` in 2\u2019s complement representation.',
  },
  {
    text: 'BITWISE_XOR(x, y)',
    link: 'https://docs.rockset.com/mathematical-functions',
    description:
      'Returns the bitwise XOR of `x` and `y` in 2\u2019s complement representation.',
  },
  {
    text: 'COALESCE(x, ...)',
    link: 'https://docs.rockset.com/conditional-expressions',
    description: 'Returns the first non-null value in the argument list.',
  },
  {
    text: 'IF(cond, x, y)',
    link: 'https://docs.rockset.com/conditional-expressions',
    description: 'Returns `x` if `cond` is true, `y` otherwise.',
  },
  {
    text: 'ARRAY_CREATE(val1, val2, ...)',
    link: 'https://docs.rockset.com/array-functions',
    description: 'Construct an array from literals.',
  },
  {
    text: 'ARRAY_POSITION(array, val)',
    link: 'https://docs.rockset.com/array-functions',
    description:
      'Return a 1-based index of `val` if it is found within `array`. If `val` is null, it will return null. If `val` does not exist within array, it returns 0.',
  },
  {
    text: 'ARRAY_LAST_POSITION(array, val)',
    link: 'https://docs.rockset.com/array-functions',
    description:
      'Return a 1-based index of the last occurrence of `val` if it is found within `array`. If `val` is null, it will return null. If `val` does not exist within array, it returns 0.',
  },
  {
    text: 'LENGTH(array)',
    link: 'https://docs.rockset.com/array-functions',
    description: 'Returns length of `array`.',
  },
  {
    text: 'SLICE(array, start[, length])',
    link: 'https://docs.rockset.com/array-functions',
    description:
      'Returns a subset of `array` starting from index `start`  (or starting from the end if `start` is negative) with a  length of minimum of `length` and length of `array`.  `length` is optional and defaults to length of `array`  if unspecified.',
  },
  {
    text: 'ARRAY_DISTINCT(array)',
    link: 'https://docs.rockset.com/array-functions',
    description: 'Returns an array with all duplicates removed.',
  },
  {
    text: 'CURRENT_DATE([timezone])',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns current date in the `timezone` time zone (default UTC). Return value is of `date` type.',
  },
  {
    text: 'CURRENT_DATETIME([timezone])',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns current date and time in the `timezone` time zone (default UTC). Return value is of `datetime` type.',
  },
  {
    text: 'CURRENT_TIME([timezone])',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns current time in the `timezone` time zone (default UTC). Return value is of `time` type.',
  },
  {
    text: 'CURRENT_TIMESTAMP()',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns the current timestamp. As the timestamp refers to an absolute moment in time, no time zone argument is necessary (or allowed). The returned value is of the `timestamp` type.',
  },
  {
    text: 'EXTRACT(part FROM datetime)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Extracts a component from a `datetime` (or `date` or `time`).',
  },
  {
    text: 'FORMAT_ISO8601(datetime)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Formats a `date`, `time`, or `datetime` value using the [ISO 8601](https://www.loc.gov/standards/datetime/iso-tc154-wg5_n0038_iso_wd_8601-1_2016-02-16.pdf) extended format',
  },
  {
    text: 'FORMAT_ISO8601(timestamp[, timezone]',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Formats a `timestamp` using the ISO 8601 extended format. The timestamp is converted to `timezone` for output (default UTC).',
  },
  {
    text: 'DATE(year, month, date)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs value of type `date` based on `year`, `month`, and `date`.',
  },
  {
    text: 'DATE(datetime)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description: 'Extracts the date part of `datetime`.',
  },
  {
    text: 'DATE(timestamp[, timezone]',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description: 'Returns the date at `timestamp` in `timezone` (default UTC).',
  },
  {
    text: 'FORMAT_DATE(format, date)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns a string containing the `date` value formatted using the given `format`.',
  },
  {
    text: 'PARSE_DATE(format, string)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Parses the date string (formatted using the given `format`) into a `date` value.',
  },
  {
    text: 'PARSE_DATE_ISO8601(string)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description: 'Parse a `date` from an ISO 8601 string without a timezone.',
  },
  {
    text: 'FORMAT_TIME(format, time)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns a string containing the `time` value formatted using the given `format`.',
  },
  {
    text: 'PARSE_TIME(format, string)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Parses the date string (formatted using the given `format`) into a `time` value.',
  },
  {
    text: 'PARSE_TIME_ISO8601(string)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description: 'Parse a `time` from an ISO 8601 string without a timezone.',
  },
  {
    text: 'TIME(hour, min, sec[, microsecond]',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs value of type `time` based on `hour`, `min`, `sec`, and, optionally, `microsecond`.',
  },
  {
    text: 'TIME(datetime)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description: 'Extracts the time part of `datetime`.',
  },
  {
    text: 'TIME(timestamp[, timezone]',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description: 'Returns the time at `timestamp` in `timezone` (default UTC).',
  },
  {
    text: 'DATETIME(year, month, day, hour, min, sec[, microsecond]',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs value of type `datetime` based on `year`, `month`, `day`, `hour`, `min`, `sec`, and, optionally, `microsecond`.',
  },
  {
    text: 'DATETIME(timestamp[, timezone]',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns the date and time at `timestamp` in `timezone` (default UTC).',
  },
  {
    text: 'DATETIME(date, time)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns a `datetime` value from `date` (of type `date`) and `time` (of type `time`) components.',
  },
  {
    text: 'FORMAT_DATETIME(format, datetime)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns a string containing the `datetime` value formatted using the given `format`.',
  },
  {
    text: 'PARSE_DATETIME(format, string)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Parses the date string (formatted using the given `format`) into a `datetime` value.',
  },
  {
    text: 'PARSE_DATETIME_ISO8601(string)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Parse a `datetime` from an ISO 8601 string without a timezone.',
  },
  {
    text: 'FORMAT_TIMESTAMP(format, timestamp[, timezone]',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns a string containing the `timestamp` value formatted using the given `format`, as of the given `timezone` (default UTC).',
  },
  {
    text: 'PARSE_TIMESTAMP(format, string[, default_timezone])',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Parses the date string (formatted using the given `format`) into a `timestamp` value. If the format string does not contain a timezone, `default_timezone` is used (UTC if not specified).',
  },
  {
    text: 'PARSE_TIMESTAMP_ISO8601(string)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Parses the timestamp from an ISO 8601 string. The string must include a timezone offset (or the `Z` suffix for UTC).',
  },
  {
    text: 'TIME_BUCKET(interval, timestamp[, origin])',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Truncates `timestamp` to the largest multiple of `interval` smaller than `timestamp`.',
  },
  {
    text: 'TIMESTAMP_MICROS(n)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs value of type `timestamp` from `n` microseconds since the Unix epoch.',
  },
  {
    text: 'TIMESTAMP_MILLIS(n)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs value of type `timestamp` from `n` milliseconds since the Unix epoch.',
  },
  {
    text: 'TIMESTAMP_SECONDS(n)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs value of type `timestamp` from `n` seconds since the Unix epoch.',
  },
  {
    text: 'UNIX_MICROS(ts)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns the value of the `timestamp` `ts` as an `int` number of microseconds since the Unix epoch.',
  },
  {
    text: 'UNIX_MILLIS(ts)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns the value of the `timestamp` `ts` as an `int` number of milliseconds since the Unix epoch.',
  },
  {
    text: 'UNIX_SECONDS(ts)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns the value of the `timestamp` `ts` as an `int` number of seconds since the Unix epoch.',
  },
  {
    text: 'MICROSECONDS(n)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs a `microsecond_interval` value that refers to a duration of `n` microseconds.',
  },
  {
    text: 'MILLISECONDS(n)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs a `microsecond_interval` value that refers to a duration of `n` milliseconds.',
  },
  {
    text: 'SECONDS(n)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs a `microsecond_interval` value that refers to a duration of `n` seconds.',
  },
  {
    text: 'MINUTES(n)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs a `microsecond_interval` value that refers to a duration of `n` minutes.',
  },
  {
    text: 'HOURS(n)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs a `microsecond_interval` value that refers to a duration of `n` hours.',
  },
  {
    text: 'DAYS(n)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs a `microsecond_interval` value that refers to a duration of `n` days.',
  },
  {
    text: 'MONTHS(n)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs a `month_interval` value that refers to a duration of `n` months.',
  },
  {
    text: 'YEARS(n)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Constructs a `month_interval` value that refers to a duration of `n` years.',
  },
  {
    text: 'PARSE_DURATION_SECONDS(s)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description: 'Parses a `microsecond_interval` value from a string.',
  },
  {
    text: 'PARSE_DURATION_MONTHS(s)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description: 'Parses a `month_interval` value from a string.',
  },
  {
    text: 'DURATION_MICROS(interval)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns the duration of a `microsecond_interval` in microseconds.',
  },
  {
    text: 'DURATION_MILLIS(interval)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description:
      'Returns the duration of a `microsecond_interval` in milliseconds.',
  },
  {
    text: 'DURATION_SECONDS(interval)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description: 'Returns the duration of a `microsecond_interval` in seconds.',
  },
  {
    text: 'DURATION_MONTHS(interval)',
    link: 'https://docs.rockset.com/date-and-time-functions',
    description: 'Returns the duration of a `month_interval` in months.',
  },
];

export default functions.map((obj) => obj.text) as string[];
export { functions };