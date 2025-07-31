export async function retryWebhookSend(fn: () => Promise<void>, retries = 3, delay = 300000) {
  for (let i = 0; i < retries; i++) {
    try {
      await fn()
      return
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise((r) => setTimeout(r, delay * (i + 1)))
    }
  }
}
