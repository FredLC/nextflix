import videoData from "../data/videos.json";

export const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = "youtube.googleapis.com/youtube/v3";

  try {
    const response = await fetch(
      `https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return data.items.map((item, idx) => {
      return {
        id: item.id.videoId || idx,
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
      };
    });
  } catch (error) {
    console.log("Error with video library", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&maxResults=25&q=${searchQuery}`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=25&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};
