import sharp from 'sharp'
import axios from 'axios'
import { randomUUID } from 'crypto'
import fs from 'fs'
import path from 'path'

export async function convertImageToWebp(
  imageUrl: string,
  quality: number
): Promise<{ url: string, size: number }> {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
  const buffer = Buffer.from(response.data)

  const filename = `${randomUUID()}.webp`
  const outputPath = path.resolve('./public/uploads', filename)

  const outputBuffer = await sharp(buffer)
    .webp({ quality })
    .toBuffer()

  await fs.promises.writeFile(outputPath, outputBuffer)

  return {
    url: `/uploads/${filename}`,
    size: outputBuffer.length
  }
}
