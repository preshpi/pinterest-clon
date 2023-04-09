import Image from "next/image";
import { getPhotosById } from "../../../lib/api";

export async function getServerSideProps({ params }) {
  const pic = await getPhotosById(params.id);
  return {
    props: {
      pic,
    },
  };
}

export default function photoId({ pic }) {
  console.log(pic);

  return (
    <div className="w-[80%] mx-auto">
      <div className="flex items-center justify-center h-[100px] bg-slate-400 rounded-[32px]">
        <figure className="w-[500px]">
          <Image
            src={pic.src.original}
            alt={pic.alt}
            height={600}
            width={400}
            priority
            className="object-cover rounded-lg"
            style={{ backgroundColor: pic.avg_color }}
          />
        </figure>
        <div className="bg-white w-[500px]">
          <p>{pic.photographer}</p>
        </div>
      </div>
    </div>
  );
}
