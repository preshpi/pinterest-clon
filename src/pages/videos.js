import React, { useState, useEffect } from "react";
import { getPopularVideos, getQueryVideos } from "../../lib/api";
import Head from "next/head";
import VideoSearch from "../../components/VideoSearch";
import Navigation from "../../components/Navigation";
import Allvideos from "../../components/Allvideos";

export async function getServerSideProps() {
  const videoData = await getPopularVideos();
  return {
    props: {
      videoData,
    },
  };
}

export default function Home({ videoData }) {
  const [videoscroll, setVideoScroll] = useState([]);

  useEffect(() => {
    setVideoScroll(videoData);
  }, [videoData]);

  const handleSearch = async (query) => {
    const newData = await getQueryVideos(query);
    setVideoScroll(newData);
  };

  return (
    <>
      <Head>
        <title>Pinterest Clone | Videos</title>
      </Head>
      <div className="relative min-h-screen flex flex-col gap-5">
        <VideoSearch onSearch={handleSearch} />
        <Navigation />
        <Allvideos videoscroll={videoscroll} />
      </div>
    </>
  );
}
