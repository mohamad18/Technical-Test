import crypto from 'crypto'

const SECRET_KEY = 'your-secret-key' // Gantilah dengan key rahasia Anda

export function generateHMACHash(body: object): string {
  const json = JSON.stringify(body)
  return crypto.createHmac('sha512', SECRET_KEY).update(json).digest('hex')
}

export function verifyHMACHash(body: object, hash: string): boolean {
  const calculated = generateHMACHash(body)
  return crypto.timingSafeEqual(Buffer.from(calculated), Buffer.from(hash))
}
