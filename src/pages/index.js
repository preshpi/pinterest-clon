import Head from "next/head";
import { getCuratedPhotos } from "../../lib/api";
import Navbar from "../../components/Navbar";
import Photos from "../../components/Photo";

export async function getServerSideProps() {
  const data = await getCuratedPhotos();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data}) {
  return (
    <>
      <Head>
        <title>Pinterest Clone</title>
      </Head>

      <Navbar  data={data}/>
      <Photos data={data} />
    </>
  );
}
