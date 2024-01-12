import Image from "next/image";
import { getPhotosById } from "../../lib/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiMoreHorizontal, FiShare } from "react-icons/fi";
import { GrLink } from "react-icons/gr";
import { Dropdown, Popover } from "antd";
import {
  EmailShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterIcon,
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import MyComponent from "../../components/Comments";

export async function getServerSideProps({ params }) {
  const pic = await getPhotosById(params.id);

  return {
    props: {
      pic,
    },
  };
}

export default function PhotoId({ pic }) {
  // go back function
  const router = useRouter();

  // To download the image
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = pic.src.portrait;
    link.download = `${pic.alt}.jpg`;
    link.target = "_blank"; // Set the target property to "_blank"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const items = [
    {
      label: "Download",
      key: "0",
      onClick: downloadImage,
    },
  ];

  // ---download stops here----

  // Share popover
  const shareUrl = `https://pinterest-clon-fawn.vercel.app/photos/${pic.id}`;
  const notify = () => toast.success("Link copied!");

  const content = (
    <div className="grid place-items-center justify-center px-3">
      <p className="text-center text-[16px] text-black">share</p>
      <div className="grid grid-cols-3 m-3 items-center gap-5 h-[170px] w-full mx-auto">
        <div>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon className="w-[48px] h-[48px] hover:opacity-75 rounded-full" />
          </WhatsappShareButton>
          <p>WhatsApp</p>
        </div>

        <div>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon className="w-[48px] h-[48px] hover:opacity-75 rounded-full" />
          </FacebookShareButton>
          <p>Facebook</p>
        </div>

        <div>
          <TelegramShareButton url={shareUrl}>
            <TelegramIcon className="w-[48px] h-[48px] hover:opacity-75 rounded-full" />
          </TelegramShareButton>
          <p>Telegram</p>
        </div>

        <div>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon className="w-[48px] h-[48px] hover:opacity-75 rounded-full" />
          </TwitterShareButton>
          <p>Twitter</p>
        </div>

        <div>
          <EmailShareButton url={shareUrl}>
            <EmailIcon className="w-[48px] h-[48px] hover:opacity-75 rounded-full" />
          </EmailShareButton>
          <p>Email</p>
        </div>

        <div>
          <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-gray-100 hover:bg-gray-200 cursor-pointer ">
            <CopyToClipboard text={shareUrl} onCopy={notify}>
              <GrLink className="text-xl" />
            </CopyToClipboard>
          </div>
          <p>Copy link</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen items-center justify-center p-5">
      <button type="button" onClick={() => router.back()} className="underline">
        Go back
      </button>

      <div className="flex items-center justify-center p-5">
        <div className="w-[85%] mx-auto grid lg:flex justify-center">
          <div className="flex items-center justify-center">
            <div
              download={`${pic.alt}.jpg`}
              className="cursor-pointer lg:w-[500px] md:w-[500px] h-[500px] relative w-[320px] lg:shadow-lg lg:rounded-tl-[30px] lg:rounded-bl-[30px] rounded-tl-[20px] rounded-tr-[20px] lg:rounded-tr-[0px]"
            >
              <Image
                src={pic.src.portrait}
                alt={pic.alt}
                fill
                sizes="200"
                priority
                className="object-cover lg:rounded-tl-[30px] lg:rounded-bl-[30px] rounded-tl-[20px] rounded-tr-[20px] lg:rounded-tr-[0px] lg:shadow-lg"
                style={{ backgroundColor: pic.avg_color }}
              />
            </div>
          </div>
          <div className="lg:w-[500px] md:w-[500px] w-[320px] lg:h-[500px] h-auto overflow-auto  p-5 bg-[#fffff]  lg:rounded-tr-[30px] lg:rounded-br-[30px] lg:rounded-bl-[0px] rounded-bl-[20px] rounded-br-[20px] shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex justify-around">
                <span className="text-[19px] font-[800] text-[#111111] transition-all duration-300 cursor-pointer h-12 w-12 hover:bg-gray-100 flex justify-center items-center rounded-[50px]">
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottom"
                    trigger={["click"]}
                  >
                    <span onClick={(e) => e.preventDefault()}>
                      <FiMoreHorizontal />
                    </span>
                  </Dropdown>
                </span>
                <span className="text-[19px] font-[800] text-[#111111] transition-all duration-300 cursor-pointer h-12 w-12 hover:bg-gray-100 flex justify-center items-center rounded-[50px]">
                  <CopyToClipboard text={shareUrl} onCopy={notify}>
                    <GrLink />
                  </CopyToClipboard>
                </span>
                <span className="text-[19px] font-[800] text-[#111111] transition-all duration-300 cursor-pointer h-12 w-12 hover:bg-gray-100 flex justify-center items-center rounded-[50px]">
                  <Popover placement="bottom" content={content}>
                    <FiShare />
                  </Popover>
                </span>
              </div>

              <Toaster />
            </div>
            <p className="lg:text-[38px] font-600">
              {pic.alt || "Image name not avaliable"}
            </p>
            <Link href={pic.photographer_url}>
              <p className="cursor-pointer underline text-x">
                {pic.photographer}
              </p>
            </Link>

            {/* <div className="grid items-start justify-start mt-[5%]">
              <p className="text-xl mt-4 font-bold">Comments</p>
              <div className="mt-[5%]">
                <MyComponent />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
