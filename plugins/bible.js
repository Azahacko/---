const axios = require("axios");
const { cmd } = require("../command");

cmd(
  {
    pattern: "bible",
    desc: "Fetch Bible verses by reference.",
    category: "fun",
    react: "📖",
    filename: __filename,
  },
  async (conn, mek, m, { args, reply }) => {
    try {
      if (args.length === 0) {
        return reply(
          `⚠️ *Please provide a Bible reference.*\n\n📝 *Example:*\n.bible John 3:16`
        );
      }

      const reference = args.join(" ");
      const apiUrl = `https://bible-api.com/${encodeURIComponent(reference)}`;

      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        const { reference: ref, text, translation_name } = response.data;

        if (text) {
          const message =
            `📜 *Bible Verse Found!*\n\n` +
            `📖 *Reference:* ${ref}\n\n` +
            `📚 *Text:*\n${text.trim()}\n\n` +
            `🗂️ *Translation:* ${translation_name}\n\n` +
            `©  ℂℍ𝕆𝕁𝕀-𝕄𝔻👑 BIBLE`;

          reply(message);
        } else {
          reply(
            "❌ *Verse not found in response.* Please check the reference and try again."
          );
        }
      } else {
        reply(
          "❌ *Verse not found.* Please check the reference and try again."
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        reply(
          "❌ *Verse not found.* Please check the reference and try again."
        );
      } else {
        console.error("Error fetching Bible verse:", error);
        reply(
          "⚠️ *An error occurred while fetching the Bible verse.* Please try again later."
        );
      }
    }
  }
);
