import { generateHMACHash } from "../utils/hmac";

export default defineEventHandler(async (event) => {
  
  // initialize body
  const body = await readBody(event)

  const hash = generateHMACHash(body);
  return { ...body, hash };
});
