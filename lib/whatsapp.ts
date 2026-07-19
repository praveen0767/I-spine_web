export async function sendWhatsAppNotification(lead: { name: string; email: string; phone: string }) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const adminPhone = process.env.ADMIN_PHONE; // You need to add this to .env.local

  if (!token || !phoneId || !adminPhone) {
    console.log("WhatsApp credentials missing, skipping WhatsApp API notification. Using fallback.");
    return false;
  }

  const message = `New Lead: ${lead.name}, ${lead.email}, ${lead.phone}`;

  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${phoneId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: adminPhone,
        type: "text",
        text: { body: message },
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("WhatsApp message sent successfully:", data);
      return true;
    } else {
      console.error("WhatsApp API Error:", data);
      return false;
    }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return false;
  }
}
