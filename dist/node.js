import { createRequire } from 'module';const require = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod2) => function __require2() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "node_modules/ws/lib/constants.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
      kListener: Symbol("kListener"),
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      NOOP: () => {
      }
    };
  }
});

// node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "node_modules/ws/lib/buffer-util.js"(exports2, module2) {
    "use strict";
    var { EMPTY_BUFFER } = require_constants();
    function concat(list, totalLength) {
      if (list.length === 0)
        return EMPTY_BUFFER;
      if (list.length === 1)
        return list[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset = 0;
      for (let i = 0; i < list.length; i++) {
        const buf = list[i];
        target.set(buf, offset);
        offset += buf.length;
      }
      if (offset < totalLength)
        return target.slice(0, offset);
      return target;
    }
    function _mask(source, mask, output, offset, length) {
      for (let i = 0; i < length; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
      }
    }
    function _unmask(buffer, mask) {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.byteLength === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data))
        return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    module2.exports = {
      concat,
      mask: _mask,
      toArrayBuffer,
      toBuffer,
      unmask: _unmask
    };
    if (!process.env.WS_NO_BUFFER_UTIL) {
      try {
        const bufferUtil = __require("bufferutil");
        module2.exports.mask = function(source, mask, output, offset, length) {
          if (length < 48)
            _mask(source, mask, output, offset, length);
          else
            bufferUtil.mask(source, mask, output, offset, length);
        };
        module2.exports.unmask = function(buffer, mask) {
          if (buffer.length < 32)
            _unmask(buffer, mask);
          else
            bufferUtil.unmask(buffer, mask);
        };
      } catch (e) {
      }
    }
  }
});

// node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "node_modules/ws/lib/limiter.js"(exports2, module2) {
    "use strict";
    var kDone = Symbol("kDone");
    var kRun = Symbol("kRun");
    var Limiter = class {
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      [kRun]() {
        if (this.pending === this.concurrency)
          return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module2.exports = Limiter;
  }
});

// node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "node_modules/ws/lib/permessage-deflate.js"(exports2, module2) {
    "use strict";
    var zlib = __require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode } = require_constants();
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = Symbol("permessage-deflate");
    var kTotalLength = Symbol("total-length");
    var kCallback = Symbol("callback");
    var kBuffers = Symbol("buffers");
    var kError = Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate = class {
      constructor(options, isServer, maxPayload) {
        this._maxPayload = maxPayload | 0;
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._isServer = !!isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      static get extensionName() {
        return "permessage-deflate";
      }
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(
              new Error(
                "The deflate stream was closed while data was being processed"
              )
            );
          }
        }
      }
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        }
        return params;
      }
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            let value = params[key];
            if (value.length > 1) {
              throw new Error(`Parameter "${key}" must have only a single value`);
            }
            value = value[0];
            if (key === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else if (key === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else {
              throw new Error(`Unknown parameter "${key}"`);
            }
            params[key] = value;
          });
        });
        return configurations;
      }
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin)
          this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          if (fin)
            data2 = data2.slice(0, data2.length - 4);
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module2.exports = PerMessageDeflate;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});

// node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "node_modules/ws/lib/validation.js"(exports2, module2) {
    "use strict";
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
    ];
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i = 0;
      while (i < len) {
        if ((buf[i] & 128) === 0) {
          i++;
        } else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
            return false;
          }
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || buf[i] === 237 && (buf[i + 1] & 224) === 160) {
            return false;
          }
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
            return false;
          }
          i += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    module2.exports = {
      isValidStatusCode,
      isValidUTF8: _isValidUTF8,
      tokenChars
    };
    if (!process.env.WS_NO_UTF_8_VALIDATE) {
      try {
        const isValidUTF8 = __require("utf-8-validate");
        module2.exports.isValidUTF8 = function(buf) {
          return buf.length < 150 ? _isValidUTF8(buf) : isValidUTF8(buf);
        };
      } catch (e) {
      }
    }
  }
});

// node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "node_modules/ws/lib/receiver.js"(exports2, module2) {
    "use strict";
    var { Writable } = __require("stream");
    var PerMessageDeflate = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var Receiver = class extends Writable {
      constructor(options = {}) {
        super();
        this._binaryType = options.binaryType || BINARY_TYPES[0];
        this._extensions = options.extensions || {};
        this._isServer = !!options.isServer;
        this._maxPayload = options.maxPayload | 0;
        this._skipUTF8Validation = !!options.skipUTF8Validation;
        this[kWebSocket] = void 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._state = GET_INFO;
        this._loop = false;
      }
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO)
          return cb();
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length)
          return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = buf.slice(n);
          return buf.slice(0, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = buf.slice(n);
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      startLoop(cb) {
        let err;
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              err = this.getInfo();
              break;
            case GET_PAYLOAD_LENGTH_16:
              err = this.getPayloadLength16();
              break;
            case GET_PAYLOAD_LENGTH_64:
              err = this.getPayloadLength64();
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              err = this.getData(cb);
              break;
            default:
              this._loop = false;
              return;
          }
        } while (this._loop);
        cb(err);
      }
      getInfo() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          this._loop = false;
          return error(
            RangeError,
            "RSV2 and RSV3 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3"
          );
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
          this._loop = false;
          return error(
            RangeError,
            "RSV1 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            this._loop = false;
            return error(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
          }
          if (!this._fragmented) {
            this._loop = false;
            return error(
              RangeError,
              "invalid opcode 0",
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            this._loop = false;
            return error(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            this._loop = false;
            return error(
              RangeError,
              "FIN must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_FIN"
            );
          }
          if (compressed) {
            this._loop = false;
            return error(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
          }
          if (this._payloadLength > 125) {
            this._loop = false;
            return error(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
          }
        } else {
          this._loop = false;
          return error(
            RangeError,
            `invalid opcode ${this._opcode}`,
            true,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
        }
        if (!this._fin && !this._fragmented)
          this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            this._loop = false;
            return error(
              RangeError,
              "MASK must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_MASK"
            );
          }
        } else if (this._masked) {
          this._loop = false;
          return error(
            RangeError,
            "MASK must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_MASK"
          );
        }
        if (this._payloadLength === 126)
          this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127)
          this._state = GET_PAYLOAD_LENGTH_64;
        else
          return this.haveLength();
      }
      getPayloadLength16() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        return this.haveLength();
      }
      getPayloadLength64() {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          this._loop = false;
          return error(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            false,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
          );
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        return this.haveLength();
      }
      haveLength() {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            this._loop = false;
            return error(
              RangeError,
              "Max payload size exceeded",
              false,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
          }
        }
        if (this._masked)
          this._state = GET_MASK;
        else
          this._state = GET_DATA;
      }
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
            unmask(data, this._mask);
          }
        }
        if (this._opcode > 7)
          return this.controlMessage(data);
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        return this.dataMessage();
      }
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err)
            return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              return cb(
                error(
                  RangeError,
                  "Max payload size exceeded",
                  false,
                  1009,
                  "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
                )
              );
            }
            this._fragments.push(buf);
          }
          const er = this.dataMessage();
          if (er)
            return cb(er);
          this.startLoop(cb);
        });
      }
      dataMessage() {
        if (this._fin) {
          const messageLength = this._messageLength;
          const fragments = this._fragments;
          this._totalPayloadLength = 0;
          this._messageLength = 0;
          this._fragmented = 0;
          this._fragments = [];
          if (this._opcode === 2) {
            let data;
            if (this._binaryType === "nodebuffer") {
              data = concat(fragments, messageLength);
            } else if (this._binaryType === "arraybuffer") {
              data = toArrayBuffer(concat(fragments, messageLength));
            } else {
              data = fragments;
            }
            this.emit("message", data, true);
          } else {
            const buf = concat(fragments, messageLength);
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              this._loop = false;
              return error(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
            }
            this.emit("message", buf, false);
          }
        }
        this._state = GET_INFO;
      }
      controlMessage(data) {
        if (this._opcode === 8) {
          this._loop = false;
          if (data.length === 0) {
            this.emit("conclude", 1005, EMPTY_BUFFER);
            this.end();
          } else if (data.length === 1) {
            return error(
              RangeError,
              "invalid payload length 1",
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              return error(
                RangeError,
                `invalid status code ${code}`,
                true,
                1002,
                "WS_ERR_INVALID_CLOSE_CODE"
              );
            }
            const buf = data.slice(2);
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              return error(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
            }
            this.emit("conclude", code, buf);
            this.end();
          }
        } else if (this._opcode === 9) {
          this.emit("ping", data);
        } else {
          this.emit("pong", data);
        }
        this._state = GET_INFO;
      }
    };
    module2.exports = Receiver;
    function error(ErrorCtor, message, prefix, statusCode, errorCode) {
      const err = new ErrorCtor(
        prefix ? `Invalid WebSocket frame: ${message}` : message
      );
      Error.captureStackTrace(err, error);
      err.code = errorCode;
      err[kStatusCode] = statusCode;
      return err;
    }
  }
});

// node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "node_modules/ws/lib/sender.js"(exports2, module2) {
    "use strict";
    var net = __require("net");
    var tls = __require("tls");
    var { randomFillSync } = __require("crypto");
    var PerMessageDeflate = require_permessage_deflate();
    var { EMPTY_BUFFER } = require_constants();
    var { isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var kByteLength = Symbol("kByteLength");
    var maskBuffer = Buffer.alloc(4);
    var Sender = class {
      constructor(socket, extensions, generateMask) {
        this._extensions = extensions || {};
        if (generateMask) {
          this._generateMask = generateMask;
          this._maskBuffer = Buffer.alloc(4);
        }
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._deflating = false;
        this._queue = [];
      }
      static frame(data, options) {
        let mask;
        let merge = false;
        let offset = 2;
        let skipMasking = false;
        if (options.mask) {
          mask = options.maskBuffer || maskBuffer;
          if (options.generateMask) {
            options.generateMask(mask);
          } else {
            randomFillSync(mask, 0, 4);
          }
          skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
          offset = 6;
        }
        let dataLength;
        if (typeof data === "string") {
          if ((!options.mask || skipMasking) && options[kByteLength] !== void 0) {
            dataLength = options[kByteLength];
          } else {
            data = Buffer.from(data);
            dataLength = data.length;
          }
        } else {
          dataLength = data.length;
          merge = options.mask && options.readOnly && !skipMasking;
        }
        let payloadLength = dataLength;
        if (dataLength >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (dataLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1)
          target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(dataLength, 2);
        } else if (payloadLength === 127) {
          target[2] = target[3] = 0;
          target.writeUIntBE(dataLength, 4, 6);
        }
        if (!options.mask)
          return [target, data];
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (skipMasking)
          return [target, data];
        if (merge) {
          applyMask(data, mask, target, offset, dataLength);
          return [target];
        }
        applyMask(data, mask, data, 0, dataLength);
        return [target, data];
      }
      close(code, data, mask, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || !data.length) {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length = Buffer.byteLength(data);
          if (length > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length);
          buf.writeUInt16BE(code, 0);
          if (typeof data === "string") {
            buf.write(data, 2);
          } else {
            buf.set(data, 2);
          }
        }
        const options = {
          [kByteLength]: buf.length,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: false,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, buf, false, options, cb]);
        } else {
          this.sendFrame(Sender.frame(buf, options), cb);
        }
      }
      ping(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(Sender.frame(data, options), cb);
        }
      }
      pong(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(Sender.frame(data, options), cb);
        }
      }
      send(data, options, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
            rsv1 = byteLength >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin)
          this._firstFragment = true;
        if (perMessageDeflate) {
          const opts = {
            [kByteLength]: byteLength,
            fin: options.fin,
            generateMask: this._generateMask,
            mask: options.mask,
            maskBuffer: this._maskBuffer,
            opcode,
            readOnly,
            rsv1
          };
          if (this._deflating) {
            this.enqueue([this.dispatch, data, this._compress, opts, cb]);
          } else {
            this.dispatch(data, this._compress, opts, cb);
          }
        } else {
          this.sendFrame(
            Sender.frame(data, {
              [kByteLength]: byteLength,
              fin: options.fin,
              generateMask: this._generateMask,
              mask: options.mask,
              maskBuffer: this._maskBuffer,
              opcode,
              readOnly,
              rsv1: false
            }),
            cb
          );
        }
      }
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(Sender.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        this._bufferedBytes += options[kByteLength];
        this._deflating = true;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while data was being compressed"
            );
            if (typeof cb === "function")
              cb(err);
            for (let i = 0; i < this._queue.length; i++) {
              const params = this._queue[i];
              const callback = params[params.length - 1];
              if (typeof callback === "function")
                callback(err);
            }
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          this._deflating = false;
          options.readOnly = false;
          this.sendFrame(Sender.frame(buf, options), cb);
          this.dequeue();
        });
      }
      dequeue() {
        while (!this._deflating && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[3][kByteLength];
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      enqueue(params) {
        this._bufferedBytes += params[3][kByteLength];
        this._queue.push(params);
      }
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    module2.exports = Sender;
  }
});

// node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "node_modules/ws/lib/event-target.js"(exports2, module2) {
    "use strict";
    var { kForOnEventAttribute, kListener } = require_constants();
    var kCode = Symbol("kCode");
    var kData = Symbol("kData");
    var kError = Symbol("kError");
    var kMessage = Symbol("kMessage");
    var kReason = Symbol("kReason");
    var kTarget = Symbol("kTarget");
    var kType = Symbol("kType");
    var kWasClean = Symbol("kWasClean");
    var Event = class {
      constructor(type) {
        this[kTarget] = null;
        this[kType] = type;
      }
      get target() {
        return this[kTarget];
      }
      get type() {
        return this[kType];
      }
    };
    Object.defineProperty(Event.prototype, "target", { enumerable: true });
    Object.defineProperty(Event.prototype, "type", { enumerable: true });
    var CloseEvent = class extends Event {
      constructor(type, options = {}) {
        super(type);
        this[kCode] = options.code === void 0 ? 0 : options.code;
        this[kReason] = options.reason === void 0 ? "" : options.reason;
        this[kWasClean] = options.wasClean === void 0 ? false : options.wasClean;
      }
      get code() {
        return this[kCode];
      }
      get reason() {
        return this[kReason];
      }
      get wasClean() {
        return this[kWasClean];
      }
    };
    Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });
    var ErrorEvent = class extends Event {
      constructor(type, options = {}) {
        super(type);
        this[kError] = options.error === void 0 ? null : options.error;
        this[kMessage] = options.message === void 0 ? "" : options.message;
      }
      get error() {
        return this[kError];
      }
      get message() {
        return this[kMessage];
      }
    };
    Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
    Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });
    var MessageEvent = class extends Event {
      constructor(type, options = {}) {
        super(type);
        this[kData] = options.data === void 0 ? null : options.data;
      }
      get data() {
        return this[kData];
      }
    };
    Object.defineProperty(MessageEvent.prototype, "data", { enumerable: true });
    var EventTarget = {
      addEventListener(type, listener, options = {}) {
        let wrapper;
        if (type === "message") {
          wrapper = function onMessage(data, isBinary) {
            const event = new MessageEvent("message", {
              data: isBinary ? data : data.toString()
            });
            event[kTarget] = this;
            listener.call(this, event);
          };
        } else if (type === "close") {
          wrapper = function onClose(code, message) {
            const event = new CloseEvent("close", {
              code,
              reason: message.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            event[kTarget] = this;
            listener.call(this, event);
          };
        } else if (type === "error") {
          wrapper = function onError(error) {
            const event = new ErrorEvent("error", {
              error,
              message: error.message
            });
            event[kTarget] = this;
            listener.call(this, event);
          };
        } else if (type === "open") {
          wrapper = function onOpen() {
            const event = new Event("open");
            event[kTarget] = this;
            listener.call(this, event);
          };
        } else {
          return;
        }
        wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
        wrapper[kListener] = listener;
        if (options.once) {
          this.once(type, wrapper);
        } else {
          this.on(type, wrapper);
        }
      },
      removeEventListener(type, handler) {
        for (const listener of this.listeners(type)) {
          if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            this.removeListener(type, listener);
            break;
          }
        }
      }
    };
    module2.exports = {
      CloseEvent,
      ErrorEvent,
      Event,
      EventTarget,
      MessageEvent
    };
  }
});

// node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "node_modules/ws/lib/extension.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function push(dest, name, elem) {
      if (dest[name] === void 0)
        dest[name] = [elem];
      else
        dest[name].push(elem);
    }
    function parse(header) {
      const offers = /* @__PURE__ */ Object.create(null);
      let params = /* @__PURE__ */ Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let code = -1;
      let end = -1;
      let i = 0;
      for (; i < header.length; i++) {
        code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (i !== 0 && (code === 32 || code === 9)) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            const name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = /* @__PURE__ */ Object.create(null);
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1)
              start = i;
            else if (!mustUnescape)
              mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1)
                start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes || code === 32 || code === 9) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1)
        end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension) => {
        let configurations = extensions[extension];
        if (!Array.isArray(configurations))
          configurations = [configurations];
        return configurations.map((params) => {
          return [extension].concat(
            Object.keys(params).map((k) => {
              let values = params[k];
              if (!Array.isArray(values))
                values = [values];
              return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
            })
          ).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module2.exports = { format, parse };
  }
});

// node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "node_modules/ws/lib/websocket.js"(exports2, module2) {
    "use strict";
    var EventEmitter = __require("events");
    var https = __require("https");
    var http = __require("http");
    var net = __require("net");
    var tls = __require("tls");
    var { randomBytes, createHash } = __require("crypto");
    var { Readable } = __require("stream");
    var { URL } = __require("url");
    var PerMessageDeflate = require_permessage_deflate();
    var Receiver = require_receiver();
    var Sender = require_sender();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      GUID,
      kForOnEventAttribute,
      kListener,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var {
      EventTarget: { addEventListener, removeEventListener }
    } = require_event_target();
    var { format, parse } = require_extension();
    var { toBuffer } = require_buffer_util();
    var closeTimeout = 30 * 1e3;
    var kAborted = Symbol("kAborted");
    var protocolVersions = [8, 13];
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
    var WebSocket2 = class extends EventEmitter {
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = EMPTY_BUFFER;
        this._closeTimer = null;
        this._extensions = {};
        this._paused = false;
        this._protocol = "";
        this._readyState = WebSocket2.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (protocols === void 0) {
            protocols = [];
          } else if (!Array.isArray(protocols)) {
            if (typeof protocols === "object" && protocols !== null) {
              options = protocols;
              protocols = [];
            } else {
              protocols = [protocols];
            }
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._isServer = true;
        }
      }
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type))
          return;
        this._binaryType = type;
        if (this._receiver)
          this._receiver._binaryType = type;
      }
      get bufferedAmount() {
        if (!this._socket)
          return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      get isPaused() {
        return this._paused;
      }
      get onclose() {
        return null;
      }
      get onerror() {
        return null;
      }
      get onopen() {
        return null;
      }
      get onmessage() {
        return null;
      }
      get protocol() {
        return this._protocol;
      }
      get readyState() {
        return this._readyState;
      }
      get url() {
        return this._url;
      }
      setSocket(socket, head, options) {
        const receiver = new Receiver({
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxPayload: options.maxPayload,
          skipUTF8Validation: options.skipUTF8Validation
        });
        this._sender = new Sender(socket, this._extensions, options.generateMask);
        this._receiver = receiver;
        this._socket = socket;
        receiver[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        socket.setTimeout(0);
        socket.setNoDelay();
        if (head.length > 0)
          socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = WebSocket2.OPEN;
        this.emit("open");
      }
      emitClose() {
        if (!this._socket) {
          this._readyState = WebSocket2.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate.extensionName]) {
          this._extensions[PerMessageDeflate.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = WebSocket2.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      close(code, data) {
        if (this.readyState === WebSocket2.CLOSED)
          return;
        if (this.readyState === WebSocket2.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this.readyState === WebSocket2.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._readyState = WebSocket2.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err)
            return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        this._closeTimer = setTimeout(
          this._socket.destroy.bind(this._socket),
          closeTimeout
        );
      }
      pause() {
        if (this.readyState === WebSocket2.CONNECTING || this.readyState === WebSocket2.CLOSED) {
          return;
        }
        this._paused = true;
        this._socket.pause();
      }
      ping(data, mask, cb) {
        if (this.readyState === WebSocket2.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket2.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      pong(data, mask, cb) {
        if (this.readyState === WebSocket2.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket2.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      resume() {
        if (this.readyState === WebSocket2.CONNECTING || this.readyState === WebSocket2.CLOSED) {
          return;
        }
        this._paused = false;
        if (!this._receiver._writableState.needDrain)
          this._socket.resume();
      }
      send(data, options, cb) {
        if (this.readyState === WebSocket2.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket2.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options
        };
        if (!this._extensions[PerMessageDeflate.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      terminate() {
        if (this.readyState === WebSocket2.CLOSED)
          return;
        if (this.readyState === WebSocket2.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this._socket) {
          this._readyState = WebSocket2.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket2, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket2.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket2.prototype, `on${method}`, {
        enumerable: true,
        get() {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute])
              return listener[kListener];
          }
          return null;
        },
        set(handler) {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) {
              this.removeListener(method, listener);
              break;
            }
          }
          if (typeof handler !== "function")
            return;
          this.addEventListener(method, handler, {
            [kForOnEventAttribute]: true
          });
        }
      });
    });
    WebSocket2.prototype.addEventListener = addEventListener;
    WebSocket2.prototype.removeEventListener = removeEventListener;
    module2.exports = WebSocket2;
    function initAsClient(websocket, address, protocols, options) {
      const opts = {
        protocolVersion: protocolVersions[1],
        maxPayload: 100 * 1024 * 1024,
        skipUTF8Validation: false,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10,
        ...options,
        createConnection: void 0,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: "GET",
        host: void 0,
        path: void 0,
        port: void 0
      };
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(
          `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
        );
      }
      let parsedUrl;
      if (address instanceof URL) {
        parsedUrl = address;
        websocket._url = address.href;
      } else {
        try {
          parsedUrl = new URL(address);
        } catch (e) {
          throw new SyntaxError(`Invalid URL: ${address}`);
        }
        websocket._url = address;
      }
      const isSecure = parsedUrl.protocol === "wss:";
      const isUnixSocket = parsedUrl.protocol === "ws+unix:";
      let invalidURLMessage;
      if (parsedUrl.protocol !== "ws:" && !isSecure && !isUnixSocket) {
        invalidURLMessage = `The URL's protocol must be one of "ws:", "wss:", or "ws+unix:"`;
      } else if (isUnixSocket && !parsedUrl.pathname) {
        invalidURLMessage = "The URL's pathname is empty";
      } else if (parsedUrl.hash) {
        invalidURLMessage = "The URL contains a fragment identifier";
      }
      if (invalidURLMessage) {
        const err = new SyntaxError(invalidURLMessage);
        if (websocket._redirects === 0) {
          throw err;
        } else {
          emitErrorAndClose(websocket, err);
          return;
        }
      }
      const defaultPort = isSecure ? 443 : 80;
      const key = randomBytes(16).toString("base64");
      const request = isSecure ? https.request : http.request;
      const protocolSet = /* @__PURE__ */ new Set();
      let perMessageDeflate;
      opts.createConnection = isSecure ? tlsConnect : netConnect;
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = {
        ...opts.headers,
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key,
        Connection: "Upgrade",
        Upgrade: "websocket"
      };
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate(
          opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
          false,
          opts.maxPayload
        );
        opts.headers["Sec-WebSocket-Extensions"] = format({
          [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols.length) {
        for (const protocol of protocols) {
          if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
            throw new SyntaxError(
              "An invalid or duplicated subprotocol was specified"
            );
          }
          protocolSet.add(protocol);
        }
        opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isUnixSocket) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      let req;
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalUnixSocket = isUnixSocket;
          websocket._originalSecure = isSecure;
          websocket._originalHostOrSocketPath = isUnixSocket ? opts.socketPath : parsedUrl.host;
          const headers = options && options.headers;
          options = { ...options, headers: {} };
          if (headers) {
            for (const [key2, value] of Object.entries(headers)) {
              options.headers[key2.toLowerCase()] = value;
            }
          }
        } else if (websocket.listenerCount("redirect") === 0) {
          const isSameHost = isUnixSocket ? websocket._originalUnixSocket ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalUnixSocket ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
          if (!isSameHost || websocket._originalSecure && !isSecure) {
            delete opts.headers.authorization;
            delete opts.headers.cookie;
            if (!isSameHost)
              delete opts.headers.host;
            opts.auth = void 0;
          }
        }
        if (opts.auth && !options.headers.authorization) {
          options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
        }
        req = websocket._req = request(opts);
        if (websocket._redirects) {
          websocket.emit("redirect", websocket.url, req);
        }
      } else {
        req = websocket._req = request(opts);
      }
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req[kAborted])
          return;
        req = websocket._req = null;
        emitErrorAndClose(websocket, err);
      });
      req.on("response", (res) => {
        const location = res.headers.location;
        const statusCode = res.statusCode;
        if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL(location, address);
          } catch (e) {
            const err = new SyntaxError(`Invalid URL: ${location}`);
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(
            websocket,
            req,
            `Unexpected server response: ${res.statusCode}`
          );
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket2.CONNECTING)
          return;
        req = websocket._req = null;
        if (res.headers.upgrade.toLowerCase() !== "websocket") {
          abortHandshake(websocket, socket, "Invalid Upgrade header");
          return;
        }
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        let protError;
        if (serverProt !== void 0) {
          if (!protocolSet.size) {
            protError = "Server sent a subprotocol but none was requested";
          } else if (!protocolSet.has(serverProt)) {
            protError = "Server sent an invalid subprotocol";
          }
        } else if (protocolSet.size) {
          protError = "Server sent no subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt)
          websocket._protocol = serverProt;
        const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          let extensions;
          try {
            extensions = parse(secWebSocketExtensions);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          const extensionNames = Object.keys(extensions);
          if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate.extensionName) {
            const message = "Server indicated an extension that was not requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          try {
            perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
        websocket.setSocket(socket, head, {
          generateMask: opts.generateMask,
          maxPayload: opts.maxPayload,
          skipUTF8Validation: opts.skipUTF8Validation
        });
      });
      req.end();
    }
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket2.CLOSING;
      websocket.emit("error", err);
      websocket.emitClose();
    }
    function netConnect(options) {
      options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      if (!options.servername && options.servername !== "") {
        options.servername = net.isIP(options.host) ? "" : options.host;
      }
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket2.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream[kAborted] = true;
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        process.nextTick(emitErrorAndClose, websocket, err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length = toBuffer(data).length;
        if (websocket._socket)
          websocket._sender._bufferedBytes += length;
        else
          websocket._bufferedAmount += length;
      }
      if (cb) {
        const err = new Error(
          `WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`
        );
        cb(err);
      }
    }
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (websocket._socket[kWebSocket] === void 0)
        return;
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      if (code === 1005)
        websocket.close();
      else
        websocket.close(code, reason);
    }
    function receiverOnDrain() {
      const websocket = this[kWebSocket];
      if (!websocket.isPaused)
        websocket._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket._socket[kWebSocket] !== void 0) {
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        websocket.close(err[kStatusCode]);
      }
      websocket.emit("error", err);
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data, isBinary) {
      this[kWebSocket].emit("message", data, isBinary);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      websocket.pong(data, !websocket._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function resume(stream) {
      stream.resume();
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("data", socketOnData);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket2.CLOSING;
      let chunk;
      if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && (chunk = websocket._socket.read()) !== null) {
        websocket._receiver.write(chunk);
      }
      websocket._receiver.end();
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket2.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket2.CLOSING;
        this.destroy();
      }
    }
  }
});

// node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "node_modules/ws/lib/stream.js"(exports2, module2) {
    "use strict";
    var { Duplex } = __require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    function createWebSocketStream(ws, options) {
      let terminateOnDestroy = true;
      const duplex = new Duplex({
        ...options,
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      });
      ws.on("message", function message(msg, isBinary) {
        const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
        if (!duplex.push(data))
          ws.pause();
      });
      ws.once("error", function error(err) {
        if (duplex.destroyed)
          return;
        terminateOnDestroy = false;
        duplex.destroy(err);
      });
      ws.once("close", function close() {
        if (duplex.destroyed)
          return;
        duplex.push(null);
      });
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", function error(err2) {
          called = true;
          callback(err2);
        });
        ws.once("close", function close() {
          if (!called)
            callback(err);
          process.nextTick(emitClose, duplex);
        });
        if (terminateOnDestroy)
          ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._final(callback);
          });
          return;
        }
        if (ws._socket === null)
          return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted)
            duplex.destroy();
        } else {
          ws._socket.once("finish", function finish() {
            callback();
          });
          ws.close();
        }
      };
      duplex._read = function() {
        if (ws.isPaused)
          ws.resume();
      };
      duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    module2.exports = createWebSocketStream;
  }
});

// node_modules/ws/lib/subprotocol.js
var require_subprotocol = __commonJS({
  "node_modules/ws/lib/subprotocol.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function parse(header) {
      const protocols = /* @__PURE__ */ new Set();
      let start = -1;
      let end = -1;
      let i = 0;
      for (i; i < header.length; i++) {
        const code = header.charCodeAt(i);
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1)
            start = i;
        } else if (i !== 0 && (code === 32 || code === 9)) {
          if (end === -1 && start !== -1)
            end = i;
        } else if (code === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1)
            end = i;
          const protocol2 = header.slice(start, end);
          if (protocols.has(protocol2)) {
            throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
          }
          protocols.add(protocol2);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
      if (start === -1 || end !== -1) {
        throw new SyntaxError("Unexpected end of input");
      }
      const protocol = header.slice(start, i);
      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }
      protocols.add(protocol);
      return protocols;
    }
    module2.exports = { parse };
  }
});

