import { prisma } from "../utils/db";
import { encryptData, generateSignature } from "../utils/crypto";
import axios from "axios";
// import crypto from 'crypto'

export async function sendWebhookNotifications(
  eventName: string,
  booking: any
) {
  const webhooks = await prisma.webhook.findMany({
    where: {
      event: eventName,
      is_active: true,
    },
  });

  for (const hook of webhooks) {
    const payload = {
      booking_id: booking.id,
      status: booking.status,
      updated_at: booking.updated_at,
    };

    const encrypted = encryptData(payload);
    const signature = generateSignature(encrypted);

    try {
    // uncomment this if you want to look update data in the webhook logs and hook url is dummy
      const res = await $fetch(hook.url, {
        method: "POST",
        body: encrypted,
        headers: {
          "Content-Type": "application/json",
          "x-signature": signature,
        },
      });

      // uncomment this if you want to look update data in the webhook logs or hook url is real
      // delay 5 minute between retry with strategy exponential backoff
      // const res = await retryWebhookSend(
      //   async () => {
      //     return await axios.post(hook.url, {
      //       data: encrypted,
      //       signature,
      //     });
      //   },
      //   3,
      //   300000
      // );

      await prisma.webhookLog.create({
        data: {
          webhook_id: hook.id,
          booking_id: booking.id,
          payload,
          status_code: 200,
          response_body: JSON.stringify(res),
          attempt: 1,
        },
      });
    } catch (err: any) {
      await prisma.webhookLog.create({
        data: {
          webhook_id: hook.id,
          booking_id: booking.id,
          payload,
          status_code: err.response?.status || 500,
          response_body: err.message,
          attempt: 1,
        },
      });
    }
  }
}
