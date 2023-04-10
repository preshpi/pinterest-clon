import Image from "next/image";
import { getPhotosById } from "../../../lib/api";
import Link from "next/link";
import { FiMoreHorizontal, FiShare } from "react-icons/fi";
import { GrLink } from "react-icons/gr";
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
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = pic.src.portrait;
    link.download = `${pic.alt}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-[85%] mt-[5%] mx-auto grid lg:flex justify-center ">
      <div className=" flex items-center justify-center">
        <Link
          href={pic.url}
          download={`${pic.alt}.jpg`}
          className="cursor-pointer lg:w-[500px] md:w-[500px]  h-[600px] relative w-[320px]"
        >
          <Image
            src={pic.src.portrait}
            alt={pic.alt}
            fill
            sizes="300"
            priority
            className="object-cover rounded-tl-[30px] rounded-bl-[30px] shadow-lg"
            style={{ backgroundColor: pic.avg_color }}
          />
        </Link>
      </div>
      <div className="lg:w-[500px] md:w-[500px] w-[320px] p-5 bg-[#fffff] rounded-tr-[30px] rounded-br-[30px] shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex justify-around">
            <span className="text-[19px] font-[800] text-[#111111] transition-all duration-300 cursor-pointer h-12 w-12 hover:bg-gray-100 flex justify-center items-center rounded-[50px]">
              <FiMoreHorizontal onClick={downloadImage} />
            </span>
            <span className="text-[19px] font-[800] text-[#111111] transition-all duration-300 cursor-pointer h-12 w-12 hover:bg-gray-100 flex justify-center items-center rounded-[50px]">
              <FiShare />
            </span>
            <span className="text-[19px] font-[800] text-[#111111] transition-all duration-300 cursor-pointer h-12 w-12 hover:bg-gray-100 flex justify-center items-center rounded-[50px]">
              <GrLink />
            </span>
          </div>
          <button className="bg-[red] text-[12px] text-white h-[48px] p-[12px] rounded-[64px] w-[68px]">
            Save
          </button>
        </div>
        <p className="lg:text-[38px] font-600">{pic.alt}</p>
        <Link href={pic.photographer_url}>
          <p className="cursor-pointer underline text-x">{pic.photographer}</p>
        </Link>
      </div>
    </div>
  );
}
