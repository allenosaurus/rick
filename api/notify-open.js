module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const webhook = process.env.DISCORD_WEBHOOK_URL;

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
