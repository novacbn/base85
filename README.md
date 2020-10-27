# base85

> **NOTE**: This package has been forked from [`noseglid/base85`](https://github.com/noseglid/base85) to remove IPv6 and Z85 encodings. And to slim-down the runtime dependencies.

Base85 encoder/decoder written in native javascript.

Where base64 [adds approximately 1/3][base64], base85 only [adds about
1/4][base85]. Of course there's a tradeoff. The Base85 alphabet includes
characters that might not be as friendly as the base64 alphabet. While it's
still only printable characters, the [Ascii85][base85] specification contains
quotes (`'` and `"`) which needs escaping in many programming languages.

Supported encoding specifications

-   [Ascii85][base85]

## Installation

    npm install git+https://github.com/novacbn/base85

## Usage

### Encoding:

    var base85 = require('base85');

    var encoded = base85.encode('<~87cURD_*#TDfTZ)+X&!P~>');
    console.log(encoded); // ???

### Decoding:

    var base85 = require('base85');

    var decoded = base85.decode('<~87cURD_*#TDfTZ)+X&!P~>');
    console.log(decoded.toString('utf8')); // Hello, world!!!!

## API

### `encode(data)`

> Encodes the specified data. The encoded data will be prepended with `<~` and appended with `~>`.
>
> **data**
>
> > The data to encode, may be a `String` or a `Uint8Array`.
>
> **returns**
>
> > A `String` with the encoded data.

### `decode(data)`

> Decodes the specified data. The data is expected to start with `<~` and
> end with `~>`. No checks are actually made for this, but output will
> be unexpected if this is not the case.
>
> **data**
>
> > The data to decode. May be a `String` or a `Uint8Array`.
>
> **returns**
>
> > A `Uint8Array` With the decoded data, or **boolean** `false`
> > if the `data` could not be decoded. When testing if the result succeeded,
> > [always use operators with 3 characters][jscompare] ('===' or '!==').
