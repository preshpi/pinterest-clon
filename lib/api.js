const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
import axios from "axios";

export const getCuratedPhotos = async (page) => {
  const res = await fetch(
    `https://api.pexels.com/v1/curated?page=${page}&per_page=20`,
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
  try {
    const response = await axios.get(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error fetching photo:", error);
    throw error;
  }
};

// videos 

export const getPopularVideos = async (page) => {
  const perPage = 20;
  const offset = (page - 1) * perPage;
  const res = await fetch(
    `https://api.pexels.com/videos/popular?per_page=${perPage}&page=${page}`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  const resJson = await res.json();
  return resJson.videos.map((video) => ({ ...video, id: video.id + offset }));
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