// node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "node_modules/ws/lib/websocket-server.js"(exports2, module2) {
    "use strict";
    var EventEmitter = __require("events");
    var http = __require("http");
    var https = __require("https");
    var net = __require("net");
    var tls = __require("tls");
    var { createHash } = __require("crypto");
    var extension = require_extension();
    var PerMessageDeflate = require_permessage_deflate();
    var subprotocol = require_subprotocol();
    var WebSocket2 = require_websocket();
    var { GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var RUNNING = 0;
    var CLOSING = 1;
    var CLOSED = 2;
    var WebSocketServer = class extends EventEmitter {
      constructor(options, callback) {
        super();
        options = {
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          verifyClient: null,
          noServer: false,
          backlog: null,
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket: WebSocket2,
          ...options
        };
        if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        }
        if (options.port != null) {
          this._server = http.createServer((req, res) => {
            const body = http.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(
            options.port,
            options.host,
            options.backlog,
            callback
          );
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true)
          options.perMessageDeflate = {};
        if (options.clientTracking) {
          this.clients = /* @__PURE__ */ new Set();
          this._shouldEmitClose = false;
        }
        this.options = options;
        this._state = RUNNING;
      }
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server)
          return null;
        return this._server.address();
      }
      close(cb) {
        if (this._state === CLOSED) {
          if (cb) {
            this.once("close", () => {
              cb(new Error("The server is not running"));
            });
          }
          process.nextTick(emitClose, this);
          return;
        }
        if (cb)
          this.once("close", cb);
        if (this._state === CLOSING)
          return;
        this._state = CLOSING;
        if (this.options.noServer || this.options.server) {
          if (this._server) {
            this._removeListeners();
            this._removeListeners = this._server = null;
          }
          if (this.clients) {
            if (!this.clients.size) {
              process.nextTick(emitClose, this);
            } else {
              this._shouldEmitClose = true;
            }
          } else {
            process.nextTick(emitClose, this);
          }
        } else {
          const server = this._server;
          this._removeListeners();
          this._removeListeners = this._server = null;
          server.close(() => {
            emitClose(this);
          });
        }
      }
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path)
            return false;
        }
        return true;
      }
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key = req.headers["sec-websocket-key"];
        const version2 = +req.headers["sec-websocket-version"];
        if (req.method !== "GET") {
          const message = "Invalid HTTP method";
          abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
          return;
        }
        if (req.headers.upgrade.toLowerCase() !== "websocket") {
          const message = "Invalid Upgrade header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (!key || !keyRegex.test(key)) {
          const message = "Missing or invalid Sec-WebSocket-Key header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (version2 !== 8 && version2 !== 13) {
          const message = "Missing or invalid Sec-WebSocket-Version header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (!this.shouldHandle(req)) {
          abortHandshake(socket, 400);
          return;
        }
        const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
        let protocols = /* @__PURE__ */ new Set();
        if (secWebSocketProtocol !== void 0) {
          try {
            protocols = subprotocol.parse(secWebSocketProtocol);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Protocol header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
        const extensions = {};
        if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
          const perMessageDeflate = new PerMessageDeflate(
            this.options.perMessageDeflate,
            true,
            this.options.maxPayload
          );
          try {
            const offers = extension.parse(secWebSocketExtensions);
            if (offers[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
              extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version2 === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(
                extensions,
                key,
                protocols,
                req,
                socket,
                head,
                cb
              );
            });
            return;
          }
          if (!this.options.verifyClient(info))
            return abortHandshake(socket, 401);
        }
        this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
      }
      completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
        if (!socket.readable || !socket.writable)
          return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        }
        if (this._state > RUNNING)
          return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new this.options.WebSocket(null);
        if (protocols.size) {
          const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate.extensionName]) {
          const params = extensions[PerMessageDeflate.extensionName].params;
          const value = extension.format({
            [PerMessageDeflate.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, {
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        });
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => {
            this.clients.delete(ws);
            if (this._shouldEmitClose && !this.clients.size) {
              process.nextTick(emitClose, this);
            }
          });
        }
        cb(ws, req);
      }
    };
    module2.exports = WebSocketServer;
    function addListeners(server, map) {
      for (const event of Object.keys(map))
        server.on(event, map[event]);
      return function removeListeners() {
        for (const event of Object.keys(map)) {
          server.removeListener(event, map[event]);
        }
      };
    }
    function emitClose(server) {
      server._state = CLOSED;
      server.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      message = message || http.STATUS_CODES[code];
      headers = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(message),
        ...headers
      };
      socket.once("finish", socket.destroy);
      socket.end(
        `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
      );
    }
    function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
      if (server.listenerCount("wsClientError")) {
        const err = new Error(message);
        Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
        server.emit("wsClientError", err, socket, req);
      } else {
        abortHandshake(socket, code, message);
      }
    }
  }
});

// node_modules/ws/index.js
var require_ws = __commonJS({
  "node_modules/ws/index.js"(exports2, module2) {
    "use strict";
    var WebSocket2 = require_websocket();
    WebSocket2.createWebSocketStream = require_stream();
    WebSocket2.Server = require_websocket_server();
    WebSocket2.Receiver = require_receiver();
    WebSocket2.Sender = require_sender();
    WebSocket2.WebSocket = WebSocket2;
    WebSocket2.WebSocketServer = WebSocket2.Server;
    module2.exports = WebSocket2;
  }
});

// node_modules/isomorphic-ws/node.js
var require_node = __commonJS({
  "node_modules/isomorphic-ws/node.js"(exports2, module2) {
    "use strict";
    module2.exports = require_ws();
  }
});

// node_modules/platform/platform.js
var require_platform = __commonJS({
  "node_modules/platform/platform.js"(exports2, module2) {
    (function() {
      "use strict";
      var objectTypes = {
        "function": true,
        "object": true
      };
      var root = objectTypes[typeof window] && window || this;
      var oldRoot = root;
      var freeExports = objectTypes[typeof exports2] && exports2;
      var freeModule = objectTypes[typeof module2] && module2 && !module2.nodeType && module2;
      var freeGlobal = freeExports && freeModule && typeof global == "object" && global;
      if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
        root = freeGlobal;
      }
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var reOpera = /\bOpera/;
      var thisBinding = this;
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
        var isModuleScope = isCustomContext || thisBinding == oldRoot;
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
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root.platform = platform2;
        define(function() {
          return platform2;
        });
      } else if (freeExports && freeModule) {
        forOwn(platform2, function(value, key) {
          freeExports[key] = value;
        });
      } else {
        root.platform = platform2;
      }
    }).call(exports2);
  }
});

// node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = asPromise;
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
  }
});

// node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base64 = exports2;
    base64.length = function length(string) {
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
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base64.encode = function encode(buffer, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
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
    base64.decode = function decode(string, buffer, offset) {
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
    base64.test = function test(string) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
    };
  }
});

// node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    module2.exports = EventEmitter;
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
  }
});

// node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    module2.exports = factory(factory);
    function factory(exports3) {
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
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
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
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
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
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
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
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
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
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
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
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports3;
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
  }
});

// node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
  }
});

// node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf8 = exports2;
    utf8.length = function utf8_length(string) {
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
    utf8.read = function utf8_read(buffer, start, end) {
      var len = end - start;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start < end) {
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
    utf8.write = function utf8_write(string, buffer, offset) {
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
  }
});

// node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    module2.exports = pool;
    function pool(alloc, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc(size2);
        if (offset + size2 > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      };
    }
  }
});

// node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = function fromNumber2(value) {
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
      return new LongBits(lo, hi);
    };
    LongBits.from = function from(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long)
          value = util.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber2(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits(
        (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
        (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
      );
    };
    LongBits.prototype.toHash = function toHash() {
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
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
  }
});

// node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util = exports2;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.inquire = require_inquire();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
    util.emptyArray = Object.freeze ? Object.freeze([]) : [];
    util.emptyObject = Object.freeze ? Object.freeze({}) : {};
    util.isInteger = Number.isInteger || function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util.isset = util.isSet = function isSet4(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util.Buffer = function() {
      try {
        var Buffer2 = util.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : null;
      } catch (e) {
        return null;
      }
    }();
    util._Buffer_from = null;
    util._Buffer_allocUnsafe = null;
    util.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long = util.global.dcodeIO && util.global.dcodeIO.Long || util.global.Long || util.inquire("long");
    util.key2Re = /^true|false|0|1$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    };
    util.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src, ifNotSet) {
      for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src[keys[i]];
      return dst;
    }
    util.merge = merge;
    util.lcFirst = function lcFirst(str) {
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
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util._configure = function() {
      var Buffer2 = util.Buffer;
      if (!Buffer2) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
      }
      util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  }
});

// node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer;
    var util = require_minimal();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base64 = util.base64;
    var utf8 = util.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    function noop() {
    }
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer();
      };
    };
    Writer.create = create();
    Writer.alloc = function alloc(size) {
      return new util.Array(size);
    };
    if (util.Array !== Array)
      Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    Writer.prototype._push = function push(fn, len, val) {
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
    Writer.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
        value
      )).len;
      return this;
    };
    Writer.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer.prototype.sint32 = function write_sint32(value) {
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
    Writer.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    };
    Writer.prototype.double = function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer.prototype.reset = function reset() {
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
    Writer.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create();
      BufferWriter._configure();
    };
  }
});

// node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer = require_writer();
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
    var util = require_minimal();
    function BufferWriter() {
      Writer.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
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
      if (util.isString(value))
        value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});

// node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader;
    var util = require_minimal();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf8 = util.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    function Reader(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    } : function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    };
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer2) {
          return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        })(buffer);
      } : create_array;
    };
    Reader.create = create();
    Reader.prototype._slice = util.Array.prototype.subarray || util.Array.prototype.slice;
    Reader.prototype.uint32 = function read_uint32_setup() {
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
    Reader.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader.prototype.sint32 = function read_sint32() {
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
    Reader.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader.prototype.bytes = function read_bytes() {
      var length = this.uint32(), start = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos += length;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      return start === end ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
    };
    Reader.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader.prototype.skip = function skip(length) {
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
    Reader.prototype.skipType = function(wireType) {
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
    Reader._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create();
      BufferReader._configure();
      var fn = util.Long ? "toLong" : "toNumber";
      util.merge(Reader.prototype, {
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
  }
});

// node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader = require_reader();
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
    var util = require_minimal();
    function BufferReader(buffer) {
      Reader.call(this, buffer);
    }
    BufferReader._configure = function() {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});

// node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service3;
    var util = require_minimal();
    (Service3.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service3;
    function Service3(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service3.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
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
    Service3.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
  }
});

// node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf = exports2;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure;
    function configure() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    configure();
  }
});

// node_modules/protobufjs/minimal.js
var require_minimal2 = __commonJS({
  "node_modules/protobufjs/minimal.js"(exports2, module2) {
    "use strict";
    module2.exports = require_index_minimal();
  }
});

// src/connection/connection.ts
var import_isomorphic_ws = __toESM(require_node(), 1);

// node_modules/long/index.js
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
var long_default = Long;

// src/connection/connection.ts
var import_platform = __toESM(require_platform(), 1);

// src/utilities/messages.ts
var toT = (obj) => obj;

// generated/openfeed_api.ts
var import_minimal3 = __toESM(require_minimal2(), 1);

// generated/openfeed.ts
var import_minimal2 = __toESM(require_minimal2(), 1);

// generated/openfeed_instrument.ts
var import_minimal = __toESM(require_minimal2(), 1);
function instrumentDefinition_InstrumentTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_INSTRUMENT_TYPE":
      return 0 /* UNKNOWN_INSTRUMENT_TYPE */;
    case 1:
    case "FOREX":
      return 1 /* FOREX */;
    case 2:
    case "INDEX":
      return 2 /* INDEX */;
    case 3:
    case "EQUITY":
      return 3 /* EQUITY */;
    case 4:
    case "FUTURE":
      return 4 /* FUTURE */;
    case 5:
    case "OPTION":
      return 5 /* OPTION */;
    case 6:
    case "SPREAD":
      return 6 /* SPREAD */;
    case 7:
    case "MUTUAL_FUND":
      return 7 /* MUTUAL_FUND */;
    case 8:
    case "MONEY_MARKET_FUND":
      return 8 /* MONEY_MARKET_FUND */;
    case 9:
    case "USER_DEFINED_SPREAD":
      return 9 /* USER_DEFINED_SPREAD */;
    case 10:
    case "EQUITY_OPTION":
      return 10 /* EQUITY_OPTION */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function instrumentDefinition_InstrumentTypeToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_INSTRUMENT_TYPE */:
      return "UNKNOWN_INSTRUMENT_TYPE";
    case 1 /* FOREX */:
      return "FOREX";
    case 2 /* INDEX */:
      return "INDEX";
    case 3 /* EQUITY */:
      return "EQUITY";
    case 4 /* FUTURE */:
      return "FUTURE";
    case 5 /* OPTION */:
      return "OPTION";
    case 6 /* SPREAD */:
      return "SPREAD";
    case 7 /* MUTUAL_FUND */:
      return "MUTUAL_FUND";
    case 8 /* MONEY_MARKET_FUND */:
      return "MONEY_MARKET_FUND";
    case 9 /* USER_DEFINED_SPREAD */:
      return "USER_DEFINED_SPREAD";
    case 10 /* EQUITY_OPTION */:
      return "EQUITY_OPTION";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentDefinition_BookTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_BOOK_TYPE":
      return 0 /* UNKNOWN_BOOK_TYPE */;
    case 1:
    case "TOP_OF_BOOK":
      return 1 /* TOP_OF_BOOK */;
    case 2:
    case "PRICE_LEVEL_DEPTH":
      return 2 /* PRICE_LEVEL_DEPTH */;
    case 3:
    case "ORDER_DEPTH":
      return 3 /* ORDER_DEPTH */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function instrumentDefinition_BookTypeToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_BOOK_TYPE */:
      return "UNKNOWN_BOOK_TYPE";
    case 1 /* TOP_OF_BOOK */:
      return "TOP_OF_BOOK";
    case 2 /* PRICE_LEVEL_DEPTH */:
      return "PRICE_LEVEL_DEPTH";
    case 3 /* ORDER_DEPTH */:
      return "ORDER_DEPTH";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentDefinition_OptionTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_OPTION_TYPE":
      return 0 /* UNKNOWN_OPTION_TYPE */;
    case 1:
    case "CALL":
      return 1 /* CALL */;
    case 2:
    case "PUT":
      return 2 /* PUT */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function instrumentDefinition_OptionTypeToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_OPTION_TYPE */:
      return "UNKNOWN_OPTION_TYPE";
    case 1 /* CALL */:
      return "CALL";
    case 2 /* PUT */:
      return "PUT";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentDefinition_OptionStyleFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_OPTIONS_STYLE":
      return 0 /* UNKNOWN_OPTIONS_STYLE */;
    case 1:
    case "DEFAULT":
      return 1 /* DEFAULT */;
    case 2:
    case "AMERICAN":
      return 2 /* AMERICAN */;
    case 3:
    case "EUROPEAN":
      return 3 /* EUROPEAN */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function instrumentDefinition_OptionStyleToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_OPTIONS_STYLE */:
      return "UNKNOWN_OPTIONS_STYLE";
    case 1 /* DEFAULT */:
      return "DEFAULT";
    case 2 /* AMERICAN */:
      return "AMERICAN";
    case 3 /* EUROPEAN */:
      return "EUROPEAN";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentDefinition_StateFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_STATE":
      return 0 /* UNKNOWN_STATE */;
    case 1:
    case "ACTIVE":
      return 1 /* ACTIVE */;
    case 2:
    case "PASSIVE":
      return 2 /* PASSIVE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function instrumentDefinition_StateToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_STATE */:
      return "UNKNOWN_STATE";
    case 1 /* ACTIVE */:
      return "ACTIVE";
    case 2 /* PASSIVE */:
      return "PASSIVE";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentDefinition_EventTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_EVENT_TYPE":
      return 0 /* UNKNOWN_EVENT_TYPE */;
    case 1:
    case "FIRST_TRADE_DATE":
      return 1 /* FIRST_TRADE_DATE */;
    case 2:
    case "LAST_TRADE_DATE":
      return 2 /* LAST_TRADE_DATE */;
    case 10:
    case "MATURITY_DATE":
      return 10 /* MATURITY_DATE */;
    case 11:
    case "FIRST_DELIVERY_DATE":
      return 11 /* FIRST_DELIVERY_DATE */;
    case 12:
    case "LAST_DELIVERY_DATE":
      return 12 /* LAST_DELIVERY_DATE */;
    case 13:
    case "FIRST_NOTICE_DATE":
      return 13 /* FIRST_NOTICE_DATE */;
    case 14:
    case "LAST_NOTICE_DATE":
      return 14 /* LAST_NOTICE_DATE */;
    case 15:
    case "FIRST_HOLDING_DATE":
      return 15 /* FIRST_HOLDING_DATE */;
    case 16:
    case "LAST_HOLDING_DATE":
      return 16 /* LAST_HOLDING_DATE */;
    case 17:
    case "FIRST_POSITION_DATE":
      return 17 /* FIRST_POSITION_DATE */;
    case 18:
    case "LAST_POSITION_DATE":
      return 18 /* LAST_POSITION_DATE */;
    case 30:
    case "DELIVERY_START_DATE":
      return 30 /* DELIVERY_START_DATE */;
    case 31:
    case "DELIVERY_END_DATE":
      return 31 /* DELIVERY_END_DATE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function instrumentDefinition_EventTypeToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_EVENT_TYPE */:
      return "UNKNOWN_EVENT_TYPE";
    case 1 /* FIRST_TRADE_DATE */:
      return "FIRST_TRADE_DATE";
    case 2 /* LAST_TRADE_DATE */:
      return "LAST_TRADE_DATE";
    case 10 /* MATURITY_DATE */:
      return "MATURITY_DATE";
    case 11 /* FIRST_DELIVERY_DATE */:
      return "FIRST_DELIVERY_DATE";
    case 12 /* LAST_DELIVERY_DATE */:
      return "LAST_DELIVERY_DATE";
    case 13 /* FIRST_NOTICE_DATE */:
      return "FIRST_NOTICE_DATE";
    case 14 /* LAST_NOTICE_DATE */:
      return "LAST_NOTICE_DATE";
    case 15 /* FIRST_HOLDING_DATE */:
      return "FIRST_HOLDING_DATE";
    case 16 /* LAST_HOLDING_DATE */:
      return "LAST_HOLDING_DATE";
    case 17 /* FIRST_POSITION_DATE */:
      return "FIRST_POSITION_DATE";
    case 18 /* LAST_POSITION_DATE */:
      return "LAST_POSITION_DATE";
    case 30 /* DELIVERY_START_DATE */:
      return "DELIVERY_START_DATE";
    case 31 /* DELIVERY_END_DATE */:
      return "DELIVERY_END_DATE";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentDefinition_PriceFormat_SubFormatFromJSON(object) {
  switch (object) {
    case 0:
    case "FLAT":
      return 0 /* FLAT */;
    case 1:
    case "FRACTIONAL":
      return 1 /* FRACTIONAL */;
    case 2:
    case "DECIMAL":
      return 2 /* DECIMAL */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function instrumentDefinition_PriceFormat_SubFormatToJSON(object) {
  switch (object) {
    case 0 /* FLAT */:
      return "FLAT";
    case 1 /* FRACTIONAL */:
      return "FRACTIONAL";
    case 2 /* DECIMAL */:
      return "DECIMAL";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseInstrumentDefinition() {
  return {
    marketId: long_default.ZERO,
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
    recordCreateTime: long_default.ZERO,
    recordUpdateTime: long_default.ZERO,
    timeZoneName: "",
    instrumentGroup: "",
    symbolExpiration: void 0,
    state: 0,
    channel: 0,
    underlyingMarketId: long_default.ZERO,
    priceFormat: void 0,
    optionStrikePriceFormat: void 0,
    priceDenominator: 0,
    quantityDenominator: 0,
    isTradable: false,
    transactionTime: long_default.ZERO,
    auxiliaryData: new Uint8Array(),
    symbols: [],
    optionStrike: long_default.ZERO,
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
var InstrumentDefinition = {
  encode(message, writer = import_minimal.default.Writer.create()) {
    if (!message.marketId.isZero()) {
      writer.uint32(8).sint64(message.marketId);
    }
    if (message.instrumentType !== 0) {
      writer.uint32(16).int32(message.instrumentType);
    }
    writer.uint32(26).fork();
    for (const v of message.supportBookTypes) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.bookDepth !== 0) {
      writer.uint32(32).sint32(message.bookDepth);
    }
    if (message.vendorId !== "") {
      writer.uint32(42).string(message.vendorId);
    }
    if (message.symbol !== "") {
      writer.uint32(50).string(message.symbol);
    }
    if (message.description !== "") {
      writer.uint32(58).string(message.description);
    }
    if (message.cfiCode !== "") {
      writer.uint32(66).string(message.cfiCode);
    }
    if (message.currencyCode !== "") {
      writer.uint32(74).string(message.currencyCode);
    }
    if (message.exchangeCode !== "") {
      writer.uint32(82).string(message.exchangeCode);
    }
    if (message.minimumPriceIncrement !== 0) {
      writer.uint32(93).float(message.minimumPriceIncrement);
    }
    if (message.contractPointValue !== 0) {
      writer.uint32(101).float(message.contractPointValue);
    }
    if (message.schedule !== void 0) {
      InstrumentDefinition_Schedule.encode(message.schedule, writer.uint32(106).fork()).ldelim();
    }
    if (message.calendar !== void 0) {
      InstrumentDefinition_Calendar.encode(message.calendar, writer.uint32(114).fork()).ldelim();
    }
    if (!message.recordCreateTime.isZero()) {
      writer.uint32(120).sint64(message.recordCreateTime);
    }
    if (!message.recordUpdateTime.isZero()) {
      writer.uint32(128).sint64(message.recordUpdateTime);
    }
    if (message.timeZoneName !== "") {
      writer.uint32(138).string(message.timeZoneName);
    }
    if (message.instrumentGroup !== "") {
      writer.uint32(146).string(message.instrumentGroup);
    }
    if (message.symbolExpiration !== void 0) {
      InstrumentDefinition_MaturityDate.encode(message.symbolExpiration, writer.uint32(154).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(160).int32(message.state);
    }
    if (message.channel !== 0) {
      writer.uint32(168).sint32(message.channel);
    }
    if (!message.underlyingMarketId.isZero()) {
      writer.uint32(176).sint64(message.underlyingMarketId);
    }
    if (message.priceFormat !== void 0) {
      InstrumentDefinition_PriceFormat.encode(message.priceFormat, writer.uint32(186).fork()).ldelim();
    }
    if (message.optionStrikePriceFormat !== void 0) {
      InstrumentDefinition_PriceFormat.encode(message.optionStrikePriceFormat, writer.uint32(194).fork()).ldelim();
    }
    if (message.priceDenominator !== 0) {
      writer.uint32(224).sint32(message.priceDenominator);
    }
    if (message.quantityDenominator !== 0) {
      writer.uint32(232).sint32(message.quantityDenominator);
    }
    if (message.isTradable === true) {
      writer.uint32(240).bool(message.isTradable);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(400).sint64(message.transactionTime);
    }
    if (message.auxiliaryData.length !== 0) {
      writer.uint32(794).bytes(message.auxiliaryData);
    }
    for (const v of message.symbols) {
      InstrumentDefinition_Symbol.encode(v, writer.uint32(802).fork()).ldelim();
    }
    if (!message.optionStrike.isZero()) {
      writer.uint32(1600).sint64(message.optionStrike);
    }
    if (message.optionType !== 0) {
      writer.uint32(1616).int32(message.optionType);
    }
    if (message.optionStyle !== 0) {
      writer.uint32(1624).int32(message.optionStyle);
    }
    if (message.optionStrikeDenominator !== 0) {
      writer.uint32(1632).sint32(message.optionStrikeDenominator);
    }
    if (message.spreadCode !== "") {
      writer.uint32(1682).string(message.spreadCode);
    }
    for (const v of message.spreadLeg) {
      InstrumentDefinition_SpreadLeg.encode(v, writer.uint32(1690).fork()).ldelim();
    }
    if (message.userDefinedSpread === true) {
      writer.uint32(1696).bool(message.userDefinedSpread);
    }
    if (message.marketTier !== "") {
      writer.uint32(1706).string(message.marketTier);
    }
    if (message.financialStatusIndicator !== "") {
      writer.uint32(1714).string(message.financialStatusIndicator);
    }
    if (message.isin !== "") {
      writer.uint32(1722).string(message.isin);
    }
    if (message.currencyPair !== void 0) {
      InstrumentDefinition_CurrencyPair.encode(message.currencyPair, writer.uint32(1730).fork()).ldelim();
    }
    if (message.exchangeSendsVolume === true) {
      writer.uint32(1736).bool(message.exchangeSendsVolume);
    }
    if (message.exchangeSendsHigh === true) {
      writer.uint32(1744).bool(message.exchangeSendsHigh);
    }
    if (message.exchangeSendsLow === true) {
      writer.uint32(1752).bool(message.exchangeSendsLow);
    }
    if (message.exchangeSendsOpen === true) {
      writer.uint32(1760).bool(message.exchangeSendsOpen);
    }
    if (message.consolidatedFeedInstrument === true) {
      writer.uint32(1768).bool(message.consolidatedFeedInstrument);
    }
    if (message.openOutcryInstrument === true) {
      writer.uint32(1776).bool(message.openOutcryInstrument);
    }
    if (message.syntheticAmericanOptionInstrument === true) {
      writer.uint32(1784).bool(message.syntheticAmericanOptionInstrument);
    }
    if (message.barchartExchangeCode !== "") {
      writer.uint32(1794).string(message.barchartExchangeCode);
    }
    if (message.barchartBaseCode !== "") {
      writer.uint32(1802).string(message.barchartBaseCode);
    }
    if (message.volumeDenominator !== 0) {
      writer.uint32(1808).sint32(message.volumeDenominator);
    }
    if (message.bidOfferQuantityDenominator !== 0) {
      writer.uint32(1816).sint32(message.bidOfferQuantityDenominator);
    }
    if (message.primaryListingMarketParticipantId !== "") {
      writer.uint32(1826).string(message.primaryListingMarketParticipantId);
    }
    if (message.subscriptionSymbol !== "") {
      writer.uint32(1834).string(message.subscriptionSymbol);
    }
    if (message.contractMaturity !== void 0) {
      InstrumentDefinition_MaturityDate.encode(message.contractMaturity, writer.uint32(1842).fork()).ldelim();
    }
    if (message.underlying !== "") {
      writer.uint32(1850).string(message.underlying);
    }
    if (message.commodity !== "") {
      writer.uint32(1858).string(message.commodity);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.default.Reader ? input : new import_minimal.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.sint64();
          break;
        case 2:
          message.instrumentType = reader.int32();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.supportBookTypes.push(reader.int32());
            }
          } else {
            message.supportBookTypes.push(reader.int32());
          }
          break;
        case 4:
          message.bookDepth = reader.sint32();
          break;
        case 5:
          message.vendorId = reader.string();
          break;
        case 6:
          message.symbol = reader.string();
          break;
        case 7:
          message.description = reader.string();
          break;
        case 8:
          message.cfiCode = reader.string();
          break;
        case 9:
          message.currencyCode = reader.string();
          break;
        case 10:
          message.exchangeCode = reader.string();
          break;
        case 11:
          message.minimumPriceIncrement = reader.float();
          break;
        case 12:
          message.contractPointValue = reader.float();
          break;
        case 13:
          message.schedule = InstrumentDefinition_Schedule.decode(reader, reader.uint32());
          break;
        case 14:
          message.calendar = InstrumentDefinition_Calendar.decode(reader, reader.uint32());
          break;
        case 15:
          message.recordCreateTime = reader.sint64();
          break;
        case 16:
          message.recordUpdateTime = reader.sint64();
          break;
        case 17:
          message.timeZoneName = reader.string();
          break;
        case 18:
          message.instrumentGroup = reader.string();
          break;
        case 19:
          message.symbolExpiration = InstrumentDefinition_MaturityDate.decode(reader, reader.uint32());
          break;
        case 20:
          message.state = reader.int32();
          break;
        case 21:
          message.channel = reader.sint32();
          break;
        case 22:
          message.underlyingMarketId = reader.sint64();
          break;
        case 23:
          message.priceFormat = InstrumentDefinition_PriceFormat.decode(reader, reader.uint32());
          break;
        case 24:
          message.optionStrikePriceFormat = InstrumentDefinition_PriceFormat.decode(reader, reader.uint32());
          break;
        case 28:
          message.priceDenominator = reader.sint32();
          break;
        case 29:
          message.quantityDenominator = reader.sint32();
          break;
        case 30:
          message.isTradable = reader.bool();
          break;
        case 50:
          message.transactionTime = reader.sint64();
          break;
        case 99:
          message.auxiliaryData = reader.bytes();
          break;
        case 100:
          message.symbols.push(InstrumentDefinition_Symbol.decode(reader, reader.uint32()));
          break;
        case 200:
          message.optionStrike = reader.sint64();
          break;
        case 202:
          message.optionType = reader.int32();
          break;
        case 203:
          message.optionStyle = reader.int32();
          break;
        case 204:
          message.optionStrikeDenominator = reader.sint32();
          break;
        case 210:
          message.spreadCode = reader.string();
          break;
        case 211:
          message.spreadLeg.push(InstrumentDefinition_SpreadLeg.decode(reader, reader.uint32()));
          break;
        case 212:
          message.userDefinedSpread = reader.bool();
          break;
        case 213:
          message.marketTier = reader.string();
          break;
        case 214:
          message.financialStatusIndicator = reader.string();
          break;
        case 215:
          message.isin = reader.string();
          break;
        case 216:
          message.currencyPair = InstrumentDefinition_CurrencyPair.decode(reader, reader.uint32());
          break;
        case 217:
          message.exchangeSendsVolume = reader.bool();
          break;
        case 218:
          message.exchangeSendsHigh = reader.bool();
          break;
        case 219:
          message.exchangeSendsLow = reader.bool();
          break;
        case 220:
          message.exchangeSendsOpen = reader.bool();
          break;
        case 221:
          message.consolidatedFeedInstrument = reader.bool();
          break;
        case 222:
          message.openOutcryInstrument = reader.bool();
          break;
        case 223:
          message.syntheticAmericanOptionInstrument = reader.bool();
          break;
        case 224:
          message.barchartExchangeCode = reader.string();
          break;
        case 225:
          message.barchartBaseCode = reader.string();
          break;
        case 226:
          message.volumeDenominator = reader.sint32();
          break;
        case 227:
          message.bidOfferQuantityDenominator = reader.sint32();
          break;
        case 228:
          message.primaryListingMarketParticipantId = reader.string();
          break;
        case 229:
          message.subscriptionSymbol = reader.string();
          break;
        case 230:
          message.contractMaturity = InstrumentDefinition_MaturityDate.decode(reader, reader.uint32());
          break;
        case 231:
          message.underlying = reader.string();
          break;
        case 232:
          message.commodity = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      marketId: isSet(object.marketId) ? long_default.fromValue(object.marketId) : long_default.ZERO,
      instrumentType: isSet(object.instrumentType) ? instrumentDefinition_InstrumentTypeFromJSON(object.instrumentType) : 0,
      supportBookTypes: Array.isArray(object == null ? void 0 : object.supportBookTypes) ? object.supportBookTypes.map((e) => instrumentDefinition_BookTypeFromJSON(e)) : [],
      bookDepth: isSet(object.bookDepth) ? Number(object.bookDepth) : 0,
      vendorId: isSet(object.vendorId) ? String(object.vendorId) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      description: isSet(object.description) ? String(object.description) : "",
      cfiCode: isSet(object.cfiCode) ? String(object.cfiCode) : "",
      currencyCode: isSet(object.currencyCode) ? String(object.currencyCode) : "",
      exchangeCode: isSet(object.exchangeCode) ? String(object.exchangeCode) : "",
      minimumPriceIncrement: isSet(object.minimumPriceIncrement) ? Number(object.minimumPriceIncrement) : 0,
      contractPointValue: isSet(object.contractPointValue) ? Number(object.contractPointValue) : 0,
      schedule: isSet(object.schedule) ? InstrumentDefinition_Schedule.fromJSON(object.schedule) : void 0,
      calendar: isSet(object.calendar) ? InstrumentDefinition_Calendar.fromJSON(object.calendar) : void 0,
      recordCreateTime: isSet(object.recordCreateTime) ? long_default.fromValue(object.recordCreateTime) : long_default.ZERO,
      recordUpdateTime: isSet(object.recordUpdateTime) ? long_default.fromValue(object.recordUpdateTime) : long_default.ZERO,
      timeZoneName: isSet(object.timeZoneName) ? String(object.timeZoneName) : "",
      instrumentGroup: isSet(object.instrumentGroup) ? String(object.instrumentGroup) : "",
      symbolExpiration: isSet(object.symbolExpiration) ? InstrumentDefinition_MaturityDate.fromJSON(object.symbolExpiration) : void 0,
      state: isSet(object.state) ? instrumentDefinition_StateFromJSON(object.state) : 0,
      channel: isSet(object.channel) ? Number(object.channel) : 0,
      underlyingMarketId: isSet(object.underlyingMarketId) ? long_default.fromValue(object.underlyingMarketId) : long_default.ZERO,
      priceFormat: isSet(object.priceFormat) ? InstrumentDefinition_PriceFormat.fromJSON(object.priceFormat) : void 0,
      optionStrikePriceFormat: isSet(object.optionStrikePriceFormat) ? InstrumentDefinition_PriceFormat.fromJSON(object.optionStrikePriceFormat) : void 0,
      priceDenominator: isSet(object.priceDenominator) ? Number(object.priceDenominator) : 0,
      quantityDenominator: isSet(object.quantityDenominator) ? Number(object.quantityDenominator) : 0,
      isTradable: isSet(object.isTradable) ? Boolean(object.isTradable) : false,
      transactionTime: isSet(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      auxiliaryData: isSet(object.auxiliaryData) ? bytesFromBase64(object.auxiliaryData) : new Uint8Array(),
      symbols: Array.isArray(object == null ? void 0 : object.symbols) ? object.symbols.map((e) => InstrumentDefinition_Symbol.fromJSON(e)) : [],
      optionStrike: isSet(object.optionStrike) ? long_default.fromValue(object.optionStrike) : long_default.ZERO,
      optionType: isSet(object.optionType) ? instrumentDefinition_OptionTypeFromJSON(object.optionType) : 0,
      optionStyle: isSet(object.optionStyle) ? instrumentDefinition_OptionStyleFromJSON(object.optionStyle) : 0,
      optionStrikeDenominator: isSet(object.optionStrikeDenominator) ? Number(object.optionStrikeDenominator) : 0,
      spreadCode: isSet(object.spreadCode) ? String(object.spreadCode) : "",
      spreadLeg: Array.isArray(object == null ? void 0 : object.spreadLeg) ? object.spreadLeg.map((e) => InstrumentDefinition_SpreadLeg.fromJSON(e)) : [],
      userDefinedSpread: isSet(object.userDefinedSpread) ? Boolean(object.userDefinedSpread) : false,
      marketTier: isSet(object.marketTier) ? String(object.marketTier) : "",
      financialStatusIndicator: isSet(object.financialStatusIndicator) ? String(object.financialStatusIndicator) : "",
      isin: isSet(object.isin) ? String(object.isin) : "",
      currencyPair: isSet(object.currencyPair) ? InstrumentDefinition_CurrencyPair.fromJSON(object.currencyPair) : void 0,
      exchangeSendsVolume: isSet(object.exchangeSendsVolume) ? Boolean(object.exchangeSendsVolume) : false,
      exchangeSendsHigh: isSet(object.exchangeSendsHigh) ? Boolean(object.exchangeSendsHigh) : false,
      exchangeSendsLow: isSet(object.exchangeSendsLow) ? Boolean(object.exchangeSendsLow) : false,
      exchangeSendsOpen: isSet(object.exchangeSendsOpen) ? Boolean(object.exchangeSendsOpen) : false,
      consolidatedFeedInstrument: isSet(object.consolidatedFeedInstrument) ? Boolean(object.consolidatedFeedInstrument) : false,
      openOutcryInstrument: isSet(object.openOutcryInstrument) ? Boolean(object.openOutcryInstrument) : false,
      syntheticAmericanOptionInstrument: isSet(object.syntheticAmericanOptionInstrument) ? Boolean(object.syntheticAmericanOptionInstrument) : false,
      barchartExchangeCode: isSet(object.barchartExchangeCode) ? String(object.barchartExchangeCode) : "",
      barchartBaseCode: isSet(object.barchartBaseCode) ? String(object.barchartBaseCode) : "",
      volumeDenominator: isSet(object.volumeDenominator) ? Number(object.volumeDenominator) : 0,
      bidOfferQuantityDenominator: isSet(object.bidOfferQuantityDenominator) ? Number(object.bidOfferQuantityDenominator) : 0,
      primaryListingMarketParticipantId: isSet(object.primaryListingMarketParticipantId) ? String(object.primaryListingMarketParticipantId) : "",
      subscriptionSymbol: isSet(object.subscriptionSymbol) ? String(object.subscriptionSymbol) : "",
      contractMaturity: isSet(object.contractMaturity) ? InstrumentDefinition_MaturityDate.fromJSON(object.contractMaturity) : void 0,
      underlying: isSet(object.underlying) ? String(object.underlying) : "",
      commodity: isSet(object.commodity) ? String(object.commodity) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.marketId !== void 0 && (obj.marketId = (message.marketId || long_default.ZERO).toString());
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
    message.recordCreateTime !== void 0 && (obj.recordCreateTime = (message.recordCreateTime || long_default.ZERO).toString());
    message.recordUpdateTime !== void 0 && (obj.recordUpdateTime = (message.recordUpdateTime || long_default.ZERO).toString());
    message.timeZoneName !== void 0 && (obj.timeZoneName = message.timeZoneName);
    message.instrumentGroup !== void 0 && (obj.instrumentGroup = message.instrumentGroup);
    message.symbolExpiration !== void 0 && (obj.symbolExpiration = message.symbolExpiration ? InstrumentDefinition_MaturityDate.toJSON(message.symbolExpiration) : void 0);
    message.state !== void 0 && (obj.state = instrumentDefinition_StateToJSON(message.state));
    message.channel !== void 0 && (obj.channel = Math.round(message.channel));
    message.underlyingMarketId !== void 0 && (obj.underlyingMarketId = (message.underlyingMarketId || long_default.ZERO).toString());
    message.priceFormat !== void 0 && (obj.priceFormat = message.priceFormat ? InstrumentDefinition_PriceFormat.toJSON(message.priceFormat) : void 0);
    message.optionStrikePriceFormat !== void 0 && (obj.optionStrikePriceFormat = message.optionStrikePriceFormat ? InstrumentDefinition_PriceFormat.toJSON(message.optionStrikePriceFormat) : void 0);
    message.priceDenominator !== void 0 && (obj.priceDenominator = Math.round(message.priceDenominator));
    message.quantityDenominator !== void 0 && (obj.quantityDenominator = Math.round(message.quantityDenominator));
    message.isTradable !== void 0 && (obj.isTradable = message.isTradable);
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.auxiliaryData !== void 0 && (obj.auxiliaryData = base64FromBytes(
      message.auxiliaryData !== void 0 ? message.auxiliaryData : new Uint8Array()
    ));
    if (message.symbols) {
      obj.symbols = message.symbols.map((e) => e ? InstrumentDefinition_Symbol.toJSON(e) : void 0);
    } else {
      obj.symbols = [];
    }
    message.optionStrike !== void 0 && (obj.optionStrike = (message.optionStrike || long_default.ZERO).toString());
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
    var _a, _b, _c;
    const message = createBaseInstrumentDefinition();
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? long_default.fromValue(object.marketId) : long_default.ZERO;
    message.instrumentType = object.instrumentType ?? 0;
    message.supportBookTypes = ((_a = object.supportBookTypes) == null ? void 0 : _a.map((e) => e)) || [];
    message.bookDepth = object.bookDepth ?? 0;
    message.vendorId = object.vendorId ?? "";
    message.symbol = object.symbol ?? "";
    message.description = object.description ?? "";
    message.cfiCode = object.cfiCode ?? "";
    message.currencyCode = object.currencyCode ?? "";
    message.exchangeCode = object.exchangeCode ?? "";
    message.minimumPriceIncrement = object.minimumPriceIncrement ?? 0;
    message.contractPointValue = object.contractPointValue ?? 0;
    message.schedule = object.schedule !== void 0 && object.schedule !== null ? InstrumentDefinition_Schedule.fromPartial(object.schedule) : void 0;
    message.calendar = object.calendar !== void 0 && object.calendar !== null ? InstrumentDefinition_Calendar.fromPartial(object.calendar) : void 0;
    message.recordCreateTime = object.recordCreateTime !== void 0 && object.recordCreateTime !== null ? long_default.fromValue(object.recordCreateTime) : long_default.ZERO;
    message.recordUpdateTime = object.recordUpdateTime !== void 0 && object.recordUpdateTime !== null ? long_default.fromValue(object.recordUpdateTime) : long_default.ZERO;
    message.timeZoneName = object.timeZoneName ?? "";
    message.instrumentGroup = object.instrumentGroup ?? "";
    message.symbolExpiration = object.symbolExpiration !== void 0 && object.symbolExpiration !== null ? InstrumentDefinition_MaturityDate.fromPartial(object.symbolExpiration) : void 0;
    message.state = object.state ?? 0;
    message.channel = object.channel ?? 0;
    message.underlyingMarketId = object.underlyingMarketId !== void 0 && object.underlyingMarketId !== null ? long_default.fromValue(object.underlyingMarketId) : long_default.ZERO;
    message.priceFormat = object.priceFormat !== void 0 && object.priceFormat !== null ? InstrumentDefinition_PriceFormat.fromPartial(object.priceFormat) : void 0;
    message.optionStrikePriceFormat = object.optionStrikePriceFormat !== void 0 && object.optionStrikePriceFormat !== null ? InstrumentDefinition_PriceFormat.fromPartial(object.optionStrikePriceFormat) : void 0;
    message.priceDenominator = object.priceDenominator ?? 0;
    message.quantityDenominator = object.quantityDenominator ?? 0;
    message.isTradable = object.isTradable ?? false;
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.auxiliaryData = object.auxiliaryData ?? new Uint8Array();
    message.symbols = ((_b = object.symbols) == null ? void 0 : _b.map((e) => InstrumentDefinition_Symbol.fromPartial(e))) || [];
    message.optionStrike = object.optionStrike !== void 0 && object.optionStrike !== null ? long_default.fromValue(object.optionStrike) : long_default.ZERO;
    message.optionType = object.optionType ?? 0;
    message.optionStyle = object.optionStyle ?? 0;
    message.optionStrikeDenominator = object.optionStrikeDenominator ?? 0;
    message.spreadCode = object.spreadCode ?? "";
    message.spreadLeg = ((_c = object.spreadLeg) == null ? void 0 : _c.map((e) => InstrumentDefinition_SpreadLeg.fromPartial(e))) || [];
    message.userDefinedSpread = object.userDefinedSpread ?? false;
    message.marketTier = object.marketTier ?? "";
    message.financialStatusIndicator = object.financialStatusIndicator ?? "";
    message.isin = object.isin ?? "";
    message.currencyPair = object.currencyPair !== void 0 && object.currencyPair !== null ? InstrumentDefinition_CurrencyPair.fromPartial(object.currencyPair) : void 0;
    message.exchangeSendsVolume = object.exchangeSendsVolume ?? false;
    message.exchangeSendsHigh = object.exchangeSendsHigh ?? false;
    message.exchangeSendsLow = object.exchangeSendsLow ?? false;
    message.exchangeSendsOpen = object.exchangeSendsOpen ?? false;
    message.consolidatedFeedInstrument = object.consolidatedFeedInstrument ?? false;
    message.openOutcryInstrument = object.openOutcryInstrument ?? false;
    message.syntheticAmericanOptionInstrument = object.syntheticAmericanOptionInstrument ?? false;
    message.barchartExchangeCode = object.barchartExchangeCode ?? "";
    message.barchartBaseCode = object.barchartBaseCode ?? "";
    message.volumeDenominator = object.volumeDenominator ?? 0;
    message.bidOfferQuantityDenominator = object.bidOfferQuantityDenominator ?? 0;
    message.primaryListingMarketParticipantId = object.primaryListingMarketParticipantId ?? "";
    message.subscriptionSymbol = object.subscriptionSymbol ?? "";
    message.contractMaturity = object.contractMaturity !== void 0 && object.contractMaturity !== null ? InstrumentDefinition_MaturityDate.fromPartial(object.contractMaturity) : void 0;
    message.underlying = object.underlying ?? "";
    message.commodity = object.commodity ?? "";
    return message;
  }
};
function createBaseInstrumentDefinition_Schedule() {
  return { sessions: [] };
}
var InstrumentDefinition_Schedule = {
  encode(message, writer = import_minimal.default.Writer.create()) {
    for (const v of message.sessions) {
      InstrumentDefinition_TimeSpan.encode(v, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.default.Reader ? input : new import_minimal.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_Schedule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sessions.push(InstrumentDefinition_TimeSpan.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
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
  return { timeStart: long_default.ZERO, timeFinish: long_default.ZERO };
}
var InstrumentDefinition_TimeSpan = {
  encode(message, writer = import_minimal.default.Writer.create()) {
    if (!message.timeStart.isZero()) {
      writer.uint32(8).sint64(message.timeStart);
    }
    if (!message.timeFinish.isZero()) {
      writer.uint32(16).sint64(message.timeFinish);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.default.Reader ? input : new import_minimal.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_TimeSpan();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeStart = reader.sint64();
          break;
        case 2:
          message.timeFinish = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      timeStart: isSet(object.timeStart) ? long_default.fromValue(object.timeStart) : long_default.ZERO,
      timeFinish: isSet(object.timeFinish) ? long_default.fromValue(object.timeFinish) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.timeStart !== void 0 && (obj.timeStart = (message.timeStart || long_default.ZERO).toString());
    message.timeFinish !== void 0 && (obj.timeFinish = (message.timeFinish || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseInstrumentDefinition_TimeSpan();
    message.timeStart = object.timeStart !== void 0 && object.timeStart !== null ? long_default.fromValue(object.timeStart) : long_default.ZERO;
    message.timeFinish = object.timeFinish !== void 0 && object.timeFinish !== null ? long_default.fromValue(object.timeFinish) : long_default.ZERO;
    return message;
  }
};
function createBaseInstrumentDefinition_Calendar() {
  return { events: [] };
}
var InstrumentDefinition_Calendar = {
  encode(message, writer = import_minimal.default.Writer.create()) {
    for (const v of message.events) {
      InstrumentDefinition_Event.encode(v, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.default.Reader ? input : new import_minimal.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_Calendar();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.events.push(InstrumentDefinition_Event.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
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
  return { type: 0, date: long_default.ZERO };
}
var InstrumentDefinition_Event = {
  encode(message, writer = import_minimal.default.Writer.create()) {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (!message.date.isZero()) {
      writer.uint32(16).sint64(message.date);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.default.Reader ? input : new import_minimal.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_Event();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32();
          break;
        case 2:
          message.date = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      type: isSet(object.type) ? instrumentDefinition_EventTypeFromJSON(object.type) : 0,
      date: isSet(object.date) ? long_default.fromValue(object.date) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.type !== void 0 && (obj.type = instrumentDefinition_EventTypeToJSON(message.type));
    message.date !== void 0 && (obj.date = (message.date || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseInstrumentDefinition_Event();
    message.type = object.type ?? 0;
    message.date = object.date !== void 0 && object.date !== null ? long_default.fromValue(object.date) : long_default.ZERO;
    return message;
  }
};
function createBaseInstrumentDefinition_SpreadLeg() {
  return { marketId: long_default.ZERO, ratio: 0, symbol: "", longSymbol: "", legOptionDelta: 0, legPrice: 0 };
}
var InstrumentDefinition_SpreadLeg = {
  encode(message, writer = import_minimal.default.Writer.create()) {
    if (!message.marketId.isZero()) {
      writer.uint32(8).sint64(message.marketId);
    }
    if (message.ratio !== 0) {
      writer.uint32(16).sint32(message.ratio);
    }
    if (message.symbol !== "") {
      writer.uint32(26).string(message.symbol);
    }
    if (message.longSymbol !== "") {
      writer.uint32(34).string(message.longSymbol);
    }
    if (message.legOptionDelta !== 0) {
      writer.uint32(45).float(message.legOptionDelta);
    }
    if (message.legPrice !== 0) {
      writer.uint32(53).float(message.legPrice);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.default.Reader ? input : new import_minimal.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_SpreadLeg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.sint64();
          break;
        case 2:
          message.ratio = reader.sint32();
          break;
        case 3:
          message.symbol = reader.string();
          break;
        case 4:
          message.longSymbol = reader.string();
          break;
        case 5:
          message.legOptionDelta = reader.float();
          break;
        case 6:
          message.legPrice = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      marketId: isSet(object.marketId) ? long_default.fromValue(object.marketId) : long_default.ZERO,
      ratio: isSet(object.ratio) ? Number(object.ratio) : 0,
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      longSymbol: isSet(object.longSymbol) ? String(object.longSymbol) : "",
      legOptionDelta: isSet(object.legOptionDelta) ? Number(object.legOptionDelta) : 0,
      legPrice: isSet(object.legPrice) ? Number(object.legPrice) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.marketId !== void 0 && (obj.marketId = (message.marketId || long_default.ZERO).toString());
    message.ratio !== void 0 && (obj.ratio = Math.round(message.ratio));
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.longSymbol !== void 0 && (obj.longSymbol = message.longSymbol);
    message.legOptionDelta !== void 0 && (obj.legOptionDelta = message.legOptionDelta);
    message.legPrice !== void 0 && (obj.legPrice = message.legPrice);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseInstrumentDefinition_SpreadLeg();
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? long_default.fromValue(object.marketId) : long_default.ZERO;
    message.ratio = object.ratio ?? 0;
    message.symbol = object.symbol ?? "";
    message.longSymbol = object.longSymbol ?? "";
    message.legOptionDelta = object.legOptionDelta ?? 0;
    message.legPrice = object.legPrice ?? 0;
    return message;
  }
};
function createBaseInstrumentDefinition_MaturityDate() {
  return { year: 0, month: 0, day: 0 };
}
var InstrumentDefinition_MaturityDate = {
  encode(message, writer = import_minimal.default.Writer.create()) {
    if (message.year !== 0) {
      writer.uint32(8).sint32(message.year);
    }
    if (message.month !== 0) {
      writer.uint32(16).sint32(message.month);
    }
    if (message.day !== 0) {
      writer.uint32(24).sint32(message.day);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.default.Reader ? input : new import_minimal.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_MaturityDate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.year = reader.sint32();
          break;
        case 2:
          message.month = reader.sint32();
          break;
        case 3:
          message.day = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      year: isSet(object.year) ? Number(object.year) : 0,
      month: isSet(object.month) ? Number(object.month) : 0,
      day: isSet(object.day) ? Number(object.day) : 0
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
    const message = createBaseInstrumentDefinition_MaturityDate();
    message.year = object.year ?? 0;
    message.month = object.month ?? 0;
    message.day = object.day ?? 0;
    return message;
  }
};
function createBaseInstrumentDefinition_Symbol() {
  return { vendor: "", symbol: "", longSymbol: "" };
}
var InstrumentDefinition_Symbol = {
  encode(message, writer = import_minimal.default.Writer.create()) {
    if (message.vendor !== "") {
      writer.uint32(10).string(message.vendor);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (message.longSymbol !== "") {
      writer.uint32(26).string(message.longSymbol);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.default.Reader ? input : new import_minimal.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_Symbol();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vendor = reader.string();
          break;
        case 2:
          message.symbol = reader.string();
          break;
        case 3:
          message.longSymbol = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      vendor: isSet(object.vendor) ? String(object.vendor) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      longSymbol: isSet(object.longSymbol) ? String(object.longSymbol) : ""
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
    const message = createBaseInstrumentDefinition_Symbol();
    message.vendor = object.vendor ?? "";
    message.symbol = object.symbol ?? "";
    message.longSymbol = object.longSymbol ?? "";
    return message;
  }
};
function createBaseInstrumentDefinition_PriceFormat() {
  return { isFractional: false, denominator: 0, subDenominator: 0, subFormat: 0 };
}
var InstrumentDefinition_PriceFormat = {
  encode(message, writer = import_minimal.default.Writer.create()) {
    if (message.isFractional === true) {
      writer.uint32(8).bool(message.isFractional);
    }
    if (message.denominator !== 0) {
      writer.uint32(16).sint32(message.denominator);
    }
    if (message.subDenominator !== 0) {
      writer.uint32(32).sint32(message.subDenominator);
    }
    if (message.subFormat !== 0) {
      writer.uint32(48).int32(message.subFormat);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.default.Reader ? input : new import_minimal.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_PriceFormat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.isFractional = reader.bool();
          break;
        case 2:
          message.denominator = reader.sint32();
          break;
        case 4:
          message.subDenominator = reader.sint32();
          break;
        case 6:
          message.subFormat = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      isFractional: isSet(object.isFractional) ? Boolean(object.isFractional) : false,
      denominator: isSet(object.denominator) ? Number(object.denominator) : 0,
      subDenominator: isSet(object.subDenominator) ? Number(object.subDenominator) : 0,
      subFormat: isSet(object.subFormat) ? instrumentDefinition_PriceFormat_SubFormatFromJSON(object.subFormat) : 0
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
    const message = createBaseInstrumentDefinition_PriceFormat();
    message.isFractional = object.isFractional ?? false;
    message.denominator = object.denominator ?? 0;
    message.subDenominator = object.subDenominator ?? 0;
    message.subFormat = object.subFormat ?? 0;
    return message;
  }
};
function createBaseInstrumentDefinition_CurrencyPair() {
  return { currency1: "", currency2: "" };
}
var InstrumentDefinition_CurrencyPair = {
  encode(message, writer = import_minimal.default.Writer.create()) {
    if (message.currency1 !== "") {
      writer.uint32(10).string(message.currency1);
    }
    if (message.currency2 !== "") {
      writer.uint32(18).string(message.currency2);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.default.Reader ? input : new import_minimal.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_CurrencyPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currency1 = reader.string();
          break;
        case 2:
          message.currency2 = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      currency1: isSet(object.currency1) ? String(object.currency1) : "",
      currency2: isSet(object.currency2) ? String(object.currency2) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.currency1 !== void 0 && (obj.currency1 = message.currency1);
    message.currency2 !== void 0 && (obj.currency2 = message.currency2);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseInstrumentDefinition_CurrencyPair();
    message.currency1 = object.currency1 ?? "";
    message.currency2 = object.currency2 ?? "";
    return message;
  }
};
var globalThis = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
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
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}
function base64FromBytes(arr) {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}
if (import_minimal.default.util.Long !== long_default) {
  import_minimal.default.util.Long = long_default;
  import_minimal.default.configure();
}
function isSet(value) {
  return value !== null && value !== void 0;
}

// generated/openfeed.ts
function bookSideFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_BOOK_SIDE":
      return 0 /* UNKNOWN_BOOK_SIDE */;
    case 1:
    case "BID":
      return 1 /* BID */;
    case 2:
    case "OFFER":
      return 2 /* OFFER */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function bookSideToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_BOOK_SIDE */:
      return "UNKNOWN_BOOK_SIDE";
    case 1 /* BID */:
      return "BID";
    case 2 /* OFFER */:
      return "OFFER";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function instrumentTradingStatusFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_TRADING_STATUS":
      return 0 /* UNKNOWN_TRADING_STATUS */;
    case 1:
    case "TRADING_RESUME":
      return 1 /* TRADING_RESUME */;
    case 2:
    case "PRE_OPEN":
      return 2 /* PRE_OPEN */;
    case 3:
    case "OPEN":
      return 3 /* OPEN */;
    case 4:
    case "PRE_CLOSE":
      return 4 /* PRE_CLOSE */;
    case 5:
    case "CLOSE":
      return 5 /* CLOSE */;
    case 6:
    case "TRADING_HALT":
      return 6 /* TRADING_HALT */;
    case 7:
    case "QUOTATION_RESUME":
      return 7 /* QUOTATION_RESUME */;
    case 8:
    case "OPEN_DELAY":
      return 8 /* OPEN_DELAY */;
    case 9:
    case "NO_OPEN_NO_RESUME":
      return 9 /* NO_OPEN_NO_RESUME */;
    case 10:
    case "FAST_MARKET":
      return 10 /* FAST_MARKET */;
    case 11:
    case "FAST_MARKET_END":
      return 11 /* FAST_MARKET_END */;
    case 12:
    case "LATE_MARKET":
      return 12 /* LATE_MARKET */;
    case 13:
    case "LATE_MARKET_END":
      return 13 /* LATE_MARKET_END */;
    case 14:
    case "POST_SESSION":
      return 14 /* POST_SESSION */;
    case 15:
    case "POST_SESSION_END":
      return 15 /* POST_SESSION_END */;
    case 16:
    case "NEW_PRICE_INDICATION":
      return 16 /* NEW_PRICE_INDICATION */;
    case 17:
    case "NOT_AVAILABLE_FOR_TRADING":
      return 17 /* NOT_AVAILABLE_FOR_TRADING */;
    case 18:
    case "PRE_CROSS":
      return 18 /* PRE_CROSS */;
    case 19:
    case "CROSS":
      return 19 /* CROSS */;
    case 20:
    case "POST_CLOSE":
      return 20 /* POST_CLOSE */;
    case 21:
    case "NO_CHANGE":
      return 21 /* NO_CHANGE */;
    case 22:
    case "NAFT":
      return 22 /* NAFT */;
    case 23:
    case "TRADING_RANGE_INDICATION":
      return 23 /* TRADING_RANGE_INDICATION */;
    case 24:
    case "MARKET_IMBALANCE_BUY":
      return 24 /* MARKET_IMBALANCE_BUY */;
    case 25:
    case "MARKET_IMBALANCE_SELL":
      return 25 /* MARKET_IMBALANCE_SELL */;
    case 26:
    case "MOC_IMBALANCE_BUY":
      return 26 /* MOC_IMBALANCE_BUY */;
    case 27:
    case "MOC_IMBALANCE_SELL":
      return 27 /* MOC_IMBALANCE_SELL */;
    case 28:
    case "NO_MARKET_IMBALANCE":
      return 28 /* NO_MARKET_IMBALANCE */;
    case 29:
    case "NO_MOC_IMBALANCE":
      return 29 /* NO_MOC_IMBALANCE */;
    case 30:
    case "SHORT_SELL_RESTRICTION":
      return 30 /* SHORT_SELL_RESTRICTION */;
    case 31:
    case "LIMIT_UP_LIMIT_DOWN":
      return 31 /* LIMIT_UP_LIMIT_DOWN */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function instrumentTradingStatusToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_TRADING_STATUS */:
      return "UNKNOWN_TRADING_STATUS";
    case 1 /* TRADING_RESUME */:
      return "TRADING_RESUME";
    case 2 /* PRE_OPEN */:
      return "PRE_OPEN";
    case 3 /* OPEN */:
      return "OPEN";
    case 4 /* PRE_CLOSE */:
      return "PRE_CLOSE";
    case 5 /* CLOSE */:
      return "CLOSE";
    case 6 /* TRADING_HALT */:
      return "TRADING_HALT";
    case 7 /* QUOTATION_RESUME */:
      return "QUOTATION_RESUME";
    case 8 /* OPEN_DELAY */:
      return "OPEN_DELAY";
    case 9 /* NO_OPEN_NO_RESUME */:
      return "NO_OPEN_NO_RESUME";
    case 10 /* FAST_MARKET */:
      return "FAST_MARKET";
    case 11 /* FAST_MARKET_END */:
      return "FAST_MARKET_END";
    case 12 /* LATE_MARKET */:
      return "LATE_MARKET";
    case 13 /* LATE_MARKET_END */:
      return "LATE_MARKET_END";
    case 14 /* POST_SESSION */:
      return "POST_SESSION";
    case 15 /* POST_SESSION_END */:
      return "POST_SESSION_END";
    case 16 /* NEW_PRICE_INDICATION */:
      return "NEW_PRICE_INDICATION";
    case 17 /* NOT_AVAILABLE_FOR_TRADING */:
      return "NOT_AVAILABLE_FOR_TRADING";
    case 18 /* PRE_CROSS */:
      return "PRE_CROSS";
    case 19 /* CROSS */:
      return "CROSS";
    case 20 /* POST_CLOSE */:
      return "POST_CLOSE";
    case 21 /* NO_CHANGE */:
      return "NO_CHANGE";
    case 22 /* NAFT */:
      return "NAFT";
    case 23 /* TRADING_RANGE_INDICATION */:
      return "TRADING_RANGE_INDICATION";
    case 24 /* MARKET_IMBALANCE_BUY */:
      return "MARKET_IMBALANCE_BUY";
    case 25 /* MARKET_IMBALANCE_SELL */:
      return "MARKET_IMBALANCE_SELL";
    case 26 /* MOC_IMBALANCE_BUY */:
      return "MOC_IMBALANCE_BUY";
    case 27 /* MOC_IMBALANCE_SELL */:
      return "MOC_IMBALANCE_SELL";
    case 28 /* NO_MARKET_IMBALANCE */:
      return "NO_MARKET_IMBALANCE";
    case 29 /* NO_MOC_IMBALANCE */:
      return "NO_MOC_IMBALANCE";
    case 30 /* SHORT_SELL_RESTRICTION */:
      return "SHORT_SELL_RESTRICTION";
    case 31 /* LIMIT_UP_LIMIT_DOWN */:
      return "LIMIT_UP_LIMIT_DOWN";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function regulationSHOShortSalePriceTestFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_PRICE_TEST":
      return 0 /* UNKNOWN_PRICE_TEST */;
    case 1:
    case "PRICE_TEST_NONE":
      return 1 /* PRICE_TEST_NONE */;
    case 2:
    case "PRICE_TEST_IN_EFFECT":
      return 2 /* PRICE_TEST_IN_EFFECT */;
    case 3:
    case "PRICE_TEST_REMAINS_IN_EFFECT":
      return 3 /* PRICE_TEST_REMAINS_IN_EFFECT */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function regulationSHOShortSalePriceTestToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_PRICE_TEST */:
      return "UNKNOWN_PRICE_TEST";
    case 1 /* PRICE_TEST_NONE */:
      return "PRICE_TEST_NONE";
    case 2 /* PRICE_TEST_IN_EFFECT */:
      return "PRICE_TEST_IN_EFFECT";
    case 3 /* PRICE_TEST_REMAINS_IN_EFFECT */:
      return "PRICE_TEST_REMAINS_IN_EFFECT";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function settlementTermsFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_SETTLEMENT_TERMS":
      return 0 /* UNKNOWN_SETTLEMENT_TERMS */;
    case 1:
    case "CASH":
      return 1 /* CASH */;
    case 2:
    case "NON_NET":
      return 2 /* NON_NET */;
    case 3:
    case "CONTINGENT_TRADE":
      return 3 /* CONTINGENT_TRADE */;
    case 4:
    case "CASH_TODAY":
      return 4 /* CASH_TODAY */;
    case 5:
    case "DATE":
      return 5 /* DATE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function settlementTermsToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_SETTLEMENT_TERMS */:
      return "UNKNOWN_SETTLEMENT_TERMS";
    case 1 /* CASH */:
      return "CASH";
    case 2 /* NON_NET */:
      return "NON_NET";
    case 3 /* CONTINGENT_TRADE */:
      return "CONTINGENT_TRADE";
    case 4 /* CASH_TODAY */:
      return "CASH_TODAY";
    case 5 /* DATE */:
      return "DATE";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function crossTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_CROSS_TYPE":
      return 0 /* UNKNOWN_CROSS_TYPE */;
    case 1:
    case "DEFAULT":
      return 1 /* DEFAULT */;
    case 2:
    case "INTERNAL":
      return 2 /* INTERNAL */;
    case 3:
    case "BASIS":
      return 3 /* BASIS */;
    case 4:
    case "CONTINGENT":
      return 4 /* CONTINGENT */;
    case 5:
    case "SPECIAL":
      return 5 /* SPECIAL */;
    case 6:
    case "VWAP":
      return 6 /* VWAP */;
    case 7:
    case "REGULAR":
      return 7 /* REGULAR */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function crossTypeToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_CROSS_TYPE */:
      return "UNKNOWN_CROSS_TYPE";
    case 1 /* DEFAULT */:
      return "DEFAULT";
    case 2 /* INTERNAL */:
      return "INTERNAL";
    case 3 /* BASIS */:
      return "BASIS";
    case 4 /* CONTINGENT */:
      return "CONTINGENT";
    case 5 /* SPECIAL */:
      return "SPECIAL";
    case 6 /* VWAP */:
      return "VWAP";
    case 7 /* REGULAR */:
      return "REGULAR";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function openCloseSettlementFlagFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return 0 /* UNKNOWN */;
    case 1:
    case "DAILY_OPEN":
      return 1 /* DAILY_OPEN */;
    case 2:
    case "INDICATIVE_OPEN_PRICE":
      return 2 /* INDICATIVE_OPEN_PRICE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function openCloseSettlementFlagToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN */:
      return "UNKNOWN";
    case 1 /* DAILY_OPEN */:
      return "DAILY_OPEN";
    case 2 /* INDICATIVE_OPEN_PRICE */:
      return "INDICATIVE_OPEN_PRICE";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function settlementSourceFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_SETTLEMENT_SOURCE":
      return 0 /* UNKNOWN_SETTLEMENT_SOURCE */;
    case 1:
    case "GLOBEX":
      return 1 /* GLOBEX */;
    case 2:
    case "ITC":
      return 2 /* ITC */;
    case 3:
    case "MANUAL":
      return 3 /* MANUAL */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function settlementSourceToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_SETTLEMENT_SOURCE */:
      return "UNKNOWN_SETTLEMENT_SOURCE";
    case 1 /* GLOBEX */:
      return "GLOBEX";
    case 2 /* ITC */:
      return "ITC";
    case 3 /* MANUAL */:
      return "MANUAL";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var Service = /* @__PURE__ */ ((Service3) => {
  Service3[Service3["UNKNOWN_SERVICE"] = 0] = "UNKNOWN_SERVICE";
  Service3[Service3["REAL_TIME"] = 1] = "REAL_TIME";
  Service3[Service3["DELAYED"] = 2] = "DELAYED";
  Service3[Service3["REAL_TIME_SNAPSHOT"] = 3] = "REAL_TIME_SNAPSHOT";
  Service3[Service3["DELAYED_SNAPSHOT"] = 4] = "DELAYED_SNAPSHOT";
  Service3[Service3["END_OF_DAY"] = 5] = "END_OF_DAY";
  Service3[Service3["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return Service3;
})(Service || {});
function serviceFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_SERVICE":
      return 0 /* UNKNOWN_SERVICE */;
    case 1:
    case "REAL_TIME":
      return 1 /* REAL_TIME */;
    case 2:
    case "DELAYED":
      return 2 /* DELAYED */;
    case 3:
    case "REAL_TIME_SNAPSHOT":
      return 3 /* REAL_TIME_SNAPSHOT */;
    case 4:
    case "DELAYED_SNAPSHOT":
      return 4 /* DELAYED_SNAPSHOT */;
    case 5:
    case "END_OF_DAY":
      return 5 /* END_OF_DAY */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function serviceToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_SERVICE */:
      return "UNKNOWN_SERVICE";
    case 1 /* REAL_TIME */:
      return "REAL_TIME";
    case 2 /* DELAYED */:
      return "DELAYED";
    case 3 /* REAL_TIME_SNAPSHOT */:
      return "REAL_TIME_SNAPSHOT";
    case 4 /* DELAYED_SNAPSHOT */:
      return "DELAYED_SNAPSHOT";
    case 5 /* END_OF_DAY */:
      return "END_OF_DAY";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function marketWideStatusFromJSON(object) {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return 0 /* STATUS_UNKNOWN */;
    case 1:
    case "STATUS_START_OF_DAY":
      return 1 /* STATUS_START_OF_DAY */;
    case 2:
    case "STATUS_END_OF_DAY":
      return 2 /* STATUS_END_OF_DAY */;
    case 3:
    case "STATUS_OPEN":
      return 3 /* STATUS_OPEN */;
    case 4:
    case "STATUS_CLOSE":
      return 4 /* STATUS_CLOSE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function marketWideStatusToJSON(object) {
  switch (object) {
    case 0 /* STATUS_UNKNOWN */:
      return "STATUS_UNKNOWN";
    case 1 /* STATUS_START_OF_DAY */:
      return "STATUS_START_OF_DAY";
    case 2 /* STATUS_END_OF_DAY */:
      return "STATUS_END_OF_DAY";
    case 3 /* STATUS_OPEN */:
      return "STATUS_OPEN";
    case 4 /* STATUS_CLOSE */:
      return "STATUS_CLOSE";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function actionTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_ACTION":
      return 0 /* UNKNOWN_ACTION */;
    case 1:
    case "LISTING":
      return 1 /* LISTING */;
    case 2:
    case "DELISTING":
      return 2 /* DELISTING */;
    case 3:
    case "EXCHANGE_MOVE":
      return 3 /* EXCHANGE_MOVE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function actionTypeToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_ACTION */:
      return "UNKNOWN_ACTION";
    case 1 /* LISTING */:
      return "LISTING";
    case 2 /* DELISTING */:
      return "DELISTING";
    case 3 /* EXCHANGE_MOVE */:
      return "EXCHANGE_MOVE";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function marketSummary_ClearSetFromJSON(object) {
  switch (object) {
    case 0:
    case "NONE":
      return 0 /* NONE */;
    case 1:
    case "ALL":
      return 1 /* ALL */;
    case 2:
    case "BA":
      return 2 /* BA */;
    case 3:
    case "CUSTOM_1":
      return 3 /* CUSTOM_1 */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function marketSummary_ClearSetToJSON(object) {
  switch (object) {
    case 0 /* NONE */:
      return "NONE";
    case 1 /* ALL */:
      return "ALL";
    case 2 /* BA */:
      return "BA";
    case 3 /* CUSTOM_1 */:
      return "CUSTOM_1";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function marketSummary_SummaryTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "EXCHANGE_REFRESH":
      return 0 /* EXCHANGE_REFRESH */;
    case 1:
    case "REFRESH_LIVE_PRICE":
      return 1 /* REFRESH_LIVE_PRICE */;
    case 2:
    case "EOD_COMMODITY_PRICES":
      return 2 /* EOD_COMMODITY_PRICES */;
    case 3:
    case "EOD_STOCK_FOREX_PRICES":
      return 3 /* EOD_STOCK_FOREX_PRICES */;
    case 4:
    case "EOD_COMMODITY_STATS":
      return 4 /* EOD_COMMODITY_STATS */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function marketSummary_SummaryTypeToJSON(object) {
  switch (object) {
    case 0 /* EXCHANGE_REFRESH */:
      return "EXCHANGE_REFRESH";
    case 1 /* REFRESH_LIVE_PRICE */:
      return "REFRESH_LIVE_PRICE";
    case 2 /* EOD_COMMODITY_PRICES */:
      return "EOD_COMMODITY_PRICES";
    case 3 /* EOD_STOCK_FOREX_PRICES */:
      return "EOD_STOCK_FOREX_PRICES";
    case 4 /* EOD_COMMODITY_STATS */:
      return "EOD_COMMODITY_STATS";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseHeartBeat() {
  return { transactionTime: long_default.ZERO, status: "", exchange: false, channel: 0 };
}
var HeartBeat = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(8).sint64(message.transactionTime);
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    if (message.exchange === true) {
      writer.uint32(24).bool(message.exchange);
    }
    if (message.channel !== 0) {
      writer.uint32(32).sint32(message.channel);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseHeartBeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionTime = reader.sint64();
          break;
        case 2:
          message.status = reader.string();
          break;
        case 3:
          message.exchange = reader.bool();
          break;
        case 4:
          message.channel = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      status: isSet2(object.status) ? String(object.status) : "",
      exchange: isSet2(object.exchange) ? Boolean(object.exchange) : false,
      channel: isSet2(object.channel) ? Number(object.channel) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.status !== void 0 && (obj.status = message.status);
    message.exchange !== void 0 && (obj.exchange = message.exchange);
    message.channel !== void 0 && (obj.channel = Math.round(message.channel));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseHeartBeat();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.status = object.status ?? "";
    message.exchange = object.exchange ?? false;
    message.channel = object.channel ?? 0;
    return message;
  }
};
function createBaseMarketStatus() {
  return { transactionTime: long_default.ZERO, channel: 0, marketWideStatus: 0 };
}
var MarketStatus = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(8).sint64(message.transactionTime);
    }
    if (message.channel !== 0) {
      writer.uint32(16).sint32(message.channel);
    }
    if (message.marketWideStatus !== 0) {
      writer.uint32(24).int32(message.marketWideStatus);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMarketStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionTime = reader.sint64();
          break;
        case 2:
          message.channel = reader.sint32();
          break;
        case 3:
          message.marketWideStatus = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      channel: isSet2(object.channel) ? Number(object.channel) : 0,
      marketWideStatus: isSet2(object.marketWideStatus) ? marketWideStatusFromJSON(object.marketWideStatus) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.channel !== void 0 && (obj.channel = Math.round(message.channel));
    message.marketWideStatus !== void 0 && (obj.marketWideStatus = marketWideStatusToJSON(message.marketWideStatus));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseMarketStatus();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.channel = object.channel ?? 0;
    message.marketWideStatus = object.marketWideStatus ?? 0;
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
    transactionTime: long_default.ZERO
  };
}
var MarketSession = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.tradeDate !== 0) {
      writer.uint32(32).sint32(message.tradeDate);
    }
    if (message.open !== void 0) {
      Open.encode(message.open, writer.uint32(242).fork()).ldelim();
    }
    if (message.high !== void 0) {
      High.encode(message.high, writer.uint32(250).fork()).ldelim();
    }
    if (message.low !== void 0) {
      Low.encode(message.low, writer.uint32(258).fork()).ldelim();
    }
    if (message.last !== void 0) {
      Last.encode(message.last, writer.uint32(282).fork()).ldelim();
    }
    if (message.volume !== void 0) {
      Volume.encode(message.volume, writer.uint32(306).fork()).ldelim();
    }
    if (message.settlement !== void 0) {
      Settlement.encode(message.settlement, writer.uint32(314).fork()).ldelim();
    }
    if (message.prevSettlement !== void 0) {
      Settlement.encode(message.prevSettlement, writer.uint32(354).fork()).ldelim();
    }
    if (message.openInterest !== void 0) {
      OpenInterest.encode(message.openInterest, writer.uint32(322).fork()).ldelim();
    }
    if (message.numberOfTrades !== void 0) {
      NumberOfTrades.encode(message.numberOfTrades, writer.uint32(330).fork()).ldelim();
    }
    if (message.monetaryValue !== void 0) {
      MonetaryValue.encode(message.monetaryValue, writer.uint32(338).fork()).ldelim();
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(344).sint64(message.transactionTime);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMarketSession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          message.tradeDate = reader.sint32();
          break;
        case 30:
          message.open = Open.decode(reader, reader.uint32());
          break;
        case 31:
          message.high = High.decode(reader, reader.uint32());
          break;
        case 32:
          message.low = Low.decode(reader, reader.uint32());
          break;
        case 35:
          message.last = Last.decode(reader, reader.uint32());
          break;
        case 38:
          message.volume = Volume.decode(reader, reader.uint32());
          break;
        case 39:
          message.settlement = Settlement.decode(reader, reader.uint32());
          break;
        case 44:
          message.prevSettlement = Settlement.decode(reader, reader.uint32());
          break;
        case 40:
          message.openInterest = OpenInterest.decode(reader, reader.uint32());
          break;
        case 41:
          message.numberOfTrades = NumberOfTrades.decode(reader, reader.uint32());
          break;
        case 42:
          message.monetaryValue = MonetaryValue.decode(reader, reader.uint32());
          break;
        case 43:
          message.transactionTime = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      open: isSet2(object.open) ? Open.fromJSON(object.open) : void 0,
      high: isSet2(object.high) ? High.fromJSON(object.high) : void 0,
      low: isSet2(object.low) ? Low.fromJSON(object.low) : void 0,
      last: isSet2(object.last) ? Last.fromJSON(object.last) : void 0,
      volume: isSet2(object.volume) ? Volume.fromJSON(object.volume) : void 0,
      settlement: isSet2(object.settlement) ? Settlement.fromJSON(object.settlement) : void 0,
      prevSettlement: isSet2(object.prevSettlement) ? Settlement.fromJSON(object.prevSettlement) : void 0,
      openInterest: isSet2(object.openInterest) ? OpenInterest.fromJSON(object.openInterest) : void 0,
      numberOfTrades: isSet2(object.numberOfTrades) ? NumberOfTrades.fromJSON(object.numberOfTrades) : void 0,
      monetaryValue: isSet2(object.monetaryValue) ? MonetaryValue.fromJSON(object.monetaryValue) : void 0,
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO
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
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseMarketSession();
    message.tradeDate = object.tradeDate ?? 0;
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
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    return message;
  }
};
function createBaseMarketSnapshot() {
  return {
    marketId: long_default.ZERO,
    transactionTime: long_default.ZERO,
    marketSequence: long_default.ZERO,
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
var MarketSnapshot = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.marketId.isZero()) {
      writer.uint32(8).sint64(message.marketId);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(16).sint64(message.transactionTime);
    }
    if (!message.marketSequence.isZero()) {
      writer.uint32(24).int64(message.marketSequence);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(32).sint32(message.tradeDate);
    }
    if (message.totalChunks !== 0) {
      writer.uint32(40).sint32(message.totalChunks);
    }
    if (message.currentChunk !== 0) {
      writer.uint32(48).sint32(message.currentChunk);
    }
    if (message.symbol !== "") {
      writer.uint32(58).string(message.symbol);
    }
    if (message.priceDenominator !== 0) {
      writer.uint32(64).sint32(message.priceDenominator);
    }
    if (message.service !== 0) {
      writer.uint32(72).int32(message.service);
    }
    if (message.instrumentStatus !== void 0) {
      InstrumentStatus.encode(message.instrumentStatus, writer.uint32(82).fork()).ldelim();
    }
    if (message.bbo !== void 0) {
      BestBidOffer.encode(message.bbo, writer.uint32(90).fork()).ldelim();
    }
    if (message.index !== void 0) {
      IndexValue.encode(message.index, writer.uint32(98).fork()).ldelim();
    }
    for (const v of message.priceLevels) {
      AddPriceLevel.encode(v, writer.uint32(106).fork()).ldelim();
    }
    for (const v of message.orders) {
      AddOrder.encode(v, writer.uint32(114).fork()).ldelim();
    }
    if (message.news !== void 0) {
      News.encode(message.news, writer.uint32(122).fork()).ldelim();
    }
    if (message.open !== void 0) {
      Open.encode(message.open, writer.uint32(242).fork()).ldelim();
    }
    if (message.high !== void 0) {
      High.encode(message.high, writer.uint32(250).fork()).ldelim();
    }
    if (message.low !== void 0) {
      Low.encode(message.low, writer.uint32(258).fork()).ldelim();
    }
    if (message.close !== void 0) {
      Close.encode(message.close, writer.uint32(266).fork()).ldelim();
    }
    if (message.prevClose !== void 0) {
      PrevClose.encode(message.prevClose, writer.uint32(274).fork()).ldelim();
    }
    if (message.last !== void 0) {
      Last.encode(message.last, writer.uint32(282).fork()).ldelim();
    }
    if (message.yearHigh !== void 0) {
      YearHigh.encode(message.yearHigh, writer.uint32(290).fork()).ldelim();
    }
    if (message.yearLow !== void 0) {
      YearLow.encode(message.yearLow, writer.uint32(298).fork()).ldelim();
    }
    if (message.volume !== void 0) {
      Volume.encode(message.volume, writer.uint32(306).fork()).ldelim();
    }
    if (message.settlement !== void 0) {
      Settlement.encode(message.settlement, writer.uint32(314).fork()).ldelim();
    }
    if (message.openInterest !== void 0) {
      OpenInterest.encode(message.openInterest, writer.uint32(322).fork()).ldelim();
    }
    if (message.vwap !== void 0) {
      Vwap.encode(message.vwap, writer.uint32(330).fork()).ldelim();
    }
    if (message.dividendsIncomeDistributions !== void 0) {
      DividendsIncomeDistributions.encode(message.dividendsIncomeDistributions, writer.uint32(338).fork()).ldelim();
    }
    if (message.numberOfTrades !== void 0) {
      NumberOfTrades.encode(message.numberOfTrades, writer.uint32(346).fork()).ldelim();
    }
    if (message.monetaryValue !== void 0) {
      MonetaryValue.encode(message.monetaryValue, writer.uint32(354).fork()).ldelim();
    }
    if (message.capitalDistributions !== void 0) {
      CapitalDistributions.encode(message.capitalDistributions, writer.uint32(362).fork()).ldelim();
    }
    if (message.sharesOutstanding !== void 0) {
      SharesOutstanding.encode(message.sharesOutstanding, writer.uint32(370).fork()).ldelim();
    }
    if (message.netAssetValue !== void 0) {
      NetAssetValue.encode(message.netAssetValue, writer.uint32(378).fork()).ldelim();
    }
    if (message.previousSession !== void 0) {
      MarketSession.encode(message.previousSession, writer.uint32(386).fork()).ldelim();
    }
    if (message.tSession !== void 0) {
      MarketSession.encode(message.tSession, writer.uint32(394).fork()).ldelim();
    }
    if (message.volumeAtPrice !== void 0) {
      VolumeAtPrice.encode(message.volumeAtPrice, writer.uint32(402).fork()).ldelim();
    }
    if (message.highRolling !== void 0) {
      HighRolling.encode(message.highRolling, writer.uint32(410).fork()).ldelim();
    }
    if (message.lowRolling !== void 0) {
      LowRolling.encode(message.lowRolling, writer.uint32(418).fork()).ldelim();
    }
    if (message.zSession !== void 0) {
      MarketSession.encode(message.zSession, writer.uint32(426).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMarketSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.sint64();
          break;
        case 2:
          message.transactionTime = reader.sint64();
          break;
        case 3:
          message.marketSequence = reader.int64();
          break;
        case 4:
          message.tradeDate = reader.sint32();
          break;
        case 5:
          message.totalChunks = reader.sint32();
          break;
        case 6:
          message.currentChunk = reader.sint32();
          break;
        case 7:
          message.symbol = reader.string();
          break;
        case 8:
          message.priceDenominator = reader.sint32();
          break;
        case 9:
          message.service = reader.int32();
          break;
        case 10:
          message.instrumentStatus = InstrumentStatus.decode(reader, reader.uint32());
          break;
        case 11:
          message.bbo = BestBidOffer.decode(reader, reader.uint32());
          break;
        case 12:
          message.index = IndexValue.decode(reader, reader.uint32());
          break;
        case 13:
          message.priceLevels.push(AddPriceLevel.decode(reader, reader.uint32()));
          break;
        case 14:
          message.orders.push(AddOrder.decode(reader, reader.uint32()));
          break;
        case 15:
          message.news = News.decode(reader, reader.uint32());
          break;
        case 30:
          message.open = Open.decode(reader, reader.uint32());
          break;
        case 31:
          message.high = High.decode(reader, reader.uint32());
          break;
        case 32:
          message.low = Low.decode(reader, reader.uint32());
          break;
        case 33:
          message.close = Close.decode(reader, reader.uint32());
          break;
        case 34:
          message.prevClose = PrevClose.decode(reader, reader.uint32());
          break;
        case 35:
          message.last = Last.decode(reader, reader.uint32());
          break;
        case 36:
          message.yearHigh = YearHigh.decode(reader, reader.uint32());
          break;
        case 37:
          message.yearLow = YearLow.decode(reader, reader.uint32());
          break;
        case 38:
          message.volume = Volume.decode(reader, reader.uint32());
          break;
        case 39:
          message.settlement = Settlement.decode(reader, reader.uint32());
          break;
        case 40:
          message.openInterest = OpenInterest.decode(reader, reader.uint32());
          break;
        case 41:
          message.vwap = Vwap.decode(reader, reader.uint32());
          break;
        case 42:
          message.dividendsIncomeDistributions = DividendsIncomeDistributions.decode(reader, reader.uint32());
          break;
        case 43:
          message.numberOfTrades = NumberOfTrades.decode(reader, reader.uint32());
          break;
        case 44:
          message.monetaryValue = MonetaryValue.decode(reader, reader.uint32());
          break;
        case 45:
          message.capitalDistributions = CapitalDistributions.decode(reader, reader.uint32());
          break;
        case 46:
          message.sharesOutstanding = SharesOutstanding.decode(reader, reader.uint32());
          break;
        case 47:
          message.netAssetValue = NetAssetValue.decode(reader, reader.uint32());
          break;
        case 48:
          message.previousSession = MarketSession.decode(reader, reader.uint32());
          break;
        case 49:
          message.tSession = MarketSession.decode(reader, reader.uint32());
          break;
        case 50:
          message.volumeAtPrice = VolumeAtPrice.decode(reader, reader.uint32());
          break;
        case 51:
          message.highRolling = HighRolling.decode(reader, reader.uint32());
          break;
        case 52:
          message.lowRolling = LowRolling.decode(reader, reader.uint32());
          break;
        case 53:
          message.zSession = MarketSession.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      marketId: isSet2(object.marketId) ? long_default.fromValue(object.marketId) : long_default.ZERO,
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      marketSequence: isSet2(object.marketSequence) ? long_default.fromValue(object.marketSequence) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      totalChunks: isSet2(object.totalChunks) ? Number(object.totalChunks) : 0,
      currentChunk: isSet2(object.currentChunk) ? Number(object.currentChunk) : 0,
      symbol: isSet2(object.symbol) ? String(object.symbol) : "",
      priceDenominator: isSet2(object.priceDenominator) ? Number(object.priceDenominator) : 0,
      service: isSet2(object.service) ? serviceFromJSON(object.service) : 0,
      instrumentStatus: isSet2(object.instrumentStatus) ? InstrumentStatus.fromJSON(object.instrumentStatus) : void 0,
      bbo: isSet2(object.bbo) ? BestBidOffer.fromJSON(object.bbo) : void 0,
      index: isSet2(object.index) ? IndexValue.fromJSON(object.index) : void 0,
      priceLevels: Array.isArray(object == null ? void 0 : object.priceLevels) ? object.priceLevels.map((e) => AddPriceLevel.fromJSON(e)) : [],
      orders: Array.isArray(object == null ? void 0 : object.orders) ? object.orders.map((e) => AddOrder.fromJSON(e)) : [],
      news: isSet2(object.news) ? News.fromJSON(object.news) : void 0,
      open: isSet2(object.open) ? Open.fromJSON(object.open) : void 0,
      high: isSet2(object.high) ? High.fromJSON(object.high) : void 0,
      low: isSet2(object.low) ? Low.fromJSON(object.low) : void 0,
      close: isSet2(object.close) ? Close.fromJSON(object.close) : void 0,
      prevClose: isSet2(object.prevClose) ? PrevClose.fromJSON(object.prevClose) : void 0,
      last: isSet2(object.last) ? Last.fromJSON(object.last) : void 0,
      yearHigh: isSet2(object.yearHigh) ? YearHigh.fromJSON(object.yearHigh) : void 0,
      yearLow: isSet2(object.yearLow) ? YearLow.fromJSON(object.yearLow) : void 0,
      volume: isSet2(object.volume) ? Volume.fromJSON(object.volume) : void 0,
      settlement: isSet2(object.settlement) ? Settlement.fromJSON(object.settlement) : void 0,
      openInterest: isSet2(object.openInterest) ? OpenInterest.fromJSON(object.openInterest) : void 0,
      vwap: isSet2(object.vwap) ? Vwap.fromJSON(object.vwap) : void 0,
      dividendsIncomeDistributions: isSet2(object.dividendsIncomeDistributions) ? DividendsIncomeDistributions.fromJSON(object.dividendsIncomeDistributions) : void 0,
      numberOfTrades: isSet2(object.numberOfTrades) ? NumberOfTrades.fromJSON(object.numberOfTrades) : void 0,
      monetaryValue: isSet2(object.monetaryValue) ? MonetaryValue.fromJSON(object.monetaryValue) : void 0,
      capitalDistributions: isSet2(object.capitalDistributions) ? CapitalDistributions.fromJSON(object.capitalDistributions) : void 0,
      sharesOutstanding: isSet2(object.sharesOutstanding) ? SharesOutstanding.fromJSON(object.sharesOutstanding) : void 0,
      netAssetValue: isSet2(object.netAssetValue) ? NetAssetValue.fromJSON(object.netAssetValue) : void 0,
      previousSession: isSet2(object.previousSession) ? MarketSession.fromJSON(object.previousSession) : void 0,
      tSession: isSet2(object.tSession) ? MarketSession.fromJSON(object.tSession) : void 0,
      volumeAtPrice: isSet2(object.volumeAtPrice) ? VolumeAtPrice.fromJSON(object.volumeAtPrice) : void 0,
      highRolling: isSet2(object.highRolling) ? HighRolling.fromJSON(object.highRolling) : void 0,
      lowRolling: isSet2(object.lowRolling) ? LowRolling.fromJSON(object.lowRolling) : void 0,
      zSession: isSet2(object.zSession) ? MarketSession.fromJSON(object.zSession) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.marketId !== void 0 && (obj.marketId = (message.marketId || long_default.ZERO).toString());
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.marketSequence !== void 0 && (obj.marketSequence = (message.marketSequence || long_default.ZERO).toString());
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
    var _a, _b;
    const message = createBaseMarketSnapshot();
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? long_default.fromValue(object.marketId) : long_default.ZERO;
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.marketSequence = object.marketSequence !== void 0 && object.marketSequence !== null ? long_default.fromValue(object.marketSequence) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.totalChunks = object.totalChunks ?? 0;
    message.currentChunk = object.currentChunk ?? 0;
    message.symbol = object.symbol ?? "";
    message.priceDenominator = object.priceDenominator ?? 0;
    message.service = object.service ?? 0;
    message.instrumentStatus = object.instrumentStatus !== void 0 && object.instrumentStatus !== null ? InstrumentStatus.fromPartial(object.instrumentStatus) : void 0;
    message.bbo = object.bbo !== void 0 && object.bbo !== null ? BestBidOffer.fromPartial(object.bbo) : void 0;
    message.index = object.index !== void 0 && object.index !== null ? IndexValue.fromPartial(object.index) : void 0;
    message.priceLevels = ((_a = object.priceLevels) == null ? void 0 : _a.map((e) => AddPriceLevel.fromPartial(e))) || [];
    message.orders = ((_b = object.orders) == null ? void 0 : _b.map((e) => AddOrder.fromPartial(e))) || [];
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
    marketId: long_default.ZERO,
    symbol: "",
    transactionTime: long_default.ZERO,
    distributionTime: long_default.ZERO,
    marketSequence: long_default.ZERO,
    sourceSequence: long_default.ZERO,
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
var MarketUpdate = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.marketId.isZero()) {
      writer.uint32(8).sint64(message.marketId);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(24).sint64(message.transactionTime);
    }
    if (!message.distributionTime.isZero()) {
      writer.uint32(32).sint64(message.distributionTime);
    }
    if (!message.marketSequence.isZero()) {
      writer.uint32(40).sint64(message.marketSequence);
    }
    if (!message.sourceSequence.isZero()) {
      writer.uint32(48).sint64(message.sourceSequence);
    }
    if (message.originatorId.length !== 0) {
      writer.uint32(58).bytes(message.originatorId);
    }
    if (message.priceDenominator !== 0) {
      writer.uint32(72).sint32(message.priceDenominator);
    }
    if (message.context !== void 0) {
      Context.encode(message.context, writer.uint32(82).fork()).ldelim();
    }
    if (message.session !== void 0) {
      MarketSession.encode(message.session, writer.uint32(90).fork()).ldelim();
    }
    if (message.tSession !== void 0) {
      MarketSession.encode(message.tSession, writer.uint32(98).fork()).ldelim();
    }
    if (message.previousSession !== void 0) {
      MarketSession.encode(message.previousSession, writer.uint32(106).fork()).ldelim();
    }
    if (message.regional === true) {
      writer.uint32(112).bool(message.regional);
    }
    if (message.zSession !== void 0) {
      MarketSession.encode(message.zSession, writer.uint32(122).fork()).ldelim();
    }
    if (message.news !== void 0) {
      News.encode(message.news, writer.uint32(162).fork()).ldelim();
    }
    if (message.clearBook !== void 0) {
      ClearBook.encode(message.clearBook, writer.uint32(170).fork()).ldelim();
    }
    if (message.instrumentStatus !== void 0) {
      InstrumentStatus.encode(message.instrumentStatus, writer.uint32(178).fork()).ldelim();
    }
    if (message.bbo !== void 0) {
      BestBidOffer.encode(message.bbo, writer.uint32(186).fork()).ldelim();
    }
    if (message.depthPriceLevel !== void 0) {
      DepthPriceLevel.encode(message.depthPriceLevel, writer.uint32(194).fork()).ldelim();
    }
    if (message.depthOrder !== void 0) {
      DepthOrder.encode(message.depthOrder, writer.uint32(202).fork()).ldelim();
    }
    if (message.index !== void 0) {
      IndexValue.encode(message.index, writer.uint32(210).fork()).ldelim();
    }
    if (message.trades !== void 0) {
      Trades.encode(message.trades, writer.uint32(218).fork()).ldelim();
    }
    if (message.open !== void 0) {
      Open.encode(message.open, writer.uint32(226).fork()).ldelim();
    }
    if (message.high !== void 0) {
      High.encode(message.high, writer.uint32(234).fork()).ldelim();
    }
    if (message.low !== void 0) {
      Low.encode(message.low, writer.uint32(242).fork()).ldelim();
    }
    if (message.close !== void 0) {
      Close.encode(message.close, writer.uint32(250).fork()).ldelim();
    }
    if (message.prevClose !== void 0) {
      PrevClose.encode(message.prevClose, writer.uint32(258).fork()).ldelim();
    }
    if (message.last !== void 0) {
      Last.encode(message.last, writer.uint32(266).fork()).ldelim();
    }
    if (message.yearHigh !== void 0) {
      YearHigh.encode(message.yearHigh, writer.uint32(274).fork()).ldelim();
    }
    if (message.yearLow !== void 0) {
      YearLow.encode(message.yearLow, writer.uint32(282).fork()).ldelim();
    }
    if (message.volume !== void 0) {
      Volume.encode(message.volume, writer.uint32(290).fork()).ldelim();
    }
    if (message.settlement !== void 0) {
      Settlement.encode(message.settlement, writer.uint32(298).fork()).ldelim();
    }
    if (message.openInterest !== void 0) {
      OpenInterest.encode(message.openInterest, writer.uint32(306).fork()).ldelim();
    }
    if (message.vwap !== void 0) {
      Vwap.encode(message.vwap, writer.uint32(314).fork()).ldelim();
    }
    if (message.dividendsIncomeDistributions !== void 0) {
      DividendsIncomeDistributions.encode(message.dividendsIncomeDistributions, writer.uint32(322).fork()).ldelim();
    }
    if (message.numberOfTrades !== void 0) {
      NumberOfTrades.encode(message.numberOfTrades, writer.uint32(330).fork()).ldelim();
    }
    if (message.monetaryValue !== void 0) {
      MonetaryValue.encode(message.monetaryValue, writer.uint32(338).fork()).ldelim();
    }
    if (message.capitalDistributions !== void 0) {
      CapitalDistributions.encode(message.capitalDistributions, writer.uint32(346).fork()).ldelim();
    }
    if (message.sharesOutstanding !== void 0) {
      SharesOutstanding.encode(message.sharesOutstanding, writer.uint32(354).fork()).ldelim();
    }
    if (message.netAssetValue !== void 0) {
      NetAssetValue.encode(message.netAssetValue, writer.uint32(362).fork()).ldelim();
    }
    if (message.marketSummary !== void 0) {
      MarketSummary.encode(message.marketSummary, writer.uint32(370).fork()).ldelim();
    }
    if (message.highRolling !== void 0) {
      HighRolling.encode(message.highRolling, writer.uint32(378).fork()).ldelim();
    }
    if (message.lowRolling !== void 0) {
      LowRolling.encode(message.lowRolling, writer.uint32(386).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMarketUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.sint64();
          break;
        case 2:
          message.symbol = reader.string();
          break;
        case 3:
          message.transactionTime = reader.sint64();
          break;
        case 4:
          message.distributionTime = reader.sint64();
          break;
        case 5:
          message.marketSequence = reader.sint64();
          break;
        case 6:
          message.sourceSequence = reader.sint64();
          break;
        case 7:
          message.originatorId = reader.bytes();
          break;
        case 9:
          message.priceDenominator = reader.sint32();
          break;
        case 10:
          message.context = Context.decode(reader, reader.uint32());
          break;
        case 11:
          message.session = MarketSession.decode(reader, reader.uint32());
          break;
        case 12:
          message.tSession = MarketSession.decode(reader, reader.uint32());
          break;
        case 13:
          message.previousSession = MarketSession.decode(reader, reader.uint32());
          break;
        case 14:
          message.regional = reader.bool();
          break;
        case 15:
          message.zSession = MarketSession.decode(reader, reader.uint32());
          break;
        case 20:
          message.news = News.decode(reader, reader.uint32());
          break;
        case 21:
          message.clearBook = ClearBook.decode(reader, reader.uint32());
          break;
        case 22:
          message.instrumentStatus = InstrumentStatus.decode(reader, reader.uint32());
          break;
        case 23:
          message.bbo = BestBidOffer.decode(reader, reader.uint32());
          break;
        case 24:
          message.depthPriceLevel = DepthPriceLevel.decode(reader, reader.uint32());
          break;
        case 25:
          message.depthOrder = DepthOrder.decode(reader, reader.uint32());
          break;
        case 26:
          message.index = IndexValue.decode(reader, reader.uint32());
          break;
        case 27:
          message.trades = Trades.decode(reader, reader.uint32());
          break;
        case 28:
          message.open = Open.decode(reader, reader.uint32());
          break;
        case 29:
          message.high = High.decode(reader, reader.uint32());
          break;
        case 30:
          message.low = Low.decode(reader, reader.uint32());
          break;
        case 31:
          message.close = Close.decode(reader, reader.uint32());
          break;
        case 32:
          message.prevClose = PrevClose.decode(reader, reader.uint32());
          break;
        case 33:
          message.last = Last.decode(reader, reader.uint32());
          break;
        case 34:
          message.yearHigh = YearHigh.decode(reader, reader.uint32());
          break;
        case 35:
          message.yearLow = YearLow.decode(reader, reader.uint32());
          break;
        case 36:
          message.volume = Volume.decode(reader, reader.uint32());
          break;
        case 37:
          message.settlement = Settlement.decode(reader, reader.uint32());
          break;
        case 38:
          message.openInterest = OpenInterest.decode(reader, reader.uint32());
          break;
        case 39:
          message.vwap = Vwap.decode(reader, reader.uint32());
          break;
        case 40:
          message.dividendsIncomeDistributions = DividendsIncomeDistributions.decode(reader, reader.uint32());
          break;
        case 41:
          message.numberOfTrades = NumberOfTrades.decode(reader, reader.uint32());
          break;
        case 42:
          message.monetaryValue = MonetaryValue.decode(reader, reader.uint32());
          break;
        case 43:
          message.capitalDistributions = CapitalDistributions.decode(reader, reader.uint32());
          break;
        case 44:
          message.sharesOutstanding = SharesOutstanding.decode(reader, reader.uint32());
          break;
        case 45:
          message.netAssetValue = NetAssetValue.decode(reader, reader.uint32());
          break;
        case 46:
          message.marketSummary = MarketSummary.decode(reader, reader.uint32());
          break;
        case 47:
          message.highRolling = HighRolling.decode(reader, reader.uint32());
          break;
        case 48:
          message.lowRolling = LowRolling.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      marketId: isSet2(object.marketId) ? long_default.fromValue(object.marketId) : long_default.ZERO,
      symbol: isSet2(object.symbol) ? String(object.symbol) : "",
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      distributionTime: isSet2(object.distributionTime) ? long_default.fromValue(object.distributionTime) : long_default.ZERO,
      marketSequence: isSet2(object.marketSequence) ? long_default.fromValue(object.marketSequence) : long_default.ZERO,
      sourceSequence: isSet2(object.sourceSequence) ? long_default.fromValue(object.sourceSequence) : long_default.ZERO,
      originatorId: isSet2(object.originatorId) ? bytesFromBase642(object.originatorId) : new Uint8Array(),
      priceDenominator: isSet2(object.priceDenominator) ? Number(object.priceDenominator) : 0,
      context: isSet2(object.context) ? Context.fromJSON(object.context) : void 0,
      session: isSet2(object.session) ? MarketSession.fromJSON(object.session) : void 0,
      tSession: isSet2(object.tSession) ? MarketSession.fromJSON(object.tSession) : void 0,
      previousSession: isSet2(object.previousSession) ? MarketSession.fromJSON(object.previousSession) : void 0,
      regional: isSet2(object.regional) ? Boolean(object.regional) : false,
      zSession: isSet2(object.zSession) ? MarketSession.fromJSON(object.zSession) : void 0,
      news: isSet2(object.news) ? News.fromJSON(object.news) : void 0,
      clearBook: isSet2(object.clearBook) ? ClearBook.fromJSON(object.clearBook) : void 0,
      instrumentStatus: isSet2(object.instrumentStatus) ? InstrumentStatus.fromJSON(object.instrumentStatus) : void 0,
      bbo: isSet2(object.bbo) ? BestBidOffer.fromJSON(object.bbo) : void 0,
      depthPriceLevel: isSet2(object.depthPriceLevel) ? DepthPriceLevel.fromJSON(object.depthPriceLevel) : void 0,
      depthOrder: isSet2(object.depthOrder) ? DepthOrder.fromJSON(object.depthOrder) : void 0,
      index: isSet2(object.index) ? IndexValue.fromJSON(object.index) : void 0,
      trades: isSet2(object.trades) ? Trades.fromJSON(object.trades) : void 0,
      open: isSet2(object.open) ? Open.fromJSON(object.open) : void 0,
      high: isSet2(object.high) ? High.fromJSON(object.high) : void 0,
      low: isSet2(object.low) ? Low.fromJSON(object.low) : void 0,
      close: isSet2(object.close) ? Close.fromJSON(object.close) : void 0,
      prevClose: isSet2(object.prevClose) ? PrevClose.fromJSON(object.prevClose) : void 0,
      last: isSet2(object.last) ? Last.fromJSON(object.last) : void 0,
      yearHigh: isSet2(object.yearHigh) ? YearHigh.fromJSON(object.yearHigh) : void 0,
      yearLow: isSet2(object.yearLow) ? YearLow.fromJSON(object.yearLow) : void 0,
      volume: isSet2(object.volume) ? Volume.fromJSON(object.volume) : void 0,
      settlement: isSet2(object.settlement) ? Settlement.fromJSON(object.settlement) : void 0,
      openInterest: isSet2(object.openInterest) ? OpenInterest.fromJSON(object.openInterest) : void 0,
      vwap: isSet2(object.vwap) ? Vwap.fromJSON(object.vwap) : void 0,
      dividendsIncomeDistributions: isSet2(object.dividendsIncomeDistributions) ? DividendsIncomeDistributions.fromJSON(object.dividendsIncomeDistributions) : void 0,
      numberOfTrades: isSet2(object.numberOfTrades) ? NumberOfTrades.fromJSON(object.numberOfTrades) : void 0,
      monetaryValue: isSet2(object.monetaryValue) ? MonetaryValue.fromJSON(object.monetaryValue) : void 0,
      capitalDistributions: isSet2(object.capitalDistributions) ? CapitalDistributions.fromJSON(object.capitalDistributions) : void 0,
      sharesOutstanding: isSet2(object.sharesOutstanding) ? SharesOutstanding.fromJSON(object.sharesOutstanding) : void 0,
      netAssetValue: isSet2(object.netAssetValue) ? NetAssetValue.fromJSON(object.netAssetValue) : void 0,
      marketSummary: isSet2(object.marketSummary) ? MarketSummary.fromJSON(object.marketSummary) : void 0,
      highRolling: isSet2(object.highRolling) ? HighRolling.fromJSON(object.highRolling) : void 0,
      lowRolling: isSet2(object.lowRolling) ? LowRolling.fromJSON(object.lowRolling) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.marketId !== void 0 && (obj.marketId = (message.marketId || long_default.ZERO).toString());
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.distributionTime !== void 0 && (obj.distributionTime = (message.distributionTime || long_default.ZERO).toString());
    message.marketSequence !== void 0 && (obj.marketSequence = (message.marketSequence || long_default.ZERO).toString());
    message.sourceSequence !== void 0 && (obj.sourceSequence = (message.sourceSequence || long_default.ZERO).toString());
    message.originatorId !== void 0 && (obj.originatorId = base64FromBytes2(
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
    const message = createBaseMarketUpdate();
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? long_default.fromValue(object.marketId) : long_default.ZERO;
    message.symbol = object.symbol ?? "";
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.distributionTime = object.distributionTime !== void 0 && object.distributionTime !== null ? long_default.fromValue(object.distributionTime) : long_default.ZERO;
    message.marketSequence = object.marketSequence !== void 0 && object.marketSequence !== null ? long_default.fromValue(object.marketSequence) : long_default.ZERO;
    message.sourceSequence = object.sourceSequence !== void 0 && object.sourceSequence !== null ? long_default.fromValue(object.sourceSequence) : long_default.ZERO;
    message.originatorId = object.originatorId ?? new Uint8Array();
    message.priceDenominator = object.priceDenominator ?? 0;
    message.context = object.context !== void 0 && object.context !== null ? Context.fromPartial(object.context) : void 0;
    message.session = object.session !== void 0 && object.session !== null ? MarketSession.fromPartial(object.session) : void 0;
    message.tSession = object.tSession !== void 0 && object.tSession !== null ? MarketSession.fromPartial(object.tSession) : void 0;
    message.previousSession = object.previousSession !== void 0 && object.previousSession !== null ? MarketSession.fromPartial(object.previousSession) : void 0;
    message.regional = object.regional ?? false;
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
var DepthPriceLevel = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    for (const v of message.levels) {
      DepthPriceLevel_Entry.encode(v, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseDepthPriceLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.levels.push(DepthPriceLevel_Entry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
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
var DepthPriceLevel_Entry = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.addPriceLevel !== void 0) {
      AddPriceLevel.encode(message.addPriceLevel, writer.uint32(10).fork()).ldelim();
    }
    if (message.deletePriceLevel !== void 0) {
      DeletePriceLevel.encode(message.deletePriceLevel, writer.uint32(18).fork()).ldelim();
    }
    if (message.modifyPriceLevel !== void 0) {
      ModifyPriceLevel.encode(message.modifyPriceLevel, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseDepthPriceLevel_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addPriceLevel = AddPriceLevel.decode(reader, reader.uint32());
          break;
        case 2:
          message.deletePriceLevel = DeletePriceLevel.decode(reader, reader.uint32());
          break;
        case 3:
          message.modifyPriceLevel = ModifyPriceLevel.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      addPriceLevel: isSet2(object.addPriceLevel) ? AddPriceLevel.fromJSON(object.addPriceLevel) : void 0,
      deletePriceLevel: isSet2(object.deletePriceLevel) ? DeletePriceLevel.fromJSON(object.deletePriceLevel) : void 0,
      modifyPriceLevel: isSet2(object.modifyPriceLevel) ? ModifyPriceLevel.fromJSON(object.modifyPriceLevel) : void 0
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
var DepthOrder = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    for (const v of message.orders) {
      DepthOrder_Entry.encode(v, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseDepthOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orders.push(DepthOrder_Entry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
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
var DepthOrder_Entry = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.addOrder !== void 0) {
      AddOrder.encode(message.addOrder, writer.uint32(10).fork()).ldelim();
    }
    if (message.deleteOrder !== void 0) {
      DeleteOrder.encode(message.deleteOrder, writer.uint32(18).fork()).ldelim();
    }
    if (message.modifyOrder !== void 0) {
      ModifyOrder.encode(message.modifyOrder, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseDepthOrder_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addOrder = AddOrder.decode(reader, reader.uint32());
          break;
        case 2:
          message.deleteOrder = DeleteOrder.decode(reader, reader.uint32());
          break;
        case 3:
          message.modifyOrder = ModifyOrder.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      addOrder: isSet2(object.addOrder) ? AddOrder.fromJSON(object.addOrder) : void 0,
      deleteOrder: isSet2(object.deleteOrder) ? DeleteOrder.fromJSON(object.deleteOrder) : void 0,
      modifyOrder: isSet2(object.modifyOrder) ? ModifyOrder.fromJSON(object.modifyOrder) : void 0
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
  return { originationTime: long_default.ZERO, source: "", languageCode: "", headLine: "", text: "", symbols: [] };
}
var News = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.originationTime.isZero()) {
      writer.uint32(8).sint64(message.originationTime);
    }
    if (message.source !== "") {
      writer.uint32(18).string(message.source);
    }
    if (message.languageCode !== "") {
      writer.uint32(26).string(message.languageCode);
    }
    if (message.headLine !== "") {
      writer.uint32(34).string(message.headLine);
    }
    if (message.text !== "") {
      writer.uint32(42).string(message.text);
    }
    for (const v of message.symbols) {
      writer.uint32(50).string(v);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseNews();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.originationTime = reader.sint64();
          break;
        case 2:
          message.source = reader.string();
          break;
        case 3:
          message.languageCode = reader.string();
          break;
        case 4:
          message.headLine = reader.string();
          break;
        case 5:
          message.text = reader.string();
          break;
        case 6:
          message.symbols.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      originationTime: isSet2(object.originationTime) ? long_default.fromValue(object.originationTime) : long_default.ZERO,
      source: isSet2(object.source) ? String(object.source) : "",
      languageCode: isSet2(object.languageCode) ? String(object.languageCode) : "",
      headLine: isSet2(object.headLine) ? String(object.headLine) : "",
      text: isSet2(object.text) ? String(object.text) : "",
      symbols: Array.isArray(object == null ? void 0 : object.symbols) ? object.symbols.map((e) => String(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.originationTime !== void 0 && (obj.originationTime = (message.originationTime || long_default.ZERO).toString());
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
    var _a;
    const message = createBaseNews();
    message.originationTime = object.originationTime !== void 0 && object.originationTime !== null ? long_default.fromValue(object.originationTime) : long_default.ZERO;
    message.source = object.source ?? "";
    message.languageCode = object.languageCode ?? "";
    message.headLine = object.headLine ?? "";
    message.text = object.text ?? "";
    message.symbols = ((_a = object.symbols) == null ? void 0 : _a.map((e) => e)) || [];
    return message;
  }
};
function createBaseClearBook() {
  return { reserved: 0, transactionTime: long_default.ZERO };
}
var ClearBook = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.reserved !== 0) {
      writer.uint32(8).sint32(message.reserved);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(16).sint64(message.transactionTime);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseClearBook();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserved = reader.sint32();
          break;
        case 2:
          message.transactionTime = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      reserved: isSet2(object.reserved) ? Number(object.reserved) : 0,
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.reserved !== void 0 && (obj.reserved = Math.round(message.reserved));
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseClearBook();
    message.reserved = object.reserved ?? 0;
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    return message;
  }
};
function createBaseInstrumentStatus() {
  return {
    transactionTime: long_default.ZERO,
    tradingStatus: 0,
    openingTime: long_default.ZERO,
    note: "",
    tradeDate: 0,
    regulationSHOShortSalePriceTest: 0
  };
}
var InstrumentStatus = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradingStatus !== 0) {
      writer.uint32(80).int32(message.tradingStatus);
    }
    if (!message.openingTime.isZero()) {
      writer.uint32(88).sint64(message.openingTime);
    }
    if (message.note !== "") {
      writer.uint32(98).string(message.note);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(104).sint32(message.tradeDate);
    }
    if (message.regulationSHOShortSalePriceTest !== 0) {
      writer.uint32(112).int32(message.regulationSHOShortSalePriceTest);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradingStatus = reader.int32();
          break;
        case 11:
          message.openingTime = reader.sint64();
          break;
        case 12:
          message.note = reader.string();
          break;
        case 13:
          message.tradeDate = reader.sint32();
          break;
        case 14:
          message.regulationSHOShortSalePriceTest = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradingStatus: isSet2(object.tradingStatus) ? instrumentTradingStatusFromJSON(object.tradingStatus) : 0,
      openingTime: isSet2(object.openingTime) ? long_default.fromValue(object.openingTime) : long_default.ZERO,
      note: isSet2(object.note) ? String(object.note) : "",
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      regulationSHOShortSalePriceTest: isSet2(object.regulationSHOShortSalePriceTest) ? regulationSHOShortSalePriceTestFromJSON(object.regulationSHOShortSalePriceTest) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradingStatus !== void 0 && (obj.tradingStatus = instrumentTradingStatusToJSON(message.tradingStatus));
    message.openingTime !== void 0 && (obj.openingTime = (message.openingTime || long_default.ZERO).toString());
    message.note !== void 0 && (obj.note = message.note);
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.regulationSHOShortSalePriceTest !== void 0 && (obj.regulationSHOShortSalePriceTest = regulationSHOShortSalePriceTestToJSON(
      message.regulationSHOShortSalePriceTest
    ));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseInstrumentStatus();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradingStatus = object.tradingStatus ?? 0;
    message.openingTime = object.openingTime !== void 0 && object.openingTime !== null ? long_default.fromValue(object.openingTime) : long_default.ZERO;
    message.note = object.note ?? "";
    message.tradeDate = object.tradeDate ?? 0;
    message.regulationSHOShortSalePriceTest = object.regulationSHOShortSalePriceTest ?? 0;
    return message;
  }
};
function createBaseBestBidOffer() {
  return {
    transactionTime: long_default.ZERO,
    bidPrice: long_default.ZERO,
    bidQuantity: long_default.ZERO,
    bidOrderCount: 0,
    bidOriginator: new Uint8Array(),
    bidQuoteCondition: new Uint8Array(),
    offerPrice: long_default.ZERO,
    offerQuantity: long_default.ZERO,
    offerOrderCount: 0,
    offerOriginator: new Uint8Array(),
    offerQuoteCondition: new Uint8Array(),
    quoteCondition: new Uint8Array(),
    regional: false,
    transient: false
  };
}
var BestBidOffer = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.bidPrice.isZero()) {
      writer.uint32(80).sint64(message.bidPrice);
    }
    if (!message.bidQuantity.isZero()) {
      writer.uint32(88).sint64(message.bidQuantity);
    }
    if (message.bidOrderCount !== 0) {
      writer.uint32(96).sint32(message.bidOrderCount);
    }
    if (message.bidOriginator.length !== 0) {
      writer.uint32(106).bytes(message.bidOriginator);
    }
    if (message.bidQuoteCondition.length !== 0) {
      writer.uint32(114).bytes(message.bidQuoteCondition);
    }
    if (!message.offerPrice.isZero()) {
      writer.uint32(160).sint64(message.offerPrice);
    }
    if (!message.offerQuantity.isZero()) {
      writer.uint32(168).sint64(message.offerQuantity);
    }
    if (message.offerOrderCount !== 0) {
      writer.uint32(176).sint32(message.offerOrderCount);
    }
    if (message.offerOriginator.length !== 0) {
      writer.uint32(186).bytes(message.offerOriginator);
    }
    if (message.offerQuoteCondition.length !== 0) {
      writer.uint32(194).bytes(message.offerQuoteCondition);
    }
    if (message.quoteCondition.length !== 0) {
      writer.uint32(242).bytes(message.quoteCondition);
    }
    if (message.regional === true) {
      writer.uint32(256).bool(message.regional);
    }
    if (message.transient === true) {
      writer.uint32(264).bool(message.transient);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseBestBidOffer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.bidPrice = reader.sint64();
          break;
        case 11:
          message.bidQuantity = reader.sint64();
          break;
        case 12:
          message.bidOrderCount = reader.sint32();
          break;
        case 13:
          message.bidOriginator = reader.bytes();
          break;
        case 14:
          message.bidQuoteCondition = reader.bytes();
          break;
        case 20:
          message.offerPrice = reader.sint64();
          break;
        case 21:
          message.offerQuantity = reader.sint64();
          break;
        case 22:
          message.offerOrderCount = reader.sint32();
          break;
        case 23:
          message.offerOriginator = reader.bytes();
          break;
        case 24:
          message.offerQuoteCondition = reader.bytes();
          break;
        case 30:
          message.quoteCondition = reader.bytes();
          break;
        case 32:
          message.regional = reader.bool();
          break;
        case 33:
          message.transient = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      bidPrice: isSet2(object.bidPrice) ? long_default.fromValue(object.bidPrice) : long_default.ZERO,
      bidQuantity: isSet2(object.bidQuantity) ? long_default.fromValue(object.bidQuantity) : long_default.ZERO,
      bidOrderCount: isSet2(object.bidOrderCount) ? Number(object.bidOrderCount) : 0,
      bidOriginator: isSet2(object.bidOriginator) ? bytesFromBase642(object.bidOriginator) : new Uint8Array(),
      bidQuoteCondition: isSet2(object.bidQuoteCondition) ? bytesFromBase642(object.bidQuoteCondition) : new Uint8Array(),
      offerPrice: isSet2(object.offerPrice) ? long_default.fromValue(object.offerPrice) : long_default.ZERO,
      offerQuantity: isSet2(object.offerQuantity) ? long_default.fromValue(object.offerQuantity) : long_default.ZERO,
      offerOrderCount: isSet2(object.offerOrderCount) ? Number(object.offerOrderCount) : 0,
      offerOriginator: isSet2(object.offerOriginator) ? bytesFromBase642(object.offerOriginator) : new Uint8Array(),
      offerQuoteCondition: isSet2(object.offerQuoteCondition) ? bytesFromBase642(object.offerQuoteCondition) : new Uint8Array(),
      quoteCondition: isSet2(object.quoteCondition) ? bytesFromBase642(object.quoteCondition) : new Uint8Array(),
      regional: isSet2(object.regional) ? Boolean(object.regional) : false,
      transient: isSet2(object.transient) ? Boolean(object.transient) : false
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.bidPrice !== void 0 && (obj.bidPrice = (message.bidPrice || long_default.ZERO).toString());
    message.bidQuantity !== void 0 && (obj.bidQuantity = (message.bidQuantity || long_default.ZERO).toString());
    message.bidOrderCount !== void 0 && (obj.bidOrderCount = Math.round(message.bidOrderCount));
    message.bidOriginator !== void 0 && (obj.bidOriginator = base64FromBytes2(
      message.bidOriginator !== void 0 ? message.bidOriginator : new Uint8Array()
    ));
    message.bidQuoteCondition !== void 0 && (obj.bidQuoteCondition = base64FromBytes2(
      message.bidQuoteCondition !== void 0 ? message.bidQuoteCondition : new Uint8Array()
    ));
    message.offerPrice !== void 0 && (obj.offerPrice = (message.offerPrice || long_default.ZERO).toString());
    message.offerQuantity !== void 0 && (obj.offerQuantity = (message.offerQuantity || long_default.ZERO).toString());
    message.offerOrderCount !== void 0 && (obj.offerOrderCount = Math.round(message.offerOrderCount));
    message.offerOriginator !== void 0 && (obj.offerOriginator = base64FromBytes2(
      message.offerOriginator !== void 0 ? message.offerOriginator : new Uint8Array()
    ));
    message.offerQuoteCondition !== void 0 && (obj.offerQuoteCondition = base64FromBytes2(
      message.offerQuoteCondition !== void 0 ? message.offerQuoteCondition : new Uint8Array()
    ));
    message.quoteCondition !== void 0 && (obj.quoteCondition = base64FromBytes2(
      message.quoteCondition !== void 0 ? message.quoteCondition : new Uint8Array()
    ));
    message.regional !== void 0 && (obj.regional = message.regional);
    message.transient !== void 0 && (obj.transient = message.transient);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseBestBidOffer();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.bidPrice = object.bidPrice !== void 0 && object.bidPrice !== null ? long_default.fromValue(object.bidPrice) : long_default.ZERO;
    message.bidQuantity = object.bidQuantity !== void 0 && object.bidQuantity !== null ? long_default.fromValue(object.bidQuantity) : long_default.ZERO;
    message.bidOrderCount = object.bidOrderCount ?? 0;
    message.bidOriginator = object.bidOriginator ?? new Uint8Array();
    message.bidQuoteCondition = object.bidQuoteCondition ?? new Uint8Array();
    message.offerPrice = object.offerPrice !== void 0 && object.offerPrice !== null ? long_default.fromValue(object.offerPrice) : long_default.ZERO;
    message.offerQuantity = object.offerQuantity !== void 0 && object.offerQuantity !== null ? long_default.fromValue(object.offerQuantity) : long_default.ZERO;
    message.offerOrderCount = object.offerOrderCount ?? 0;
    message.offerOriginator = object.offerOriginator ?? new Uint8Array();
    message.offerQuoteCondition = object.offerQuoteCondition ?? new Uint8Array();
    message.quoteCondition = object.quoteCondition ?? new Uint8Array();
    message.regional = object.regional ?? false;
    message.transient = object.transient ?? false;
    return message;
  }
};
function createBaseAddPriceLevel() {
  return {
    transactionTime: long_default.ZERO,
    level: 0,
    side: 0,
    price: long_default.ZERO,
    quantity: long_default.ZERO,
    orderCount: 0,
    impliedQuantity: long_default.ZERO
  };
}
var AddPriceLevel = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.level !== 0) {
      writer.uint32(80).sint32(message.level);
    }
    if (message.side !== 0) {
      writer.uint32(88).int32(message.side);
    }
    if (!message.price.isZero()) {
      writer.uint32(96).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(104).sint64(message.quantity);
    }
    if (message.orderCount !== 0) {
      writer.uint32(112).sint32(message.orderCount);
    }
    if (!message.impliedQuantity.isZero()) {
      writer.uint32(120).sint64(message.impliedQuantity);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAddPriceLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.level = reader.sint32();
          break;
        case 11:
          message.side = reader.int32();
          break;
        case 12:
          message.price = reader.sint64();
          break;
        case 13:
          message.quantity = reader.sint64();
          break;
        case 14:
          message.orderCount = reader.sint32();
          break;
        case 15:
          message.impliedQuantity = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      level: isSet2(object.level) ? Number(object.level) : 0,
      side: isSet2(object.side) ? bookSideFromJSON(object.side) : 0,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      quantity: isSet2(object.quantity) ? long_default.fromValue(object.quantity) : long_default.ZERO,
      orderCount: isSet2(object.orderCount) ? Number(object.orderCount) : 0,
      impliedQuantity: isSet2(object.impliedQuantity) ? long_default.fromValue(object.impliedQuantity) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.level !== void 0 && (obj.level = Math.round(message.level));
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || long_default.ZERO).toString());
    message.orderCount !== void 0 && (obj.orderCount = Math.round(message.orderCount));
    message.impliedQuantity !== void 0 && (obj.impliedQuantity = (message.impliedQuantity || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseAddPriceLevel();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.level = object.level ?? 0;
    message.side = object.side ?? 0;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? long_default.fromValue(object.quantity) : long_default.ZERO;
    message.orderCount = object.orderCount ?? 0;
    message.impliedQuantity = object.impliedQuantity !== void 0 && object.impliedQuantity !== null ? long_default.fromValue(object.impliedQuantity) : long_default.ZERO;
    return message;
  }
};
function createBaseDeletePriceLevel() {
  return { transactionTime: long_default.ZERO, level: 0, side: 0 };
}
var DeletePriceLevel = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.level !== 0) {
      writer.uint32(80).sint32(message.level);
    }
    if (message.side !== 0) {
      writer.uint32(88).int32(message.side);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseDeletePriceLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.level = reader.sint32();
          break;
        case 11:
          message.side = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      level: isSet2(object.level) ? Number(object.level) : 0,
      side: isSet2(object.side) ? bookSideFromJSON(object.side) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.level !== void 0 && (obj.level = Math.round(message.level));
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseDeletePriceLevel();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.level = object.level ?? 0;
    message.side = object.side ?? 0;
    return message;
  }
};
function createBaseModifyPriceLevel() {
  return {
    transactionTime: long_default.ZERO,
    level: 0,
    side: 0,
    price: long_default.ZERO,
    quantity: long_default.ZERO,
    orderCount: 0,
    impliedQuantity: long_default.ZERO
  };
}
var ModifyPriceLevel = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.level !== 0) {
      writer.uint32(80).sint32(message.level);
    }
    if (message.side !== 0) {
      writer.uint32(88).int32(message.side);
    }
    if (!message.price.isZero()) {
      writer.uint32(96).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(104).sint64(message.quantity);
    }
    if (message.orderCount !== 0) {
      writer.uint32(112).sint32(message.orderCount);
    }
    if (!message.impliedQuantity.isZero()) {
      writer.uint32(120).sint64(message.impliedQuantity);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseModifyPriceLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.level = reader.sint32();
          break;
        case 11:
          message.side = reader.int32();
          break;
        case 12:
          message.price = reader.sint64();
          break;
        case 13:
          message.quantity = reader.sint64();
          break;
        case 14:
          message.orderCount = reader.sint32();
          break;
        case 15:
          message.impliedQuantity = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      level: isSet2(object.level) ? Number(object.level) : 0,
      side: isSet2(object.side) ? bookSideFromJSON(object.side) : 0,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      quantity: isSet2(object.quantity) ? long_default.fromValue(object.quantity) : long_default.ZERO,
      orderCount: isSet2(object.orderCount) ? Number(object.orderCount) : 0,
      impliedQuantity: isSet2(object.impliedQuantity) ? long_default.fromValue(object.impliedQuantity) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.level !== void 0 && (obj.level = Math.round(message.level));
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || long_default.ZERO).toString());
    message.orderCount !== void 0 && (obj.orderCount = Math.round(message.orderCount));
    message.impliedQuantity !== void 0 && (obj.impliedQuantity = (message.impliedQuantity || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseModifyPriceLevel();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.level = object.level ?? 0;
    message.side = object.side ?? 0;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? long_default.fromValue(object.quantity) : long_default.ZERO;
    message.orderCount = object.orderCount ?? 0;
    message.impliedQuantity = object.impliedQuantity !== void 0 && object.impliedQuantity !== null ? long_default.fromValue(object.impliedQuantity) : long_default.ZERO;
    return message;
  }
};
function createBaseAddOrder() {
  return {
    transactionTime: long_default.ZERO,
    orderId: long_default.ZERO,
    side: 0,
    price: long_default.ZERO,
    quantity: long_default.ZERO,
    isImplied: false,
    priority: long_default.ZERO
  };
}
var AddOrder = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.orderId.isZero()) {
      writer.uint32(80).sint64(message.orderId);
    }
    if (message.side !== 0) {
      writer.uint32(88).int32(message.side);
    }
    if (!message.price.isZero()) {
      writer.uint32(96).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(104).sint64(message.quantity);
    }
    if (message.isImplied === true) {
      writer.uint32(112).bool(message.isImplied);
    }
    if (!message.priority.isZero()) {
      writer.uint32(120).sint64(message.priority);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAddOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.orderId = reader.sint64();
          break;
        case 11:
          message.side = reader.int32();
          break;
        case 12:
          message.price = reader.sint64();
          break;
        case 13:
          message.quantity = reader.sint64();
          break;
        case 14:
          message.isImplied = reader.bool();
          break;
        case 15:
          message.priority = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      orderId: isSet2(object.orderId) ? long_default.fromValue(object.orderId) : long_default.ZERO,
      side: isSet2(object.side) ? bookSideFromJSON(object.side) : 0,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      quantity: isSet2(object.quantity) ? long_default.fromValue(object.quantity) : long_default.ZERO,
      isImplied: isSet2(object.isImplied) ? Boolean(object.isImplied) : false,
      priority: isSet2(object.priority) ? long_default.fromValue(object.priority) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.orderId !== void 0 && (obj.orderId = (message.orderId || long_default.ZERO).toString());
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || long_default.ZERO).toString());
    message.isImplied !== void 0 && (obj.isImplied = message.isImplied);
    message.priority !== void 0 && (obj.priority = (message.priority || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseAddOrder();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.orderId = object.orderId !== void 0 && object.orderId !== null ? long_default.fromValue(object.orderId) : long_default.ZERO;
    message.side = object.side ?? 0;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? long_default.fromValue(object.quantity) : long_default.ZERO;
    message.isImplied = object.isImplied ?? false;
    message.priority = object.priority !== void 0 && object.priority !== null ? long_default.fromValue(object.priority) : long_default.ZERO;
    return message;
  }
};
function createBaseDeleteOrder() {
  return { transactionTime: long_default.ZERO, orderId: long_default.ZERO, side: 0 };
}
var DeleteOrder = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.orderId.isZero()) {
      writer.uint32(80).sint64(message.orderId);
    }
    if (message.side !== 0) {
      writer.uint32(88).int32(message.side);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseDeleteOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.orderId = reader.sint64();
          break;
        case 11:
          message.side = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      orderId: isSet2(object.orderId) ? long_default.fromValue(object.orderId) : long_default.ZERO,
      side: isSet2(object.side) ? bookSideFromJSON(object.side) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.orderId !== void 0 && (obj.orderId = (message.orderId || long_default.ZERO).toString());
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseDeleteOrder();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.orderId = object.orderId !== void 0 && object.orderId !== null ? long_default.fromValue(object.orderId) : long_default.ZERO;
    message.side = object.side ?? 0;
    return message;
  }
};
function createBaseModifyOrder() {
  return {
    transactionTime: long_default.ZERO,
    orderId: long_default.ZERO,
    side: 0,
    price: long_default.ZERO,
    quantity: long_default.ZERO,
    isImplied: false,
    priority: long_default.ZERO
  };
}
var ModifyOrder = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.orderId.isZero()) {
      writer.uint32(80).sint64(message.orderId);
    }
    if (message.side !== 0) {
      writer.uint32(88).int32(message.side);
    }
    if (!message.price.isZero()) {
      writer.uint32(96).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(104).sint64(message.quantity);
    }
    if (message.isImplied === true) {
      writer.uint32(112).bool(message.isImplied);
    }
    if (!message.priority.isZero()) {
      writer.uint32(120).sint64(message.priority);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseModifyOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.orderId = reader.sint64();
          break;
        case 11:
          message.side = reader.int32();
          break;
        case 12:
          message.price = reader.sint64();
          break;
        case 13:
          message.quantity = reader.sint64();
          break;
        case 14:
          message.isImplied = reader.bool();
          break;
        case 15:
          message.priority = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      orderId: isSet2(object.orderId) ? long_default.fromValue(object.orderId) : long_default.ZERO,
      side: isSet2(object.side) ? bookSideFromJSON(object.side) : 0,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      quantity: isSet2(object.quantity) ? long_default.fromValue(object.quantity) : long_default.ZERO,
      isImplied: isSet2(object.isImplied) ? Boolean(object.isImplied) : false,
      priority: isSet2(object.priority) ? long_default.fromValue(object.priority) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.orderId !== void 0 && (obj.orderId = (message.orderId || long_default.ZERO).toString());
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || long_default.ZERO).toString());
    message.isImplied !== void 0 && (obj.isImplied = message.isImplied);
    message.priority !== void 0 && (obj.priority = (message.priority || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseModifyOrder();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.orderId = object.orderId !== void 0 && object.orderId !== null ? long_default.fromValue(object.orderId) : long_default.ZERO;
    message.side = object.side ?? 0;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? long_default.fromValue(object.quantity) : long_default.ZERO;
    message.isImplied = object.isImplied ?? false;
    message.priority = object.priority !== void 0 && object.priority !== null ? long_default.fromValue(object.priority) : long_default.ZERO;
    return message;
  }
};
function createBaseIndexValue() {
  return {
    transactionTime: long_default.ZERO,
    tradeDate: 0,
    last: long_default.ZERO,
    volume: long_default.ZERO,
    open: long_default.ZERO,
    settlementOpen: long_default.ZERO,
    specialOpen: long_default.ZERO,
    high: long_default.ZERO,
    low: long_default.ZERO,
    close: long_default.ZERO,
    bid: long_default.ZERO,
    offer: long_default.ZERO
  };
}
var IndexValue = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.last.isZero()) {
      writer.uint32(88).sint64(message.last);
    }
    if (!message.volume.isZero()) {
      writer.uint32(96).sint64(message.volume);
    }
    if (!message.open.isZero()) {
      writer.uint32(104).sint64(message.open);
    }
    if (!message.settlementOpen.isZero()) {
      writer.uint32(112).sint64(message.settlementOpen);
    }
    if (!message.specialOpen.isZero()) {
      writer.uint32(120).sint64(message.specialOpen);
    }
    if (!message.high.isZero()) {
      writer.uint32(128).sint64(message.high);
    }
    if (!message.low.isZero()) {
      writer.uint32(136).sint64(message.low);
    }
    if (!message.close.isZero()) {
      writer.uint32(144).sint64(message.close);
    }
    if (!message.bid.isZero()) {
      writer.uint32(152).sint64(message.bid);
    }
    if (!message.offer.isZero()) {
      writer.uint32(160).sint64(message.offer);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseIndexValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.last = reader.sint64();
          break;
        case 12:
          message.volume = reader.sint64();
          break;
        case 13:
          message.open = reader.sint64();
          break;
        case 14:
          message.settlementOpen = reader.sint64();
          break;
        case 15:
          message.specialOpen = reader.sint64();
          break;
        case 16:
          message.high = reader.sint64();
          break;
        case 17:
          message.low = reader.sint64();
          break;
        case 18:
          message.close = reader.sint64();
          break;
        case 19:
          message.bid = reader.sint64();
          break;
        case 20:
          message.offer = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      last: isSet2(object.last) ? long_default.fromValue(object.last) : long_default.ZERO,
      volume: isSet2(object.volume) ? long_default.fromValue(object.volume) : long_default.ZERO,
      open: isSet2(object.open) ? long_default.fromValue(object.open) : long_default.ZERO,
      settlementOpen: isSet2(object.settlementOpen) ? long_default.fromValue(object.settlementOpen) : long_default.ZERO,
      specialOpen: isSet2(object.specialOpen) ? long_default.fromValue(object.specialOpen) : long_default.ZERO,
      high: isSet2(object.high) ? long_default.fromValue(object.high) : long_default.ZERO,
      low: isSet2(object.low) ? long_default.fromValue(object.low) : long_default.ZERO,
      close: isSet2(object.close) ? long_default.fromValue(object.close) : long_default.ZERO,
      bid: isSet2(object.bid) ? long_default.fromValue(object.bid) : long_default.ZERO,
      offer: isSet2(object.offer) ? long_default.fromValue(object.offer) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.last !== void 0 && (obj.last = (message.last || long_default.ZERO).toString());
    message.volume !== void 0 && (obj.volume = (message.volume || long_default.ZERO).toString());
    message.open !== void 0 && (obj.open = (message.open || long_default.ZERO).toString());
    message.settlementOpen !== void 0 && (obj.settlementOpen = (message.settlementOpen || long_default.ZERO).toString());
    message.specialOpen !== void 0 && (obj.specialOpen = (message.specialOpen || long_default.ZERO).toString());
    message.high !== void 0 && (obj.high = (message.high || long_default.ZERO).toString());
    message.low !== void 0 && (obj.low = (message.low || long_default.ZERO).toString());
    message.close !== void 0 && (obj.close = (message.close || long_default.ZERO).toString());
    message.bid !== void 0 && (obj.bid = (message.bid || long_default.ZERO).toString());
    message.offer !== void 0 && (obj.offer = (message.offer || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseIndexValue();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.last = object.last !== void 0 && object.last !== null ? long_default.fromValue(object.last) : long_default.ZERO;
    message.volume = object.volume !== void 0 && object.volume !== null ? long_default.fromValue(object.volume) : long_default.ZERO;
    message.open = object.open !== void 0 && object.open !== null ? long_default.fromValue(object.open) : long_default.ZERO;
    message.settlementOpen = object.settlementOpen !== void 0 && object.settlementOpen !== null ? long_default.fromValue(object.settlementOpen) : long_default.ZERO;
    message.specialOpen = object.specialOpen !== void 0 && object.specialOpen !== null ? long_default.fromValue(object.specialOpen) : long_default.ZERO;
    message.high = object.high !== void 0 && object.high !== null ? long_default.fromValue(object.high) : long_default.ZERO;
    message.low = object.low !== void 0 && object.low !== null ? long_default.fromValue(object.low) : long_default.ZERO;
    message.close = object.close !== void 0 && object.close !== null ? long_default.fromValue(object.close) : long_default.ZERO;
    message.bid = object.bid !== void 0 && object.bid !== null ? long_default.fromValue(object.bid) : long_default.ZERO;
    message.offer = object.offer !== void 0 && object.offer !== null ? long_default.fromValue(object.offer) : long_default.ZERO;
    return message;
  }
};
function createBaseTrades() {
  return { trades: [] };
}
var Trades = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    for (const v of message.trades) {
      Trades_Entry.encode(v, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseTrades();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trades.push(Trades_Entry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
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
var Trades_Entry = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.trade !== void 0) {
      Trade.encode(message.trade, writer.uint32(10).fork()).ldelim();
    }
    if (message.tradeCorrection !== void 0) {
      TradeCorrection.encode(message.tradeCorrection, writer.uint32(18).fork()).ldelim();
    }
    if (message.tradeCancel !== void 0) {
      TradeCancel.encode(message.tradeCancel, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseTrades_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trade = Trade.decode(reader, reader.uint32());
          break;
        case 2:
          message.tradeCorrection = TradeCorrection.decode(reader, reader.uint32());
          break;
        case 3:
          message.tradeCancel = TradeCancel.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      trade: isSet2(object.trade) ? Trade.fromJSON(object.trade) : void 0,
      tradeCorrection: isSet2(object.tradeCorrection) ? TradeCorrection.fromJSON(object.tradeCorrection) : void 0,
      tradeCancel: isSet2(object.tradeCancel) ? TradeCancel.fromJSON(object.tradeCancel) : void 0
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
    transactionTime: long_default.ZERO,
    price: long_default.ZERO,
    quantity: long_default.ZERO,
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
    lastPrice: long_default.ZERO,
    saleCondition: new Uint8Array(),
    currency: "",
    doesNotUpdateLast: false,
    doesNotUpdateVolume: false,
    session: "",
    blockTrade: false,
    distributionTime: long_default.ZERO,
    transactionTime2: long_default.ZERO,
    consolidatedPriceIndicator: "",
    transient: false,
    indexShortName: ""
  };
}
var Trade = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.originatorId.length !== 0) {
      writer.uint32(66).bytes(message.originatorId);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.price.isZero()) {
      writer.uint32(80).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(88).sint64(message.quantity);
    }
    if (message.tradeId.length !== 0) {
      writer.uint32(98).bytes(message.tradeId);
    }
    if (message.side !== 0) {
      writer.uint32(104).int32(message.side);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(112).sint32(message.tradeDate);
    }
    if (message.buyerId.length !== 0) {
      writer.uint32(122).bytes(message.buyerId);
    }
    if (message.sellerId.length !== 0) {
      writer.uint32(130).bytes(message.sellerId);
    }
    if (message.openingTrade === true) {
      writer.uint32(136).bool(message.openingTrade);
    }
    if (message.systemPriced === true) {
      writer.uint32(144).bool(message.systemPriced);
    }
    if (message.marketOnClose === true) {
      writer.uint32(152).bool(message.marketOnClose);
    }
    if (message.oddLot === true) {
      writer.uint32(160).bool(message.oddLot);
    }
    if (message.settlementTerms !== 0) {
      writer.uint32(168).int32(message.settlementTerms);
    }
    if (message.crossType !== 0) {
      writer.uint32(176).int32(message.crossType);
    }
    if (message.byPass === true) {
      writer.uint32(184).bool(message.byPass);
    }
    if (!message.lastPrice.isZero()) {
      writer.uint32(192).sint64(message.lastPrice);
    }
    if (message.saleCondition.length !== 0) {
      writer.uint32(202).bytes(message.saleCondition);
    }
    if (message.currency !== "") {
      writer.uint32(210).string(message.currency);
    }
    if (message.doesNotUpdateLast === true) {
      writer.uint32(216).bool(message.doesNotUpdateLast);
    }
    if (message.doesNotUpdateVolume === true) {
      writer.uint32(224).bool(message.doesNotUpdateVolume);
    }
    if (message.session !== "") {
      writer.uint32(242).string(message.session);
    }
    if (message.blockTrade === true) {
      writer.uint32(248).bool(message.blockTrade);
    }
    if (!message.distributionTime.isZero()) {
      writer.uint32(256).sint64(message.distributionTime);
    }
    if (!message.transactionTime2.isZero()) {
      writer.uint32(264).sint64(message.transactionTime2);
    }
    if (message.consolidatedPriceIndicator !== "") {
      writer.uint32(274).string(message.consolidatedPriceIndicator);
    }
    if (message.transient === true) {
      writer.uint32(280).bool(message.transient);
    }
    if (message.indexShortName !== "") {
      writer.uint32(290).string(message.indexShortName);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseTrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 8:
          message.originatorId = reader.bytes();
          break;
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.price = reader.sint64();
          break;
        case 11:
          message.quantity = reader.sint64();
          break;
        case 12:
          message.tradeId = reader.bytes();
          break;
        case 13:
          message.side = reader.int32();
          break;
        case 14:
          message.tradeDate = reader.sint32();
          break;
        case 15:
          message.buyerId = reader.bytes();
          break;
        case 16:
          message.sellerId = reader.bytes();
          break;
        case 17:
          message.openingTrade = reader.bool();
          break;
        case 18:
          message.systemPriced = reader.bool();
          break;
        case 19:
          message.marketOnClose = reader.bool();
          break;
        case 20:
          message.oddLot = reader.bool();
          break;
        case 21:
          message.settlementTerms = reader.int32();
          break;
        case 22:
          message.crossType = reader.int32();
          break;
        case 23:
          message.byPass = reader.bool();
          break;
        case 24:
          message.lastPrice = reader.sint64();
          break;
        case 25:
          message.saleCondition = reader.bytes();
          break;
        case 26:
          message.currency = reader.string();
          break;
        case 27:
          message.doesNotUpdateLast = reader.bool();
          break;
        case 28:
          message.doesNotUpdateVolume = reader.bool();
          break;
        case 30:
          message.session = reader.string();
          break;
        case 31:
          message.blockTrade = reader.bool();
          break;
        case 32:
          message.distributionTime = reader.sint64();
          break;
        case 33:
          message.transactionTime2 = reader.sint64();
          break;
        case 34:
          message.consolidatedPriceIndicator = reader.string();
          break;
        case 35:
          message.transient = reader.bool();
          break;
        case 36:
          message.indexShortName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      originatorId: isSet2(object.originatorId) ? bytesFromBase642(object.originatorId) : new Uint8Array(),
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      quantity: isSet2(object.quantity) ? long_default.fromValue(object.quantity) : long_default.ZERO,
      tradeId: isSet2(object.tradeId) ? bytesFromBase642(object.tradeId) : new Uint8Array(),
      side: isSet2(object.side) ? bookSideFromJSON(object.side) : 0,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      buyerId: isSet2(object.buyerId) ? bytesFromBase642(object.buyerId) : new Uint8Array(),
      sellerId: isSet2(object.sellerId) ? bytesFromBase642(object.sellerId) : new Uint8Array(),
      openingTrade: isSet2(object.openingTrade) ? Boolean(object.openingTrade) : false,
      systemPriced: isSet2(object.systemPriced) ? Boolean(object.systemPriced) : false,
      marketOnClose: isSet2(object.marketOnClose) ? Boolean(object.marketOnClose) : false,
      oddLot: isSet2(object.oddLot) ? Boolean(object.oddLot) : false,
      settlementTerms: isSet2(object.settlementTerms) ? settlementTermsFromJSON(object.settlementTerms) : 0,
      crossType: isSet2(object.crossType) ? crossTypeFromJSON(object.crossType) : 0,
      byPass: isSet2(object.byPass) ? Boolean(object.byPass) : false,
      lastPrice: isSet2(object.lastPrice) ? long_default.fromValue(object.lastPrice) : long_default.ZERO,
      saleCondition: isSet2(object.saleCondition) ? bytesFromBase642(object.saleCondition) : new Uint8Array(),
      currency: isSet2(object.currency) ? String(object.currency) : "",
      doesNotUpdateLast: isSet2(object.doesNotUpdateLast) ? Boolean(object.doesNotUpdateLast) : false,
      doesNotUpdateVolume: isSet2(object.doesNotUpdateVolume) ? Boolean(object.doesNotUpdateVolume) : false,
      session: isSet2(object.session) ? String(object.session) : "",
      blockTrade: isSet2(object.blockTrade) ? Boolean(object.blockTrade) : false,
      distributionTime: isSet2(object.distributionTime) ? long_default.fromValue(object.distributionTime) : long_default.ZERO,
      transactionTime2: isSet2(object.transactionTime2) ? long_default.fromValue(object.transactionTime2) : long_default.ZERO,
      consolidatedPriceIndicator: isSet2(object.consolidatedPriceIndicator) ? String(object.consolidatedPriceIndicator) : "",
      transient: isSet2(object.transient) ? Boolean(object.transient) : false,
      indexShortName: isSet2(object.indexShortName) ? String(object.indexShortName) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.originatorId !== void 0 && (obj.originatorId = base64FromBytes2(
      message.originatorId !== void 0 ? message.originatorId : new Uint8Array()
    ));
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || long_default.ZERO).toString());
    message.tradeId !== void 0 && (obj.tradeId = base64FromBytes2(message.tradeId !== void 0 ? message.tradeId : new Uint8Array()));
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.buyerId !== void 0 && (obj.buyerId = base64FromBytes2(message.buyerId !== void 0 ? message.buyerId : new Uint8Array()));
    message.sellerId !== void 0 && (obj.sellerId = base64FromBytes2(message.sellerId !== void 0 ? message.sellerId : new Uint8Array()));
    message.openingTrade !== void 0 && (obj.openingTrade = message.openingTrade);
    message.systemPriced !== void 0 && (obj.systemPriced = message.systemPriced);
    message.marketOnClose !== void 0 && (obj.marketOnClose = message.marketOnClose);
    message.oddLot !== void 0 && (obj.oddLot = message.oddLot);
    message.settlementTerms !== void 0 && (obj.settlementTerms = settlementTermsToJSON(message.settlementTerms));
    message.crossType !== void 0 && (obj.crossType = crossTypeToJSON(message.crossType));
    message.byPass !== void 0 && (obj.byPass = message.byPass);
    message.lastPrice !== void 0 && (obj.lastPrice = (message.lastPrice || long_default.ZERO).toString());
    message.saleCondition !== void 0 && (obj.saleCondition = base64FromBytes2(
      message.saleCondition !== void 0 ? message.saleCondition : new Uint8Array()
    ));
    message.currency !== void 0 && (obj.currency = message.currency);
    message.doesNotUpdateLast !== void 0 && (obj.doesNotUpdateLast = message.doesNotUpdateLast);
    message.doesNotUpdateVolume !== void 0 && (obj.doesNotUpdateVolume = message.doesNotUpdateVolume);
    message.session !== void 0 && (obj.session = message.session);
    message.blockTrade !== void 0 && (obj.blockTrade = message.blockTrade);
    message.distributionTime !== void 0 && (obj.distributionTime = (message.distributionTime || long_default.ZERO).toString());
    message.transactionTime2 !== void 0 && (obj.transactionTime2 = (message.transactionTime2 || long_default.ZERO).toString());
    message.consolidatedPriceIndicator !== void 0 && (obj.consolidatedPriceIndicator = message.consolidatedPriceIndicator);
    message.transient !== void 0 && (obj.transient = message.transient);
    message.indexShortName !== void 0 && (obj.indexShortName = message.indexShortName);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseTrade();
    message.originatorId = object.originatorId ?? new Uint8Array();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? long_default.fromValue(object.quantity) : long_default.ZERO;
    message.tradeId = object.tradeId ?? new Uint8Array();
    message.side = object.side ?? 0;
    message.tradeDate = object.tradeDate ?? 0;
    message.buyerId = object.buyerId ?? new Uint8Array();
    message.sellerId = object.sellerId ?? new Uint8Array();
    message.openingTrade = object.openingTrade ?? false;
    message.systemPriced = object.systemPriced ?? false;
    message.marketOnClose = object.marketOnClose ?? false;
    message.oddLot = object.oddLot ?? false;
    message.settlementTerms = object.settlementTerms ?? 0;
    message.crossType = object.crossType ?? 0;
    message.byPass = object.byPass ?? false;
    message.lastPrice = object.lastPrice !== void 0 && object.lastPrice !== null ? long_default.fromValue(object.lastPrice) : long_default.ZERO;
    message.saleCondition = object.saleCondition ?? new Uint8Array();
    message.currency = object.currency ?? "";
    message.doesNotUpdateLast = object.doesNotUpdateLast ?? false;
    message.doesNotUpdateVolume = object.doesNotUpdateVolume ?? false;
    message.session = object.session ?? "";
    message.blockTrade = object.blockTrade ?? false;
    message.distributionTime = object.distributionTime !== void 0 && object.distributionTime !== null ? long_default.fromValue(object.distributionTime) : long_default.ZERO;
    message.transactionTime2 = object.transactionTime2 !== void 0 && object.transactionTime2 !== null ? long_default.fromValue(object.transactionTime2) : long_default.ZERO;
    message.consolidatedPriceIndicator = object.consolidatedPriceIndicator ?? "";
    message.transient = object.transient ?? false;
    message.indexShortName = object.indexShortName ?? "";
    return message;
  }
};
function createBaseTradeCorrection() {
  return {
    originatorId: new Uint8Array(),
    transactionTime: long_default.ZERO,
    price: long_default.ZERO,
    quantity: long_default.ZERO,
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
    distributionTime: long_default.ZERO,
    transactionTime2: long_default.ZERO,
    originalTradePrice: long_default.ZERO,
    originalTradeQuantity: long_default.ZERO
  };
}
var TradeCorrection = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.originatorId.length !== 0) {
      writer.uint32(66).bytes(message.originatorId);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.price.isZero()) {
      writer.uint32(80).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(88).sint64(message.quantity);
    }
    if (message.tradeId.length !== 0) {
      writer.uint32(98).bytes(message.tradeId);
    }
    if (message.side !== 0) {
      writer.uint32(104).int32(message.side);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(112).sint32(message.tradeDate);
    }
    if (message.buyerId.length !== 0) {
      writer.uint32(122).bytes(message.buyerId);
    }
    if (message.sellerId.length !== 0) {
      writer.uint32(130).bytes(message.sellerId);
    }
    if (message.openingTrade === true) {
      writer.uint32(136).bool(message.openingTrade);
    }
    if (message.systemPriced === true) {
      writer.uint32(144).bool(message.systemPriced);
    }
    if (message.marketOnClose === true) {
      writer.uint32(152).bool(message.marketOnClose);
    }
    if (message.oddLot === true) {
      writer.uint32(160).bool(message.oddLot);
    }
    if (message.settlementTerms !== 0) {
      writer.uint32(168).int32(message.settlementTerms);
    }
    if (message.crossType !== 0) {
      writer.uint32(176).int32(message.crossType);
    }
    if (message.byPass === true) {
      writer.uint32(184).bool(message.byPass);
    }
    if (message.originalTradeId.length !== 0) {
      writer.uint32(194).bytes(message.originalTradeId);
    }
    if (message.saleCondition.length !== 0) {
      writer.uint32(202).bytes(message.saleCondition);
    }
    if (message.currency !== "") {
      writer.uint32(210).string(message.currency);
    }
    if (!message.distributionTime.isZero()) {
      writer.uint32(216).sint64(message.distributionTime);
    }
    if (!message.transactionTime2.isZero()) {
      writer.uint32(224).sint64(message.transactionTime2);
    }
    if (!message.originalTradePrice.isZero()) {
      writer.uint32(232).sint64(message.originalTradePrice);
    }
    if (!message.originalTradeQuantity.isZero()) {
      writer.uint32(240).sint64(message.originalTradeQuantity);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseTradeCorrection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 8:
          message.originatorId = reader.bytes();
          break;
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.price = reader.sint64();
          break;
        case 11:
          message.quantity = reader.sint64();
          break;
        case 12:
          message.tradeId = reader.bytes();
          break;
        case 13:
          message.side = reader.int32();
          break;
        case 14:
          message.tradeDate = reader.sint32();
          break;
        case 15:
          message.buyerId = reader.bytes();
          break;
        case 16:
          message.sellerId = reader.bytes();
          break;
        case 17:
          message.openingTrade = reader.bool();
          break;
        case 18:
          message.systemPriced = reader.bool();
          break;
        case 19:
          message.marketOnClose = reader.bool();
          break;
        case 20:
          message.oddLot = reader.bool();
          break;
        case 21:
          message.settlementTerms = reader.int32();
          break;
        case 22:
          message.crossType = reader.int32();
          break;
        case 23:
          message.byPass = reader.bool();
          break;
        case 24:
          message.originalTradeId = reader.bytes();
          break;
        case 25:
          message.saleCondition = reader.bytes();
          break;
        case 26:
          message.currency = reader.string();
          break;
        case 27:
          message.distributionTime = reader.sint64();
          break;
        case 28:
          message.transactionTime2 = reader.sint64();
          break;
        case 29:
          message.originalTradePrice = reader.sint64();
          break;
        case 30:
          message.originalTradeQuantity = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      originatorId: isSet2(object.originatorId) ? bytesFromBase642(object.originatorId) : new Uint8Array(),
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      quantity: isSet2(object.quantity) ? long_default.fromValue(object.quantity) : long_default.ZERO,
      tradeId: isSet2(object.tradeId) ? bytesFromBase642(object.tradeId) : new Uint8Array(),
      side: isSet2(object.side) ? bookSideFromJSON(object.side) : 0,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      buyerId: isSet2(object.buyerId) ? bytesFromBase642(object.buyerId) : new Uint8Array(),
      sellerId: isSet2(object.sellerId) ? bytesFromBase642(object.sellerId) : new Uint8Array(),
      openingTrade: isSet2(object.openingTrade) ? Boolean(object.openingTrade) : false,
      systemPriced: isSet2(object.systemPriced) ? Boolean(object.systemPriced) : false,
      marketOnClose: isSet2(object.marketOnClose) ? Boolean(object.marketOnClose) : false,
      oddLot: isSet2(object.oddLot) ? Boolean(object.oddLot) : false,
      settlementTerms: isSet2(object.settlementTerms) ? settlementTermsFromJSON(object.settlementTerms) : 0,
      crossType: isSet2(object.crossType) ? crossTypeFromJSON(object.crossType) : 0,
      byPass: isSet2(object.byPass) ? Boolean(object.byPass) : false,
      originalTradeId: isSet2(object.originalTradeId) ? bytesFromBase642(object.originalTradeId) : new Uint8Array(),
      saleCondition: isSet2(object.saleCondition) ? bytesFromBase642(object.saleCondition) : new Uint8Array(),
      currency: isSet2(object.currency) ? String(object.currency) : "",
      distributionTime: isSet2(object.distributionTime) ? long_default.fromValue(object.distributionTime) : long_default.ZERO,
      transactionTime2: isSet2(object.transactionTime2) ? long_default.fromValue(object.transactionTime2) : long_default.ZERO,
      originalTradePrice: isSet2(object.originalTradePrice) ? long_default.fromValue(object.originalTradePrice) : long_default.ZERO,
      originalTradeQuantity: isSet2(object.originalTradeQuantity) ? long_default.fromValue(object.originalTradeQuantity) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.originatorId !== void 0 && (obj.originatorId = base64FromBytes2(
      message.originatorId !== void 0 ? message.originatorId : new Uint8Array()
    ));
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || long_default.ZERO).toString());
    message.tradeId !== void 0 && (obj.tradeId = base64FromBytes2(message.tradeId !== void 0 ? message.tradeId : new Uint8Array()));
    message.side !== void 0 && (obj.side = bookSideToJSON(message.side));
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.buyerId !== void 0 && (obj.buyerId = base64FromBytes2(message.buyerId !== void 0 ? message.buyerId : new Uint8Array()));
    message.sellerId !== void 0 && (obj.sellerId = base64FromBytes2(message.sellerId !== void 0 ? message.sellerId : new Uint8Array()));
    message.openingTrade !== void 0 && (obj.openingTrade = message.openingTrade);
    message.systemPriced !== void 0 && (obj.systemPriced = message.systemPriced);
    message.marketOnClose !== void 0 && (obj.marketOnClose = message.marketOnClose);
    message.oddLot !== void 0 && (obj.oddLot = message.oddLot);
    message.settlementTerms !== void 0 && (obj.settlementTerms = settlementTermsToJSON(message.settlementTerms));
    message.crossType !== void 0 && (obj.crossType = crossTypeToJSON(message.crossType));
    message.byPass !== void 0 && (obj.byPass = message.byPass);
    message.originalTradeId !== void 0 && (obj.originalTradeId = base64FromBytes2(
      message.originalTradeId !== void 0 ? message.originalTradeId : new Uint8Array()
    ));
    message.saleCondition !== void 0 && (obj.saleCondition = base64FromBytes2(
      message.saleCondition !== void 0 ? message.saleCondition : new Uint8Array()
    ));
    message.currency !== void 0 && (obj.currency = message.currency);
    message.distributionTime !== void 0 && (obj.distributionTime = (message.distributionTime || long_default.ZERO).toString());
    message.transactionTime2 !== void 0 && (obj.transactionTime2 = (message.transactionTime2 || long_default.ZERO).toString());
    message.originalTradePrice !== void 0 && (obj.originalTradePrice = (message.originalTradePrice || long_default.ZERO).toString());
    message.originalTradeQuantity !== void 0 && (obj.originalTradeQuantity = (message.originalTradeQuantity || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseTradeCorrection();
    message.originatorId = object.originatorId ?? new Uint8Array();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? long_default.fromValue(object.quantity) : long_default.ZERO;
    message.tradeId = object.tradeId ?? new Uint8Array();
    message.side = object.side ?? 0;
    message.tradeDate = object.tradeDate ?? 0;
    message.buyerId = object.buyerId ?? new Uint8Array();
    message.sellerId = object.sellerId ?? new Uint8Array();
    message.openingTrade = object.openingTrade ?? false;
    message.systemPriced = object.systemPriced ?? false;
    message.marketOnClose = object.marketOnClose ?? false;
    message.oddLot = object.oddLot ?? false;
    message.settlementTerms = object.settlementTerms ?? 0;
    message.crossType = object.crossType ?? 0;
    message.byPass = object.byPass ?? false;
    message.originalTradeId = object.originalTradeId ?? new Uint8Array();
    message.saleCondition = object.saleCondition ?? new Uint8Array();
    message.currency = object.currency ?? "";
    message.distributionTime = object.distributionTime !== void 0 && object.distributionTime !== null ? long_default.fromValue(object.distributionTime) : long_default.ZERO;
    message.transactionTime2 = object.transactionTime2 !== void 0 && object.transactionTime2 !== null ? long_default.fromValue(object.transactionTime2) : long_default.ZERO;
    message.originalTradePrice = object.originalTradePrice !== void 0 && object.originalTradePrice !== null ? long_default.fromValue(object.originalTradePrice) : long_default.ZERO;
    message.originalTradeQuantity = object.originalTradeQuantity !== void 0 && object.originalTradeQuantity !== null ? long_default.fromValue(object.originalTradeQuantity) : long_default.ZERO;
    return message;
  }
};
function createBaseTradeCancel() {
  return {
    originatorId: new Uint8Array(),
    transactionTime: long_default.ZERO,
    correctedTradePrice: long_default.ZERO,
    correctedTradeQuantity: long_default.ZERO,
    tradeId: new Uint8Array(),
    saleCondition: new Uint8Array(),
    currency: "",
    distributionTime: long_default.ZERO,
    transactionTime2: long_default.ZERO
  };
}
var TradeCancel = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.originatorId.length !== 0) {
      writer.uint32(66).bytes(message.originatorId);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.correctedTradePrice.isZero()) {
      writer.uint32(80).sint64(message.correctedTradePrice);
    }
    if (!message.correctedTradeQuantity.isZero()) {
      writer.uint32(88).sint64(message.correctedTradeQuantity);
    }
    if (message.tradeId.length !== 0) {
      writer.uint32(98).bytes(message.tradeId);
    }
    if (message.saleCondition.length !== 0) {
      writer.uint32(106).bytes(message.saleCondition);
    }
    if (message.currency !== "") {
      writer.uint32(114).string(message.currency);
    }
    if (!message.distributionTime.isZero()) {
      writer.uint32(120).sint64(message.distributionTime);
    }
    if (!message.transactionTime2.isZero()) {
      writer.uint32(128).sint64(message.transactionTime2);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseTradeCancel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 8:
          message.originatorId = reader.bytes();
          break;
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.correctedTradePrice = reader.sint64();
          break;
        case 11:
          message.correctedTradeQuantity = reader.sint64();
          break;
        case 12:
          message.tradeId = reader.bytes();
          break;
        case 13:
          message.saleCondition = reader.bytes();
          break;
        case 14:
          message.currency = reader.string();
          break;
        case 15:
          message.distributionTime = reader.sint64();
          break;
        case 16:
          message.transactionTime2 = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      originatorId: isSet2(object.originatorId) ? bytesFromBase642(object.originatorId) : new Uint8Array(),
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      correctedTradePrice: isSet2(object.correctedTradePrice) ? long_default.fromValue(object.correctedTradePrice) : long_default.ZERO,
      correctedTradeQuantity: isSet2(object.correctedTradeQuantity) ? long_default.fromValue(object.correctedTradeQuantity) : long_default.ZERO,
      tradeId: isSet2(object.tradeId) ? bytesFromBase642(object.tradeId) : new Uint8Array(),
      saleCondition: isSet2(object.saleCondition) ? bytesFromBase642(object.saleCondition) : new Uint8Array(),
      currency: isSet2(object.currency) ? String(object.currency) : "",
      distributionTime: isSet2(object.distributionTime) ? long_default.fromValue(object.distributionTime) : long_default.ZERO,
      transactionTime2: isSet2(object.transactionTime2) ? long_default.fromValue(object.transactionTime2) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.originatorId !== void 0 && (obj.originatorId = base64FromBytes2(
      message.originatorId !== void 0 ? message.originatorId : new Uint8Array()
    ));
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.correctedTradePrice !== void 0 && (obj.correctedTradePrice = (message.correctedTradePrice || long_default.ZERO).toString());
    message.correctedTradeQuantity !== void 0 && (obj.correctedTradeQuantity = (message.correctedTradeQuantity || long_default.ZERO).toString());
    message.tradeId !== void 0 && (obj.tradeId = base64FromBytes2(message.tradeId !== void 0 ? message.tradeId : new Uint8Array()));
    message.saleCondition !== void 0 && (obj.saleCondition = base64FromBytes2(
      message.saleCondition !== void 0 ? message.saleCondition : new Uint8Array()
    ));
    message.currency !== void 0 && (obj.currency = message.currency);
    message.distributionTime !== void 0 && (obj.distributionTime = (message.distributionTime || long_default.ZERO).toString());
    message.transactionTime2 !== void 0 && (obj.transactionTime2 = (message.transactionTime2 || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseTradeCancel();
    message.originatorId = object.originatorId ?? new Uint8Array();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.correctedTradePrice = object.correctedTradePrice !== void 0 && object.correctedTradePrice !== null ? long_default.fromValue(object.correctedTradePrice) : long_default.ZERO;
    message.correctedTradeQuantity = object.correctedTradeQuantity !== void 0 && object.correctedTradeQuantity !== null ? long_default.fromValue(object.correctedTradeQuantity) : long_default.ZERO;
    message.tradeId = object.tradeId ?? new Uint8Array();
    message.saleCondition = object.saleCondition ?? new Uint8Array();
    message.currency = object.currency ?? "";
    message.distributionTime = object.distributionTime !== void 0 && object.distributionTime !== null ? long_default.fromValue(object.distributionTime) : long_default.ZERO;
    message.transactionTime2 = object.transactionTime2 !== void 0 && object.transactionTime2 !== null ? long_default.fromValue(object.transactionTime2) : long_default.ZERO;
    return message;
  }
};
function createBaseOpen() {
  return { transactionTime: long_default.ZERO, tradeDate: 0, price: long_default.ZERO, OpenCloseSettlementFlag: 0, currency: "" };
}
var Open = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.OpenCloseSettlementFlag !== 0) {
      writer.uint32(96).int32(message.OpenCloseSettlementFlag);
    }
    if (message.currency !== "") {
      writer.uint32(106).string(message.currency);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseOpen();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64();
          break;
        case 12:
          message.OpenCloseSettlementFlag = reader.int32();
          break;
        case 13:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      OpenCloseSettlementFlag: isSet2(object.OpenCloseSettlementFlag) ? openCloseSettlementFlagFromJSON(object.OpenCloseSettlementFlag) : 0,
      currency: isSet2(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.OpenCloseSettlementFlag !== void 0 && (obj.OpenCloseSettlementFlag = openCloseSettlementFlagToJSON(message.OpenCloseSettlementFlag));
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseOpen();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.OpenCloseSettlementFlag = object.OpenCloseSettlementFlag ?? 0;
    message.currency = object.currency ?? "";
    return message;
  }
};
function createBaseHigh() {
  return { transactionTime: long_default.ZERO, tradeDate: 0, price: long_default.ZERO, currency: "" };
}
var High = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(98).string(message.currency);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseHigh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64();
          break;
        case 12:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      currency: isSet2(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseHigh();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.currency = object.currency ?? "";
    return message;
  }
};
function createBaseHighRolling() {
  return { transactionTime: long_default.ZERO, tradeDate: 0, price: long_default.ZERO, currency: "" };
}
var HighRolling = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(98).string(message.currency);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseHighRolling();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64();
          break;
        case 12:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      currency: isSet2(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseHighRolling();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.currency = object.currency ?? "";
    return message;
  }
};
function createBaseLow() {
  return { transactionTime: long_default.ZERO, tradeDate: 0, price: long_default.ZERO, currency: "" };
}
var Low = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(98).string(message.currency);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseLow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64();
          break;
        case 12:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      currency: isSet2(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseLow();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.currency = object.currency ?? "";
    return message;
  }
};
function createBaseLowRolling() {
  return { transactionTime: long_default.ZERO, tradeDate: 0, price: long_default.ZERO, currency: "" };
}
var LowRolling = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(98).string(message.currency);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseLowRolling();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64();
          break;
        case 12:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      currency: isSet2(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseLowRolling();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.currency = object.currency ?? "";
    return message;
  }
};
function createBaseClose() {
  return { transactionTime: long_default.ZERO, tradeDate: 0, price: long_default.ZERO, currency: "" };
}
var Close = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(98).string(message.currency);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseClose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64();
          break;
        case 12:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      currency: isSet2(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseClose();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.currency = object.currency ?? "";
    return message;
  }
};
function createBasePrevClose() {
  return { transactionTime: long_default.ZERO, tradeDate: 0, price: long_default.ZERO, currency: "" };
}
var PrevClose = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(98).string(message.currency);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePrevClose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64();
          break;
        case 12:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      currency: isSet2(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    const message = createBasePrevClose();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.currency = object.currency ?? "";
    return message;
  }
};
function createBaseLast() {
  return { transactionTime: long_default.ZERO, tradeDate: 0, price: long_default.ZERO, quantity: long_default.ZERO, currency: "", session: "" };
}
var Last = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(96).sint64(message.quantity);
    }
    if (message.currency !== "") {
      writer.uint32(106).string(message.currency);
    }
    if (message.session !== "") {
      writer.uint32(242).string(message.session);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseLast();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64();
          break;
        case 12:
          message.quantity = reader.sint64();
          break;
        case 13:
          message.currency = reader.string();
          break;
        case 30:
          message.session = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      quantity: isSet2(object.quantity) ? long_default.fromValue(object.quantity) : long_default.ZERO,
      currency: isSet2(object.currency) ? String(object.currency) : "",
      session: isSet2(object.session) ? String(object.session) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.quantity !== void 0 && (obj.quantity = (message.quantity || long_default.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    message.session !== void 0 && (obj.session = message.session);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseLast();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.quantity = object.quantity !== void 0 && object.quantity !== null ? long_default.fromValue(object.quantity) : long_default.ZERO;
    message.currency = object.currency ?? "";
    message.session = object.session ?? "";
    return message;
  }
};
function createBaseYearHigh() {
  return { transactionTime: long_default.ZERO, price: long_default.ZERO, currency: "" };
}
var YearHigh = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.price.isZero()) {
      writer.uint32(80).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(90).string(message.currency);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseYearHigh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.price = reader.sint64();
          break;
        case 11:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      currency: isSet2(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseYearHigh();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.currency = object.currency ?? "";
    return message;
  }
};
function createBaseYearLow() {
  return { transactionTime: long_default.ZERO, price: long_default.ZERO, currency: "" };
}
var YearLow = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.price.isZero()) {
      writer.uint32(80).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(90).string(message.currency);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseYearLow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.price = reader.sint64();
          break;
        case 11:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      currency: isSet2(object.currency) ? String(object.currency) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.currency !== void 0 && (obj.currency = message.currency);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseYearLow();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.currency = object.currency ?? "";
    return message;
  }
};
function createBaseVolume() {
  return { transactionTime: long_default.ZERO, tradeDate: 0, volume: long_default.ZERO };
}
var Volume = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.volume.isZero()) {
      writer.uint32(88).sint64(message.volume);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseVolume();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.volume = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      volume: isSet2(object.volume) ? long_default.fromValue(object.volume) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.volume !== void 0 && (obj.volume = (message.volume || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseVolume();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.volume = object.volume !== void 0 && object.volume !== null ? long_default.fromValue(object.volume) : long_default.ZERO;
    return message;
  }
};
function createBaseNumberOfTrades() {
  return { transactionTime: long_default.ZERO, tradeDate: 0, numberTrades: long_default.ZERO };
}
var NumberOfTrades = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.numberTrades.isZero()) {
      writer.uint32(88).sint64(message.numberTrades);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseNumberOfTrades();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.numberTrades = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      numberTrades: isSet2(object.numberTrades) ? long_default.fromValue(object.numberTrades) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.numberTrades !== void 0 && (obj.numberTrades = (message.numberTrades || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseNumberOfTrades();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.numberTrades = object.numberTrades !== void 0 && object.numberTrades !== null ? long_default.fromValue(object.numberTrades) : long_default.ZERO;
    return message;
  }
};
function createBaseMonetaryValue() {
  return { transactionTime: long_default.ZERO, tradeDate: 0, value: long_default.ZERO, valueCurrencyCode: "" };
}
var MonetaryValue = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.value.isZero()) {
      writer.uint32(88).sint64(message.value);
    }
    if (message.valueCurrencyCode !== "") {
      writer.uint32(98).string(message.valueCurrencyCode);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMonetaryValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.value = reader.sint64();
          break;
        case 12:
          message.valueCurrencyCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      value: isSet2(object.value) ? long_default.fromValue(object.value) : long_default.ZERO,
      valueCurrencyCode: isSet2(object.valueCurrencyCode) ? String(object.valueCurrencyCode) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.value !== void 0 && (obj.value = (message.value || long_default.ZERO).toString());
    message.valueCurrencyCode !== void 0 && (obj.valueCurrencyCode = message.valueCurrencyCode);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseMonetaryValue();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.value = object.value !== void 0 && object.value !== null ? long_default.fromValue(object.value) : long_default.ZERO;
    message.valueCurrencyCode = object.valueCurrencyCode ?? "";
    return message;
  }
};
function createBaseSettlement() {
  return {
    transactionTime: long_default.ZERO,
    tradeDate: 0,
    price: long_default.ZERO,
    preliminarySettle: false,
    currency: "",
    settlementSource: 0,
    session: "",
    transient: false,
    reserved: false
  };
}
var Settlement = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.preliminarySettle === true) {
      writer.uint32(96).bool(message.preliminarySettle);
    }
    if (message.currency !== "") {
      writer.uint32(106).string(message.currency);
    }
    if (message.settlementSource !== 0) {
      writer.uint32(112).int32(message.settlementSource);
    }
    if (message.session !== "") {
      writer.uint32(122).string(message.session);
    }
    if (message.transient === true) {
      writer.uint32(128).bool(message.transient);
    }
    if (message.reserved === true) {
      writer.uint32(1016).bool(message.reserved);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSettlement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64();
          break;
        case 12:
          message.preliminarySettle = reader.bool();
          break;
        case 13:
          message.currency = reader.string();
          break;
        case 14:
          message.settlementSource = reader.int32();
          break;
        case 15:
          message.session = reader.string();
          break;
        case 16:
          message.transient = reader.bool();
          break;
        case 127:
          message.reserved = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      preliminarySettle: isSet2(object.preliminarySettle) ? Boolean(object.preliminarySettle) : false,
      currency: isSet2(object.currency) ? String(object.currency) : "",
      settlementSource: isSet2(object.settlementSource) ? settlementSourceFromJSON(object.settlementSource) : 0,
      session: isSet2(object.session) ? String(object.session) : "",
      transient: isSet2(object.transient) ? Boolean(object.transient) : false,
      reserved: isSet2(object.reserved) ? Boolean(object.reserved) : false
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.preliminarySettle !== void 0 && (obj.preliminarySettle = message.preliminarySettle);
    message.currency !== void 0 && (obj.currency = message.currency);
    message.settlementSource !== void 0 && (obj.settlementSource = settlementSourceToJSON(message.settlementSource));
    message.session !== void 0 && (obj.session = message.session);
    message.transient !== void 0 && (obj.transient = message.transient);
    message.reserved !== void 0 && (obj.reserved = message.reserved);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseSettlement();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.preliminarySettle = object.preliminarySettle ?? false;
    message.currency = object.currency ?? "";
    message.settlementSource = object.settlementSource ?? 0;
    message.session = object.session ?? "";
    message.transient = object.transient ?? false;
    message.reserved = object.reserved ?? false;
    return message;
  }
};
function createBaseOpenInterest() {
  return { transactionTime: long_default.ZERO, tradeDate: 0, volume: long_default.ZERO };
}
var OpenInterest = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.volume.isZero()) {
      writer.uint32(88).sint64(message.volume);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseOpenInterest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.volume = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      volume: isSet2(object.volume) ? long_default.fromValue(object.volume) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.volume !== void 0 && (obj.volume = (message.volume || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseOpenInterest();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.volume = object.volume !== void 0 && object.volume !== null ? long_default.fromValue(object.volume) : long_default.ZERO;
    return message;
  }
};
function createBaseVwap() {
  return { transactionTime: long_default.ZERO, tradeDate: 0, vwap: long_default.ZERO };
}
var Vwap = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.vwap.isZero()) {
      writer.uint32(88).sint64(message.vwap);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseVwap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.vwap = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      vwap: isSet2(object.vwap) ? long_default.fromValue(object.vwap) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.vwap !== void 0 && (obj.vwap = (message.vwap || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseVwap();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.vwap = object.vwap !== void 0 && object.vwap !== null ? long_default.fromValue(object.vwap) : long_default.ZERO;
    return message;
  }
};
function createBaseDividendsIncomeDistributions() {
  return {
    transactionTime: long_default.ZERO,
    instrumentType: "",
    corporateAction: "",
    distributionType: "",
    payableDate: 0,
    recordDate: 0,
    exDividendDate: 0,
    amount: long_default.ZERO,
    currencyCode: "",
    notes: [],
    totalCashDistribution: long_default.ZERO,
    nonQualifiedCashDistribution: long_default.ZERO,
    qualifiedCashDistribution: long_default.ZERO,
    taxFreeCashDistribution: long_default.ZERO,
    ordinaryForeignTaxCredit: long_default.ZERO,
    qualifiedForeignTaxCredit: long_default.ZERO,
    stockDividendRatio: long_default.ZERO,
    reinvestDate: 0
  };
}
var DividendsIncomeDistributions = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(48).sint64(message.transactionTime);
    }
    if (message.instrumentType !== "") {
      writer.uint32(58).string(message.instrumentType);
    }
    if (message.corporateAction !== "") {
      writer.uint32(66).string(message.corporateAction);
    }
    if (message.distributionType !== "") {
      writer.uint32(74).string(message.distributionType);
    }
    if (message.payableDate !== 0) {
      writer.uint32(80).sint32(message.payableDate);
    }
    if (message.recordDate !== 0) {
      writer.uint32(88).sint32(message.recordDate);
    }
    if (message.exDividendDate !== 0) {
      writer.uint32(96).sint32(message.exDividendDate);
    }
    if (!message.amount.isZero()) {
      writer.uint32(104).sint64(message.amount);
    }
    if (message.currencyCode !== "") {
      writer.uint32(114).string(message.currencyCode);
    }
    for (const v of message.notes) {
      writer.uint32(122).string(v);
    }
    if (!message.totalCashDistribution.isZero()) {
      writer.uint32(128).sint64(message.totalCashDistribution);
    }
    if (!message.nonQualifiedCashDistribution.isZero()) {
      writer.uint32(136).sint64(message.nonQualifiedCashDistribution);
    }
    if (!message.qualifiedCashDistribution.isZero()) {
      writer.uint32(144).sint64(message.qualifiedCashDistribution);
    }
    if (!message.taxFreeCashDistribution.isZero()) {
      writer.uint32(152).sint64(message.taxFreeCashDistribution);
    }
    if (!message.ordinaryForeignTaxCredit.isZero()) {
      writer.uint32(160).sint64(message.ordinaryForeignTaxCredit);
    }
    if (!message.qualifiedForeignTaxCredit.isZero()) {
      writer.uint32(168).sint64(message.qualifiedForeignTaxCredit);
    }
    if (!message.stockDividendRatio.isZero()) {
      writer.uint32(176).sint64(message.stockDividendRatio);
    }
    if (message.reinvestDate !== 0) {
      writer.uint32(184).sint32(message.reinvestDate);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseDividendsIncomeDistributions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 6:
          message.transactionTime = reader.sint64();
          break;
        case 7:
          message.instrumentType = reader.string();
          break;
        case 8:
          message.corporateAction = reader.string();
          break;
        case 9:
          message.distributionType = reader.string();
          break;
        case 10:
          message.payableDate = reader.sint32();
          break;
        case 11:
          message.recordDate = reader.sint32();
          break;
        case 12:
          message.exDividendDate = reader.sint32();
          break;
        case 13:
          message.amount = reader.sint64();
          break;
        case 14:
          message.currencyCode = reader.string();
          break;
        case 15:
          message.notes.push(reader.string());
          break;
        case 16:
          message.totalCashDistribution = reader.sint64();
          break;
        case 17:
          message.nonQualifiedCashDistribution = reader.sint64();
          break;
        case 18:
          message.qualifiedCashDistribution = reader.sint64();
          break;
        case 19:
          message.taxFreeCashDistribution = reader.sint64();
          break;
        case 20:
          message.ordinaryForeignTaxCredit = reader.sint64();
          break;
        case 21:
          message.qualifiedForeignTaxCredit = reader.sint64();
          break;
        case 22:
          message.stockDividendRatio = reader.sint64();
          break;
        case 23:
          message.reinvestDate = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      instrumentType: isSet2(object.instrumentType) ? String(object.instrumentType) : "",
      corporateAction: isSet2(object.corporateAction) ? String(object.corporateAction) : "",
      distributionType: isSet2(object.distributionType) ? String(object.distributionType) : "",
      payableDate: isSet2(object.payableDate) ? Number(object.payableDate) : 0,
      recordDate: isSet2(object.recordDate) ? Number(object.recordDate) : 0,
      exDividendDate: isSet2(object.exDividendDate) ? Number(object.exDividendDate) : 0,
      amount: isSet2(object.amount) ? long_default.fromValue(object.amount) : long_default.ZERO,
      currencyCode: isSet2(object.currencyCode) ? String(object.currencyCode) : "",
      notes: Array.isArray(object == null ? void 0 : object.notes) ? object.notes.map((e) => String(e)) : [],
      totalCashDistribution: isSet2(object.totalCashDistribution) ? long_default.fromValue(object.totalCashDistribution) : long_default.ZERO,
      nonQualifiedCashDistribution: isSet2(object.nonQualifiedCashDistribution) ? long_default.fromValue(object.nonQualifiedCashDistribution) : long_default.ZERO,
      qualifiedCashDistribution: isSet2(object.qualifiedCashDistribution) ? long_default.fromValue(object.qualifiedCashDistribution) : long_default.ZERO,
      taxFreeCashDistribution: isSet2(object.taxFreeCashDistribution) ? long_default.fromValue(object.taxFreeCashDistribution) : long_default.ZERO,
      ordinaryForeignTaxCredit: isSet2(object.ordinaryForeignTaxCredit) ? long_default.fromValue(object.ordinaryForeignTaxCredit) : long_default.ZERO,
      qualifiedForeignTaxCredit: isSet2(object.qualifiedForeignTaxCredit) ? long_default.fromValue(object.qualifiedForeignTaxCredit) : long_default.ZERO,
      stockDividendRatio: isSet2(object.stockDividendRatio) ? long_default.fromValue(object.stockDividendRatio) : long_default.ZERO,
      reinvestDate: isSet2(object.reinvestDate) ? Number(object.reinvestDate) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.instrumentType !== void 0 && (obj.instrumentType = message.instrumentType);
    message.corporateAction !== void 0 && (obj.corporateAction = message.corporateAction);
    message.distributionType !== void 0 && (obj.distributionType = message.distributionType);
    message.payableDate !== void 0 && (obj.payableDate = Math.round(message.payableDate));
    message.recordDate !== void 0 && (obj.recordDate = Math.round(message.recordDate));
    message.exDividendDate !== void 0 && (obj.exDividendDate = Math.round(message.exDividendDate));
    message.amount !== void 0 && (obj.amount = (message.amount || long_default.ZERO).toString());
    message.currencyCode !== void 0 && (obj.currencyCode = message.currencyCode);
    if (message.notes) {
      obj.notes = message.notes.map((e) => e);
    } else {
      obj.notes = [];
    }
    message.totalCashDistribution !== void 0 && (obj.totalCashDistribution = (message.totalCashDistribution || long_default.ZERO).toString());
    message.nonQualifiedCashDistribution !== void 0 && (obj.nonQualifiedCashDistribution = (message.nonQualifiedCashDistribution || long_default.ZERO).toString());
    message.qualifiedCashDistribution !== void 0 && (obj.qualifiedCashDistribution = (message.qualifiedCashDistribution || long_default.ZERO).toString());
    message.taxFreeCashDistribution !== void 0 && (obj.taxFreeCashDistribution = (message.taxFreeCashDistribution || long_default.ZERO).toString());
    message.ordinaryForeignTaxCredit !== void 0 && (obj.ordinaryForeignTaxCredit = (message.ordinaryForeignTaxCredit || long_default.ZERO).toString());
    message.qualifiedForeignTaxCredit !== void 0 && (obj.qualifiedForeignTaxCredit = (message.qualifiedForeignTaxCredit || long_default.ZERO).toString());
    message.stockDividendRatio !== void 0 && (obj.stockDividendRatio = (message.stockDividendRatio || long_default.ZERO).toString());
    message.reinvestDate !== void 0 && (obj.reinvestDate = Math.round(message.reinvestDate));
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseDividendsIncomeDistributions();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.instrumentType = object.instrumentType ?? "";
    message.corporateAction = object.corporateAction ?? "";
    message.distributionType = object.distributionType ?? "";
    message.payableDate = object.payableDate ?? 0;
    message.recordDate = object.recordDate ?? 0;
    message.exDividendDate = object.exDividendDate ?? 0;
    message.amount = object.amount !== void 0 && object.amount !== null ? long_default.fromValue(object.amount) : long_default.ZERO;
    message.currencyCode = object.currencyCode ?? "";
    message.notes = ((_a = object.notes) == null ? void 0 : _a.map((e) => e)) || [];
    message.totalCashDistribution = object.totalCashDistribution !== void 0 && object.totalCashDistribution !== null ? long_default.fromValue(object.totalCashDistribution) : long_default.ZERO;
    message.nonQualifiedCashDistribution = object.nonQualifiedCashDistribution !== void 0 && object.nonQualifiedCashDistribution !== null ? long_default.fromValue(object.nonQualifiedCashDistribution) : long_default.ZERO;
    message.qualifiedCashDistribution = object.qualifiedCashDistribution !== void 0 && object.qualifiedCashDistribution !== null ? long_default.fromValue(object.qualifiedCashDistribution) : long_default.ZERO;
    message.taxFreeCashDistribution = object.taxFreeCashDistribution !== void 0 && object.taxFreeCashDistribution !== null ? long_default.fromValue(object.taxFreeCashDistribution) : long_default.ZERO;
    message.ordinaryForeignTaxCredit = object.ordinaryForeignTaxCredit !== void 0 && object.ordinaryForeignTaxCredit !== null ? long_default.fromValue(object.ordinaryForeignTaxCredit) : long_default.ZERO;
    message.qualifiedForeignTaxCredit = object.qualifiedForeignTaxCredit !== void 0 && object.qualifiedForeignTaxCredit !== null ? long_default.fromValue(object.qualifiedForeignTaxCredit) : long_default.ZERO;
    message.stockDividendRatio = object.stockDividendRatio !== void 0 && object.stockDividendRatio !== null ? long_default.fromValue(object.stockDividendRatio) : long_default.ZERO;
    message.reinvestDate = object.reinvestDate ?? 0;
    return message;
  }
};
function createBaseCapitalDistributions() {
  return {
    transactionTime: long_default.ZERO,
    instrumentType: "",
    corporateAction: "",
    payableDate: 0,
    recordDate: 0,
    exDate: 0,
    shortTermCapitalGain: long_default.ZERO,
    longTermCapitalGain: long_default.ZERO,
    unallocatedDistributions: long_default.ZERO,
    returnOfCapital: long_default.ZERO,
    currencyCode: "",
    notes: [],
    reinvestDate: 0
  };
}
var CapitalDistributions = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(64).sint64(message.transactionTime);
    }
    if (message.instrumentType !== "") {
      writer.uint32(74).string(message.instrumentType);
    }
    if (message.corporateAction !== "") {
      writer.uint32(82).string(message.corporateAction);
    }
    if (message.payableDate !== 0) {
      writer.uint32(88).sint32(message.payableDate);
    }
    if (message.recordDate !== 0) {
      writer.uint32(96).sint32(message.recordDate);
    }
    if (message.exDate !== 0) {
      writer.uint32(104).sint32(message.exDate);
    }
    if (!message.shortTermCapitalGain.isZero()) {
      writer.uint32(112).sint64(message.shortTermCapitalGain);
    }
    if (!message.longTermCapitalGain.isZero()) {
      writer.uint32(120).sint64(message.longTermCapitalGain);
    }
    if (!message.unallocatedDistributions.isZero()) {
      writer.uint32(128).sint64(message.unallocatedDistributions);
    }
    if (!message.returnOfCapital.isZero()) {
      writer.uint32(136).sint64(message.returnOfCapital);
    }
    if (message.currencyCode !== "") {
      writer.uint32(146).string(message.currencyCode);
    }
    for (const v of message.notes) {
      writer.uint32(154).string(v);
    }
    if (message.reinvestDate !== 0) {
      writer.uint32(160).sint32(message.reinvestDate);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCapitalDistributions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 8:
          message.transactionTime = reader.sint64();
          break;
        case 9:
          message.instrumentType = reader.string();
          break;
        case 10:
          message.corporateAction = reader.string();
          break;
        case 11:
          message.payableDate = reader.sint32();
          break;
        case 12:
          message.recordDate = reader.sint32();
          break;
        case 13:
          message.exDate = reader.sint32();
          break;
        case 14:
          message.shortTermCapitalGain = reader.sint64();
          break;
        case 15:
          message.longTermCapitalGain = reader.sint64();
          break;
        case 16:
          message.unallocatedDistributions = reader.sint64();
          break;
        case 17:
          message.returnOfCapital = reader.sint64();
          break;
        case 18:
          message.currencyCode = reader.string();
          break;
        case 19:
          message.notes.push(reader.string());
          break;
        case 20:
          message.reinvestDate = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      instrumentType: isSet2(object.instrumentType) ? String(object.instrumentType) : "",
      corporateAction: isSet2(object.corporateAction) ? String(object.corporateAction) : "",
      payableDate: isSet2(object.payableDate) ? Number(object.payableDate) : 0,
      recordDate: isSet2(object.recordDate) ? Number(object.recordDate) : 0,
      exDate: isSet2(object.exDate) ? Number(object.exDate) : 0,
      shortTermCapitalGain: isSet2(object.shortTermCapitalGain) ? long_default.fromValue(object.shortTermCapitalGain) : long_default.ZERO,
      longTermCapitalGain: isSet2(object.longTermCapitalGain) ? long_default.fromValue(object.longTermCapitalGain) : long_default.ZERO,
      unallocatedDistributions: isSet2(object.unallocatedDistributions) ? long_default.fromValue(object.unallocatedDistributions) : long_default.ZERO,
      returnOfCapital: isSet2(object.returnOfCapital) ? long_default.fromValue(object.returnOfCapital) : long_default.ZERO,
      currencyCode: isSet2(object.currencyCode) ? String(object.currencyCode) : "",
      notes: Array.isArray(object == null ? void 0 : object.notes) ? object.notes.map((e) => String(e)) : [],
      reinvestDate: isSet2(object.reinvestDate) ? Number(object.reinvestDate) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.instrumentType !== void 0 && (obj.instrumentType = message.instrumentType);
    message.corporateAction !== void 0 && (obj.corporateAction = message.corporateAction);
    message.payableDate !== void 0 && (obj.payableDate = Math.round(message.payableDate));
    message.recordDate !== void 0 && (obj.recordDate = Math.round(message.recordDate));
    message.exDate !== void 0 && (obj.exDate = Math.round(message.exDate));
    message.shortTermCapitalGain !== void 0 && (obj.shortTermCapitalGain = (message.shortTermCapitalGain || long_default.ZERO).toString());
    message.longTermCapitalGain !== void 0 && (obj.longTermCapitalGain = (message.longTermCapitalGain || long_default.ZERO).toString());
    message.unallocatedDistributions !== void 0 && (obj.unallocatedDistributions = (message.unallocatedDistributions || long_default.ZERO).toString());
    message.returnOfCapital !== void 0 && (obj.returnOfCapital = (message.returnOfCapital || long_default.ZERO).toString());
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
    var _a;
    const message = createBaseCapitalDistributions();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.instrumentType = object.instrumentType ?? "";
    message.corporateAction = object.corporateAction ?? "";
    message.payableDate = object.payableDate ?? 0;
    message.recordDate = object.recordDate ?? 0;
    message.exDate = object.exDate ?? 0;
    message.shortTermCapitalGain = object.shortTermCapitalGain !== void 0 && object.shortTermCapitalGain !== null ? long_default.fromValue(object.shortTermCapitalGain) : long_default.ZERO;
    message.longTermCapitalGain = object.longTermCapitalGain !== void 0 && object.longTermCapitalGain !== null ? long_default.fromValue(object.longTermCapitalGain) : long_default.ZERO;
    message.unallocatedDistributions = object.unallocatedDistributions !== void 0 && object.unallocatedDistributions !== null ? long_default.fromValue(object.unallocatedDistributions) : long_default.ZERO;
    message.returnOfCapital = object.returnOfCapital !== void 0 && object.returnOfCapital !== null ? long_default.fromValue(object.returnOfCapital) : long_default.ZERO;
    message.currencyCode = object.currencyCode ?? "";
    message.notes = ((_a = object.notes) == null ? void 0 : _a.map((e) => e)) || [];
    message.reinvestDate = object.reinvestDate ?? 0;
    return message;
  }
};
function createBaseSharesOutstanding() {
  return { sharesOutstanding: long_default.ZERO, transactionTime: long_default.ZERO };
}
var SharesOutstanding = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.sharesOutstanding.isZero()) {
      writer.uint32(8).sint64(message.sharesOutstanding);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(16).sint64(message.transactionTime);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSharesOutstanding();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sharesOutstanding = reader.sint64();
          break;
        case 2:
          message.transactionTime = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      sharesOutstanding: isSet2(object.sharesOutstanding) ? long_default.fromValue(object.sharesOutstanding) : long_default.ZERO,
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.sharesOutstanding !== void 0 && (obj.sharesOutstanding = (message.sharesOutstanding || long_default.ZERO).toString());
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseSharesOutstanding();
    message.sharesOutstanding = object.sharesOutstanding !== void 0 && object.sharesOutstanding !== null ? long_default.fromValue(object.sharesOutstanding) : long_default.ZERO;
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    return message;
  }
};
function createBaseNetAssetValue() {
  return { netAssetValue: long_default.ZERO, transactionTime: long_default.ZERO };
}
var NetAssetValue = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.netAssetValue.isZero()) {
      writer.uint32(8).sint64(message.netAssetValue);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(16).sint64(message.transactionTime);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseNetAssetValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.netAssetValue = reader.sint64();
          break;
        case 2:
          message.transactionTime = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      netAssetValue: isSet2(object.netAssetValue) ? long_default.fromValue(object.netAssetValue) : long_default.ZERO,
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.netAssetValue !== void 0 && (obj.netAssetValue = (message.netAssetValue || long_default.ZERO).toString());
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseNetAssetValue();
    message.netAssetValue = object.netAssetValue !== void 0 && object.netAssetValue !== null ? long_default.fromValue(object.netAssetValue) : long_default.ZERO;
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    return message;
  }
};
function createBaseMarketSummary() {
  return {
    transactionTime: long_default.ZERO,
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
var MarketSummary = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(8).sint64(message.transactionTime);
    }
    if (message.tradingDate !== 0) {
      writer.uint32(16).sint32(message.tradingDate);
    }
    if (message.startOfDay === true) {
      writer.uint32(24).bool(message.startOfDay);
    }
    if (message.endOfDay === true) {
      writer.uint32(32).bool(message.endOfDay);
    }
    if (message.clear !== 0) {
      writer.uint32(40).int32(message.clear);
    }
    if (message.instrumentStatus !== void 0) {
      InstrumentStatus.encode(message.instrumentStatus, writer.uint32(74).fork()).ldelim();
    }
    if (message.bbo !== void 0) {
      BestBidOffer.encode(message.bbo, writer.uint32(82).fork()).ldelim();
    }
    if (message.open !== void 0) {
      Open.encode(message.open, writer.uint32(90).fork()).ldelim();
    }
    if (message.high !== void 0) {
      High.encode(message.high, writer.uint32(98).fork()).ldelim();
    }
    if (message.low !== void 0) {
      Low.encode(message.low, writer.uint32(106).fork()).ldelim();
    }
    if (message.close !== void 0) {
      Close.encode(message.close, writer.uint32(114).fork()).ldelim();
    }
    if (message.prevClose !== void 0) {
      PrevClose.encode(message.prevClose, writer.uint32(122).fork()).ldelim();
    }
    if (message.last !== void 0) {
      Last.encode(message.last, writer.uint32(130).fork()).ldelim();
    }
    if (message.volume !== void 0) {
      Volume.encode(message.volume, writer.uint32(138).fork()).ldelim();
    }
    if (message.settlement !== void 0) {
      Settlement.encode(message.settlement, writer.uint32(146).fork()).ldelim();
    }
    if (message.openInterest !== void 0) {
      OpenInterest.encode(message.openInterest, writer.uint32(154).fork()).ldelim();
    }
    if (message.vwap !== void 0) {
      Vwap.encode(message.vwap, writer.uint32(162).fork()).ldelim();
    }
    if (message.session !== "") {
      writer.uint32(170).string(message.session);
    }
    if (message.summaryType !== 0) {
      writer.uint32(176).int32(message.summaryType);
    }
    if (message.prevVolume !== void 0) {
      Volume.encode(message.prevVolume, writer.uint32(186).fork()).ldelim();
    }
    if (message.transient === true) {
      writer.uint32(192).bool(message.transient);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMarketSummary();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionTime = reader.sint64();
          break;
        case 2:
          message.tradingDate = reader.sint32();
          break;
        case 3:
          message.startOfDay = reader.bool();
          break;
        case 4:
          message.endOfDay = reader.bool();
          break;
        case 5:
          message.clear = reader.int32();
          break;
        case 9:
          message.instrumentStatus = InstrumentStatus.decode(reader, reader.uint32());
          break;
        case 10:
          message.bbo = BestBidOffer.decode(reader, reader.uint32());
          break;
        case 11:
          message.open = Open.decode(reader, reader.uint32());
          break;
        case 12:
          message.high = High.decode(reader, reader.uint32());
          break;
        case 13:
          message.low = Low.decode(reader, reader.uint32());
          break;
        case 14:
          message.close = Close.decode(reader, reader.uint32());
          break;
        case 15:
          message.prevClose = PrevClose.decode(reader, reader.uint32());
          break;
        case 16:
          message.last = Last.decode(reader, reader.uint32());
          break;
        case 17:
          message.volume = Volume.decode(reader, reader.uint32());
          break;
        case 18:
          message.settlement = Settlement.decode(reader, reader.uint32());
          break;
        case 19:
          message.openInterest = OpenInterest.decode(reader, reader.uint32());
          break;
        case 20:
          message.vwap = Vwap.decode(reader, reader.uint32());
          break;
        case 21:
          message.session = reader.string();
          break;
        case 22:
          message.summaryType = reader.int32();
          break;
        case 23:
          message.prevVolume = Volume.decode(reader, reader.uint32());
          break;
        case 24:
          message.transient = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradingDate: isSet2(object.tradingDate) ? Number(object.tradingDate) : 0,
      startOfDay: isSet2(object.startOfDay) ? Boolean(object.startOfDay) : false,
      endOfDay: isSet2(object.endOfDay) ? Boolean(object.endOfDay) : false,
      clear: isSet2(object.clear) ? marketSummary_ClearSetFromJSON(object.clear) : 0,
      instrumentStatus: isSet2(object.instrumentStatus) ? InstrumentStatus.fromJSON(object.instrumentStatus) : void 0,
      bbo: isSet2(object.bbo) ? BestBidOffer.fromJSON(object.bbo) : void 0,
      open: isSet2(object.open) ? Open.fromJSON(object.open) : void 0,
      high: isSet2(object.high) ? High.fromJSON(object.high) : void 0,
      low: isSet2(object.low) ? Low.fromJSON(object.low) : void 0,
      close: isSet2(object.close) ? Close.fromJSON(object.close) : void 0,
      prevClose: isSet2(object.prevClose) ? PrevClose.fromJSON(object.prevClose) : void 0,
      last: isSet2(object.last) ? Last.fromJSON(object.last) : void 0,
      volume: isSet2(object.volume) ? Volume.fromJSON(object.volume) : void 0,
      settlement: isSet2(object.settlement) ? Settlement.fromJSON(object.settlement) : void 0,
      openInterest: isSet2(object.openInterest) ? OpenInterest.fromJSON(object.openInterest) : void 0,
      vwap: isSet2(object.vwap) ? Vwap.fromJSON(object.vwap) : void 0,
      session: isSet2(object.session) ? String(object.session) : "",
      summaryType: isSet2(object.summaryType) ? marketSummary_SummaryTypeFromJSON(object.summaryType) : 0,
      prevVolume: isSet2(object.prevVolume) ? Volume.fromJSON(object.prevVolume) : void 0,
      transient: isSet2(object.transient) ? Boolean(object.transient) : false
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
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
    const message = createBaseMarketSummary();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradingDate = object.tradingDate ?? 0;
    message.startOfDay = object.startOfDay ?? false;
    message.endOfDay = object.endOfDay ?? false;
    message.clear = object.clear ?? 0;
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
    message.session = object.session ?? "";
    message.summaryType = object.summaryType ?? 0;
    message.prevVolume = object.prevVolume !== void 0 && object.prevVolume !== null ? Volume.fromPartial(object.prevVolume) : void 0;
    message.transient = object.transient ?? false;
    return message;
  }
};
function createBaseContext() {
  return { data: [], tracePoints: [] };
}
var Context = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    for (const v of message.data) {
      ContextData.encode(v, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tracePoints) {
      TracePoint.encode(v, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseContext();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(ContextData.decode(reader, reader.uint32()));
          break;
        case 2:
          message.tracePoints.push(TracePoint.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
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
var ContextData = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.vstring !== void 0) {
      writer.uint32(42).string(message.vstring);
    }
    if (message.vbytes !== void 0) {
      writer.uint32(50).bytes(message.vbytes);
    }
    if (message.vbool !== void 0) {
      writer.uint32(56).bool(message.vbool);
    }
    if (message.vsint32 !== void 0) {
      writer.uint32(64).sint32(message.vsint32);
    }
    if (message.vsint64 !== void 0) {
      writer.uint32(72).sint64(message.vsint64);
    }
    if (message.vfloat !== void 0) {
      writer.uint32(85).float(message.vfloat);
    }
    if (message.vdouble !== void 0) {
      writer.uint32(89).double(message.vdouble);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseContextData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 5:
          message.vstring = reader.string();
          break;
        case 6:
          message.vbytes = reader.bytes();
          break;
        case 7:
          message.vbool = reader.bool();
          break;
        case 8:
          message.vsint32 = reader.sint32();
          break;
        case 9:
          message.vsint64 = reader.sint64();
          break;
        case 10:
          message.vfloat = reader.float();
          break;
        case 11:
          message.vdouble = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      id: isSet2(object.id) ? String(object.id) : "",
      vstring: isSet2(object.vstring) ? String(object.vstring) : void 0,
      vbytes: isSet2(object.vbytes) ? bytesFromBase642(object.vbytes) : void 0,
      vbool: isSet2(object.vbool) ? Boolean(object.vbool) : void 0,
      vsint32: isSet2(object.vsint32) ? Number(object.vsint32) : void 0,
      vsint64: isSet2(object.vsint64) ? long_default.fromValue(object.vsint64) : void 0,
      vfloat: isSet2(object.vfloat) ? Number(object.vfloat) : void 0,
      vdouble: isSet2(object.vdouble) ? Number(object.vdouble) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    message.vstring !== void 0 && (obj.vstring = message.vstring);
    message.vbytes !== void 0 && (obj.vbytes = message.vbytes !== void 0 ? base64FromBytes2(message.vbytes) : void 0);
    message.vbool !== void 0 && (obj.vbool = message.vbool);
    message.vsint32 !== void 0 && (obj.vsint32 = Math.round(message.vsint32));
    message.vsint64 !== void 0 && (obj.vsint64 = (message.vsint64 || void 0).toString());
    message.vfloat !== void 0 && (obj.vfloat = message.vfloat);
    message.vdouble !== void 0 && (obj.vdouble = message.vdouble);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseContextData();
    message.id = object.id ?? "";
    message.vstring = object.vstring ?? void 0;
    message.vbytes = object.vbytes ?? void 0;
    message.vbool = object.vbool ?? void 0;
    message.vsint32 = object.vsint32 ?? void 0;
    message.vsint64 = object.vsint64 !== void 0 && object.vsint64 !== null ? long_default.fromValue(object.vsint64) : void 0;
    message.vfloat = object.vfloat ?? void 0;
    message.vdouble = object.vdouble ?? void 0;
    return message;
  }
};
function createBaseTracePoint() {
  return { id: "", componentId: "", timestampNs: long_default.ZERO, componentLatencyNs: 0 };
}
var TracePoint = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.componentId !== "") {
      writer.uint32(18).string(message.componentId);
    }
    if (!message.timestampNs.isZero()) {
      writer.uint32(24).sint64(message.timestampNs);
    }
    if (message.componentLatencyNs !== 0) {
      writer.uint32(32).int32(message.componentLatencyNs);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseTracePoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.componentId = reader.string();
          break;
        case 3:
          message.timestampNs = reader.sint64();
          break;
        case 4:
          message.componentLatencyNs = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      id: isSet2(object.id) ? String(object.id) : "",
      componentId: isSet2(object.componentId) ? String(object.componentId) : "",
      timestampNs: isSet2(object.timestampNs) ? long_default.fromValue(object.timestampNs) : long_default.ZERO,
      componentLatencyNs: isSet2(object.componentLatencyNs) ? Number(object.componentLatencyNs) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    message.componentId !== void 0 && (obj.componentId = message.componentId);
    message.timestampNs !== void 0 && (obj.timestampNs = (message.timestampNs || long_default.ZERO).toString());
    message.componentLatencyNs !== void 0 && (obj.componentLatencyNs = Math.round(message.componentLatencyNs));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseTracePoint();
    message.id = object.id ?? "";
    message.componentId = object.componentId ?? "";
    message.timestampNs = object.timestampNs !== void 0 && object.timestampNs !== null ? long_default.fromValue(object.timestampNs) : long_default.ZERO;
    message.componentLatencyNs = object.componentLatencyNs ?? 0;
    return message;
  }
};
function createBaseVolumeAtPrice() {
  return {
    marketId: long_default.ZERO,
    symbol: "",
    transactionTime: long_default.ZERO,
    lastPrice: long_default.ZERO,
    lastQuantity: long_default.ZERO,
    lastCumulativeVolume: long_default.ZERO,
    tradeDate: 0,
    priceVolumes: []
  };
}
var VolumeAtPrice = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.marketId.isZero()) {
      writer.uint32(8).sint64(message.marketId);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(24).sint64(message.transactionTime);
    }
    if (!message.lastPrice.isZero()) {
      writer.uint32(32).sint64(message.lastPrice);
    }
    if (!message.lastQuantity.isZero()) {
      writer.uint32(40).sint64(message.lastQuantity);
    }
    if (!message.lastCumulativeVolume.isZero()) {
      writer.uint32(48).sint64(message.lastCumulativeVolume);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(56).sint32(message.tradeDate);
    }
    for (const v of message.priceVolumes) {
      VolumeAtPrice_PriceLevelVolume.encode(v, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseVolumeAtPrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.sint64();
          break;
        case 2:
          message.symbol = reader.string();
          break;
        case 3:
          message.transactionTime = reader.sint64();
          break;
        case 4:
          message.lastPrice = reader.sint64();
          break;
        case 5:
          message.lastQuantity = reader.sint64();
          break;
        case 6:
          message.lastCumulativeVolume = reader.sint64();
          break;
        case 7:
          message.tradeDate = reader.sint32();
          break;
        case 8:
          message.priceVolumes.push(VolumeAtPrice_PriceLevelVolume.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      marketId: isSet2(object.marketId) ? long_default.fromValue(object.marketId) : long_default.ZERO,
      symbol: isSet2(object.symbol) ? String(object.symbol) : "",
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      lastPrice: isSet2(object.lastPrice) ? long_default.fromValue(object.lastPrice) : long_default.ZERO,
      lastQuantity: isSet2(object.lastQuantity) ? long_default.fromValue(object.lastQuantity) : long_default.ZERO,
      lastCumulativeVolume: isSet2(object.lastCumulativeVolume) ? long_default.fromValue(object.lastCumulativeVolume) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      priceVolumes: Array.isArray(object == null ? void 0 : object.priceVolumes) ? object.priceVolumes.map((e) => VolumeAtPrice_PriceLevelVolume.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.marketId !== void 0 && (obj.marketId = (message.marketId || long_default.ZERO).toString());
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.lastPrice !== void 0 && (obj.lastPrice = (message.lastPrice || long_default.ZERO).toString());
    message.lastQuantity !== void 0 && (obj.lastQuantity = (message.lastQuantity || long_default.ZERO).toString());
    message.lastCumulativeVolume !== void 0 && (obj.lastCumulativeVolume = (message.lastCumulativeVolume || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    if (message.priceVolumes) {
      obj.priceVolumes = message.priceVolumes.map((e) => e ? VolumeAtPrice_PriceLevelVolume.toJSON(e) : void 0);
    } else {
      obj.priceVolumes = [];
    }
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseVolumeAtPrice();
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? long_default.fromValue(object.marketId) : long_default.ZERO;
    message.symbol = object.symbol ?? "";
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.lastPrice = object.lastPrice !== void 0 && object.lastPrice !== null ? long_default.fromValue(object.lastPrice) : long_default.ZERO;
    message.lastQuantity = object.lastQuantity !== void 0 && object.lastQuantity !== null ? long_default.fromValue(object.lastQuantity) : long_default.ZERO;
    message.lastCumulativeVolume = object.lastCumulativeVolume !== void 0 && object.lastCumulativeVolume !== null ? long_default.fromValue(object.lastCumulativeVolume) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.priceVolumes = ((_a = object.priceVolumes) == null ? void 0 : _a.map((e) => VolumeAtPrice_PriceLevelVolume.fromPartial(e))) || [];
    return message;
  }
};
function createBaseVolumeAtPrice_PriceLevelVolume() {
  return { price: long_default.ZERO, volume: long_default.ZERO };
}
var VolumeAtPrice_PriceLevelVolume = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.price.isZero()) {
      writer.uint32(8).sint64(message.price);
    }
    if (!message.volume.isZero()) {
      writer.uint32(16).sint64(message.volume);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseVolumeAtPrice_PriceLevelVolume();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = reader.sint64();
          break;
        case 2:
          message.volume = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      price: isSet2(object.price) ? long_default.fromValue(object.price) : long_default.ZERO,
      volume: isSet2(object.volume) ? long_default.fromValue(object.volume) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.price !== void 0 && (obj.price = (message.price || long_default.ZERO).toString());
    message.volume !== void 0 && (obj.volume = (message.volume || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    const message = createBaseVolumeAtPrice_PriceLevelVolume();
    message.price = object.price !== void 0 && object.price !== null ? long_default.fromValue(object.price) : long_default.ZERO;
    message.volume = object.volume !== void 0 && object.volume !== null ? long_default.fromValue(object.volume) : long_default.ZERO;
    return message;
  }
};
function createBaseOhlc() {
  return {
    marketId: long_default.ZERO,
    symbol: "",
    open: void 0,
    high: void 0,
    low: void 0,
    close: void 0,
    volume: long_default.ZERO,
    priceVolume: 0,
    numberTrades: long_default.ZERO,
    tradeDate: 0,
    transactionTime: long_default.ZERO,
    tradeIds: [],
    openStartTime: long_default.ZERO,
    closeEndTime: long_default.ZERO
  };
}
var Ohlc = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.marketId.isZero()) {
      writer.uint32(8).sint64(message.marketId);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (message.open !== void 0) {
      Open.encode(message.open, writer.uint32(26).fork()).ldelim();
    }
    if (message.high !== void 0) {
      High.encode(message.high, writer.uint32(34).fork()).ldelim();
    }
    if (message.low !== void 0) {
      Low.encode(message.low, writer.uint32(42).fork()).ldelim();
    }
    if (message.close !== void 0) {
      Close.encode(message.close, writer.uint32(50).fork()).ldelim();
    }
    if (!message.volume.isZero()) {
      writer.uint32(56).sint64(message.volume);
    }
    if (message.priceVolume !== 0) {
      writer.uint32(65).double(message.priceVolume);
    }
    if (!message.numberTrades.isZero()) {
      writer.uint32(72).sint64(message.numberTrades);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(88).sint64(message.transactionTime);
    }
    for (const v of message.tradeIds) {
      writer.uint32(98).string(v);
    }
    if (!message.openStartTime.isZero()) {
      writer.uint32(104).sint64(message.openStartTime);
    }
    if (!message.closeEndTime.isZero()) {
      writer.uint32(112).sint64(message.closeEndTime);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseOhlc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.sint64();
          break;
        case 2:
          message.symbol = reader.string();
          break;
        case 3:
          message.open = Open.decode(reader, reader.uint32());
          break;
        case 4:
          message.high = High.decode(reader, reader.uint32());
          break;
        case 5:
          message.low = Low.decode(reader, reader.uint32());
          break;
        case 6:
          message.close = Close.decode(reader, reader.uint32());
          break;
        case 7:
          message.volume = reader.sint64();
          break;
        case 8:
          message.priceVolume = reader.double();
          break;
        case 9:
          message.numberTrades = reader.sint64();
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.transactionTime = reader.sint64();
          break;
        case 12:
          message.tradeIds.push(reader.string());
          break;
        case 13:
          message.openStartTime = reader.sint64();
          break;
        case 14:
          message.closeEndTime = reader.sint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      marketId: isSet2(object.marketId) ? long_default.fromValue(object.marketId) : long_default.ZERO,
      symbol: isSet2(object.symbol) ? String(object.symbol) : "",
      open: isSet2(object.open) ? Open.fromJSON(object.open) : void 0,
      high: isSet2(object.high) ? High.fromJSON(object.high) : void 0,
      low: isSet2(object.low) ? Low.fromJSON(object.low) : void 0,
      close: isSet2(object.close) ? Close.fromJSON(object.close) : void 0,
      volume: isSet2(object.volume) ? long_default.fromValue(object.volume) : long_default.ZERO,
      priceVolume: isSet2(object.priceVolume) ? Number(object.priceVolume) : 0,
      numberTrades: isSet2(object.numberTrades) ? long_default.fromValue(object.numberTrades) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeIds: Array.isArray(object == null ? void 0 : object.tradeIds) ? object.tradeIds.map((e) => String(e)) : [],
      openStartTime: isSet2(object.openStartTime) ? long_default.fromValue(object.openStartTime) : long_default.ZERO,
      closeEndTime: isSet2(object.closeEndTime) ? long_default.fromValue(object.closeEndTime) : long_default.ZERO
    };
  },
  toJSON(message) {
    const obj = {};
    message.marketId !== void 0 && (obj.marketId = (message.marketId || long_default.ZERO).toString());
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.open !== void 0 && (obj.open = message.open ? Open.toJSON(message.open) : void 0);
    message.high !== void 0 && (obj.high = message.high ? High.toJSON(message.high) : void 0);
    message.low !== void 0 && (obj.low = message.low ? Low.toJSON(message.low) : void 0);
    message.close !== void 0 && (obj.close = message.close ? Close.toJSON(message.close) : void 0);
    message.volume !== void 0 && (obj.volume = (message.volume || long_default.ZERO).toString());
    message.priceVolume !== void 0 && (obj.priceVolume = message.priceVolume);
    message.numberTrades !== void 0 && (obj.numberTrades = (message.numberTrades || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    if (message.tradeIds) {
      obj.tradeIds = message.tradeIds.map((e) => e);
    } else {
      obj.tradeIds = [];
    }
    message.openStartTime !== void 0 && (obj.openStartTime = (message.openStartTime || long_default.ZERO).toString());
    message.closeEndTime !== void 0 && (obj.closeEndTime = (message.closeEndTime || long_default.ZERO).toString());
    return obj;
  },
  fromPartial(object) {
    var _a;
    const message = createBaseOhlc();
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? long_default.fromValue(object.marketId) : long_default.ZERO;
    message.symbol = object.symbol ?? "";
    message.open = object.open !== void 0 && object.open !== null ? Open.fromPartial(object.open) : void 0;
    message.high = object.high !== void 0 && object.high !== null ? High.fromPartial(object.high) : void 0;
    message.low = object.low !== void 0 && object.low !== null ? Low.fromPartial(object.low) : void 0;
    message.close = object.close !== void 0 && object.close !== null ? Close.fromPartial(object.close) : void 0;
    message.volume = object.volume !== void 0 && object.volume !== null ? long_default.fromValue(object.volume) : long_default.ZERO;
    message.priceVolume = object.priceVolume ?? 0;
    message.numberTrades = object.numberTrades !== void 0 && object.numberTrades !== null ? long_default.fromValue(object.numberTrades) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeIds = ((_a = object.tradeIds) == null ? void 0 : _a.map((e) => e)) || [];
    message.openStartTime = object.openStartTime !== void 0 && object.openStartTime !== null ? long_default.fromValue(object.openStartTime) : long_default.ZERO;
    message.closeEndTime = object.closeEndTime !== void 0 && object.closeEndTime !== null ? long_default.fromValue(object.closeEndTime) : long_default.ZERO;
    return message;
  }
};
function createBaseInstrumentAction() {
  return {
    transactionTime: long_default.ZERO,
    tradeDate: 0,
    action: 0,
    message: "",
    instrument: void 0,
    newInstrument: void 0
  };
}
var InstrumentAction = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (!message.transactionTime.isZero()) {
      writer.uint32(8).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(16).sint32(message.tradeDate);
    }
    if (message.action !== 0) {
      writer.uint32(24).int32(message.action);
    }
    if (message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    if (message.instrument !== void 0) {
      InstrumentDefinition.encode(message.instrument, writer.uint32(82).fork()).ldelim();
    }
    if (message.newInstrument !== void 0) {
      InstrumentDefinition.encode(message.newInstrument, writer.uint32(90).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionTime = reader.sint64();
          break;
        case 2:
          message.tradeDate = reader.sint32();
          break;
        case 3:
          message.action = reader.int32();
          break;
        case 4:
          message.message = reader.string();
          break;
        case 10:
          message.instrument = InstrumentDefinition.decode(reader, reader.uint32());
          break;
        case 11:
          message.newInstrument = InstrumentDefinition.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      transactionTime: isSet2(object.transactionTime) ? long_default.fromValue(object.transactionTime) : long_default.ZERO,
      tradeDate: isSet2(object.tradeDate) ? Number(object.tradeDate) : 0,
      action: isSet2(object.action) ? actionTypeFromJSON(object.action) : 0,
      message: isSet2(object.message) ? String(object.message) : "",
      instrument: isSet2(object.instrument) ? InstrumentDefinition.fromJSON(object.instrument) : void 0,
      newInstrument: isSet2(object.newInstrument) ? InstrumentDefinition.fromJSON(object.newInstrument) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.transactionTime !== void 0 && (obj.transactionTime = (message.transactionTime || long_default.ZERO).toString());
    message.tradeDate !== void 0 && (obj.tradeDate = Math.round(message.tradeDate));
    message.action !== void 0 && (obj.action = actionTypeToJSON(message.action));
    message.message !== void 0 && (obj.message = message.message);
    message.instrument !== void 0 && (obj.instrument = message.instrument ? InstrumentDefinition.toJSON(message.instrument) : void 0);
    message.newInstrument !== void 0 && (obj.newInstrument = message.newInstrument ? InstrumentDefinition.toJSON(message.newInstrument) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseInstrumentAction();
    message.transactionTime = object.transactionTime !== void 0 && object.transactionTime !== null ? long_default.fromValue(object.transactionTime) : long_default.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.action = object.action ?? 0;
    message.message = object.message ?? "";
    message.instrument = object.instrument !== void 0 && object.instrument !== null ? InstrumentDefinition.fromPartial(object.instrument) : void 0;
    message.newInstrument = object.newInstrument !== void 0 && object.newInstrument !== null ? InstrumentDefinition.fromPartial(object.newInstrument) : void 0;
    return message;
  }
};
var globalThis2 = (() => {
  if (typeof globalThis2 !== "undefined") {
    return globalThis2;
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
function bytesFromBase642(b64) {
  if (globalThis2.Buffer) {
    return Uint8Array.from(globalThis2.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis2.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}
function base64FromBytes2(arr) {
  if (globalThis2.Buffer) {
    return globalThis2.Buffer.from(arr).toString("base64");
  } else {
    const bin = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis2.btoa(bin.join(""));
  }
}
if (import_minimal2.default.util.Long !== long_default) {
  import_minimal2.default.util.Long = long_default;
  import_minimal2.default.configure();
}
function isSet2(value) {
  return value !== null && value !== void 0;
}

// generated/openfeed_api.ts
function resultFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_RESULT":
      return 0 /* UNKNOWN_RESULT */;
    case 1:
    case "SUCCESS":
      return 1 /* SUCCESS */;
    case 115:
    case "DUPLICATE_LOGIN":
      return 115 /* DUPLICATE_LOGIN */;
    case 116:
    case "INVALID_SYMBOL":
      return 116 /* INVALID_SYMBOL */;
    case 117:
    case "INVALID_MARKET_ID":
      return 117 /* INVALID_MARKET_ID */;
    case 118:
    case "INVALID_EXCHANGE":
      return 118 /* INVALID_EXCHANGE */;
    case 119:
    case "INVALID_CHANNEL_ID":
      return 119 /* INVALID_CHANNEL_ID */;
    case 120:
    case "MALFORMED_MESSAGE":
      return 120 /* MALFORMED_MESSAGE */;
    case 121:
    case "UNEXPECTED_MESSAGE":
      return 121 /* UNEXPECTED_MESSAGE */;
    case 122:
    case "NOT_SUBSCRIBED":
      return 122 /* NOT_SUBSCRIBED */;
    case 123:
    case "DUPLICATE_SUBSCRIPTION":
      return 123 /* DUPLICATE_SUBSCRIPTION */;
    case 124:
    case "INVALID_CREDENTIALS":
      return 124 /* INVALID_CREDENTIALS */;
    case 125:
    case "INSUFFICIENT_PRIVILEGES":
      return 125 /* INSUFFICIENT_PRIVILEGES */;
    case 126:
    case "AUTHENTICATION_REQUIRED":
      return 126 /* AUTHENTICATION_REQUIRED */;
    case 127:
    case "GENERIC_FAILURE":
      return 127 /* GENERIC_FAILURE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function resultToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_RESULT */:
      return "UNKNOWN_RESULT";
    case 1 /* SUCCESS */:
      return "SUCCESS";
    case 115 /* DUPLICATE_LOGIN */:
      return "DUPLICATE_LOGIN";
    case 116 /* INVALID_SYMBOL */:
      return "INVALID_SYMBOL";
    case 117 /* INVALID_MARKET_ID */:
      return "INVALID_MARKET_ID";
    case 118 /* INVALID_EXCHANGE */:
      return "INVALID_EXCHANGE";
    case 119 /* INVALID_CHANNEL_ID */:
      return "INVALID_CHANNEL_ID";
    case 120 /* MALFORMED_MESSAGE */:
      return "MALFORMED_MESSAGE";
    case 121 /* UNEXPECTED_MESSAGE */:
      return "UNEXPECTED_MESSAGE";
    case 122 /* NOT_SUBSCRIBED */:
      return "NOT_SUBSCRIBED";
    case 123 /* DUPLICATE_SUBSCRIPTION */:
      return "DUPLICATE_SUBSCRIPTION";
    case 124 /* INVALID_CREDENTIALS */:
      return "INVALID_CREDENTIALS";
    case 125 /* INSUFFICIENT_PRIVILEGES */:
      return "INSUFFICIENT_PRIVILEGES";
    case 126 /* AUTHENTICATION_REQUIRED */:
      return "AUTHENTICATION_REQUIRED";
    case 127 /* GENERIC_FAILURE */:
      return "GENERIC_FAILURE";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var SubscriptionType = /* @__PURE__ */ ((SubscriptionType3) => {
  SubscriptionType3[SubscriptionType3["ALL"] = 0] = "ALL";
  SubscriptionType3[SubscriptionType3["QUOTE"] = 1] = "QUOTE";
  SubscriptionType3[SubscriptionType3["QUOTE_PARTICIPANT"] = 2] = "QUOTE_PARTICIPANT";
  SubscriptionType3[SubscriptionType3["DEPTH_PRICE"] = 3] = "DEPTH_PRICE";
  SubscriptionType3[SubscriptionType3["DEPTH_ORDER"] = 4] = "DEPTH_ORDER";
  SubscriptionType3[SubscriptionType3["TRADES"] = 5] = "TRADES";
  SubscriptionType3[SubscriptionType3["CUMLATIVE_VOLUME"] = 6] = "CUMLATIVE_VOLUME";
  SubscriptionType3[SubscriptionType3["OHLC"] = 7] = "OHLC";
  SubscriptionType3[SubscriptionType3["OHLC_NON_REGULAR"] = 8] = "OHLC_NON_REGULAR";
  SubscriptionType3[SubscriptionType3["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return SubscriptionType3;
})(SubscriptionType || {});
function subscriptionTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "ALL":
      return 0 /* ALL */;
    case 1:
    case "QUOTE":
      return 1 /* QUOTE */;
    case 2:
    case "QUOTE_PARTICIPANT":
      return 2 /* QUOTE_PARTICIPANT */;
    case 3:
    case "DEPTH_PRICE":
      return 3 /* DEPTH_PRICE */;
    case 4:
    case "DEPTH_ORDER":
      return 4 /* DEPTH_ORDER */;
    case 5:
    case "TRADES":
      return 5 /* TRADES */;
    case 6:
    case "CUMLATIVE_VOLUME":
      return 6 /* CUMLATIVE_VOLUME */;
    case 7:
    case "OHLC":
      return 7 /* OHLC */;
    case 8:
    case "OHLC_NON_REGULAR":
      return 8 /* OHLC_NON_REGULAR */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function subscriptionTypeToJSON(object) {
  switch (object) {
    case 0 /* ALL */:
      return "ALL";
    case 1 /* QUOTE */:
      return "QUOTE";
    case 2 /* QUOTE_PARTICIPANT */:
      return "QUOTE_PARTICIPANT";
    case 3 /* DEPTH_PRICE */:
      return "DEPTH_PRICE";
    case 4 /* DEPTH_ORDER */:
      return "DEPTH_ORDER";
    case 5 /* TRADES */:
      return "TRADES";
    case 6 /* CUMLATIVE_VOLUME */:
      return "CUMLATIVE_VOLUME";
    case 7 /* OHLC */:
      return "OHLC";
    case 8 /* OHLC_NON_REGULAR */:
      return "OHLC_NON_REGULAR";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function symbolTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "BARCHART":
      return 0 /* BARCHART */;
    case 1:
    case "EXCHANGE":
      return 1 /* EXCHANGE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function symbolTypeToJSON(object) {
  switch (object) {
    case 0 /* BARCHART */:
      return "BARCHART";
    case 1 /* EXCHANGE */:
      return "EXCHANGE";
    case -1 /* UNRECOGNIZED */:
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
var OpenfeedGatewayRequest = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (message.loginRequest !== void 0) {
      LoginRequest.encode(message.loginRequest, writer.uint32(10).fork()).ldelim();
    }
    if (message.logoutRequest !== void 0) {
      LogoutRequest.encode(message.logoutRequest, writer.uint32(18).fork()).ldelim();
    }
    if (message.subscriptionRequest !== void 0) {
      SubscriptionRequest.encode(message.subscriptionRequest, writer.uint32(26).fork()).ldelim();
    }
    if (message.instrumentRequest !== void 0) {
      InstrumentRequest.encode(message.instrumentRequest, writer.uint32(34).fork()).ldelim();
    }
    if (message.instrumentReferenceRequest !== void 0) {
      InstrumentReferenceRequest.encode(message.instrumentReferenceRequest, writer.uint32(42).fork()).ldelim();
    }
    if (message.exchangeRequest !== void 0) {
      ExchangeRequest.encode(message.exchangeRequest, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseOpenfeedGatewayRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loginRequest = LoginRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.logoutRequest = LogoutRequest.decode(reader, reader.uint32());
          break;
        case 3:
          message.subscriptionRequest = SubscriptionRequest.decode(reader, reader.uint32());
          break;
        case 4:
          message.instrumentRequest = InstrumentRequest.decode(reader, reader.uint32());
          break;
        case 5:
          message.instrumentReferenceRequest = InstrumentReferenceRequest.decode(reader, reader.uint32());
          break;
        case 6:
          message.exchangeRequest = ExchangeRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      loginRequest: isSet3(object.loginRequest) ? LoginRequest.fromJSON(object.loginRequest) : void 0,
      logoutRequest: isSet3(object.logoutRequest) ? LogoutRequest.fromJSON(object.logoutRequest) : void 0,
      subscriptionRequest: isSet3(object.subscriptionRequest) ? SubscriptionRequest.fromJSON(object.subscriptionRequest) : void 0,
      instrumentRequest: isSet3(object.instrumentRequest) ? InstrumentRequest.fromJSON(object.instrumentRequest) : void 0,
      instrumentReferenceRequest: isSet3(object.instrumentReferenceRequest) ? InstrumentReferenceRequest.fromJSON(object.instrumentReferenceRequest) : void 0,
      exchangeRequest: isSet3(object.exchangeRequest) ? ExchangeRequest.fromJSON(object.exchangeRequest) : void 0
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
var OpenfeedGatewayMessage = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (message.loginResponse !== void 0) {
      LoginResponse.encode(message.loginResponse, writer.uint32(10).fork()).ldelim();
    }
    if (message.logoutResponse !== void 0) {
      LogoutResponse.encode(message.logoutResponse, writer.uint32(18).fork()).ldelim();
    }
    if (message.instrumentResponse !== void 0) {
      InstrumentResponse.encode(message.instrumentResponse, writer.uint32(26).fork()).ldelim();
    }
    if (message.instrumentReferenceResponse !== void 0) {
      InstrumentReferenceResponse.encode(message.instrumentReferenceResponse, writer.uint32(34).fork()).ldelim();
    }
    if (message.subscriptionResponse !== void 0) {
      SubscriptionResponse.encode(message.subscriptionResponse, writer.uint32(42).fork()).ldelim();
    }
    if (message.marketStatus !== void 0) {
      MarketStatus.encode(message.marketStatus, writer.uint32(50).fork()).ldelim();
    }
    if (message.heartBeat !== void 0) {
      HeartBeat.encode(message.heartBeat, writer.uint32(58).fork()).ldelim();
    }
    if (message.instrumentDefinition !== void 0) {
      InstrumentDefinition.encode(message.instrumentDefinition, writer.uint32(66).fork()).ldelim();
    }
    if (message.marketSnapshot !== void 0) {
      MarketSnapshot.encode(message.marketSnapshot, writer.uint32(74).fork()).ldelim();
    }
    if (message.marketUpdate !== void 0) {
      MarketUpdate.encode(message.marketUpdate, writer.uint32(82).fork()).ldelim();
    }
    if (message.volumeAtPrice !== void 0) {
      VolumeAtPrice.encode(message.volumeAtPrice, writer.uint32(90).fork()).ldelim();
    }
    if (message.ohlc !== void 0) {
      Ohlc.encode(message.ohlc, writer.uint32(98).fork()).ldelim();
    }
    if (message.exchangeResponse !== void 0) {
      ExchangeResponse.encode(message.exchangeResponse, writer.uint32(106).fork()).ldelim();
    }
    if (message.instrumentAction !== void 0) {
      InstrumentAction.encode(message.instrumentAction, writer.uint32(114).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseOpenfeedGatewayMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loginResponse = LoginResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.logoutResponse = LogoutResponse.decode(reader, reader.uint32());
          break;
        case 3:
          message.instrumentResponse = InstrumentResponse.decode(reader, reader.uint32());
          break;
        case 4:
          message.instrumentReferenceResponse = InstrumentReferenceResponse.decode(reader, reader.uint32());
          break;
        case 5:
          message.subscriptionResponse = SubscriptionResponse.decode(reader, reader.uint32());
          break;
        case 6:
          message.marketStatus = MarketStatus.decode(reader, reader.uint32());
          break;
        case 7:
          message.heartBeat = HeartBeat.decode(reader, reader.uint32());
          break;
        case 8:
          message.instrumentDefinition = InstrumentDefinition.decode(reader, reader.uint32());
          break;
        case 9:
          message.marketSnapshot = MarketSnapshot.decode(reader, reader.uint32());
          break;
        case 10:
          message.marketUpdate = MarketUpdate.decode(reader, reader.uint32());
          break;
        case 11:
          message.volumeAtPrice = VolumeAtPrice.decode(reader, reader.uint32());
          break;
        case 12:
          message.ohlc = Ohlc.decode(reader, reader.uint32());
          break;
        case 13:
          message.exchangeResponse = ExchangeResponse.decode(reader, reader.uint32());
          break;
        case 14:
          message.instrumentAction = InstrumentAction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      loginResponse: isSet3(object.loginResponse) ? LoginResponse.fromJSON(object.loginResponse) : void 0,
      logoutResponse: isSet3(object.logoutResponse) ? LogoutResponse.fromJSON(object.logoutResponse) : void 0,
      instrumentResponse: isSet3(object.instrumentResponse) ? InstrumentResponse.fromJSON(object.instrumentResponse) : void 0,
      instrumentReferenceResponse: isSet3(object.instrumentReferenceResponse) ? InstrumentReferenceResponse.fromJSON(object.instrumentReferenceResponse) : void 0,
      subscriptionResponse: isSet3(object.subscriptionResponse) ? SubscriptionResponse.fromJSON(object.subscriptionResponse) : void 0,
      marketStatus: isSet3(object.marketStatus) ? MarketStatus.fromJSON(object.marketStatus) : void 0,
      heartBeat: isSet3(object.heartBeat) ? HeartBeat.fromJSON(object.heartBeat) : void 0,
      instrumentDefinition: isSet3(object.instrumentDefinition) ? InstrumentDefinition.fromJSON(object.instrumentDefinition) : void 0,
      marketSnapshot: isSet3(object.marketSnapshot) ? MarketSnapshot.fromJSON(object.marketSnapshot) : void 0,
      marketUpdate: isSet3(object.marketUpdate) ? MarketUpdate.fromJSON(object.marketUpdate) : void 0,
      volumeAtPrice: isSet3(object.volumeAtPrice) ? VolumeAtPrice.fromJSON(object.volumeAtPrice) : void 0,
      ohlc: isSet3(object.ohlc) ? Ohlc.fromJSON(object.ohlc) : void 0,
      exchangeResponse: isSet3(object.exchangeResponse) ? ExchangeResponse.fromJSON(object.exchangeResponse) : void 0,
      instrumentAction: isSet3(object.instrumentAction) ? InstrumentAction.fromJSON(object.instrumentAction) : void 0
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
var Status = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.service !== 0) {
      writer.uint32(24).int32(message.service);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.int32();
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          message.service = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet3(object.result) ? resultFromJSON(object.result) : 0,
      message: isSet3(object.message) ? String(object.message) : "",
      service: isSet3(object.service) ? serviceFromJSON(object.service) : 0
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
    const message = createBaseStatus();
    message.result = object.result ?? 0;
    message.message = object.message ?? "";
    message.service = object.service ?? 0;
    return message;
  }
};
function createBaseLoginRequest() {
  return { correlationId: long_default.ZERO, username: "", password: "", clientVersion: "", protocolVersion: 0 };
}
var LoginRequest = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(26).string(message.password);
    }
    if (message.clientVersion !== "") {
      writer.uint32(34).string(message.clientVersion);
    }
    if (message.protocolVersion !== 0) {
      writer.uint32(40).sint32(message.protocolVersion);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseLoginRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64();
          break;
        case 2:
          message.username = reader.string();
          break;
        case 3:
          message.password = reader.string();
          break;
        case 4:
          message.clientVersion = reader.string();
          break;
        case 5:
          message.protocolVersion = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet3(object.correlationId) ? long_default.fromValue(object.correlationId) : long_default.ZERO,
      username: isSet3(object.username) ? String(object.username) : "",
      password: isSet3(object.password) ? String(object.password) : "",
      clientVersion: isSet3(object.clientVersion) ? String(object.clientVersion) : "",
      protocolVersion: isSet3(object.protocolVersion) ? Number(object.protocolVersion) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || long_default.ZERO).toString());
    message.username !== void 0 && (obj.username = message.username);
    message.password !== void 0 && (obj.password = message.password);
    message.clientVersion !== void 0 && (obj.clientVersion = message.clientVersion);
    message.protocolVersion !== void 0 && (obj.protocolVersion = Math.round(message.protocolVersion));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseLoginRequest();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? long_default.fromValue(object.correlationId) : long_default.ZERO;
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    message.clientVersion = object.clientVersion ?? "";
    message.protocolVersion = object.protocolVersion ?? 0;
    return message;
  }
};
function createBaseLoginResponse() {
  return { correlationId: long_default.ZERO, status: void 0, token: "" };
}
var LoginResponse = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseLoginResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64();
          break;
        case 2:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 3:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet3(object.correlationId) ? long_default.fromValue(object.correlationId) : long_default.ZERO,
      status: isSet3(object.status) ? Status.fromJSON(object.status) : void 0,
      token: isSet3(object.token) ? String(object.token) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || long_default.ZERO).toString());
    message.status !== void 0 && (obj.status = message.status ? Status.toJSON(message.status) : void 0);
    message.token !== void 0 && (obj.token = message.token);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseLoginResponse();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? long_default.fromValue(object.correlationId) : long_default.ZERO;
    message.status = object.status !== void 0 && object.status !== null ? Status.fromPartial(object.status) : void 0;
    message.token = object.token ?? "";
    return message;
  }
};
function createBaseLogoutRequest() {
  return { correlationId: long_default.ZERO, token: "" };
}
var LogoutRequest = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseLogoutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64();
          break;
        case 3:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet3(object.correlationId) ? long_default.fromValue(object.correlationId) : long_default.ZERO,
      token: isSet3(object.token) ? String(object.token) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || long_default.ZERO).toString());
    message.token !== void 0 && (obj.token = message.token);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseLogoutRequest();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? long_default.fromValue(object.correlationId) : long_default.ZERO;
    message.token = object.token ?? "";
    return message;
  }
};
function createBaseLogoutResponse() {
  return { correlationId: long_default.ZERO, status: void 0 };
}
var LogoutResponse = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseLogoutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64();
          break;
        case 2:
          message.status = Status.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet3(object.correlationId) ? long_default.fromValue(object.correlationId) : long_default.ZERO,
      status: isSet3(object.status) ? Status.fromJSON(object.status) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || long_default.ZERO).toString());
    message.status !== void 0 && (obj.status = message.status ? Status.toJSON(message.status) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseLogoutResponse();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? long_default.fromValue(object.correlationId) : long_default.ZERO;
    message.status = object.status !== void 0 && object.status !== null ? Status.fromPartial(object.status) : void 0;
    return message;
  }
};
function createBaseInstrumentRequest() {
  return {
    correlationId: long_default.ZERO,
    token: "",
    symbol: void 0,
    marketId: void 0,
    exchange: void 0,
    channelId: void 0
  };
}
var InstrumentRequest = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    if (message.symbol !== void 0) {
      writer.uint32(82).string(message.symbol);
    }
    if (message.marketId !== void 0) {
      writer.uint32(88).sint64(message.marketId);
    }
    if (message.exchange !== void 0) {
      writer.uint32(98).string(message.exchange);
    }
    if (message.channelId !== void 0) {
      writer.uint32(104).sint32(message.channelId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64();
          break;
        case 2:
          message.token = reader.string();
          break;
        case 10:
          message.symbol = reader.string();
          break;
        case 11:
          message.marketId = reader.sint64();
          break;
        case 12:
          message.exchange = reader.string();
          break;
        case 13:
          message.channelId = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet3(object.correlationId) ? long_default.fromValue(object.correlationId) : long_default.ZERO,
      token: isSet3(object.token) ? String(object.token) : "",
      symbol: isSet3(object.symbol) ? String(object.symbol) : void 0,
      marketId: isSet3(object.marketId) ? long_default.fromValue(object.marketId) : void 0,
      exchange: isSet3(object.exchange) ? String(object.exchange) : void 0,
      channelId: isSet3(object.channelId) ? Number(object.channelId) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || long_default.ZERO).toString());
    message.token !== void 0 && (obj.token = message.token);
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.marketId !== void 0 && (obj.marketId = (message.marketId || void 0).toString());
    message.exchange !== void 0 && (obj.exchange = message.exchange);
    message.channelId !== void 0 && (obj.channelId = Math.round(message.channelId));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseInstrumentRequest();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? long_default.fromValue(object.correlationId) : long_default.ZERO;
    message.token = object.token ?? "";
    message.symbol = object.symbol ?? void 0;
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? long_default.fromValue(object.marketId) : void 0;
    message.exchange = object.exchange ?? void 0;
    message.channelId = object.channelId ?? void 0;
    return message;
  }
};
function createBaseInstrumentResponse() {
  return {
    correlationId: long_default.ZERO,
    status: void 0,
    numberOfDefinitions: 0,
    symbol: "",
    marketId: long_default.ZERO,
    exchange: "",
    channelId: 0
  };
}
var InstrumentResponse = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    if (message.numberOfDefinitions !== 0) {
      writer.uint32(24).sint32(message.numberOfDefinitions);
    }
    if (message.symbol !== "") {
      writer.uint32(34).string(message.symbol);
    }
    if (!message.marketId.isZero()) {
      writer.uint32(40).sint64(message.marketId);
    }
    if (message.exchange !== "") {
      writer.uint32(50).string(message.exchange);
    }
    if (message.channelId !== 0) {
      writer.uint32(56).sint32(message.channelId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64();
          break;
        case 2:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 3:
          message.numberOfDefinitions = reader.sint32();
          break;
        case 4:
          message.symbol = reader.string();
          break;
        case 5:
          message.marketId = reader.sint64();
          break;
        case 6:
          message.exchange = reader.string();
          break;
        case 7:
          message.channelId = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet3(object.correlationId) ? long_default.fromValue(object.correlationId) : long_default.ZERO,
      status: isSet3(object.status) ? Status.fromJSON(object.status) : void 0,
      numberOfDefinitions: isSet3(object.numberOfDefinitions) ? Number(object.numberOfDefinitions) : 0,
      symbol: isSet3(object.symbol) ? String(object.symbol) : "",
      marketId: isSet3(object.marketId) ? long_default.fromValue(object.marketId) : long_default.ZERO,
      exchange: isSet3(object.exchange) ? String(object.exchange) : "",
      channelId: isSet3(object.channelId) ? Number(object.channelId) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || long_default.ZERO).toString());
    message.status !== void 0 && (obj.status = message.status ? Status.toJSON(message.status) : void 0);
    message.numberOfDefinitions !== void 0 && (obj.numberOfDefinitions = Math.round(message.numberOfDefinitions));
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.marketId !== void 0 && (obj.marketId = (message.marketId || long_default.ZERO).toString());
    message.exchange !== void 0 && (obj.exchange = message.exchange);
    message.channelId !== void 0 && (obj.channelId = Math.round(message.channelId));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseInstrumentResponse();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? long_default.fromValue(object.correlationId) : long_default.ZERO;
    message.status = object.status !== void 0 && object.status !== null ? Status.fromPartial(object.status) : void 0;
    message.numberOfDefinitions = object.numberOfDefinitions ?? 0;
    message.symbol = object.symbol ?? "";
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? long_default.fromValue(object.marketId) : long_default.ZERO;
    message.exchange = object.exchange ?? "";
    message.channelId = object.channelId ?? 0;
    return message;
  }
};
function createBaseInstrumentReferenceRequest() {
  return {
    correlationId: long_default.ZERO,
    token: "",
    symbol: void 0,
    marketId: void 0,
    exchange: void 0,
    channelId: void 0
  };
}
var InstrumentReferenceRequest = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    if (message.symbol !== void 0) {
      writer.uint32(82).string(message.symbol);
    }
    if (message.marketId !== void 0) {
      writer.uint32(88).sint64(message.marketId);
    }
    if (message.exchange !== void 0) {
      writer.uint32(98).string(message.exchange);
    }
    if (message.channelId !== void 0) {
      writer.uint32(104).sint32(message.channelId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentReferenceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64();
          break;
        case 2:
          message.token = reader.string();
          break;
        case 10:
          message.symbol = reader.string();
          break;
        case 11:
          message.marketId = reader.sint64();
          break;
        case 12:
          message.exchange = reader.string();
          break;
        case 13:
          message.channelId = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet3(object.correlationId) ? long_default.fromValue(object.correlationId) : long_default.ZERO,
      token: isSet3(object.token) ? String(object.token) : "",
      symbol: isSet3(object.symbol) ? String(object.symbol) : void 0,
      marketId: isSet3(object.marketId) ? long_default.fromValue(object.marketId) : void 0,
      exchange: isSet3(object.exchange) ? String(object.exchange) : void 0,
      channelId: isSet3(object.channelId) ? Number(object.channelId) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || long_default.ZERO).toString());
    message.token !== void 0 && (obj.token = message.token);
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.marketId !== void 0 && (obj.marketId = (message.marketId || void 0).toString());
    message.exchange !== void 0 && (obj.exchange = message.exchange);
    message.channelId !== void 0 && (obj.channelId = Math.round(message.channelId));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseInstrumentReferenceRequest();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? long_default.fromValue(object.correlationId) : long_default.ZERO;
    message.token = object.token ?? "";
    message.symbol = object.symbol ?? void 0;
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? long_default.fromValue(object.marketId) : void 0;
    message.exchange = object.exchange ?? void 0;
    message.channelId = object.channelId ?? void 0;
    return message;
  }
};
function createBaseInstrumentReferenceResponse() {
  return {
    correlationId: long_default.ZERO,
    status: void 0,
    numberOfDefinitions: 0,
    channelId: 0,
    marketId: long_default.ZERO,
    symbol: "",
    exchange: "",
    ddfSymbol: "",
    ddfExchange: "",
    ddfBaseCode: "",
    exchangeSymbol: ""
  };
}
var InstrumentReferenceResponse = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    if (message.numberOfDefinitions !== 0) {
      writer.uint32(24).sint32(message.numberOfDefinitions);
    }
    if (message.channelId !== 0) {
      writer.uint32(32).sint32(message.channelId);
    }
    if (!message.marketId.isZero()) {
      writer.uint32(40).sint64(message.marketId);
    }
    if (message.symbol !== "") {
      writer.uint32(50).string(message.symbol);
    }
    if (message.exchange !== "") {
      writer.uint32(58).string(message.exchange);
    }
    if (message.ddfSymbol !== "") {
      writer.uint32(66).string(message.ddfSymbol);
    }
    if (message.ddfExchange !== "") {
      writer.uint32(74).string(message.ddfExchange);
    }
    if (message.ddfBaseCode !== "") {
      writer.uint32(82).string(message.ddfBaseCode);
    }
    if (message.exchangeSymbol !== "") {
      writer.uint32(90).string(message.exchangeSymbol);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInstrumentReferenceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64();
          break;
        case 2:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 3:
          message.numberOfDefinitions = reader.sint32();
          break;
        case 4:
          message.channelId = reader.sint32();
          break;
        case 5:
          message.marketId = reader.sint64();
          break;
        case 6:
          message.symbol = reader.string();
          break;
        case 7:
          message.exchange = reader.string();
          break;
        case 8:
          message.ddfSymbol = reader.string();
          break;
        case 9:
          message.ddfExchange = reader.string();
          break;
        case 10:
          message.ddfBaseCode = reader.string();
          break;
        case 11:
          message.exchangeSymbol = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet3(object.correlationId) ? long_default.fromValue(object.correlationId) : long_default.ZERO,
      status: isSet3(object.status) ? Status.fromJSON(object.status) : void 0,
      numberOfDefinitions: isSet3(object.numberOfDefinitions) ? Number(object.numberOfDefinitions) : 0,
      channelId: isSet3(object.channelId) ? Number(object.channelId) : 0,
      marketId: isSet3(object.marketId) ? long_default.fromValue(object.marketId) : long_default.ZERO,
      symbol: isSet3(object.symbol) ? String(object.symbol) : "",
      exchange: isSet3(object.exchange) ? String(object.exchange) : "",
      ddfSymbol: isSet3(object.ddfSymbol) ? String(object.ddfSymbol) : "",
      ddfExchange: isSet3(object.ddfExchange) ? String(object.ddfExchange) : "",
      ddfBaseCode: isSet3(object.ddfBaseCode) ? String(object.ddfBaseCode) : "",
      exchangeSymbol: isSet3(object.exchangeSymbol) ? String(object.exchangeSymbol) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || long_default.ZERO).toString());
    message.status !== void 0 && (obj.status = message.status ? Status.toJSON(message.status) : void 0);
    message.numberOfDefinitions !== void 0 && (obj.numberOfDefinitions = Math.round(message.numberOfDefinitions));
    message.channelId !== void 0 && (obj.channelId = Math.round(message.channelId));
    message.marketId !== void 0 && (obj.marketId = (message.marketId || long_default.ZERO).toString());
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.exchange !== void 0 && (obj.exchange = message.exchange);
    message.ddfSymbol !== void 0 && (obj.ddfSymbol = message.ddfSymbol);
    message.ddfExchange !== void 0 && (obj.ddfExchange = message.ddfExchange);
    message.ddfBaseCode !== void 0 && (obj.ddfBaseCode = message.ddfBaseCode);
    message.exchangeSymbol !== void 0 && (obj.exchangeSymbol = message.exchangeSymbol);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseInstrumentReferenceResponse();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? long_default.fromValue(object.correlationId) : long_default.ZERO;
    message.status = object.status !== void 0 && object.status !== null ? Status.fromPartial(object.status) : void 0;
    message.numberOfDefinitions = object.numberOfDefinitions ?? 0;
    message.channelId = object.channelId ?? 0;
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? long_default.fromValue(object.marketId) : long_default.ZERO;
    message.symbol = object.symbol ?? "";
    message.exchange = object.exchange ?? "";
    message.ddfSymbol = object.ddfSymbol ?? "";
    message.ddfExchange = object.ddfExchange ?? "";
    message.ddfBaseCode = object.ddfBaseCode ?? "";
    message.exchangeSymbol = object.exchangeSymbol ?? "";
    return message;
  }
};
function createBaseExchangeRequest() {
  return { correlationId: long_default.ZERO, token: "" };
}
var ExchangeRequest = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseExchangeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64();
          break;
        case 2:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet3(object.correlationId) ? long_default.fromValue(object.correlationId) : long_default.ZERO,
      token: isSet3(object.token) ? String(object.token) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || long_default.ZERO).toString());
    message.token !== void 0 && (obj.token = message.token);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseExchangeRequest();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? long_default.fromValue(object.correlationId) : long_default.ZERO;
    message.token = object.token ?? "";
    return message;
  }
};
function createBaseExchangeResponse() {
  return { correlationId: long_default.ZERO, status: void 0, exchanges: [] };
}
var ExchangeResponse = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.exchanges) {
      ExchangeResponse_Exchange.encode(v, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseExchangeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64();
          break;
        case 2:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 3:
          message.exchanges.push(ExchangeResponse_Exchange.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet3(object.correlationId) ? long_default.fromValue(object.correlationId) : long_default.ZERO,
      status: isSet3(object.status) ? Status.fromJSON(object.status) : void 0,
      exchanges: Array.isArray(object == null ? void 0 : object.exchanges) ? object.exchanges.map((e) => ExchangeResponse_Exchange.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || long_default.ZERO).toString());
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
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? long_default.fromValue(object.correlationId) : long_default.ZERO;
    message.status = object.status !== void 0 && object.status !== null ? Status.fromPartial(object.status) : void 0;
    message.exchanges = ((_a = object.exchanges) == null ? void 0 : _a.map((e) => ExchangeResponse_Exchange.fromPartial(e))) || [];
    return message;
  }
};
function createBaseExchangeResponse_Exchange() {
  return { code: "", description: "", aliases: [] };
}
var ExchangeResponse_Exchange = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.aliases) {
      writer.uint32(26).string(v);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseExchangeResponse_Exchange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.aliases.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      code: isSet3(object.code) ? String(object.code) : "",
      description: isSet3(object.description) ? String(object.description) : "",
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
    var _a;
    const message = createBaseExchangeResponse_Exchange();
    message.code = object.code ?? "";
    message.description = object.description ?? "";
    message.aliases = ((_a = object.aliases) == null ? void 0 : _a.map((e) => e)) || [];
    return message;
  }
};
function createBaseBulkSubscriptionFilter() {
  return { symbolType: 0, symbolPattern: "" };
}
var BulkSubscriptionFilter = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (message.symbolType !== 0) {
      writer.uint32(8).int32(message.symbolType);
    }
    if (message.symbolPattern !== "") {
      writer.uint32(18).string(message.symbolPattern);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseBulkSubscriptionFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.symbolType = reader.int32();
          break;
        case 2:
          message.symbolPattern = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      symbolType: isSet3(object.symbolType) ? symbolTypeFromJSON(object.symbolType) : 0,
      symbolPattern: isSet3(object.symbolPattern) ? String(object.symbolPattern) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.symbolType !== void 0 && (obj.symbolType = symbolTypeToJSON(message.symbolType));
    message.symbolPattern !== void 0 && (obj.symbolPattern = message.symbolPattern);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseBulkSubscriptionFilter();
    message.symbolType = object.symbolType ?? 0;
    message.symbolPattern = object.symbolPattern ?? "";
    return message;
  }
};
function createBaseSubscriptionRequest() {
  return { correlationId: long_default.ZERO, token: "", service: 0, unsubscribe: false, requests: [] };
}
var SubscriptionRequest = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    if (message.service !== 0) {
      writer.uint32(24).int32(message.service);
    }
    if (message.unsubscribe === true) {
      writer.uint32(32).bool(message.unsubscribe);
    }
    for (const v of message.requests) {
      SubscriptionRequest_Request.encode(v, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64();
          break;
        case 2:
          message.token = reader.string();
          break;
        case 3:
          message.service = reader.int32();
          break;
        case 4:
          message.unsubscribe = reader.bool();
          break;
        case 5:
          message.requests.push(SubscriptionRequest_Request.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet3(object.correlationId) ? long_default.fromValue(object.correlationId) : long_default.ZERO,
      token: isSet3(object.token) ? String(object.token) : "",
      service: isSet3(object.service) ? serviceFromJSON(object.service) : 0,
      unsubscribe: isSet3(object.unsubscribe) ? Boolean(object.unsubscribe) : false,
      requests: Array.isArray(object == null ? void 0 : object.requests) ? object.requests.map((e) => SubscriptionRequest_Request.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || long_default.ZERO).toString());
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
    var _a;
    const message = createBaseSubscriptionRequest();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? long_default.fromValue(object.correlationId) : long_default.ZERO;
    message.token = object.token ?? "";
    message.service = object.service ?? 0;
    message.unsubscribe = object.unsubscribe ?? false;
    message.requests = ((_a = object.requests) == null ? void 0 : _a.map((e) => SubscriptionRequest_Request.fromPartial(e))) || [];
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
var SubscriptionRequest_Request = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (message.symbol !== void 0) {
      writer.uint32(10).string(message.symbol);
    }
    if (message.marketId !== void 0) {
      writer.uint32(16).sint64(message.marketId);
    }
    if (message.exchange !== void 0) {
      writer.uint32(26).string(message.exchange);
    }
    if (message.channelId !== void 0) {
      writer.uint32(32).sint32(message.channelId);
    }
    writer.uint32(82).fork();
    for (const v of message.subscriptionType) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.snapshotIntervalSeconds !== 0) {
      writer.uint32(88).sint32(message.snapshotIntervalSeconds);
    }
    writer.uint32(98).fork();
    for (const v of message.instrumentType) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.bulkSubscriptionFilter) {
      BulkSubscriptionFilter.encode(v, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionRequest_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.symbol = reader.string();
          break;
        case 2:
          message.marketId = reader.sint64();
          break;
        case 3:
          message.exchange = reader.string();
          break;
        case 4:
          message.channelId = reader.sint32();
          break;
        case 10:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.subscriptionType.push(reader.int32());
            }
          } else {
            message.subscriptionType.push(reader.int32());
          }
          break;
        case 11:
          message.snapshotIntervalSeconds = reader.sint32();
          break;
        case 12:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.instrumentType.push(reader.int32());
            }
          } else {
            message.instrumentType.push(reader.int32());
          }
          break;
        case 13:
          message.bulkSubscriptionFilter.push(BulkSubscriptionFilter.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      symbol: isSet3(object.symbol) ? String(object.symbol) : void 0,
      marketId: isSet3(object.marketId) ? long_default.fromValue(object.marketId) : void 0,
      exchange: isSet3(object.exchange) ? String(object.exchange) : void 0,
      channelId: isSet3(object.channelId) ? Number(object.channelId) : void 0,
      subscriptionType: Array.isArray(object == null ? void 0 : object.subscriptionType) ? object.subscriptionType.map((e) => subscriptionTypeFromJSON(e)) : [],
      snapshotIntervalSeconds: isSet3(object.snapshotIntervalSeconds) ? Number(object.snapshotIntervalSeconds) : 0,
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
    var _a, _b, _c;
    const message = createBaseSubscriptionRequest_Request();
    message.symbol = object.symbol ?? void 0;
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? long_default.fromValue(object.marketId) : void 0;
    message.exchange = object.exchange ?? void 0;
    message.channelId = object.channelId ?? void 0;
    message.subscriptionType = ((_a = object.subscriptionType) == null ? void 0 : _a.map((e) => e)) || [];
    message.snapshotIntervalSeconds = object.snapshotIntervalSeconds ?? 0;
    message.instrumentType = ((_b = object.instrumentType) == null ? void 0 : _b.map((e) => e)) || [];
    message.bulkSubscriptionFilter = ((_c = object.bulkSubscriptionFilter) == null ? void 0 : _c.map((e) => BulkSubscriptionFilter.fromPartial(e))) || [];
    return message;
  }
};
function createBaseSubscriptionResponse() {
  return {
    correlationId: long_default.ZERO,
    status: void 0,
    symbol: "",
    marketId: long_default.ZERO,
    exchange: "",
    channelId: 0,
    numberOfDefinitions: 0,
    subscriptionType: 0,
    unsubscribe: false,
    snapshotIntervalSeconds: 0
  };
}
var SubscriptionResponse = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    if (message.symbol !== "") {
      writer.uint32(26).string(message.symbol);
    }
    if (!message.marketId.isZero()) {
      writer.uint32(32).sint64(message.marketId);
    }
    if (message.exchange !== "") {
      writer.uint32(42).string(message.exchange);
    }
    if (message.channelId !== 0) {
      writer.uint32(48).sint32(message.channelId);
    }
    if (message.numberOfDefinitions !== 0) {
      writer.uint32(56).sint32(message.numberOfDefinitions);
    }
    if (message.subscriptionType !== 0) {
      writer.uint32(64).int32(message.subscriptionType);
    }
    if (message.unsubscribe === true) {
      writer.uint32(72).bool(message.unsubscribe);
    }
    if (message.snapshotIntervalSeconds !== 0) {
      writer.uint32(80).sint32(message.snapshotIntervalSeconds);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64();
          break;
        case 2:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 3:
          message.symbol = reader.string();
          break;
        case 4:
          message.marketId = reader.sint64();
          break;
        case 5:
          message.exchange = reader.string();
          break;
        case 6:
          message.channelId = reader.sint32();
          break;
        case 7:
          message.numberOfDefinitions = reader.sint32();
          break;
        case 8:
          message.subscriptionType = reader.int32();
          break;
        case 9:
          message.unsubscribe = reader.bool();
          break;
        case 10:
          message.snapshotIntervalSeconds = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      correlationId: isSet3(object.correlationId) ? long_default.fromValue(object.correlationId) : long_default.ZERO,
      status: isSet3(object.status) ? Status.fromJSON(object.status) : void 0,
      symbol: isSet3(object.symbol) ? String(object.symbol) : "",
      marketId: isSet3(object.marketId) ? long_default.fromValue(object.marketId) : long_default.ZERO,
      exchange: isSet3(object.exchange) ? String(object.exchange) : "",
      channelId: isSet3(object.channelId) ? Number(object.channelId) : 0,
      numberOfDefinitions: isSet3(object.numberOfDefinitions) ? Number(object.numberOfDefinitions) : 0,
      subscriptionType: isSet3(object.subscriptionType) ? subscriptionTypeFromJSON(object.subscriptionType) : 0,
      unsubscribe: isSet3(object.unsubscribe) ? Boolean(object.unsubscribe) : false,
      snapshotIntervalSeconds: isSet3(object.snapshotIntervalSeconds) ? Number(object.snapshotIntervalSeconds) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.correlationId !== void 0 && (obj.correlationId = (message.correlationId || long_default.ZERO).toString());
    message.status !== void 0 && (obj.status = message.status ? Status.toJSON(message.status) : void 0);
    message.symbol !== void 0 && (obj.symbol = message.symbol);
    message.marketId !== void 0 && (obj.marketId = (message.marketId || long_default.ZERO).toString());
    message.exchange !== void 0 && (obj.exchange = message.exchange);
    message.channelId !== void 0 && (obj.channelId = Math.round(message.channelId));
    message.numberOfDefinitions !== void 0 && (obj.numberOfDefinitions = Math.round(message.numberOfDefinitions));
    message.subscriptionType !== void 0 && (obj.subscriptionType = subscriptionTypeToJSON(message.subscriptionType));
    message.unsubscribe !== void 0 && (obj.unsubscribe = message.unsubscribe);
    message.snapshotIntervalSeconds !== void 0 && (obj.snapshotIntervalSeconds = Math.round(message.snapshotIntervalSeconds));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseSubscriptionResponse();
    message.correlationId = object.correlationId !== void 0 && object.correlationId !== null ? long_default.fromValue(object.correlationId) : long_default.ZERO;
    message.status = object.status !== void 0 && object.status !== null ? Status.fromPartial(object.status) : void 0;
    message.symbol = object.symbol ?? "";
    message.marketId = object.marketId !== void 0 && object.marketId !== null ? long_default.fromValue(object.marketId) : long_default.ZERO;
    message.exchange = object.exchange ?? "";
    message.channelId = object.channelId ?? 0;
    message.numberOfDefinitions = object.numberOfDefinitions ?? 0;
    message.subscriptionType = object.subscriptionType ?? 0;
    message.unsubscribe = object.unsubscribe ?? false;
    message.snapshotIntervalSeconds = object.snapshotIntervalSeconds ?? 0;
    return message;
  }
};
if (import_minimal3.default.util.Long !== long_default) {
  import_minimal3.default.util.Long = long_default;
  import_minimal3.default.configure();
}
function isSet3(value) {
  return value !== null && value !== void 0;
}

// src/utilities/async.ts
var ResolutionSource = class {
  _whenCompleted;
  _resolve = null;
  _reject = null;
  _completed = false;
  constructor() {
    this._whenCompleted = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }
  onResolve = (result) => {
    var _a;
    this._completed = true;
    (_a = this._resolve) == null ? void 0 : _a.call(this, result);
  };
  onError = (error) => {
    var _a;
    this._completed = true;
    (_a = this._reject) == null ? void 0 : _a.call(this, error);
  };
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
};

// generated/version.ts
var version = "0.0.1";

// src/connection/connection.ts
var send = (socket, message) => {
  socket.send(OpenfeedGatewayRequest.encode(toT(message)).finish());
};
var receive = (msgEvent) => {
  return OpenfeedGatewayMessage.decode(new Uint8Array(msgEvent.data));
};
var _CorrelationId = class {
};
var CorrelationId = _CorrelationId;
__publicField(CorrelationId, "correlationId", long_default.fromNumber(-1));
__publicField(CorrelationId, "create", () => {
  _CorrelationId.correlationId = _CorrelationId.correlationId.add(1);
  return _CorrelationId.correlationId;
});
var DuplicateLoginError = class extends Error {
  get name() {
    return this.constructor.name;
  }
};
var InvalidCredentialsError = class extends Error {
  get name() {
    return this.constructor.name;
  }
};
var ConnectionDisposedError = class extends Error {
  get name() {
    return this.constructor.name;
  }
};
var OpenFeedConnection = class {
  constructor(connectionToken, socket, listeners, logger) {
    this.connectionToken = connectionToken;
    this.socket = socket;
    this.listeners = listeners;
    this.logger = logger;
    this.socket.onmessage = this.onMessage;
    this.socket.onerror = this.onError;
    this.socket.onclose = this.onClose;
    this.runConnectionWatchLoop();
  }
  subscriptions = /* @__PURE__ */ new Map();
  exchangeRequests = /* @__PURE__ */ new Map();
  instrumentRequests = /* @__PURE__ */ new Map();
  instrumentReferenceRequests = /* @__PURE__ */ new Map();
  whenDisconnectedSource = new ResolutionSource();
  messageTriggered = false;
  runConnectionWatchLoop = async () => {
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
  };
  onMessage = async (event) => {
    var _a, _b, _c, _d;
    try {
      this.messageTriggered = true;
      const message = receive(event);
      if (message.heartBeat) {
        return;
      }
      if (((_b = (_a = message.logoutResponse) == null ? void 0 : _a.status) == null ? void 0 : _b.result) === 115 /* DUPLICATE_LOGIN */) {
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
  };
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
  onError = (error) => {
    var _a;
    (_a = this.logger) == null ? void 0 : _a.warn(`Socket error: ${error.message}`);
    this.disconnect(new Error(`Socket error: ${error.message}`));
  };
  onClose = (event) => {
    var _a;
    (_a = this.logger) == null ? void 0 : _a.warn(`Socket closed: ${event.reason}`);
    this.disconnect(new Error(`Socket closed: ${event.reason}`));
  };
  subscribe = (service, subscriptionType, snapshotIntervalSeconds, symbols = null, marketIds = null, exchanges = null, channels = null) => {
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
      service,
      correlationId,
      token: this.connectionToken,
      requests: requests.map((r) => toT(r)),
      unsubscribe: false
    };
    this.subscriptions.set(correlationId.toString(), subscriptionRequest);
    send(this.socket, { subscriptionRequest });
    return correlationId;
  };
  unsubscribe = (subscriptionId) => {
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
  };
  getExchanges = async () => {
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
  };
  getInstrument = async (request) => {
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
  };
  getInstrumentReference = async (request) => {
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
  };
  whenDisconnected = () => this.whenDisconnectedSource.whenCompleted;
  dispose = () => this.disconnect(new ConnectionDisposedError("Disposed"));
};
var OpenFeedClient = class {
  constructor(url, username, password, listeners, logger, clientId) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.listeners = listeners;
    this.logger = logger;
    this.clientId = clientId;
    this.runConnectLoop();
  }
  socket = null;
  _connection = null;
  whenConnectedInternalSource = new ResolutionSource();
  whenConnectedSource = new ResolutionSource();
  loopResetSource = new ResolutionSource();
  subscribeResetSource = new ResolutionSource();
  subscriptions = /* @__PURE__ */ new Map();
  onOpen = () => {
    if (!this.socket)
      return;
    const clientVersion = `sdk-js:${version};client-id:${this.clientId ?? "default"};platform:${import_platform.default.description}`;
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
  };
  onMessage = async (event) => {
    var _a, _b, _c, _d, _e, _f, _g;
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
    } else if ([125 /* INSUFFICIENT_PRIVILEGES */, 124 /* INVALID_CREDENTIALS */, 126 /* AUTHENTICATION_REQUIRED */].includes(
      ((_f = (_e = message.loginResponse) == null ? void 0 : _e.status) == null ? void 0 : _f.result) ?? 1 /* SUCCESS */
    )) {
      (_g = this.logger) == null ? void 0 : _g.warn("Received authentication error, disconnecting...");
      this.whenConnectedInternalSource.reject(
        new InvalidCredentialsError("Invalid credentials provided. Please update credentials and try again.")
      );
    }
  };
  onError = (error) => {
    var _a;
    (_a = this.logger) == null ? void 0 : _a.log(`Socket error: ${error.message}`);
    if (!this.whenConnectedInternalSource.completed) {
      this.whenConnectedInternalSource.reject(new Error(`Error when connecting to socket: ${error.message}`));
    }
  };
  onClose = (event) => {
    var _a;
    (_a = this.logger) == null ? void 0 : _a.log(`Socket closed: ${event.reason}`);
    if (!this.whenConnectedInternalSource.completed) {
      this.whenConnectedInternalSource.reject(new Error(`Socket closed: ${event.reason}`));
    }
  };
  runConnectLoop = async () => {
    var _a, _b;
    for (; ; ) {
      let timeoutId = null;
      if (this.socket) {
        if (this.socket.readyState !== import_isomorphic_ws.default.CLOSED && this.socket.readyState !== import_isomorphic_ws.default.CLOSING) {
          this.socket.close(1e3, "Closed from socket loop");
        }
        this.socket = null;
      }
      try {
        this.socket = new import_isomorphic_ws.default(this.url);
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
        if (socket.readyState !== import_isomorphic_ws.default.CLOSED && socket.readyState !== import_isomorphic_ws.default.CLOSING) {
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
  };
  cleanUp = () => {
    for (const [, sub] of this.subscriptions) {
      sub.resolve();
    }
    this.subscriptions.clear();
    this.whenConnectedSource.reject(new Error("Connection disposed"));
  };
  runSubscribeLoop = async (service, subscriptionType, snapshotIntervalSeconds, symbols, marketIds, exchanges, channels, cancelSource) => {
    var _a;
    for (; ; ) {
      let timeoutId = null;
      try {
        const connection = await Promise.race([this.connection, cancelSource.whenCompleted]);
        if (cancelSource.completed || !(connection instanceof OpenFeedConnection)) {
          return;
        }
        const subscriptionId = connection.subscribe(
          service,
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
  };
  subscribe = (service, subscriptionType, snapshotIntervalSeconds, symbols = null, marketIds = null, exchanges = null, channels = null) => {
    const id = CorrelationId.create();
    const cancelSource = new ResolutionSource();
    this.subscriptions.set(id.toString(), cancelSource);
    this.runSubscribeLoop(service, subscriptionType, snapshotIntervalSeconds, symbols, marketIds, exchanges, channels, cancelSource);
    return id;
  };
  unsubscribe = (subscriptionId) => {
    const cancelSource = this.subscriptions.get(subscriptionId.toString());
    if (!cancelSource) {
      throw new Error(`Subscription ID ${subscriptionId} does not exist.`);
    }
    this.subscriptions.delete(subscriptionId.toString());
    cancelSource.resolve();
  };
  get connection() {
    if (this._connection)
      return Promise.resolve(this._connection);
    if (this.whenConnectedSource.completed) {
      throw new ConnectionDisposedError("Connection disposed");
    }
    return this.whenConnectedSource.whenCompleted;
  }
  dispose = () => {
    if (this._connection) {
      this._connection.dispose();
    } else {
      this.whenConnectedInternalSource.reject(new ConnectionDisposedError("Connection disposed"));
    }
  };
};

// src/connection/listeners.ts
var OpenFeedListeners = class {
  instrumentBySymbol = /* @__PURE__ */ new Map();
  instrumentByMarketId = /* @__PURE__ */ new Map();
  constructor() {
    this.onMessage = this.addDetails;
  }
  addDetails = (message) => {
    let def;
    let symbols;
    const getInstrumentDefinition = (marketId) => {
      const res = this.instrumentByMarketId.get(marketId.toString());
      return res ?? [void 0, void 0];
    };
    if (message.subscriptionResponse) {
      if (message.subscriptionResponse != null && message.subscriptionResponse.marketId !== long_default.ZERO) {
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
    return this.onMessageWithMetadata(message, symbols ?? [], def);
  };
  onConnected = () => {
  };
  onCredentialsRejected = () => {
  };
  onDisconnected = () => {
  };
  onMessage = () => {
  };
  onMessageWithMetadata = () => {
  };
};
export {
  BestBidOffer,
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
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
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
