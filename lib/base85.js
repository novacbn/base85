"use strict";

var alphabets = require("./alphabets");

var NUM_MAXVALUE = Math.pow(2, 32) - 1;
var QUAD85 = 85 * 85 * 85 * 85;
var TRIO85 = 85 * 85 * 85;
var DUO85 = 85 * 85;
var SING85 = 85;

/* Characters to allow (and ignore) in an encoded buffer */
var IGNORE_CHARS = [
    0x09 /* horizontal tab */,
    0x0a /* line feed, new line */,
    0x0b /* vertical tab */,
    0x0c /* form feed, new page */,
    0x0d /* carriage return */,
    0x20 /* space */,
];

var ASCII85_ENC_START = "<~";
var ASCII85_ENC_END = "~>";

const ENCODINGS = {
    bytes: "ByteArray",
    string: "String",
};

function toBuffer(string) {
    const encoder = new TextEncoder();

    return encoder.encode(string);
}

function fromBuffer(buffer) {
    const decoder = new TextDecoder();

    return decoder.decode(buffer);
}

function encodeBuffer(buffer) {
    var enctable = alphabets.enc;
    var padding = buffer.length % 4 === 0 ? 0 : 4 - (buffer.length % 4);

    var result = "";
    for (var i = 0; i < buffer.length; i += 4) {
        /* 32 bit number of the current 4 bytes (padded with 0 as necessary) */
        var num =
            ((buffer[i] << 24) >>> 0) + // Shift right to force unsigned number
            (((i + 1 > buffer.length ? 0 : buffer[i + 1]) << 16) >>> 0) +
            (((i + 2 > buffer.length ? 0 : buffer[i + 2]) << 8) >>> 0) +
            (((i + 3 > buffer.length ? 0 : buffer[i + 3]) << 0) >>> 0);

        /* Create 5 characters from '!' to 'u' alphabet */
        var block = [];
        for (var j = 0; j < 5; ++j) {
            block.unshift(enctable[num % 85]);
            num = Math.floor(num / 85);
        }

        block = block.join("");
        if (block === "!!!!!") {
            block = "z";
        }
        /* And append them to the result */
        result += block;
    }

    return ASCII85_ENC_START + result.substring(0, result.length - padding) + ASCII85_ENC_END;
}

function decodeBuffer(buffer) {
    var dectable = alphabets.dec;

    var dataLength = buffer.length;
    dataLength -= ASCII85_ENC_START.length + ASCII85_ENC_END.length;

    var padding = dataLength % 5 === 0 ? 0 : 5 - (dataLength % 5);

    var bufferStart = ASCII85_ENC_START.length;
    var bufferEnd = bufferStart + dataLength;

    var result = new Uint8Array(4 * Math.ceil((bufferEnd - bufferStart) / 5));

    var nextValidByte = function (index) {
        if (index < bufferEnd) {
            while (-1 !== IGNORE_CHARS.indexOf(buffer[index])) {
                padding = (padding + 1) % 5;
                index++; // skip newline character
            }
        }
        return index;
    };

    var writeIndex = 0;
    for (var i = bufferStart; i < bufferEnd; ) {
        var num = 0;

        i = nextValidByte(i);
        num = dectable[buffer[i]] * QUAD85;

        i = nextValidByte(i + 1);
        num += (i >= bufferEnd ? 84 : dectable[buffer[i]]) * TRIO85;

        i = nextValidByte(i + 1);
        num += (i >= bufferEnd ? 84 : dectable[buffer[i]]) * DUO85;

        i = nextValidByte(i + 1);
        num += (i >= bufferEnd ? 84 : dectable[buffer[i]]) * SING85;

        i = nextValidByte(i + 1);
        num += i >= bufferEnd ? 84 : dectable[buffer[i]];

        i = nextValidByte(i + 1);

        if (num > NUM_MAXVALUE || num < 0) {
            /* Bogus data */
            return false;
        }

        //result.writeUInt32BE(num, writeIndex);

        result[writeIndex] = num >>> 24;
        result[writeIndex + 1] = num >>> 16;
        result[writeIndex + 2] = num >>> 8;
        result[writeIndex + 3] = num & 0xff;

        writeIndex += 4;
    }

    return result.slice(0, writeIndex - padding);
}

module.exports = {
    encode: function (data, encoding = ENCODINGS.string) {
        if (typeof data === "string") data = toBuffer(data);

        if (encoding === ENCODINGS.bytes) return toBuffer(encodeBuffer(data));
        return encodeBuffer(data);
    },

    decode: function (data, encoding = ENCODINGS.bytes) {
        if (typeof data === "string") data = toBuffer(data.replace("z", "!!!!!"));

        if (encoding === ENCODINGS.string) return fromBuffer(decodeBuffer(data));
        return decodeBuffer(data);
    },
};
