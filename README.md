# Workers-IO

IO utilities for Cloudflare Workers.

### Install

```
$ npm i @mhoc/workers-io
```

### io-ts

The utility functions in this library leverage [io-ts](https://github.com/gcanti/io-ts). Its a
pretty cool library. To help make things easier, this library re-exports both `io-ts` and `fp-ts`:

```ts
import { io, fp } from "@mhoc/workers-io"
```

### iofetch

iofetch is a family of wrappers around `fetch` which help to schematize the body of the response, by 
applying an `io-ts` schema to it before returning.

```ts
import { io, iofetch_json } from "@mhoc/workers-io"

const ResponseJSON = io.type({
    userId: io.string,
})

const { response, body } = await iofetch_json(ResponseJSON, "https://api.example.com/getUser")
console.log(body.userId) // compiles, and guaranteed to be a string
```

The available functions right now include:

- `iofetch_json`
