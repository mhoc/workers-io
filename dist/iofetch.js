import { isLeft } from "fp-ts/lib/Either";
import reporter from "io-ts-reporters";
/**
 * iofetchjson treates the generic as the schema that the json body of the response from the fetch
 * should take.
 */
export const iofetchjson = async (spec, request, requestInitr) => {
    const response = await fetch(request, requestInitr);
    const body = await response.json();
    const result = spec.decode(body);
    if (isLeft(result)) {
        throw new Error(reporter.report(result)[0]);
    }
    return { body: result.right, response };
};
