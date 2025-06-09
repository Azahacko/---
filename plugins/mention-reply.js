const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');

cmd({
  on: "body"
}, async (conn, m, { isGroup }) => {
  try {
    if (config.MENTION_REPLY !== 'true' || !isGroup) return;
    if (!m.mentionedJid || m.mentionedJid.length === 0) return;

    const voiceClips = [
      "https://files.catbox.moe/awdxli.mp4",
      "https://files.catbox.moe/awdxli.mp4",
      "https://files.catbox.moe/awdxli.mp4",
      "https://files.catbox.moe/awdxli.mp4",
      "https://files.catbox.moe/awdxli.mp4",
      "https://files.catbox.moe/awdxli.mp4",
      "https://files.catbox.moe/awdxli.mp4",
      "https://files.catbox.moe/awdxli.mp4",
      "https://files.catbox.moe/awdxli.mp4",
      "https://files.catbox.moe/awdxli.mp4"
    ];

    const randomClip = voiceClips[Math.floor(Math.random() * voiceClips.length)];
    const botNumber = conn.user.id.split(":")[0] + '@s.whatsapp.net';

    if (m.mentionedJid.includes(botNumber)) {
      const thumbnailRes = await axios.get(config.MENU_IMAGE_URL || "https://files.catbox.moe/9xox1g.jpg", {
        responseType: 'arraybuffer'
      });
      const thumbnailBuffer = Buffer.from(thumbnailRes.data, 'binary');

      await conn.sendMessage(m.chat, {
        audio: { url: randomClip },
        mimetype: 'audio/mp4',
        ptt: true,
        waveform: [99, 0, 99, 0, 99],
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: config.BOT_NAME || "𓂀 🍷𝒟𝒶𝓇𝓀-𝒟𝓔𝓋🍷 𓂀",
            body: config.DESCRIPTION || "POWERED BY 𓂀 🍷𝒟𝒶𝓇𝓀-𝒟𝓔𝓋🍷 𓂀",
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnail: thumbnailBuffer,
            mediaUrl: "https://files.catbox.moe/9xox1g.jpg", // Static image URL
            sourceUrl: "https://whatsapp.com/channel/0029VbAfF6f1dAw7hJidqS0i",
            showAdAttribution: true
          }
        }
      }, { quoted: m });
    }
  } catch (e) {
    console.error(e);
    const ownerJid = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    await conn.sendMessage(ownerJid, {
      text: `*Bot Error in Mention Handler:*\n${e.message}`
    });
  }
});
