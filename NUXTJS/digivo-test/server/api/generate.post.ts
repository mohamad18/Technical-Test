import { prisma } from "../utils/db";

function getRandomUniqueCode(existingCodes: any) {
  const possible = [...Array(10).keys()].map((n) => n + 1);
  const available = possible.filter((code) => !existingCodes.includes(code));
  if (available.length === 0) throw new Error("Kode unik sudah habis.");
  return available[Math.floor(Math.random() * available.length)];
}

function getRandomUniqueCodeString(existingCodes: string[]): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let kode = '';
  let attempts = 0;
  const maxAttempts = 1000;

  do {
    kode = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      kode += chars[randomIndex];
    }
    attempts++;
    if (attempts > maxAttempts) {
      throw new Error('Gagal menghasilkan kode unik.');
    }
  } while (existingCodes.includes(kode));

  return kode;
}



export default defineEventHandler(async (event) => {
  // initialize body
  const body = await readBody(event)
  if (!body || typeof body !== 'object') {
    return { error: "Invalid request body" };
  }

  const today = new Date();
  const todayStart = new Date(today.setHours(0, 0, 0, 0));

  const { produk_id, nama_produk, harga } = body

  const existing = await prisma.order.findMany({
    where: {
      tanggal: {
        gte: todayStart,
        lt: new Date(todayStart.getTime() + 24 * 60 * 60 * 1000),
      },
    },
    select: {
      kode_unik: true,
    },
  });

  const existingCodes = existing.map((e) => e.kode_unik);
  const transactions = [];

  for (let i = 0; i < 50; i++) {
    try {
      const kode_unik = getRandomUniqueCodeString(existingCodes);
      existingCodes.push(kode_unik);

      const order = await prisma.order.create({
        data: {
          produk_id,
          nama_produk,
          harga,
          kode_unik,
          status: "pending",
          tanggal: todayStart,
        },
      });

      transactions.push({ id: order.id, kode_unik });
    } catch (err: any) {
      console.error("Gagal insert:", err.message);
    }
  }

  return {
    message: "Transaksi berhasil dibuat",
    count: transactions.length,
    data: transactions,
  };
});
