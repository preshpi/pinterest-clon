import React from "react";
import { useState } from "react";
import Mansory from "react-masonry-css";
import Image from "next/image";
import Navigation from "./Segmented";

function Videos({ videoscroll }) {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const [isPlaying, setIsPlaying] = useState(null);

  const handleImageClick = (id) => {
    setIsPlaying(id);
  };

  return (
    <div>
      <div className="w-[85%] mx-auto">
        <Navigation />
        <div>
          <Mansory
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {videoscroll?.map(({ id, video_files, duration, image }) => (
              <div key={id}>
                <div className="relative">
                  <figure className="h-auto w-auto">
                    <Image
                      src={image}
                      alt="picture-in-image"
                      height={600}
                      width={400}
                      priority
                      className="object-cover rounded-lg"
                      onClick={() => handleImageClick(id)}
                      style={{ cursor: "pointer" }}
                    />
                  </figure>
                  {isPlaying === id ? (
                    <video
                      src={video_files[0].link}
                      controls
                      autoPlay
                      className="rounded-lg absolute top-0 left-0 w-full h-full object-contain"
                      onClick={() => setIsPlaying(null)}
                    />
                  ) : (
                    <p className="absolute top-0 right-0 m-1 bg-white opacity-75 p-1 rounded-[30px] text-sm">
                      {duration}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Mansory>
        </div>
      </div>
    </div>
  );
}

export default Videos;
