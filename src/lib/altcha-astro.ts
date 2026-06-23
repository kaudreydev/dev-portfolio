/**
 * Adapted for Astro from Altcha TypeScript framework for Next.js
 * https://github.com/altcha-org/altcha-lib/blob/main/dist/esm/v2/frameworks/nextjs.js
 */

import { CappedMap, createChallenge, randomInt } from "altcha-lib";
import { deriveHmacKeySecret, verify } from "altcha-lib/frameworks/shared";
import type {
  AltchaMiddlewareOptions,
  AltchaOptions,
  AltchaResult,
} from "altcha-lib/frameworks/types";
import type { APIContext } from "astro";
import type { AltchaRequest } from "~/types";

function getCookieFromRequest(req: AltchaRequest, name: string) {
  const header = req.headers.get("cookie");
  if (!header) {
    return undefined;
  }
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}
function deleteCookie(res: Response, name: string, path?: string) {
  res.headers.append("Set-Cookie", `${name}=; Path=${path ?? "/"}; Max-Age=0`);
}

export function create(options: AltchaOptions) {
  const {
    createChallengeParameters,
    deriveKey,
    fieldName = "altcha",
    hmacSignatureSecret,
    hmacKeySignatureSecret,
    setCookie,
    store,
  } = options;
  async function challengeHandler() {
    const challenge = await createChallenge({
      deriveKey,
      hmacSignatureSecret,
      hmacKeySignatureSecret,
      ...createChallengeParameters(),
    });
    const body = {
      configuration: setCookie
        ? {
            setCookie,
          }
        : undefined,
      ...challenge,
    };
    const response = Response.json(body);
    return response;
  }
  async function verifyHandler({ request }: APIContext) {
    const payload = await getPayloadFromRequest(request as AltchaRequest);
    const result = await verify(
      payload,
      deriveKey,
      hmacSignatureSecret,
      hmacKeySignatureSecret,
      store,
    );
    return Response.json(result);
  }
  async function getPayloadFromRequest(
    req: AltchaRequest,
    cookieName?: string,
  ): Promise<string | undefined> {
    let payload = undefined;
    if (cookieName) {
      payload = getCookieFromRequest(req, cookieName);
    } else {
      const contentType = req.headers.get("content-type") ?? "";
      let body = null;
      if (contentType.includes("application/json")) {
        body = await req.json();
      } else if (
        contentType.includes("multipart/form-data") ||
        contentType.includes("application/x-www-form-urlencoded")
      ) {
        body = Object.fromEntries((await req.formData()).entries());
      }
      payload = body?.[fieldName];
    }
    return payload;
  }
  async function middleware(
    req: AltchaRequest,
    throwOnFailure?: boolean,
  ): Promise<Response | AltchaResult> {
    const payload = await getPayloadFromRequest(req, setCookie?.name);
    const {
      error,
      payload: verifiedPayload,
      verification,
    } = await verify(
      payload,
      deriveKey,
      hmacSignatureSecret,
      hmacKeySignatureSecret,
      store,
    );
    const result = {
      error,
      payload: verifiedPayload,
      verification,
    };
    const response = Response.json(result);
    if (setCookie) {
      deleteCookie(response, setCookie.name, setCookie.path);
    }
    if (error && throwOnFailure) {
      return Response.json({ error }, { status: 403 });
    }
    return response;
  }
  function withMiddleware(
    handler: (req: AltchaRequest) => Promise<Response> | Response,
    options?: AltchaMiddlewareOptions,
  ): (req: AltchaRequest) => Promise<Response> {
    const { throwOnFailure = true } = options || {};
    return async (req) => {
      const result = await middleware(req, throwOnFailure);
      // If middleware returned a Response, it means verification failed
      if (result instanceof Response) {
        return result;
      }
      // Attach the result to the request for the handler to access
      req.__altcha = result;
      return handler(req);
    };
  }
  return {
    challengeHandler,
    withMiddleware,
    verifyHandler,
    getPayloadFromRequest,
    middleware,
    verify,
  };
}
export default {
  CappedMap,
  create,
  deriveHmacKeySecret,
  randomInt,
};
