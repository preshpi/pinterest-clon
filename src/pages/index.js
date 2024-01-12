import Head from "next/head";
import { getCuratedPhotos, getQueryPhotos } from "../../lib/api";
import { useState } from "react";
import AllPhotos from "../../components/AllPhotos";
import Navigation from "../../components/Navigation";
import PhotoSearch from "../../components/PhotoSearch";

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

  const handleSearch = async (query) => {
    const newData = await getQueryPhotos(query);
    setPhotos(newData);
  };

  return (
    <>
      <Head>
        <title>Pinterest Clone | Home</title>
      </Head>
      <div className="relative h-full flex flex-col gap-5">
        <PhotoSearch handleSearch={handleSearch} />
        <Navigation />
        <AllPhotos data={data} photos={photos} />
      </div>
    </>
  );
}
