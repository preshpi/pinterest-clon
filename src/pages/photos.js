import React from "react";
import { getCuratedPhotos, getQueryPhotos } from "../../lib/api";
import Photos from "../../components/Photo";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
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

  const fetchPhotos = async () => {
    const newData = await getCuratedPhotos(page);
    setScroll([...scroll, ...newData]);
    setPage(page + 1);
  };

  const handleSearch = async (query) => {
    const newData = await getQueryPhotos(query);
    setScroll(newData);
  };

  return (
    <div>
      <Head>
        <title>Pinterest Clone | Photos</title>
      </Head>
      <PhotoSearch onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={scroll.length}
        next={fetchPhotos}
        hasMore={true}
        loader={<h4 className="dots w-[50%] mx-auto"></h4>}
      >
        <Photos scroll={scroll} />
      </InfiniteScroll>
    </div>
  );
}
