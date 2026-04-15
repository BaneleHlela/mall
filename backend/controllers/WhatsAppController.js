import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendWhatsAppMessage = async (req, res) => {
  const { to, message } = req.body;  // 'to' should be vendor's WhatsApp number, e.g., 'whatsapp:+1234567890'
  try {
    const response = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: to,
      body: message,
    });
    res.status(200).json({ sid: response.sid, message: 'WhatsApp message sent' });
  } catch (error) {
    console.error('Error sending WhatsApp:', error);
    res.status(500).json({ message: 'Failed to send WhatsApp message' });
  }
};