import { prisma } from '../utils/db'

export default defineEventHandler((event) => {
  return prisma.order.findMany()
})
