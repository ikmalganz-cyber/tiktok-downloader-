import tiktok from "tiktok-api-dl";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "URL TikTok diperlukan" });
  }

  try {
    const result = await tiktok(url);

    if (!result || !result.video) {
      return res.status(500).json({ error: "Gagal mengambil video" });
    }

    res.status(200).json({
      title: result.title,
      thumbnail: result.cover,
      download: result.video.noWatermark
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}
