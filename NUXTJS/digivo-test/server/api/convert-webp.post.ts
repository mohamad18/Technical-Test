import { defineEventHandler, readBody, getHeader, sendError, createError } from 'h3'
import { verifyHMACHash } from '../utils/hmac'
import { convertImageToWebp } from '../utils/image'

export default defineEventHandler(async (event) => {
  try {
    // initialize body and hash
    const body = await readBody(event)
    const hash = getHeader(event, 'x-api-key')

    // ceck hash signature
    if (!hash) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Signature header missing' })
    }

    // Verify HMAC signature
    if (!verifyHMACHash(body, hash || '')) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden: Invalid HMAC Signature' })
    }

    // validation for body
    if (!body || typeof body !== 'object') {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request: Invalid request body' })
    }

    const { url_gambar, persentase_kompresi } = body

    // validation for url_gambar
    if (!url_gambar) {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request: url_gambar is required' })
    }

    // set default quality to 60 if not provided
    const quality = Math.max(1, Math.min(100, Number(persentase_kompresi || 60)))

    // convert image to WEBP format
    const result = await convertImageToWebp(url_gambar, quality)

    return {
      url_webp: result.url,
      ukuran_webp: result.size,
      status: true,
      message: 'Image successfully converted to WEBP format',
    }

  } catch (err: any) {
    console.error('Error:', err)
    return sendError(event, createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'An error occurred while processing the image'
    }))
  }
})

