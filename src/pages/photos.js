import React from "react";
import { getCuratedPhotos, getQueryPhotos } from "../../lib/api";
import Photos from "../../components/Photo";
import Head from "next/head";
import { useState } from "react";
import PhotoSearch from "../../components/PhotoSearch";

export async function getServerSideProps() {
  const photoData = await getCuratedPhotos();
  return {
    props: {
      photoData,
    },
  };
}

export default function Home({ photoData }) {
  const [scroll, setScroll] = useState(photoData);
  const [page, setPage] = useState(1);

  const fetchPhotos = async (page) => {
    const newData = await getCuratedPhotos(page + 1);
    setScroll([...scroll, ...newData]);
    setPage(page + 1);
  };

  const handleSearch = async (query) => {
    const newData = await getQueryPhotos(query);
    setScroll(newData);
    setPage(1);
  };

  const loadMore = () => {
    fetchPhotos();
  };

  return (
    <div>
      <Head>
        <title>Pinterest Clone | Photos</title>
      </Head>
      <PhotoSearch onSearch={handleSearch} />
        <Photos scroll={scroll} />

      <div className="flex justify-center">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mt-8"
          onClick={loadMore}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
