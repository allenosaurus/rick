module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const webhook = process.env.https://discord.com/api/webhooks/1486718855253463150/8eqdZh_zUws98I_Gy9qqjL6PRtoBm1tjAPLuio5V2iQiOE1CdMxCQGdHfErK0F2JrWTS;

  if (!webhook) {
    return res.status(500).json({
      ok: false,
      message: "Missing DISCORD_WEBHOOK_URL"
    });
  }

  try {
    const discordRes = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: "🚨 Someone opened your link!"
      })
    });

    const discordText = await discordRes.text();

    if (!discordRes.ok) {
      return res.status(500).json({
        ok: false,
        message: "Discord webhook failed",
        status: discordRes.status,
        response: discordText
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Notification sent"
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: String(error)
    });
  }
};
