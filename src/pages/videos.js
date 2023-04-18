import React, { useState, useEffect } from "react";
import Videos from "../../components/Videos";
import { getPopularVideos, getQueryVideos } from "../../lib/api";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoSearch from "../../components/VideoSearch";

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
  const [page, setPage] = useState(1);

  useEffect(() => {
    setVideoScroll(videoData);
  }, [videoData]);

  const fetchVideos = async () => {
    const newData = await getPopularVideos(page + 1);
    setVideoScroll([...videoscroll, ...newData]);
    setPage(page + 1);
  };

  const handleSearch = async (query) => {
    const newData = await getQueryVideos(query);
    setVideoScroll(newData);
  };

  return (
    <div>
      <Head>
        <title>Pinterest Clone | Videos</title>
      </Head>
      <VideoSearch onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={videoscroll.length}
        next={fetchVideos}
        hasMore={true}
        loader={<h4 className="dots w-[50%] mx-auto"></h4>}
      >
        <Videos videoscroll={videoscroll} />
      </InfiniteScroll>
    </div>
  );
}
