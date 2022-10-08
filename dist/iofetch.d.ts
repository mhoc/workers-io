/// <reference types="@cloudflare/workers-types" />
import * as io from "io-ts";
export interface IOFetchJSONSuccess<B> {
    body: B;
    response: Response;
}
/**
 * iofetch_json treates the generic as the schema that the json body of the response from the fetch
 * should take. Internally, it runs the fetch, parses the json body of the result, schematizes it
 * per the schema provided, then returns the body fully typed.
 *
 * This function will throw an error in any failure condition; including if the fetch fails (exactly
 * how `fetch` itself behaves); if the call to `response.json()` fails; or if the response body does
 * not match the schema.
 *
 * In the final case, when the response body does not match the schema; the error message will be a
 * reasonably pretty error message that describes how the response body and schema do not match.
 *
 * ```ts
 * import { io, iofetch_json } from "@mhoc/workers-io"
 * const ResponseJSON = io.type({
 *   userId: io.string,
 * })
 * const { request, body } = await iofetch_json(ResponseJSON, "https://api.example.com/getUser");
 * console.log(body.userId) // compiles, and guaranteed to be a string
 * ```
 */
export declare const iofetch_json: <B extends io.TypeC<any>>(spec: B, request: Request | string, requestInitr?: RequestInit | Request) => Promise<IOFetchJSONSuccess<B>>;
