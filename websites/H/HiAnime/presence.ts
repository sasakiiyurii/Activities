import { Assets } from "premid";

const presence = new Presence({
  clientId: "80875876924138252"
});

const strings = presence.getStrings({
  play: "Watching",
  pause: "Paused"
});

enum ActivityAssets {
  Logo = "https://hianime.to/images/favicon.ico"
}

presence.on("UpdateData", async () => {
  const video = document.querySelector("video");
  const presenceData: PresenceData = {
    largeImageKey: ActivityAssets.Logo
  };

  const pathname = document.location.pathname;
  const buttons = await presence.getSetting<boolean>("buttons");

  if (pathname.includes("/watch/") && video) {
    const title = document.querySelector("h1")?.textContent?.trim() ||
      document.title.replace(" - HiAnime", "");
    const episode = document.querySelector(".ep-name")?.textContent?.trim() ||
      pathname.split("/").pop();

    presenceData.details = title;
    presenceData.state = episode;
    presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
    presenceData.smallImageText = video.paused ? strings.pause : strings.play;
    [presenceData.startTimestamp, presenceData.endTimestamp] =
      presence.getTimestampsfromMedia(video);

    if (buttons) {
      presenceData.buttons = [
        { label: "Watch on HiAnime", url: document.URL }
      ];
    }
  } else if (pathname.includes("/home") || pathname === "/") {
    presenceData.details = "Browsing Anime";
    presenceData.state = "On Home Page";
  } else {
    presenceData.details = "Exploring HiAnime";
    presenceData.state = document.title.replace(" - HiAnime", "");
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
