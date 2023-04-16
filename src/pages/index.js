import Head from "next/head";
import { getCuratedPhotos, getQueryPhotos } from "../../lib/api";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Allmedias from "../../components/Allmedias";


export async function getServerSideProps() {
  const data = await getCuratedPhotos();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const [photos, setPhotos] = useState(data);
  const [page, setPage] = useState(1);

  const fetchPhotos = async () => {
    const newData = await getCuratedPhotos(page);
    setPhotos([...photos, ...newData]);
    setPage(page + 1);
  };

    const handleSearch = async (query) => {
    const newData = await getQueryPhotos(query);
    setPhotos(newData);
  };

  return (
    <>
      <Head>
        <title>Pinterest Clone | Home</title>
      </Head>

      <Navbar onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={photos.length}
        next={fetchPhotos}
        hasMore={true}
        loader={<h4 className="dots w-[50%] mx-auto"></h4>}
      >
        <Allmedias data={data} photos={photos} />
      </InfiniteScroll>
    </>
  );
}
