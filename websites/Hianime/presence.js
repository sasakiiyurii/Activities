websites/Hianime/presence.js
const presence = new Presence({
  clientId: "1082436313157169173", // PreMiD's official client ID
});

presence.on("UpdateData", async () => {
  // Try to grab anime title and episode info from the page
  const titleElement = document.querySelector("h1, .video-info h1, .title");
  const episodeElement = document.querySelector(".episode, .ep-title, .watch-info h2");

  const animeTitle = titleElement ? titleElement.textContent.trim() : "Watching Hianime";
  const episodeTitle = episodeElement ? episodeElement.textContent.trim() : "";

  const presenceData = {
    details: animeTitle,
    state: episodeTitle || "Streaming Anime",
    largeImageKey: "hianime_logo", // optional logo key (you can replace or remove this)
  };

  presence.setActivity(presenceData);
});
