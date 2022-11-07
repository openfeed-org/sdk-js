var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var ws = null;
if (typeof WebSocket !== "undefined") {
  ws = WebSocket;
} else if (typeof MozWebSocket !== "undefined") {
  ws = MozWebSocket;
} else if (typeof global !== "undefined") {
  ws = global.WebSocket || global.MozWebSocket;
} else if (typeof window !== "undefined") {
  ws = window.WebSocket || window.MozWebSocket;
} else if (typeof self !== "undefined") {
  ws = self.WebSocket || self.MozWebSocket;
}
const WebSocket$1 = ws;
/**
 * @license
 * Copyright 2009 The Closure Library Authors
 * Copyright 2020 Daniel Wirtz / The long.js Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var wasm = null;
try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    13,
    2,
    96,
    0,
    1,
    127,
    96,
    4,
    127,
    127,
    127,
    127,
    1,
    127,
    3,
    7,
    6,
    0,
    1,
    1,
    1,
    1,
    1,
    6,
    6,
    1,
    127,
    1,
    65,
    0,
    11,
    7,
    50,
    6,
    3,
    109,
    117,
    108,
    0,
    1,
    5,
    100,
    105,
    118,
    95,
    115,
    0,
    2,
    5,
    100,
    105,
    118,
    95,
    117,
    0,
    3,
    5,
    114,
    101,
    109,
    95,
    115,
    0,
    4,
    5,
    114,
    101,
    109,
    95,
    117,
    0,
    5,
    8,
    103,
    101,
    116,
    95,
    104,
    105,
    103,
    104,
    0,
    0,
    10,
    191,
    1,
    6,
    4,
    0,
    35,
    0,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    126,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    127,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    128,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    129,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    130,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11
  ])), {}).exports;
} catch (e) {
}
function Long(low, high, unsigned) {
  this.low = low | 0;
  this.high = high | 0;
  this.unsigned = !!unsigned;
}
Long.prototype.__isLong__;
Object.defineProperty(Long.prototype, "__isLong__", { value: true });
function isLong(obj) {
  return (obj && obj["__isLong__"]) === true;
}
function ctz32(value) {
  var c = Math.clz32(value & -value);
  return value ? 31 - c : c;
}
Long.isLong = isLong;
var INT_CACHE = {};
var UINT_CACHE = {};
function fromInt(value, unsigned) {
  var obj, cachedObj, cache;
  if (unsigned) {
    value >>>= 0;
    if (cache = 0 <= value && value < 256) {
      cachedObj = UINT_CACHE[value];
      if (cachedObj)
        return cachedObj;
    }
    obj = fromBits(value, 0, true);
    if (cache)
      UINT_CACHE[value] = obj;
    return obj;
  } else {
    value |= 0;
    if (cache = -128 <= value && value < 128) {
      cachedObj = INT_CACHE[value];
      if (cachedObj)
        return cachedObj;
    }
    obj = fromBits(value, value < 0 ? -1 : 0, false);
    if (cache)
      INT_CACHE[value] = obj;
    return obj;
  }
}
Long.fromInt = fromInt;
function fromNumber(value, unsigned) {
  if (isNaN(value))
    return unsigned ? UZERO : ZERO;
  if (unsigned) {
    if (value < 0)
      return UZERO;
    if (value >= TWO_PWR_64_DBL)
      return MAX_UNSIGNED_VALUE;
  } else {
    if (value <= -TWO_PWR_63_DBL)
      return MIN_VALUE;
    if (value + 1 >= TWO_PWR_63_DBL)
      return MAX_VALUE;
  }
  if (value < 0)
    return fromNumber(-value, unsigned).neg();
  return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
}
Long.fromNumber = fromNumber;
function fromBits(lowBits, highBits, unsigned) {
  return new Long(lowBits, highBits, unsigned);
}
Long.fromBits = fromBits;
var pow_dbl = Math.pow;
function fromString(str, unsigned, radix) {
  if (str.length === 0)
    throw Error("empty string");
  if (typeof unsigned === "number") {
    radix = unsigned;
    unsigned = false;
  } else {
    unsigned = !!unsigned;
  }
  if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
    return unsigned ? UZERO : ZERO;
  radix = radix || 10;
  if (radix < 2 || 36 < radix)
    throw RangeError("radix");
  var p;
  if ((p = str.indexOf("-")) > 0)
    throw Error("interior hyphen");
  else if (p === 0) {
    return fromString(str.substring(1), unsigned, radix).neg();
  }
  var radixToPower = fromNumber(pow_dbl(radix, 8));
  var result = ZERO;
  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = fromNumber(pow_dbl(radix, size));
      result = result.mul(power).add(fromNumber(value));
    } else {
      result = result.mul(radixToPower);
      result = result.add(fromNumber(value));
    }
  }
  result.unsigned = unsigned;
  return result;
}
Long.fromString = fromString;
function fromValue(val, unsigned) {
  if (typeof val === "number")
    return fromNumber(val, unsigned);
  if (typeof val === "string")
    return fromString(val, unsigned);
  return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
}
Long.fromValue = fromValue;
var TWO_PWR_16_DBL = 1 << 16;
var TWO_PWR_24_DBL = 1 << 24;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
var ZERO = fromInt(0);
Long.ZERO = ZERO;
var UZERO = fromInt(0, true);
Long.UZERO = UZERO;
var ONE = fromInt(1);
Long.ONE = ONE;
var UONE = fromInt(1, true);
Long.UONE = UONE;
var NEG_ONE = fromInt(-1);
Long.NEG_ONE = NEG_ONE;
var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
Long.MAX_VALUE = MAX_VALUE;
var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
Long.MIN_VALUE = MIN_VALUE;
var LongPrototype = Long.prototype;
LongPrototype.toInt = function toInt() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
LongPrototype.toNumber = function toNumber() {
  if (this.unsigned)
    return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
  return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};
LongPrototype.toString = function toString(radix) {
  radix = radix || 10;
  if (radix < 2 || 36 < radix)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative()) {
    if (this.eq(MIN_VALUE)) {
      var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
      return div.toString(radix) + rem1.toInt().toString(radix);
    } else
      return "-" + this.neg().toString(radix);
  }
  var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
  var result = "";
  while (true) {
    var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
    rem = remDiv;
    if (rem.isZero())
      return digits + result;
    else {
      while (digits.length < 6)
        digits = "0" + digits;
      result = "" + digits + result;
    }
  }
};
LongPrototype.getHighBits = function getHighBits() {
  return this.high;
};
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
  return this.high >>> 0;
};
LongPrototype.getLowBits = function getLowBits() {
  return this.low;
};
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
  return this.low >>> 0;
};
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
  if (this.isNegative())
    return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
  var val = this.high != 0 ? this.high : this.low;
  for (var bit = 31; bit > 0; bit--)
    if ((val & 1 << bit) != 0)
      break;
  return this.high != 0 ? bit + 33 : bit + 1;
};
LongPrototype.isZero = function isZero() {
  return this.high === 0 && this.low === 0;
};
LongPrototype.eqz = LongPrototype.isZero;
LongPrototype.isNegative = function isNegative() {
  return !this.unsigned && this.high < 0;
};
LongPrototype.isPositive = function isPositive() {
  return this.unsigned || this.high >= 0;
};
LongPrototype.isOdd = function isOdd() {
  return (this.low & 1) === 1;
};
LongPrototype.isEven = function isEven() {
  return (this.low & 1) === 0;
};
LongPrototype.equals = function equals(other) {
  if (!isLong(other))
    other = fromValue(other);
  if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
    return false;
  return this.high === other.high && this.low === other.low;
};
LongPrototype.eq = LongPrototype.equals;
LongPrototype.notEquals = function notEquals(other) {
  return !this.eq(other);
};
LongPrototype.neq = LongPrototype.notEquals;
LongPrototype.ne = LongPrototype.notEquals;
LongPrototype.lessThan = function lessThan(other) {
  return this.comp(other) < 0;
};
LongPrototype.lt = LongPrototype.lessThan;
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
  return this.comp(other) <= 0;
};
LongPrototype.lte = LongPrototype.lessThanOrEqual;
LongPrototype.le = LongPrototype.lessThanOrEqual;
LongPrototype.greaterThan = function greaterThan(other) {
  return this.comp(other) > 0;
};
LongPrototype.gt = LongPrototype.greaterThan;
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
  return this.comp(other) >= 0;
};
LongPrototype.gte = LongPrototype.greaterThanOrEqual;
LongPrototype.ge = LongPrototype.greaterThanOrEqual;
LongPrototype.compare = function compare(other) {
  if (!isLong(other))
    other = fromValue(other);
  if (this.eq(other))
    return 0;
  var thisNeg = this.isNegative(), otherNeg = other.isNegative();
  if (thisNeg && !otherNeg)
    return -1;
  if (!thisNeg && otherNeg)
    return 1;
  if (!this.unsigned)
    return this.sub(other).isNegative() ? -1 : 1;
  return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
};
LongPrototype.comp = LongPrototype.compare;
LongPrototype.negate = function negate() {
  if (!this.unsigned && this.eq(MIN_VALUE))
    return MIN_VALUE;
  return this.not().add(ONE);
};
LongPrototype.neg = LongPrototype.negate;
LongPrototype.add = function add(addend) {
  if (!isLong(addend))
    addend = fromValue(addend);
  var a48 = this.high >>> 16;
  var a32 = this.high & 65535;
  var a16 = this.low >>> 16;
  var a00 = this.low & 65535;
  var b48 = addend.high >>> 16;
  var b32 = addend.high & 65535;
  var b16 = addend.low >>> 16;
  var b00 = addend.low & 65535;
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 + b00;
  c16 += c00 >>> 16;
  c00 &= 65535;
  c16 += a16 + b16;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c32 += a32 + b32;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c48 += a48 + b48;
  c48 &= 65535;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
LongPrototype.subtract = function subtract(subtrahend) {
  if (!isLong(subtrahend))
    subtrahend = fromValue(subtrahend);
  return this.add(subtrahend.neg());
};
LongPrototype.sub = LongPrototype.subtract;
LongPrototype.multiply = function multiply(multiplier) {
  if (this.isZero())
    return this;
  if (!isLong(multiplier))
    multiplier = fromValue(multiplier);
  if (wasm) {
    var low = wasm["mul"](
      this.low,
      this.high,
      multiplier.low,
      multiplier.high
    );
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  if (multiplier.isZero())
    return this.unsigned ? UZERO : ZERO;
  if (this.eq(MIN_VALUE))
    return multiplier.isOdd() ? MIN_VALUE : ZERO;
  if (multiplier.eq(MIN_VALUE))
    return this.isOdd() ? MIN_VALUE : ZERO;
  if (this.isNegative()) {
    if (multiplier.isNegative())
      return this.neg().mul(multiplier.neg());
    else
      return this.neg().mul(multiplier).neg();
  } else if (multiplier.isNegative())
    return this.mul(multiplier.neg()).neg();
  if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
    return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
  var a48 = this.high >>> 16;
  var a32 = this.high & 65535;
  var a16 = this.low >>> 16;
  var a00 = this.low & 65535;
  var b48 = multiplier.high >>> 16;
  var b32 = multiplier.high & 65535;
  var b16 = multiplier.low >>> 16;
  var b00 = multiplier.low & 65535;
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 * b00;
  c16 += c00 >>> 16;
  c00 &= 65535;
  c16 += a16 * b00;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c16 += a00 * b16;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c32 += a32 * b00;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c32 += a16 * b16;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c32 += a00 * b32;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
  c48 &= 65535;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
LongPrototype.mul = LongPrototype.multiply;
LongPrototype.divide = function divide(divisor) {
  if (!isLong(divisor))
    divisor = fromValue(divisor);
  if (divisor.isZero())
    throw Error("division by zero");
  if (wasm) {
    if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
      return this;
    }
    var low = (this.unsigned ? wasm["div_u"] : wasm["div_s"])(
      this.low,
      this.high,
      divisor.low,
      divisor.high
    );
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? UZERO : ZERO;
  var approx, rem, res;
  if (!this.unsigned) {
    if (this.eq(MIN_VALUE)) {
      if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
        return MIN_VALUE;
      else if (divisor.eq(MIN_VALUE))
        return ONE;
      else {
        var halfThis = this.shr(1);
        approx = halfThis.div(divisor).shl(1);
        if (approx.eq(ZERO)) {
          return divisor.isNegative() ? ONE : NEG_ONE;
        } else {
          rem = this.sub(divisor.mul(approx));
          res = approx.add(rem.div(divisor));
          return res;
        }
      }
    } else if (divisor.eq(MIN_VALUE))
      return this.unsigned ? UZERO : ZERO;
    if (this.isNegative()) {
      if (divisor.isNegative())
        return this.neg().div(divisor.neg());
      return this.neg().div(divisor).neg();
    } else if (divisor.isNegative())
      return this.div(divisor.neg()).neg();
    res = ZERO;
  } else {
    if (!divisor.unsigned)
      divisor = divisor.toUnsigned();
    if (divisor.gt(this))
      return UZERO;
    if (divisor.gt(this.shru(1)))
      return UONE;
    res = UZERO;
  }
  rem = this;
  while (rem.gte(divisor)) {
    approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
    var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
    while (approxRem.isNegative() || approxRem.gt(rem)) {
      approx -= delta;
      approxRes = fromNumber(approx, this.unsigned);
      approxRem = approxRes.mul(divisor);
    }
    if (approxRes.isZero())
      approxRes = ONE;
    res = res.add(approxRes);
    rem = rem.sub(approxRem);
  }
  return res;
};
LongPrototype.div = LongPrototype.divide;
LongPrototype.modulo = function modulo(divisor) {
  if (!isLong(divisor))
    divisor = fromValue(divisor);
  if (wasm) {
    var low = (this.unsigned ? wasm["rem_u"] : wasm["rem_s"])(
      this.low,
      this.high,
      divisor.low,
      divisor.high
    );
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  return this.sub(this.div(divisor).mul(divisor));
};
LongPrototype.mod = LongPrototype.modulo;
LongPrototype.rem = LongPrototype.modulo;
LongPrototype.not = function not() {
  return fromBits(~this.low, ~this.high, this.unsigned);
};
LongPrototype.countLeadingZeros = function countLeadingZeros() {
  return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
};
LongPrototype.clz = LongPrototype.countLeadingZeros;
LongPrototype.countTrailingZeros = function countTrailingZeros() {
  return this.low ? ctz32(this.low) : ctz32(this.high) + 32;
};
LongPrototype.ctz = LongPrototype.countTrailingZeros;
LongPrototype.and = function and(other) {
  if (!isLong(other))
    other = fromValue(other);
  return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};
LongPrototype.or = function or(other) {
  if (!isLong(other))
    other = fromValue(other);
  return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};
LongPrototype.xor = function xor(other) {
  if (!isLong(other))
    other = fromValue(other);
  return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};
LongPrototype.shiftLeft = function shiftLeft(numBits) {
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  else if (numBits < 32)
    return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
  else
    return fromBits(0, this.low << numBits - 32, this.unsigned);
};
LongPrototype.shl = LongPrototype.shiftLeft;
LongPrototype.shiftRight = function shiftRight(numBits) {
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  else if (numBits < 32)
    return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
  else
    return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
LongPrototype.shr = LongPrototype.shiftRight;
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  if (numBits < 32)
    return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >>> numBits, this.unsigned);
  if (numBits === 32)
    return fromBits(this.high, 0, this.unsigned);
  return fromBits(this.high >>> numBits - 32, 0, this.unsigned);
};
LongPrototype.shru = LongPrototype.shiftRightUnsigned;
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
LongPrototype.rotateLeft = function rotateLeft(numBits) {
  var b;
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  if (numBits === 32)
    return fromBits(this.high, this.low, this.unsigned);
  if (numBits < 32) {
    b = 32 - numBits;
    return fromBits(this.low << numBits | this.high >>> b, this.high << numBits | this.low >>> b, this.unsigned);
  }
  numBits -= 32;
  b = 32 - numBits;
  return fromBits(this.high << numBits | this.low >>> b, this.low << numBits | this.high >>> b, this.unsigned);
};
LongPrototype.rotl = LongPrototype.rotateLeft;
LongPrototype.rotateRight = function rotateRight(numBits) {
  var b;
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  if (numBits === 32)
    return fromBits(this.high, this.low, this.unsigned);
  if (numBits < 32) {
    b = 32 - numBits;
    return fromBits(this.high << b | this.low >>> numBits, this.low << b | this.high >>> numBits, this.unsigned);
  }
  numBits -= 32;
  b = 32 - numBits;
  return fromBits(this.low << b | this.high >>> numBits, this.high << b | this.low >>> numBits, this.unsigned);
};
LongPrototype.rotr = LongPrototype.rotateRight;
LongPrototype.toSigned = function toSigned() {
  if (!this.unsigned)
    return this;
  return fromBits(this.low, this.high, false);
};
LongPrototype.toUnsigned = function toUnsigned() {
  if (this.unsigned)
    return this;
  return fromBits(this.low, this.high, true);
};
LongPrototype.toBytes = function toBytes(le) {
  return le ? this.toBytesLE() : this.toBytesBE();
};
LongPrototype.toBytesLE = function toBytesLE() {
  var hi = this.high, lo = this.low;
  return [
    lo & 255,
    lo >>> 8 & 255,
    lo >>> 16 & 255,
    lo >>> 24,
    hi & 255,
    hi >>> 8 & 255,
    hi >>> 16 & 255,
    hi >>> 24
  ];
};
LongPrototype.toBytesBE = function toBytesBE() {
  var hi = this.high, lo = this.low;
  return [
    hi >>> 24,
    hi >>> 16 & 255,
    hi >>> 8 & 255,
    hi & 255,
    lo >>> 24,
    lo >>> 16 & 255,
    lo >>> 8 & 255,
    lo & 255
  ];
};
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
  return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
  return new Long(
    bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24,
    bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24,
    unsigned
  );
};
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
  return new Long(
    bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7],
    bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
    unsigned
  );
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var platform$1 = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
(function(module, exports) {
  (function() {
    var objectTypes = {
      "function": true,
      "object": true
    };
    var root = objectTypes[typeof window] && window || this;
    var freeExports = exports;
    var freeModule = module && !module.nodeType && module;
    var freeGlobal = freeExports && freeModule && typeof commonjsGlobal == "object" && commonjsGlobal;
    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
      root = freeGlobal;
    }
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var reOpera = /\bOpera/;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var toString2 = objectProto.toString;
    function capitalize(string) {
      string = String(string);
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function cleanupOS(os, pattern, label) {
      var data = {
        "10.0": "10",
        "6.4": "10 Technical Preview",
        "6.3": "8.1",
        "6.2": "8",
        "6.1": "Server 2008 R2 / 7",
        "6.0": "Server 2008 / Vista",
        "5.2": "Server 2003 / XP 64-bit",
        "5.1": "XP",
        "5.01": "2000 SP1",
        "5.0": "2000",
        "4.0": "NT",
        "4.90": "ME"
      };
      if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) && (data = data[/[\d.]+$/.exec(os)])) {
        os = "Windows " + data;
      }
      os = String(os);
      if (pattern && label) {
        os = os.replace(RegExp(pattern, "i"), label);
      }
      os = format(
        os.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
      );
      return os;
    }
    function each(object, callback) {
      var index = -1, length = object ? object.length : 0;
      if (typeof length == "number" && length > -1 && length <= maxSafeInteger) {
        while (++index < length) {
          callback(object[index], index, object);
        }
      } else {
        forOwn(object, callback);
      }
    }
    function format(string) {
      string = trim(string);
      return /^(?:webOS|i(?:OS|P))/.test(string) ? string : capitalize(string);
    }
    function forOwn(object, callback) {
      for (var key in object) {
        if (hasOwnProperty.call(object, key)) {
          callback(object[key], key, object);
        }
      }
    }
    function getClassOf(value) {
      return value == null ? capitalize(value) : toString2.call(value).slice(8, -1);
    }
    function isHostType(object, property) {
      var type = object != null ? typeof object[property] : "number";
      return !/^(?:boolean|number|string|undefined)$/.test(type) && (type == "object" ? !!object[property] : true);
    }
    function qualify(string) {
      return String(string).replace(/([ -])(?!$)/g, "$1?");
    }
    function reduce(array, callback) {
      var accumulator = null;
      each(array, function(value, index) {
        accumulator = callback(accumulator, value, index, array);
      });
      return accumulator;
    }
    function trim(string) {
      return String(string).replace(/^ +| +$/g, "");
    }
    function parse(ua) {
      var context = root;
      var isCustomContext = ua && typeof ua == "object" && getClassOf(ua) != "String";
      if (isCustomContext) {
        context = ua;
        ua = null;
      }
      var nav = context.navigator || {};
      var userAgent = nav.userAgent || "";
      ua || (ua = userAgent);
      var likeChrome = isCustomContext ? !!nav.likeChrome : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString2.toString());
      var objectClass = "Object", airRuntimeClass = isCustomContext ? objectClass : "ScriptBridgingProxyObject", enviroClass = isCustomContext ? objectClass : "Environment", javaClass = isCustomContext && context.java ? "JavaPackage" : getClassOf(context.java), phantomClass = isCustomContext ? objectClass : "RuntimeObject";
      var java = /\bJava/.test(javaClass) && context.java;
      var rhino = java && getClassOf(context.environment) == enviroClass;
      var alpha = java ? "a" : "\u03B1";
      var beta = java ? "b" : "\u03B2";
      var doc = context.document || {};
      var opera = context.operamini || context.opera;
      var operaClass = reOpera.test(operaClass = isCustomContext && opera ? opera["[[Class]]"] : getClassOf(opera)) ? operaClass : opera = null;
      var data;
      var arch = ua;
      var description = [];
      var prerelease = null;
      var useFeatures = ua == userAgent;
      var version2 = useFeatures && opera && typeof opera.version == "function" && opera.version();
      var isSpecialCasedOS;
      var layout = getLayout([
        { "label": "EdgeHTML", "pattern": "Edge" },
        "Trident",
        { "label": "WebKit", "pattern": "AppleWebKit" },
        "iCab",
        "Presto",
        "NetFront",
        "Tasman",
        "KHTML",
        "Gecko"
      ]);
      var name = getName([
        "Adobe AIR",
        "Arora",
        "Avant Browser",
        "Breach",
        "Camino",
        "Electron",
        "Epiphany",
        "Fennec",
        "Flock",
        "Galeon",
        "GreenBrowser",
        "iCab",
        "Iceweasel",
        "K-Meleon",
        "Konqueror",
        "Lunascape",
        "Maxthon",
        { "label": "Microsoft Edge", "pattern": "(?:Edge|Edg|EdgA|EdgiOS)" },
        "Midori",
        "Nook Browser",
        "PaleMoon",
        "PhantomJS",
        "Raven",
        "Rekonq",
        "RockMelt",
        { "label": "Samsung Internet", "pattern": "SamsungBrowser" },
        "SeaMonkey",
        { "label": "Silk", "pattern": "(?:Cloud9|Silk-Accelerated)" },
        "Sleipnir",
        "SlimBrowser",
        { "label": "SRWare Iron", "pattern": "Iron" },
        "Sunrise",
        "Swiftfox",
        "Vivaldi",
        "Waterfox",
        "WebPositive",
        { "label": "Yandex Browser", "pattern": "YaBrowser" },
        { "label": "UC Browser", "pattern": "UCBrowser" },
        "Opera Mini",
        { "label": "Opera Mini", "pattern": "OPiOS" },
        "Opera",
        { "label": "Opera", "pattern": "OPR" },
        "Chromium",
        "Chrome",
        { "label": "Chrome", "pattern": "(?:HeadlessChrome)" },
        { "label": "Chrome Mobile", "pattern": "(?:CriOS|CrMo)" },
        { "label": "Firefox", "pattern": "(?:Firefox|Minefield)" },
        { "label": "Firefox for iOS", "pattern": "FxiOS" },
        { "label": "IE", "pattern": "IEMobile" },
        { "label": "IE", "pattern": "MSIE" },
        "Safari"
      ]);
      var product = getProduct([
        { "label": "BlackBerry", "pattern": "BB10" },
        "BlackBerry",
        { "label": "Galaxy S", "pattern": "GT-I9000" },
        { "label": "Galaxy S2", "pattern": "GT-I9100" },
        { "label": "Galaxy S3", "pattern": "GT-I9300" },
        { "label": "Galaxy S4", "pattern": "GT-I9500" },
        { "label": "Galaxy S5", "pattern": "SM-G900" },
        { "label": "Galaxy S6", "pattern": "SM-G920" },
        { "label": "Galaxy S6 Edge", "pattern": "SM-G925" },
        { "label": "Galaxy S7", "pattern": "SM-G930" },
        { "label": "Galaxy S7 Edge", "pattern": "SM-G935" },
        "Google TV",
        "Lumia",
        "iPad",
        "iPod",
        "iPhone",
        "Kindle",
        { "label": "Kindle Fire", "pattern": "(?:Cloud9|Silk-Accelerated)" },
        "Nexus",
        "Nook",
        "PlayBook",
        "PlayStation Vita",
        "PlayStation",
        "TouchPad",
        "Transformer",
        { "label": "Wii U", "pattern": "WiiU" },
        "Wii",
        "Xbox One",
        { "label": "Xbox 360", "pattern": "Xbox" },
        "Xoom"
      ]);
      var manufacturer = getManufacturer({
        "Apple": { "iPad": 1, "iPhone": 1, "iPod": 1 },
        "Alcatel": {},
        "Archos": {},
        "Amazon": { "Kindle": 1, "Kindle Fire": 1 },
        "Asus": { "Transformer": 1 },
        "Barnes & Noble": { "Nook": 1 },
        "BlackBerry": { "PlayBook": 1 },
        "Google": { "Google TV": 1, "Nexus": 1 },
        "HP": { "TouchPad": 1 },
        "HTC": {},
        "Huawei": {},
        "Lenovo": {},
        "LG": {},
        "Microsoft": { "Xbox": 1, "Xbox One": 1 },
        "Motorola": { "Xoom": 1 },
        "Nintendo": { "Wii U": 1, "Wii": 1 },
        "Nokia": { "Lumia": 1 },
        "Oppo": {},
        "Samsung": { "Galaxy S": 1, "Galaxy S2": 1, "Galaxy S3": 1, "Galaxy S4": 1 },
        "Sony": { "PlayStation": 1, "PlayStation Vita": 1 },
        "Xiaomi": { "Mi": 1, "Redmi": 1 }
      });
      var os = getOS([
        "Windows Phone",
        "KaiOS",
        "Android",
        "CentOS",
        { "label": "Chrome OS", "pattern": "CrOS" },
        "Debian",
        { "label": "DragonFly BSD", "pattern": "DragonFly" },
        "Fedora",
        "FreeBSD",
        "Gentoo",
        "Haiku",
        "Kubuntu",
        "Linux Mint",
        "OpenBSD",
        "Red Hat",
        "SuSE",
        "Ubuntu",
        "Xubuntu",
        "Cygwin",
        "Symbian OS",
        "hpwOS",
        "webOS ",
        "webOS",
        "Tablet OS",
        "Tizen",
        "Linux",
        "Mac OS X",
        "Macintosh",
        "Mac",
        "Windows 98;",
        "Windows "
      ]);
      function getLayout(guesses) {
        return reduce(guesses, function(result, guess) {
          return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
        });
      }
      function getManufacturer(guesses) {
        return reduce(guesses, function(result, value, key) {
          return result || (value[product] || value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] || RegExp("\\b" + qualify(key) + "(?:\\b|\\w*\\d)", "i").exec(ua)) && key;
        });
      }
      function getName(guesses) {
        return reduce(guesses, function(result, guess) {
          return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
        });
      }
      function getOS(guesses) {
        return reduce(guesses, function(result, guess) {
          var pattern = guess.pattern || qualify(guess);
          if (!result && (result = RegExp("\\b" + pattern + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(ua))) {
            result = cleanupOS(result, pattern, guess.label || guess);
          }
          return result;
        });
      }
      function getProduct(guesses) {
        return reduce(guesses, function(result, guess) {
          var pattern = guess.pattern || qualify(guess);
          if (!result && (result = RegExp("\\b" + pattern + " *\\d+[.\\w_]*", "i").exec(ua) || RegExp("\\b" + pattern + " *\\w+-[\\w]*", "i").exec(ua) || RegExp("\\b" + pattern + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(ua))) {
            if ((result = String(guess.label && !RegExp(pattern, "i").test(guess.label) ? guess.label : result).split("/"))[1] && !/[\d.]+/.test(result[0])) {
              result[0] += " " + result[1];
            }
            guess = guess.label || guess;
            result = format(result[0].replace(RegExp(pattern, "i"), guess).replace(RegExp("; *(?:" + guess + "[_-])?", "i"), " ").replace(RegExp("(" + guess + ")[-_.]?(\\w)", "i"), "$1 $2"));
          }
          return result;
        });
      }
      function getVersion(patterns) {
        return reduce(patterns, function(result, pattern) {
          return result || (RegExp(pattern + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(ua) || 0)[1] || null;
        });
      }
      function toStringPlatform() {
        return this.description || "";
      }
      layout && (layout = [layout]);
      if (/\bAndroid\b/.test(os) && !product && (data = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(ua))) {
        product = trim(data[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null;
      }
      if (manufacturer && !product) {
        product = getProduct([manufacturer]);
      } else if (manufacturer && product) {
        product = product.replace(RegExp("^(" + qualify(manufacturer) + ")[-_.\\s]", "i"), manufacturer + " ").replace(RegExp("^(" + qualify(manufacturer) + ")[-_.]?(\\w)", "i"), manufacturer + " $2");
      }
      if (data = /\bGoogle TV\b/.exec(product)) {
        product = data[0];
      }
      if (/\bSimulator\b/i.test(ua)) {
        product = (product ? product + " " : "") + "Simulator";
      }
      if (name == "Opera Mini" && /\bOPiOS\b/.test(ua)) {
        description.push("running in Turbo/Uncompressed mode");
      }
      if (name == "IE" && /\blike iPhone OS\b/.test(ua)) {
        data = parse(ua.replace(/like iPhone OS/, ""));
        manufacturer = data.manufacturer;
        product = data.product;
      } else if (/^iP/.test(product)) {
        name || (name = "Safari");
        os = "iOS" + ((data = / OS ([\d_]+)/i.exec(ua)) ? " " + data[1].replace(/_/g, ".") : "");
      } else if (name == "Konqueror" && /^Linux\b/i.test(os)) {
        os = "Kubuntu";
      } else if (manufacturer && manufacturer != "Google" && (/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua) || /\bVita\b/.test(product)) || /\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua)) {
        name = "Android Browser";
        os = /\bAndroid\b/.test(os) ? os : "Android";
      } else if (name == "Silk") {
        if (!/\bMobi/i.test(ua)) {
          os = "Android";
          description.unshift("desktop mode");
        }
        if (/Accelerated *= *true/i.test(ua)) {
          description.unshift("accelerated");
        }
      } else if (name == "UC Browser" && /\bUCWEB\b/.test(ua)) {
        description.push("speed mode");
      } else if (name == "PaleMoon" && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
        description.push("identifying as Firefox " + data[1]);
      } else if (name == "Firefox" && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
        os || (os = "Firefox OS");
        product || (product = data[1]);
      } else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
        if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + "/") + 8))) {
          name = null;
        }
        if ((data = product || manufacturer || os) && (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
          name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + " Browser";
        }
      } else if (name == "Electron" && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
        description.push("Chromium " + data);
      }
      if (!version2) {
        version2 = getVersion([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          qualify(name),
          "(?:Firefox|Minefield|NetFront)"
        ]);
      }
      if (data = layout == "iCab" && parseFloat(version2) > 3 && "WebKit" || /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && "WebKit" || !layout && /\bMSIE\b/i.test(ua) && (os == "Mac OS" ? "Tasman" : "Trident") || layout == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(name) && "NetFront") {
        layout = [data];
      }
      if (name == "IE" && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
        name += " Mobile";
        os = "Windows Phone " + (/\+$/.test(data) ? data : data + ".x");
        description.unshift("desktop mode");
      } else if (/\bWPDesktop\b/i.test(ua)) {
        name = "IE Mobile";
        os = "Windows Phone 8.x";
        description.unshift("desktop mode");
        version2 || (version2 = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
      } else if (name != "IE" && layout == "Trident" && (data = /\brv:([\d.]+)/.exec(ua))) {
        if (name) {
          description.push("identifying as " + name + (version2 ? " " + version2 : ""));
        }
        name = "IE";
        version2 = data[1];
      }
      if (useFeatures) {
        if (isHostType(context, "global")) {
          if (java) {
            data = java.lang.System;
            arch = data.getProperty("os.arch");
            os = os || data.getProperty("os.name") + " " + data.getProperty("os.version");
          }
          if (rhino) {
            try {
              version2 = context.require("ringo/engine").version.join(".");
              name = "RingoJS";
            } catch (e) {
              if ((data = context.system) && data.global.system == context.system) {
                name = "Narwhal";
                os || (os = data[0].os || null);
              }
            }
            if (!name) {
              name = "Rhino";
            }
          } else if (typeof context.process == "object" && !context.process.browser && (data = context.process)) {
            if (typeof data.versions == "object") {
              if (typeof data.versions.electron == "string") {
                description.push("Node " + data.versions.node);
                name = "Electron";
                version2 = data.versions.electron;
              } else if (typeof data.versions.nw == "string") {
                description.push("Chromium " + version2, "Node " + data.versions.node);
                name = "NW.js";
                version2 = data.versions.nw;
              }
            }
            if (!name) {
              name = "Node.js";
              arch = data.arch;
              os = data.platform;
              version2 = /[\d.]+/.exec(data.version);
              version2 = version2 ? version2[0] : null;
            }
          }
        } else if (getClassOf(data = context.runtime) == airRuntimeClass) {
          name = "Adobe AIR";
          os = data.flash.system.Capabilities.os;
        } else if (getClassOf(data = context.phantom) == phantomClass) {
          name = "PhantomJS";
          version2 = (data = data.version || null) && data.major + "." + data.minor + "." + data.patch;
        } else if (typeof doc.documentMode == "number" && (data = /\bTrident\/(\d+)/i.exec(ua))) {
          version2 = [version2, doc.documentMode];
          if ((data = +data[1] + 4) != version2[1]) {
            description.push("IE " + version2[1] + " mode");
            layout && (layout[1] = "");
            version2[1] = data;
          }
          version2 = name == "IE" ? String(version2[1].toFixed(1)) : version2[0];
        } else if (typeof doc.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(name)) {
          description.push("masking as " + name + " " + version2);
          name = "IE";
          version2 = "11.0";
          layout = ["Trident"];
          os = "Windows";
        }
        os = os && format(os);
      }
      if (version2 && (data = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version2) || /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ";" + (useFeatures && nav.appMinorVersion)) || /\bMinefield\b/i.test(ua) && "a")) {
        prerelease = /b/i.test(data) ? "beta" : "alpha";
        version2 = version2.replace(RegExp(data + "\\+?$"), "") + (prerelease == "beta" ? beta : alpha) + (/\d+\+?/.exec(data) || "");
      }
      if (name == "Fennec" || name == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(os)) {
        name = "Firefox Mobile";
      } else if (name == "Maxthon" && version2) {
        version2 = version2.replace(/\.[\d.]+/, ".x");
      } else if (/\bXbox\b/i.test(product)) {
        if (product == "Xbox 360") {
          os = null;
        }
        if (product == "Xbox 360" && /\bIEMobile\b/.test(ua)) {
          description.unshift("mobile mode");
        }
      } else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) && (os == "Windows CE" || /Mobi/i.test(ua))) {
        name += " Mobile";
      } else if (name == "IE" && useFeatures) {
        try {
          if (context.external === null) {
            description.unshift("platform preview");
          }
        } catch (e) {
          description.unshift("embedded");
        }
      } else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data = (RegExp(product.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(ua) || 0)[1] || version2)) {
        data = [data, /BB10/.test(ua)];
        os = (data[1] ? (product = null, manufacturer = "BlackBerry") : "Device Software") + " " + data[0];
        version2 = null;
      } else if (this != forOwn && product != "Wii" && (useFeatures && opera || /Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua) || name == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(os) || name == "IE" && (os && !/^Win/.test(os) && version2 > 5.5 || /\bWindows XP\b/.test(os) && version2 > 8 || version2 == 8 && !/\bTrident\b/.test(ua))) && !reOpera.test(data = parse.call(forOwn, ua.replace(reOpera, "") + ";")) && data.name) {
        data = "ing as " + data.name + ((data = data.version) ? " " + data : "");
        if (reOpera.test(name)) {
          if (/\bIE\b/.test(data) && os == "Mac OS") {
            os = null;
          }
          data = "identify" + data;
        } else {
          data = "mask" + data;
          if (operaClass) {
            name = format(operaClass.replace(/([a-z])([A-Z])/g, "$1 $2"));
          } else {
            name = "Opera";
          }
          if (/\bIE\b/.test(data)) {
            os = null;
          }
          if (!useFeatures) {
            version2 = null;
          }
        }
        layout = ["Presto"];
        description.push(data);
      }
      if (data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1]) {
        data = [parseFloat(data.replace(/\.(\d)$/, ".0$1")), data];
        if (name == "Safari" && data[1].slice(-1) == "+") {
          name = "WebKit Nightly";
          prerelease = "alpha";
          version2 = data[1].slice(0, -1);
        } else if (version2 == data[1] || version2 == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
          version2 = null;
        }
        data[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(ua) || 0)[1];
        if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == "WebKit") {
          layout = ["Blink"];
        }
        if (!useFeatures || !likeChrome && !data[1]) {
          layout && (layout[1] = "like Safari");
          data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? "4+" : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : data < 602 ? 9 : data < 604 ? 10 : data < 606 ? 11 : data < 608 ? 12 : "12");
        } else {
          layout && (layout[1] = "like Chrome");
          data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.1 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.3 ? 11 : data < 535.01 ? 12 : data < 535.02 ? "13+" : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.1 ? 19 : data < 537.01 ? 20 : data < 537.11 ? "21+" : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != "Blink" ? "27" : "28");
        }
        layout && (layout[1] += " " + (data += typeof data == "number" ? ".x" : /[.+]/.test(data) ? "" : "+"));
        if (name == "Safari" && (!version2 || parseInt(version2) > 45)) {
          version2 = data;
        } else if (name == "Chrome" && /\bHeadlessChrome/i.test(ua)) {
          description.unshift("headless");
        }
      }
      if (name == "Opera" && (data = /\bzbov|zvav$/.exec(os))) {
        name += " ";
        description.unshift("desktop mode");
        if (data == "zvav") {
          name += "Mini";
          version2 = null;
        } else {
          name += "Mobile";
        }
        os = os.replace(RegExp(" *" + data + "$"), "");
      } else if (name == "Safari" && /\bChrome\b/.exec(layout && layout[1])) {
        description.unshift("desktop mode");
        name = "Chrome Mobile";
        version2 = null;
        if (/\bOS X\b/.test(os)) {
          manufacturer = "Apple";
          os = "iOS 4.3+";
        } else {
          os = null;
        }
      } else if (/\bSRWare Iron\b/.test(name) && !version2) {
        version2 = getVersion("Chrome");
      }
      if (version2 && version2.indexOf(data = /[\d.]+$/.exec(os)) == 0 && ua.indexOf("/" + data + "-") > -1) {
        os = trim(os.replace(data, ""));
      }
      if (os && os.indexOf(name) != -1 && !RegExp(name + " OS").test(os)) {
        os = os.replace(RegExp(" *" + qualify(name) + " *"), "");
      }
      if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (/Browser|Lunascape|Maxthon/.test(name) || name != "Safari" && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(name) && layout[1])) {
        (data = layout[layout.length - 1]) && description.push(data);
      }
      if (description.length) {
        description = ["(" + description.join("; ") + ")"];
      }
      if (manufacturer && product && product.indexOf(manufacturer) < 0) {
        description.push("on " + manufacturer);
      }
      if (product) {
        description.push((/^on /.test(description[description.length - 1]) ? "" : "on ") + product);
      }
      if (os) {
        data = / ([\d.+]+)$/.exec(os);
        isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == "/";
        os = {
          "architecture": 32,
          "family": data && !isSpecialCasedOS ? os.replace(data[0], "") : os,
          "version": data ? data[1] : null,
          "toString": function() {
            var version3 = this.version;
            return this.family + (version3 && !isSpecialCasedOS ? " " + version3 : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        };
      }
      if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
        if (os) {
          os.architecture = 64;
          os.family = os.family.replace(RegExp(" *" + data), "");
        }
        if (name && (/\bWOW64\b/i.test(ua) || useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua))) {
          description.unshift("32-bit");
        }
      } else if (os && /^OS X/.test(os.family) && name == "Chrome" && parseFloat(version2) >= 39) {
        os.architecture = 64;
      }
      ua || (ua = null);
      var platform3 = {};
      platform3.description = ua;
      platform3.layout = layout && layout[0];
      platform3.manufacturer = manufacturer;
      platform3.name = name;
      platform3.prerelease = prerelease;
      platform3.product = product;
      platform3.ua = ua;
      platform3.version = name && version2;
      platform3.os = os || {
        "architecture": null,
        "family": null,
        "version": null,
        "toString": function() {
          return "null";
        }
      };
      platform3.parse = parse;
      platform3.toString = toStringPlatform;
      if (platform3.version) {
        description.unshift(version2);
      }
      if (platform3.name) {
        description.unshift(name);
      }
      if (os && name && !(os == String(os).split(" ")[0] && (os == name.split(" ")[0] || product))) {
        description.push(product ? "(" + os + ")" : "on " + os);
      }
      if (description.length) {
        platform3.description = description.join(" ");
      }
      return platform3;
    }
    var platform2 = parse();
    if (freeExports && freeModule) {
      forOwn(platform2, function(value, key) {
        freeExports[key] = value;
      });
    } else {
      root.platform = platform2;
    }
  }).call(commonjsGlobal);
})(platform$1, platform$1.exports);
const platform = platform$1.exports;
const toT = (obj) => obj;
var minimal$1 = { exports: {} };
var indexMinimal = {};
var minimal = {};
var aspromise = asPromise;
function asPromise(fn, ctx) {
  var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
  while (index < arguments.length)
    params[offset++] = arguments[index++];
  return new Promise(function executor(resolve, reject) {
    params[offset] = function callback(err) {
      if (pending) {
        pending = false;
        if (err)
          reject(err);
        else {
          var params2 = new Array(arguments.length - 1), offset2 = 0;
          while (offset2 < params2.length)
            params2[offset2++] = arguments[offset2];
          resolve.apply(null, params2);
        }
      }
    };
    try {
      fn.apply(ctx || null, params);
    } catch (err) {
      if (pending) {
        pending = false;
        reject(err);
      }
    }
  });
}
var base64$1 = {};
(function(exports) {
  var base642 = exports;
  base642.length = function length(string) {
    var p = string.length;
    if (!p)
      return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
      ++n;
    return Math.ceil(string.length * 3) / 4 - n;
  };
  var b64 = new Array(64);
  var s64 = new Array(123);
  for (var i = 0; i < 64; )
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
  base642.encode = function encode(buffer, start, end2) {
    var parts = null, chunk = [];
    var i2 = 0, j = 0, t;
    while (start < end2) {
      var b = buffer[start++];
      switch (j) {
        case 0:
          chunk[i2++] = b64[b >> 2];
          t = (b & 3) << 4;
          j = 1;
          break;
        case 1:
          chunk[i2++] = b64[t | b >> 4];
          t = (b & 15) << 2;
          j = 2;
          break;
        case 2:
          chunk[i2++] = b64[t | b >> 6];
          chunk[i2++] = b64[b & 63];
          j = 0;
          break;
      }
      if (i2 > 8191) {
        (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
        i2 = 0;
      }
    }
    if (j) {
      chunk[i2++] = b64[t];
      chunk[i2++] = 61;
      if (j === 1)
        chunk[i2++] = 61;
    }
    if (parts) {
      if (i2)
        parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
      return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i2));
  };
  var invalidEncoding = "invalid encoding";
  base642.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, t;
    for (var i2 = 0; i2 < string.length; ) {
      var c = string.charCodeAt(i2++);
      if (c === 61 && j > 1)
        break;
      if ((c = s64[c]) === void 0)
        throw Error(invalidEncoding);
      switch (j) {
        case 0:
          t = c;
          j = 1;
          break;
        case 1:
          buffer[offset++] = t << 2 | (c & 48) >> 4;
          t = c;
          j = 2;
          break;
        case 2:
          buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
          t = c;
          j = 3;
          break;
        case 3:
          buffer[offset++] = (t & 3) << 6 | c;
          j = 0;
          break;
      }
    }
    if (j === 1)
      throw Error(invalidEncoding);
    return offset - start;
  };
  base642.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
  };
})(base64$1);
var eventemitter = EventEmitter;
function EventEmitter() {
  this._listeners = {};
}
EventEmitter.prototype.on = function on(evt, fn, ctx) {
  (this._listeners[evt] || (this._listeners[evt] = [])).push({
    fn,
    ctx: ctx || this
  });
  return this;
};
EventEmitter.prototype.off = function off(evt, fn) {
  if (evt === void 0)
    this._listeners = {};
  else {
    if (fn === void 0)
      this._listeners[evt] = [];
    else {
      var listeners = this._listeners[evt];
      for (var i = 0; i < listeners.length; )
        if (listeners[i].fn === fn)
          listeners.splice(i, 1);
        else
          ++i;
    }
  }
  return this;
};
EventEmitter.prototype.emit = function emit(evt) {
  var listeners = this._listeners[evt];
  if (listeners) {
    var args = [], i = 1;
    for (; i < arguments.length; )
      args.push(arguments[i++]);
    for (i = 0; i < listeners.length; )
      listeners[i].fn.apply(listeners[i++].ctx, args);
  }
  return this;
};
var float = factory(factory);
function factory(exports) {
  if (typeof Float32Array !== "undefined")
    (function() {
      var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
      function writeFloat_f32_cpy(val, buf, pos) {
        f32[0] = val;
        buf[pos] = f8b[0];
        buf[pos + 1] = f8b[1];
        buf[pos + 2] = f8b[2];
        buf[pos + 3] = f8b[3];
      }
      function writeFloat_f32_rev(val, buf, pos) {
        f32[0] = val;
        buf[pos] = f8b[3];
        buf[pos + 1] = f8b[2];
        buf[pos + 2] = f8b[1];
        buf[pos + 3] = f8b[0];
      }
      exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
      exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
      function readFloat_f32_cpy(buf, pos) {
        f8b[0] = buf[pos];
        f8b[1] = buf[pos + 1];
        f8b[2] = buf[pos + 2];
        f8b[3] = buf[pos + 3];
        return f32[0];
      }
      function readFloat_f32_rev(buf, pos) {
        f8b[3] = buf[pos];
        f8b[2] = buf[pos + 1];
        f8b[1] = buf[pos + 2];
        f8b[0] = buf[pos + 3];
        return f32[0];
      }
      exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
      exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
    })();
  else
    (function() {
      function writeFloat_ieee754(writeUint, val, buf, pos) {
        var sign = val < 0 ? 1 : 0;
        if (sign)
          val = -val;
        if (val === 0)
          writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
        else if (isNaN(val))
          writeUint(2143289344, buf, pos);
        else if (val > 34028234663852886e22)
          writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
        else if (val < 11754943508222875e-54)
          writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
        else {
          var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
          writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
        }
      }
      exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
      exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
      function readFloat_ieee754(readUint, buf, pos) {
        var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
        return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
      }
      exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
      exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
    })();
  if (typeof Float64Array !== "undefined")
    (function() {
      var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
      function writeDouble_f64_cpy(val, buf, pos) {
        f64[0] = val;
        buf[pos] = f8b[0];
        buf[pos + 1] = f8b[1];
        buf[pos + 2] = f8b[2];
        buf[pos + 3] = f8b[3];
        buf[pos + 4] = f8b[4];
        buf[pos + 5] = f8b[5];
        buf[pos + 6] = f8b[6];
        buf[pos + 7] = f8b[7];
      }
      function writeDouble_f64_rev(val, buf, pos) {
        f64[0] = val;
        buf[pos] = f8b[7];
        buf[pos + 1] = f8b[6];
        buf[pos + 2] = f8b[5];
        buf[pos + 3] = f8b[4];
        buf[pos + 4] = f8b[3];
        buf[pos + 5] = f8b[2];
        buf[pos + 6] = f8b[1];
        buf[pos + 7] = f8b[0];
      }
      exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
      exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
      function readDouble_f64_cpy(buf, pos) {
        f8b[0] = buf[pos];
        f8b[1] = buf[pos + 1];
        f8b[2] = buf[pos + 2];
        f8b[3] = buf[pos + 3];
        f8b[4] = buf[pos + 4];
        f8b[5] = buf[pos + 5];
        f8b[6] = buf[pos + 6];
        f8b[7] = buf[pos + 7];
        return f64[0];
      }
      function readDouble_f64_rev(buf, pos) {
        f8b[7] = buf[pos];
        f8b[6] = buf[pos + 1];
        f8b[5] = buf[pos + 2];
        f8b[4] = buf[pos + 3];
        f8b[3] = buf[pos + 4];
        f8b[2] = buf[pos + 5];
        f8b[1] = buf[pos + 6];
        f8b[0] = buf[pos + 7];
        return f64[0];
      }
      exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
      exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
    })();
  else
    (function() {
      function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
        var sign = val < 0 ? 1 : 0;
        if (sign)
          val = -val;
        if (val === 0) {
          writeUint(0, buf, pos + off0);
          writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
        } else if (isNaN(val)) {
          writeUint(0, buf, pos + off0);
          writeUint(2146959360, buf, pos + off1);
        } else if (val > 17976931348623157e292) {
          writeUint(0, buf, pos + off0);
          writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
        } else {
          var mantissa;
          if (val < 22250738585072014e-324) {
            mantissa = val / 5e-324;
            writeUint(mantissa >>> 0, buf, pos + off0);
            writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
          } else {
            var exponent = Math.floor(Math.log(val) / Math.LN2);
            if (exponent === 1024)
              exponent = 1023;
            mantissa = val * Math.pow(2, -exponent);
            writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
            writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
          }
        }
      }
      exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
      exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
      function readDouble_ieee754(readUint, off0, off1, buf, pos) {
        var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
        var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
        return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
      }
      exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
      exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
    })();
  return exports;
}
function writeUintLE(val, buf, pos) {
  buf[pos] = val & 255;
  buf[pos + 1] = val >>> 8 & 255;
  buf[pos + 2] = val >>> 16 & 255;
  buf[pos + 3] = val >>> 24;
}
function writeUintBE(val, buf, pos) {
  buf[pos] = val >>> 24;
  buf[pos + 1] = val >>> 16 & 255;
  buf[pos + 2] = val >>> 8 & 255;
  buf[pos + 3] = val & 255;
}
function readUintLE(buf, pos) {
  return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
}
function readUintBE(buf, pos) {
  return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
}
var inquire_1 = inquire;
function inquire(moduleName) {
  try {
    var mod = eval("quire".replace(/^/, "re"))(moduleName);
    if (mod && (mod.length || Object.keys(mod).length))
      return mod;
  } catch (e) {
  }
  return null;
}
var utf8$2 = {};
(function(exports) {
  var utf82 = exports;
  utf82.length = function utf8_length(string) {
    var len = 0, c = 0;
    for (var i = 0; i < string.length; ++i) {
      c = string.charCodeAt(i);
      if (c < 128)
        len += 1;
      else if (c < 2048)
        len += 2;
      else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
        ++i;
        len += 4;
      } else
        len += 3;
    }
    return len;
  };
  utf82.read = function utf8_read(buffer, start, end2) {
    var len = end2 - start;
    if (len < 1)
      return "";
    var parts = null, chunk = [], i = 0, t;
    while (start < end2) {
      t = buffer[start++];
      if (t < 128)
        chunk[i++] = t;
      else if (t > 191 && t < 224)
        chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
      else if (t > 239 && t < 365) {
        t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
        chunk[i++] = 55296 + (t >> 10);
        chunk[i++] = 56320 + (t & 1023);
      } else
        chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
      if (i > 8191) {
        (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
        i = 0;
      }
    }
    if (parts) {
      if (i)
        parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
      return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
  };
  utf82.write = function utf8_write(string, buffer, offset) {
    var start = offset, c1, c2;
    for (var i = 0; i < string.length; ++i) {
      c1 = string.charCodeAt(i);
      if (c1 < 128) {
        buffer[offset++] = c1;
      } else if (c1 < 2048) {
        buffer[offset++] = c1 >> 6 | 192;
        buffer[offset++] = c1 & 63 | 128;
      } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
        c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
        ++i;
        buffer[offset++] = c1 >> 18 | 240;
        buffer[offset++] = c1 >> 12 & 63 | 128;
        buffer[offset++] = c1 >> 6 & 63 | 128;
        buffer[offset++] = c1 & 63 | 128;
      } else {
        buffer[offset++] = c1 >> 12 | 224;
        buffer[offset++] = c1 >> 6 & 63 | 128;
        buffer[offset++] = c1 & 63 | 128;
      }
    }
    return offset - start;
  };
})(utf8$2);
var pool_1 = pool;
function pool(alloc2, slice, size) {
  var SIZE = size || 8192;
  var MAX = SIZE >>> 1;
  var slab = null;
  var offset = SIZE;
  return function pool_alloc(size2) {
    if (size2 < 1 || size2 > MAX)
      return alloc2(size2);
    if (offset + size2 > SIZE) {
      slab = alloc2(SIZE);
      offset = 0;
    }
    var buf = slice.call(slab, offset, offset += size2);
    if (offset & 7)
      offset = (offset | 7) + 1;
    return buf;
  };
}
var longbits;
var hasRequiredLongbits;
function requireLongbits() {
  if (hasRequiredLongbits)
    return longbits;
  hasRequiredLongbits = 1;
  longbits = LongBits2;
  var util2 = requireMinimal();
  function LongBits2(lo, hi) {
    this.lo = lo >>> 0;
    this.hi = hi >>> 0;
  }
  var zero = LongBits2.zero = new LongBits2(0, 0);
  zero.toNumber = function() {
    return 0;
  };
  zero.zzEncode = zero.zzDecode = function() {
    return this;
  };
  zero.length = function() {
    return 1;
  };
  var zeroHash = LongBits2.zeroHash = "\0\0\0\0\0\0\0\0";
  LongBits2.fromNumber = function fromNumber2(value) {
    if (value === 0)
      return zero;
    var sign = value < 0;
    if (sign)
      value = -value;
    var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
      hi = ~hi >>> 0;
      lo = ~lo >>> 0;
      if (++lo > 4294967295) {
        lo = 0;
        if (++hi > 4294967295)
          hi = 0;
      }
    }
    return new LongBits2(lo, hi);
  };
  LongBits2.from = function from(value) {
    if (typeof value === "number")
      return LongBits2.fromNumber(value);
    if (util2.isString(value)) {
      if (util2.Long)
        value = util2.Long.fromString(value);
      else
        return LongBits2.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits2(value.low >>> 0, value.high >>> 0) : zero;
  };
  LongBits2.prototype.toNumber = function toNumber2(unsigned) {
    if (!unsigned && this.hi >>> 31) {
      var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
      if (!lo)
        hi = hi + 1 >>> 0;
      return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
  };
  LongBits2.prototype.toLong = function toLong(unsigned) {
    return util2.Long ? new util2.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
  };
  var charCodeAt = String.prototype.charCodeAt;
  LongBits2.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
      return zero;
    return new LongBits2(
      (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
      (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
    );
  };
  LongBits2.prototype.toHash = function toHash() {
    return String.fromCharCode(
      this.lo & 255,
      this.lo >>> 8 & 255,
      this.lo >>> 16 & 255,
      this.lo >>> 24,
      this.hi & 255,
      this.hi >>> 8 & 255,
      this.hi >>> 16 & 255,
      this.hi >>> 24
    );
  };
  LongBits2.prototype.zzEncode = function zzEncode() {
    var mask = this.hi >> 31;
    this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo = (this.lo << 1 ^ mask) >>> 0;
    return this;
  };
  LongBits2.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi = (this.hi >>> 1 ^ mask) >>> 0;
    return this;
  };
  LongBits2.prototype.length = function length() {
    var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
    return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
  };
  return longbits;
}
var hasRequiredMinimal;
function requireMinimal() {
  if (hasRequiredMinimal)
    return minimal;
  hasRequiredMinimal = 1;
  (function(exports) {
    var util2 = exports;
    util2.asPromise = aspromise;
    util2.base64 = base64$1;
    util2.EventEmitter = eventemitter;
    util2.float = float;
    util2.inquire = inquire_1;
    util2.utf8 = utf8$2;
    util2.pool = pool_1;
    util2.LongBits = requireLongbits();
    util2.isNode = Boolean(typeof commonjsGlobal !== "undefined" && commonjsGlobal && commonjsGlobal.process && commonjsGlobal.process.versions && commonjsGlobal.process.versions.node);
    util2.global = util2.isNode && commonjsGlobal || typeof window !== "undefined" && window || typeof self !== "undefined" && self || commonjsGlobal;
    util2.emptyArray = Object.freeze ? Object.freeze([]) : [];
    util2.emptyObject = Object.freeze ? Object.freeze({}) : {};
    util2.isInteger = Number.isInteger || function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util2.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util2.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util2.isset = util2.isSet = function isSet2(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util2.Buffer = function() {
      try {
        var Buffer2 = util2.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : null;
      } catch (e) {
        return null;
      }
    }();
    util2._Buffer_from = null;
    util2._Buffer_allocUnsafe = null;
    util2.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util2.Buffer ? util2._Buffer_allocUnsafe(sizeOrArray) : new util2.Array(sizeOrArray) : util2.Buffer ? util2._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util2.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util2.Long = util2.global.dcodeIO && util2.global.dcodeIO.Long || util2.global.Long || util2.inquire("long");
    util2.key2Re = /^true|false|0|1$/;
    util2.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util2.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util2.longToHash = function longToHash(value) {
      return value ? util2.LongBits.from(value).toHash() : util2.LongBits.zeroHash;
    };
    util2.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util2.LongBits.fromHash(hash);
      if (util2.Long)
        return util2.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src, ifNotSet) {
      for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src[keys[i]];
      return dst;
    }
    util2.merge = merge;
    util2.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge(this, properties);
      }
      (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
      Object.defineProperty(CustomError.prototype, "name", { get: function() {
        return name;
      } });
      CustomError.prototype.toString = function toString2() {
        return this.name + ": " + this.message;
      };
      return CustomError;
    }
    util2.newError = newError;
    util2.ProtocolError = newError("ProtocolError");
    util2.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util2.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util2.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util2._configure = function() {
      var Buffer2 = util2.Buffer;
      if (!Buffer2) {
        util2._Buffer_from = util2._Buffer_allocUnsafe = null;
        return;
      }
      util2._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util2._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  })(minimal);
  return minimal;
}
var writer = Writer$1;
var util$4 = requireMinimal();
var BufferWriter$1;
var LongBits$1 = util$4.LongBits, base64 = util$4.base64, utf8$1 = util$4.utf8;
function Op(fn, len, val) {
  this.fn = fn;
  this.len = len;
  this.next = void 0;
  this.val = val;
}
function noop() {
}
function State(writer2) {
  this.head = writer2.head;
  this.tail = writer2.tail;
  this.len = writer2.len;
  this.next = writer2.states;
}
function Writer$1() {
  this.len = 0;
  this.head = new Op(noop, 0, 0);
  this.tail = this.head;
  this.states = null;
}
var create$1 = function create2() {
  return util$4.Buffer ? function create_buffer_setup() {
    return (Writer$1.create = function create_buffer() {
      return new BufferWriter$1();
    })();
  } : function create_array3() {
    return new Writer$1();
  };
};
Writer$1.create = create$1();
Writer$1.alloc = function alloc(size) {
  return new util$4.Array(size);
};
if (util$4.Array !== Array)
  Writer$1.alloc = util$4.pool(Writer$1.alloc, util$4.Array.prototype.subarray);
Writer$1.prototype._push = function push(fn, len, val) {
  this.tail = this.tail.next = new Op(fn, len, val);
  this.len += len;
  return this;
};
function writeByte(val, buf, pos) {
  buf[pos] = val & 255;
}
function writeVarint32(val, buf, pos) {
  while (val > 127) {
    buf[pos++] = val & 127 | 128;
    val >>>= 7;
  }
  buf[pos] = val;
}
function VarintOp(len, val) {
  this.len = len;
  this.next = void 0;
  this.val = val;
}
VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;
Writer$1.prototype.uint32 = function write_uint32(value) {
  this.len += (this.tail = this.tail.next = new VarintOp(
    (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
    value
  )).len;
  return this;
};
Writer$1.prototype.int32 = function write_int32(value) {
  return value < 0 ? this._push(writeVarint64, 10, LongBits$1.fromNumber(value)) : this.uint32(value);
};
Writer$1.prototype.sint32 = function write_sint32(value) {
  return this.uint32((value << 1 ^ value >> 31) >>> 0);
};
function writeVarint64(val, buf, pos) {
  while (val.hi) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
    val.hi >>>= 7;
  }
  while (val.lo > 127) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = val.lo >>> 7;
  }
  buf[pos++] = val.lo;
}
Writer$1.prototype.uint64 = function write_uint64(value) {
  var bits = LongBits$1.from(value);
  return this._push(writeVarint64, bits.length(), bits);
};
Writer$1.prototype.int64 = Writer$1.prototype.uint64;
Writer$1.prototype.sint64 = function write_sint64(value) {
  var bits = LongBits$1.from(value).zzEncode();
  return this._push(writeVarint64, bits.length(), bits);
};
Writer$1.prototype.bool = function write_bool(value) {
  return this._push(writeByte, 1, value ? 1 : 0);
};
function writeFixed32(val, buf, pos) {
  buf[pos] = val & 255;
  buf[pos + 1] = val >>> 8 & 255;
  buf[pos + 2] = val >>> 16 & 255;
  buf[pos + 3] = val >>> 24;
}
Writer$1.prototype.fixed32 = function write_fixed32(value) {
  return this._push(writeFixed32, 4, value >>> 0);
};
Writer$1.prototype.sfixed32 = Writer$1.prototype.fixed32;
Writer$1.prototype.fixed64 = function write_fixed64(value) {
  var bits = LongBits$1.from(value);
  return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};
Writer$1.prototype.sfixed64 = Writer$1.prototype.fixed64;
Writer$1.prototype.float = function write_float(value) {
  return this._push(util$4.float.writeFloatLE, 4, value);
};
Writer$1.prototype.double = function write_double(value) {
  return this._push(util$4.float.writeDoubleLE, 8, value);
};
var writeBytes = util$4.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
  buf.set(val, pos);
} : function writeBytes_for(val, buf, pos) {
  for (var i = 0; i < val.length; ++i)
    buf[pos + i] = val[i];
};
Writer$1.prototype.bytes = function write_bytes(value) {
  var len = value.length >>> 0;
  if (!len)
    return this._push(writeByte, 1, 0);
  if (util$4.isString(value)) {
    var buf = Writer$1.alloc(len = base64.length(value));
    base64.decode(value, buf, 0);
    value = buf;
  }
  return this.uint32(len)._push(writeBytes, len, value);
};
Writer$1.prototype.string = function write_string(value) {
  var len = utf8$1.length(value);
  return len ? this.uint32(len)._push(utf8$1.write, len, value) : this._push(writeByte, 1, 0);
};
Writer$1.prototype.fork = function fork() {
  this.states = new State(this);
  this.head = this.tail = new Op(noop, 0, 0);
  this.len = 0;
  return this;
};
Writer$1.prototype.reset = function reset() {
  if (this.states) {
    this.head = this.states.head;
    this.tail = this.states.tail;
    this.len = this.states.len;
    this.states = this.states.next;
  } else {
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
  }
  return this;
};
Writer$1.prototype.ldelim = function ldelim() {
  var head = this.head, tail = this.tail, len = this.len;
  this.reset().uint32(len);
  if (len) {
    this.tail.next = head.next;
    this.tail = tail;
    this.len += len;
  }
  return this;
};
Writer$1.prototype.finish = function finish() {
  var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
  while (head) {
    head.fn(head.val, buf, pos);
    pos += head.len;
    head = head.next;
  }
  return buf;
};
Writer$1._configure = function(BufferWriter_) {
  BufferWriter$1 = BufferWriter_;
  Writer$1.create = create$1();
  BufferWriter$1._configure();
};
var writer_buffer = BufferWriter;
var Writer = writer;
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
var util$3 = requireMinimal();
function BufferWriter() {
  Writer.call(this);
}
BufferWriter._configure = function() {
  BufferWriter.alloc = util$3._Buffer_allocUnsafe;
  BufferWriter.writeBytesBuffer = util$3.Buffer && util$3.Buffer.prototype instanceof Uint8Array && util$3.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
    buf.set(val, pos);
  } : function writeBytesBuffer_copy(val, buf, pos) {
    if (val.copy)
      val.copy(buf, pos, 0, val.length);
    else
      for (var i = 0; i < val.length; )
        buf[pos++] = val[i++];
  };
};
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
  if (util$3.isString(value))
    value = util$3._Buffer_from(value, "base64");
  var len = value.length >>> 0;
  this.uint32(len);
  if (len)
    this._push(BufferWriter.writeBytesBuffer, len, value);
  return this;
};
function writeStringBuffer(val, buf, pos) {
  if (val.length < 40)
    util$3.utf8.write(val, buf, pos);
  else if (buf.utf8Write)
    buf.utf8Write(val, pos);
  else
    buf.write(val, pos);
}
BufferWriter.prototype.string = function write_string_buffer(value) {
  var len = util$3.Buffer.byteLength(value);
  this.uint32(len);
  if (len)
    this._push(writeStringBuffer, len, value);
  return this;
};
BufferWriter._configure();
var reader = Reader$1;
var util$2 = requireMinimal();
var BufferReader$1;
var LongBits = util$2.LongBits, utf8 = util$2.utf8;
function indexOutOfRange(reader2, writeLength) {
  return RangeError("index out of range: " + reader2.pos + " + " + (writeLength || 1) + " > " + reader2.len);
}
function Reader$1(buffer) {
  this.buf = buffer;
  this.pos = 0;
  this.len = buffer.length;
}
var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
  if (buffer instanceof Uint8Array || Array.isArray(buffer))
    return new Reader$1(buffer);
  throw Error("illegal buffer");
} : function create_array2(buffer) {
  if (Array.isArray(buffer))
    return new Reader$1(buffer);
  throw Error("illegal buffer");
};
var create = function create3() {
  return util$2.Buffer ? function create_buffer_setup(buffer) {
    return (Reader$1.create = function create_buffer(buffer2) {
      return util$2.Buffer.isBuffer(buffer2) ? new BufferReader$1(buffer2) : create_array(buffer2);
    })(buffer);
  } : create_array;
};
Reader$1.create = create();
Reader$1.prototype._slice = util$2.Array.prototype.subarray || util$2.Array.prototype.slice;
Reader$1.prototype.uint32 = function read_uint32_setup() {
  var value = 4294967295;
  return function read_uint32() {
    value = (this.buf[this.pos] & 127) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    if ((this.pos += 5) > this.len) {
      this.pos = this.len;
      throw indexOutOfRange(this, 10);
    }
    return value;
  };
}();
Reader$1.prototype.int32 = function read_int32() {
  return this.uint32() | 0;
};
Reader$1.prototype.sint32 = function read_sint32() {
  var value = this.uint32();
  return value >>> 1 ^ -(value & 1) | 0;
};
function readLongVarint() {
  var bits = new LongBits(0, 0);
  var i = 0;
  if (this.len - this.pos > 4) {
    for (; i < 4; ++i) {
      bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
    bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
    bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
    if (this.buf[this.pos++] < 128)
      return bits;
    i = 0;
  } else {
    for (; i < 3; ++i) {
      if (this.pos >= this.len)
        throw indexOutOfRange(this);
      bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
    bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
    return bits;
  }
  if (this.len - this.pos > 4) {
    for (; i < 5; ++i) {
      bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
  } else {
    for (; i < 5; ++i) {
      if (this.pos >= this.len)
        throw indexOutOfRange(this);
      bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
  }
  throw Error("invalid varint encoding");
}
Reader$1.prototype.bool = function read_bool() {
  return this.uint32() !== 0;
};
function readFixed32_end(buf, end2) {
  return (buf[end2 - 4] | buf[end2 - 3] << 8 | buf[end2 - 2] << 16 | buf[end2 - 1] << 24) >>> 0;
}
Reader$1.prototype.fixed32 = function read_fixed32() {
  if (this.pos + 4 > this.len)
    throw indexOutOfRange(this, 4);
  return readFixed32_end(this.buf, this.pos += 4);
};
Reader$1.prototype.sfixed32 = function read_sfixed32() {
  if (this.pos + 4 > this.len)
    throw indexOutOfRange(this, 4);
  return readFixed32_end(this.buf, this.pos += 4) | 0;
};
function readFixed64() {
  if (this.pos + 8 > this.len)
    throw indexOutOfRange(this, 8);
  return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}
Reader$1.prototype.float = function read_float() {
  if (this.pos + 4 > this.len)
    throw indexOutOfRange(this, 4);
  var value = util$2.float.readFloatLE(this.buf, this.pos);
  this.pos += 4;
  return value;
};
Reader$1.prototype.double = function read_double() {
  if (this.pos + 8 > this.len)
    throw indexOutOfRange(this, 4);
  var value = util$2.float.readDoubleLE(this.buf, this.pos);
  this.pos += 8;
  return value;
};
Reader$1.prototype.bytes = function read_bytes() {
  var length = this.uint32(), start = this.pos, end2 = this.pos + length;
  if (end2 > this.len)
    throw indexOutOfRange(this, length);
  this.pos += length;
  if (Array.isArray(this.buf))
    return this.buf.slice(start, end2);
  return start === end2 ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end2);
};
Reader$1.prototype.string = function read_string() {
  var bytes = this.bytes();
  return utf8.read(bytes, 0, bytes.length);
};
Reader$1.prototype.skip = function skip(length) {
  if (typeof length === "number") {
    if (this.pos + length > this.len)
      throw indexOutOfRange(this, length);
    this.pos += length;
  } else {
    do {
      if (this.pos >= this.len)
        throw indexOutOfRange(this);
    } while (this.buf[this.pos++] & 128);
  }
  return this;
};
Reader$1.prototype.skipType = function(wireType) {
  switch (wireType) {
    case 0:
      this.skip();
      break;
    case 1:
      this.skip(8);
      break;
    case 2:
      this.skip(this.uint32());
      break;
    case 3:
      while ((wireType = this.uint32() & 7) !== 4) {
        this.skipType(wireType);
      }
      break;
    case 5:
      this.skip(4);
      break;
    default:
      throw Error("invalid wire type " + wireType + " at offset " + this.pos);
  }
  return this;
};
Reader$1._configure = function(BufferReader_) {
  BufferReader$1 = BufferReader_;
  Reader$1.create = create();
  BufferReader$1._configure();
  var fn = util$2.Long ? "toLong" : "toNumber";
  util$2.merge(Reader$1.prototype, {
    int64: function read_int64() {
      return readLongVarint.call(this)[fn](false);
    },
    uint64: function read_uint64() {
      return readLongVarint.call(this)[fn](true);
    },
    sint64: function read_sint64() {
      return readLongVarint.call(this).zzDecode()[fn](false);
    },
    fixed64: function read_fixed64() {
      return readFixed64.call(this)[fn](true);
    },
    sfixed64: function read_sfixed64() {
      return readFixed64.call(this)[fn](false);
    }
  });
};
var reader_buffer = BufferReader;
var Reader = reader;
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
var util$1 = requireMinimal();
function BufferReader(buffer) {
  Reader.call(this, buffer);
}
BufferReader._configure = function() {
  if (util$1.Buffer)
    BufferReader.prototype._slice = util$1.Buffer.prototype.slice;
};
BufferReader.prototype.string = function read_string_buffer() {
  var len = this.uint32();
  return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
};
BufferReader._configure();
var rpc = {};
var service = Service$1;
var util = requireMinimal();
(Service$1.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service$1;
function Service$1(rpcImpl, requestDelimited, responseDelimited) {
  if (typeof rpcImpl !== "function")
    throw TypeError("rpcImpl must be a function");
  util.EventEmitter.call(this);
  this.rpcImpl = rpcImpl;
  this.requestDelimited = Boolean(requestDelimited);
  this.responseDelimited = Boolean(responseDelimited);
}
Service$1.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
  if (!request)
    throw TypeError("request must be specified");
  var self2 = this;
  if (!callback)
    return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
  if (!self2.rpcImpl) {
    setTimeout(function() {
      callback(Error("already ended"));
    }, 0);
    return void 0;
  }
  try {
    return self2.rpcImpl(
      method,
      requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
      function rpcCallback(err, response) {
        if (err) {
          self2.emit("error", err, method);
          return callback(err);
        }
        if (response === null) {
          self2.end(true);
          return void 0;
        }
        if (!(response instanceof responseCtor)) {
          try {
            response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
          } catch (err2) {
            self2.emit("error", err2, method);
            return callback(err2);
          }
        }
        self2.emit("data", response, method);
        return callback(null, response);
      }
    );
  } catch (err) {
    self2.emit("error", err, method);
    setTimeout(function() {
      callback(err);
    }, 0);
    return void 0;
  }
};
Service$1.prototype.end = function end(endedByRPC) {
  if (this.rpcImpl) {
    if (!endedByRPC)
      this.rpcImpl(null, null, null);
    this.rpcImpl = null;
    this.emit("end").off();
  }
  return this;
};
(function(exports) {
  var rpc2 = exports;
  rpc2.Service = service;
})(rpc);
var roots = {};
(function(exports) {
  var protobuf = exports;
  protobuf.build = "minimal";
  protobuf.Writer = writer;
  protobuf.BufferWriter = writer_buffer;
  protobuf.Reader = reader;
  protobuf.BufferReader = reader_buffer;
  protobuf.util = requireMinimal();
  protobuf.rpc = rpc;
  protobuf.roots = roots;
  protobuf.configure = configure;
  function configure() {
    protobuf.util._configure();
    protobuf.Writer._configure(protobuf.BufferWriter);
    protobuf.Reader._configure(protobuf.BufferReader);
  }
  configure();
})(indexMinimal);
(function(module) {
  module.exports = indexMinimal;
})(minimal$1);
const _m0 = /* @__PURE__ */ getDefaultExportFromCjs(minimal$1.exports);
function instrumentDefinition_InstrumentTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_INSTRUMENT_TYPE":
      return 0;
    case 1:
    case "FOREX":
      return 1;
    case 2:
    case "INDEX":
      return 2;
    case 3:
    case "EQUITY":
      return 3;
    case 4:
    case "FUTURE":
      return 4;
    case 5:
    case "OPTION":
      return 5;
    case 6:
    case "SPREAD":
      return 6;
    case 7:
    case "MUTUAL_FUND":
      return 7;
    case 8:
    case "MONEY_MARKET_FUND":
      return 8;
    case 9:
    case "USER_DEFINED_SPREAD":
      return 9;
    case 10:
    case "EQUITY_OPTION":
      return 10;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function instrumentDefinition_InstrumentTypeToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_INSTRUMENT_TYPE";
    case 1:
      return "FOREX";
    case 2:
      return "INDEX";
    case 3:
      return "EQUITY";
    case 4:
      return "FUTURE";
    case 5:
      return "OPTION";
    case 6:
      return "SPREAD";
    case 7:
      return "MUTUAL_FUND";
    case 8:
      return "MONEY_MARKET_FUND";
    case 9:
      return "USER_DEFINED_SPREAD";
    case 10:
      return "EQUITY_OPTION";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentDefinition_BookTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_BOOK_TYPE":
      return 0;
    case 1:
    case "TOP_OF_BOOK":
      return 1;
    case 2:
    case "PRICE_LEVEL_DEPTH":
      return 2;
    case 3:
    case "ORDER_DEPTH":
      return 3;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function instrumentDefinition_BookTypeToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_BOOK_TYPE";
    case 1:
      return "TOP_OF_BOOK";
    case 2:
      return "PRICE_LEVEL_DEPTH";
    case 3:
      return "ORDER_DEPTH";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentDefinition_OptionTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_OPTION_TYPE":
      return 0;
    case 1:
    case "CALL":
      return 1;
    case 2:
    case "PUT":
      return 2;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function instrumentDefinition_OptionTypeToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_OPTION_TYPE";
    case 1:
      return "CALL";
    case 2:
      return "PUT";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentDefinition_OptionStyleFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_OPTIONS_STYLE":
      return 0;
    case 1:
    case "DEFAULT":
      return 1;
    case 2:
    case "AMERICAN":
      return 2;
    case 3:
    case "EUROPEAN":
      return 3;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function instrumentDefinition_OptionStyleToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_OPTIONS_STYLE";
    case 1:
      return "DEFAULT";
    case 2:
      return "AMERICAN";
    case 3:
      return "EUROPEAN";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentDefinition_StateFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_STATE":
      return 0;
    case 1:
    case "ACTIVE":
      return 1;
    case 2:
    case "PASSIVE":
      return 2;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function instrumentDefinition_StateToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_STATE";
    case 1:
      return "ACTIVE";
    case 2:
      return "PASSIVE";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentDefinition_EventTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_EVENT_TYPE":
      return 0;
    case 1:
    case "FIRST_TRADE_DATE":
      return 1;
    case 2:
    case "LAST_TRADE_DATE":
      return 2;
    case 10:
    case "MATURITY_DATE":
      return 10;
    case 11:
    case "FIRST_DELIVERY_DATE":
      return 11;
    case 12:
    case "LAST_DELIVERY_DATE":
      return 12;
    case 13:
    case "FIRST_NOTICE_DATE":
      return 13;
    case 14:
    case "LAST_NOTICE_DATE":
      return 14;
    case 15:
    case "FIRST_HOLDING_DATE":
      return 15;
    case 16:
    case "LAST_HOLDING_DATE":
      return 16;
    case 17:
    case "FIRST_POSITION_DATE":
      return 17;
    case 18:
    case "LAST_POSITION_DATE":
      return 18;
    case 30:
    case "DELIVERY_START_DATE":
      return 30;
    case 31:
    case "DELIVERY_END_DATE":
      return 31;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function instrumentDefinition_EventTypeToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_EVENT_TYPE";
    case 1:
      return "FIRST_TRADE_DATE";
    case 2:
      return "LAST_TRADE_DATE";
    case 10:
      return "MATURITY_DATE";
    case 11:
      return "FIRST_DELIVERY_DATE";
    case 12:
      return "LAST_DELIVERY_DATE";
    case 13:
      return "FIRST_NOTICE_DATE";
    case 14:
      return "LAST_NOTICE_DATE";
    case 15:
      return "FIRST_HOLDING_DATE";
    case 16:
      return "LAST_HOLDING_DATE";
    case 17:
      return "FIRST_POSITION_DATE";
    case 18:
      return "LAST_POSITION_DATE";
    case 30:
      return "DELIVERY_START_DATE";
    case 31:
      return "DELIVERY_END_DATE";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentDefinition_PriceFormat_SubFormatFromJSON(object) {
  switch (object) {
    case 0:
    case "FLAT":
      return 0;
    case 1:
    case "FRACTIONAL":
      return 1;
    case 2:
    case "DECIMAL":
      return 2;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function instrumentDefinition_PriceFormat_SubFormatToJSON(object) {
  switch (object) {
    case 0:
      return "FLAT";
    case 1:
      return "FRACTIONAL";
    case 2:
      return "DECIMAL";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseInstrumentDefinition() {
  return {
    marketId: Long.ZERO,
    instrumentType: 0,
    supportBookTypes: [],
    bookDepth: 0,
    vendorId: "",
    symbol: "",
    description: "",
    cfiCode: "",
    currencyCode: "",
    exchangeCode: "",
    minimumPriceIncrement: 0,
    contractPointValue: 0,
    schedule: void 0,
    calendar: void 0,
    recordCreateTime: Long.ZERO,
    recordUpdateTime: Long.ZERO,
    timeZoneName: "",
    instrumentGroup: "",
    symbolExpiration: void 0,
    state: 0,
    channel: 0,
    underlyingMarketId: Long.ZERO,
    priceFormat: void 0,
    optionStrikePriceFormat: void 0,
    priceDenominator: 0,
    quantityDenominator: 0,
    isTradable: false,
    transactionTime: Long.ZERO,
    auxiliaryData: new Uint8Array(),
    symbols: [],
    optionStrike: Long.ZERO,
    optionType: 0,
    optionStyle: 0,
    optionStrikeDenominator: 0,
    spreadCode: "",
    spreadLeg: [],
    userDefinedSpread: false,
    marketTier: "",
    financialStatusIndicator: "",
    isin: "",
    currencyPair: void 0,
    exchangeSendsVolume: false,
    exchangeSendsHigh: false,
    exchangeSendsLow: false,
    exchangeSendsOpen: false,
    consolidatedFeedInstrument: false,
    openOutcryInstrument: false,
    syntheticAmericanOptionInstrument: false,
    barchartExchangeCode: "",
    barchartBaseCode: "",
    volumeDenominator: 0,
    bidOfferQuantityDenominator: 0,
    primaryListingMarketParticipantId: "",
    subscriptionSymbol: "",
    contractMaturity: void 0,
    underlying: "",
    commodity: ""
  };
}
const InstrumentDefinition = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.marketId.isZero()) {
      writer2.uint32(8).sint64(message.marketId);
    }
    if (message.instrumentType !== 0) {
      writer2.uint32(16).int32(message.instrumentType);
    }
    writer2.uint32(26).fork();
    for (const v of message.supportBookTypes) {
      writer2.int32(v);
    }
    writer2.ldelim();
    if (message.bookDepth !== 0) {
      writer2.uint32(32).sint32(message.bookDepth);
    }
    if (message.vendorId !== "") {
      writer2.uint32(42).string(message.vendorId);
    }
    if (message.symbol !== "") {
      writer2.uint32(50).string(message.symbol);
    }
    if (message.description !== "") {
      writer2.uint32(58).string(message.description);
    }
    if (message.cfiCode !== "") {
      writer2.uint32(66).string(message.cfiCode);
    }
    if (message.currencyCode !== "") {
      writer2.uint32(74).string(message.currencyCode);
    }
    if (message.exchangeCode !== "") {
      writer2.uint32(82).string(message.exchangeCode);
    }
    if (message.minimumPriceIncrement !== 0) {
      writer2.uint32(93).float(message.minimumPriceIncrement);
    }
    if (message.contractPointValue !== 0) {
      writer2.uint32(101).float(message.contractPointValue);
    }
    if (message.schedule !== void 0) {
      InstrumentDefinition_Schedule.encode(message.schedule, writer2.uint32(106).fork()).ldelim();
    }
    if (message.calendar !== void 0) {
      InstrumentDefinition_Calendar.encode(message.calendar, writer2.uint32(114).fork()).ldelim();
    }
    if (!message.recordCreateTime.isZero()) {
      writer2.uint32(120).sint64(message.recordCreateTime);
    }
    if (!message.recordUpdateTime.isZero()) {
      writer2.uint32(128).sint64(message.recordUpdateTime);
    }
    if (message.timeZoneName !== "") {
      writer2.uint32(138).string(message.timeZoneName);
    }
    if (message.instrumentGroup !== "") {
      writer2.uint32(146).string(message.instrumentGroup);
    }
    if (message.symbolExpiration !== void 0) {
      InstrumentDefinition_MaturityDate.encode(message.symbolExpiration, writer2.uint32(154).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer2.uint32(160).int32(message.state);
    }
    if (message.channel !== 0) {
      writer2.uint32(168).sint32(message.channel);
    }
    if (!message.underlyingMarketId.isZero()) {
      writer2.uint32(176).sint64(message.underlyingMarketId);
    }
    if (message.priceFormat !== void 0) {
      InstrumentDefinition_PriceFormat.encode(message.priceFormat, writer2.uint32(186).fork()).ldelim();
    }
    if (message.optionStrikePriceFormat !== void 0) {
      InstrumentDefinition_PriceFormat.encode(message.optionStrikePriceFormat, writer2.uint32(194).fork()).ldelim();
    }
    if (message.priceDenominator !== 0) {
      writer2.uint32(224).sint32(message.priceDenominator);
    }
    if (message.quantityDenominator !== 0) {
      writer2.uint32(232).sint32(message.quantityDenominator);
    }
    if (message.isTradable === true) {
      writer2.uint32(240).bool(message.isTradable);
    }
    if (!message.transactionTime.isZero()) {
      writer2.uint32(400).sint64(message.transactionTime);
    }
    if (message.auxiliaryData.length !== 0) {
      writer2.uint32(794).bytes(message.auxiliaryData);
    }
    for (const v of message.symbols) {
      InstrumentDefinition_Symbol.encode(v, writer2.uint32(802).fork()).ldelim();
    }
    if (!message.optionStrike.isZero()) {
      writer2.uint32(1600).sint64(message.optionStrike);
    }
    if (message.optionType !== 0) {
      writer2.uint32(1616).int32(message.optionType);
    }
    if (message.optionStyle !== 0) {
      writer2.uint32(1624).int32(message.optionStyle);
    }
    if (message.optionStrikeDenominator !== 0) {
      writer2.uint32(1632).sint32(message.optionStrikeDenominator);
    }
    if (message.spreadCode !== "") {
      writer2.uint32(1682).string(message.spreadCode);
    }
    for (const v of message.spreadLeg) {
      InstrumentDefinition_SpreadLeg.encode(v, writer2.uint32(1690).fork()).ldelim();
    }
    if (message.userDefinedSpread === true) {
      writer2.uint32(1696).bool(message.userDefinedSpread);
    }
    if (message.marketTier !== "") {
      writer2.uint32(1706).string(message.marketTier);
    }
    if (message.financialStatusIndicator !== "") {
      writer2.uint32(1714).string(message.financialStatusIndicator);
    }
    if (message.isin !== "") {
      writer2.uint32(1722).string(message.isin);
    }
    if (message.currencyPair !== void 0) {
      InstrumentDefinition_CurrencyPair.encode(message.currencyPair, writer2.uint32(1730).fork()).ldelim();
    }
    if (message.exchangeSendsVolume === true) {
      writer2.uint32(1736).bool(message.exchangeSendsVolume);
    }
    if (message.exchangeSendsHigh === true) {
      writer2.uint32(1744).bool(message.exchangeSendsHigh);
    }
    if (message.exchangeSendsLow === true) {
      writer2.uint32(1752).bool(message.exchangeSendsLow);
    }
    if (message.exchangeSendsOpen === true) {
      writer2.uint32(1760).bool(message.exchangeSendsOpen);
    }
    if (message.consolidatedFeedInstrument === true) {
      writer2.uint32(1768).bool(message.consolidatedFeedInstrument);
    }
    if (message.openOutcryInstrument === true) {
      writer2.uint32(1776).bool(message.openOutcryInstrument);
    }
    if (message.syntheticAmericanOptionInstrument === true) {
      writer2.uint32(1784).bool(message.syntheticAmericanOptionInstrument);
    }
    if (message.barchartExchangeCode !== "") {
      writer2.uint32(1794).string(message.barchartExchangeCode);
    }
    if (message.barchartBaseCode !== "") {
      writer2.uint32(1802).string(message.barchartBaseCode);
    }
    if (message.volumeDenominator !== 0) {
      writer2.uint32(1808).sint32(message.volumeDenominator);
    }
    if (message.bidOfferQuantityDenominator !== 0) {
      writer2.uint32(1816).sint32(message.bidOfferQuantityDenominator);
    }
    if (message.primaryListingMarketParticipantId !== "") {
      writer2.uint32(1826).string(message.primaryListingMarketParticipantId);
    }
    if (message.subscriptionSymbol !== "") {
      writer2.uint32(1834).string(message.subscriptionSymbol);
    }
    if (message.contractMaturity !== void 0) {
      InstrumentDefinition_MaturityDate.encode(message.contractMaturity, writer2.uint32(1842).fork()).ldelim();
    }
    if (message.underlying !== "") {
      writer2.uint32(1850).string(message.underlying);
    }
    if (message.commodity !== "") {
      writer2.uint32(1858).string(message.commodity);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentDefinition();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader2.sint64();
          break;
        case 2:
          message.instrumentType = reader2.int32();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end22 = reader2.uint32() + reader2.pos;
            while (reader2.pos < end22) {
              message.supportBookTypes.push(reader2.int32());
            }
          } else {
            message.supportBookTypes.push(reader2.int32());
          }
          break;
        case 4:
          message.bookDepth = reader2.sint32();
          break;
        case 5:
          message.vendorId = reader2.string();
          break;
        case 6:
          message.symbol = reader2.string();
          break;
        case 7:
          message.description = reader2.string();
          break;
        case 8:
          message.cfiCode = reader2.string();
          break;
        case 9:
          message.currencyCode = reader2.string();
          break;
        case 10:
          message.exchangeCode = reader2.string();
          break;
        case 11:
          message.minimumPriceIncrement = reader2.float();
          break;
        case 12:
          message.contractPointValue = reader2.float();
          break;
        case 13:
          message.schedule = InstrumentDefinition_Schedule.decode(reader2, reader2.uint32());
          break;
        case 14:
          message.calendar = InstrumentDefinition_Calendar.decode(reader2, reader2.uint32());
          break;
        case 15:
          message.recordCreateTime = reader2.sint64();
          break;
        case 16:
          message.recordUpdateTime = reader2.sint64();
          break;
        case 17:
          message.timeZoneName = reader2.string();
          break;
        case 18:
          message.instrumentGroup = reader2.string();
          break;
        case 19:
          message.symbolExpiration = InstrumentDefinition_MaturityDate.decode(reader2, reader2.uint32());
          break;
        case 20:
          message.state = reader2.int32();
          break;
        case 21:
          message.channel = reader2.sint32();
          break;
        case 22:
          message.underlyingMarketId = reader2.sint64();
          break;
        case 23:
          message.priceFormat = InstrumentDefinition_PriceFormat.decode(reader2, reader2.uint32());
          break;
        case 24:
          message.optionStrikePriceFormat = InstrumentDefinition_PriceFormat.decode(reader2, reader2.uint32());
          break;
        case 28:
          message.priceDenominator = reader2.sint32();
          break;
        case 29:
          message.quantityDenominator = reader2.sint32();
          break;
        case 30:
          message.isTradable = reader2.bool();
          break;
        case 50:
          message.transactionTime = reader2.sint64();
          break;
        case 99:
          message.auxiliaryData = reader2.bytes();
          break;
        case 100:
          message.symbols.push(InstrumentDefinition_Symbol.decode(reader2, reader2.uint32()));
          break;
        case 200:
          message.optionStrike = reader2.sint64();
          break;
        case 202:
          message.optionType = reader2.int32();
          break;
        case 203:
          message.optionStyle = reader2.int32();
          break;
        case 204:
          message.optionStrikeDenominator = reader2.sint32();
          break;
        case 210:
          message.spreadCode = reader2.string();
          break;
        case 211:
          message.spreadLeg.push(InstrumentDefinition_SpreadLeg.decode(reader2, reader2.uint32()));
          break;
        case 212:
          message.userDefinedSpread = reader2.bool();
          break;
        case 213:
          message.marketTier = reader2.string();
          break;
        case 214:
          message.financialStatusIndicator = reader2.string();
          break;
        case 215:
          message.isin = reader2.string();
          break;
        case 216:
          message.currencyPair = InstrumentDefinition_CurrencyPair.decode(reader2, reader2.uint32());
          break;
        case 217:
          message.exchangeSendsVolume = reader2.bool();
          break;
        case 218:
          message.exchangeSendsHigh = reader2.bool();
          break;
        case 219:
          message.exchangeSendsLow = reader2.bool();
          break;
        case 220:
          message.exchangeSendsOpen = reader2.bool();
          break;
        case 221:
          message.consolidatedFeedInstrument = reader2.bool();
          break;
        case 222:
          message.openOutcryInstrument = reader2.bool();
          break;
        case 223:
          message.syntheticAmericanOptionInstrument = reader2.bool();
          break;
        case 224:
          message.barchartExchangeCode = reader2.string();
          break;
        case 225:
          message.barchartBaseCode = reader2.string();
          break;
        case 226:
          message.volumeDenominator = reader2.sint32();
          break;
        case 227:
          message.bidOfferQuantityDenominator = reader2.sint32();
          break;
        case 228:
          message.primaryListingMarketParticipantId = reader2.string();
          break;
        case 229:
          message.subscriptionSymbol = reader2.string();
          break;
        case 230:
          message.contractMaturity = InstrumentDefinition_MaturityDate.decode(reader2, reader2.uint32());
          break;
        case 231:
          message.underlying = reader2.string();
          break;
        case 232:
          message.commodity = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      marketId: isSet$2(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      instrumentType: isSet$2(object.instrumentType) ? instrumentDefinition_InstrumentTypeFromJSON(object.instrumentType) : 0,
      supportBookTypes: Array.isArray(object == null ? void 0 : object.supportBookTypes) ? object.supportBookTypes.map((e) => instrumentDefinition_BookTypeFromJSON(e)) : [],
      bookDepth: isSet$2(object.bookDepth) ? Number(object.bookDepth) : 0,
      vendorId: isSet$2(object.vendorId) ? String(object.vendorId) : "",
      symbol: isSet$2(object.symbol) ? String(object.symbol) : "",
      description: isSet$2(object.description) ? String(object.description) : "",
      cfiCode: isSet$2(object.cfiCode) ? String(object.cfiCode) : "",
      currencyCode: isSet$2(object.currencyCode) ? String(object.currencyCode) : "",
      exchangeCode: isSet$2(object.exchangeCode) ? String(object.exchangeCode) : "",
      minimumPriceIncrement: isSet$2(object.minimumPriceIncrement) ? Number(object.minimumPriceIncrement) : 0,
      contractPointValue: isSet$2(object.contractPointValue) ? Number(object.contractPointValue) : 0,
      schedule: isSet$2(object.schedule) ? InstrumentDefinition_Schedule.fromJSON(object.schedule) : void 0,
      calendar: isSet$2(object.calendar) ? InstrumentDefinition_Calendar.fromJSON(object.calendar) : void 0,
      recordCreateTime: isSet$2(object.recordCreateTime) ? Long.fromValue(object.recordCreateTime) : Long.ZERO,
      recordUpdateTime: isSet$2(object.recordUpdateTime) ? Long.fromValue(object.recordUpdateTime) : Long.ZERO,
      timeZoneName: isSet$2(object.timeZoneName) ? String(object.timeZoneName) : "",
      instrumentGroup: isSet$2(object.instrumentGroup) ? String(object.instrumentGroup) : "",
      symbolExpiration: isSet$2(object.symbolExpiration) ? InstrumentDefinition_MaturityDate.fromJSON(object.symbolExpiration) : void 0,
      state: isSet$2(object.state) ? instrumentDefinition_StateFromJSON(object.state) : 0,
      channel: isSet$2(object.channel) ? Number(object.channel) : 0,
      underlyingMarketId: isSet$2(object.underlyingMarketId) ? Long.fromValue(object.underlyingMarketId) : Long.ZERO,
      priceFormat: isSet$2(object.priceFormat) ? InstrumentDefinition_PriceFormat.fromJSON(object.priceFormat) : void 0,
      optionStrikePriceFormat: isSet$2(object.optionStrikePriceFormat) ? InstrumentDefinition_PriceFormat.fromJSON(object.optionStrikePriceFormat) : void 0,
      priceDenominator: isSet$2(object.priceDenominator) ? Number(object.priceDenominator) : 0,
      quantityDenominator: isSet$2(object.quantityDenominator) ? Number(object.quantityDenominator) : 0,
      isTradable: isSet$2(object.isTradable) ? Boolean(object.isTradable) : false,
      transactionTime: isSet$2(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      auxiliaryData: isSet$2(object.auxiliaryData) ? bytesFromBase64$1(object.auxiliaryData) : new Uint8Array(),
      symbols: Array.isArray(object == null ? void 0 : object.symbols) ? object.symbols.map((e) => InstrumentDefinition_Symbol.fromJSON(e)) : [],
      optionStrike: isSet$2(object.optionStrike) ? Long.fromValue(object.optionStrike) : Long.ZERO,
      optionType: isSet$2(object.optionType) ? instrumentDefinition_OptionTypeFromJSON(object.optionType) : 0,
      optionStyle: isSet$2(object.optionStyle) ? instrumentDefinition_OptionStyleFromJSON(object.optionStyle) : 0,
      optionStrikeDenominator: isSet$2(object.optionStrikeDenominator) ? Number(object.optionStrikeDenominator) : 0,
      spreadCode: isSet$2(object.spreadCode) ? String(object.spreadCode) : "",
      spreadLeg: Array.isArray(object == null ? void 0 : object.spreadLeg) ? object.spreadLeg.map((e) => InstrumentDefinition_SpreadLeg.fromJSON(e)) : [],
      userDefinedSpread: isSet$2(object.userDefinedSpread) ? Boolean(object.userDefinedSpread) : false,
      marketTier: isSet$2(object.marketTier) ? String(object.marketTier) : "",
      financialStatusIndicator: isSet$2(object.financialStatusIndicator) ? String(object.financialStatusIndicator) : "",
      isin: isSet$2(object.isin) ? String(object.isin) : "",
      currencyPair: isSet$2(object.currencyPair) ? InstrumentDefinition_CurrencyPair.fromJSON(object.currencyPair) : void 0,
      exchangeSendsVolume: isSet$2(object.exchangeSendsVolume) ? Boolean(object.exchangeSendsVolume) : false,
      exchangeSendsHigh: isSet$2(object.exchangeSendsHigh) ? Boolean(object.exchangeSendsHigh) : false,
      exchangeSendsLow: isSet$2(object.exchangeSendsLow) ? Boolean(object.exchangeSendsLow) : false,
      exchangeSendsOpen: isSet$2(object.exchangeSendsOpen) ? Boolean(object.exchangeSendsOpen) : false,
      consolidatedFeedInstrument: isSet$2(object.consolidatedFeedInstrument) ? Boolean(object.consolidatedFeedInstrument) : false,
      openOutcryInstrument: isSet$2(object.openOutcryInstrument) ? Boolean(object.openOutcryInstrument) : false,
      syntheticAmericanOptionInstrument: isSet$2(object.syntheticAmericanOptionInstrument) ? Boolean(object.syntheticAmericanOptionInstrument) : false,
      barchartExchangeCode: isSet$2(object.barchartExchangeCode) ? String(object.barchartExchangeCode) : "",
      barchartBaseCode: isSet$2(object.barchartBaseCode) ? String(object.barchartBaseCode) : "",
      volumeDenominator: isSet$2(object.volumeDenominator) ? Number(object.volumeDenominator) : 0,
      bidOfferQuantityDenominator: isSet$2(object.bidOfferQuantityDenominator) ? Number(object.bidOfferQuantityDenominator) : 0,
      primaryListingMarketParticipantId: isSet$2(object.primaryListingMarketParticipantId) ? String(object.primaryListingMarketParticipantId) : "",
      subscriptionSymbol: isSet$2(object.subscriptionSymbol) ? String(object.subscriptionSymbol) : "",
      contractMaturity: isSet$2(object.contractMaturity) ? InstrumentDefinition_MaturityDate.fromJSON(object.contractMaturity) : void 0,
      underlying: isSet$2(object.underlying) ? String(object.underlying) : "",
      commodity: isSet$2(object.commodity) ? String(object.commodity) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.marketId !== void 0 && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.instrumentType !== void 0 && (obj.instrumentType = instrumentDefinition_InstrumentTypeToJSON(message.instrumentType));
    if (message.supportBookTypes) {
      obj.supportBookTypes = message.supportBookTypes.map((e) => instrumentDefinition_BookTypeToJSON(e));
    } else {
      obj.supportBookTypes = [];
    }
    message.bookDepth !== void 0 && (obj.bookDepth = Math.round(message.bookDepth));
    message.vendorId !== void 0 && (obj.vendorId = message.vendorId);
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.description !== void 0 && (obj.description = message.description);
    message.cfiCode !== void 0 && (obj.cfiCode = message.cfiCode);
    message.currencyCode !== void 0 && (obj.currencyCode = message.currencyCode);
    message.exchangeCode !== void 0 && (obj.exchangeCode = message.exchangeCode);
    message.minimumPriceIncrement !== void 0 && (obj.minimumPriceIncrement = message.minimumPriceIncrement);
    message.contractPointValue !== void 0 && (obj.contractPointValue = message.contractPointValue);
    message.schedule !== void 0 && (obj.schedule = message.schedule ? InstrumentDefinition_Schedule.toJSON(message.schedule) : void 0);
    message.calendar !== void 0 && (obj.calendar = message.calendar ? InstrumentDefinition_Calendar.toJSON(message.calendar) : void 0);
    message.recordCreateTime !== void 0 && (obj.recordCreateTime = (message.recordCreateTime || Long.ZERO).toString());
    message.recordUpdateTime !== void 0 && (obj.recordUpdateTime = (message.recordUpdateTime || Long.ZERO).toString());
    message.timeZoneName !== void 0 && (obj.timeZoneName = message.timeZoneName);
    message.instrumentGroup !== void 0 && (obj.instrumentGroup = message.instrumentGroup);
    message.symbolExpiration !== void 0 && (obj.symbolExpiration = message.symbolExpiration ? InstrumentDefinition_MaturityDate.toJSON(message.symbolExpiration) : void 0);
    message.state !== void 0 && (obj.state = instrumentDefinition_StateToJSON(message.state));
    message.channel !== void 0 && (obj.channel = Math.round(message.channel));
    message.underlyingMarketId !== void 0 && (obj.underlyingMarketId = (message.underlyingMarketId || Long.ZERO).toString());
    message.priceFormat !== void 0 && (obj.priceFormat = message.priceFormat ? InstrumentDefinition_PriceFormat.toJSON(message.priceFormat) : void 0);
    message.optionStrikePriceFormat !== void 0 && (obj.optionStrikePriceFormat = message.optionStrikePriceFormat ? InstrumentDefinition_PriceFormat.toJSON(message.optionStrikePriceFormat) : void 0);
    message.priceDenominator !== void 0 && (obj.priceDenominator = Math.round(message.priceDenominator));
    message.quantityDenominator !== void 0 && (obj.quantityDenominator = Math.round(message.quantityDenominator));
    message.isTradable !== void 0 && (obj.isTradable = message.isTradable);
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.auxiliaryData !== void 0 && (obj.auxiliaryData = base64FromBytes$1(
      message.auxiliaryData !== void 0 ? message.auxiliaryData : new Uint8Array()
    ));
    if (message.symbols) {
      obj.symbols = message.symbols.map((e) => e ? InstrumentDefinition_Symbol.toJSON(e) : void 0);
    } else {
      obj.symbols = [];
    }
    message.optionStrike !== void 0 && (obj.optionStrike = (message.optionStrike || Long.ZERO).toString());
    message.optionType !== void 0 && (obj.optionType = instrumentDefinition_OptionTypeToJSON(message.optionType));
    message.optionStyle !== void 0 && (obj.optionStyle = instrumentDefinition_OptionStyleToJSON(message.optionStyle));
    message.optionStrikeDenominator !== void 0 && (obj.optionStrikeDenominator = Math.round(message.optionStrikeDenominator));
    message.spreadCode !== void 0 && (obj.spreadCode = message.spreadCode);
    if (message.spreadLeg) {
      obj.spreadLeg = message.spreadLeg.map((e) => e ? InstrumentDefinition_SpreadLeg.toJSON(e) : void 0);
    } else {
      obj.spreadLeg = [];
    }
    message.userDefinedSpread !== void 0 && (obj.userDefinedSpread = message.userDefinedSpread);
    message.marketTier !== void 0 && (obj.marketTier = message.marketTier);
    message.financialStatusIndicator !== void 0 && (obj.financialStatusIndicator = message.financialStatusIndicator);
    message.isin !== void 0 && (obj.isin = message.isin);
    message.currencyPair !== void 0 && (obj.currencyPair = message.currencyPair ? InstrumentDefinition_CurrencyPair.toJSON(message.currencyPair) : void 0);
    message.exchangeSendsVolume !== void 0 && (obj.exchangeSendsVolume = message.exchangeSendsVolume);
    message.exchangeSendsHigh !== void 0 && (obj.exchangeSendsHigh = message.exchangeSendsHigh);
    message.exchangeSendsLow !== void 0 && (obj.exchangeSendsLow = message.exchangeSendsLow);
    message.exchangeSendsOpen !== void 0 && (obj.exchangeSendsOpen = message.exchangeSendsOpen);
    message.consolidatedFeedInstrument !== void 0 && (obj.consolidatedFeedInstrument = message.consolidatedFeedInstrument);
    message.openOutcryInstrument !== void 0 && (obj.openOutcryInstrument = message.openOutcryInstrument);
    message.syntheticAmericanOptionInstrument !== void 0 && (obj.syntheticAmericanOptionInstrument = message.syntheticAmericanOptionInstrument);
    message.barchartExchangeCode !== void 0 && (obj.barchartExchangeCode = message.barchartExchangeCode);
    message.barchartBaseCode !== void 0 && (obj.barchartBaseCode = message.barchartBaseCode);
    message.volumeDenominator !== void 0 && (obj.volumeDenominator = Math.round(message.volumeDenominator));
    message.bidOfferQuantityDenominator !== void 0 && (obj.bidOfferQuantityDenominator = Math.round(message.bidOfferQuantityDenominator));
    message.primaryListingMarketParticipantId !== void 0 && (obj.primaryListingMarketParticipantId = message.primaryListingMarketParticipantId);
    message.subscriptionSymbol !== void 0 && (obj.subscriptionSymbol = message.subscriptionSymbol);
    message.contractMaturity !== void 0 && (obj.contractMaturity = message.contractMaturity ? InstrumentDefinition_MaturityDate.toJSON(message.contractMaturity) : void 0);
    message.underlying !== void 0 && (obj.underlying = message.underlying);
    message.commodity !== void 0 && (obj.commodity = message.commodity);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R;
    const message = createBaseInstrumentDefinition();
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? Long.fromValue(object.marketId) : Long.ZERO;
    message.instrumentType = (_a = object.instrumentType) != null ? _a : 0;
    message.supportBookTypes = ((_b = object.supportBookTypes) == null ? void 0 : _b.map((e) => e)) || [];
    message.bookDepth = (_c = object.bookDepth) != null ? _c : 0;
    message.vendorId = (_d = object.vendorId) != null ? _d : "";
    message.symbol = (_e = object.symbol) != null ? _e : "";
    message.description = (_f = object.description) != null ? _f : "";
    message.cfiCode = (_g = object.cfiCode) != null ? _g : "";
    message.currencyCode = (_h = object.currencyCode) != null ? _h : "";
    message.exchangeCode = (_i = object.exchangeCode) != null ? _i : "";
    message.minimumPriceIncrement = (_j = object.minimumPriceIncrement) != null ? _j : 0;
    message.contractPointValue = (_k = object.contractPointValue) != null ? _k : 0;
    message.schedule = object.schedule !== void 0 && object.schedule !== null ? InstrumentDefinition_Schedule.fromPartial(object.schedule) : void 0;
    message.calendar = object.calendar !== void 0 && object.calendar !== null ? InstrumentDefinition_Calendar.fromPartial(object.calendar) : void 0;
    message.recordCreateTime = object.recordCreateTime !== void 0 && object.recordCreateTime !== null ? Long.fromValue(object.recordCreateTime) : Long.ZERO;
    message.recordUpdateTime = object.recordUpdateTime !== void 0 && object.recordUpdateTime !== null ? Long.fromValue(object.recordUpdateTime) : Long.ZERO;
    message.timeZoneName = (_l = object.timeZoneName) != null ? _l : "";
    message.instrumentGroup = (_m = object.instrumentGroup) != null ? _m : "";
    message.symbolExpiration = object.symbolExpiration !== void 0 && object.symbolExpiration !== null ? InstrumentDefinition_MaturityDate.fromPartial(object.symbolExpiration) : void 0;
    message.state = (_n = object.state) != null ? _n : 0;
    message.channel = (_o = object.channel) != null ? _o : 0;
    message.underlyingMarketId = object.underlyingMarketId !== void 0 && object.underlyingMarketId !== null ? Long.fromValue(object.underlyingMarketId) : Long.ZERO;
    message.priceFormat = object.priceFormat !== void 0 && object.priceFormat !== null ? InstrumentDefinition_PriceFormat.fromPartial(object.priceFormat) : void 0;
    message.optionStrikePriceFormat = object.optionStrikePriceFormat !== void 0 && object.optionStrikePriceFormat !== null ? InstrumentDefinition_PriceFormat.fromPartial(object.optionStrikePriceFormat) : void 0;
    message.priceDenominator = (_p = object.priceDenominator) != null ? _p : 0;
    message.quantityDenominator = (_q = object.quantityDenominator) != null ? _q : 0;
    message.isTradable = (_r = object.isTradable) != null ? _r : false;
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.auxiliaryData = (_s = object.auxiliaryData) != null ? _s : new Uint8Array();
    message.symbols = ((_t = object.symbols) == null ? void 0 : _t.map((e) => InstrumentDefinition_Symbol.fromPartial(e))) || [];
    message.optionStrike = object.optionStrike !== void 0 && object.optionStrike !== null ? Long.fromValue(object.optionStrike) : Long.ZERO;
    message.optionType = (_u = object.optionType) != null ? _u : 0;
    message.optionStyle = (_v = object.optionStyle) != null ? _v : 0;
    message.optionStrikeDenominator = (_w = object.optionStrikeDenominator) != null ? _w : 0;
    message.spreadCode = (_x = object.spreadCode) != null ? _x : "";
    message.spreadLeg = ((_y = object.spreadLeg) == null ? void 0 : _y.map((e) => InstrumentDefinition_SpreadLeg.fromPartial(e))) || [];
    message.userDefinedSpread = (_z = object.userDefinedSpread) != null ? _z : false;
    message.marketTier = (_A = object.marketTier) != null ? _A : "";
    message.financialStatusIndicator = (_B = object.financialStatusIndicator) != null ? _B : "";
    message.isin = (_C = object.isin) != null ? _C : "";
    message.currencyPair = object.currencyPair !== void 0 && object.currencyPair !== null ? InstrumentDefinition_CurrencyPair.fromPartial(object.currencyPair) : void 0;
    message.exchangeSendsVolume = (_D = object.exchangeSendsVolume) != null ? _D : false;
    message.exchangeSendsHigh = (_E = object.exchangeSendsHigh) != null ? _E : false;
    message.exchangeSendsLow = (_F = object.exchangeSendsLow) != null ? _F : false;
    message.exchangeSendsOpen = (_G = object.exchangeSendsOpen) != null ? _G : false;
    message.consolidatedFeedInstrument = (_H = object.consolidatedFeedInstrument) != null ? _H : false;
    message.openOutcryInstrument = (_I = object.openOutcryInstrument) != null ? _I : false;
    message.syntheticAmericanOptionInstrument = (_J = object.syntheticAmericanOptionInstrument) != null ? _J : false;
    message.barchartExchangeCode = (_K = object.barchartExchangeCode) != null ? _K : "";
    message.barchartBaseCode = (_L = object.barchartBaseCode) != null ? _L : "";
    message.volumeDenominator = (_M = object.volumeDenominator) != null ? _M : 0;
    message.bidOfferQuantityDenominator = (_N = object.bidOfferQuantityDenominator) != null ? _N : 0;
    message.primaryListingMarketParticipantId = (_O = object.primaryListingMarketParticipantId) != null ? _O : "";
    message.subscriptionSymbol = (_P = object.subscriptionSymbol) != null ? _P : "";
    message.contractMaturity = object.contractMaturity !== void 0 && object.contractMaturity !== null ? InstrumentDefinition_MaturityDate.fromPartial(object.contractMaturity) : void 0;
    message.underlying = (_Q = object.underlying) != null ? _Q : "";
    message.commodity = (_R = object.commodity) != null ? _R : "";
    return message;
  }
};
function createBaseInstrumentDefinition_Schedule() {
  return { sessions: [] };
}
const InstrumentDefinition_Schedule = {
  encode(message, writer2 = _m0.Writer.create()) {
    for (const v of message.sessions) {
      InstrumentDefinition_TimeSpan.encode(v, writer2.uint32(10).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentDefinition_Schedule();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sessions.push(InstrumentDefinition_TimeSpan.decode(reader2, reader2.uint32()));
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      sessions: Array.isArray(object == null ? void 0 : object.sessions) ? object.sessions.map((e) => InstrumentDefinition_TimeSpan.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.sessions) {
      obj.sessions = message.sessions.map((e) => e ? InstrumentDefinition_TimeSpan.toJSON(e) : void 0);
    } else {
      obj.sessions = [];
    }
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseInstrumentDefinition_Schedule();
    message.sessions = ((_a = object.sessions) == null ? void 0 : _a.map((e) => InstrumentDefinition_TimeSpan.fromPartial(e))) || [];
    return message;
  }
};
function createBaseInstrumentDefinition_TimeSpan() {
  return { timeStart: Long.ZERO, timeFinish: Long.ZERO };
}
const InstrumentDefinition_TimeSpan = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.timeStart.isZero()) {
      writer2.uint32(8).sint64(message.timeStart);
    }
    if (!message.timeFinish.isZero()) {
      writer2.uint32(16).sint64(message.timeFinish);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentDefinition_TimeSpan();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeStart = reader2.sint64();
          break;
        case 2:
          message.timeFinish = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      timeStart: isSet$2(object.timeStart) ? Long.fromValue(object.timeStart) : Long.ZERO,
      timeFinish: isSet$2(object.timeFinish) ? Long.fromValue(object.timeFinish) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.timeStart !== void 0 && (obj.timeStart = (message.timeStart || Long.ZERO).toString());
    message.timeFinish !== void 0 && (obj.timeFinish = (message.timeFinish || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseInstrumentDefinition_TimeSpan();
    message.timeStart = object.timeStart !== void 0 && object.timeStart !== null ? Long.fromValue(object.timeStart) : Long.ZERO;
    message.timeFinish = object.timeFinish !== void 0 && object.timeFinish !== null ? Long.fromValue(object.timeFinish) : Long.ZERO;
    return message;
  }
};
function createBaseInstrumentDefinition_Calendar() {
  return { events: [] };
}
const InstrumentDefinition_Calendar = {
  encode(message, writer2 = _m0.Writer.create()) {
    for (const v of message.events) {
      InstrumentDefinition_Event.encode(v, writer2.uint32(10).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentDefinition_Calendar();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.events.push(InstrumentDefinition_Event.decode(reader2, reader2.uint32()));
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      events: Array.isArray(object == null ? void 0 : object.events) ? object.events.map((e) => InstrumentDefinition_Event.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.events) {
      obj.events = message.events.map((e) => e ? InstrumentDefinition_Event.toJSON(e) : void 0);
    } else {
      obj.events = [];
    }
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseInstrumentDefinition_Calendar();
    message.events = ((_a = object.events) == null ? void 0 : _a.map((e) => InstrumentDefinition_Event.fromPartial(e))) || [];
    return message;
  }
};
function createBaseInstrumentDefinition_Event() {
  return { type: 0, date: Long.ZERO };
}
const InstrumentDefinition_Event = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.type !== 0) {
      writer2.uint32(8).int32(message.type);
    }
    if (!message.date.isZero()) {
      writer2.uint32(16).sint64(message.date);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentDefinition_Event();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader2.int32();
          break;
        case 2:
          message.date = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      type: isSet$2(object.type) ? instrumentDefinition_EventTypeFromJSON(object.type) : 0,
      date: isSet$2(object.date) ? Long.fromValue(object.date) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.type !== void 0 && (obj.type = instrumentDefinition_EventTypeToJSON(message.type));
    message.date !== void 0 && (obj.date = (message.date || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseInstrumentDefinition_Event();
    message.type = (_a = object.type) != null ? _a : 0;
    message.date = object.date !== void 0 && object.date !== null ? Long.fromValue(object.date) : Long.ZERO;
    return message;
  }
};
function createBaseInstrumentDefinition_SpreadLeg() {
  return { marketId: Long.ZERO, ratio: 0, symbol: "", longSymbol: "", legOptionDelta: 0, legPrice: 0 };
}
const InstrumentDefinition_SpreadLeg = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.marketId.isZero()) {
      writer2.uint32(8).sint64(message.marketId);
    }
    if (message.ratio !== 0) {
      writer2.uint32(16).sint32(message.ratio);
    }
    if (message.symbol !== "") {
      writer2.uint32(26).string(message.symbol);
    }
    if (message.longSymbol !== "") {
      writer2.uint32(34).string(message.longSymbol);
    }
    if (message.legOptionDelta !== 0) {
      writer2.uint32(45).float(message.legOptionDelta);
    }
    if (message.legPrice !== 0) {
      writer2.uint32(53).float(message.legPrice);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentDefinition_SpreadLeg();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader2.sint64();
          break;
        case 2:
          message.ratio = reader2.sint32();
          break;
        case 3:
          message.symbol = reader2.string();
          break;
        case 4:
          message.longSymbol = reader2.string();
          break;
        case 5:
          message.legOptionDelta = reader2.float();
          break;
        case 6:
          message.legPrice = reader2.float();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      marketId: isSet$2(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      ratio: isSet$2(object.ratio) ? Number(object.ratio) : 0,
      symbol: isSet$2(object.symbol) ? String(object.symbol) : "",
      longSymbol: isSet$2(object.longSymbol) ? String(object.longSymbol) : "",
      legOptionDelta: isSet$2(object.legOptionDelta) ? Number(object.legOptionDelta) : 0,
      legPrice: isSet$2(object.legPrice) ? Number(object.legPrice) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.marketId !== void 0 && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.ratio !== void 0 && (obj.ratio = Math.round(message.ratio));
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.longSymbol !== void 0 && (obj.longSymbol = message.longSymbol);
    message.legOptionDelta !== void 0 && (obj.legOptionDelta = message.legOptionDelta);
    message.legPrice !== void 0 && (obj.legPrice = message.legPrice);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e;
    const message = createBaseInstrumentDefinition_SpreadLeg();
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? Long.fromValue(object.marketId) : Long.ZERO;
    message.ratio = (_a = object.ratio) != null ? _a : 0;
    message.symbol = (_b = object.symbol) != null ? _b : "";
    message.longSymbol = (_c = object.longSymbol) != null ? _c : "";
    message.legOptionDelta = (_d = object.legOptionDelta) != null ? _d : 0;
    message.legPrice = (_e = object.legPrice) != null ? _e : 0;
    return message;
  }
};
function createBaseInstrumentDefinition_MaturityDate() {
  return { year: 0, month: 0, day: 0 };
}
const InstrumentDefinition_MaturityDate = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.year !== 0) {
      writer2.uint32(8).sint32(message.year);
    }
    if (message.month !== 0) {
      writer2.uint32(16).sint32(message.month);
    }
    if (message.day !== 0) {
      writer2.uint32(24).sint32(message.day);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentDefinition_MaturityDate();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.year = reader2.sint32();
          break;
        case 2:
          message.month = reader2.sint32();
          break;
        case 3:
          message.day = reader2.sint32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      year: isSet$2(object.year) ? Number(object.year) : 0,
      month: isSet$2(object.month) ? Number(object.month) : 0,
      day: isSet$2(object.day) ? Number(object.day) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.year !== void 0 && (obj.year = Math.round(message.year));
    message.month !== void 0 && (obj.month = Math.round(message.month));
    message.day !== void 0 && (obj.day = Math.round(message.day));
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseInstrumentDefinition_MaturityDate();
    message.year = (_a = object.year) != null ? _a : 0;
    message.month = (_b = object.month) != null ? _b : 0;
    message.day = (_c = object.day) != null ? _c : 0;
    return message;
  }
};
function createBaseInstrumentDefinition_Symbol() {
  return { vendor: "", symbol: "", longSymbol: "" };
}
const InstrumentDefinition_Symbol = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.vendor !== "") {
      writer2.uint32(10).string(message.vendor);
    }
    if (message.symbol !== "") {
      writer2.uint32(18).string(message.symbol);
    }
    if (message.longSymbol !== "") {
      writer2.uint32(26).string(message.longSymbol);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentDefinition_Symbol();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vendor = reader2.string();
          break;
        case 2:
          message.symbol = reader2.string();
          break;
        case 3:
          message.longSymbol = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      vendor: isSet$2(object.vendor) ? String(object.vendor) : "",
      symbol: isSet$2(object.symbol) ? String(object.symbol) : "",
      longSymbol: isSet$2(object.longSymbol) ? String(object.longSymbol) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.vendor !== void 0 && (obj.vendor = message.vendor);
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.longSymbol !== void 0 && (obj.longSymbol = message.longSymbol);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseInstrumentDefinition_Symbol();
    message.vendor = (_a = object.vendor) != null ? _a : "";
    message.symbol = (_b = object.symbol) != null ? _b : "";
    message.longSymbol = (_c = object.longSymbol) != null ? _c : "";
    return message;
  }
};
function createBaseInstrumentDefinition_PriceFormat() {
  return { isFractional: false, denominator: 0, subDenominator: 0, subFormat: 0 };
}
const InstrumentDefinition_PriceFormat = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.isFractional === true) {
      writer2.uint32(8).bool(message.isFractional);
    }
    if (message.denominator !== 0) {
      writer2.uint32(16).sint32(message.denominator);
    }
    if (message.subDenominator !== 0) {
      writer2.uint32(32).sint32(message.subDenominator);
    }
    if (message.subFormat !== 0) {
      writer2.uint32(48).int32(message.subFormat);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentDefinition_PriceFormat();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.isFractional = reader2.bool();
          break;
        case 2:
          message.denominator = reader2.sint32();
          break;
        case 4:
          message.subDenominator = reader2.sint32();
          break;
        case 6:
          message.subFormat = reader2.int32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      isFractional: isSet$2(object.isFractional) ? Boolean(object.isFractional) : false,
      denominator: isSet$2(object.denominator) ? Number(object.denominator) : 0,
      subDenominator: isSet$2(object.subDenominator) ? Number(object.subDenominator) : 0,
      subFormat: isSet$2(object.subFormat) ? instrumentDefinition_PriceFormat_SubFormatFromJSON(object.subFormat) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.isFractional !== void 0 && (obj.isFractional = message.isFractional);
    message.denominator !== void 0 && (obj.denominator = Math.round(message.denominator));
    message.subDenominator !== void 0 && (obj.subDenominator = Math.round(message.subDenominator));
    message.subFormat !== void 0 && (obj.subFormat = instrumentDefinition_PriceFormat_SubFormatToJSON(message.subFormat));
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseInstrumentDefinition_PriceFormat();
    message.isFractional = (_a = object.isFractional) != null ? _a : false;
    message.denominator = (_b = object.denominator) != null ? _b : 0;
    message.subDenominator = (_c = object.subDenominator) != null ? _c : 0;
    message.subFormat = (_d = object.subFormat) != null ? _d : 0;
    return message;
  }
};
function createBaseInstrumentDefinition_CurrencyPair() {
  return { currency1: "", currency2: "" };
}
const InstrumentDefinition_CurrencyPair = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.currency1 !== "") {
      writer2.uint32(10).string(message.currency1);
    }
    if (message.currency2 !== "") {
      writer2.uint32(18).string(message.currency2);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentDefinition_CurrencyPair();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currency1 = reader2.string();
          break;
        case 2:
          message.currency2 = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      currency1: isSet$2(object.currency1) ? String(object.currency1) : "",
      currency2: isSet$2(object.currency2) ? String(object.currency2) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.currency1 !== void 0 && (obj.currency1 = message.currency1);
    message.currency2 !== void 0 && (obj.currency2 = message.currency2);
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseInstrumentDefinition_CurrencyPair();
    message.currency1 = (_a = object.currency1) != null ? _a : "";
    message.currency2 = (_b = object.currency2) != null ? _b : "";
    return message;
  }
};
var globalThis$2 = (() => {
  if (typeof globalThis$2 !== "undefined") {
    return globalThis$2;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();
function bytesFromBase64$1(b64) {
  if (globalThis$2.Buffer) {
    return Uint8Array.from(globalThis$2.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis$2.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}
function base64FromBytes$1(arr) {
  if (globalThis$2.Buffer) {
    return globalThis$2.Buffer.from(arr).toString("base64");
  } else {
    const bin = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis$2.btoa(bin.join(""));
  }
}
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long;
  _m0.configure();
}
function isSet$2(value) {
  return value !== null && value !== void 0;
}
function bookSideFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_BOOK_SIDE":
      return 0;
    case 1:
    case "BID":
      return 1;
    case 2:
    case "OFFER":
      return 2;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function bookSideToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_BOOK_SIDE";
    case 1:
      return "BID";
    case 2:
      return "OFFER";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentTradingStatusFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_TRADING_STATUS":
      return 0;
    case 1:
    case "TRADING_RESUME":
      return 1;
    case 2:
    case "PRE_OPEN":
      return 2;
    case 3:
    case "OPEN":
      return 3;
    case 4:
    case "PRE_CLOSE":
      return 4;
    case 5:
    case "CLOSE":
      return 5;
    case 6:
    case "TRADING_HALT":
      return 6;
    case 7:
    case "QUOTATION_RESUME":
      return 7;
    case 8:
    case "OPEN_DELAY":
      return 8;
    case 9:
    case "NO_OPEN_NO_RESUME":
      return 9;
    case 10:
    case "FAST_MARKET":
      return 10;
    case 11:
    case "FAST_MARKET_END":
      return 11;
    case 12:
    case "LATE_MARKET":
      return 12;
    case 13:
    case "LATE_MARKET_END":
      return 13;
    case 14:
    case "POST_SESSION":
      return 14;
    case 15:
    case "POST_SESSION_END":
      return 15;
    case 16:
    case "NEW_PRICE_INDICATION":
      return 16;
    case 17:
    case "NOT_AVAILABLE_FOR_TRADING":
      return 17;
    case 18:
    case "PRE_CROSS":
      return 18;
    case 19:
    case "CROSS":
      return 19;
    case 20:
    case "POST_CLOSE":
      return 20;
    case 21:
    case "NO_CHANGE":
      return 21;
    case 22:
    case "NAFT":
      return 22;
    case 23:
    case "TRADING_RANGE_INDICATION":
      return 23;
    case 24:
    case "MARKET_IMBALANCE_BUY":
      return 24;
    case 25:
    case "MARKET_IMBALANCE_SELL":
      return 25;
    case 26:
    case "MOC_IMBALANCE_BUY":
      return 26;
    case 27:
    case "MOC_IMBALANCE_SELL":
      return 27;
    case 28:
    case "NO_MARKET_IMBALANCE":
      return 28;
    case 29:
    case "NO_MOC_IMBALANCE":
      return 29;
    case 30:
    case "SHORT_SELL_RESTRICTION":
      return 30;
    case 31:
    case "LIMIT_UP_LIMIT_DOWN":
      return 31;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function instrumentTradingStatusToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_TRADING_STATUS";
    case 1:
      return "TRADING_RESUME";
    case 2:
      return "PRE_OPEN";
    case 3:
      return "OPEN";
    case 4:
      return "PRE_CLOSE";
    case 5:
      return "CLOSE";
    case 6:
      return "TRADING_HALT";
    case 7:
      return "QUOTATION_RESUME";
    case 8:
      return "OPEN_DELAY";
    case 9:
      return "NO_OPEN_NO_RESUME";
    case 10:
      return "FAST_MARKET";
    case 11:
      return "FAST_MARKET_END";
    case 12:
      return "LATE_MARKET";
    case 13:
      return "LATE_MARKET_END";
    case 14:
      return "POST_SESSION";
    case 15:
      return "POST_SESSION_END";
    case 16:
      return "NEW_PRICE_INDICATION";
    case 17:
      return "NOT_AVAILABLE_FOR_TRADING";
    case 18:
      return "PRE_CROSS";
    case 19:
      return "CROSS";
    case 20:
      return "POST_CLOSE";
    case 21:
      return "NO_CHANGE";
    case 22:
      return "NAFT";
    case 23:
      return "TRADING_RANGE_INDICATION";
    case 24:
      return "MARKET_IMBALANCE_BUY";
    case 25:
      return "MARKET_IMBALANCE_SELL";
    case 26:
      return "MOC_IMBALANCE_BUY";
    case 27:
      return "MOC_IMBALANCE_SELL";
    case 28:
      return "NO_MARKET_IMBALANCE";
    case 29:
      return "NO_MOC_IMBALANCE";
    case 30:
      return "SHORT_SELL_RESTRICTION";
    case 31:
      return "LIMIT_UP_LIMIT_DOWN";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function regulationSHOShortSalePriceTestFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_PRICE_TEST":
      return 0;
    case 1:
    case "PRICE_TEST_NONE":
      return 1;
    case 2:
    case "PRICE_TEST_IN_EFFECT":
      return 2;
    case 3:
    case "PRICE_TEST_REMAINS_IN_EFFECT":
      return 3;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function regulationSHOShortSalePriceTestToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_PRICE_TEST";
    case 1:
      return "PRICE_TEST_NONE";
    case 2:
      return "PRICE_TEST_IN_EFFECT";
    case 3:
      return "PRICE_TEST_REMAINS_IN_EFFECT";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function settlementTermsFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_SETTLEMENT_TERMS":
      return 0;
    case 1:
    case "CASH":
      return 1;
    case 2:
    case "NON_NET":
      return 2;
    case 3:
    case "CONTINGENT_TRADE":
      return 3;
    case 4:
    case "CASH_TODAY":
      return 4;
    case 5:
    case "DATE":
      return 5;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function settlementTermsToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_SETTLEMENT_TERMS";
    case 1:
      return "CASH";
    case 2:
      return "NON_NET";
    case 3:
      return "CONTINGENT_TRADE";
    case 4:
      return "CASH_TODAY";
    case 5:
      return "DATE";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function crossTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_CROSS_TYPE":
      return 0;
    case 1:
    case "DEFAULT":
      return 1;
    case 2:
    case "INTERNAL":
      return 2;
    case 3:
    case "BASIS":
      return 3;
    case 4:
    case "CONTINGENT":
      return 4;
    case 5:
    case "SPECIAL":
      return 5;
    case 6:
    case "VWAP":
      return 6;
    case 7:
    case "REGULAR":
      return 7;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function crossTypeToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_CROSS_TYPE";
    case 1:
      return "DEFAULT";
    case 2:
      return "INTERNAL";
    case 3:
      return "BASIS";
    case 4:
      return "CONTINGENT";
    case 5:
      return "SPECIAL";
    case 6:
      return "VWAP";
    case 7:
      return "REGULAR";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function openCloseSettlementFlagFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return 0;
    case 1:
    case "DAILY_OPEN":
      return 1;
    case 2:
    case "INDICATIVE_OPEN_PRICE":
      return 2;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function openCloseSettlementFlagToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN";
    case 1:
      return "DAILY_OPEN";
    case 2:
      return "INDICATIVE_OPEN_PRICE";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function settlementSourceFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_SETTLEMENT_SOURCE":
      return 0;
    case 1:
    case "GLOBEX":
      return 1;
    case 2:
    case "ITC":
      return 2;
    case 3:
    case "MANUAL":
      return 3;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function settlementSourceToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_SETTLEMENT_SOURCE";
    case 1:
      return "GLOBEX";
    case 2:
      return "ITC";
    case 3:
      return "MANUAL";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
var Service = /* @__PURE__ */ ((Service2) => {
  Service2[Service2["UNKNOWN_SERVICE"] = 0] = "UNKNOWN_SERVICE";
  Service2[Service2["REAL_TIME"] = 1] = "REAL_TIME";
  Service2[Service2["DELAYED"] = 2] = "DELAYED";
  Service2[Service2["REAL_TIME_SNAPSHOT"] = 3] = "REAL_TIME_SNAPSHOT";
  Service2[Service2["DELAYED_SNAPSHOT"] = 4] = "DELAYED_SNAPSHOT";
  Service2[Service2["END_OF_DAY"] = 5] = "END_OF_DAY";
  Service2[Service2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return Service2;
})(Service || {});
function serviceFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_SERVICE":
      return 0;
    case 1:
    case "REAL_TIME":
      return 1;
    case 2:
    case "DELAYED":
      return 2;
    case 3:
    case "REAL_TIME_SNAPSHOT":
      return 3;
    case 4:
    case "DELAYED_SNAPSHOT":
      return 4;
    case 5:
    case "END_OF_DAY":
      return 5;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function serviceToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_SERVICE";
    case 1:
      return "REAL_TIME";
    case 2:
      return "DELAYED";
    case 3:
      return "REAL_TIME_SNAPSHOT";
    case 4:
      return "DELAYED_SNAPSHOT";
    case 5:
      return "END_OF_DAY";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function marketWideStatusFromJSON(object) {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return 0;
    case 1:
    case "STATUS_START_OF_DAY":
      return 1;
    case 2:
    case "STATUS_END_OF_DAY":
      return 2;
    case 3:
    case "STATUS_OPEN":
      return 3;
    case 4:
    case "STATUS_CLOSE":
      return 4;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function marketWideStatusToJSON(object) {
  switch (object) {
    case 0:
      return "STATUS_UNKNOWN";
    case 1:
      return "STATUS_START_OF_DAY";
    case 2:
      return "STATUS_END_OF_DAY";
    case 3:
      return "STATUS_OPEN";
    case 4:
      return "STATUS_CLOSE";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function actionTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_ACTION":
      return 0;
    case 1:
    case "LISTING":
      return 1;
    case 2:
    case "DELISTING":
      return 2;
    case 3:
    case "EXCHANGE_MOVE":
      return 3;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function actionTypeToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_ACTION";
    case 1:
      return "LISTING";
    case 2:
      return "DELISTING";
    case 3:
      return "EXCHANGE_MOVE";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function marketSummary_ClearSetFromJSON(object) {
  switch (object) {
    case 0:
    case "NONE":
      return 0;
    case 1:
    case "ALL":
      return 1;
    case 2:
    case "BA":
      return 2;
    case 3:
    case "CUSTOM_1":
      return 3;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function marketSummary_ClearSetToJSON(object) {
  switch (object) {
    case 0:
      return "NONE";
    case 1:
      return "ALL";
    case 2:
      return "BA";
    case 3:
      return "CUSTOM_1";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function marketSummary_SummaryTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "EXCHANGE_REFRESH":
      return 0;
    case 1:
    case "REFRESH_LIVE_PRICE":
      return 1;
    case 2:
    case "EOD_COMMODITY_PRICES":
      return 2;
    case 3:
    case "EOD_STOCK_FOREX_PRICES":
      return 3;
    case 4:
    case "EOD_COMMODITY_STATS":
      return 4;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function marketSummary_SummaryTypeToJSON(object) {
  switch (object) {
    case 0:
      return "EXCHANGE_REFRESH";
    case 1:
      return "REFRESH_LIVE_PRICE";
    case 2:
      return "EOD_COMMODITY_PRICES";
    case 3:
      return "EOD_STOCK_FOREX_PRICES";
    case 4:
      return "EOD_COMMODITY_STATS";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseHeartBeat() {
  return { transactionTime: Long.ZERO, status: "", exchange: false, channel: 0 };
}
const HeartBeat = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(8).sint64(message.transactionTime);
    }
    if (message.status !== "") {
      writer2.uint32(18).string(message.status);
    }
    if (message.exchange === true) {
      writer2.uint32(24).bool(message.exchange);
    }
    if (message.channel !== 0) {
      writer2.uint32(32).sint32(message.channel);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseHeartBeat();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionTime = reader2.sint64();
          break;
        case 2:
          message.status = reader2.string();
          break;
        case 3:
          message.exchange = reader2.bool();
          break;
        case 4:
          message.channel = reader2.sint32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      status: isSet$1(object.status) ? String(object.status) : "",
      exchange: isSet$1(object.exchange) ? Boolean(object.exchange) : false,
      channel: isSet$1(object.channel) ? Number(object.channel) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.status !== void 0 && (obj.status = message.status);
    message.exchange !== void 0 && (obj.exchange = message.exchange);
    message.channel !== void 0 && (obj.channel = Math.round(message.channel));
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseHeartBeat();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.status = (_a = object.status) != null ? _a : "";
    message.exchange = (_b = object.exchange) != null ? _b : false;
    message.channel = (_c = object.channel) != null ? _c : 0;
    return message;
  }
};
function createBaseMarketStatus() {
  return { transactionTime: Long.ZERO, channel: 0, marketWideStatus: 0 };
}
const MarketStatus = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(8).sint64(message.transactionTime);
    }
    if (message.channel !== 0) {
      writer2.uint32(16).sint32(message.channel);
    }
    if (message.marketWideStatus !== 0) {
      writer2.uint32(24).int32(message.marketWideStatus);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseMarketStatus();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionTime = reader2.sint64();
          break;
        case 2:
          message.channel = reader2.sint32();
          break;
        case 3:
          message.marketWideStatus = reader2.int32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      channel: isSet$1(object.channel) ? Number(object.channel) : 0,
      marketWideStatus: isSet$1(object.marketWideStatus) ? marketWideStatusFromJSON(object.marketWideStatus) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.channel !== void 0 && (obj.channel = Math.round(message.channel));
    message.marketWideStatus !== void 0 && (obj.marketWideStatus = marketWideStatusToJSON(message.marketWideStatus));
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseMarketStatus();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.channel = (_a = object.channel) != null ? _a : 0;
    message.marketWideStatus = (_b = object.marketWideStatus) != null ? _b : 0;
    return message;
  }
};
function createBaseMarketSession() {
  return {
    tradeDate: 0,
    open: void 0,
    high: void 0,
    low: void 0,
    last: void 0,
    volume: void 0,
    settlement: void 0,
    prevSettlement: void 0,
    openInterest: void 0,
    numberOfTrades: void 0,
    monetaryValue: void 0,
    transactionTime: Long.ZERO
  };
}
const MarketSession = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.tradeDate !== 0) {
      writer2.uint32(32).sint32(message.tradeDate);
    }
    if (message.open !== void 0) {
      Open.encode(message.open, writer2.uint32(242).fork()).ldelim();
    }
    if (message.high !== void 0) {
      High.encode(message.high, writer2.uint32(250).fork()).ldelim();
    }
    if (message.low !== void 0) {
      Low.encode(message.low, writer2.uint32(258).fork()).ldelim();
    }
    if (message.last !== void 0) {
      Last.encode(message.last, writer2.uint32(282).fork()).ldelim();
    }
    if (message.volume !== void 0) {
      Volume.encode(message.volume, writer2.uint32(306).fork()).ldelim();
    }
    if (message.settlement !== void 0) {
      Settlement.encode(message.settlement, writer2.uint32(314).fork()).ldelim();
    }
    if (message.prevSettlement !== void 0) {
      Settlement.encode(message.prevSettlement, writer2.uint32(354).fork()).ldelim();
    }
    if (message.openInterest !== void 0) {
      OpenInterest.encode(message.openInterest, writer2.uint32(322).fork()).ldelim();
    }
    if (message.numberOfTrades !== void 0) {
      NumberOfTrades.encode(message.numberOfTrades, writer2.uint32(330).fork()).ldelim();
    }
    if (message.monetaryValue !== void 0) {
      MonetaryValue.encode(message.monetaryValue, writer2.uint32(338).fork()).ldelim();
    }
    if (!message.transactionTime.isZero()) {
      writer2.uint32(344).sint64(message.transactionTime);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseMarketSession();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 4:
          message.tradeDate = reader2.sint32();
          break;
        case 30:
          message.open = Open.decode(reader2, reader2.uint32());
          break;
        case 31:
          message.high = High.decode(reader2, reader2.uint32());
          break;
        case 32:
          message.low = Low.decode(reader2, reader2.uint32());
          break;
        case 35:
          message.last = Last.decode(reader2, reader2.uint32());
          break;
        case 38:
          message.volume = Volume.decode(reader2, reader2.uint32());
          break;
        case 39:
          message.settlement = Settlement.decode(reader2, reader2.uint32());
          break;
        case 44:
          message.prevSettlement = Settlement.decode(reader2, reader2.uint32());
          break;
        case 40:
          message.openInterest = OpenInterest.decode(reader2, reader2.uint32());
          break;
        case 41:
          message.numberOfTrades = NumberOfTrades.decode(reader2, reader2.uint32());
          break;
        case 42:
          message.monetaryValue = MonetaryValue.decode(reader2, reader2.uint32());
          break;
        case 43:
          message.transactionTime = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      open: isSet$1(object.open) ? Open.fromJSON(object.open) : void 0,
      high: isSet$1(object.high) ? High.fromJSON(object.high) : void 0,
      low: isSet$1(object.low) ? Low.fromJSON(object.low) : void 0,
      last: isSet$1(object.last) ? Last.fromJSON(object.last) : void 0,
      volume: isSet$1(object.volume) ? Volume.fromJSON(object.volume) : void 0,
      settlement: isSet$1(object.settlement) ? Settlement.fromJSON(object.settlement) : void 0,
      prevSettlement: isSet$1(object.prevSettlement) ? Settlement.fromJSON(object.prevSettlement) : void 0,
      openInterest: isSet$1(object.openInterest) ? OpenInterest.fromJSON(object.openInterest) : void 0,
      numberOfTrades: isSet$1(object.numberOfTrades) ? NumberOfTrades.fromJSON(object.numberOfTrades) : void 0,
      monetaryValue: isSet$1(object.monetaryValue) ? MonetaryValue.fromJSON(object.monetaryValue) : void 0,
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.open !== void 0 && (obj.open = message.open ? Open.toJSON(message.open) : void 0);
    message.high !== void 0 && (obj.high = message.high ? High.toJSON(message.high) : void 0);
    message.low !== void 0 && (obj.low = message.low ? Low.toJSON(message.low) : void 0);
    message.last !== void 0 && (obj.last = message.last ? Last.toJSON(message.last) : void 0);
    message.volume !== void 0 && (obj.volume = message.volume ? Volume.toJSON(message.volume) : void 0);
    message.settlement !== void 0 && (obj.settlement = message.settlement ? Settlement.toJSON(message.settlement) : void 0);
    message.prevSettlement !== void 0 && (obj.prevSettlement = message.prevSettlement ? Settlement.toJSON(message.prevSettlement) : void 0);
    message.openInterest !== void 0 && (obj.openInterest = message.openInterest ? OpenInterest.toJSON(message.openInterest) : void 0);
    message.numberOfTrades !== void 0 && (obj.numberOfTrades = message.numberOfTrades ? NumberOfTrades.toJSON(message.numberOfTrades) : void 0);
    message.monetaryValue !== void 0 && (obj.monetaryValue = message.monetaryValue ? MonetaryValue.toJSON(message.monetaryValue) : void 0);
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseMarketSession();
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.open = object.open !== void 0 && object.open !== null ? Open.fromPartial(object.open) : void 0;
    message.high = object.high !== void 0 && object.high !== null ? High.fromPartial(object.high) : void 0;
    message.low = object.low !== void 0 && object.low !== null ? Low.fromPartial(object.low) : void 0;
    message.last = object.last !== void 0 && object.last !== null ? Last.fromPartial(object.last) : void 0;
    message.volume = object.volume !== void 0 && object.volume !== null ? Volume.fromPartial(object.volume) : void 0;
    message.settlement = object.settlement !== void 0 && object.settlement !== null ? Settlement.fromPartial(object.settlement) : void 0;
    message.prevSettlement = object.prevSettlement !== void 0 && object.prevSettlement !== null ? Settlement.fromPartial(object.prevSettlement) : void 0;
    message.openInterest = object.openInterest !== void 0 && object.openInterest !== null ? OpenInterest.fromPartial(object.openInterest) : void 0;
    message.numberOfTrades = object.numberOfTrades !== void 0 && object.numberOfTrades !== null ? NumberOfTrades.fromPartial(object.numberOfTrades) : void 0;
    message.monetaryValue = object.monetaryValue !== void 0 && object.monetaryValue !== null ? MonetaryValue.fromPartial(object.monetaryValue) : void 0;
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    return message;
  }
};
function createBaseMarketSnapshot() {
  return {
    marketId: Long.ZERO,
    transactionTime: Long.ZERO,
    marketSequence: Long.ZERO,
    tradeDate: 0,
    totalChunks: 0,
    currentChunk: 0,
    symbol: "",
    priceDenominator: 0,
    service: 0,
    instrumentStatus: void 0,
    bbo: void 0,
    index: void 0,
    priceLevels: [],
    orders: [],
    news: void 0,
    open: void 0,
    high: void 0,
    low: void 0,
    close: void 0,
    prevClose: void 0,
    last: void 0,
    yearHigh: void 0,
    yearLow: void 0,
    volume: void 0,
    settlement: void 0,
    openInterest: void 0,
    vwap: void 0,
    dividendsIncomeDistributions: void 0,
    numberOfTrades: void 0,
    monetaryValue: void 0,
    capitalDistributions: void 0,
    sharesOutstanding: void 0,
    netAssetValue: void 0,
    previousSession: void 0,
    tSession: void 0,
    volumeAtPrice: void 0,
    highRolling: void 0,
    lowRolling: void 0,
    zSession: void 0
  };
}
const MarketSnapshot = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.marketId.isZero()) {
      writer2.uint32(8).sint64(message.marketId);
    }
    if (!message.transactionTime.isZero()) {
      writer2.uint32(16).sint64(message.transactionTime);
    }
    if (!message.marketSequence.isZero()) {
      writer2.uint32(24).int64(message.marketSequence);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(32).sint32(message.tradeDate);
    }
    if (message.totalChunks !== 0) {
      writer2.uint32(40).sint32(message.totalChunks);
    }
    if (message.currentChunk !== 0) {
      writer2.uint32(48).sint32(message.currentChunk);
    }
    if (message.symbol !== "") {
      writer2.uint32(58).string(message.symbol);
    }
    if (message.priceDenominator !== 0) {
      writer2.uint32(64).sint32(message.priceDenominator);
    }
    if (message.service !== 0) {
      writer2.uint32(72).int32(message.service);
    }
    if (message.instrumentStatus !== void 0) {
      InstrumentStatus.encode(message.instrumentStatus, writer2.uint32(82).fork()).ldelim();
    }
    if (message.bbo !== void 0) {
      BestBidOffer.encode(message.bbo, writer2.uint32(90).fork()).ldelim();
    }
    if (message.index !== void 0) {
      IndexValue.encode(message.index, writer2.uint32(98).fork()).ldelim();
    }
    for (const v of message.priceLevels) {
      AddPriceLevel.encode(v, writer2.uint32(106).fork()).ldelim();
    }
    for (const v of message.orders) {
      AddOrder.encode(v, writer2.uint32(114).fork()).ldelim();
    }
    if (message.news !== void 0) {
      News.encode(message.news, writer2.uint32(122).fork()).ldelim();
    }
    if (message.open !== void 0) {
      Open.encode(message.open, writer2.uint32(242).fork()).ldelim();
    }
    if (message.high !== void 0) {
      High.encode(message.high, writer2.uint32(250).fork()).ldelim();
    }
    if (message.low !== void 0) {
      Low.encode(message.low, writer2.uint32(258).fork()).ldelim();
    }
    if (message.close !== void 0) {
      Close.encode(message.close, writer2.uint32(266).fork()).ldelim();
    }
    if (message.prevClose !== void 0) {
      PrevClose.encode(message.prevClose, writer2.uint32(274).fork()).ldelim();
    }
    if (message.last !== void 0) {
      Last.encode(message.last, writer2.uint32(282).fork()).ldelim();
    }
    if (message.yearHigh !== void 0) {
      YearHigh.encode(message.yearHigh, writer2.uint32(290).fork()).ldelim();
    }
    if (message.yearLow !== void 0) {
      YearLow.encode(message.yearLow, writer2.uint32(298).fork()).ldelim();
    }
    if (message.volume !== void 0) {
      Volume.encode(message.volume, writer2.uint32(306).fork()).ldelim();
    }
    if (message.settlement !== void 0) {
      Settlement.encode(message.settlement, writer2.uint32(314).fork()).ldelim();
    }
    if (message.openInterest !== void 0) {
      OpenInterest.encode(message.openInterest, writer2.uint32(322).fork()).ldelim();
    }
    if (message.vwap !== void 0) {
      Vwap.encode(message.vwap, writer2.uint32(330).fork()).ldelim();
    }
    if (message.dividendsIncomeDistributions !== void 0) {
      DividendsIncomeDistributions.encode(message.dividendsIncomeDistributions, writer2.uint32(338).fork()).ldelim();
    }
    if (message.numberOfTrades !== void 0) {
      NumberOfTrades.encode(message.numberOfTrades, writer2.uint32(346).fork()).ldelim();
    }
    if (message.monetaryValue !== void 0) {
      MonetaryValue.encode(message.monetaryValue, writer2.uint32(354).fork()).ldelim();
    }
    if (message.capitalDistributions !== void 0) {
      CapitalDistributions.encode(message.capitalDistributions, writer2.uint32(362).fork()).ldelim();
    }
    if (message.sharesOutstanding !== void 0) {
      SharesOutstanding.encode(message.sharesOutstanding, writer2.uint32(370).fork()).ldelim();
    }
    if (message.netAssetValue !== void 0) {
      NetAssetValue.encode(message.netAssetValue, writer2.uint32(378).fork()).ldelim();
    }
    if (message.previousSession !== void 0) {
      MarketSession.encode(message.previousSession, writer2.uint32(386).fork()).ldelim();
    }
    if (message.tSession !== void 0) {
      MarketSession.encode(message.tSession, writer2.uint32(394).fork()).ldelim();
    }
    if (message.volumeAtPrice !== void 0) {
      VolumeAtPrice.encode(message.volumeAtPrice, writer2.uint32(402).fork()).ldelim();
    }
    if (message.highRolling !== void 0) {
      HighRolling.encode(message.highRolling, writer2.uint32(410).fork()).ldelim();
    }
    if (message.lowRolling !== void 0) {
      LowRolling.encode(message.lowRolling, writer2.uint32(418).fork()).ldelim();
    }
    if (message.zSession !== void 0) {
      MarketSession.encode(message.zSession, writer2.uint32(426).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseMarketSnapshot();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader2.sint64();
          break;
        case 2:
          message.transactionTime = reader2.sint64();
          break;
        case 3:
          message.marketSequence = reader2.int64();
          break;
        case 4:
          message.tradeDate = reader2.sint32();
          break;
        case 5:
          message.totalChunks = reader2.sint32();
          break;
        case 6:
          message.currentChunk = reader2.sint32();
          break;
        case 7:
          message.symbol = reader2.string();
          break;
        case 8:
          message.priceDenominator = reader2.sint32();
          break;
        case 9:
          message.service = reader2.int32();
          break;
        case 10:
          message.instrumentStatus = InstrumentStatus.decode(reader2, reader2.uint32());
          break;
        case 11:
          message.bbo = BestBidOffer.decode(reader2, reader2.uint32());
          break;
        case 12:
          message.index = IndexValue.decode(reader2, reader2.uint32());
          break;
        case 13:
          message.priceLevels.push(AddPriceLevel.decode(reader2, reader2.uint32()));
          break;
        case 14:
          message.orders.push(AddOrder.decode(reader2, reader2.uint32()));
          break;
        case 15:
          message.news = News.decode(reader2, reader2.uint32());
          break;
        case 30:
          message.open = Open.decode(reader2, reader2.uint32());
          break;
        case 31:
          message.high = High.decode(reader2, reader2.uint32());
          break;
        case 32:
          message.low = Low.decode(reader2, reader2.uint32());
          break;
        case 33:
          message.close = Close.decode(reader2, reader2.uint32());
          break;
        case 34:
          message.prevClose = PrevClose.decode(reader2, reader2.uint32());
          break;
        case 35:
          message.last = Last.decode(reader2, reader2.uint32());
          break;
        case 36:
          message.yearHigh = YearHigh.decode(reader2, reader2.uint32());
          break;
        case 37:
          message.yearLow = YearLow.decode(reader2, reader2.uint32());
          break;
        case 38:
          message.volume = Volume.decode(reader2, reader2.uint32());
          break;
        case 39:
          message.settlement = Settlement.decode(reader2, reader2.uint32());
          break;
        case 40:
          message.openInterest = OpenInterest.decode(reader2, reader2.uint32());
          break;
        case 41:
          message.vwap = Vwap.decode(reader2, reader2.uint32());
          break;
        case 42:
          message.dividendsIncomeDistributions = DividendsIncomeDistributions.decode(reader2, reader2.uint32());
          break;
        case 43:
          message.numberOfTrades = NumberOfTrades.decode(reader2, reader2.uint32());
          break;
        case 44:
          message.monetaryValue = MonetaryValue.decode(reader2, reader2.uint32());
          break;
        case 45:
          message.capitalDistributions = CapitalDistributions.decode(reader2, reader2.uint32());
          break;
        case 46:
          message.sharesOutstanding = SharesOutstanding.decode(reader2, reader2.uint32());
          break;
        case 47:
          message.netAssetValue = NetAssetValue.decode(reader2, reader2.uint32());
          break;
        case 48:
          message.previousSession = MarketSession.decode(reader2, reader2.uint32());
          break;
        case 49:
          message.tSession = MarketSession.decode(reader2, reader2.uint32());
          break;
        case 50:
          message.volumeAtPrice = VolumeAtPrice.decode(reader2, reader2.uint32());
          break;
        case 51:
          message.highRolling = HighRolling.decode(reader2, reader2.uint32());
          break;
        case 52:
          message.lowRolling = LowRolling.decode(reader2, reader2.uint32());
          break;
        case 53:
          message.zSession = MarketSession.decode(reader2, reader2.uint32());
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      marketId: isSet$1(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      marketSequence: isSet$1(object.marketSequence) ? Long.fromValue(object.marketSequence) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      totalChunks: isSet$1(object.totalChunks) ? Number(object.totalChunks) : 0,
      currentChunk: isSet$1(object.currentChunk) ? Number(object.currentChunk) : 0,
      symbol: isSet$1(object.symbol) ? String(object.symbol) : "",
      priceDenominator: isSet$1(object.priceDenominator) ? Number(object.priceDenominator) : 0,
      service: isSet$1(object.service) ? serviceFromJSON(object.service) : 0,
      instrumentStatus: isSet$1(object.instrumentStatus) ? InstrumentStatus.fromJSON(object.instrumentStatus) : void 0,
      bbo: isSet$1(object.bbo) ? BestBidOffer.fromJSON(object.bbo) : void 0,
      index: isSet$1(object.index) ? IndexValue.fromJSON(object.index) : void 0,
      priceLevels: Array.isArray(object == null ? void 0 : object.priceLevels) ? object.priceLevels.map((e) => AddPriceLevel.fromJSON(e)) : [],
      orders: Array.isArray(object == null ? void 0 : object.orders) ? object.orders.map((e) => AddOrder.fromJSON(e)) : [],
      news: isSet$1(object.news) ? News.fromJSON(object.news) : void 0,
      open: isSet$1(object.open) ? Open.fromJSON(object.open) : void 0,
      high: isSet$1(object.high) ? High.fromJSON(object.high) : void 0,
      low: isSet$1(object.low) ? Low.fromJSON(object.low) : void 0,
      close: isSet$1(object.close) ? Close.fromJSON(object.close) : void 0,
      prevClose: isSet$1(object.prevClose) ? PrevClose.fromJSON(object.prevClose) : void 0,
      last: isSet$1(object.last) ? Last.fromJSON(object.last) : void 0,
      yearHigh: isSet$1(object.yearHigh) ? YearHigh.fromJSON(object.yearHigh) : void 0,
      yearLow: isSet$1(object.yearLow) ? YearLow.fromJSON(object.yearLow) : void 0,
      volume: isSet$1(object.volume) ? Volume.fromJSON(object.volume) : void 0,
      settlement: isSet$1(object.settlement) ? Settlement.fromJSON(object.settlement) : void 0,
      openInterest: isSet$1(object.openInterest) ? OpenInterest.fromJSON(object.openInterest) : void 0,
      vwap: isSet$1(object.vwap) ? Vwap.fromJSON(object.vwap) : void 0,
      dividendsIncomeDistributions: isSet$1(object.dividendsIncomeDistributions) ? DividendsIncomeDistributions.fromJSON(object.dividendsIncomeDistributions) : void 0,
      numberOfTrades: isSet$1(object.numberOfTrades) ? NumberOfTrades.fromJSON(object.numberOfTrades) : void 0,
      monetaryValue: isSet$1(object.monetaryValue) ? MonetaryValue.fromJSON(object.monetaryValue) : void 0,
      capitalDistributions: isSet$1(object.capitalDistributions) ? CapitalDistributions.fromJSON(object.capitalDistributions) : void 0,
      sharesOutstanding: isSet$1(object.sharesOutstanding) ? SharesOutstanding.fromJSON(object.sharesOutstanding) : void 0,
      netAssetValue: isSet$1(object.netAssetValue) ? NetAssetValue.fromJSON(object.netAssetValue) : void 0,
      previousSession: isSet$1(object.previousSession) ? MarketSession.fromJSON(object.previousSession) : void 0,
      tSession: isSet$1(object.tSession) ? MarketSession.fromJSON(object.tSession) : void 0,
      volumeAtPrice: isSet$1(object.volumeAtPrice) ? VolumeAtPrice.fromJSON(object.volumeAtPrice) : void 0,
      highRolling: isSet$1(object.highRolling) ? HighRolling.fromJSON(object.highRolling) : void 0,
      lowRolling: isSet$1(object.lowRolling) ? LowRolling.fromJSON(object.lowRolling) : void 0,
      zSession: isSet$1(object.zSession) ? MarketSession.fromJSON(object.zSession) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.marketId !== void 0 && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.marketSequence !== void 0 && (obj.marketSequence = (message.marketSequence || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.totalChunks !== void 0 && (obj.totalChunks = Math.round(message.totalChunks));
    message.currentChunk !== void 0 && (obj.currentChunk = Math.round(message.currentChunk));
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.priceDenominator !== void 0 && (obj.priceDenominator = Math.round(message.priceDenominator));
    message.service !== void 0 && (obj.service = serviceToJSON(message.service));
    message.instrumentStatus !== void 0 && (obj.instrumentStatus = message.instrumentStatus ? InstrumentStatus.toJSON(message.instrumentStatus) : void 0);
    message.bbo !== void 0 && (obj.bbo = message.bbo ? BestBidOffer.toJSON(message.bbo) : void 0);
    message.index !== void 0 && (obj.index = message.index ? IndexValue.toJSON(message.index) : void 0);
    if (message.priceLevels) {
      obj.priceLevels = message.priceLevels.map((e) => e ? AddPriceLevel.toJSON(e) : void 0);
    } else {
      obj.priceLevels = [];
    }
    if (message.orders) {
      obj.orders = message.orders.map((e) => e ? AddOrder.toJSON(e) : void 0);
    } else {
      obj.orders = [];
    }
    message.news !== void 0 && (obj.news = message.news ? News.toJSON(message.news) : void 0);
    message.open !== void 0 && (obj.open = message.open ? Open.toJSON(message.open) : void 0);
    message.high !== void 0 && (obj.high = message.high ? High.toJSON(message.high) : void 0);
    message.low !== void 0 && (obj.low = message.low ? Low.toJSON(message.low) : void 0);
    message.close !== void 0 && (obj.close = message.close ? Close.toJSON(message.close) : void 0);
    message.prevClose !== void 0 && (obj.prevClose = message.prevClose ? PrevClose.toJSON(message.prevClose) : void 0);
    message.last !== void 0 && (obj.last = message.last ? Last.toJSON(message.last) : void 0);
    message.yearHigh !== void 0 && (obj.yearHigh = message.yearHigh ? YearHigh.toJSON(message.yearHigh) : void 0);
    message.yearLow !== void 0 && (obj.yearLow = message.yearLow ? YearLow.toJSON(message.yearLow) : void 0);
    message.volume !== void 0 && (obj.volume = message.volume ? Volume.toJSON(message.volume) : void 0);
    message.settlement !== void 0 && (obj.settlement = message.settlement ? Settlement.toJSON(message.settlement) : void 0);
    message.openInterest !== void 0 && (obj.openInterest = message.openInterest ? OpenInterest.toJSON(message.openInterest) : void 0);
    message.vwap !== void 0 && (obj.vwap = message.vwap ? Vwap.toJSON(message.vwap) : void 0);
    message.dividendsIncomeDistributions !== void 0 && (obj.dividendsIncomeDistributions = message.dividendsIncomeDistributions ? DividendsIncomeDistributions.toJSON(message.dividendsIncomeDistributions) : void 0);
    message.numberOfTrades !== void 0 && (obj.numberOfTrades = message.numberOfTrades ? NumberOfTrades.toJSON(message.numberOfTrades) : void 0);
    message.monetaryValue !== void 0 && (obj.monetaryValue = message.monetaryValue ? MonetaryValue.toJSON(message.monetaryValue) : void 0);
    message.capitalDistributions !== void 0 && (obj.capitalDistributions = message.capitalDistributions ? CapitalDistributions.toJSON(message.capitalDistributions) : void 0);
    message.sharesOutstanding !== void 0 && (obj.sharesOutstanding = message.sharesOutstanding ? SharesOutstanding.toJSON(message.sharesOutstanding) : void 0);
    message.netAssetValue !== void 0 && (obj.netAssetValue = message.netAssetValue ? NetAssetValue.toJSON(message.netAssetValue) : void 0);
    message.previousSession !== void 0 && (obj.previousSession = message.previousSession ? MarketSession.toJSON(message.previousSession) : void 0);
    message.tSession !== void 0 && (obj.tSession = message.tSession ? MarketSession.toJSON(message.tSession) : void 0);
    message.volumeAtPrice !== void 0 && (obj.volumeAtPrice = message.volumeAtPrice ? VolumeAtPrice.toJSON(message.volumeAtPrice) : void 0);
    message.highRolling !== void 0 && (obj.highRolling = message.highRolling ? HighRolling.toJSON(message.highRolling) : void 0);
    message.lowRolling !== void 0 && (obj.lowRolling = message.lowRolling ? LowRolling.toJSON(message.lowRolling) : void 0);
    message.zSession !== void 0 && (obj.zSession = message.zSession ? MarketSession.toJSON(message.zSession) : void 0);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const message = createBaseMarketSnapshot();
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? Long.fromValue(object.marketId) : Long.ZERO;
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.marketSequence = object.marketSequence !== void 0 && object.marketSequence !== null ? Long.fromValue(object.marketSequence) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.totalChunks = (_b = object.totalChunks) != null ? _b : 0;
    message.currentChunk = (_c = object.currentChunk) != null ? _c : 0;
    message.symbol = (_d = object.symbol) != null ? _d : "";
    message.priceDenominator = (_e = object.priceDenominator) != null ? _e : 0;
    message.service = (_f = object.service) != null ? _f : 0;
    message.instrumentStatus = object.instrumentStatus !== void 0 && object.instrumentStatus !== null ? InstrumentStatus.fromPartial(object.instrumentStatus) : void 0;
    message.bbo = object.bbo !== void 0 && object.bbo !== null ? BestBidOffer.fromPartial(object.bbo) : void 0;
    message.index = object.index !== void 0 && object.index !== null ? IndexValue.fromPartial(object.index) : void 0;
    message.priceLevels = ((_g = object.priceLevels) == null ? void 0 : _g.map((e) => AddPriceLevel.fromPartial(e))) || [];
    message.orders = ((_h = object.orders) == null ? void 0 : _h.map((e) => AddOrder.fromPartial(e))) || [];
    message.news = object.news !== void 0 && object.news !== null ? News.fromPartial(object.news) : void 0;
    message.open = object.open !== void 0 && object.open !== null ? Open.fromPartial(object.open) : void 0;
    message.high = object.high !== void 0 && object.high !== null ? High.fromPartial(object.high) : void 0;
    message.low = object.low !== void 0 && object.low !== null ? Low.fromPartial(object.low) : void 0;
    message.close = object.close !== void 0 && object.close !== null ? Close.fromPartial(object.close) : void 0;
    message.prevClose = object.prevClose !== void 0 && object.prevClose !== null ? PrevClose.fromPartial(object.prevClose) : void 0;
    message.last = object.last !== void 0 && object.last !== null ? Last.fromPartial(object.last) : void 0;
    message.yearHigh = object.yearHigh !== void 0 && object.yearHigh !== null ? YearHigh.fromPartial(object.yearHigh) : void 0;
    message.yearLow = object.yearLow !== void 0 && object.yearLow !== null ? YearLow.fromPartial(object.yearLow) : void 0;
    message.volume = object.volume !== void 0 && object.volume !== null ? Volume.fromPartial(object.volume) : void 0;
    message.settlement = object.settlement !== void 0 && object.settlement !== null ? Settlement.fromPartial(object.settlement) : void 0;
    message.openInterest = object.openInterest !== void 0 && object.openInterest !== null ? OpenInterest.fromPartial(object.openInterest) : void 0;
    message.vwap = object.vwap !== void 0 && object.vwap !== null ? Vwap.fromPartial(object.vwap) : void 0;
    message.dividendsIncomeDistributions = object.dividendsIncomeDistributions !== void 0 && object.dividendsIncomeDistributions !== null ? DividendsIncomeDistributions.fromPartial(object.dividendsIncomeDistributions) : void 0;
    message.numberOfTrades = object.numberOfTrades !== void 0 && object.numberOfTrades !== null ? NumberOfTrades.fromPartial(object.numberOfTrades) : void 0;
    message.monetaryValue = object.monetaryValue !== void 0 && object.monetaryValue !== null ? MonetaryValue.fromPartial(object.monetaryValue) : void 0;
    message.capitalDistributions = object.capitalDistributions !== void 0 && object.capitalDistributions !== null ? CapitalDistributions.fromPartial(object.capitalDistributions) : void 0;
    message.sharesOutstanding = object.sharesOutstanding !== void 0 && object.sharesOutstanding !== null ? SharesOutstanding.fromPartial(object.sharesOutstanding) : void 0;
    message.netAssetValue = object.netAssetValue !== void 0 && object.netAssetValue !== null ? NetAssetValue.fromPartial(object.netAssetValue) : void 0;
    message.previousSession = object.previousSession !== void 0 && object.previousSession !== null ? MarketSession.fromPartial(object.previousSession) : void 0;
    message.tSession = object.tSession !== void 0 && object.tSession !== null ? MarketSession.fromPartial(object.tSession) : void 0;
    message.volumeAtPrice = object.volumeAtPrice !== void 0 && object.volumeAtPrice !== null ? VolumeAtPrice.fromPartial(object.volumeAtPrice) : void 0;
    message.highRolling = object.highRolling !== void 0 && object.highRolling !== null ? HighRolling.fromPartial(object.highRolling) : void 0;
    message.lowRolling = object.lowRolling !== void 0 && object.lowRolling !== null ? LowRolling.fromPartial(object.lowRolling) : void 0;
    message.zSession = object.zSession !== void 0 && object.zSession !== null ? MarketSession.fromPartial(object.zSession) : void 0;
    return message;
  }
};
function createBaseMarketUpdate() {
  return {
    marketId: Long.ZERO,
    symbol: "",
    transactionTime: Long.ZERO,
    distributionTime: Long.ZERO,
    marketSequence: Long.ZERO,
    sourceSequence: Long.ZERO,
    originatorId: new Uint8Array(),
    priceDenominator: 0,
    context: void 0,
    session: void 0,
    tSession: void 0,
    previousSession: void 0,
    regional: false,
    zSession: void 0,
    news: void 0,
    clearBook: void 0,
    instrumentStatus: void 0,
    bbo: void 0,
    depthPriceLevel: void 0,
    depthOrder: void 0,
    index: void 0,
    trades: void 0,
    open: void 0,
    high: void 0,
    low: void 0,
    close: void 0,
    prevClose: void 0,
    last: void 0,
    yearHigh: void 0,
    yearLow: void 0,
    volume: void 0,
    settlement: void 0,
    openInterest: void 0,
    vwap: void 0,
    dividendsIncomeDistributions: void 0,
    numberOfTrades: void 0,
    monetaryValue: void 0,
    capitalDistributions: void 0,
    sharesOutstanding: void 0,
    netAssetValue: void 0,
    marketSummary: void 0,
    highRolling: void 0,
    lowRolling: void 0
  };
}
const MarketUpdate = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.marketId.isZero()) {
      writer2.uint32(8).sint64(message.marketId);
    }
    if (message.symbol !== "") {
      writer2.uint32(18).string(message.symbol);
    }
    if (!message.transactionTime.isZero()) {
      writer2.uint32(24).sint64(message.transactionTime);
    }
    if (!message.distributionTime.isZero()) {
      writer2.uint32(32).sint64(message.distributionTime);
    }
    if (!message.marketSequence.isZero()) {
      writer2.uint32(40).sint64(message.marketSequence);
    }
    if (!message.sourceSequence.isZero()) {
      writer2.uint32(48).sint64(message.sourceSequence);
    }
    if (message.originatorId.length !== 0) {
      writer2.uint32(58).bytes(message.originatorId);
    }
    if (message.priceDenominator !== 0) {
      writer2.uint32(72).sint32(message.priceDenominator);
    }
    if (message.context !== void 0) {
      Context.encode(message.context, writer2.uint32(82).fork()).ldelim();
    }
    if (message.session !== void 0) {
      MarketSession.encode(message.session, writer2.uint32(90).fork()).ldelim();
    }
    if (message.tSession !== void 0) {
      MarketSession.encode(message.tSession, writer2.uint32(98).fork()).ldelim();
    }
    if (message.previousSession !== void 0) {
      MarketSession.encode(message.previousSession, writer2.uint32(106).fork()).ldelim();
    }
    if (message.regional === true) {
      writer2.uint32(112).bool(message.regional);
    }
    if (message.zSession !== void 0) {
      MarketSession.encode(message.zSession, writer2.uint32(122).fork()).ldelim();
    }
    if (message.news !== void 0) {
      News.encode(message.news, writer2.uint32(162).fork()).ldelim();
    }
    if (message.clearBook !== void 0) {
      ClearBook.encode(message.clearBook, writer2.uint32(170).fork()).ldelim();
    }
    if (message.instrumentStatus !== void 0) {
      InstrumentStatus.encode(message.instrumentStatus, writer2.uint32(178).fork()).ldelim();
    }
    if (message.bbo !== void 0) {
      BestBidOffer.encode(message.bbo, writer2.uint32(186).fork()).ldelim();
    }
    if (message.depthPriceLevel !== void 0) {
      DepthPriceLevel.encode(message.depthPriceLevel, writer2.uint32(194).fork()).ldelim();
    }
    if (message.depthOrder !== void 0) {
      DepthOrder.encode(message.depthOrder, writer2.uint32(202).fork()).ldelim();
    }
    if (message.index !== void 0) {
      IndexValue.encode(message.index, writer2.uint32(210).fork()).ldelim();
    }
    if (message.trades !== void 0) {
      Trades.encode(message.trades, writer2.uint32(218).fork()).ldelim();
    }
    if (message.open !== void 0) {
      Open.encode(message.open, writer2.uint32(226).fork()).ldelim();
    }
    if (message.high !== void 0) {
      High.encode(message.high, writer2.uint32(234).fork()).ldelim();
    }
    if (message.low !== void 0) {
      Low.encode(message.low, writer2.uint32(242).fork()).ldelim();
    }
    if (message.close !== void 0) {
      Close.encode(message.close, writer2.uint32(250).fork()).ldelim();
    }
    if (message.prevClose !== void 0) {
      PrevClose.encode(message.prevClose, writer2.uint32(258).fork()).ldelim();
    }
    if (message.last !== void 0) {
      Last.encode(message.last, writer2.uint32(266).fork()).ldelim();
    }
    if (message.yearHigh !== void 0) {
      YearHigh.encode(message.yearHigh, writer2.uint32(274).fork()).ldelim();
    }
    if (message.yearLow !== void 0) {
      YearLow.encode(message.yearLow, writer2.uint32(282).fork()).ldelim();
    }
    if (message.volume !== void 0) {
      Volume.encode(message.volume, writer2.uint32(290).fork()).ldelim();
    }
    if (message.settlement !== void 0) {
      Settlement.encode(message.settlement, writer2.uint32(298).fork()).ldelim();
    }
    if (message.openInterest !== void 0) {
      OpenInterest.encode(message.openInterest, writer2.uint32(306).fork()).ldelim();
    }
    if (message.vwap !== void 0) {
      Vwap.encode(message.vwap, writer2.uint32(314).fork()).ldelim();
    }
    if (message.dividendsIncomeDistributions !== void 0) {
      DividendsIncomeDistributions.encode(message.dividendsIncomeDistributions, writer2.uint32(322).fork()).ldelim();
    }
    if (message.numberOfTrades !== void 0) {
      NumberOfTrades.encode(message.numberOfTrades, writer2.uint32(330).fork()).ldelim();
    }
    if (message.monetaryValue !== void 0) {
      MonetaryValue.encode(message.monetaryValue, writer2.uint32(338).fork()).ldelim();
    }
    if (message.capitalDistributions !== void 0) {
      CapitalDistributions.encode(message.capitalDistributions, writer2.uint32(346).fork()).ldelim();
    }
    if (message.sharesOutstanding !== void 0) {
      SharesOutstanding.encode(message.sharesOutstanding, writer2.uint32(354).fork()).ldelim();
    }
    if (message.netAssetValue !== void 0) {
      NetAssetValue.encode(message.netAssetValue, writer2.uint32(362).fork()).ldelim();
    }
    if (message.marketSummary !== void 0) {
      MarketSummary.encode(message.marketSummary, writer2.uint32(370).fork()).ldelim();
    }
    if (message.highRolling !== void 0) {
      HighRolling.encode(message.highRolling, writer2.uint32(378).fork()).ldelim();
    }
    if (message.lowRolling !== void 0) {
      LowRolling.encode(message.lowRolling, writer2.uint32(386).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseMarketUpdate();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader2.sint64();
          break;
        case 2:
          message.symbol = reader2.string();
          break;
        case 3:
          message.transactionTime = reader2.sint64();
          break;
        case 4:
          message.distributionTime = reader2.sint64();
          break;
        case 5:
          message.marketSequence = reader2.sint64();
          break;
        case 6:
          message.sourceSequence = reader2.sint64();
          break;
        case 7:
          message.originatorId = reader2.bytes();
          break;
        case 9:
          message.priceDenominator = reader2.sint32();
          break;
        case 10:
          message.context = Context.decode(reader2, reader2.uint32());
          break;
        case 11:
          message.session = MarketSession.decode(reader2, reader2.uint32());
          break;
        case 12:
          message.tSession = MarketSession.decode(reader2, reader2.uint32());
          break;
        case 13:
          message.previousSession = MarketSession.decode(reader2, reader2.uint32());
          break;
        case 14:
          message.regional = reader2.bool();
          break;
        case 15:
          message.zSession = MarketSession.decode(reader2, reader2.uint32());
          break;
        case 20:
          message.news = News.decode(reader2, reader2.uint32());
          break;
        case 21:
          message.clearBook = ClearBook.decode(reader2, reader2.uint32());
          break;
        case 22:
          message.instrumentStatus = InstrumentStatus.decode(reader2, reader2.uint32());
          break;
        case 23:
          message.bbo = BestBidOffer.decode(reader2, reader2.uint32());
          break;
        case 24:
          message.depthPriceLevel = DepthPriceLevel.decode(reader2, reader2.uint32());
          break;
        case 25:
          message.depthOrder = DepthOrder.decode(reader2, reader2.uint32());
          break;
        case 26:
          message.index = IndexValue.decode(reader2, reader2.uint32());
          break;
        case 27:
          message.trades = Trades.decode(reader2, reader2.uint32());
          break;
        case 28:
          message.open = Open.decode(reader2, reader2.uint32());
          break;
        case 29:
          message.high = High.decode(reader2, reader2.uint32());
          break;
        case 30:
          message.low = Low.decode(reader2, reader2.uint32());
          break;
        case 31:
          message.close = Close.decode(reader2, reader2.uint32());
          break;
        case 32:
          message.prevClose = PrevClose.decode(reader2, reader2.uint32());
          break;
        case 33:
          message.last = Last.decode(reader2, reader2.uint32());
          break;
        case 34:
          message.yearHigh = YearHigh.decode(reader2, reader2.uint32());
          break;
        case 35:
          message.yearLow = YearLow.decode(reader2, reader2.uint32());
          break;
        case 36:
          message.volume = Volume.decode(reader2, reader2.uint32());
          break;
        case 37:
          message.settlement = Settlement.decode(reader2, reader2.uint32());
          break;
        case 38:
          message.openInterest = OpenInterest.decode(reader2, reader2.uint32());
          break;
        case 39:
          message.vwap = Vwap.decode(reader2, reader2.uint32());
          break;
        case 40:
          message.dividendsIncomeDistributions = DividendsIncomeDistributions.decode(reader2, reader2.uint32());
          break;
        case 41:
          message.numberOfTrades = NumberOfTrades.decode(reader2, reader2.uint32());
          break;
        case 42:
          message.monetaryValue = MonetaryValue.decode(reader2, reader2.uint32());
          break;
        case 43:
          message.capitalDistributions = CapitalDistributions.decode(reader2, reader2.uint32());
          break;
        case 44:
          message.sharesOutstanding = SharesOutstanding.decode(reader2, reader2.uint32());
          break;
        case 45:
          message.netAssetValue = NetAssetValue.decode(reader2, reader2.uint32());
          break;
        case 46:
          message.marketSummary = MarketSummary.decode(reader2, reader2.uint32());
          break;
        case 47:
          message.highRolling = HighRolling.decode(reader2, reader2.uint32());
          break;
        case 48:
          message.lowRolling = LowRolling.decode(reader2, reader2.uint32());
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      marketId: isSet$1(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      symbol: isSet$1(object.symbol) ? String(object.symbol) : "",
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      distributionTime: isSet$1(object.distributionTime) ? Long.fromValue(object.distributionTime) : Long.ZERO,
      marketSequence: isSet$1(object.marketSequence) ? Long.fromValue(object.marketSequence) : Long.ZERO,
      sourceSequence: isSet$1(object.sourceSequence) ? Long.fromValue(object.sourceSequence) : Long.ZERO,
      originatorId: isSet$1(object.originatorId) ? bytesFromBase64(object.originatorId) : new Uint8Array(),
      priceDenominator: isSet$1(object.priceDenominator) ? Number(object.priceDenominator) : 0,
      context: isSet$1(object.context) ? Context.fromJSON(object.context) : void 0,
      session: isSet$1(object.session) ? MarketSession.fromJSON(object.session) : void 0,
      tSession: isSet$1(object.tSession) ? MarketSession.fromJSON(object.tSession) : void 0,
      previousSession: isSet$1(object.previousSession) ? MarketSession.fromJSON(object.previousSession) : void 0,
      regional: isSet$1(object.regional) ? Boolean(object.regional) : false,
      zSession: isSet$1(object.zSession) ? MarketSession.fromJSON(object.zSession) : void 0,
      news: isSet$1(object.news) ? News.fromJSON(object.news) : void 0,
      clearBook: isSet$1(object.clearBook) ? ClearBook.fromJSON(object.clearBook) : void 0,
      instrumentStatus: isSet$1(object.instrumentStatus) ? InstrumentStatus.fromJSON(object.instrumentStatus) : void 0,
      bbo: isSet$1(object.bbo) ? BestBidOffer.fromJSON(object.bbo) : void 0,
      depthPriceLevel: isSet$1(object.depthPriceLevel) ? DepthPriceLevel.fromJSON(object.depthPriceLevel) : void 0,
      depthOrder: isSet$1(object.depthOrder) ? DepthOrder.fromJSON(object.depthOrder) : void 0,
      index: isSet$1(object.index) ? IndexValue.fromJSON(object.index) : void 0,
      trades: isSet$1(object.trades) ? Trades.fromJSON(object.trades) : void 0,
      open: isSet$1(object.open) ? Open.fromJSON(object.open) : void 0,
      high: isSet$1(object.high) ? High.fromJSON(object.high) : void 0,
      low: isSet$1(object.low) ? Low.fromJSON(object.low) : void 0,
      close: isSet$1(object.close) ? Close.fromJSON(object.close) : void 0,
      prevClose: isSet$1(object.prevClose) ? PrevClose.fromJSON(object.prevClose) : void 0,
      last: isSet$1(object.last) ? Last.fromJSON(object.last) : void 0,
      yearHigh: isSet$1(object.yearHigh) ? YearHigh.fromJSON(object.yearHigh) : void 0,
      yearLow: isSet$1(object.yearLow) ? YearLow.fromJSON(object.yearLow) : void 0,
      volume: isSet$1(object.volume) ? Volume.fromJSON(object.volume) : void 0,
      settlement: isSet$1(object.settlement) ? Settlement.fromJSON(object.settlement) : void 0,
      openInterest: isSet$1(object.openInterest) ? OpenInterest.fromJSON(object.openInterest) : void 0,
      vwap: isSet$1(object.vwap) ? Vwap.fromJSON(object.vwap) : void 0,
      dividendsIncomeDistributions: isSet$1(object.dividendsIncomeDistributions) ? DividendsIncomeDistributions.fromJSON(object.dividendsIncomeDistributions) : void 0,
      numberOfTrades: isSet$1(object.numberOfTrades) ? NumberOfTrades.fromJSON(object.numberOfTrades) : void 0,
      monetaryValue: isSet$1(object.monetaryValue) ? MonetaryValue.fromJSON(object.monetaryValue) : void 0,
      capitalDistributions: isSet$1(object.capitalDistributions) ? CapitalDistributions.fromJSON(object.capitalDistributions) : void 0,
      sharesOutstanding: isSet$1(object.sharesOutstanding) ? SharesOutstanding.fromJSON(object.sharesOutstanding) : void 0,
      netAssetValue: isSet$1(object.netAssetValue) ? NetAssetValue.fromJSON(object.netAssetValue) : void 0,
      marketSummary: isSet$1(object.marketSummary) ? MarketSummary.fromJSON(object.marketSummary) : void 0,
      highRolling: isSet$1(object.highRolling) ? HighRolling.fromJSON(object.highRolling) : void 0,
      lowRolling: isSet$1(object.lowRolling) ? LowRolling.fromJSON(object.lowRolling) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.marketId !== void 0 && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.distributionTime !== void 0 && (obj.distributionTime = (message.distributionTime || Long.ZERO).toString());
    message.marketSequence !== void 0 && (obj.marketSequence = (message.marketSequence || Long.ZERO).toString());
    message.sourceSequence !== void 0 && (obj.sourceSequence = (message.sourceSequence || Long.ZERO).toString());
    message.originatorId !== void 0 && (obj.originatorId = base64FromBytes(
      message.originatorId !== void 0 ? message.originatorId : new Uint8Array()
    ));
    message.priceDenominator !== void 0 && (obj.priceDenominator = Math.round(message.priceDenominator));
    message.context !== void 0 && (obj.context = message.context ? Context.toJSON(message.context) : void 0);
    message.session !== void 0 && (obj.session = message.session ? MarketSession.toJSON(message.session) : void 0);
    message.tSession !== void 0 && (obj.tSession = message.tSession ? MarketSession.toJSON(message.tSession) : void 0);
    message.previousSession !== void 0 && (obj.previousSession = message.previousSession ? MarketSession.toJSON(message.previousSession) : void 0);
    message.regional !== void 0 && (obj.regional = message.regional);
    message.zSession !== void 0 && (obj.zSession = message.zSession ? MarketSession.toJSON(message.zSession) : void 0);
    message.news !== void 0 && (obj.news = message.news ? News.toJSON(message.news) : void 0);
    message.clearBook !== void 0 && (obj.clearBook = message.clearBook ? ClearBook.toJSON(message.clearBook) : void 0);
    message.instrumentStatus !== void 0 && (obj.instrumentStatus = message.instrumentStatus ? InstrumentStatus.toJSON(message.instrumentStatus) : void 0);
    message.bbo !== void 0 && (obj.bbo = message.bbo ? BestBidOffer.toJSON(message.bbo) : void 0);
    message.depthPriceLevel !== void 0 && (obj.depthPriceLevel = message.depthPriceLevel ? DepthPriceLevel.toJSON(message.depthPriceLevel) : void 0);
    message.depthOrder !== void 0 && (obj.depthOrder = message.depthOrder ? DepthOrder.toJSON(message.depthOrder) : void 0);
    message.index !== void 0 && (obj.index = message.index ? IndexValue.toJSON(message.index) : void 0);
    message.trades !== void 0 && (obj.trades = message.trades ? Trades.toJSON(message.trades) : void 0);
    message.open !== void 0 && (obj.open = message.open ? Open.toJSON(message.open) : void 0);
    message.high !== void 0 && (obj.high = message.high ? High.toJSON(message.high) : void 0);
    message.low !== void 0 && (obj.low = message.low ? Low.toJSON(message.low) : void 0);
    message.close !== void 0 && (obj.close = message.close ? Close.toJSON(message.close) : void 0);
    message.prevClose !== void 0 && (obj.prevClose = message.prevClose ? PrevClose.toJSON(message.prevClose) : void 0);
    message.last !== void 0 && (obj.last = message.last ? Last.toJSON(message.last) : void 0);
    message.yearHigh !== void 0 && (obj.yearHigh = message.yearHigh ? YearHigh.toJSON(message.yearHigh) : void 0);
    message.yearLow !== void 0 && (obj.yearLow = message.yearLow ? YearLow.toJSON(message.yearLow) : void 0);
    message.volume !== void 0 && (obj.volume = message.volume ? Volume.toJSON(message.volume) : void 0);
    message.settlement !== void 0 && (obj.settlement = message.settlement ? Settlement.toJSON(message.settlement) : void 0);
    message.openInterest !== void 0 && (obj.openInterest = message.openInterest ? OpenInterest.toJSON(message.openInterest) : void 0);
    message.vwap !== void 0 && (obj.vwap = message.vwap ? Vwap.toJSON(message.vwap) : void 0);
    message.dividendsIncomeDistributions !== void 0 && (obj.dividendsIncomeDistributions = message.dividendsIncomeDistributions ? DividendsIncomeDistributions.toJSON(message.dividendsIncomeDistributions) : void 0);
    message.numberOfTrades !== void 0 && (obj.numberOfTrades = message.numberOfTrades ? NumberOfTrades.toJSON(message.numberOfTrades) : void 0);
    message.monetaryValue !== void 0 && (obj.monetaryValue = message.monetaryValue ? MonetaryValue.toJSON(message.monetaryValue) : void 0);
    message.capitalDistributions !== void 0 && (obj.capitalDistributions = message.capitalDistributions ? CapitalDistributions.toJSON(message.capitalDistributions) : void 0);
    message.sharesOutstanding !== void 0 && (obj.sharesOutstanding = message.sharesOutstanding ? SharesOutstanding.toJSON(message.sharesOutstanding) : void 0);
    message.netAssetValue !== void 0 && (obj.netAssetValue = message.netAssetValue ? NetAssetValue.toJSON(message.netAssetValue) : void 0);
    message.marketSummary !== void 0 && (obj.marketSummary = message.marketSummary ? MarketSummary.toJSON(message.marketSummary) : void 0);
    message.highRolling !== void 0 && (obj.highRolling = message.highRolling ? HighRolling.toJSON(message.highRolling) : void 0);
    message.lowRolling !== void 0 && (obj.lowRolling = message.lowRolling ? LowRolling.toJSON(message.lowRolling) : void 0);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseMarketUpdate();
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? Long.fromValue(object.marketId) : Long.ZERO;
    message.symbol = (_a = object.symbol) != null ? _a : "";
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.distributionTime = object.distributionTime !== void 0 && object.distributionTime !== null ? Long.fromValue(object.distributionTime) : Long.ZERO;
    message.marketSequence = object.marketSequence !== void 0 && object.marketSequence !== null ? Long.fromValue(object.marketSequence) : Long.ZERO;
    message.sourceSequence = object.sourceSequence !== void 0 && object.sourceSequence !== null ? Long.fromValue(object.sourceSequence) : Long.ZERO;
    message.originatorId = (_b = object.originatorId) != null ? _b : new Uint8Array();
    message.priceDenominator = (_c = object.priceDenominator) != null ? _c : 0;
    message.context = object.context !== void 0 && object.context !== null ? Context.fromPartial(object.context) : void 0;
    message.session = object.session !== void 0 && object.session !== null ? MarketSession.fromPartial(object.session) : void 0;
    message.tSession = object.tSession !== void 0 && object.tSession !== null ? MarketSession.fromPartial(object.tSession) : void 0;
    message.previousSession = object.previousSession !== void 0 && object.previousSession !== null ? MarketSession.fromPartial(object.previousSession) : void 0;
    message.regional = (_d = object.regional) != null ? _d : false;
    message.zSession = object.zSession !== void 0 && object.zSession !== null ? MarketSession.fromPartial(object.zSession) : void 0;
    message.news = object.news !== void 0 && object.news !== null ? News.fromPartial(object.news) : void 0;
    message.clearBook = object.clearBook !== void 0 && object.clearBook !== null ? ClearBook.fromPartial(object.clearBook) : void 0;
    message.instrumentStatus = object.instrumentStatus !== void 0 && object.instrumentStatus !== null ? InstrumentStatus.fromPartial(object.instrumentStatus) : void 0;
    message.bbo = object.bbo !== void 0 && object.bbo !== null ? BestBidOffer.fromPartial(object.bbo) : void 0;
    message.depthPriceLevel = object.depthPriceLevel !== void 0 && object.depthPriceLevel !== null ? DepthPriceLevel.fromPartial(object.depthPriceLevel) : void 0;
    message.depthOrder = object.depthOrder !== void 0 && object.depthOrder !== null ? DepthOrder.fromPartial(object.depthOrder) : void 0;
    message.index = object.index !== void 0 && object.index !== null ? IndexValue.fromPartial(object.index) : void 0;
    message.trades = object.trades !== void 0 && object.trades !== null ? Trades.fromPartial(object.trades) : void 0;
    message.open = object.open !== void 0 && object.open !== null ? Open.fromPartial(object.open) : void 0;
    message.high = object.high !== void 0 && object.high !== null ? High.fromPartial(object.high) : void 0;
    message.low = object.low !== void 0 && object.low !== null ? Low.fromPartial(object.low) : void 0;
    message.close = object.close !== void 0 && object.close !== null ? Close.fromPartial(object.close) : void 0;
    message.prevClose = object.prevClose !== void 0 && object.prevClose !== null ? PrevClose.fromPartial(object.prevClose) : void 0;
    message.last = object.last !== void 0 && object.last !== null ? Last.fromPartial(object.last) : void 0;
    message.yearHigh = object.yearHigh !== void 0 && object.yearHigh !== null ? YearHigh.fromPartial(object.yearHigh) : void 0;
    message.yearLow = object.yearLow !== void 0 && object.yearLow !== null ? YearLow.fromPartial(object.yearLow) : void 0;
    message.volume = object.volume !== void 0 && object.volume !== null ? Volume.fromPartial(object.volume) : void 0;
    message.settlement = object.settlement !== void 0 && object.settlement !== null ? Settlement.fromPartial(object.settlement) : void 0;
    message.openInterest = object.openInterest !== void 0 && object.openInterest !== null ? OpenInterest.fromPartial(object.openInterest) : void 0;
    message.vwap = object.vwap !== void 0 && object.vwap !== null ? Vwap.fromPartial(object.vwap) : void 0;
    message.dividendsIncomeDistributions = object.dividendsIncomeDistributions !== void 0 && object.dividendsIncomeDistributions !== null ? DividendsIncomeDistributions.fromPartial(object.dividendsIncomeDistributions) : void 0;
    message.numberOfTrades = object.numberOfTrades !== void 0 && object.numberOfTrades !== null ? NumberOfTrades.fromPartial(object.numberOfTrades) : void 0;
    message.monetaryValue = object.monetaryValue !== void 0 && object.monetaryValue !== null ? MonetaryValue.fromPartial(object.monetaryValue) : void 0;
    message.capitalDistributions = object.capitalDistributions !== void 0 && object.capitalDistributions !== null ? CapitalDistributions.fromPartial(object.capitalDistributions) : void 0;
    message.sharesOutstanding = object.sharesOutstanding !== void 0 && object.sharesOutstanding !== null ? SharesOutstanding.fromPartial(object.sharesOutstanding) : void 0;
    message.netAssetValue = object.netAssetValue !== void 0 && object.netAssetValue !== null ? NetAssetValue.fromPartial(object.netAssetValue) : void 0;
    message.marketSummary = object.marketSummary !== void 0 && object.marketSummary !== null ? MarketSummary.fromPartial(object.marketSummary) : void 0;
    message.highRolling = object.highRolling !== void 0 && object.highRolling !== null ? HighRolling.fromPartial(object.highRolling) : void 0;
    message.lowRolling = object.lowRolling !== void 0 && object.lowRolling !== null ? LowRolling.fromPartial(object.lowRolling) : void 0;
    return message;
  }
};
function createBaseDepthPriceLevel() {
  return { levels: [] };
}
const DepthPriceLevel = {
  encode(message, writer2 = _m0.Writer.create()) {
    for (const v of message.levels) {
      DepthPriceLevel_Entry.encode(v, writer2.uint32(10).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseDepthPriceLevel();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.levels.push(DepthPriceLevel_Entry.decode(reader2, reader2.uint32()));
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      levels: Array.isArray(object == null ? void 0 : object.levels) ? object.levels.map((e) => DepthPriceLevel_Entry.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.levels) {
      obj.levels = message.levels.map((e) => e ? DepthPriceLevel_Entry.toJSON(e) : void 0);
    } else {
      obj.levels = [];
    }
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseDepthPriceLevel();
    message.levels = ((_a = object.levels) == null ? void 0 : _a.map((e) => DepthPriceLevel_Entry.fromPartial(e))) || [];
    return message;
  }
};
function createBaseDepthPriceLevel_Entry() {
  return { addPriceLevel: void 0, deletePriceLevel: void 0, modifyPriceLevel: void 0 };
}
const DepthPriceLevel_Entry = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.addPriceLevel !== void 0) {
      AddPriceLevel.encode(message.addPriceLevel, writer2.uint32(10).fork()).ldelim();
    }
    if (message.deletePriceLevel !== void 0) {
      DeletePriceLevel.encode(message.deletePriceLevel, writer2.uint32(18).fork()).ldelim();
    }
    if (message.modifyPriceLevel !== void 0) {
      ModifyPriceLevel.encode(message.modifyPriceLevel, writer2.uint32(26).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseDepthPriceLevel_Entry();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addPriceLevel = AddPriceLevel.decode(reader2, reader2.uint32());
          break;
        case 2:
          message.deletePriceLevel = DeletePriceLevel.decode(reader2, reader2.uint32());
          break;
        case 3:
          message.modifyPriceLevel = ModifyPriceLevel.decode(reader2, reader2.uint32());
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      addPriceLevel: isSet$1(object.addPriceLevel) ? AddPriceLevel.fromJSON(object.addPriceLevel) : void 0,
      deletePriceLevel: isSet$1(object.deletePriceLevel) ? DeletePriceLevel.fromJSON(object.deletePriceLevel) : void 0,
      modifyPriceLevel: isSet$1(object.modifyPriceLevel) ? ModifyPriceLevel.fromJSON(object.modifyPriceLevel) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.addPriceLevel !== void 0 && (obj.addPriceLevel = message.addPriceLevel ? AddPriceLevel.toJSON(message.addPriceLevel) : void 0);
    message.deletePriceLevel !== void 0 && (obj.deletePriceLevel = message.deletePriceLevel ? DeletePriceLevel.toJSON(message.deletePriceLevel) : void 0);
    message.modifyPriceLevel !== void 0 && (obj.modifyPriceLevel = message.modifyPriceLevel ? ModifyPriceLevel.toJSON(message.modifyPriceLevel) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseDepthPriceLevel_Entry();
    message.addPriceLevel = object.addPriceLevel !== void 0 && object.addPriceLevel !== null ? AddPriceLevel.fromPartial(object.addPriceLevel) : void 0;
    message.deletePriceLevel = object.deletePriceLevel !== void 0 && object.deletePriceLevel !== null ? DeletePriceLevel.fromPartial(object.deletePriceLevel) : void 0;
    message.modifyPriceLevel = object.modifyPriceLevel !== void 0 && object.modifyPriceLevel !== null ? ModifyPriceLevel.fromPartial(object.modifyPriceLevel) : void 0;
    return message;
  }
};
function createBaseDepthOrder() {
  return { orders: [] };
}
const DepthOrder = {
  encode(message, writer2 = _m0.Writer.create()) {
    for (const v of message.orders) {
      DepthOrder_Entry.encode(v, writer2.uint32(10).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseDepthOrder();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orders.push(DepthOrder_Entry.decode(reader2, reader2.uint32()));
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { orders: Array.isArray(object == null ? void 0 : object.orders) ? object.orders.map((e) => DepthOrder_Entry.fromJSON(e)) : [] };
  },
  toJSON(message) {
    const obj = {};
    if (message.orders) {
      obj.orders = message.orders.map((e) => e ? DepthOrder_Entry.toJSON(e) : void 0);
    } else {
      obj.orders = [];
    }
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseDepthOrder();
    message.orders = ((_a = object.orders) == null ? void 0 : _a.map((e) => DepthOrder_Entry.fromPartial(e))) || [];
    return message;
  }
};
function createBaseDepthOrder_Entry() {
  return { addOrder: void 0, deleteOrder: void 0, modifyOrder: void 0 };
}
const DepthOrder_Entry = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.addOrder !== void 0) {
      AddOrder.encode(message.addOrder, writer2.uint32(10).fork()).ldelim();
    }
    if (message.deleteOrder !== void 0) {
      DeleteOrder.encode(message.deleteOrder, writer2.uint32(18).fork()).ldelim();
    }
    if (message.modifyOrder !== void 0) {
      ModifyOrder.encode(message.modifyOrder, writer2.uint32(26).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseDepthOrder_Entry();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addOrder = AddOrder.decode(reader2, reader2.uint32());
          break;
        case 2:
          message.deleteOrder = DeleteOrder.decode(reader2, reader2.uint32());
          break;
        case 3:
          message.modifyOrder = ModifyOrder.decode(reader2, reader2.uint32());
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      addOrder: isSet$1(object.addOrder) ? AddOrder.fromJSON(object.addOrder) : void 0,
      deleteOrder: isSet$1(object.deleteOrder) ? DeleteOrder.fromJSON(object.deleteOrder) : void 0,
      modifyOrder: isSet$1(object.modifyOrder) ? ModifyOrder.fromJSON(object.modifyOrder) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.addOrder !== void 0 && (obj.addOrder = message.addOrder ? AddOrder.toJSON(message.addOrder) : void 0);
    message.deleteOrder !== void 0 && (obj.deleteOrder = message.deleteOrder ? DeleteOrder.toJSON(message.deleteOrder) : void 0);
    message.modifyOrder !== void 0 && (obj.modifyOrder = message.modifyOrder ? ModifyOrder.toJSON(message.modifyOrder) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseDepthOrder_Entry();
    message.addOrder = object.addOrder !== void 0 && object.addOrder !== null ? AddOrder.fromPartial(object.addOrder) : void 0;
    message.deleteOrder = object.deleteOrder !== void 0 && object.deleteOrder !== null ? DeleteOrder.fromPartial(object.deleteOrder) : void 0;
    message.modifyOrder = object.modifyOrder !== void 0 && object.modifyOrder !== null ? ModifyOrder.fromPartial(object.modifyOrder) : void 0;
    return message;
  }
};
function createBaseNews() {
  return { originationTime: Long.ZERO, source: "", languageCode: "", headLine: "", text: "", symbols: [] };
}
const News = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.originationTime.isZero()) {
      writer2.uint32(8).sint64(message.originationTime);
    }
    if (message.source !== "") {
      writer2.uint32(18).string(message.source);
    }
    if (message.languageCode !== "") {
      writer2.uint32(26).string(message.languageCode);
    }
    if (message.headLine !== "") {
      writer2.uint32(34).string(message.headLine);
    }
    if (message.text !== "") {
      writer2.uint32(42).string(message.text);
    }
    for (const v of message.symbols) {
      writer2.uint32(50).string(v);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseNews();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.originationTime = reader2.sint64();
          break;
        case 2:
          message.source = reader2.string();
          break;
        case 3:
          message.languageCode = reader2.string();
          break;
        case 4:
          message.headLine = reader2.string();
          break;
        case 5:
          message.text = reader2.string();
          break;
        case 6:
          message.symbols.push(reader2.string());
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      originationTime: isSet$1(object.originationTime) ? Long.fromValue(object.originationTime) : Long.ZERO,
      source: isSet$1(object.source) ? String(object.source) : "",
      languageCode: isSet$1(object.languageCode) ? String(object.languageCode) : "",
      headLine: isSet$1(object.headLine) ? String(object.headLine) : "",
      text: isSet$1(object.text) ? String(object.text) : "",
      symbols: Array.isArray(object == null ? void 0 : object.symbols) ? object.symbols.map((e) => String(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.originationTime !== void 0 && (obj.originationTime = (message.originationTime || Long.ZERO).toString());
    message.source !== void 0 && (obj.source = message.source);
    message.languageCode !== void 0 && (obj.languageCode = message.languageCode);
    message.headLine !== void 0 && (obj.headLine = message.headLine);
    message.text !== void 0 && (obj.text = message.text);
    if (message.symbols) {
      obj.symbols = message.symbols.map((e) => e);
    } else {
      obj.symbols = [];
    }
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e;
    const message = createBaseNews();
    message.originationTime = object.originationTime !== void 0 && object.originationTime !== null ? Long.fromValue(object.originationTime) : Long.ZERO;
    message.source = (_a = object.source) != null ? _a : "";
    message.languageCode = (_b = object.languageCode) != null ? _b : "";
    message.headLine = (_c = object.headLine) != null ? _c : "";
    message.text = (_d = object.text) != null ? _d : "";
    message.symbols = ((_e = object.symbols) == null ? void 0 : _e.map((e) => e)) || [];
    return message;
  }
};
function createBaseClearBook() {
  return { reserved: 0, transactionTime: Long.ZERO };
}
const ClearBook = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.reserved !== 0) {
      writer2.uint32(8).sint32(message.reserved);
    }
    if (!message.transactionTime.isZero()) {
      writer2.uint32(16).sint64(message.transactionTime);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseClearBook();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserved = reader2.sint32();
          break;
        case 2:
          message.transactionTime = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      reserved: isSet$1(object.reserved) ? Number(object.reserved) : 0,
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.reserved !== void 0 && (obj.reserved = Math.round(message.reserved));
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseClearBook();
    message.reserved = (_a = object.reserved) != null ? _a : 0;
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    return message;
  }
};
function createBaseInstrumentStatus() {
  return {
    transactionTime: Long.ZERO,
    tradingStatus: 0,
    openingTime: Long.ZERO,
    note: "",
    tradeDate: 0,
    regulationSHOShortSalePriceTest: 0
  };
}
const InstrumentStatus = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradingStatus !== 0) {
      writer2.uint32(80).int32(message.tradingStatus);
    }
    if (!message.openingTime.isZero()) {
      writer2.uint32(88).sint64(message.openingTime);
    }
    if (message.note !== "") {
      writer2.uint32(98).string(message.note);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(104).sint32(message.tradeDate);
    }
    if (message.regulationSHOShortSalePriceTest !== 0) {
      writer2.uint32(112).int32(message.regulationSHOShortSalePriceTest);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentStatus();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradingStatus = reader2.int32();
          break;
        case 11:
          message.openingTime = reader2.sint64();
          break;
        case 12:
          message.note = reader2.string();
          break;
        case 13:
          message.tradeDate = reader2.sint32();
          break;
        case 14:
          message.regulationSHOShortSalePriceTest = reader2.int32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradingStatus: isSet$1(object.tradingStatus) ? instrumentTradingStatusFromJSON(object.tradingStatus) : 0,
      openingTime: isSet$1(object.openingTime) ? Long.fromValue(object.openingTime) : Long.ZERO,
      note: isSet$1(object.note) ? String(object.note) : "",
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      regulationSHOShortSalePriceTest: isSet$1(object.regulationSHOShortSalePriceTest) ? regulationSHOShortSalePriceTestFromJSON(object.regulationSHOShortSalePriceTest) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradingStatus !== void 0 && (obj.tradingStatus = instrumentTradingStatusToJSON(message.tradingStatus));
    message.openingTime !== void 0 && (obj.openingTime = (message.openingTime || Long.ZERO).toString());
    message.note !== void 0 && (obj.note = message.note);
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.regulationSHOShortSalePriceTest !== void 0 && (obj.regulationSHOShortSalePriceTest = regulationSHOShortSalePriceTestToJSON(
      message.regulationSHOShortSalePriceTest
    ));
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseInstrumentStatus();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradingStatus = (_a = object.tradingStatus) != null ? _a : 0;
    message.openingTime = object.openingTime !== void 0 && object.openingTime !== null ? Long.fromValue(object.openingTime) : Long.ZERO;
    message.note = (_b = object.note) != null ? _b : "";
    message.tradeDate = (_c = object.tradeDate) != null ? _c : 0;
    message.regulationSHOShortSalePriceTest = (_d = object.regulationSHOShortSalePriceTest) != null ? _d : 0;
    return message;
  }
};
function createBaseBestBidOffer() {
  return {
    transactionTime: Long.ZERO,
    bidPrice: Long.ZERO,
    bidQuantity: Long.ZERO,
    bidOrderCount: 0,
    bidOriginator: new Uint8Array(),
    bidQuoteCondition: new Uint8Array(),
    offerPrice: Long.ZERO,
    offerQuantity: Long.ZERO,
    offerOrderCount: 0,
    offerOriginator: new Uint8Array(),
    offerQuoteCondition: new Uint8Array(),
    quoteCondition: new Uint8Array(),
    regional: false,
    transient: false
  };
}
const BestBidOffer = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (!message.bidPrice.isZero()) {
      writer2.uint32(80).sint64(message.bidPrice);
    }
    if (!message.bidQuantity.isZero()) {
      writer2.uint32(88).sint64(message.bidQuantity);
    }
    if (message.bidOrderCount !== 0) {
      writer2.uint32(96).sint32(message.bidOrderCount);
    }
    if (message.bidOriginator.length !== 0) {
      writer2.uint32(106).bytes(message.bidOriginator);
    }
    if (message.bidQuoteCondition.length !== 0) {
      writer2.uint32(114).bytes(message.bidQuoteCondition);
    }
    if (!message.offerPrice.isZero()) {
      writer2.uint32(160).sint64(message.offerPrice);
    }
    if (!message.offerQuantity.isZero()) {
      writer2.uint32(168).sint64(message.offerQuantity);
    }
    if (message.offerOrderCount !== 0) {
      writer2.uint32(176).sint32(message.offerOrderCount);
    }
    if (message.offerOriginator.length !== 0) {
      writer2.uint32(186).bytes(message.offerOriginator);
    }
    if (message.offerQuoteCondition.length !== 0) {
      writer2.uint32(194).bytes(message.offerQuoteCondition);
    }
    if (message.quoteCondition.length !== 0) {
      writer2.uint32(242).bytes(message.quoteCondition);
    }
    if (message.regional === true) {
      writer2.uint32(256).bool(message.regional);
    }
    if (message.transient === true) {
      writer2.uint32(264).bool(message.transient);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseBestBidOffer();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.bidPrice = reader2.sint64();
          break;
        case 11:
          message.bidQuantity = reader2.sint64();
          break;
        case 12:
          message.bidOrderCount = reader2.sint32();
          break;
        case 13:
          message.bidOriginator = reader2.bytes();
          break;
        case 14:
          message.bidQuoteCondition = reader2.bytes();
          break;
        case 20:
          message.offerPrice = reader2.sint64();
          break;
        case 21:
          message.offerQuantity = reader2.sint64();
          break;
        case 22:
          message.offerOrderCount = reader2.sint32();
          break;
        case 23:
          message.offerOriginator = reader2.bytes();
          break;
        case 24:
          message.offerQuoteCondition = reader2.bytes();
          break;
        case 30:
          message.quoteCondition = reader2.bytes();
          break;
        case 32:
          message.regional = reader2.bool();
          break;
        case 33:
          message.transient = reader2.bool();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      bidPrice: isSet$1(object.bidPrice) ? Long.fromValue(object.bidPrice) : Long.ZERO,
      bidQuantity: isSet$1(object.bidQuantity) ? Long.fromValue(object.bidQuantity) : Long.ZERO,
      bidOrderCount: isSet$1(object.bidOrderCount) ? Number(object.bidOrderCount) : 0,
      bidOriginator: isSet$1(object.bidOriginator) ? bytesFromBase64(object.bidOriginator) : new Uint8Array(),
      bidQuoteCondition: isSet$1(object.bidQuoteCondition) ? bytesFromBase64(object.bidQuoteCondition) : new Uint8Array(),
      offerPrice: isSet$1(object.offerPrice) ? Long.fromValue(object.offerPrice) : Long.ZERO,
      offerQuantity: isSet$1(object.offerQuantity) ? Long.fromValue(object.offerQuantity) : Long.ZERO,
      offerOrderCount: isSet$1(object.offerOrderCount) ? Number(object.offerOrderCount) : 0,
      offerOriginator: isSet$1(object.offerOriginator) ? bytesFromBase64(object.offerOriginator) : new Uint8Array(),
      offerQuoteCondition: isSet$1(object.offerQuoteCondition) ? bytesFromBase64(object.offerQuoteCondition) : new Uint8Array(),
      quoteCondition: isSet$1(object.quoteCondition) ? bytesFromBase64(object.quoteCondition) : new Uint8Array(),
      regional: isSet$1(object.regional) ? Boolean(object.regional) : false,
      transient: isSet$1(object.transient) ? Boolean(object.transient) : false
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.bidPrice !== void 0 && (obj.bidPrice = (message.bidPrice || Long.ZERO).toString());
    message.bidQuantity !== void 0 && (obj.bidQuantity = (message.bidQuantity || Long.ZERO).toString());
    message.bidOrderCount !== void 0 && (obj.bidOrderCount = Math.round(message.bidOrderCount));
    message.bidOriginator !== void 0 && (obj.bidOriginator = base64FromBytes(
      message.bidOriginator !== void 0 ? message.bidOriginator : new Uint8Array()
    ));
    message.bidQuoteCondition !== void 0 && (obj.bidQuoteCondition = base64FromBytes(
      message.bidQuoteCondition !== void 0 ? message.bidQuoteCondition : new Uint8Array()
    ));
    message.offerPrice !== void 0 && (obj.offerPrice = (message.offerPrice || Long.ZERO).toString());
    message.offerQuantity !== void 0 && (obj.offerQuantity = (message.offerQuantity || Long.ZERO).toString());
    message.offerOrderCount !== void 0 && (obj.offerOrderCount = Math.round(message.offerOrderCount));
    message.offerOriginator !== void 0 && (obj.offerOriginator = base64FromBytes(
      message.offerOriginator !== void 0 ? message.offerOriginator : new Uint8Array()
    ));
    message.offerQuoteCondition !== void 0 && (obj.offerQuoteCondition = base64FromBytes(
      message.offerQuoteCondition !== void 0 ? message.offerQuoteCondition : new Uint8Array()
    ));
    message.quoteCondition !== void 0 && (obj.quoteCondition = base64FromBytes(
      message.quoteCondition !== void 0 ? message.quoteCondition : new Uint8Array()
    ));
    message.regional !== void 0 && (obj.regional = message.regional);
    message.transient !== void 0 && (obj.transient = message.transient);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const message = createBaseBestBidOffer();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.bidPrice = object.bidPrice !== void 0 && object.bidPrice !== null ? Long.fromValue(object.bidPrice) : Long.ZERO;
    message.bidQuantity = object.bidQuantity !== void 0 && object.bidQuantity !== null ? Long.fromValue(object.bidQuantity) : Long.ZERO;
    message.bidOrderCount = (_a = object.bidOrderCount) != null ? _a : 0;
    message.bidOriginator = (_b = object.bidOriginator) != null ? _b : new Uint8Array();
    message.bidQuoteCondition = (_c = object.bidQuoteCondition) != null ? _c : new Uint8Array();
    message.offerPrice = object.offerPrice !== void 0 && object.offerPrice !== null ? Long.fromValue(object.offerPrice) : Long.ZERO;
    message.offerQuantity = object.offerQuantity !== void 0 && object.offerQuantity !== null ? Long.fromValue(object.offerQuantity) : Long.ZERO;
    message.offerOrderCount = (_d = object.offerOrderCount) != null ? _d : 0;
    message.offerOriginator = (_e = object.offerOriginator) != null ? _e : new Uint8Array();
    message.offerQuoteCondition = (_f = object.offerQuoteCondition) != null ? _f : new Uint8Array();
    message.quoteCondition = (_g = object.quoteCondition) != null ? _g : new Uint8Array();
    message.regional = (_h = object.regional) != null ? _h : false;
    message.transient = (_i = object.transient) != null ? _i : false;
    return message;
  }
};
function createBaseAddPriceLevel() {
  return {
    transactionTime: Long.ZERO,
    level: 0,
    side: 0,
    price: Long.ZERO,
    quantity: Long.ZERO,
    orderCount: 0,
    impliedQuantity: Long.ZERO
  };
}
const AddPriceLevel = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.level !== 0) {
      writer2.uint32(80).sint32(message.level);
    }
    if (message.side !== 0) {
      writer2.uint32(88).int32(message.side);
    }
    if (!message.price.isZero()) {
      writer2.uint32(96).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer2.uint32(104).sint64(message.quantity);
    }
    if (message.orderCount !== 0) {
      writer2.uint32(112).sint32(message.orderCount);
    }
    if (!message.impliedQuantity.isZero()) {
      writer2.uint32(120).sint64(message.impliedQuantity);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseAddPriceLevel();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.level = reader2.sint32();
          break;
        case 11:
          message.side = reader2.int32();
          break;
        case 12:
          message.price = reader2.sint64();
          break;
        case 13:
          message.quantity = reader2.sint64();
          break;
        case 14:
          message.orderCount = reader2.sint32();
          break;
        case 15:
          message.impliedQuantity = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      level: isSet$1(object.level) ? Number(object.level) : 0,
      side: isSet$1(object.side) ? bookSideFromJSON(object.side) : 0,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet$1(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      orderCount: isSet$1(object.orderCount) ? Number(object.orderCount) : 0,
      impliedQuantity: isSet$1(object.impliedQuantity) ? Long.fromValue(object.impliedQuantity) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.level !== void 0 && (obj.level = Math.round(message.level));
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.orderCount !== void 0 && (obj.orderCount = Math.round(message.orderCount));
    message.impliedQuantity !== void 0 && (obj.impliedQuantity = (message.impliedQuantity || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseAddPriceLevel();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.level = (_a = object.level) != null ? _a : 0;
    message.side = (_b = object.side) != null ? _b : 0;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? Long.fromValue(object.quantity) : Long.ZERO;
    message.orderCount = (_c = object.orderCount) != null ? _c : 0;
    message.impliedQuantity = object.impliedQuantity !== void 0 && object.impliedQuantity !== null ? Long.fromValue(object.impliedQuantity) : Long.ZERO;
    return message;
  }
};
function createBaseDeletePriceLevel() {
  return { transactionTime: Long.ZERO, level: 0, side: 0 };
}
const DeletePriceLevel = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.level !== 0) {
      writer2.uint32(80).sint32(message.level);
    }
    if (message.side !== 0) {
      writer2.uint32(88).int32(message.side);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseDeletePriceLevel();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.level = reader2.sint32();
          break;
        case 11:
          message.side = reader2.int32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      level: isSet$1(object.level) ? Number(object.level) : 0,
      side: isSet$1(object.side) ? bookSideFromJSON(object.side) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.level !== void 0 && (obj.level = Math.round(message.level));
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseDeletePriceLevel();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.level = (_a = object.level) != null ? _a : 0;
    message.side = (_b = object.side) != null ? _b : 0;
    return message;
  }
};
function createBaseModifyPriceLevel() {
  return {
    transactionTime: Long.ZERO,
    level: 0,
    side: 0,
    price: Long.ZERO,
    quantity: Long.ZERO,
    orderCount: 0,
    impliedQuantity: Long.ZERO
  };
}
const ModifyPriceLevel = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.level !== 0) {
      writer2.uint32(80).sint32(message.level);
    }
    if (message.side !== 0) {
      writer2.uint32(88).int32(message.side);
    }
    if (!message.price.isZero()) {
      writer2.uint32(96).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer2.uint32(104).sint64(message.quantity);
    }
    if (message.orderCount !== 0) {
      writer2.uint32(112).sint32(message.orderCount);
    }
    if (!message.impliedQuantity.isZero()) {
      writer2.uint32(120).sint64(message.impliedQuantity);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseModifyPriceLevel();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.level = reader2.sint32();
          break;
        case 11:
          message.side = reader2.int32();
          break;
        case 12:
          message.price = reader2.sint64();
          break;
        case 13:
          message.quantity = reader2.sint64();
          break;
        case 14:
          message.orderCount = reader2.sint32();
          break;
        case 15:
          message.impliedQuantity = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      level: isSet$1(object.level) ? Number(object.level) : 0,
      side: isSet$1(object.side) ? bookSideFromJSON(object.side) : 0,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet$1(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      orderCount: isSet$1(object.orderCount) ? Number(object.orderCount) : 0,
      impliedQuantity: isSet$1(object.impliedQuantity) ? Long.fromValue(object.impliedQuantity) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.level !== void 0 && (obj.level = Math.round(message.level));
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.orderCount !== void 0 && (obj.orderCount = Math.round(message.orderCount));
    message.impliedQuantity !== void 0 && (obj.impliedQuantity = (message.impliedQuantity || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseModifyPriceLevel();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.level = (_a = object.level) != null ? _a : 0;
    message.side = (_b = object.side) != null ? _b : 0;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? Long.fromValue(object.quantity) : Long.ZERO;
    message.orderCount = (_c = object.orderCount) != null ? _c : 0;
    message.impliedQuantity = object.impliedQuantity !== void 0 && object.impliedQuantity !== null ? Long.fromValue(object.impliedQuantity) : Long.ZERO;
    return message;
  }
};
function createBaseAddOrder() {
  return {
    transactionTime: Long.ZERO,
    orderId: Long.ZERO,
    side: 0,
    price: Long.ZERO,
    quantity: Long.ZERO,
    isImplied: false,
    priority: Long.ZERO
  };
}
const AddOrder = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (!message.orderId.isZero()) {
      writer2.uint32(80).sint64(message.orderId);
    }
    if (message.side !== 0) {
      writer2.uint32(88).int32(message.side);
    }
    if (!message.price.isZero()) {
      writer2.uint32(96).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer2.uint32(104).sint64(message.quantity);
    }
    if (message.isImplied === true) {
      writer2.uint32(112).bool(message.isImplied);
    }
    if (!message.priority.isZero()) {
      writer2.uint32(120).sint64(message.priority);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseAddOrder();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.orderId = reader2.sint64();
          break;
        case 11:
          message.side = reader2.int32();
          break;
        case 12:
          message.price = reader2.sint64();
          break;
        case 13:
          message.quantity = reader2.sint64();
          break;
        case 14:
          message.isImplied = reader2.bool();
          break;
        case 15:
          message.priority = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      orderId: isSet$1(object.orderId) ? Long.fromValue(object.orderId) : Long.ZERO,
      side: isSet$1(object.side) ? bookSideFromJSON(object.side) : 0,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet$1(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      isImplied: isSet$1(object.isImplied) ? Boolean(object.isImplied) : false,
      priority: isSet$1(object.priority) ? Long.fromValue(object.priority) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.orderId !== void 0 && (obj.orderId = (message.orderId || Long.ZERO).toString());
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.isImplied !== void 0 && (obj.isImplied = message.isImplied);
    message.priority !== void 0 && (obj.priority = (message.priority || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseAddOrder();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.orderId = object.orderId !== void 0 && object.orderId !== null ? Long.fromValue(object.orderId) : Long.ZERO;
    message.side = (_a = object.side) != null ? _a : 0;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? Long.fromValue(object.quantity) : Long.ZERO;
    message.isImplied = (_b = object.isImplied) != null ? _b : false;
    message.priority = object.priority !== void 0 && object.priority !== null ? Long.fromValue(object.priority) : Long.ZERO;
    return message;
  }
};
function createBaseDeleteOrder() {
  return { transactionTime: Long.ZERO, orderId: Long.ZERO, side: 0 };
}
const DeleteOrder = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (!message.orderId.isZero()) {
      writer2.uint32(80).sint64(message.orderId);
    }
    if (message.side !== 0) {
      writer2.uint32(88).int32(message.side);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseDeleteOrder();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.orderId = reader2.sint64();
          break;
        case 11:
          message.side = reader2.int32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      orderId: isSet$1(object.orderId) ? Long.fromValue(object.orderId) : Long.ZERO,
      side: isSet$1(object.side) ? bookSideFromJSON(object.side) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.orderId !== void 0 && (obj.orderId = (message.orderId || Long.ZERO).toString());
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseDeleteOrder();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.orderId = object.orderId !== void 0 && object.orderId !== null ? Long.fromValue(object.orderId) : Long.ZERO;
    message.side = (_a = object.side) != null ? _a : 0;
    return message;
  }
};
function createBaseModifyOrder() {
  return {
    transactionTime: Long.ZERO,
    orderId: Long.ZERO,
    side: 0,
    price: Long.ZERO,
    quantity: Long.ZERO,
    isImplied: false,
    priority: Long.ZERO
  };
}
const ModifyOrder = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (!message.orderId.isZero()) {
      writer2.uint32(80).sint64(message.orderId);
    }
    if (message.side !== 0) {
      writer2.uint32(88).int32(message.side);
    }
    if (!message.price.isZero()) {
      writer2.uint32(96).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer2.uint32(104).sint64(message.quantity);
    }
    if (message.isImplied === true) {
      writer2.uint32(112).bool(message.isImplied);
    }
    if (!message.priority.isZero()) {
      writer2.uint32(120).sint64(message.priority);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseModifyOrder();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.orderId = reader2.sint64();
          break;
        case 11:
          message.side = reader2.int32();
          break;
        case 12:
          message.price = reader2.sint64();
          break;
        case 13:
          message.quantity = reader2.sint64();
          break;
        case 14:
          message.isImplied = reader2.bool();
          break;
        case 15:
          message.priority = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      orderId: isSet$1(object.orderId) ? Long.fromValue(object.orderId) : Long.ZERO,
      side: isSet$1(object.side) ? bookSideFromJSON(object.side) : 0,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet$1(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      isImplied: isSet$1(object.isImplied) ? Boolean(object.isImplied) : false,
      priority: isSet$1(object.priority) ? Long.fromValue(object.priority) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.orderId !== void 0 && (obj.orderId = (message.orderId || Long.ZERO).toString());
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.isImplied !== void 0 && (obj.isImplied = message.isImplied);
    message.priority !== void 0 && (obj.priority = (message.priority || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseModifyOrder();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.orderId = object.orderId !== void 0 && object.orderId !== null ? Long.fromValue(object.orderId) : Long.ZERO;
    message.side = (_a = object.side) != null ? _a : 0;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? Long.fromValue(object.quantity) : Long.ZERO;
    message.isImplied = (_b = object.isImplied) != null ? _b : false;
    message.priority = object.priority !== void 0 && object.priority !== null ? Long.fromValue(object.priority) : Long.ZERO;
    return message;
  }
};
function createBaseIndexValue() {
  return {
    transactionTime: Long.ZERO,
    tradeDate: 0,
    last: Long.ZERO,
    volume: Long.ZERO,
    open: Long.ZERO,
    settlementOpen: Long.ZERO,
    specialOpen: Long.ZERO,
    high: Long.ZERO,
    low: Long.ZERO,
    close: Long.ZERO,
    bid: Long.ZERO,
    offer: Long.ZERO
  };
}
const IndexValue = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.last.isZero()) {
      writer2.uint32(88).sint64(message.last);
    }
    if (!message.volume.isZero()) {
      writer2.uint32(96).sint64(message.volume);
    }
    if (!message.open.isZero()) {
      writer2.uint32(104).sint64(message.open);
    }
    if (!message.settlementOpen.isZero()) {
      writer2.uint32(112).sint64(message.settlementOpen);
    }
    if (!message.specialOpen.isZero()) {
      writer2.uint32(120).sint64(message.specialOpen);
    }
    if (!message.high.isZero()) {
      writer2.uint32(128).sint64(message.high);
    }
    if (!message.low.isZero()) {
      writer2.uint32(136).sint64(message.low);
    }
    if (!message.close.isZero()) {
      writer2.uint32(144).sint64(message.close);
    }
    if (!message.bid.isZero()) {
      writer2.uint32(152).sint64(message.bid);
    }
    if (!message.offer.isZero()) {
      writer2.uint32(160).sint64(message.offer);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseIndexValue();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.last = reader2.sint64();
          break;
        case 12:
          message.volume = reader2.sint64();
          break;
        case 13:
          message.open = reader2.sint64();
          break;
        case 14:
          message.settlementOpen = reader2.sint64();
          break;
        case 15:
          message.specialOpen = reader2.sint64();
          break;
        case 16:
          message.high = reader2.sint64();
          break;
        case 17:
          message.low = reader2.sint64();
          break;
        case 18:
          message.close = reader2.sint64();
          break;
        case 19:
          message.bid = reader2.sint64();
          break;
        case 20:
          message.offer = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      last: isSet$1(object.last) ? Long.fromValue(object.last) : Long.ZERO,
      volume: isSet$1(object.volume) ? Long.fromValue(object.volume) : Long.ZERO,
      open: isSet$1(object.open) ? Long.fromValue(object.open) : Long.ZERO,
      settlementOpen: isSet$1(object.settlementOpen) ? Long.fromValue(object.settlementOpen) : Long.ZERO,
      specialOpen: isSet$1(object.specialOpen) ? Long.fromValue(object.specialOpen) : Long.ZERO,
      high: isSet$1(object.high) ? Long.fromValue(object.high) : Long.ZERO,
      low: isSet$1(object.low) ? Long.fromValue(object.low) : Long.ZERO,
      close: isSet$1(object.close) ? Long.fromValue(object.close) : Long.ZERO,
      bid: isSet$1(object.bid) ? Long.fromValue(object.bid) : Long.ZERO,
      offer: isSet$1(object.offer) ? Long.fromValue(object.offer) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.last !== void 0 && (obj.last = (message.last || Long.ZERO).toString());
    message.volume !== void 0 && (obj.volume = (message.volume || Long.ZERO).toString());
    message.open !== void 0 && (obj.open = (message.open || Long.ZERO).toString());
    message.settlementOpen !== void 0 && (obj.settlementOpen = (message.settlementOpen || Long.ZERO).toString());
    message.specialOpen !== void 0 && (obj.specialOpen = (message.specialOpen || Long.ZERO).toString());
    message.high !== void 0 && (obj.high = (message.high || Long.ZERO).toString());
    message.low !== void 0 && (obj.low = (message.low || Long.ZERO).toString());
    message.close !== void 0 && (obj.close = (message.close || Long.ZERO).toString());
    message.bid !== void 0 && (obj.bid = (message.bid || Long.ZERO).toString());
    message.offer !== void 0 && (obj.offer = (message.offer || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseIndexValue();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.last = object.last !== void 0 && object.last !== null ? Long.fromValue(object.last) : Long.ZERO;
    message.volume = object.volume !== void 0 && object.volume !== null ? Long.fromValue(object.volume) : Long.ZERO;
    message.open = object.open !== void 0 && object.open !== null ? Long.fromValue(object.open) : Long.ZERO;
    message.settlementOpen = object.settlementOpen !== void 0 && object.settlementOpen !== null ? Long.fromValue(object.settlementOpen) : Long.ZERO;
    message.specialOpen = object.specialOpen !== void 0 && object.specialOpen !== null ? Long.fromValue(object.specialOpen) : Long.ZERO;
    message.high = object.high !== void 0 && object.high !== null ? Long.fromValue(object.high) : Long.ZERO;
    message.low = object.low !== void 0 && object.low !== null ? Long.fromValue(object.low) : Long.ZERO;
    message.close = object.close !== void 0 && object.close !== null ? Long.fromValue(object.close) : Long.ZERO;
    message.bid = object.bid !== void 0 && object.bid !== null ? Long.fromValue(object.bid) : Long.ZERO;
    message.offer = object.offer !== void 0 && object.offer !== null ? Long.fromValue(object.offer) : Long.ZERO;
    return message;
  }
};
function createBaseTrades() {
  return { trades: [] };
}
const Trades = {
  encode(message, writer2 = _m0.Writer.create()) {
    for (const v of message.trades) {
      Trades_Entry.encode(v, writer2.uint32(10).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseTrades();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trades.push(Trades_Entry.decode(reader2, reader2.uint32()));
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { trades: Array.isArray(object == null ? void 0 : object.trades) ? object.trades.map((e) => Trades_Entry.fromJSON(e)) : [] };
  },
  toJSON(message) {
    const obj = {};
    if (message.trades) {
      obj.trades = message.trades.map((e) => e ? Trades_Entry.toJSON(e) : void 0);
    } else {
      obj.trades = [];
    }
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseTrades();
    message.trades = ((_a = object.trades) == null ? void 0 : _a.map((e) => Trades_Entry.fromPartial(e))) || [];
    return message;
  }
};
function createBaseTrades_Entry() {
  return { trade: void 0, tradeCorrection: void 0, tradeCancel: void 0 };
}
const Trades_Entry = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.trade !== void 0) {
      Trade.encode(message.trade, writer2.uint32(10).fork()).ldelim();
    }
    if (message.tradeCorrection !== void 0) {
      TradeCorrection.encode(message.tradeCorrection, writer2.uint32(18).fork()).ldelim();
    }
    if (message.tradeCancel !== void 0) {
      TradeCancel.encode(message.tradeCancel, writer2.uint32(26).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseTrades_Entry();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trade = Trade.decode(reader2, reader2.uint32());
          break;
        case 2:
          message.tradeCorrection = TradeCorrection.decode(reader2, reader2.uint32());
          break;
        case 3:
          message.tradeCancel = TradeCancel.decode(reader2, reader2.uint32());
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      trade: isSet$1(object.trade) ? Trade.fromJSON(object.trade) : void 0,
      tradeCorrection: isSet$1(object.tradeCorrection) ? TradeCorrection.fromJSON(object.tradeCorrection) : void 0,
      tradeCancel: isSet$1(object.tradeCancel) ? TradeCancel.fromJSON(object.tradeCancel) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.trade !== void 0 && (obj.trade = message.trade ? Trade.toJSON(message.trade) : void 0);
    message.tradeCorrection !== void 0 && (obj.tradeCorrection = message.tradeCorrection ? TradeCorrection.toJSON(message.tradeCorrection) : void 0);
    message.tradeCancel !== void 0 && (obj.tradeCancel = message.tradeCancel ? TradeCancel.toJSON(message.tradeCancel) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseTrades_Entry();
    message.trade = object.trade !== void 0 && object.trade !== null ? Trade.fromPartial(object.trade) : void 0;
    message.tradeCorrection = object.tradeCorrection !== void 0 && object.tradeCorrection !== null ? TradeCorrection.fromPartial(object.tradeCorrection) : void 0;
    message.tradeCancel = object.tradeCancel !== void 0 && object.tradeCancel !== null ? TradeCancel.fromPartial(object.tradeCancel) : void 0;
    return message;
  }
};
function createBaseTrade() {
  return {
    originatorId: new Uint8Array(),
    transactionTime: Long.ZERO,
    price: Long.ZERO,
    quantity: Long.ZERO,
    tradeId: new Uint8Array(),
    side: 0,
    tradeDate: 0,
    buyerId: new Uint8Array(),
    sellerId: new Uint8Array(),
    openingTrade: false,
    systemPriced: false,
    marketOnClose: false,
    oddLot: false,
    settlementTerms: 0,
    crossType: 0,
    byPass: false,
    lastPrice: Long.ZERO,
    saleCondition: new Uint8Array(),
    currency: "",
    doesNotUpdateLast: false,
    doesNotUpdateVolume: false,
    session: "",
    blockTrade: false,
    distributionTime: Long.ZERO,
    transactionTime2: Long.ZERO,
    consolidatedPriceIndicator: "",
    transient: false,
    indexShortName: ""
  };
}
const Trade = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.originatorId.length !== 0) {
      writer2.uint32(66).bytes(message.originatorId);
    }
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (!message.price.isZero()) {
      writer2.uint32(80).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer2.uint32(88).sint64(message.quantity);
    }
    if (message.tradeId.length !== 0) {
      writer2.uint32(98).bytes(message.tradeId);
    }
    if (message.side !== 0) {
      writer2.uint32(104).int32(message.side);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(112).sint32(message.tradeDate);
    }
    if (message.buyerId.length !== 0) {
      writer2.uint32(122).bytes(message.buyerId);
    }
    if (message.sellerId.length !== 0) {
      writer2.uint32(130).bytes(message.sellerId);
    }
    if (message.openingTrade === true) {
      writer2.uint32(136).bool(message.openingTrade);
    }
    if (message.systemPriced === true) {
      writer2.uint32(144).bool(message.systemPriced);
    }
    if (message.marketOnClose === true) {
      writer2.uint32(152).bool(message.marketOnClose);
    }
    if (message.oddLot === true) {
      writer2.uint32(160).bool(message.oddLot);
    }
    if (message.settlementTerms !== 0) {
      writer2.uint32(168).int32(message.settlementTerms);
    }
    if (message.crossType !== 0) {
      writer2.uint32(176).int32(message.crossType);
    }
    if (message.byPass === true) {
      writer2.uint32(184).bool(message.byPass);
    }
    if (!message.lastPrice.isZero()) {
      writer2.uint32(192).sint64(message.lastPrice);
    }
    if (message.saleCondition.length !== 0) {
      writer2.uint32(202).bytes(message.saleCondition);
    }
    if (message.currency !== "") {
      writer2.uint32(210).string(message.currency);
    }
    if (message.doesNotUpdateLast === true) {
      writer2.uint32(216).bool(message.doesNotUpdateLast);
    }
    if (message.doesNotUpdateVolume === true) {
      writer2.uint32(224).bool(message.doesNotUpdateVolume);
    }
    if (message.session !== "") {
      writer2.uint32(242).string(message.session);
    }
    if (message.blockTrade === true) {
      writer2.uint32(248).bool(message.blockTrade);
    }
    if (!message.distributionTime.isZero()) {
      writer2.uint32(256).sint64(message.distributionTime);
    }
    if (!message.transactionTime2.isZero()) {
      writer2.uint32(264).sint64(message.transactionTime2);
    }
    if (message.consolidatedPriceIndicator !== "") {
      writer2.uint32(274).string(message.consolidatedPriceIndicator);
    }
    if (message.transient === true) {
      writer2.uint32(280).bool(message.transient);
    }
    if (message.indexShortName !== "") {
      writer2.uint32(290).string(message.indexShortName);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseTrade();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 8:
          message.originatorId = reader2.bytes();
          break;
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.price = reader2.sint64();
          break;
        case 11:
          message.quantity = reader2.sint64();
          break;
        case 12:
          message.tradeId = reader2.bytes();
          break;
        case 13:
          message.side = reader2.int32();
          break;
        case 14:
          message.tradeDate = reader2.sint32();
          break;
        case 15:
          message.buyerId = reader2.bytes();
          break;
        case 16:
          message.sellerId = reader2.bytes();
          break;
        case 17:
          message.openingTrade = reader2.bool();
          break;
        case 18:
          message.systemPriced = reader2.bool();
          break;
        case 19:
          message.marketOnClose = reader2.bool();
          break;
        case 20:
          message.oddLot = reader2.bool();
          break;
        case 21:
          message.settlementTerms = reader2.int32();
          break;
        case 22:
          message.crossType = reader2.int32();
          break;
        case 23:
          message.byPass = reader2.bool();
          break;
        case 24:
          message.lastPrice = reader2.sint64();
          break;
        case 25:
          message.saleCondition = reader2.bytes();
          break;
        case 26:
          message.currency = reader2.string();
          break;
        case 27:
          message.doesNotUpdateLast = reader2.bool();
          break;
        case 28:
          message.doesNotUpdateVolume = reader2.bool();
          break;
        case 30:
          message.session = reader2.string();
          break;
        case 31:
          message.blockTrade = reader2.bool();
          break;
        case 32:
          message.distributionTime = reader2.sint64();
          break;
        case 33:
          message.transactionTime2 = reader2.sint64();
          break;
        case 34:
          message.consolidatedPriceIndicator = reader2.string();
          break;
        case 35:
          message.transient = reader2.bool();
          break;
        case 36:
          message.indexShortName = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      originatorId: isSet$1(object.originatorId) ? bytesFromBase64(object.originatorId) : new Uint8Array(),
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet$1(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      tradeId: isSet$1(object.tradeId) ? bytesFromBase64(object.tradeId) : new Uint8Array(),
      side: isSet$1(object.side) ? bookSideFromJSON(object.side) : 0,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      buyerId: isSet$1(object.buyerId) ? bytesFromBase64(object.buyerId) : new Uint8Array(),
      sellerId: isSet$1(object.sellerId) ? bytesFromBase64(object.sellerId) : new Uint8Array(),
      openingTrade: isSet$1(object.openingTrade) ? Boolean(object.openingTrade) : false,
      systemPriced: isSet$1(object.systemPriced) ? Boolean(object.systemPriced) : false,
      marketOnClose: isSet$1(object.marketOnClose) ? Boolean(object.marketOnClose) : false,
      oddLot: isSet$1(object.oddLot) ? Boolean(object.oddLot) : false,
      settlementTerms: isSet$1(object.settlementTerms) ? settlementTermsFromJSON(object.settlementTerms) : 0,
      crossType: isSet$1(object.crossType) ? crossTypeFromJSON(object.crossType) : 0,
      byPass: isSet$1(object.byPass) ? Boolean(object.byPass) : false,
      lastPrice: isSet$1(object.lastPrice) ? Long.fromValue(object.lastPrice) : Long.ZERO,
      saleCondition: isSet$1(object.saleCondition) ? bytesFromBase64(object.saleCondition) : new Uint8Array(),
      currency: isSet$1(object.currency) ? String(object.currency) : "",
      doesNotUpdateLast: isSet$1(object.doesNotUpdateLast) ? Boolean(object.doesNotUpdateLast) : false,
      doesNotUpdateVolume: isSet$1(object.doesNotUpdateVolume) ? Boolean(object.doesNotUpdateVolume) : false,
      session: isSet$1(object.session) ? String(object.session) : "",
      blockTrade: isSet$1(object.blockTrade) ? Boolean(object.blockTrade) : false,
      distributionTime: isSet$1(object.distributionTime) ? Long.fromValue(object.distributionTime) : Long.ZERO,
      transactionTime2: isSet$1(object.transactionTime2) ? Long.fromValue(object.transactionTime2) : Long.ZERO,
      consolidatedPriceIndicator: isSet$1(object.consolidatedPriceIndicator) ? String(object.consolidatedPriceIndicator) : "",
      transient: isSet$1(object.transient) ? Boolean(object.transient) : false,
      indexShortName: isSet$1(object.indexShortName) ? String(object.indexShortName) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.originatorId !== void 0 && (obj.originatorId = base64FromBytes(
      message.originatorId !== void 0 ? message.originatorId : new Uint8Array()
    ));
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.tradeId !== void 0 && (obj.tradeId = base64FromBytes(message.tradeId !== void 0 ? message.tradeId : new Uint8Array()));
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.buyerId !== void 0 && (obj.buyerId = base64FromBytes(message.buyerId !== void 0 ? message.buyerId : new Uint8Array()));
    message.sellerId !== void 0 && (obj.sellerId = base64FromBytes(message.sellerId !== void 0 ? message.sellerId : new Uint8Array()));
    message.openingTrade !== void 0 && (obj.openingTrade = message.openingTrade);
    message.systemPriced !== void 0 && (obj.systemPriced = message.systemPriced);
    message.marketOnClose !== void 0 && (obj.marketOnClose = message.marketOnClose);
    message.oddLot !== void 0 && (obj.oddLot = message.oddLot);
    message.settlementTerms !== void 0 && (obj.settlementTerms = settlementTermsToJSON(message.settlementTerms));
    message.crossType !== void 0 && (obj.crossType = crossTypeToJSON(message.crossType));
    message.byPass !== void 0 && (obj.byPass = message.byPass);
    message.lastPrice !== void 0 && (obj.lastPrice = (message.lastPrice || Long.ZERO).toString());
    message.saleCondition !== void 0 && (obj.saleCondition = base64FromBytes(
      message.saleCondition !== void 0 ? message.saleCondition : new Uint8Array()
    ));
    message.currency !== void 0 && (obj.currency = message.currency);
    message.doesNotUpdateLast !== void 0 && (obj.doesNotUpdateLast = message.doesNotUpdateLast);
    message.doesNotUpdateVolume !== void 0 && (obj.doesNotUpdateVolume = message.doesNotUpdateVolume);
    message.session !== void 0 && (obj.session = message.session);
    message.blockTrade !== void 0 && (obj.blockTrade = message.blockTrade);
    message.distributionTime !== void 0 && (obj.distributionTime = (message.distributionTime || Long.ZERO).toString());
    message.transactionTime2 !== void 0 && (obj.transactionTime2 = (message.transactionTime2 || Long.ZERO).toString());
    message.consolidatedPriceIndicator !== void 0 && (obj.consolidatedPriceIndicator = message.consolidatedPriceIndicator);
    message.transient !== void 0 && (obj.transient = message.transient);
    message.indexShortName !== void 0 && (obj.indexShortName = message.indexShortName);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
    const message = createBaseTrade();
    message.originatorId = (_a = object.originatorId) != null ? _a : new Uint8Array();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? Long.fromValue(object.quantity) : Long.ZERO;
    message.tradeId = (_b = object.tradeId) != null ? _b : new Uint8Array();
    message.side = (_c = object.side) != null ? _c : 0;
    message.tradeDate = (_d = object.tradeDate) != null ? _d : 0;
    message.buyerId = (_e = object.buyerId) != null ? _e : new Uint8Array();
    message.sellerId = (_f = object.sellerId) != null ? _f : new Uint8Array();
    message.openingTrade = (_g = object.openingTrade) != null ? _g : false;
    message.systemPriced = (_h = object.systemPriced) != null ? _h : false;
    message.marketOnClose = (_i = object.marketOnClose) != null ? _i : false;
    message.oddLot = (_j = object.oddLot) != null ? _j : false;
    message.settlementTerms = (_k = object.settlementTerms) != null ? _k : 0;
    message.crossType = (_l = object.crossType) != null ? _l : 0;
    message.byPass = (_m = object.byPass) != null ? _m : false;
    message.lastPrice = object.lastPrice !== void 0 && object.lastPrice !== null ? Long.fromValue(object.lastPrice) : Long.ZERO;
    message.saleCondition = (_n = object.saleCondition) != null ? _n : new Uint8Array();
    message.currency = (_o = object.currency) != null ? _o : "";
    message.doesNotUpdateLast = (_p = object.doesNotUpdateLast) != null ? _p : false;
    message.doesNotUpdateVolume = (_q = object.doesNotUpdateVolume) != null ? _q : false;
    message.session = (_r = object.session) != null ? _r : "";
    message.blockTrade = (_s = object.blockTrade) != null ? _s : false;
    message.distributionTime = object.distributionTime !== void 0 && object.distributionTime !== null ? Long.fromValue(object.distributionTime) : Long.ZERO;
    message.transactionTime2 = object.transactionTime2 !== void 0 && object.transactionTime2 !== null ? Long.fromValue(object.transactionTime2) : Long.ZERO;
    message.consolidatedPriceIndicator = (_t = object.consolidatedPriceIndicator) != null ? _t : "";
    message.transient = (_u = object.transient) != null ? _u : false;
    message.indexShortName = (_v = object.indexShortName) != null ? _v : "";
    return message;
  }
};
function createBaseTradeCorrection() {
  return {
    originatorId: new Uint8Array(),
    transactionTime: Long.ZERO,
    price: Long.ZERO,
    quantity: Long.ZERO,
    tradeId: new Uint8Array(),
    side: 0,
    tradeDate: 0,
    buyerId: new Uint8Array(),
    sellerId: new Uint8Array(),
    openingTrade: false,
    systemPriced: false,
    marketOnClose: false,
    oddLot: false,
    settlementTerms: 0,
    crossType: 0,
    byPass: false,
    originalTradeId: new Uint8Array(),
    saleCondition: new Uint8Array(),
    currency: "",
    distributionTime: Long.ZERO,
    transactionTime2: Long.ZERO,
    originalTradePrice: Long.ZERO,
    originalTradeQuantity: Long.ZERO
  };
}
const TradeCorrection = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.originatorId.length !== 0) {
      writer2.uint32(66).bytes(message.originatorId);
    }
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (!message.price.isZero()) {
      writer2.uint32(80).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer2.uint32(88).sint64(message.quantity);
    }
    if (message.tradeId.length !== 0) {
      writer2.uint32(98).bytes(message.tradeId);
    }
    if (message.side !== 0) {
      writer2.uint32(104).int32(message.side);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(112).sint32(message.tradeDate);
    }
    if (message.buyerId.length !== 0) {
      writer2.uint32(122).bytes(message.buyerId);
    }
    if (message.sellerId.length !== 0) {
      writer2.uint32(130).bytes(message.sellerId);
    }
    if (message.openingTrade === true) {
      writer2.uint32(136).bool(message.openingTrade);
    }
    if (message.systemPriced === true) {
      writer2.uint32(144).bool(message.systemPriced);
    }
    if (message.marketOnClose === true) {
      writer2.uint32(152).bool(message.marketOnClose);
    }
    if (message.oddLot === true) {
      writer2.uint32(160).bool(message.oddLot);
    }
    if (message.settlementTerms !== 0) {
      writer2.uint32(168).int32(message.settlementTerms);
    }
    if (message.crossType !== 0) {
      writer2.uint32(176).int32(message.crossType);
    }
    if (message.byPass === true) {
      writer2.uint32(184).bool(message.byPass);
    }
    if (message.originalTradeId.length !== 0) {
      writer2.uint32(194).bytes(message.originalTradeId);
    }
    if (message.saleCondition.length !== 0) {
      writer2.uint32(202).bytes(message.saleCondition);
    }
    if (message.currency !== "") {
      writer2.uint32(210).string(message.currency);
    }
    if (!message.distributionTime.isZero()) {
      writer2.uint32(216).sint64(message.distributionTime);
    }
    if (!message.transactionTime2.isZero()) {
      writer2.uint32(224).sint64(message.transactionTime2);
    }
    if (!message.originalTradePrice.isZero()) {
      writer2.uint32(232).sint64(message.originalTradePrice);
    }
    if (!message.originalTradeQuantity.isZero()) {
      writer2.uint32(240).sint64(message.originalTradeQuantity);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseTradeCorrection();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 8:
          message.originatorId = reader2.bytes();
          break;
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.price = reader2.sint64();
          break;
        case 11:
          message.quantity = reader2.sint64();
          break;
        case 12:
          message.tradeId = reader2.bytes();
          break;
        case 13:
          message.side = reader2.int32();
          break;
        case 14:
          message.tradeDate = reader2.sint32();
          break;
        case 15:
          message.buyerId = reader2.bytes();
          break;
        case 16:
          message.sellerId = reader2.bytes();
          break;
        case 17:
          message.openingTrade = reader2.bool();
          break;
        case 18:
          message.systemPriced = reader2.bool();
          break;
        case 19:
          message.marketOnClose = reader2.bool();
          break;
        case 20:
          message.oddLot = reader2.bool();
          break;
        case 21:
          message.settlementTerms = reader2.int32();
          break;
        case 22:
          message.crossType = reader2.int32();
          break;
        case 23:
          message.byPass = reader2.bool();
          break;
        case 24:
          message.originalTradeId = reader2.bytes();
          break;
        case 25:
          message.saleCondition = reader2.bytes();
          break;
        case 26:
          message.currency = reader2.string();
          break;
        case 27:
          message.distributionTime = reader2.sint64();
          break;
        case 28:
          message.transactionTime2 = reader2.sint64();
          break;
        case 29:
          message.originalTradePrice = reader2.sint64();
          break;
        case 30:
          message.originalTradeQuantity = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      originatorId: isSet$1(object.originatorId) ? bytesFromBase64(object.originatorId) : new Uint8Array(),
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet$1(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      tradeId: isSet$1(object.tradeId) ? bytesFromBase64(object.tradeId) : new Uint8Array(),
      side: isSet$1(object.side) ? bookSideFromJSON(object.side) : 0,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      buyerId: isSet$1(object.buyerId) ? bytesFromBase64(object.buyerId) : new Uint8Array(),
      sellerId: isSet$1(object.sellerId) ? bytesFromBase64(object.sellerId) : new Uint8Array(),
      openingTrade: isSet$1(object.openingTrade) ? Boolean(object.openingTrade) : false,
      systemPriced: isSet$1(object.systemPriced) ? Boolean(object.systemPriced) : false,
      marketOnClose: isSet$1(object.marketOnClose) ? Boolean(object.marketOnClose) : false,
      oddLot: isSet$1(object.oddLot) ? Boolean(object.oddLot) : false,
      settlementTerms: isSet$1(object.settlementTerms) ? settlementTermsFromJSON(object.settlementTerms) : 0,
      crossType: isSet$1(object.crossType) ? crossTypeFromJSON(object.crossType) : 0,
      byPass: isSet$1(object.byPass) ? Boolean(object.byPass) : false,
      originalTradeId: isSet$1(object.originalTradeId) ? bytesFromBase64(object.originalTradeId) : new Uint8Array(),
      saleCondition: isSet$1(object.saleCondition) ? bytesFromBase64(object.saleCondition) : new Uint8Array(),
      currency: isSet$1(object.currency) ? String(object.currency) : "",
      distributionTime: isSet$1(object.distributionTime) ? Long.fromValue(object.distributionTime) : Long.ZERO,
      transactionTime2: isSet$1(object.transactionTime2) ? Long.fromValue(object.transactionTime2) : Long.ZERO,
      originalTradePrice: isSet$1(object.originalTradePrice) ? Long.fromValue(object.originalTradePrice) : Long.ZERO,
      originalTradeQuantity: isSet$1(object.originalTradeQuantity) ? Long.fromValue(object.originalTradeQuantity) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.originatorId !== void 0 && (obj.originatorId = base64FromBytes(
      message.originatorId !== void 0 ? message.originatorId : new Uint8Array()
    ));
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.tradeId !== void 0 && (obj.tradeId = base64FromBytes(message.tradeId !== void 0 ? message.tradeId : new Uint8Array()));
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.buyerId !== void 0 && (obj.buyerId = base64FromBytes(message.buyerId !== void 0 ? message.buyerId : new Uint8Array()));
    message.sellerId !== void 0 && (obj.sellerId = base64FromBytes(message.sellerId !== void 0 ? message.sellerId : new Uint8Array()));
    message.openingTrade !== void 0 && (obj.openingTrade = message.openingTrade);
    message.systemPriced !== void 0 && (obj.systemPriced = message.systemPriced);
    message.marketOnClose !== void 0 && (obj.marketOnClose = message.marketOnClose);
    message.oddLot !== void 0 && (obj.oddLot = message.oddLot);
    message.settlementTerms !== void 0 && (obj.settlementTerms = settlementTermsToJSON(message.settlementTerms));
    message.crossType !== void 0 && (obj.crossType = crossTypeToJSON(message.crossType));
    message.byPass !== void 0 && (obj.byPass = message.byPass);
    message.originalTradeId !== void 0 && (obj.originalTradeId = base64FromBytes(
      message.originalTradeId !== void 0 ? message.originalTradeId : new Uint8Array()
    ));
    message.saleCondition !== void 0 && (obj.saleCondition = base64FromBytes(
      message.saleCondition !== void 0 ? message.saleCondition : new Uint8Array()
    ));
    message.currency !== void 0 && (obj.currency = message.currency);
    message.distributionTime !== void 0 && (obj.distributionTime = (message.distributionTime || Long.ZERO).toString());
    message.transactionTime2 !== void 0 && (obj.transactionTime2 = (message.transactionTime2 || Long.ZERO).toString());
    message.originalTradePrice !== void 0 && (obj.originalTradePrice = (message.originalTradePrice || Long.ZERO).toString());
    message.originalTradeQuantity !== void 0 && (obj.originalTradeQuantity = (message.originalTradeQuantity || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    const message = createBaseTradeCorrection();
    message.originatorId = (_a = object.originatorId) != null ? _a : new Uint8Array();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? Long.fromValue(object.quantity) : Long.ZERO;
    message.tradeId = (_b = object.tradeId) != null ? _b : new Uint8Array();
    message.side = (_c = object.side) != null ? _c : 0;
    message.tradeDate = (_d = object.tradeDate) != null ? _d : 0;
    message.buyerId = (_e = object.buyerId) != null ? _e : new Uint8Array();
    message.sellerId = (_f = object.sellerId) != null ? _f : new Uint8Array();
    message.openingTrade = (_g = object.openingTrade) != null ? _g : false;
    message.systemPriced = (_h = object.systemPriced) != null ? _h : false;
    message.marketOnClose = (_i = object.marketOnClose) != null ? _i : false;
    message.oddLot = (_j = object.oddLot) != null ? _j : false;
    message.settlementTerms = (_k = object.settlementTerms) != null ? _k : 0;
    message.crossType = (_l = object.crossType) != null ? _l : 0;
    message.byPass = (_m = object.byPass) != null ? _m : false;
    message.originalTradeId = (_n = object.originalTradeId) != null ? _n : new Uint8Array();
    message.saleCondition = (_o = object.saleCondition) != null ? _o : new Uint8Array();
    message.currency = (_p = object.currency) != null ? _p : "";
    message.distributionTime = object.distributionTime !== void 0 && object.distributionTime !== null ? Long.fromValue(object.distributionTime) : Long.ZERO;
    message.transactionTime2 = object.transactionTime2 !== void 0 && object.transactionTime2 !== null ? Long.fromValue(object.transactionTime2) : Long.ZERO;
    message.originalTradePrice = object.originalTradePrice !== void 0 && object.originalTradePrice !== null ? Long.fromValue(object.originalTradePrice) : Long.ZERO;
    message.originalTradeQuantity = object.originalTradeQuantity !== void 0 && object.originalTradeQuantity !== null ? Long.fromValue(object.originalTradeQuantity) : Long.ZERO;
    return message;
  }
};
function createBaseTradeCancel() {
  return {
    originatorId: new Uint8Array(),
    transactionTime: Long.ZERO,
    correctedTradePrice: Long.ZERO,
    correctedTradeQuantity: Long.ZERO,
    tradeId: new Uint8Array(),
    saleCondition: new Uint8Array(),
    currency: "",
    distributionTime: Long.ZERO,
    transactionTime2: Long.ZERO
  };
}
const TradeCancel = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.originatorId.length !== 0) {
      writer2.uint32(66).bytes(message.originatorId);
    }
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (!message.correctedTradePrice.isZero()) {
      writer2.uint32(80).sint64(message.correctedTradePrice);
    }
    if (!message.correctedTradeQuantity.isZero()) {
      writer2.uint32(88).sint64(message.correctedTradeQuantity);
    }
    if (message.tradeId.length !== 0) {
      writer2.uint32(98).bytes(message.tradeId);
    }
    if (message.saleCondition.length !== 0) {
      writer2.uint32(106).bytes(message.saleCondition);
    }
    if (message.currency !== "") {
      writer2.uint32(114).string(message.currency);
    }
    if (!message.distributionTime.isZero()) {
      writer2.uint32(120).sint64(message.distributionTime);
    }
    if (!message.transactionTime2.isZero()) {
      writer2.uint32(128).sint64(message.transactionTime2);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseTradeCancel();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 8:
          message.originatorId = reader2.bytes();
          break;
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.correctedTradePrice = reader2.sint64();
          break;
        case 11:
          message.correctedTradeQuantity = reader2.sint64();
          break;
        case 12:
          message.tradeId = reader2.bytes();
          break;
        case 13:
          message.saleCondition = reader2.bytes();
          break;
        case 14:
          message.currency = reader2.string();
          break;
        case 15:
          message.distributionTime = reader2.sint64();
          break;
        case 16:
          message.transactionTime2 = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      originatorId: isSet$1(object.originatorId) ? bytesFromBase64(object.originatorId) : new Uint8Array(),
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      correctedTradePrice: isSet$1(object.correctedTradePrice) ? Long.fromValue(object.correctedTradePrice) : Long.ZERO,
      correctedTradeQuantity: isSet$1(object.correctedTradeQuantity) ? Long.fromValue(object.correctedTradeQuantity) : Long.ZERO,
      tradeId: isSet$1(object.tradeId) ? bytesFromBase64(object.tradeId) : new Uint8Array(),
      saleCondition: isSet$1(object.saleCondition) ? bytesFromBase64(object.saleCondition) : new Uint8Array(),
      currency: isSet$1(object.currency) ? String(object.currency) : "",
      distributionTime: isSet$1(object.distributionTime) ? Long.fromValue(object.distributionTime) : Long.ZERO,
      transactionTime2: isSet$1(object.transactionTime2) ? Long.fromValue(object.transactionTime2) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.originatorId !== void 0 && (obj.originatorId = base64FromBytes(
      message.originatorId !== void 0 ? message.originatorId : new Uint8Array()
    ));
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.correctedTradePrice !== void 0 && (obj.correctedTradePrice = (message.correctedTradePrice || Long.ZERO).toString());
    message.correctedTradeQuantity !== void 0 && (obj.correctedTradeQuantity = (message.correctedTradeQuantity || Long.ZERO).toString());
    message.tradeId !== void 0 && (obj.tradeId = base64FromBytes(message.tradeId !== void 0 ? message.tradeId : new Uint8Array()));
    message.saleCondition !== void 0 && (obj.saleCondition = base64FromBytes(
      message.saleCondition !== void 0 ? message.saleCondition : new Uint8Array()
    ));
    message.currency !== void 0 && (obj.currency = message.currency);
    message.distributionTime !== void 0 && (obj.distributionTime = (message.distributionTime || Long.ZERO).toString());
    message.transactionTime2 !== void 0 && (obj.transactionTime2 = (message.transactionTime2 || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseTradeCancel();
    message.originatorId = (_a = object.originatorId) != null ? _a : new Uint8Array();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.correctedTradePrice = object.correctedTradePrice !== void 0 && object.correctedTradePrice !== null ? Long.fromValue(object.correctedTradePrice) : Long.ZERO;
    message.correctedTradeQuantity = object.correctedTradeQuantity !== void 0 && object.correctedTradeQuantity !== null ? Long.fromValue(object.correctedTradeQuantity) : Long.ZERO;
    message.tradeId = (_b = object.tradeId) != null ? _b : new Uint8Array();
    message.saleCondition = (_c = object.saleCondition) != null ? _c : new Uint8Array();
    message.currency = (_d = object.currency) != null ? _d : "";
    message.distributionTime = object.distributionTime !== void 0 && object.distributionTime !== null ? Long.fromValue(object.distributionTime) : Long.ZERO;
    message.transactionTime2 = object.transactionTime2 !== void 0 && object.transactionTime2 !== null ? Long.fromValue(object.transactionTime2) : Long.ZERO;
    return message;
  }
};
function createBaseOpen() {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, OpenCloseSettlementFlag: 0, currency: "" };
}
const Open = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer2.uint32(88).sint64(message.price);
    }
    if (message.OpenCloseSettlementFlag !== 0) {
      writer2.uint32(96).int32(message.OpenCloseSettlementFlag);
    }
    if (message.currency !== "") {
      writer2.uint32(106).string(message.currency);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseOpen();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.price = reader2.sint64();
          break;
        case 12:
          message.OpenCloseSettlementFlag = reader2.int32();
          break;
        case 13:
          message.currency = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      OpenCloseSettlementFlag: isSet$1(object.OpenCloseSettlementFlag) ? openCloseSettlementFlagFromJSON(object.OpenCloseSettlementFlag) : 0,
      currency: isSet$1(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.OpenCloseSettlementFlag !== void 0 && (obj.OpenCloseSettlementFlag = openCloseSettlementFlagToJSON(message.OpenCloseSettlementFlag));
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseOpen();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.OpenCloseSettlementFlag = (_b = object.OpenCloseSettlementFlag) != null ? _b : 0;
    message.currency = (_c = object.currency) != null ? _c : "";
    return message;
  }
};
function createBaseHigh() {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}
const High = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer2.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer2.uint32(98).string(message.currency);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseHigh();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.price = reader2.sint64();
          break;
        case 12:
          message.currency = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet$1(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseHigh();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = (_b = object.currency) != null ? _b : "";
    return message;
  }
};
function createBaseHighRolling() {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}
const HighRolling = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer2.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer2.uint32(98).string(message.currency);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseHighRolling();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.price = reader2.sint64();
          break;
        case 12:
          message.currency = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet$1(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseHighRolling();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = (_b = object.currency) != null ? _b : "";
    return message;
  }
};
function createBaseLow() {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}
const Low = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer2.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer2.uint32(98).string(message.currency);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseLow();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.price = reader2.sint64();
          break;
        case 12:
          message.currency = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet$1(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseLow();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = (_b = object.currency) != null ? _b : "";
    return message;
  }
};
function createBaseLowRolling() {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}
const LowRolling = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer2.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer2.uint32(98).string(message.currency);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseLowRolling();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.price = reader2.sint64();
          break;
        case 12:
          message.currency = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet$1(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseLowRolling();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = (_b = object.currency) != null ? _b : "";
    return message;
  }
};
function createBaseClose() {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}
const Close = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer2.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer2.uint32(98).string(message.currency);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseClose();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.price = reader2.sint64();
          break;
        case 12:
          message.currency = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet$1(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseClose();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = (_b = object.currency) != null ? _b : "";
    return message;
  }
};
function createBasePrevClose() {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}
const PrevClose = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer2.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer2.uint32(98).string(message.currency);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBasePrevClose();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.price = reader2.sint64();
          break;
        case 12:
          message.currency = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet$1(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBasePrevClose();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = (_b = object.currency) != null ? _b : "";
    return message;
  }
};
function createBaseLast() {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, quantity: Long.ZERO, currency: "", session: "" };
}
const Last = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer2.uint32(88).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer2.uint32(96).sint64(message.quantity);
    }
    if (message.currency !== "") {
      writer2.uint32(106).string(message.currency);
    }
    if (message.session !== "") {
      writer2.uint32(242).string(message.session);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseLast();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.price = reader2.sint64();
          break;
        case 12:
          message.quantity = reader2.sint64();
          break;
        case 13:
          message.currency = reader2.string();
          break;
        case 30:
          message.session = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet$1(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      currency: isSet$1(object.currency) ? String(object.currency) : "",
      session: isSet$1(object.session) ? String(object.session) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    message.session !== void 0 && (obj.session = message.session);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseLast();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? Long.fromValue(object.quantity) : Long.ZERO;
    message.currency = (_b = object.currency) != null ? _b : "";
    message.session = (_c = object.session) != null ? _c : "";
    return message;
  }
};
function createBaseYearHigh() {
  return { transactionTime: Long.ZERO, price: Long.ZERO, currency: "" };
}
const YearHigh = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (!message.price.isZero()) {
      writer2.uint32(80).sint64(message.price);
    }
    if (message.currency !== "") {
      writer2.uint32(90).string(message.currency);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseYearHigh();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.price = reader2.sint64();
          break;
        case 11:
          message.currency = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet$1(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseYearHigh();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = (_a = object.currency) != null ? _a : "";
    return message;
  }
};
function createBaseYearLow() {
  return { transactionTime: Long.ZERO, price: Long.ZERO, currency: "" };
}
const YearLow = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (!message.price.isZero()) {
      writer2.uint32(80).sint64(message.price);
    }
    if (message.currency !== "") {
      writer2.uint32(90).string(message.currency);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseYearLow();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.price = reader2.sint64();
          break;
        case 11:
          message.currency = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet$1(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseYearLow();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = (_a = object.currency) != null ? _a : "";
    return message;
  }
};
function createBaseVolume() {
  return { transactionTime: Long.ZERO, tradeDate: 0, volume: Long.ZERO };
}
const Volume = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.volume.isZero()) {
      writer2.uint32(88).sint64(message.volume);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseVolume();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.volume = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      volume: isSet$1(object.volume) ? Long.fromValue(object.volume) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.volume !== void 0 && (obj.volume = (message.volume || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseVolume();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.volume = object.volume !== void 0 && object.volume !== null ? Long.fromValue(object.volume) : Long.ZERO;
    return message;
  }
};
function createBaseNumberOfTrades() {
  return { transactionTime: Long.ZERO, tradeDate: 0, numberTrades: Long.ZERO };
}
const NumberOfTrades = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.numberTrades.isZero()) {
      writer2.uint32(88).sint64(message.numberTrades);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseNumberOfTrades();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.numberTrades = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      numberTrades: isSet$1(object.numberTrades) ? Long.fromValue(object.numberTrades) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.numberTrades !== void 0 && (obj.numberTrades = (message.numberTrades || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseNumberOfTrades();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.numberTrades = object.numberTrades !== void 0 && object.numberTrades !== null ? Long.fromValue(object.numberTrades) : Long.ZERO;
    return message;
  }
};
function createBaseMonetaryValue() {
  return { transactionTime: Long.ZERO, tradeDate: 0, value: Long.ZERO, valueCurrencyCode: "" };
}
const MonetaryValue = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.value.isZero()) {
      writer2.uint32(88).sint64(message.value);
    }
    if (message.valueCurrencyCode !== "") {
      writer2.uint32(98).string(message.valueCurrencyCode);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseMonetaryValue();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.value = reader2.sint64();
          break;
        case 12:
          message.valueCurrencyCode = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      value: isSet$1(object.value) ? Long.fromValue(object.value) : Long.ZERO,
      valueCurrencyCode: isSet$1(object.valueCurrencyCode) ? String(object.valueCurrencyCode) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.value !== void 0 && (obj.value = (message.value || Long.ZERO).toString());
    message.valueCurrencyCode !== void 0 && (obj.valueCurrencyCode = message.valueCurrencyCode);
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseMonetaryValue();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.value = object.value !== void 0 && object.value !== null ? Long.fromValue(object.value) : Long.ZERO;
    message.valueCurrencyCode = (_b = object.valueCurrencyCode) != null ? _b : "";
    return message;
  }
};
function createBaseSettlement() {
  return {
    transactionTime: Long.ZERO,
    tradeDate: 0,
    price: Long.ZERO,
    preliminarySettle: false,
    currency: "",
    settlementSource: 0,
    session: "",
    transient: false,
    reserved: false
  };
}
const Settlement = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer2.uint32(88).sint64(message.price);
    }
    if (message.preliminarySettle === true) {
      writer2.uint32(96).bool(message.preliminarySettle);
    }
    if (message.currency !== "") {
      writer2.uint32(106).string(message.currency);
    }
    if (message.settlementSource !== 0) {
      writer2.uint32(112).int32(message.settlementSource);
    }
    if (message.session !== "") {
      writer2.uint32(122).string(message.session);
    }
    if (message.transient === true) {
      writer2.uint32(128).bool(message.transient);
    }
    if (message.reserved === true) {
      writer2.uint32(1016).bool(message.reserved);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseSettlement();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.price = reader2.sint64();
          break;
        case 12:
          message.preliminarySettle = reader2.bool();
          break;
        case 13:
          message.currency = reader2.string();
          break;
        case 14:
          message.settlementSource = reader2.int32();
          break;
        case 15:
          message.session = reader2.string();
          break;
        case 16:
          message.transient = reader2.bool();
          break;
        case 127:
          message.reserved = reader2.bool();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      preliminarySettle: isSet$1(object.preliminarySettle) ? Boolean(object.preliminarySettle) : false,
      currency: isSet$1(object.currency) ? String(object.currency) : "",
      settlementSource: isSet$1(object.settlementSource) ? settlementSourceFromJSON(object.settlementSource) : 0,
      session: isSet$1(object.session) ? String(object.session) : "",
      transient: isSet$1(object.transient) ? Boolean(object.transient) : false,
      reserved: isSet$1(object.reserved) ? Boolean(object.reserved) : false
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.preliminarySettle !== void 0 && (obj.preliminarySettle = message.preliminarySettle);
    message.currency !== void 0 && (obj.currency = message.currency);
    message.settlementSource !== void 0 && (obj.settlementSource = settlementSourceToJSON(message.settlementSource));
    message.session !== void 0 && (obj.session = message.session);
    message.transient !== void 0 && (obj.transient = message.transient);
    message.reserved !== void 0 && (obj.reserved = message.reserved);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g;
    const message = createBaseSettlement();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.preliminarySettle = (_b = object.preliminarySettle) != null ? _b : false;
    message.currency = (_c = object.currency) != null ? _c : "";
    message.settlementSource = (_d = object.settlementSource) != null ? _d : 0;
    message.session = (_e = object.session) != null ? _e : "";
    message.transient = (_f = object.transient) != null ? _f : false;
    message.reserved = (_g = object.reserved) != null ? _g : false;
    return message;
  }
};
function createBaseOpenInterest() {
  return { transactionTime: Long.ZERO, tradeDate: 0, volume: Long.ZERO };
}
const OpenInterest = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.volume.isZero()) {
      writer2.uint32(88).sint64(message.volume);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseOpenInterest();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.volume = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      volume: isSet$1(object.volume) ? Long.fromValue(object.volume) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.volume !== void 0 && (obj.volume = (message.volume || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseOpenInterest();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.volume = object.volume !== void 0 && object.volume !== null ? Long.fromValue(object.volume) : Long.ZERO;
    return message;
  }
};
function createBaseVwap() {
  return { transactionTime: Long.ZERO, tradeDate: 0, vwap: Long.ZERO };
}
const Vwap = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.vwap.isZero()) {
      writer2.uint32(88).sint64(message.vwap);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseVwap();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.vwap = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      vwap: isSet$1(object.vwap) ? Long.fromValue(object.vwap) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.vwap !== void 0 && (obj.vwap = (message.vwap || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseVwap();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.vwap = object.vwap !== void 0 && object.vwap !== null ? Long.fromValue(object.vwap) : Long.ZERO;
    return message;
  }
};
function createBaseDividendsIncomeDistributions() {
  return {
    transactionTime: Long.ZERO,
    instrumentType: "",
    corporateAction: "",
    distributionType: "",
    payableDate: 0,
    recordDate: 0,
    exDividendDate: 0,
    amount: Long.ZERO,
    currencyCode: "",
    notes: [],
    totalCashDistribution: Long.ZERO,
    nonQualifiedCashDistribution: Long.ZERO,
    qualifiedCashDistribution: Long.ZERO,
    taxFreeCashDistribution: Long.ZERO,
    ordinaryForeignTaxCredit: Long.ZERO,
    qualifiedForeignTaxCredit: Long.ZERO,
    stockDividendRatio: Long.ZERO,
    reinvestDate: 0
  };
}
const DividendsIncomeDistributions = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(48).sint64(message.transactionTime);
    }
    if (message.instrumentType !== "") {
      writer2.uint32(58).string(message.instrumentType);
    }
    if (message.corporateAction !== "") {
      writer2.uint32(66).string(message.corporateAction);
    }
    if (message.distributionType !== "") {
      writer2.uint32(74).string(message.distributionType);
    }
    if (message.payableDate !== 0) {
      writer2.uint32(80).sint32(message.payableDate);
    }
    if (message.recordDate !== 0) {
      writer2.uint32(88).sint32(message.recordDate);
    }
    if (message.exDividendDate !== 0) {
      writer2.uint32(96).sint32(message.exDividendDate);
    }
    if (!message.amount.isZero()) {
      writer2.uint32(104).sint64(message.amount);
    }
    if (message.currencyCode !== "") {
      writer2.uint32(114).string(message.currencyCode);
    }
    for (const v of message.notes) {
      writer2.uint32(122).string(v);
    }
    if (!message.totalCashDistribution.isZero()) {
      writer2.uint32(128).sint64(message.totalCashDistribution);
    }
    if (!message.nonQualifiedCashDistribution.isZero()) {
      writer2.uint32(136).sint64(message.nonQualifiedCashDistribution);
    }
    if (!message.qualifiedCashDistribution.isZero()) {
      writer2.uint32(144).sint64(message.qualifiedCashDistribution);
    }
    if (!message.taxFreeCashDistribution.isZero()) {
      writer2.uint32(152).sint64(message.taxFreeCashDistribution);
    }
    if (!message.ordinaryForeignTaxCredit.isZero()) {
      writer2.uint32(160).sint64(message.ordinaryForeignTaxCredit);
    }
    if (!message.qualifiedForeignTaxCredit.isZero()) {
      writer2.uint32(168).sint64(message.qualifiedForeignTaxCredit);
    }
    if (!message.stockDividendRatio.isZero()) {
      writer2.uint32(176).sint64(message.stockDividendRatio);
    }
    if (message.reinvestDate !== 0) {
      writer2.uint32(184).sint32(message.reinvestDate);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseDividendsIncomeDistributions();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 6:
          message.transactionTime = reader2.sint64();
          break;
        case 7:
          message.instrumentType = reader2.string();
          break;
        case 8:
          message.corporateAction = reader2.string();
          break;
        case 9:
          message.distributionType = reader2.string();
          break;
        case 10:
          message.payableDate = reader2.sint32();
          break;
        case 11:
          message.recordDate = reader2.sint32();
          break;
        case 12:
          message.exDividendDate = reader2.sint32();
          break;
        case 13:
          message.amount = reader2.sint64();
          break;
        case 14:
          message.currencyCode = reader2.string();
          break;
        case 15:
          message.notes.push(reader2.string());
          break;
        case 16:
          message.totalCashDistribution = reader2.sint64();
          break;
        case 17:
          message.nonQualifiedCashDistribution = reader2.sint64();
          break;
        case 18:
          message.qualifiedCashDistribution = reader2.sint64();
          break;
        case 19:
          message.taxFreeCashDistribution = reader2.sint64();
          break;
        case 20:
          message.ordinaryForeignTaxCredit = reader2.sint64();
          break;
        case 21:
          message.qualifiedForeignTaxCredit = reader2.sint64();
          break;
        case 22:
          message.stockDividendRatio = reader2.sint64();
          break;
        case 23:
          message.reinvestDate = reader2.sint32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      instrumentType: isSet$1(object.instrumentType) ? String(object.instrumentType) : "",
      corporateAction: isSet$1(object.corporateAction) ? String(object.corporateAction) : "",
      distributionType: isSet$1(object.distributionType) ? String(object.distributionType) : "",
      payableDate: isSet$1(object.payableDate) ? Number(object.payableDate) : 0,
      recordDate: isSet$1(object.recordDate) ? Number(object.recordDate) : 0,
      exDividendDate: isSet$1(object.exDividendDate) ? Number(object.exDividendDate) : 0,
      amount: isSet$1(object.amount) ? Long.fromValue(object.amount) : Long.ZERO,
      currencyCode: isSet$1(object.currencyCode) ? String(object.currencyCode) : "",
      notes: Array.isArray(object == null ? void 0 : object.notes) ? object.notes.map((e) => String(e)) : [],
      totalCashDistribution: isSet$1(object.totalCashDistribution) ? Long.fromValue(object.totalCashDistribution) : Long.ZERO,
      nonQualifiedCashDistribution: isSet$1(object.nonQualifiedCashDistribution) ? Long.fromValue(object.nonQualifiedCashDistribution) : Long.ZERO,
      qualifiedCashDistribution: isSet$1(object.qualifiedCashDistribution) ? Long.fromValue(object.qualifiedCashDistribution) : Long.ZERO,
      taxFreeCashDistribution: isSet$1(object.taxFreeCashDistribution) ? Long.fromValue(object.taxFreeCashDistribution) : Long.ZERO,
      ordinaryForeignTaxCredit: isSet$1(object.ordinaryForeignTaxCredit) ? Long.fromValue(object.ordinaryForeignTaxCredit) : Long.ZERO,
      qualifiedForeignTaxCredit: isSet$1(object.qualifiedForeignTaxCredit) ? Long.fromValue(object.qualifiedForeignTaxCredit) : Long.ZERO,
      stockDividendRatio: isSet$1(object.stockDividendRatio) ? Long.fromValue(object.stockDividendRatio) : Long.ZERO,
      reinvestDate: isSet$1(object.reinvestDate) ? Number(object.reinvestDate) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.instrumentType !== void 0 && (obj.instrumentType = message.instrumentType);
    message.corporateAction !== void 0 && (obj.corporateAction = message.corporateAction);
    message.distributionType !== void 0 && (obj.distributionType = message.distributionType);
    message.payableDate !== void 0 && (obj.payableDate = Math.round(message.payableDate));
    message.recordDate !== void 0 && (obj.recordDate = Math.round(message.recordDate));
    message.exDividendDate !== void 0 && (obj.exDividendDate = Math.round(message.exDividendDate));
    message.amount !== void 0 && (obj.amount = (message.amount || Long.ZERO).toString());
    message.currencyCode !== void 0 && (obj.currencyCode = message.currencyCode);
    if (message.notes) {
      obj.notes = message.notes.map((e) => e);
    } else {
      obj.notes = [];
    }
    message.totalCashDistribution !== void 0 && (obj.totalCashDistribution = (message.totalCashDistribution || Long.ZERO).toString());
    message.nonQualifiedCashDistribution !== void 0 && (obj.nonQualifiedCashDistribution = (message.nonQualifiedCashDistribution || Long.ZERO).toString());
    message.qualifiedCashDistribution !== void 0 && (obj.qualifiedCashDistribution = (message.qualifiedCashDistribution || Long.ZERO).toString());
    message.taxFreeCashDistribution !== void 0 && (obj.taxFreeCashDistribution = (message.taxFreeCashDistribution || Long.ZERO).toString());
    message.ordinaryForeignTaxCredit !== void 0 && (obj.ordinaryForeignTaxCredit = (message.ordinaryForeignTaxCredit || Long.ZERO).toString());
    message.qualifiedForeignTaxCredit !== void 0 && (obj.qualifiedForeignTaxCredit = (message.qualifiedForeignTaxCredit || Long.ZERO).toString());
    message.stockDividendRatio !== void 0 && (obj.stockDividendRatio = (message.stockDividendRatio || Long.ZERO).toString());
    message.reinvestDate !== void 0 && (obj.reinvestDate = Math.round(message.reinvestDate));
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const message = createBaseDividendsIncomeDistributions();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.instrumentType = (_a = object.instrumentType) != null ? _a : "";
    message.corporateAction = (_b = object.corporateAction) != null ? _b : "";
    message.distributionType = (_c = object.distributionType) != null ? _c : "";
    message.payableDate = (_d = object.payableDate) != null ? _d : 0;
    message.recordDate = (_e = object.recordDate) != null ? _e : 0;
    message.exDividendDate = (_f = object.exDividendDate) != null ? _f : 0;
    message.amount = object.amount !== void 0 && object.amount !== null ? Long.fromValue(object.amount) : Long.ZERO;
    message.currencyCode = (_g = object.currencyCode) != null ? _g : "";
    message.notes = ((_h = object.notes) == null ? void 0 : _h.map((e) => e)) || [];
    message.totalCashDistribution = object.totalCashDistribution !== void 0 && object.totalCashDistribution !== null ? Long.fromValue(object.totalCashDistribution) : Long.ZERO;
    message.nonQualifiedCashDistribution = object.nonQualifiedCashDistribution !== void 0 && object.nonQualifiedCashDistribution !== null ? Long.fromValue(object.nonQualifiedCashDistribution) : Long.ZERO;
    message.qualifiedCashDistribution = object.qualifiedCashDistribution !== void 0 && object.qualifiedCashDistribution !== null ? Long.fromValue(object.qualifiedCashDistribution) : Long.ZERO;
    message.taxFreeCashDistribution = object.taxFreeCashDistribution !== void 0 && object.taxFreeCashDistribution !== null ? Long.fromValue(object.taxFreeCashDistribution) : Long.ZERO;
    message.ordinaryForeignTaxCredit = object.ordinaryForeignTaxCredit !== void 0 && object.ordinaryForeignTaxCredit !== null ? Long.fromValue(object.ordinaryForeignTaxCredit) : Long.ZERO;
    message.qualifiedForeignTaxCredit = object.qualifiedForeignTaxCredit !== void 0 && object.qualifiedForeignTaxCredit !== null ? Long.fromValue(object.qualifiedForeignTaxCredit) : Long.ZERO;
    message.stockDividendRatio = object.stockDividendRatio !== void 0 && object.stockDividendRatio !== null ? Long.fromValue(object.stockDividendRatio) : Long.ZERO;
    message.reinvestDate = (_i = object.reinvestDate) != null ? _i : 0;
    return message;
  }
};
function createBaseCapitalDistributions() {
  return {
    transactionTime: Long.ZERO,
    instrumentType: "",
    corporateAction: "",
    payableDate: 0,
    recordDate: 0,
    exDate: 0,
    shortTermCapitalGain: Long.ZERO,
    longTermCapitalGain: Long.ZERO,
    unallocatedDistributions: Long.ZERO,
    returnOfCapital: Long.ZERO,
    currencyCode: "",
    notes: [],
    reinvestDate: 0
  };
}
const CapitalDistributions = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(64).sint64(message.transactionTime);
    }
    if (message.instrumentType !== "") {
      writer2.uint32(74).string(message.instrumentType);
    }
    if (message.corporateAction !== "") {
      writer2.uint32(82).string(message.corporateAction);
    }
    if (message.payableDate !== 0) {
      writer2.uint32(88).sint32(message.payableDate);
    }
    if (message.recordDate !== 0) {
      writer2.uint32(96).sint32(message.recordDate);
    }
    if (message.exDate !== 0) {
      writer2.uint32(104).sint32(message.exDate);
    }
    if (!message.shortTermCapitalGain.isZero()) {
      writer2.uint32(112).sint64(message.shortTermCapitalGain);
    }
    if (!message.longTermCapitalGain.isZero()) {
      writer2.uint32(120).sint64(message.longTermCapitalGain);
    }
    if (!message.unallocatedDistributions.isZero()) {
      writer2.uint32(128).sint64(message.unallocatedDistributions);
    }
    if (!message.returnOfCapital.isZero()) {
      writer2.uint32(136).sint64(message.returnOfCapital);
    }
    if (message.currencyCode !== "") {
      writer2.uint32(146).string(message.currencyCode);
    }
    for (const v of message.notes) {
      writer2.uint32(154).string(v);
    }
    if (message.reinvestDate !== 0) {
      writer2.uint32(160).sint32(message.reinvestDate);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseCapitalDistributions();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 8:
          message.transactionTime = reader2.sint64();
          break;
        case 9:
          message.instrumentType = reader2.string();
          break;
        case 10:
          message.corporateAction = reader2.string();
          break;
        case 11:
          message.payableDate = reader2.sint32();
          break;
        case 12:
          message.recordDate = reader2.sint32();
          break;
        case 13:
          message.exDate = reader2.sint32();
          break;
        case 14:
          message.shortTermCapitalGain = reader2.sint64();
          break;
        case 15:
          message.longTermCapitalGain = reader2.sint64();
          break;
        case 16:
          message.unallocatedDistributions = reader2.sint64();
          break;
        case 17:
          message.returnOfCapital = reader2.sint64();
          break;
        case 18:
          message.currencyCode = reader2.string();
          break;
        case 19:
          message.notes.push(reader2.string());
          break;
        case 20:
          message.reinvestDate = reader2.sint32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      instrumentType: isSet$1(object.instrumentType) ? String(object.instrumentType) : "",
      corporateAction: isSet$1(object.corporateAction) ? String(object.corporateAction) : "",
      payableDate: isSet$1(object.payableDate) ? Number(object.payableDate) : 0,
      recordDate: isSet$1(object.recordDate) ? Number(object.recordDate) : 0,
      exDate: isSet$1(object.exDate) ? Number(object.exDate) : 0,
      shortTermCapitalGain: isSet$1(object.shortTermCapitalGain) ? Long.fromValue(object.shortTermCapitalGain) : Long.ZERO,
      longTermCapitalGain: isSet$1(object.longTermCapitalGain) ? Long.fromValue(object.longTermCapitalGain) : Long.ZERO,
      unallocatedDistributions: isSet$1(object.unallocatedDistributions) ? Long.fromValue(object.unallocatedDistributions) : Long.ZERO,
      returnOfCapital: isSet$1(object.returnOfCapital) ? Long.fromValue(object.returnOfCapital) : Long.ZERO,
      currencyCode: isSet$1(object.currencyCode) ? String(object.currencyCode) : "",
      notes: Array.isArray(object == null ? void 0 : object.notes) ? object.notes.map((e) => String(e)) : [],
      reinvestDate: isSet$1(object.reinvestDate) ? Number(object.reinvestDate) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.instrumentType !== void 0 && (obj.instrumentType = message.instrumentType);
    message.corporateAction !== void 0 && (obj.corporateAction = message.corporateAction);
    message.payableDate !== void 0 && (obj.payableDate = Math.round(message.payableDate));
    message.recordDate !== void 0 && (obj.recordDate = Math.round(message.recordDate));
    message.exDate !== void 0 && (obj.exDate = Math.round(message.exDate));
    message.shortTermCapitalGain !== void 0 && (obj.shortTermCapitalGain = (message.shortTermCapitalGain || Long.ZERO).toString());
    message.longTermCapitalGain !== void 0 && (obj.longTermCapitalGain = (message.longTermCapitalGain || Long.ZERO).toString());
    message.unallocatedDistributions !== void 0 && (obj.unallocatedDistributions = (message.unallocatedDistributions || Long.ZERO).toString());
    message.returnOfCapital !== void 0 && (obj.returnOfCapital = (message.returnOfCapital || Long.ZERO).toString());
    message.currencyCode !== void 0 && (obj.currencyCode = message.currencyCode);
    if (message.notes) {
      obj.notes = message.notes.map((e) => e);
    } else {
      obj.notes = [];
    }
    message.reinvestDate !== void 0 && (obj.reinvestDate = Math.round(message.reinvestDate));
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const message = createBaseCapitalDistributions();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.instrumentType = (_a = object.instrumentType) != null ? _a : "";
    message.corporateAction = (_b = object.corporateAction) != null ? _b : "";
    message.payableDate = (_c = object.payableDate) != null ? _c : 0;
    message.recordDate = (_d = object.recordDate) != null ? _d : 0;
    message.exDate = (_e = object.exDate) != null ? _e : 0;
    message.shortTermCapitalGain = object.shortTermCapitalGain !== void 0 && object.shortTermCapitalGain !== null ? Long.fromValue(object.shortTermCapitalGain) : Long.ZERO;
    message.longTermCapitalGain = object.longTermCapitalGain !== void 0 && object.longTermCapitalGain !== null ? Long.fromValue(object.longTermCapitalGain) : Long.ZERO;
    message.unallocatedDistributions = object.unallocatedDistributions !== void 0 && object.unallocatedDistributions !== null ? Long.fromValue(object.unallocatedDistributions) : Long.ZERO;
    message.returnOfCapital = object.returnOfCapital !== void 0 && object.returnOfCapital !== null ? Long.fromValue(object.returnOfCapital) : Long.ZERO;
    message.currencyCode = (_f = object.currencyCode) != null ? _f : "";
    message.notes = ((_g = object.notes) == null ? void 0 : _g.map((e) => e)) || [];
    message.reinvestDate = (_h = object.reinvestDate) != null ? _h : 0;
    return message;
  }
};
function createBaseSharesOutstanding() {
  return { sharesOutstanding: Long.ZERO, transactionTime: Long.ZERO };
}
const SharesOutstanding = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.sharesOutstanding.isZero()) {
      writer2.uint32(8).sint64(message.sharesOutstanding);
    }
    if (!message.transactionTime.isZero()) {
      writer2.uint32(16).sint64(message.transactionTime);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseSharesOutstanding();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sharesOutstanding = reader2.sint64();
          break;
        case 2:
          message.transactionTime = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      sharesOutstanding: isSet$1(object.sharesOutstanding) ? Long.fromValue(object.sharesOutstanding) : Long.ZERO,
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.sharesOutstanding !== void 0 && (obj.sharesOutstanding = (message.sharesOutstanding || Long.ZERO).toString());
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseSharesOutstanding();
    message.sharesOutstanding = object.sharesOutstanding !== void 0 && object.sharesOutstanding !== null ? Long.fromValue(object.sharesOutstanding) : Long.ZERO;
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    return message;
  }
};
function createBaseNetAssetValue() {
  return { netAssetValue: Long.ZERO, transactionTime: Long.ZERO };
}
const NetAssetValue = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.netAssetValue.isZero()) {
      writer2.uint32(8).sint64(message.netAssetValue);
    }
    if (!message.transactionTime.isZero()) {
      writer2.uint32(16).sint64(message.transactionTime);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseNetAssetValue();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.netAssetValue = reader2.sint64();
          break;
        case 2:
          message.transactionTime = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      netAssetValue: isSet$1(object.netAssetValue) ? Long.fromValue(object.netAssetValue) : Long.ZERO,
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.netAssetValue !== void 0 && (obj.netAssetValue = (message.netAssetValue || Long.ZERO).toString());
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseNetAssetValue();
    message.netAssetValue = object.netAssetValue !== void 0 && object.netAssetValue !== null ? Long.fromValue(object.netAssetValue) : Long.ZERO;
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    return message;
  }
};
function createBaseMarketSummary() {
  return {
    transactionTime: Long.ZERO,
    tradingDate: 0,
    startOfDay: false,
    endOfDay: false,
    clear: 0,
    instrumentStatus: void 0,
    bbo: void 0,
    open: void 0,
    high: void 0,
    low: void 0,
    close: void 0,
    prevClose: void 0,
    last: void 0,
    volume: void 0,
    settlement: void 0,
    openInterest: void 0,
    vwap: void 0,
    session: "",
    summaryType: 0,
    prevVolume: void 0,
    transient: false
  };
}
const MarketSummary = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(8).sint64(message.transactionTime);
    }
    if (message.tradingDate !== 0) {
      writer2.uint32(16).sint32(message.tradingDate);
    }
    if (message.startOfDay === true) {
      writer2.uint32(24).bool(message.startOfDay);
    }
    if (message.endOfDay === true) {
      writer2.uint32(32).bool(message.endOfDay);
    }
    if (message.clear !== 0) {
      writer2.uint32(40).int32(message.clear);
    }
    if (message.instrumentStatus !== void 0) {
      InstrumentStatus.encode(message.instrumentStatus, writer2.uint32(74).fork()).ldelim();
    }
    if (message.bbo !== void 0) {
      BestBidOffer.encode(message.bbo, writer2.uint32(82).fork()).ldelim();
    }
    if (message.open !== void 0) {
      Open.encode(message.open, writer2.uint32(90).fork()).ldelim();
    }
    if (message.high !== void 0) {
      High.encode(message.high, writer2.uint32(98).fork()).ldelim();
    }
    if (message.low !== void 0) {
      Low.encode(message.low, writer2.uint32(106).fork()).ldelim();
    }
    if (message.close !== void 0) {
      Close.encode(message.close, writer2.uint32(114).fork()).ldelim();
    }
    if (message.prevClose !== void 0) {
      PrevClose.encode(message.prevClose, writer2.uint32(122).fork()).ldelim();
    }
    if (message.last !== void 0) {
      Last.encode(message.last, writer2.uint32(130).fork()).ldelim();
    }
    if (message.volume !== void 0) {
      Volume.encode(message.volume, writer2.uint32(138).fork()).ldelim();
    }
    if (message.settlement !== void 0) {
      Settlement.encode(message.settlement, writer2.uint32(146).fork()).ldelim();
    }
    if (message.openInterest !== void 0) {
      OpenInterest.encode(message.openInterest, writer2.uint32(154).fork()).ldelim();
    }
    if (message.vwap !== void 0) {
      Vwap.encode(message.vwap, writer2.uint32(162).fork()).ldelim();
    }
    if (message.session !== "") {
      writer2.uint32(170).string(message.session);
    }
    if (message.summaryType !== 0) {
      writer2.uint32(176).int32(message.summaryType);
    }
    if (message.prevVolume !== void 0) {
      Volume.encode(message.prevVolume, writer2.uint32(186).fork()).ldelim();
    }
    if (message.transient === true) {
      writer2.uint32(192).bool(message.transient);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseMarketSummary();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionTime = reader2.sint64();
          break;
        case 2:
          message.tradingDate = reader2.sint32();
          break;
        case 3:
          message.startOfDay = reader2.bool();
          break;
        case 4:
          message.endOfDay = reader2.bool();
          break;
        case 5:
          message.clear = reader2.int32();
          break;
        case 9:
          message.instrumentStatus = InstrumentStatus.decode(reader2, reader2.uint32());
          break;
        case 10:
          message.bbo = BestBidOffer.decode(reader2, reader2.uint32());
          break;
        case 11:
          message.open = Open.decode(reader2, reader2.uint32());
          break;
        case 12:
          message.high = High.decode(reader2, reader2.uint32());
          break;
        case 13:
          message.low = Low.decode(reader2, reader2.uint32());
          break;
        case 14:
          message.close = Close.decode(reader2, reader2.uint32());
          break;
        case 15:
          message.prevClose = PrevClose.decode(reader2, reader2.uint32());
          break;
        case 16:
          message.last = Last.decode(reader2, reader2.uint32());
          break;
        case 17:
          message.volume = Volume.decode(reader2, reader2.uint32());
          break;
        case 18:
          message.settlement = Settlement.decode(reader2, reader2.uint32());
          break;
        case 19:
          message.openInterest = OpenInterest.decode(reader2, reader2.uint32());
          break;
        case 20:
          message.vwap = Vwap.decode(reader2, reader2.uint32());
          break;
        case 21:
          message.session = reader2.string();
          break;
        case 22:
          message.summaryType = reader2.int32();
          break;
        case 23:
          message.prevVolume = Volume.decode(reader2, reader2.uint32());
          break;
        case 24:
          message.transient = reader2.bool();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradingDate: isSet$1(object.tradingDate) ? Number(object.tradingDate) : 0,
      startOfDay: isSet$1(object.startOfDay) ? Boolean(object.startOfDay) : false,
      endOfDay: isSet$1(object.endOfDay) ? Boolean(object.endOfDay) : false,
      clear: isSet$1(object.clear) ? marketSummary_ClearSetFromJSON(object.clear) : 0,
      instrumentStatus: isSet$1(object.instrumentStatus) ? InstrumentStatus.fromJSON(object.instrumentStatus) : void 0,
      bbo: isSet$1(object.bbo) ? BestBidOffer.fromJSON(object.bbo) : void 0,
      open: isSet$1(object.open) ? Open.fromJSON(object.open) : void 0,
      high: isSet$1(object.high) ? High.fromJSON(object.high) : void 0,
      low: isSet$1(object.low) ? Low.fromJSON(object.low) : void 0,
      close: isSet$1(object.close) ? Close.fromJSON(object.close) : void 0,
      prevClose: isSet$1(object.prevClose) ? PrevClose.fromJSON(object.prevClose) : void 0,
      last: isSet$1(object.last) ? Last.fromJSON(object.last) : void 0,
      volume: isSet$1(object.volume) ? Volume.fromJSON(object.volume) : void 0,
      settlement: isSet$1(object.settlement) ? Settlement.fromJSON(object.settlement) : void 0,
      openInterest: isSet$1(object.openInterest) ? OpenInterest.fromJSON(object.openInterest) : void 0,
      vwap: isSet$1(object.vwap) ? Vwap.fromJSON(object.vwap) : void 0,
      session: isSet$1(object.session) ? String(object.session) : "",
      summaryType: isSet$1(object.summaryType) ? marketSummary_SummaryTypeFromJSON(object.summaryType) : 0,
      prevVolume: isSet$1(object.prevVolume) ? Volume.fromJSON(object.prevVolume) : void 0,
      transient: isSet$1(object.transient) ? Boolean(object.transient) : false
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradingDate !== void 0 && (obj.tradingDate = Math.round(message.tradingDate));
    message.startOfDay !== void 0 && (obj.startOfDay = message.startOfDay);
    message.endOfDay !== void 0 && (obj.endOfDay = message.endOfDay);
    message.clear !== void 0 && (obj.clear = marketSummary_ClearSetToJSON(message.clear));
    message.instrumentStatus !== void 0 && (obj.instrumentStatus = message.instrumentStatus ? InstrumentStatus.toJSON(message.instrumentStatus) : void 0);
    message.bbo !== void 0 && (obj.bbo = message.bbo ? BestBidOffer.toJSON(message.bbo) : void 0);
    message.open !== void 0 && (obj.open = message.open ? Open.toJSON(message.open) : void 0);
    message.high !== void 0 && (obj.high = message.high ? High.toJSON(message.high) : void 0);
    message.low !== void 0 && (obj.low = message.low ? Low.toJSON(message.low) : void 0);
    message.close !== void 0 && (obj.close = message.close ? Close.toJSON(message.close) : void 0);
    message.prevClose !== void 0 && (obj.prevClose = message.prevClose ? PrevClose.toJSON(message.prevClose) : void 0);
    message.last !== void 0 && (obj.last = message.last ? Last.toJSON(message.last) : void 0);
    message.volume !== void 0 && (obj.volume = message.volume ? Volume.toJSON(message.volume) : void 0);
    message.settlement !== void 0 && (obj.settlement = message.settlement ? Settlement.toJSON(message.settlement) : void 0);
    message.openInterest !== void 0 && (obj.openInterest = message.openInterest ? OpenInterest.toJSON(message.openInterest) : void 0);
    message.vwap !== void 0 && (obj.vwap = message.vwap ? Vwap.toJSON(message.vwap) : void 0);
    message.session !== void 0 && (obj.session = message.session);
    message.summaryType !== void 0 && (obj.summaryType = marketSummary_SummaryTypeToJSON(message.summaryType));
    message.prevVolume !== void 0 && (obj.prevVolume = message.prevVolume ? Volume.toJSON(message.prevVolume) : void 0);
    message.transient !== void 0 && (obj.transient = message.transient);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g;
    const message = createBaseMarketSummary();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradingDate = (_a = object.tradingDate) != null ? _a : 0;
    message.startOfDay = (_b = object.startOfDay) != null ? _b : false;
    message.endOfDay = (_c = object.endOfDay) != null ? _c : false;
    message.clear = (_d = object.clear) != null ? _d : 0;
    message.instrumentStatus = object.instrumentStatus !== void 0 && object.instrumentStatus !== null ? InstrumentStatus.fromPartial(object.instrumentStatus) : void 0;
    message.bbo = object.bbo !== void 0 && object.bbo !== null ? BestBidOffer.fromPartial(object.bbo) : void 0;
    message.open = object.open !== void 0 && object.open !== null ? Open.fromPartial(object.open) : void 0;
    message.high = object.high !== void 0 && object.high !== null ? High.fromPartial(object.high) : void 0;
    message.low = object.low !== void 0 && object.low !== null ? Low.fromPartial(object.low) : void 0;
    message.close = object.close !== void 0 && object.close !== null ? Close.fromPartial(object.close) : void 0;
    message.prevClose = object.prevClose !== void 0 && object.prevClose !== null ? PrevClose.fromPartial(object.prevClose) : void 0;
    message.last = object.last !== void 0 && object.last !== null ? Last.fromPartial(object.last) : void 0;
    message.volume = object.volume !== void 0 && object.volume !== null ? Volume.fromPartial(object.volume) : void 0;
    message.settlement = object.settlement !== void 0 && object.settlement !== null ? Settlement.fromPartial(object.settlement) : void 0;
    message.openInterest = object.openInterest !== void 0 && object.openInterest !== null ? OpenInterest.fromPartial(object.openInterest) : void 0;
    message.vwap = object.vwap !== void 0 && object.vwap !== null ? Vwap.fromPartial(object.vwap) : void 0;
    message.session = (_e = object.session) != null ? _e : "";
    message.summaryType = (_f = object.summaryType) != null ? _f : 0;
    message.prevVolume = object.prevVolume !== void 0 && object.prevVolume !== null ? Volume.fromPartial(object.prevVolume) : void 0;
    message.transient = (_g = object.transient) != null ? _g : false;
    return message;
  }
};
function createBaseContext() {
  return { data: [], tracePoints: [] };
}
const Context = {
  encode(message, writer2 = _m0.Writer.create()) {
    for (const v of message.data) {
      ContextData.encode(v, writer2.uint32(10).fork()).ldelim();
    }
    for (const v of message.tracePoints) {
      TracePoint.encode(v, writer2.uint32(18).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseContext();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(ContextData.decode(reader2, reader2.uint32()));
          break;
        case 2:
          message.tracePoints.push(TracePoint.decode(reader2, reader2.uint32()));
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      data: Array.isArray(object == null ? void 0 : object.data) ? object.data.map((e) => ContextData.fromJSON(e)) : [],
      tracePoints: Array.isArray(object == null ? void 0 : object.tracePoints) ? object.tracePoints.map((e) => TracePoint.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.data) {
      obj.data = message.data.map((e) => e ? ContextData.toJSON(e) : void 0);
    } else {
      obj.data = [];
    }
    if (message.tracePoints) {
      obj.tracePoints = message.tracePoints.map((e) => e ? TracePoint.toJSON(e) : void 0);
    } else {
      obj.tracePoints = [];
    }
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseContext();
    message.data = ((_a = object.data) == null ? void 0 : _a.map((e) => ContextData.fromPartial(e))) || [];
    message.tracePoints = ((_b = object.tracePoints) == null ? void 0 : _b.map((e) => TracePoint.fromPartial(e))) || [];
    return message;
  }
};
function createBaseContextData() {
  return {
    id: "",
    vstring: void 0,
    vbytes: void 0,
    vbool: void 0,
    vsint32: void 0,
    vsint64: void 0,
    vfloat: void 0,
    vdouble: void 0
  };
}
const ContextData = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.id !== "") {
      writer2.uint32(10).string(message.id);
    }
    if (message.vstring !== void 0) {
      writer2.uint32(42).string(message.vstring);
    }
    if (message.vbytes !== void 0) {
      writer2.uint32(50).bytes(message.vbytes);
    }
    if (message.vbool !== void 0) {
      writer2.uint32(56).bool(message.vbool);
    }
    if (message.vsint32 !== void 0) {
      writer2.uint32(64).sint32(message.vsint32);
    }
    if (message.vsint64 !== void 0) {
      writer2.uint32(72).sint64(message.vsint64);
    }
    if (message.vfloat !== void 0) {
      writer2.uint32(85).float(message.vfloat);
    }
    if (message.vdouble !== void 0) {
      writer2.uint32(89).double(message.vdouble);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseContextData();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader2.string();
          break;
        case 5:
          message.vstring = reader2.string();
          break;
        case 6:
          message.vbytes = reader2.bytes();
          break;
        case 7:
          message.vbool = reader2.bool();
          break;
        case 8:
          message.vsint32 = reader2.sint32();
          break;
        case 9:
          message.vsint64 = reader2.sint64();
          break;
        case 10:
          message.vfloat = reader2.float();
          break;
        case 11:
          message.vdouble = reader2.double();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      id: isSet$1(object.id) ? String(object.id) : "",
      vstring: isSet$1(object.vstring) ? String(object.vstring) : void 0,
      vbytes: isSet$1(object.vbytes) ? bytesFromBase64(object.vbytes) : void 0,
      vbool: isSet$1(object.vbool) ? Boolean(object.vbool) : void 0,
      vsint32: isSet$1(object.vsint32) ? Number(object.vsint32) : void 0,
      vsint64: isSet$1(object.vsint64) ? Long.fromValue(object.vsint64) : void 0,
      vfloat: isSet$1(object.vfloat) ? Number(object.vfloat) : void 0,
      vdouble: isSet$1(object.vdouble) ? Number(object.vdouble) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    message.vstring !== void 0 && (obj.vstring = message.vstring);
    message.vbytes !== void 0 && (obj.vbytes = message.vbytes !== void 0 ? base64FromBytes(message.vbytes) : void 0);
    message.vbool !== void 0 && (obj.vbool = message.vbool);
    message.vsint32 !== void 0 && (obj.vsint32 = Math.round(message.vsint32));
    message.vsint64 !== void 0 && (obj.vsint64 = (message.vsint64 || void 0).toString());
    message.vfloat !== void 0 && (obj.vfloat = message.vfloat);
    message.vdouble !== void 0 && (obj.vdouble = message.vdouble);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g;
    const message = createBaseContextData();
    message.id = (_a = object.id) != null ? _a : "";
    message.vstring = (_b = object.vstring) != null ? _b : void 0;
    message.vbytes = (_c = object.vbytes) != null ? _c : void 0;
    message.vbool = (_d = object.vbool) != null ? _d : void 0;
    message.vsint32 = (_e = object.vsint32) != null ? _e : void 0;
    message.vsint64 = object.vsint64 !== void 0 && object.vsint64 !== null ? Long.fromValue(object.vsint64) : void 0;
    message.vfloat = (_f = object.vfloat) != null ? _f : void 0;
    message.vdouble = (_g = object.vdouble) != null ? _g : void 0;
    return message;
  }
};
function createBaseTracePoint() {
  return { id: "", componentId: "", timestampNs: Long.ZERO, componentLatencyNs: 0 };
}
const TracePoint = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.id !== "") {
      writer2.uint32(10).string(message.id);
    }
    if (message.componentId !== "") {
      writer2.uint32(18).string(message.componentId);
    }
    if (!message.timestampNs.isZero()) {
      writer2.uint32(24).sint64(message.timestampNs);
    }
    if (message.componentLatencyNs !== 0) {
      writer2.uint32(32).int32(message.componentLatencyNs);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseTracePoint();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader2.string();
          break;
        case 2:
          message.componentId = reader2.string();
          break;
        case 3:
          message.timestampNs = reader2.sint64();
          break;
        case 4:
          message.componentLatencyNs = reader2.int32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      id: isSet$1(object.id) ? String(object.id) : "",
      componentId: isSet$1(object.componentId) ? String(object.componentId) : "",
      timestampNs: isSet$1(object.timestampNs) ? Long.fromValue(object.timestampNs) : Long.ZERO,
      componentLatencyNs: isSet$1(object.componentLatencyNs) ? Number(object.componentLatencyNs) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    message.componentId !== void 0 && (obj.componentId = message.componentId);
    message.timestampNs !== void 0 && (obj.timestampNs = (message.timestampNs || Long.ZERO).toString());
    message.componentLatencyNs !== void 0 && (obj.componentLatencyNs = Math.round(message.componentLatencyNs));
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseTracePoint();
    message.id = (_a = object.id) != null ? _a : "";
    message.componentId = (_b = object.componentId) != null ? _b : "";
    message.timestampNs = object.timestampNs !== void 0 && object.timestampNs !== null ? Long.fromValue(object.timestampNs) : Long.ZERO;
    message.componentLatencyNs = (_c = object.componentLatencyNs) != null ? _c : 0;
    return message;
  }
};
function createBaseVolumeAtPrice() {
  return {
    marketId: Long.ZERO,
    symbol: "",
    transactionTime: Long.ZERO,
    lastPrice: Long.ZERO,
    lastQuantity: Long.ZERO,
    lastCumulativeVolume: Long.ZERO,
    tradeDate: 0,
    priceVolumes: []
  };
}
const VolumeAtPrice = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.marketId.isZero()) {
      writer2.uint32(8).sint64(message.marketId);
    }
    if (message.symbol !== "") {
      writer2.uint32(18).string(message.symbol);
    }
    if (!message.transactionTime.isZero()) {
      writer2.uint32(24).sint64(message.transactionTime);
    }
    if (!message.lastPrice.isZero()) {
      writer2.uint32(32).sint64(message.lastPrice);
    }
    if (!message.lastQuantity.isZero()) {
      writer2.uint32(40).sint64(message.lastQuantity);
    }
    if (!message.lastCumulativeVolume.isZero()) {
      writer2.uint32(48).sint64(message.lastCumulativeVolume);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(56).sint32(message.tradeDate);
    }
    for (const v of message.priceVolumes) {
      VolumeAtPrice_PriceLevelVolume.encode(v, writer2.uint32(66).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseVolumeAtPrice();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader2.sint64();
          break;
        case 2:
          message.symbol = reader2.string();
          break;
        case 3:
          message.transactionTime = reader2.sint64();
          break;
        case 4:
          message.lastPrice = reader2.sint64();
          break;
        case 5:
          message.lastQuantity = reader2.sint64();
          break;
        case 6:
          message.lastCumulativeVolume = reader2.sint64();
          break;
        case 7:
          message.tradeDate = reader2.sint32();
          break;
        case 8:
          message.priceVolumes.push(VolumeAtPrice_PriceLevelVolume.decode(reader2, reader2.uint32()));
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      marketId: isSet$1(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      symbol: isSet$1(object.symbol) ? String(object.symbol) : "",
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      lastPrice: isSet$1(object.lastPrice) ? Long.fromValue(object.lastPrice) : Long.ZERO,
      lastQuantity: isSet$1(object.lastQuantity) ? Long.fromValue(object.lastQuantity) : Long.ZERO,
      lastCumulativeVolume: isSet$1(object.lastCumulativeVolume) ? Long.fromValue(object.lastCumulativeVolume) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      priceVolumes: Array.isArray(object == null ? void 0 : object.priceVolumes) ? object.priceVolumes.map((e) => VolumeAtPrice_PriceLevelVolume.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.marketId !== void 0 && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.lastPrice !== void 0 && (obj.lastPrice = (message.lastPrice || Long.ZERO).toString());
    message.lastQuantity !== void 0 && (obj.lastQuantity = (message.lastQuantity || Long.ZERO).toString());
    message.lastCumulativeVolume !== void 0 && (obj.lastCumulativeVolume = (message.lastCumulativeVolume || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    if (message.priceVolumes) {
      obj.priceVolumes = message.priceVolumes.map((e) => e ? VolumeAtPrice_PriceLevelVolume.toJSON(e) : void 0);
    } else {
      obj.priceVolumes = [];
    }
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseVolumeAtPrice();
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? Long.fromValue(object.marketId) : Long.ZERO;
    message.symbol = (_a = object.symbol) != null ? _a : "";
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.lastPrice = object.lastPrice !== void 0 && object.lastPrice !== null ? Long.fromValue(object.lastPrice) : Long.ZERO;
    message.lastQuantity = object.lastQuantity !== void 0 && object.lastQuantity !== null ? Long.fromValue(object.lastQuantity) : Long.ZERO;
    message.lastCumulativeVolume = object.lastCumulativeVolume !== void 0 && object.lastCumulativeVolume !== null ? Long.fromValue(object.lastCumulativeVolume) : Long.ZERO;
    message.tradeDate = (_b = object.tradeDate) != null ? _b : 0;
    message.priceVolumes = ((_c = object.priceVolumes) == null ? void 0 : _c.map((e) => VolumeAtPrice_PriceLevelVolume.fromPartial(e))) || [];
    return message;
  }
};
function createBaseVolumeAtPrice_PriceLevelVolume() {
  return { price: Long.ZERO, volume: Long.ZERO };
}
const VolumeAtPrice_PriceLevelVolume = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.price.isZero()) {
      writer2.uint32(8).sint64(message.price);
    }
    if (!message.volume.isZero()) {
      writer2.uint32(16).sint64(message.volume);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseVolumeAtPrice_PriceLevelVolume();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = reader2.sint64();
          break;
        case 2:
          message.volume = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      price: isSet$1(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      volume: isSet$1(object.volume) ? Long.fromValue(object.volume) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.price !== void 0 && (obj.price = (message.price || Long.ZERO).toString());
    message.volume !== void 0 && (obj.volume = (message.volume || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseVolumeAtPrice_PriceLevelVolume();
    message.price = object.price !== void 0 && object.price !== null ? Long.fromValue(object.price) : Long.ZERO;
    message.volume = object.volume !== void 0 && object.volume !== null ? Long.fromValue(object.volume) : Long.ZERO;
    return message;
  }
};
function createBaseOhlc() {
  return {
    marketId: Long.ZERO,
    symbol: "",
    open: void 0,
    high: void 0,
    low: void 0,
    close: void 0,
    volume: Long.ZERO,
    priceVolume: 0,
    numberTrades: Long.ZERO,
    tradeDate: 0,
    transactionTime: Long.ZERO,
    tradeIds: [],
    openStartTime: Long.ZERO,
    closeEndTime: Long.ZERO
  };
}
const Ohlc = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.marketId.isZero()) {
      writer2.uint32(8).sint64(message.marketId);
    }
    if (message.symbol !== "") {
      writer2.uint32(18).string(message.symbol);
    }
    if (message.open !== void 0) {
      Open.encode(message.open, writer2.uint32(26).fork()).ldelim();
    }
    if (message.high !== void 0) {
      High.encode(message.high, writer2.uint32(34).fork()).ldelim();
    }
    if (message.low !== void 0) {
      Low.encode(message.low, writer2.uint32(42).fork()).ldelim();
    }
    if (message.close !== void 0) {
      Close.encode(message.close, writer2.uint32(50).fork()).ldelim();
    }
    if (!message.volume.isZero()) {
      writer2.uint32(56).sint64(message.volume);
    }
    if (message.priceVolume !== 0) {
      writer2.uint32(65).double(message.priceVolume);
    }
    if (!message.numberTrades.isZero()) {
      writer2.uint32(72).sint64(message.numberTrades);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(80).sint32(message.tradeDate);
    }
    if (!message.transactionTime.isZero()) {
      writer2.uint32(88).sint64(message.transactionTime);
    }
    for (const v of message.tradeIds) {
      writer2.uint32(98).string(v);
    }
    if (!message.openStartTime.isZero()) {
      writer2.uint32(104).sint64(message.openStartTime);
    }
    if (!message.closeEndTime.isZero()) {
      writer2.uint32(112).sint64(message.closeEndTime);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseOhlc();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader2.sint64();
          break;
        case 2:
          message.symbol = reader2.string();
          break;
        case 3:
          message.open = Open.decode(reader2, reader2.uint32());
          break;
        case 4:
          message.high = High.decode(reader2, reader2.uint32());
          break;
        case 5:
          message.low = Low.decode(reader2, reader2.uint32());
          break;
        case 6:
          message.close = Close.decode(reader2, reader2.uint32());
          break;
        case 7:
          message.volume = reader2.sint64();
          break;
        case 8:
          message.priceVolume = reader2.double();
          break;
        case 9:
          message.numberTrades = reader2.sint64();
          break;
        case 10:
          message.tradeDate = reader2.sint32();
          break;
        case 11:
          message.transactionTime = reader2.sint64();
          break;
        case 12:
          message.tradeIds.push(reader2.string());
          break;
        case 13:
          message.openStartTime = reader2.sint64();
          break;
        case 14:
          message.closeEndTime = reader2.sint64();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      marketId: isSet$1(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      symbol: isSet$1(object.symbol) ? String(object.symbol) : "",
      open: isSet$1(object.open) ? Open.fromJSON(object.open) : void 0,
      high: isSet$1(object.high) ? High.fromJSON(object.high) : void 0,
      low: isSet$1(object.low) ? Low.fromJSON(object.low) : void 0,
      close: isSet$1(object.close) ? Close.fromJSON(object.close) : void 0,
      volume: isSet$1(object.volume) ? Long.fromValue(object.volume) : Long.ZERO,
      priceVolume: isSet$1(object.priceVolume) ? Number(object.priceVolume) : 0,
      numberTrades: isSet$1(object.numberTrades) ? Long.fromValue(object.numberTrades) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeIds: Array.isArray(object == null ? void 0 : object.tradeIds) ? object.tradeIds.map((e) => String(e)) : [],
      openStartTime: isSet$1(object.openStartTime) ? Long.fromValue(object.openStartTime) : Long.ZERO,
      closeEndTime: isSet$1(object.closeEndTime) ? Long.fromValue(object.closeEndTime) : Long.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.marketId !== void 0 && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.open !== void 0 && (obj.open = message.open ? Open.toJSON(message.open) : void 0);
    message.high !== void 0 && (obj.high = message.high ? High.toJSON(message.high) : void 0);
    message.low !== void 0 && (obj.low = message.low ? Low.toJSON(message.low) : void 0);
    message.close !== void 0 && (obj.close = message.close ? Close.toJSON(message.close) : void 0);
    message.volume !== void 0 && (obj.volume = (message.volume || Long.ZERO).toString());
    message.priceVolume !== void 0 && (obj.priceVolume = message.priceVolume);
    message.numberTrades !== void 0 && (obj.numberTrades = (message.numberTrades || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    if (message.tradeIds) {
      obj.tradeIds = message.tradeIds.map((e) => e);
    } else {
      obj.tradeIds = [];
    }
    message.openStartTime !== void 0 && (obj.openStartTime = (message.openStartTime || Long.ZERO).toString());
    message.closeEndTime !== void 0 && (obj.closeEndTime = (message.closeEndTime || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseOhlc();
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? Long.fromValue(object.marketId) : Long.ZERO;
    message.symbol = (_a = object.symbol) != null ? _a : "";
    message.open = object.open !== void 0 && object.open !== null ? Open.fromPartial(object.open) : void 0;
    message.high = object.high !== void 0 && object.high !== null ? High.fromPartial(object.high) : void 0;
    message.low = object.low !== void 0 && object.low !== null ? Low.fromPartial(object.low) : void 0;
    message.close = object.close !== void 0 && object.close !== null ? Close.fromPartial(object.close) : void 0;
    message.volume = object.volume !== void 0 && object.volume !== null ? Long.fromValue(object.volume) : Long.ZERO;
    message.priceVolume = (_b = object.priceVolume) != null ? _b : 0;
    message.numberTrades = object.numberTrades !== void 0 && object.numberTrades !== null ? Long.fromValue(object.numberTrades) : Long.ZERO;
    message.tradeDate = (_c = object.tradeDate) != null ? _c : 0;
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeIds = ((_d = object.tradeIds) == null ? void 0 : _d.map((e) => e)) || [];
    message.openStartTime = object.openStartTime !== void 0 && object.openStartTime !== null ? Long.fromValue(object.openStartTime) : Long.ZERO;
    message.closeEndTime = object.closeEndTime !== void 0 && object.closeEndTime !== null ? Long.fromValue(object.closeEndTime) : Long.ZERO;
    return message;
  }
};
function createBaseInstrumentAction() {
  return {
    transactionTime: Long.ZERO,
    tradeDate: 0,
    action: 0,
    message: "",
    instrument: void 0,
    newInstrument: void 0
  };
}
const InstrumentAction = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer2.uint32(8).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer2.uint32(16).sint32(message.tradeDate);
    }
    if (message.action !== 0) {
      writer2.uint32(24).int32(message.action);
    }
    if (message.message !== "") {
      writer2.uint32(34).string(message.message);
    }
    if (message.instrument !== void 0) {
      InstrumentDefinition.encode(message.instrument, writer2.uint32(82).fork()).ldelim();
    }
    if (message.newInstrument !== void 0) {
      InstrumentDefinition.encode(message.newInstrument, writer2.uint32(90).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentAction();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionTime = reader2.sint64();
          break;
        case 2:
          message.tradeDate = reader2.sint32();
          break;
        case 3:
          message.action = reader2.int32();
          break;
        case 4:
          message.message = reader2.string();
          break;
        case 10:
          message.instrument = InstrumentDefinition.decode(reader2, reader2.uint32());
          break;
        case 11:
          message.newInstrument = InstrumentDefinition.decode(reader2, reader2.uint32());
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet$1(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet$1(object.tradeDate) ? Number(object.tradeDate) : 0,
      action: isSet$1(object.action) ? actionTypeFromJSON(object.action) : 0,
      message: isSet$1(object.message) ? String(object.message) : "",
      instrument: isSet$1(object.instrument) ? InstrumentDefinition.fromJSON(object.instrument) : void 0,
      newInstrument: isSet$1(object.newInstrument) ? InstrumentDefinition.fromJSON(object.newInstrument) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.action !== void 0 && (obj.action = actionTypeToJSON(message.action));
    message.message !== void 0 && (obj.message = message.message);
    message.instrument !== void 0 && (obj.instrument = message.instrument ? InstrumentDefinition.toJSON(message.instrument) : void 0);
    message.newInstrument !== void 0 && (obj.newInstrument = message.newInstrument ? InstrumentDefinition.toJSON(message.newInstrument) : void 0);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseInstrumentAction();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? Long.fromValue(object.transactionTime) : Long.ZERO;
    message.tradeDate = (_a = object.tradeDate) != null ? _a : 0;
    message.action = (_b = object.action) != null ? _b : 0;
    message.message = (_c = object.message) != null ? _c : "";
    message.instrument = object.instrument !== void 0 && object.instrument !== null ? InstrumentDefinition.fromPartial(object.instrument) : void 0;
    message.newInstrument = object.newInstrument !== void 0 && object.newInstrument !== null ? InstrumentDefinition.fromPartial(object.newInstrument) : void 0;
    return message;
  }
};
var globalThis$1 = (() => {
  if (typeof globalThis$1 !== "undefined") {
    return globalThis$1;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
  if (globalThis$1.Buffer) {
    return Uint8Array.from(globalThis$1.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis$1.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}
function base64FromBytes(arr) {
  if (globalThis$1.Buffer) {
    return globalThis$1.Buffer.from(arr).toString("base64");
  } else {
    const bin = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis$1.btoa(bin.join(""));
  }
}
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long;
  _m0.configure();
}
function isSet$1(value) {
  return value !== null && value !== void 0;
}
var Result = /* @__PURE__ */ ((Result2) => {
  Result2[Result2["UNKNOWN_RESULT"] = 0] = "UNKNOWN_RESULT";
  Result2[Result2["SUCCESS"] = 1] = "SUCCESS";
  Result2[Result2["DUPLICATE_LOGIN"] = 115] = "DUPLICATE_LOGIN";
  Result2[Result2["INVALID_SYMBOL"] = 116] = "INVALID_SYMBOL";
  Result2[Result2["INVALID_MARKET_ID"] = 117] = "INVALID_MARKET_ID";
  Result2[Result2["INVALID_EXCHANGE"] = 118] = "INVALID_EXCHANGE";
  Result2[Result2["INVALID_CHANNEL_ID"] = 119] = "INVALID_CHANNEL_ID";
  Result2[Result2["MALFORMED_MESSAGE"] = 120] = "MALFORMED_MESSAGE";
  Result2[Result2["UNEXPECTED_MESSAGE"] = 121] = "UNEXPECTED_MESSAGE";
  Result2[Result2["NOT_SUBSCRIBED"] = 122] = "NOT_SUBSCRIBED";
  Result2[Result2["DUPLICATE_SUBSCRIPTION"] = 123] = "DUPLICATE_SUBSCRIPTION";
  Result2[Result2["INVALID_CREDENTIALS"] = 124] = "INVALID_CREDENTIALS";
  Result2[Result2["INSUFFICIENT_PRIVILEGES"] = 125] = "INSUFFICIENT_PRIVILEGES";
  Result2[Result2["AUTHENTICATION_REQUIRED"] = 126] = "AUTHENTICATION_REQUIRED";
  Result2[Result2["GENERIC_FAILURE"] = 127] = "GENERIC_FAILURE";
  Result2[Result2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return Result2;
})(Result || {});
function resultFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_RESULT":
      return 0;
    case 1:
    case "SUCCESS":
      return 1;
    case 115:
    case "DUPLICATE_LOGIN":
      return 115;
    case 116:
    case "INVALID_SYMBOL":
      return 116;
    case 117:
    case "INVALID_MARKET_ID":
      return 117;
    case 118:
    case "INVALID_EXCHANGE":
      return 118;
    case 119:
    case "INVALID_CHANNEL_ID":
      return 119;
    case 120:
    case "MALFORMED_MESSAGE":
      return 120;
    case 121:
    case "UNEXPECTED_MESSAGE":
      return 121;
    case 122:
    case "NOT_SUBSCRIBED":
      return 122;
    case 123:
    case "DUPLICATE_SUBSCRIPTION":
      return 123;
    case 124:
    case "INVALID_CREDENTIALS":
      return 124;
    case 125:
    case "INSUFFICIENT_PRIVILEGES":
      return 125;
    case 126:
    case "AUTHENTICATION_REQUIRED":
      return 126;
    case 127:
    case "GENERIC_FAILURE":
      return 127;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function resultToJSON(object) {
  switch (object) {
    case 0:
      return "UNKNOWN_RESULT";
    case 1:
      return "SUCCESS";
    case 115:
      return "DUPLICATE_LOGIN";
    case 116:
      return "INVALID_SYMBOL";
    case 117:
      return "INVALID_MARKET_ID";
    case 118:
      return "INVALID_EXCHANGE";
    case 119:
      return "INVALID_CHANNEL_ID";
    case 120:
      return "MALFORMED_MESSAGE";
    case 121:
      return "UNEXPECTED_MESSAGE";
    case 122:
      return "NOT_SUBSCRIBED";
    case 123:
      return "DUPLICATE_SUBSCRIPTION";
    case 124:
      return "INVALID_CREDENTIALS";
    case 125:
      return "INSUFFICIENT_PRIVILEGES";
    case 126:
      return "AUTHENTICATION_REQUIRED";
    case 127:
      return "GENERIC_FAILURE";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
var SubscriptionType = /* @__PURE__ */ ((SubscriptionType2) => {
  SubscriptionType2[SubscriptionType2["ALL"] = 0] = "ALL";
  SubscriptionType2[SubscriptionType2["QUOTE"] = 1] = "QUOTE";
  SubscriptionType2[SubscriptionType2["QUOTE_PARTICIPANT"] = 2] = "QUOTE_PARTICIPANT";
  SubscriptionType2[SubscriptionType2["DEPTH_PRICE"] = 3] = "DEPTH_PRICE";
  SubscriptionType2[SubscriptionType2["DEPTH_ORDER"] = 4] = "DEPTH_ORDER";
  SubscriptionType2[SubscriptionType2["TRADES"] = 5] = "TRADES";
  SubscriptionType2[SubscriptionType2["CUMLATIVE_VOLUME"] = 6] = "CUMLATIVE_VOLUME";
  SubscriptionType2[SubscriptionType2["OHLC"] = 7] = "OHLC";
  SubscriptionType2[SubscriptionType2["OHLC_NON_REGULAR"] = 8] = "OHLC_NON_REGULAR";
  SubscriptionType2[SubscriptionType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return SubscriptionType2;
})(SubscriptionType || {});
function subscriptionTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "ALL":
      return 0;
    case 1:
    case "QUOTE":
      return 1;
    case 2:
    case "QUOTE_PARTICIPANT":
      return 2;
    case 3:
    case "DEPTH_PRICE":
      return 3;
    case 4:
    case "DEPTH_ORDER":
      return 4;
    case 5:
    case "TRADES":
      return 5;
    case 6:
    case "CUMLATIVE_VOLUME":
      return 6;
    case 7:
    case "OHLC":
      return 7;
    case 8:
    case "OHLC_NON_REGULAR":
      return 8;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function subscriptionTypeToJSON(object) {
  switch (object) {
    case 0:
      return "ALL";
    case 1:
      return "QUOTE";
    case 2:
      return "QUOTE_PARTICIPANT";
    case 3:
      return "DEPTH_PRICE";
    case 4:
      return "DEPTH_ORDER";
    case 5:
      return "TRADES";
    case 6:
      return "CUMLATIVE_VOLUME";
    case 7:
      return "OHLC";
    case 8:
      return "OHLC_NON_REGULAR";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function symbolTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "BARCHART":
      return 0;
    case 1:
    case "EXCHANGE":
      return 1;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1;
  }
}
function symbolTypeToJSON(object) {
  switch (object) {
    case 0:
      return "BARCHART";
    case 1:
      return "EXCHANGE";
    case -1:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseOpenfeedGatewayRequest() {
  return {
    loginRequest: void 0,
    logoutRequest: void 0,
    subscriptionRequest: void 0,
    instrumentRequest: void 0,
    instrumentReferenceRequest: void 0,
    exchangeRequest: void 0
  };
}
const OpenfeedGatewayRequest = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.loginRequest !== void 0) {
      LoginRequest.encode(message.loginRequest, writer2.uint32(10).fork()).ldelim();
    }
    if (message.logoutRequest !== void 0) {
      LogoutRequest.encode(message.logoutRequest, writer2.uint32(18).fork()).ldelim();
    }
    if (message.subscriptionRequest !== void 0) {
      SubscriptionRequest.encode(message.subscriptionRequest, writer2.uint32(26).fork()).ldelim();
    }
    if (message.instrumentRequest !== void 0) {
      InstrumentRequest.encode(message.instrumentRequest, writer2.uint32(34).fork()).ldelim();
    }
    if (message.instrumentReferenceRequest !== void 0) {
      InstrumentReferenceRequest.encode(message.instrumentReferenceRequest, writer2.uint32(42).fork()).ldelim();
    }
    if (message.exchangeRequest !== void 0) {
      ExchangeRequest.encode(message.exchangeRequest, writer2.uint32(50).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseOpenfeedGatewayRequest();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loginRequest = LoginRequest.decode(reader2, reader2.uint32());
          break;
        case 2:
          message.logoutRequest = LogoutRequest.decode(reader2, reader2.uint32());
          break;
        case 3:
          message.subscriptionRequest = SubscriptionRequest.decode(reader2, reader2.uint32());
          break;
        case 4:
          message.instrumentRequest = InstrumentRequest.decode(reader2, reader2.uint32());
          break;
        case 5:
          message.instrumentReferenceRequest = InstrumentReferenceRequest.decode(reader2, reader2.uint32());
          break;
        case 6:
          message.exchangeRequest = ExchangeRequest.decode(reader2, reader2.uint32());
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      loginRequest: isSet(object.loginRequest) ? LoginRequest.fromJSON(object.loginRequest) : void 0,
      logoutRequest: isSet(object.logoutRequest) ? LogoutRequest.fromJSON(object.logoutRequest) : void 0,
      subscriptionRequest: isSet(object.subscriptionRequest) ? SubscriptionRequest.fromJSON(object.subscriptionRequest) : void 0,
      instrumentRequest: isSet(object.instrumentRequest) ? InstrumentRequest.fromJSON(object.instrumentRequest) : void 0,
      instrumentReferenceRequest: isSet(object.instrumentReferenceRequest) ? InstrumentReferenceRequest.fromJSON(object.instrumentReferenceRequest) : void 0,
      exchangeRequest: isSet(object.exchangeRequest) ? ExchangeRequest.fromJSON(object.exchangeRequest) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.loginRequest !== void 0 && (obj.loginRequest = message.loginRequest ? LoginRequest.toJSON(message.loginRequest) : void 0);
    message.logoutRequest !== void 0 && (obj.logoutRequest = message.logoutRequest ? LogoutRequest.toJSON(message.logoutRequest) : void 0);
    message.subscriptionRequest !== void 0 && (obj.subscriptionRequest = message.subscriptionRequest ? SubscriptionRequest.toJSON(message.subscriptionRequest) : void 0);
    message.instrumentRequest !== void 0 && (obj.instrumentRequest = message.instrumentRequest ? InstrumentRequest.toJSON(message.instrumentRequest) : void 0);
    message.instrumentReferenceRequest !== void 0 && (obj.instrumentReferenceRequest = message.instrumentReferenceRequest ? InstrumentReferenceRequest.toJSON(message.instrumentReferenceRequest) : void 0);
    message.exchangeRequest !== void 0 && (obj.exchangeRequest = message.exchangeRequest ? ExchangeRequest.toJSON(message.exchangeRequest) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseOpenfeedGatewayRequest();
    message.loginRequest = object.loginRequest !== void 0 && object.loginRequest !== null ? LoginRequest.fromPartial(object.loginRequest) : void 0;
    message.logoutRequest = object.logoutRequest !== void 0 && object.logoutRequest !== null ? LogoutRequest.fromPartial(object.logoutRequest) : void 0;
    message.subscriptionRequest = object.subscriptionRequest !== void 0 && object.subscriptionRequest !== null ? SubscriptionRequest.fromPartial(object.subscriptionRequest) : void 0;
    message.instrumentRequest = object.instrumentRequest !== void 0 && object.instrumentRequest !== null ? InstrumentRequest.fromPartial(object.instrumentRequest) : void 0;
    message.instrumentReferenceRequest = object.instrumentReferenceRequest !== void 0 && object.instrumentReferenceRequest !== null ? InstrumentReferenceRequest.fromPartial(object.instrumentReferenceRequest) : void 0;
    message.exchangeRequest = object.exchangeRequest !== void 0 && object.exchangeRequest !== null ? ExchangeRequest.fromPartial(object.exchangeRequest) : void 0;
    return message;
  }
};
function createBaseOpenfeedGatewayMessage() {
  return {
    loginResponse: void 0,
    logoutResponse: void 0,
    instrumentResponse: void 0,
    instrumentReferenceResponse: void 0,
    subscriptionResponse: void 0,
    marketStatus: void 0,
    heartBeat: void 0,
    instrumentDefinition: void 0,
    marketSnapshot: void 0,
    marketUpdate: void 0,
    volumeAtPrice: void 0,
    ohlc: void 0,
    exchangeResponse: void 0,
    instrumentAction: void 0
  };
}
const OpenfeedGatewayMessage = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.loginResponse !== void 0) {
      LoginResponse.encode(message.loginResponse, writer2.uint32(10).fork()).ldelim();
    }
    if (message.logoutResponse !== void 0) {
      LogoutResponse.encode(message.logoutResponse, writer2.uint32(18).fork()).ldelim();
    }
    if (message.instrumentResponse !== void 0) {
      InstrumentResponse.encode(message.instrumentResponse, writer2.uint32(26).fork()).ldelim();
    }
    if (message.instrumentReferenceResponse !== void 0) {
      InstrumentReferenceResponse.encode(message.instrumentReferenceResponse, writer2.uint32(34).fork()).ldelim();
    }
    if (message.subscriptionResponse !== void 0) {
      SubscriptionResponse.encode(message.subscriptionResponse, writer2.uint32(42).fork()).ldelim();
    }
    if (message.marketStatus !== void 0) {
      MarketStatus.encode(message.marketStatus, writer2.uint32(50).fork()).ldelim();
    }
    if (message.heartBeat !== void 0) {
      HeartBeat.encode(message.heartBeat, writer2.uint32(58).fork()).ldelim();
    }
    if (message.instrumentDefinition !== void 0) {
      InstrumentDefinition.encode(message.instrumentDefinition, writer2.uint32(66).fork()).ldelim();
    }
    if (message.marketSnapshot !== void 0) {
      MarketSnapshot.encode(message.marketSnapshot, writer2.uint32(74).fork()).ldelim();
    }
    if (message.marketUpdate !== void 0) {
      MarketUpdate.encode(message.marketUpdate, writer2.uint32(82).fork()).ldelim();
    }
    if (message.volumeAtPrice !== void 0) {
      VolumeAtPrice.encode(message.volumeAtPrice, writer2.uint32(90).fork()).ldelim();
    }
    if (message.ohlc !== void 0) {
      Ohlc.encode(message.ohlc, writer2.uint32(98).fork()).ldelim();
    }
    if (message.exchangeResponse !== void 0) {
      ExchangeResponse.encode(message.exchangeResponse, writer2.uint32(106).fork()).ldelim();
    }
    if (message.instrumentAction !== void 0) {
      InstrumentAction.encode(message.instrumentAction, writer2.uint32(114).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseOpenfeedGatewayMessage();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loginResponse = LoginResponse.decode(reader2, reader2.uint32());
          break;
        case 2:
          message.logoutResponse = LogoutResponse.decode(reader2, reader2.uint32());
          break;
        case 3:
          message.instrumentResponse = InstrumentResponse.decode(reader2, reader2.uint32());
          break;
        case 4:
          message.instrumentReferenceResponse = InstrumentReferenceResponse.decode(reader2, reader2.uint32());
          break;
        case 5:
          message.subscriptionResponse = SubscriptionResponse.decode(reader2, reader2.uint32());
          break;
        case 6:
          message.marketStatus = MarketStatus.decode(reader2, reader2.uint32());
          break;
        case 7:
          message.heartBeat = HeartBeat.decode(reader2, reader2.uint32());
          break;
        case 8:
          message.instrumentDefinition = InstrumentDefinition.decode(reader2, reader2.uint32());
          break;
        case 9:
          message.marketSnapshot = MarketSnapshot.decode(reader2, reader2.uint32());
          break;
        case 10:
          message.marketUpdate = MarketUpdate.decode(reader2, reader2.uint32());
          break;
        case 11:
          message.volumeAtPrice = VolumeAtPrice.decode(reader2, reader2.uint32());
          break;
        case 12:
          message.ohlc = Ohlc.decode(reader2, reader2.uint32());
          break;
        case 13:
          message.exchangeResponse = ExchangeResponse.decode(reader2, reader2.uint32());
          break;
        case 14:
          message.instrumentAction = InstrumentAction.decode(reader2, reader2.uint32());
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      loginResponse: isSet(object.loginResponse) ? LoginResponse.fromJSON(object.loginResponse) : void 0,
      logoutResponse: isSet(object.logoutResponse) ? LogoutResponse.fromJSON(object.logoutResponse) : void 0,
      instrumentResponse: isSet(object.instrumentResponse) ? InstrumentResponse.fromJSON(object.instrumentResponse) : void 0,
      instrumentReferenceResponse: isSet(object.instrumentReferenceResponse) ? InstrumentReferenceResponse.fromJSON(object.instrumentReferenceResponse) : void 0,
      subscriptionResponse: isSet(object.subscriptionResponse) ? SubscriptionResponse.fromJSON(object.subscriptionResponse) : void 0,
      marketStatus: isSet(object.marketStatus) ? MarketStatus.fromJSON(object.marketStatus) : void 0,
      heartBeat: isSet(object.heartBeat) ? HeartBeat.fromJSON(object.heartBeat) : void 0,
      instrumentDefinition: isSet(object.instrumentDefinition) ? InstrumentDefinition.fromJSON(object.instrumentDefinition) : void 0,
      marketSnapshot: isSet(object.marketSnapshot) ? MarketSnapshot.fromJSON(object.marketSnapshot) : void 0,
      marketUpdate: isSet(object.marketUpdate) ? MarketUpdate.fromJSON(object.marketUpdate) : void 0,
      volumeAtPrice: isSet(object.volumeAtPrice) ? VolumeAtPrice.fromJSON(object.volumeAtPrice) : void 0,
      ohlc: isSet(object.ohlc) ? Ohlc.fromJSON(object.ohlc) : void 0,
      exchangeResponse: isSet(object.exchangeResponse) ? ExchangeResponse.fromJSON(object.exchangeResponse) : void 0,
      instrumentAction: isSet(object.instrumentAction) ? InstrumentAction.fromJSON(object.instrumentAction) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.loginResponse !== void 0 && (obj.loginResponse = message.loginResponse ? LoginResponse.toJSON(message.loginResponse) : void 0);
    message.logoutResponse !== void 0 && (obj.logoutResponse = message.logoutResponse ? LogoutResponse.toJSON(message.logoutResponse) : void 0);
    message.instrumentResponse !== void 0 && (obj.instrumentResponse = message.instrumentResponse ? InstrumentResponse.toJSON(message.instrumentResponse) : void 0);
    message.instrumentReferenceResponse !== void 0 && (obj.instrumentReferenceResponse = message.instrumentReferenceResponse ? InstrumentReferenceResponse.toJSON(message.instrumentReferenceResponse) : void 0);
    message.subscriptionResponse !== void 0 && (obj.subscriptionResponse = message.subscriptionResponse ? SubscriptionResponse.toJSON(message.subscriptionResponse) : void 0);
    message.marketStatus !== void 0 && (obj.marketStatus = message.marketStatus ? MarketStatus.toJSON(message.marketStatus) : void 0);
    message.heartBeat !== void 0 && (obj.heartBeat = message.heartBeat ? HeartBeat.toJSON(message.heartBeat) : void 0);
    message.instrumentDefinition !== void 0 && (obj.instrumentDefinition = message.instrumentDefinition ? InstrumentDefinition.toJSON(message.instrumentDefinition) : void 0);
    message.marketSnapshot !== void 0 && (obj.marketSnapshot = message.marketSnapshot ? MarketSnapshot.toJSON(message.marketSnapshot) : void 0);
    message.marketUpdate !== void 0 && (obj.marketUpdate = message.marketUpdate ? MarketUpdate.toJSON(message.marketUpdate) : void 0);
    message.volumeAtPrice !== void 0 && (obj.volumeAtPrice = message.volumeAtPrice ? VolumeAtPrice.toJSON(message.volumeAtPrice) : void 0);
    message.ohlc !== void 0 && (obj.ohlc = message.ohlc ? Ohlc.toJSON(message.ohlc) : void 0);
    message.exchangeResponse !== void 0 && (obj.exchangeResponse = message.exchangeResponse ? ExchangeResponse.toJSON(message.exchangeResponse) : void 0);
    message.instrumentAction !== void 0 && (obj.instrumentAction = message.instrumentAction ? InstrumentAction.toJSON(message.instrumentAction) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseOpenfeedGatewayMessage();
    message.loginResponse = object.loginResponse !== void 0 && object.loginResponse !== null ? LoginResponse.fromPartial(object.loginResponse) : void 0;
    message.logoutResponse = object.logoutResponse !== void 0 && object.logoutResponse !== null ? LogoutResponse.fromPartial(object.logoutResponse) : void 0;
    message.instrumentResponse = object.instrumentResponse !== void 0 && object.instrumentResponse !== null ? InstrumentResponse.fromPartial(object.instrumentResponse) : void 0;
    message.instrumentReferenceResponse = object.instrumentReferenceResponse !== void 0 && object.instrumentReferenceResponse !== null ? InstrumentReferenceResponse.fromPartial(object.instrumentReferenceResponse) : void 0;
    message.subscriptionResponse = object.subscriptionResponse !== void 0 && object.subscriptionResponse !== null ? SubscriptionResponse.fromPartial(object.subscriptionResponse) : void 0;
    message.marketStatus = object.marketStatus !== void 0 && object.marketStatus !== null ? MarketStatus.fromPartial(object.marketStatus) : void 0;
    message.heartBeat = object.heartBeat !== void 0 && object.heartBeat !== null ? HeartBeat.fromPartial(object.heartBeat) : void 0;
    message.instrumentDefinition = object.instrumentDefinition !== void 0 && object.instrumentDefinition !== null ? InstrumentDefinition.fromPartial(object.instrumentDefinition) : void 0;
    message.marketSnapshot = object.marketSnapshot !== void 0 && object.marketSnapshot !== null ? MarketSnapshot.fromPartial(object.marketSnapshot) : void 0;
    message.marketUpdate = object.marketUpdate !== void 0 && object.marketUpdate !== null ? MarketUpdate.fromPartial(object.marketUpdate) : void 0;
    message.volumeAtPrice = object.volumeAtPrice !== void 0 && object.volumeAtPrice !== null ? VolumeAtPrice.fromPartial(object.volumeAtPrice) : void 0;
    message.ohlc = object.ohlc !== void 0 && object.ohlc !== null ? Ohlc.fromPartial(object.ohlc) : void 0;
    message.exchangeResponse = object.exchangeResponse !== void 0 && object.exchangeResponse !== null ? ExchangeResponse.fromPartial(object.exchangeResponse) : void 0;
    message.instrumentAction = object.instrumentAction !== void 0 && object.instrumentAction !== null ? InstrumentAction.fromPartial(object.instrumentAction) : void 0;
    return message;
  }
};
function createBaseStatus() {
  return { result: 0, message: "", service: 0 };
}
const Status = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.result !== 0) {
      writer2.uint32(8).int32(message.result);
    }
    if (message.message !== "") {
      writer2.uint32(18).string(message.message);
    }
    if (message.service !== 0) {
      writer2.uint32(24).int32(message.service);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseStatus();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader2.int32();
          break;
        case 2:
          message.message = reader2.string();
          break;
        case 3:
          message.service = reader2.int32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? resultFromJSON(object.result) : 0,
      message: isSet(object.message) ? String(object.message) : "",
      service: isSet(object.service) ? serviceFromJSON(object.service) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.result !== void 0 && (obj.result = resultToJSON(message.result));
    message.message !== void 0 && (obj.message = message.message);
    message.service !== void 0 && (obj.service = serviceToJSON(message.service));
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseStatus();
    message.result = (_a = object.result) != null ? _a : 0;
    message.message = (_b = object.message) != null ? _b : "";
    message.service = (_c = object.service) != null ? _c : 0;
    return message;
  }
};
function createBaseLoginRequest() {
  return { correlationId: Long.ZERO, username: "", password: "", clientVersion: "", protocolVersion: 0 };
}
const LoginRequest = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer2.uint32(8).sint64(message.correlationId);
    }
    if (message.username !== "") {
      writer2.uint32(18).string(message.username);
    }
    if (message.password !== "") {
      writer2.uint32(26).string(message.password);
    }
    if (message.clientVersion !== "") {
      writer2.uint32(34).string(message.clientVersion);
    }
    if (message.protocolVersion !== 0) {
      writer2.uint32(40).sint32(message.protocolVersion);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseLoginRequest();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader2.sint64();
          break;
        case 2:
          message.username = reader2.string();
          break;
        case 3:
          message.password = reader2.string();
          break;
        case 4:
          message.clientVersion = reader2.string();
          break;
        case 5:
          message.protocolVersion = reader2.sint32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      username: isSet(object.username) ? String(object.username) : "",
      password: isSet(object.password) ? String(object.password) : "",
      clientVersion: isSet(object.clientVersion) ? String(object.clientVersion) : "",
      protocolVersion: isSet(object.protocolVersion) ? Number(object.protocolVersion) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.username !== void 0 && (obj.username = message.username);
    message.password !== void 0 && (obj.password = message.password);
    message.clientVersion !== void 0 && (obj.clientVersion = message.clientVersion);
    message.protocolVersion !== void 0 && (obj.protocolVersion = Math.round(message.protocolVersion));
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseLoginRequest();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? Long.fromValue(object.correlationId) : Long.ZERO;
    message.username = (_a = object.username) != null ? _a : "";
    message.password = (_b = object.password) != null ? _b : "";
    message.clientVersion = (_c = object.clientVersion) != null ? _c : "";
    message.protocolVersion = (_d = object.protocolVersion) != null ? _d : 0;
    return message;
  }
};
function createBaseLoginResponse() {
  return { correlationId: Long.ZERO, status: void 0, token: "" };
}
const LoginResponse = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer2.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer2.uint32(18).fork()).ldelim();
    }
    if (message.token !== "") {
      writer2.uint32(26).string(message.token);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseLoginResponse();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader2.sint64();
          break;
        case 2:
          message.status = Status.decode(reader2, reader2.uint32());
          break;
        case 3:
          message.token = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      status: isSet(object.status) ? Status.fromJSON(object.status) : void 0,
      token: isSet(object.token) ? String(object.token) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.status !== void 0 && (obj.status = message.status ? Status.toJSON(message.status) : void 0);
    message.token !== void 0 && (obj.token = message.token);
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseLoginResponse();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? Long.fromValue(object.correlationId) : Long.ZERO;
    message.status = object.status !== void 0 && object.status !== null ? Status.fromPartial(object.status) : void 0;
    message.token = (_a = object.token) != null ? _a : "";
    return message;
  }
};
function createBaseLogoutRequest() {
  return { correlationId: Long.ZERO, token: "" };
}
const LogoutRequest = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer2.uint32(8).sint64(message.correlationId);
    }
    if (message.token !== "") {
      writer2.uint32(26).string(message.token);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseLogoutRequest();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader2.sint64();
          break;
        case 3:
          message.token = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      token: isSet(object.token) ? String(object.token) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.token !== void 0 && (obj.token = message.token);
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseLogoutRequest();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? Long.fromValue(object.correlationId) : Long.ZERO;
    message.token = (_a = object.token) != null ? _a : "";
    return message;
  }
};
function createBaseLogoutResponse() {
  return { correlationId: Long.ZERO, status: void 0 };
}
const LogoutResponse = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer2.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer2.uint32(18).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseLogoutResponse();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader2.sint64();
          break;
        case 2:
          message.status = Status.decode(reader2, reader2.uint32());
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      status: isSet(object.status) ? Status.fromJSON(object.status) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.status !== void 0 && (obj.status = message.status ? Status.toJSON(message.status) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseLogoutResponse();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? Long.fromValue(object.correlationId) : Long.ZERO;
    message.status = object.status !== void 0 && object.status !== null ? Status.fromPartial(object.status) : void 0;
    return message;
  }
};
function createBaseInstrumentRequest() {
  return {
    correlationId: Long.ZERO,
    token: "",
    symbol: void 0,
    marketId: void 0,
    exchange: void 0,
    channelId: void 0
  };
}
const InstrumentRequest = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer2.uint32(8).sint64(message.correlationId);
    }
    if (message.token !== "") {
      writer2.uint32(18).string(message.token);
    }
    if (message.symbol !== void 0) {
      writer2.uint32(82).string(message.symbol);
    }
    if (message.marketId !== void 0) {
      writer2.uint32(88).sint64(message.marketId);
    }
    if (message.exchange !== void 0) {
      writer2.uint32(98).string(message.exchange);
    }
    if (message.channelId !== void 0) {
      writer2.uint32(104).sint32(message.channelId);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentRequest();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader2.sint64();
          break;
        case 2:
          message.token = reader2.string();
          break;
        case 10:
          message.symbol = reader2.string();
          break;
        case 11:
          message.marketId = reader2.sint64();
          break;
        case 12:
          message.exchange = reader2.string();
          break;
        case 13:
          message.channelId = reader2.sint32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      token: isSet(object.token) ? String(object.token) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : void 0,
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : void 0,
      exchange: isSet(object.exchange) ? String(object.exchange) : void 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.token !== void 0 && (obj.token = message.token);
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.marketId !== void 0 && (obj.marketId = (message.marketId || void 0).toString());
    message.exchange !== void 0 && (obj.exchange = message.exchange);
    message.channelId !== void 0 && (obj.channelId = Math.round(message.channelId));
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseInstrumentRequest();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? Long.fromValue(object.correlationId) : Long.ZERO;
    message.token = (_a = object.token) != null ? _a : "";
    message.symbol = (_b = object.symbol) != null ? _b : void 0;
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? Long.fromValue(object.marketId) : void 0;
    message.exchange = (_c = object.exchange) != null ? _c : void 0;
    message.channelId = (_d = object.channelId) != null ? _d : void 0;
    return message;
  }
};
function createBaseInstrumentResponse() {
  return {
    correlationId: Long.ZERO,
    status: void 0,
    numberOfDefinitions: 0,
    symbol: "",
    marketId: Long.ZERO,
    exchange: "",
    channelId: 0
  };
}
const InstrumentResponse = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer2.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer2.uint32(18).fork()).ldelim();
    }
    if (message.numberOfDefinitions !== 0) {
      writer2.uint32(24).sint32(message.numberOfDefinitions);
    }
    if (message.symbol !== "") {
      writer2.uint32(34).string(message.symbol);
    }
    if (!message.marketId.isZero()) {
      writer2.uint32(40).sint64(message.marketId);
    }
    if (message.exchange !== "") {
      writer2.uint32(50).string(message.exchange);
    }
    if (message.channelId !== 0) {
      writer2.uint32(56).sint32(message.channelId);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentResponse();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader2.sint64();
          break;
        case 2:
          message.status = Status.decode(reader2, reader2.uint32());
          break;
        case 3:
          message.numberOfDefinitions = reader2.sint32();
          break;
        case 4:
          message.symbol = reader2.string();
          break;
        case 5:
          message.marketId = reader2.sint64();
          break;
        case 6:
          message.exchange = reader2.string();
          break;
        case 7:
          message.channelId = reader2.sint32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      status: isSet(object.status) ? Status.fromJSON(object.status) : void 0,
      numberOfDefinitions: isSet(object.numberOfDefinitions) ? Number(object.numberOfDefinitions) : 0,
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      exchange: isSet(object.exchange) ? String(object.exchange) : "",
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.status !== void 0 && (obj.status = message.status ? Status.toJSON(message.status) : void 0);
    message.numberOfDefinitions !== void 0 && (obj.numberOfDefinitions = Math.round(message.numberOfDefinitions));
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.marketId !== void 0 && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.exchange !== void 0 && (obj.exchange = message.exchange);
    message.channelId !== void 0 && (obj.channelId = Math.round(message.channelId));
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseInstrumentResponse();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? Long.fromValue(object.correlationId) : Long.ZERO;
    message.status = object.status !== void 0 && object.status !== null ? Status.fromPartial(object.status) : void 0;
    message.numberOfDefinitions = (_a = object.numberOfDefinitions) != null ? _a : 0;
    message.symbol = (_b = object.symbol) != null ? _b : "";
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? Long.fromValue(object.marketId) : Long.ZERO;
    message.exchange = (_c = object.exchange) != null ? _c : "";
    message.channelId = (_d = object.channelId) != null ? _d : 0;
    return message;
  }
};
function createBaseInstrumentReferenceRequest() {
  return {
    correlationId: Long.ZERO,
    token: "",
    symbol: void 0,
    marketId: void 0,
    exchange: void 0,
    channelId: void 0
  };
}
const InstrumentReferenceRequest = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer2.uint32(8).sint64(message.correlationId);
    }
    if (message.token !== "") {
      writer2.uint32(18).string(message.token);
    }
    if (message.symbol !== void 0) {
      writer2.uint32(82).string(message.symbol);
    }
    if (message.marketId !== void 0) {
      writer2.uint32(88).sint64(message.marketId);
    }
    if (message.exchange !== void 0) {
      writer2.uint32(98).string(message.exchange);
    }
    if (message.channelId !== void 0) {
      writer2.uint32(104).sint32(message.channelId);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentReferenceRequest();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader2.sint64();
          break;
        case 2:
          message.token = reader2.string();
          break;
        case 10:
          message.symbol = reader2.string();
          break;
        case 11:
          message.marketId = reader2.sint64();
          break;
        case 12:
          message.exchange = reader2.string();
          break;
        case 13:
          message.channelId = reader2.sint32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      token: isSet(object.token) ? String(object.token) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : void 0,
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : void 0,
      exchange: isSet(object.exchange) ? String(object.exchange) : void 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.token !== void 0 && (obj.token = message.token);
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.marketId !== void 0 && (obj.marketId = (message.marketId || void 0).toString());
    message.exchange !== void 0 && (obj.exchange = message.exchange);
    message.channelId !== void 0 && (obj.channelId = Math.round(message.channelId));
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseInstrumentReferenceRequest();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? Long.fromValue(object.correlationId) : Long.ZERO;
    message.token = (_a = object.token) != null ? _a : "";
    message.symbol = (_b = object.symbol) != null ? _b : void 0;
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? Long.fromValue(object.marketId) : void 0;
    message.exchange = (_c = object.exchange) != null ? _c : void 0;
    message.channelId = (_d = object.channelId) != null ? _d : void 0;
    return message;
  }
};
function createBaseInstrumentReferenceResponse() {
  return {
    correlationId: Long.ZERO,
    status: void 0,
    numberOfDefinitions: 0,
    channelId: 0,
    marketId: Long.ZERO,
    symbol: "",
    exchange: "",
    ddfSymbol: "",
    ddfExchange: "",
    ddfBaseCode: "",
    exchangeSymbol: ""
  };
}
const InstrumentReferenceResponse = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer2.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer2.uint32(18).fork()).ldelim();
    }
    if (message.numberOfDefinitions !== 0) {
      writer2.uint32(24).sint32(message.numberOfDefinitions);
    }
    if (message.channelId !== 0) {
      writer2.uint32(32).sint32(message.channelId);
    }
    if (!message.marketId.isZero()) {
      writer2.uint32(40).sint64(message.marketId);
    }
    if (message.symbol !== "") {
      writer2.uint32(50).string(message.symbol);
    }
    if (message.exchange !== "") {
      writer2.uint32(58).string(message.exchange);
    }
    if (message.ddfSymbol !== "") {
      writer2.uint32(66).string(message.ddfSymbol);
    }
    if (message.ddfExchange !== "") {
      writer2.uint32(74).string(message.ddfExchange);
    }
    if (message.ddfBaseCode !== "") {
      writer2.uint32(82).string(message.ddfBaseCode);
    }
    if (message.exchangeSymbol !== "") {
      writer2.uint32(90).string(message.exchangeSymbol);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseInstrumentReferenceResponse();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader2.sint64();
          break;
        case 2:
          message.status = Status.decode(reader2, reader2.uint32());
          break;
        case 3:
          message.numberOfDefinitions = reader2.sint32();
          break;
        case 4:
          message.channelId = reader2.sint32();
          break;
        case 5:
          message.marketId = reader2.sint64();
          break;
        case 6:
          message.symbol = reader2.string();
          break;
        case 7:
          message.exchange = reader2.string();
          break;
        case 8:
          message.ddfSymbol = reader2.string();
          break;
        case 9:
          message.ddfExchange = reader2.string();
          break;
        case 10:
          message.ddfBaseCode = reader2.string();
          break;
        case 11:
          message.exchangeSymbol = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      status: isSet(object.status) ? Status.fromJSON(object.status) : void 0,
      numberOfDefinitions: isSet(object.numberOfDefinitions) ? Number(object.numberOfDefinitions) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      exchange: isSet(object.exchange) ? String(object.exchange) : "",
      ddfSymbol: isSet(object.ddfSymbol) ? String(object.ddfSymbol) : "",
      ddfExchange: isSet(object.ddfExchange) ? String(object.ddfExchange) : "",
      ddfBaseCode: isSet(object.ddfBaseCode) ? String(object.ddfBaseCode) : "",
      exchangeSymbol: isSet(object.exchangeSymbol) ? String(object.exchangeSymbol) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.status !== void 0 && (obj.status = message.status ? Status.toJSON(message.status) : void 0);
    message.numberOfDefinitions !== void 0 && (obj.numberOfDefinitions = Math.round(message.numberOfDefinitions));
    message.channelId !== void 0 && (obj.channelId = Math.round(message.channelId));
    message.marketId !== void 0 && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.exchange !== void 0 && (obj.exchange = message.exchange);
    message.ddfSymbol !== void 0 && (obj.ddfSymbol = message.ddfSymbol);
    message.ddfExchange !== void 0 && (obj.ddfExchange = message.ddfExchange);
    message.ddfBaseCode !== void 0 && (obj.ddfBaseCode = message.ddfBaseCode);
    message.exchangeSymbol !== void 0 && (obj.exchangeSymbol = message.exchangeSymbol);
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const message = createBaseInstrumentReferenceResponse();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? Long.fromValue(object.correlationId) : Long.ZERO;
    message.status = object.status !== void 0 && object.status !== null ? Status.fromPartial(object.status) : void 0;
    message.numberOfDefinitions = (_a = object.numberOfDefinitions) != null ? _a : 0;
    message.channelId = (_b = object.channelId) != null ? _b : 0;
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? Long.fromValue(object.marketId) : Long.ZERO;
    message.symbol = (_c = object.symbol) != null ? _c : "";
    message.exchange = (_d = object.exchange) != null ? _d : "";
    message.ddfSymbol = (_e = object.ddfSymbol) != null ? _e : "";
    message.ddfExchange = (_f = object.ddfExchange) != null ? _f : "";
    message.ddfBaseCode = (_g = object.ddfBaseCode) != null ? _g : "";
    message.exchangeSymbol = (_h = object.exchangeSymbol) != null ? _h : "";
    return message;
  }
};
function createBaseExchangeRequest() {
  return { correlationId: Long.ZERO, token: "" };
}
const ExchangeRequest = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer2.uint32(8).sint64(message.correlationId);
    }
    if (message.token !== "") {
      writer2.uint32(18).string(message.token);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseExchangeRequest();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader2.sint64();
          break;
        case 2:
          message.token = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      token: isSet(object.token) ? String(object.token) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.token !== void 0 && (obj.token = message.token);
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseExchangeRequest();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? Long.fromValue(object.correlationId) : Long.ZERO;
    message.token = (_a = object.token) != null ? _a : "";
    return message;
  }
};
function createBaseExchangeResponse() {
  return { correlationId: Long.ZERO, status: void 0, exchanges: [] };
}
const ExchangeResponse = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer2.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer2.uint32(18).fork()).ldelim();
    }
    for (const v of message.exchanges) {
      ExchangeResponse_Exchange.encode(v, writer2.uint32(26).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseExchangeResponse();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader2.sint64();
          break;
        case 2:
          message.status = Status.decode(reader2, reader2.uint32());
          break;
        case 3:
          message.exchanges.push(ExchangeResponse_Exchange.decode(reader2, reader2.uint32()));
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      status: isSet(object.status) ? Status.fromJSON(object.status) : void 0,
      exchanges: Array.isArray(object == null ? void 0 : object.exchanges) ? object.exchanges.map((e) => ExchangeResponse_Exchange.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.status !== void 0 && (obj.status = message.status ? Status.toJSON(message.status) : void 0);
    if (message.exchanges) {
      obj.exchanges = message.exchanges.map((e) => e ? ExchangeResponse_Exchange.toJSON(e) : void 0);
    } else {
      obj.exchanges = [];
    }
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseExchangeResponse();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? Long.fromValue(object.correlationId) : Long.ZERO;
    message.status = object.status !== void 0 && object.status !== null ? Status.fromPartial(object.status) : void 0;
    message.exchanges = ((_a = object.exchanges) == null ? void 0 : _a.map((e) => ExchangeResponse_Exchange.fromPartial(e))) || [];
    return message;
  }
};
function createBaseExchangeResponse_Exchange() {
  return { code: "", description: "", aliases: [] };
}
const ExchangeResponse_Exchange = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.code !== "") {
      writer2.uint32(10).string(message.code);
    }
    if (message.description !== "") {
      writer2.uint32(18).string(message.description);
    }
    for (const v of message.aliases) {
      writer2.uint32(26).string(v);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseExchangeResponse_Exchange();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader2.string();
          break;
        case 2:
          message.description = reader2.string();
          break;
        case 3:
          message.aliases.push(reader2.string());
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      code: isSet(object.code) ? String(object.code) : "",
      description: isSet(object.description) ? String(object.description) : "",
      aliases: Array.isArray(object == null ? void 0 : object.aliases) ? object.aliases.map((e) => String(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.code !== void 0 && (obj.code = message.code);
    message.description !== void 0 && (obj.description = message.description);
    if (message.aliases) {
      obj.aliases = message.aliases.map((e) => e);
    } else {
      obj.aliases = [];
    }
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseExchangeResponse_Exchange();
    message.code = (_a = object.code) != null ? _a : "";
    message.description = (_b = object.description) != null ? _b : "";
    message.aliases = ((_c = object.aliases) == null ? void 0 : _c.map((e) => e)) || [];
    return message;
  }
};
function createBaseBulkSubscriptionFilter() {
  return { symbolType: 0, symbolPattern: "" };
}
const BulkSubscriptionFilter = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.symbolType !== 0) {
      writer2.uint32(8).int32(message.symbolType);
    }
    if (message.symbolPattern !== "") {
      writer2.uint32(18).string(message.symbolPattern);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseBulkSubscriptionFilter();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.symbolType = reader2.int32();
          break;
        case 2:
          message.symbolPattern = reader2.string();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      symbolType: isSet(object.symbolType) ? symbolTypeFromJSON(object.symbolType) : 0,
      symbolPattern: isSet(object.symbolPattern) ? String(object.symbolPattern) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.symbolType !== void 0 && (obj.symbolType = symbolTypeToJSON(message.symbolType));
    message.symbolPattern !== void 0 && (obj.symbolPattern = message.symbolPattern);
    return obj;
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseBulkSubscriptionFilter();
    message.symbolType = (_a = object.symbolType) != null ? _a : 0;
    message.symbolPattern = (_b = object.symbolPattern) != null ? _b : "";
    return message;
  }
};
function createBaseSubscriptionRequest() {
  return { correlationId: Long.ZERO, token: "", service: 0, unsubscribe: false, requests: [] };
}
const SubscriptionRequest = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer2.uint32(8).sint64(message.correlationId);
    }
    if (message.token !== "") {
      writer2.uint32(18).string(message.token);
    }
    if (message.service !== 0) {
      writer2.uint32(24).int32(message.service);
    }
    if (message.unsubscribe === true) {
      writer2.uint32(32).bool(message.unsubscribe);
    }
    for (const v of message.requests) {
      SubscriptionRequest_Request.encode(v, writer2.uint32(42).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseSubscriptionRequest();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader2.sint64();
          break;
        case 2:
          message.token = reader2.string();
          break;
        case 3:
          message.service = reader2.int32();
          break;
        case 4:
          message.unsubscribe = reader2.bool();
          break;
        case 5:
          message.requests.push(SubscriptionRequest_Request.decode(reader2, reader2.uint32()));
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      token: isSet(object.token) ? String(object.token) : "",
      service: isSet(object.service) ? serviceFromJSON(object.service) : 0,
      unsubscribe: isSet(object.unsubscribe) ? Boolean(object.unsubscribe) : false,
      requests: Array.isArray(object == null ? void 0 : object.requests) ? object.requests.map((e) => SubscriptionRequest_Request.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.token !== void 0 && (obj.token = message.token);
    message.service !== void 0 && (obj.service = serviceToJSON(message.service));
    message.unsubscribe !== void 0 && (obj.unsubscribe = message.unsubscribe);
    if (message.requests) {
      obj.requests = message.requests.map((e) => e ? SubscriptionRequest_Request.toJSON(e) : void 0);
    } else {
      obj.requests = [];
    }
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseSubscriptionRequest();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? Long.fromValue(object.correlationId) : Long.ZERO;
    message.token = (_a = object.token) != null ? _a : "";
    message.service = (_b = object.service) != null ? _b : 0;
    message.unsubscribe = (_c = object.unsubscribe) != null ? _c : false;
    message.requests = ((_d = object.requests) == null ? void 0 : _d.map((e) => SubscriptionRequest_Request.fromPartial(e))) || [];
    return message;
  }
};
function createBaseSubscriptionRequest_Request() {
  return {
    symbol: void 0,
    marketId: void 0,
    exchange: void 0,
    channelId: void 0,
    subscriptionType: [],
    snapshotIntervalSeconds: 0,
    instrumentType: [],
    bulkSubscriptionFilter: []
  };
}
const SubscriptionRequest_Request = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (message.symbol !== void 0) {
      writer2.uint32(10).string(message.symbol);
    }
    if (message.marketId !== void 0) {
      writer2.uint32(16).sint64(message.marketId);
    }
    if (message.exchange !== void 0) {
      writer2.uint32(26).string(message.exchange);
    }
    if (message.channelId !== void 0) {
      writer2.uint32(32).sint32(message.channelId);
    }
    writer2.uint32(82).fork();
    for (const v of message.subscriptionType) {
      writer2.int32(v);
    }
    writer2.ldelim();
    if (message.snapshotIntervalSeconds !== 0) {
      writer2.uint32(88).sint32(message.snapshotIntervalSeconds);
    }
    writer2.uint32(98).fork();
    for (const v of message.instrumentType) {
      writer2.int32(v);
    }
    writer2.ldelim();
    for (const v of message.bulkSubscriptionFilter) {
      BulkSubscriptionFilter.encode(v, writer2.uint32(106).fork()).ldelim();
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseSubscriptionRequest_Request();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.symbol = reader2.string();
          break;
        case 2:
          message.marketId = reader2.sint64();
          break;
        case 3:
          message.exchange = reader2.string();
          break;
        case 4:
          message.channelId = reader2.sint32();
          break;
        case 10:
          if ((tag & 7) === 2) {
            const end22 = reader2.uint32() + reader2.pos;
            while (reader2.pos < end22) {
              message.subscriptionType.push(reader2.int32());
            }
          } else {
            message.subscriptionType.push(reader2.int32());
          }
          break;
        case 11:
          message.snapshotIntervalSeconds = reader2.sint32();
          break;
        case 12:
          if ((tag & 7) === 2) {
            const end22 = reader2.uint32() + reader2.pos;
            while (reader2.pos < end22) {
              message.instrumentType.push(reader2.int32());
            }
          } else {
            message.instrumentType.push(reader2.int32());
          }
          break;
        case 13:
          message.bulkSubscriptionFilter.push(BulkSubscriptionFilter.decode(reader2, reader2.uint32()));
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      symbol: isSet(object.symbol) ? String(object.symbol) : void 0,
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : void 0,
      exchange: isSet(object.exchange) ? String(object.exchange) : void 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : void 0,
      subscriptionType: Array.isArray(object == null ? void 0 : object.subscriptionType) ? object.subscriptionType.map((e) => subscriptionTypeFromJSON(e)) : [],
      snapshotIntervalSeconds: isSet(object.snapshotIntervalSeconds) ? Number(object.snapshotIntervalSeconds) : 0,
      instrumentType: Array.isArray(object == null ? void 0 : object.instrumentType) ? object.instrumentType.map((e) => instrumentDefinition_InstrumentTypeFromJSON(e)) : [],
      bulkSubscriptionFilter: Array.isArray(object == null ? void 0 : object.bulkSubscriptionFilter) ? object.bulkSubscriptionFilter.map((e) => BulkSubscriptionFilter.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.marketId !== void 0 && (obj.marketId = (message.marketId || void 0).toString());
    message.exchange !== void 0 && (obj.exchange = message.exchange);
    message.channelId !== void 0 && (obj.channelId = Math.round(message.channelId));
    if (message.subscriptionType) {
      obj.subscriptionType = message.subscriptionType.map((e) => subscriptionTypeToJSON(e));
    } else {
      obj.subscriptionType = [];
    }
    message.snapshotIntervalSeconds !== void 0 && (obj.snapshotIntervalSeconds = Math.round(message.snapshotIntervalSeconds));
    if (message.instrumentType) {
      obj.instrumentType = message.instrumentType.map((e) => instrumentDefinition_InstrumentTypeToJSON(e));
    } else {
      obj.instrumentType = [];
    }
    if (message.bulkSubscriptionFilter) {
      obj.bulkSubscriptionFilter = message.bulkSubscriptionFilter.map(
        (e) => e ? BulkSubscriptionFilter.toJSON(e) : void 0
      );
    } else {
      obj.bulkSubscriptionFilter = [];
    }
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g;
    const message = createBaseSubscriptionRequest_Request();
    message.symbol = (_a = object.symbol) != null ? _a : void 0;
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? Long.fromValue(object.marketId) : void 0;
    message.exchange = (_b = object.exchange) != null ? _b : void 0;
    message.channelId = (_c = object.channelId) != null ? _c : void 0;
    message.subscriptionType = ((_d = object.subscriptionType) == null ? void 0 : _d.map((e) => e)) || [];
    message.snapshotIntervalSeconds = (_e = object.snapshotIntervalSeconds) != null ? _e : 0;
    message.instrumentType = ((_f = object.instrumentType) == null ? void 0 : _f.map((e) => e)) || [];
    message.bulkSubscriptionFilter = ((_g = object.bulkSubscriptionFilter) == null ? void 0 : _g.map((e) => BulkSubscriptionFilter.fromPartial(e))) || [];
    return message;
  }
};
function createBaseSubscriptionResponse() {
  return {
    correlationId: Long.ZERO,
    status: void 0,
    symbol: "",
    marketId: Long.ZERO,
    exchange: "",
    channelId: 0,
    numberOfDefinitions: 0,
    subscriptionType: 0,
    unsubscribe: false,
    snapshotIntervalSeconds: 0
  };
}
const SubscriptionResponse = {
  encode(message, writer2 = _m0.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer2.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer2.uint32(18).fork()).ldelim();
    }
    if (message.symbol !== "") {
      writer2.uint32(26).string(message.symbol);
    }
    if (!message.marketId.isZero()) {
      writer2.uint32(32).sint64(message.marketId);
    }
    if (message.exchange !== "") {
      writer2.uint32(42).string(message.exchange);
    }
    if (message.channelId !== 0) {
      writer2.uint32(48).sint32(message.channelId);
    }
    if (message.numberOfDefinitions !== 0) {
      writer2.uint32(56).sint32(message.numberOfDefinitions);
    }
    if (message.subscriptionType !== 0) {
      writer2.uint32(64).int32(message.subscriptionType);
    }
    if (message.unsubscribe === true) {
      writer2.uint32(72).bool(message.unsubscribe);
    }
    if (message.snapshotIntervalSeconds !== 0) {
      writer2.uint32(80).sint32(message.snapshotIntervalSeconds);
    }
    return writer2;
  },
  decode(input, length) {
    const reader2 = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end2 = length === void 0 ? reader2.len : reader2.pos + length;
    const message = createBaseSubscriptionResponse();
    while (reader2.pos < end2) {
      const tag = reader2.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader2.sint64();
          break;
        case 2:
          message.status = Status.decode(reader2, reader2.uint32());
          break;
        case 3:
          message.symbol = reader2.string();
          break;
        case 4:
          message.marketId = reader2.sint64();
          break;
        case 5:
          message.exchange = reader2.string();
          break;
        case 6:
          message.channelId = reader2.sint32();
          break;
        case 7:
          message.numberOfDefinitions = reader2.sint32();
          break;
        case 8:
          message.subscriptionType = reader2.int32();
          break;
        case 9:
          message.unsubscribe = reader2.bool();
          break;
        case 10:
          message.snapshotIntervalSeconds = reader2.sint32();
          break;
        default:
          reader2.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      status: isSet(object.status) ? Status.fromJSON(object.status) : void 0,
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      exchange: isSet(object.exchange) ? String(object.exchange) : "",
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      numberOfDefinitions: isSet(object.numberOfDefinitions) ? Number(object.numberOfDefinitions) : 0,
      subscriptionType: isSet(object.subscriptionType) ? subscriptionTypeFromJSON(object.subscriptionType) : 0,
      unsubscribe: isSet(object.unsubscribe) ? Boolean(object.unsubscribe) : false,
      snapshotIntervalSeconds: isSet(object.snapshotIntervalSeconds) ? Number(object.snapshotIntervalSeconds) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.status !== void 0 && (obj.status = message.status ? Status.toJSON(message.status) : void 0);
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.marketId !== void 0 && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.exchange !== void 0 && (obj.exchange = message.exchange);
    message.channelId !== void 0 && (obj.channelId = Math.round(message.channelId));
    message.numberOfDefinitions !== void 0 && (obj.numberOfDefinitions = Math.round(message.numberOfDefinitions));
    message.subscriptionType !== void 0 && (obj.subscriptionType = subscriptionTypeToJSON(message.subscriptionType));
    message.unsubscribe !== void 0 && (obj.unsubscribe = message.unsubscribe);
    message.snapshotIntervalSeconds !== void 0 && (obj.snapshotIntervalSeconds = Math.round(message.snapshotIntervalSeconds));
    return obj;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g;
    const message = createBaseSubscriptionResponse();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? Long.fromValue(object.correlationId) : Long.ZERO;
    message.status = object.status !== void 0 && object.status !== null ? Status.fromPartial(object.status) : void 0;
    message.symbol = (_a = object.symbol) != null ? _a : "";
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? Long.fromValue(object.marketId) : Long.ZERO;
    message.exchange = (_b = object.exchange) != null ? _b : "";
    message.channelId = (_c = object.channelId) != null ? _c : 0;
    message.numberOfDefinitions = (_d = object.numberOfDefinitions) != null ? _d : 0;
    message.subscriptionType = (_e = object.subscriptionType) != null ? _e : 0;
    message.unsubscribe = (_f = object.unsubscribe) != null ? _f : false;
    message.snapshotIntervalSeconds = (_g = object.snapshotIntervalSeconds) != null ? _g : 0;
    return message;
  }
};
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long;
  _m0.configure();
}
function isSet(value) {
  return value !== null && value !== void 0;
}
class ResolutionSource {
  constructor() {
    __publicField(this, "_whenCompleted");
    __publicField(this, "_resolve", null);
    __publicField(this, "_reject", null);
    __publicField(this, "_completed", false);
    __publicField(this, "onResolve", (result) => {
      var _a;
      this._completed = true;
      (_a = this._resolve) == null ? void 0 : _a.call(this, result);
    });
    __publicField(this, "onError", (error) => {
      var _a;
      this._completed = true;
      (_a = this._reject) == null ? void 0 : _a.call(this, error);
    });
    this._whenCompleted = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }
  get completed() {
    return this._completed;
  }
  get whenCompleted() {
    return this._whenCompleted;
  }
  get resolve() {
    return this.onResolve;
  }
  get reject() {
    return this.onError;
  }
}
const version = "0.0.1";
const send = (socket, message) => {
  socket.send(OpenfeedGatewayRequest.encode(toT(message)).finish());
};
const receive = (msgEvent) => {
  return OpenfeedGatewayMessage.decode(new Uint8Array(msgEvent.data));
};
const _CorrelationId = class {
};
let CorrelationId = _CorrelationId;
__publicField(CorrelationId, "correlationId", Long.fromNumber(-1));
__publicField(CorrelationId, "create", () => _CorrelationId.correlationId.add(1));
class DuplicateLoginError extends Error {
  get name() {
    return this.constructor.name;
  }
}
class InvalidCredentialsError extends Error {
  get name() {
    return this.constructor.name;
  }
}
class ConnectionDisposedError extends Error {
  get name() {
    return this.constructor.name;
  }
}
class OpenFeedConnection {
  constructor(connectionToken, socket, listeners, logger) {
    __publicField(this, "subscriptions", /* @__PURE__ */ new Map());
    __publicField(this, "exchangeRequests", /* @__PURE__ */ new Map());
    __publicField(this, "instrumentRequests", /* @__PURE__ */ new Map());
    __publicField(this, "instrumentReferenceRequests", /* @__PURE__ */ new Map());
    __publicField(this, "whenDisconnectedSource", new ResolutionSource());
    __publicField(this, "messageTriggered", false);
    __publicField(this, "runConnectionWatchLoop", async () => {
      var _a;
      for (; ; ) {
        let timeoutId = null;
        const waitPromise = new Promise((resolve) => {
          timeoutId = setTimeout(resolve, 15e3);
        });
        try {
          await Promise.race([waitPromise, this.whenDisconnectedSource.whenCompleted]);
        } catch {
        }
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (this.whenDisconnectedSource.completed) {
          break;
        }
        if (!this.messageTriggered) {
          (_a = this.logger) == null ? void 0 : _a.warn("Connection silent, disconnecting");
          this.disconnect(new Error("Socket closed: Connection silent"));
          break;
        }
        this.messageTriggered = false;
      }
    });
    __publicField(this, "onMessage", async (event) => {
      var _a, _b, _c, _d;
      try {
        this.messageTriggered = true;
        const message = receive(event);
        if (message.heartBeat) {
          return;
        }
        if (((_b = (_a = message.logoutResponse) == null ? void 0 : _a.status) == null ? void 0 : _b.result) === Result.DUPLICATE_LOGIN) {
          (_c = this.logger) == null ? void 0 : _c.warn("Duplicate login");
          this.disconnect(new DuplicateLoginError("Duplicate login"));
          return;
        }
        if (message.instrumentResponse) {
          const { correlationId } = message.instrumentResponse;
          const request = this.instrumentRequests.get(correlationId.toString());
          if (!request)
            throw new Error(`Instrument request ID ${correlationId} not found`);
          request.resolve(message.instrumentResponse);
          return;
        }
        if (message.instrumentReferenceResponse) {
          const { correlationId } = message.instrumentReferenceResponse;
          const request = this.instrumentReferenceRequests.get(correlationId.toString());
          if (!request)
            throw new Error(`Exchange request ID ${correlationId} not found`);
          request.resolve(message.instrumentReferenceResponse);
          return;
        }
        if (message.exchangeResponse) {
          const { correlationId } = message.exchangeResponse;
          const request = this.exchangeRequests.get(correlationId.toString());
          if (!request)
            throw new Error(`Exchange request ID ${correlationId} not found`);
          request.resolve(message.exchangeResponse);
          return;
        }
        await this.listeners.onMessage(message);
      } catch (error) {
        (_d = this.logger) == null ? void 0 : _d.error(error);
      }
    });
    __publicField(this, "onError", (error) => {
      var _a;
      (_a = this.logger) == null ? void 0 : _a.warn(`Socket error: ${error.message}`);
      this.disconnect(new Error(`Socket error: ${error.message}`));
    });
    __publicField(this, "onClose", (event) => {
      var _a;
      (_a = this.logger) == null ? void 0 : _a.warn(`Socket closed: ${event.reason}`);
      this.disconnect(new Error(`Socket closed: ${event.reason}`));
    });
    __publicField(this, "subscribe", (service2, subscriptionType, snapshotIntervalSeconds, symbols = null, marketIds = null, exchanges = null, channels = null) => {
      if (this.whenDisconnectedSource.completed) {
        throw new ConnectionDisposedError("This connection was closed");
      }
      const correlationId = CorrelationId.create();
      const requests = [];
      const common = {
        subscriptionType: [subscriptionType],
        snapshotIntervalSeconds,
        instrumentType: [],
        bulkSubscriptionFilter: []
      };
      if (symbols) {
        for (const symbol of symbols) {
          const req = {
            symbol,
            ...common
          };
          requests.push(req);
        }
      }
      if (marketIds) {
        for (const marketId of marketIds) {
          const req = {
            marketId,
            ...common
          };
          requests.push(req);
        }
      }
      if (exchanges) {
        for (const exchange of exchanges) {
          const req = {
            exchange,
            ...common
          };
          requests.push(req);
        }
      }
      if (channels) {
        for (const channelId of channels) {
          const req = {
            channelId,
            ...common
          };
          requests.push(req);
        }
      }
      const subscriptionRequest = {
        service: service2,
        correlationId,
        token: this.connectionToken,
        requests: requests.map((r) => toT(r)),
        unsubscribe: false
      };
      this.subscriptions.set(correlationId.toString(), subscriptionRequest);
      send(this.socket, { subscriptionRequest });
      return correlationId;
    });
    __publicField(this, "unsubscribe", (subscriptionId) => {
      if (this.whenDisconnectedSource.completed) {
        throw new ConnectionDisposedError("This connection was closed");
      }
      const subscription = this.subscriptions.get(subscriptionId.toString());
      if (!subscription) {
        throw new Error(`Subscription ID ${subscriptionId} does not exist.`);
      }
      const subscriptionRequest = { ...subscription, unsubscribe: true };
      send(this.socket, { subscriptionRequest });
      this.subscriptions.delete(subscriptionId.toString());
    });
    __publicField(this, "getExchanges", async () => {
      var _a;
      if (this.whenDisconnectedSource.completed) {
        throw new ConnectionDisposedError("This connection was closed");
      }
      const correlationId = CorrelationId.create();
      const source = new ResolutionSource();
      this.exchangeRequests.set(correlationId.toString(), source);
      try {
        const exchangeRequest = {
          correlationId,
          token: this.connectionToken
        };
        send(this.socket, { exchangeRequest });
        const result = await source.whenCompleted;
        return result.exchanges;
      } catch (error) {
        (_a = this.logger) == null ? void 0 : _a.error(error);
        throw error;
      } finally {
        this.exchangeRequests.delete(correlationId.toString());
      }
    });
    __publicField(this, "getInstrument", async (request) => {
      var _a;
      if (this.whenDisconnectedSource.completed) {
        throw new ConnectionDisposedError("This connection was closed");
      }
      const correlationId = CorrelationId.create();
      const source = new ResolutionSource();
      this.instrumentRequests.set(correlationId.toString(), source);
      try {
        const instrumentRequest = toT({ ...request, correlationId, token: this.connectionToken });
        send(this.socket, { instrumentRequest });
        const result = await source.whenCompleted;
        return result;
      } catch (error) {
        (_a = this.logger) == null ? void 0 : _a.error(error);
        throw error;
      } finally {
        this.instrumentRequests.delete(correlationId.toString());
      }
    });
    __publicField(this, "getInstrumentReference", async (request) => {
      var _a;
      if (this.whenDisconnectedSource.completed) {
        throw new ConnectionDisposedError("This connection was closed");
      }
      const correlationId = CorrelationId.create();
      const source = new ResolutionSource();
      this.instrumentReferenceRequests.set(correlationId.toString(), source);
      try {
        const instrumentReferenceRequest = toT({ ...request, correlationId, token: this.connectionToken });
        send(this.socket, { instrumentReferenceRequest });
        const result = await source.whenCompleted;
        return result;
      } catch (error) {
        (_a = this.logger) == null ? void 0 : _a.error(error);
        throw error;
      } finally {
        this.instrumentRequests.delete(correlationId.toString());
      }
    });
    __publicField(this, "whenDisconnected", () => this.whenDisconnectedSource.whenCompleted);
    __publicField(this, "dispose", () => this.disconnect(new ConnectionDisposedError("Disposed")));
    this.connectionToken = connectionToken;
    this.socket = socket;
    this.listeners = listeners;
    this.logger = logger;
    this.socket.onmessage = this.onMessage;
    this.socket.onerror = this.onError;
    this.socket.onclose = this.onClose;
    this.runConnectionWatchLoop();
  }
  disconnect(error) {
    this.socket.onmessage = () => {
    };
    this.socket.onerror = () => {
    };
    this.socket.onclose = () => {
    };
    const cleanRequests = (requests) => {
      for (const [, request] of requests) {
        request.reject(error);
      }
    };
    cleanRequests(this.exchangeRequests);
    cleanRequests(this.instrumentRequests);
    cleanRequests(this.instrumentReferenceRequests);
    this.socket.close(1e3, error.message);
    this.whenDisconnectedSource.reject(error);
  }
}
class OpenFeedClient {
  constructor(url, username, password, listeners, logger, clientId) {
    __publicField(this, "socket", null);
    __publicField(this, "_connection", null);
    __publicField(this, "whenConnectedInternalSource", new ResolutionSource());
    __publicField(this, "whenConnectedSource", new ResolutionSource());
    __publicField(this, "loopResetSource", new ResolutionSource());
    __publicField(this, "subscribeResetSource", new ResolutionSource());
    __publicField(this, "subscriptions", /* @__PURE__ */ new Map());
    __publicField(this, "onOpen", () => {
      var _a;
      if (!this.socket)
        return;
      const clientVersion = `sdk-js:${version};client-id:${(_a = this.clientId) != null ? _a : "default"};platform:${platform.description}`;
      const loginRequest = {
        loginRequest: {
          correlationId: CorrelationId.create(),
          username: this.username,
          password: this.password,
          clientVersion,
          protocolVersion: 0
        }
      };
      send(this.socket, loginRequest);
    });
    __publicField(this, "onMessage", async (event) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const message = receive(event);
      if (((_a = message.loginResponse) == null ? void 0 : _a.token) && this.socket) {
        this._connection = new OpenFeedConnection((_b = message.loginResponse) == null ? void 0 : _b.token, this.socket, this.listeners, this.logger);
        this.whenConnectedInternalSource.resolve(this._connection);
        this.whenConnectedSource.resolve(this._connection);
        await this.listeners.onConnected(this._connection);
        try {
          await this._connection.whenDisconnected();
        } catch (e) {
          if (e instanceof DuplicateLoginError) {
            (_c = this.logger) == null ? void 0 : _c.warn("Received duplicate login message, disconnecting...");
            this.loopResetSource.reject(e);
          }
          if (e instanceof ConnectionDisposedError) {
            (_d = this.logger) == null ? void 0 : _d.warn("Disposing...");
            this.loopResetSource.reject(e);
          }
        } finally {
          await this.listeners.onDisconnected();
          this.loopResetSource.resolve();
        }
      } else if ([Result.INSUFFICIENT_PRIVILEGES, Result.INVALID_CREDENTIALS, Result.AUTHENTICATION_REQUIRED].includes(
        (_g = (_f = (_e = message.loginResponse) == null ? void 0 : _e.status) == null ? void 0 : _f.result) != null ? _g : Result.SUCCESS
      )) {
        (_h = this.logger) == null ? void 0 : _h.warn("Received authentication error, disconnecting...");
        this.whenConnectedInternalSource.reject(
          new InvalidCredentialsError("Invalid credentials provided. Please update credentials and try again.")
        );
      }
    });
    __publicField(this, "onError", (error) => {
      var _a;
      (_a = this.logger) == null ? void 0 : _a.log(`Socket error: ${error.message}`);
      if (!this.whenConnectedInternalSource.completed) {
        this.whenConnectedInternalSource.reject(new Error(`Error when connecting to socket: ${error.message}`));
      }
    });
    __publicField(this, "onClose", (event) => {
      var _a;
      (_a = this.logger) == null ? void 0 : _a.log(`Socket closed: ${event.reason}`);
      if (!this.whenConnectedInternalSource.completed) {
        this.whenConnectedInternalSource.reject(new Error(`Socket closed: ${event.reason}`));
      }
    });
    __publicField(this, "runConnectLoop", async () => {
      var _a, _b;
      for (; ; ) {
        let timeoutId = null;
        if (this.socket) {
          if (this.socket.readyState !== WebSocket$1.CLOSED && this.socket.readyState !== WebSocket$1.CLOSING) {
            this.socket.close(1e3, "Closed from socket loop");
          }
          this.socket = null;
        }
        try {
          this.socket = new WebSocket$1(this.url);
          this.socket.binaryType = "arraybuffer";
          this.socket.onopen = this.onOpen;
          this.socket.onmessage = this.onMessage;
          this.socket.onerror = this.onError;
          this.socket.onclose = this.onClose;
          await this.whenConnectedInternalSource.whenCompleted;
          await this.loopResetSource.whenCompleted;
        } catch (e) {
          const socket = this.socket;
          socket.onerror = () => {
          };
          socket.onclose = () => {
          };
          socket.onopen = () => {
          };
          if (socket.readyState !== WebSocket$1.CLOSED && socket.readyState !== WebSocket$1.CLOSING) {
            socket.close(1e3, "Socket closed");
          }
          if (e instanceof DuplicateLoginError || e instanceof InvalidCredentialsError) {
            (_a = this.logger) == null ? void 0 : _a.warn("Stopping the client because of unrecoverable error");
            await this.listeners.onCredentialsRejected();
            this.cleanUp();
            break;
          }
          if (e instanceof ConnectionDisposedError) {
            (_b = this.logger) == null ? void 0 : _b.warn("Stopping the client because of disposal");
            await this.listeners.onDisconnected();
            this.cleanUp();
            break;
          }
        }
        this._connection = null;
        if (this.whenConnectedInternalSource.completed) {
          this.whenConnectedInternalSource = new ResolutionSource();
        }
        if (this.whenConnectedSource.completed) {
          this.whenConnectedSource = new ResolutionSource();
        }
        this.loopResetSource = new ResolutionSource();
        this.subscribeResetSource.resolve();
        this.subscribeResetSource = new ResolutionSource();
        try {
          await new Promise((resolve) => {
            timeoutId = setTimeout(resolve, 5e3);
          });
        } finally {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        }
      }
    });
    __publicField(this, "cleanUp", () => {
      for (const [, sub] of this.subscriptions) {
        sub.resolve();
      }
      this.subscriptions.clear();
      this.whenConnectedSource.reject(new Error("Connection disposed"));
    });
    __publicField(this, "runSubscribeLoop", async (service2, subscriptionType, snapshotIntervalSeconds, symbols, marketIds, exchanges, channels, cancelSource) => {
      var _a;
      for (; ; ) {
        let timeoutId = null;
        try {
          const connection = await Promise.race([this.connection, cancelSource.whenCompleted]);
          if (cancelSource.completed || !(connection instanceof OpenFeedConnection)) {
            return;
          }
          const subscriptionId = connection.subscribe(
            service2,
            subscriptionType,
            snapshotIntervalSeconds,
            symbols,
            marketIds,
            exchanges,
            channels
          );
          await Promise.race([this.subscribeResetSource.whenCompleted, cancelSource.whenCompleted]);
          if (cancelSource.completed) {
            try {
              connection.unsubscribe(subscriptionId);
            } catch (e) {
            }
            return;
          }
        } catch (error) {
          (_a = this.logger) == null ? void 0 : _a.warn("Subscription error:", error);
          await new Promise((resolve) => {
            timeoutId = setTimeout(resolve, 100);
          });
        } finally {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        }
      }
    });
    __publicField(this, "subscribe", (service2, subscriptionType, snapshotIntervalSeconds, symbols = null, marketIds = null, exchanges = null, channels = null) => {
      const id = CorrelationId.create();
      const cancelSource = new ResolutionSource();
      this.subscriptions.set(id.toString(), cancelSource);
      this.runSubscribeLoop(service2, subscriptionType, snapshotIntervalSeconds, symbols, marketIds, exchanges, channels, cancelSource);
      return id;
    });
    __publicField(this, "unsubscribe", (subscriptionId) => {
      const cancelSource = this.subscriptions.get(subscriptionId.toString());
      if (!cancelSource) {
        throw new Error(`Subscription ID ${subscriptionId} does not exist.`);
      }
      this.subscriptions.delete(subscriptionId.toString());
      cancelSource.resolve();
    });
    __publicField(this, "dispose", () => {
      if (this._connection) {
        this._connection.dispose();
      } else {
        this.whenConnectedInternalSource.reject(new ConnectionDisposedError("Connection disposed"));
      }
    });
    this.url = url;
    this.username = username;
    this.password = password;
    this.listeners = listeners;
    this.logger = logger;
    this.clientId = clientId;
    this.runConnectLoop();
  }
  get connection() {
    if (this._connection)
      return Promise.resolve(this._connection);
    if (this.whenConnectedSource.completed) {
      throw new ConnectionDisposedError("Connection disposed");
    }
    return this.whenConnectedSource.whenCompleted;
  }
}
class OpenFeedListeners {
  constructor() {
    __publicField(this, "instrumentBySymbol", /* @__PURE__ */ new Map());
    __publicField(this, "instrumentByMarketId", /* @__PURE__ */ new Map());
    __publicField(this, "addDetails", (message) => {
      let def;
      let symbols;
      const getInstrumentDefinition = (marketId) => {
        const res = this.instrumentByMarketId.get(marketId.toString());
        return res != null ? res : [void 0, void 0];
      };
      if (message.subscriptionResponse) {
        if (message.subscriptionResponse != null && message.subscriptionResponse.marketId !== Long.ZERO) {
          [def, symbols] = getInstrumentDefinition(message.subscriptionResponse.marketId);
          if (!symbols) {
            symbols = [message.subscriptionResponse.symbol];
          } else if (!symbols.includes(message.subscriptionResponse.symbol)) {
            symbols = [...symbols, message.subscriptionResponse.symbol];
          }
          this.instrumentByMarketId.set(message.subscriptionResponse.marketId.toString(), [def, symbols]);
        }
      }
      if (message.instrumentDefinition) {
        [def, symbols] = getInstrumentDefinition(message.instrumentDefinition.marketId);
        this.instrumentByMarketId.set(message.instrumentDefinition.marketId.toString(), [message.instrumentDefinition, symbols]);
        this.instrumentBySymbol.set(message.instrumentDefinition.symbol, message.instrumentDefinition);
      }
      if (message.marketSnapshot) {
        [def, symbols] = getInstrumentDefinition(message.marketSnapshot.marketId);
      }
      if (message.marketUpdate) {
        [def, symbols] = getInstrumentDefinition(message.marketUpdate.marketId);
      }
      if (message.ohlc) {
        [def, symbols] = getInstrumentDefinition(message.ohlc.marketId);
      }
      return this.onMessageWithMetadata(message, symbols != null ? symbols : [], def);
    });
    __publicField(this, "onConnected", () => {
    });
    __publicField(this, "onCredentialsRejected", () => {
    });
    __publicField(this, "onDisconnected", () => {
    });
    __publicField(this, "onMessage", () => {
    });
    __publicField(this, "onMessageWithMetadata", () => {
    });
    this.onMessage = this.addDetails;
  }
}
export {
  ExchangeResponse_Exchange,
  InstrumentDefinition,
  InstrumentReferenceResponse,
  InstrumentResponse,
  OpenFeedClient,
  OpenFeedListeners,
  OpenfeedGatewayMessage,
  Service,
  SubscriptionType
};
