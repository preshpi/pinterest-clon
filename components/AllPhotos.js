import React from "react";
import Image from "next/image";
import Link from "next/link";
import Mansory from "react-masonry-css";

function Allmedias({ photos }) {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="w-[85%] mx-auto">
      <Mansory
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid w-full"
        columnClassName="my-masonry-grid_column"
      >
        {photos?.map(
          ({ alt, id, photographer, photographer_url, src, avg_color }) => (
            <div key={id}>
              <Link href={`/${id}`}>
                <figure className="h-auto w-auto">
                  <Image
                    src={src.original}
                    alt={alt}
                    height={600}
                    width={400}
                    priority
                    className="object-cover rounded-lg"
                    style={{ backgroundColor: avg_color }}
                  />
                </figure>
              </Link>
              <p>
                <Link href={photographer_url}>{photographer}</Link>
              </p>
              {/* <Link href={url}>photographer</Link> */}
            </div>
          )
        )}
      </Mansory>
    </div>
  );
}

export default Allmedias;
