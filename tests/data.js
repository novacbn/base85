"use strict";

exports.data = [
    {
        raw: new Buffer("Man ", "ascii"),
        enc: {
            ascii85: "<~9jqo^~>",
        },
    },
    {
        raw: new Buffer("Man a", "ascii"),
        enc: {
            ascii85: "<~9jqo^@/~>",
        },
    },
    {
        raw: new Buffer("Man ab", "ascii"),
        enc: {
            ascii85: "<~9jqo^@:B~>",
        },
    },
    {
        raw: new Buffer("Man abc", "ascii"),
        enc: {
            ascii85: "<~9jqo^@:E^~>",
        },
    },
    {
        raw: new Buffer("Man abcd", "ascii"),
        enc: {
            ascii85: "<~9jqo^@:E_W~>",
        },
    },
    {
        raw: new Buffer("Hello, world!!!!", "ascii"),
        enc: {
            ascii85: "<~87cURD_*#TDfTZ)+X&!P~>",
        },
    },
    {
        raw: new Buffer("", "ascii"),
        enc: {
            ascii85: "<~~>",
        },
    },
    {
        raw: new Buffer(
            "Man is distinguished, not only by his reason, but by this singular passion " +
                "from other animals, which is a lust of the mind, that by a perseverance of " +
                "delight in the continued and indefatigable generation of knowledge, exceeds " +
                "the short vehemence of any carnal pleasure",
            "ascii"
        ),
        enc: {
            ascii85:
                "<~9jqo^BlbD-BleB1DJ+*+F(f,q/0JhKF<GL>Cj@.4Gp$d7F!,L7@<6@)/0JDEF" +
                '<G%<+EV:2F!,O<DJ+*.@<*K0@<6L(Df-\\0Ec5e;DffZ(EZee.Bl.9pF"AGXBPC' +
                "si+DGm>@3BB/F*&OCAfu2/AKYi(DIb:@FD,*)+C]U=@3BN#EcYf8ATD3s@q?d$A" +
                "ftVqCh[NqF<G:8+EV:.+Cf>-FD5W8ARlolDIal(DId<j@<?3r@:F%a+D58'ATD" +
                "4$Bl@l3De:,-DJs`8ARoFb/0JMK@qB4^F!,R<AKZ&-DfTqBG%G>uD.RTpAKYo'" +
                "+CT/5+Cei#DII?(E,9)oF*2M7~>",
        },
    },
    {
        raw: new Buffer([0xff]),
        enc: {
            ascii85: "<~rr~>",
        },
    },
    {
        raw: new Buffer([0xff, 0xff, 0xff, 0xff]),
        enc: {
            ascii85: "<~s8W-!~>",
        },
    },
    {
        raw: new Buffer(" "),
        enc: {
            ascii85: "<~+9~>",
        },
    },
    {
        raw: new Buffer([0x0, 0x0, 0x0, 0x0]),
        enc: {
            ascii85: "<~z~>",
        },
    },
    {
        raw: new Buffer([0x86, 0x4f, 0xd2, 0x6f, 0xb5, 0x59, 0xf7, 0x5b]),
        enc: {
            ascii85: "<~L/669[9<6.~>",
        },
    },
    {
        raw: new Buffer([
            0x8e,
            0x0b,
            0xdd,
            0x69,
            0x76,
            0x28,
            0xb9,
            0x1d,
            0x8f,
            0x24,
            0x55,
            0x87,
            0xee,
            0x95,
            0xc5,
            0xb0,
            0x4d,
            0x48,
            0x96,
            0x3f,
            0x79,
            0x25,
            0x98,
            0x77,
            0xb4,
            0x9c,
            0xd9,
            0x06,
            0x3a,
            0xea,
            0xd3,
            0xb7,
        ]),
        enc: {
            ascii85: "<~NXOZWFssmAO!I_\\mZkbq9h:R7GpSi%[%,eR3pP2'~>",
        },
    },
];
