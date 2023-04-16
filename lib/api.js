const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

export const getCuratedPhotos = async () => {
  const res = await fetch(
    `https://api.pexels.com/v1/curated?page=11&per_page=20`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  const resJson = await res.json();
  return resJson.photos;
};

export const getQueryPhotos = async (query) => {
  const res = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const resJson = await res.json();
  return resJson.photos;
};



export const getPhotosById = async (id) => {
  const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const resJson = await res.json();
  return resJson;
};

// videos 

export const getPopularVideos = async () => {

  const res = await fetch(`https://api.pexels.com/videos/popular?per_page=20`, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const resJson = await res.json();
  return resJson.videos;
};

export const getQueryVideos = async (query) => {
  const res = await fetch(`https://api.pexels.com/videos/search?query=${query}`, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const resJson = await res.json();
  return resJson.videos;
};