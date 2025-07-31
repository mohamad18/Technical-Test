import { stat } from 'fs'
import { prisma } from '../../utils/db'
import { sendWebhookNotifications } from '../../utils/webhook'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { booking_id, status } = body

  const booking = await prisma.booking.update({
    where: { id: booking_id },
    data: { status: status },
  })

  if (!booking) {
    throw createError({ statusCode: 404, statusMessage: 'Booking not found' })
  }

  await sendWebhookNotifications('booking_status_changed', booking)
  return { message: 'Booking updated and webhook triggered' }
})
