import { defineEventHandler, readBody } from 'h3'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { url, event: eventName } = body

  if (!url || !url.startsWith('http') || !eventName) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid data' })
  }

  const secret_key = crypto.randomUUID()

  const webhook = await prisma.webhook.create({
    data: {
      url,
      event: eventName,
      secret_key,
    }
  })

  return { message: 'Webhook registered', webhook_id: webhook.id, secret_key }
})

