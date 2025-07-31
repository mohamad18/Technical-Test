import crypto from 'crypto'

const secret = process.env.WEBHOOK_SECRET_KEY || 'default_secret'

export function generateSignature(payload: string) {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex')
}

export function verifySignature(payload: string, signature: string) {
  const expected = generateSignature(payload)
  return expected === signature
}

export function encryptData(data: object): string {
  const key = crypto.scryptSync(secret, 'salt', 32)
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return `${iv.toString('hex')}:${encrypted}`
}
