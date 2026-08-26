export async function sendTelegramNotification(appointment: {
  fullName: string;
  phone: string;
  address: string;
  serviceType: string;
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("⚠️ Telegram TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID .env dosyasında eksik!");
    return;
  }

  const message = `🚨 *YENİ KEŞİF TALEBİ GELDİ!*\n\n👤 *Müşteri:* ${appointment.fullName}\n📞 *Telefon:* ${appointment.phone}\n🛠️ *Hizmet:* ${appointment.serviceType}\n📍 *Adres:* ${appointment.address}\n\n🗓️ *Tarih:* ${new Date().toLocaleString("tr-TR")}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const data = await response.json();
    if (!data.ok) {
      console.error("❌ Telegram API Hatası:", data.description);
    } else {
      console.log("✅ Telegram bildirimi başarıyla gönderildi.");
    }
  } catch (error) {
    console.error("❌ Telegram bağlantı hatası:", error);
  }
}