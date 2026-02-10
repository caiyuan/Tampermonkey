异常信息：
h5-lib.88f79b1e.js Uncaught RangeError: Invalid array length
```
ArrayBuffer(124503456)byteLength: 124503456detached: falsemaxByteLength: 124503456resizable: false[[Prototype]]: ArrayBuffer[[Int8Array]]: Int8Array(124503456)[[Uint8Array]]: Uint8Array(124503456)[[Int16Array]]: Int16Array(62251728)[[Int32Array]]: Int32Array(31125864)[[ArrayBufferByteLength]]: 124503456[[ArrayBufferData]]: 27
h5-lib.88f79b1e.js:78 Uncaught RangeError: Invalid array length
    at Array.push (<anonymous>)
    at Object.stringify (h5-lib.88f79b1e.js:78:430198)
    at Object.toString (h5-lib.88f79b1e.js:78:425220)
    at Proxy.createEpub (index.5df1ab72.js:1:4035)
    at n.onreadystatechange (index.5df1ab72.js:1:8917)
```

解决方案：
修改 h5-lib.88f79b1e.js 中 stringify 方法实现
```js
encBase64.exports = function(e) {
    return function() {

        t.enc.Base64 = {
            /*
// 原始代码
            stringify: function(e) {
                var t = e.words
                  , n = e.sigBytes
                  , r = this._map;
                e.clamp();
                for (var i = [], o = 0; o < n; o += 3)
                    for (var a = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, s = 0; s < 4 && o + .75 * s < n; s++)
                        i.push(r.charAt(a >>> 6 * (3 - s) & 63));
                var l = r.charAt(64);
                if (l)
                    for (; i.length % 4; )
                        i.push(l);
                return i.join("")
            },
            */
// 问题修复
            stringify: function(e) {
                var t = e.words
                  , n = e.sigBytes
                  , r = this._map;

                e.clamp();

                var CHUNK_SIZE = 16384; // 16K chars
                var chunks = [];
                var i = [];
                var count = 0;

                for (var o = 0; o < n; o += 3) {
                    var a = ((t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) << 16 | ((t[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) & 255) << 8 | ((t[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) & 255);

                    for (var s = 0; s < 4 && o + 0.75 * s < n; s++) {
                        i.push(r.charAt((a >>> (6 * (3 - s))) & 63));
                        if (++count >= CHUNK_SIZE) {
                            chunks.push(i.join(""));
                            i.length = 0;
                            count = 0;
                        }
                    }
                }

                if (i.length) {
                    chunks.push(i.join(""));
                }

                var l = r.charAt(64);
                if (l) {
                    var pad = chunks.length ? chunks[chunks.length - 1] : "";
                    while (pad.length % 4)
                        pad += l;
                    chunks[chunks.length - 1] = pad;
                }

                return chunks.join("");
            },
```
