import { isLeft } from "fp-ts/lib/Either";
import * as io from "io-ts";
import reporter from "io-ts-reporters";

/**
 * iofetchjson treates the generic as the schema that the json body of the response from the fetch
 * should take.
 */
export const iofetchjson = async <B extends io.TypeC<any>>(spec: B, request: Request, requestInitr?: RequestInit | Request): Promise<{ response: Response, body: B }> => {
  const response = await fetch(request, requestInitr);
  const body = await response.json();
  const result = spec.decode(body);
  if (isLeft(result)) {
    throw new Error(reporter.report(result)[0]);
  }
  return { body: result.right, response };
}
