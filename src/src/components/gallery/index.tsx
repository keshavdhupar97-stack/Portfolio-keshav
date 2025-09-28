import { useState } from "react";
import ImageModal from "./ImageModal";
// import { VideoText } from "../ui/VideoText";

type GalleryItem = {
  src?: string;
  thumb?: string;
  span: number;
  heading?: string;
};

type GalleryCategory = {
  category: string;
  items: GalleryItem[];
};

// const galleryData: GalleryCategory[] =
// [
//   {
//     category: "Music",
//     items: [
//       { heading: "Music Albums", span: 1 },
//       { src: "./img/illustrations/audiora.png", thumb: "./img/illustrations/audiora.png", span: 2 },
//       { src: "./img/illustrations/Adidas.png", thumb: "./img/illustrations/Adidas.png", span: 2 },
//       { src: "./img/illustrations/keyhomes.png", thumb: "./img/illustrations/keyhomes.png", span: 1 },
//     ],
//   },
//   {
//     category: "Logos",
//     items: [
//       { heading: "Logos", span: 3 },
//       { src: "./img/illustrations/strawberry.png", thumb: "./img/illustrations/strawberry.png", span: 1 },
//       { src: "./img/illustrations/audiora.png", thumb: "./img/illustrations/audiora.png", span: 2 },
//     ],
//   },
//   {
//     category: "Client Work",
//     items: [
//       { heading: "Client Work", span: 3 },
//       { src: "/img/illustrations/audiora.png", thumb: "/img/illustrations/audiora.png", span: 1 },
//       { src: "/img/illustrations/Adidas.png", thumb: "/img/illustrations/Adidas.png", span: 2 },
//       { src: "/img/illustrations/keyhomes.png", thumb: "/img/illustrations/keyhomes.png", span: 2 },
//       { src: "/img/illustrations/strawberry.png", thumb: "/img/illustrations/strawberry.png", span: 1 },
//     ],
//   },
//   {
//     category: "Illustrations",
//     items: [
//       { heading: "Illustrations", span: 2 },
//       { src: "/img/illustrations/illustrations/angry bird illustration.jpg", thumb: "/img/illustrations/illustrations/angry bird illustration.jpg", span: 1 },
//       { src: "/img/illustrations/illustrations/anime.jpg", thumb: "/img/illustrations/illustrations/anime.jpg", span: 2 },
//       { src: "/img/illustrations/illustrations/art.jpg", thumb: "/img/illustrations/illustrations/art.jpg", span: 1 },
//       { src: "/img/illustrations/illustrations/joker illustration 12.jpg", thumb: "/img/illustrations/illustrations/joker illustration 12.jpg", span: 1 },
//       { src: "/img/illustrations/illustrations/paper art1-01.jpg", thumb: "/img/illustrations/illustrations/paper art1-01.jpg", span: 2 },
//       { src: "/img/illustrations/illustrations/silhouette vector art 2.jpg", thumb: "/img/illustrations/illustrations/silhouette vector art 2.jpg", span: 1 },
//     ],
//   },
//   {
//     category: "Vector Arts",
//     items: [
//       { heading: "Vector Arts", span: 3 },
//       { src: "/img/illustrations/illustrations/Bunny vector.jpg", thumb: "/img/illustrations/illustrations/Bunny vector.jpg", span: 2 },
//       { src: "/img/illustrations/illustrations/clock-01.jpg", thumb: "/img/illustrations/illustrations/clock-01.jpg", span: 1 },
//       { src: "/img/illustrations/illustrations/cutout effect4.jpg", thumb: "/img/illustrations/illustrations/cutout effect4.jpg", span: 2 },
//       { src: "/img/illustrations/illustrations/Fox vector.jpg", thumb: "/img/illustrations/illustrations/Fox vector.jpg", span: 1 },
//       { src: "/img/illustrations/illustrations/fox.jpg", thumb: "/img/illustrations/illustrations/fox.jpg", span: 2 },
//       { src: "/img/illustrations/illustrations/vector final.jpg", thumb: "/img/illustrations/illustrations/vector final.jpg", span: 1 },
//     ],
//   },
//   {
//     category: "Sketches",
//     items: [
//       { heading: "Sketches", span: 3 },
//       { src: "/img/illustrations/illustrations/sketch done.jpg", thumb: "/img/illustrations/illustrations/sketch done.jpg", span: 2 },
//     ],
//   }
// ];

const galleryData: GalleryCategory[] = [
  {
    category: "Music",
    items: [
      { heading: "Music Albums", span: 1 },
      {
        src: "/img/illustrations/1.jpg",
        thumb: "/img/illustrations/1.jpg",
        span: 2,
      },
      {
        src: "/img/illustrations/2.jpg",
        thumb: "/img/illustrations/2.jpg",
        span: 2,
      },
      {
        src: "/img/illustrations/3.jpg",
        thumb: "/img/illustrations/3.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/4.jpg",
        thumb: "/img/illustrations/4.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/5.jpg",
        thumb: "/img/illustrations/5.jpg",
        span: 2,
      },
    ],
  },
  {
    category: "Logos",
    items: [
      { heading: "Logos", span: 3 },
      {
        src: "/img/illustrations/6.jpg",
        thumb: "/img/illustrations/6.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/7.jpg",
        thumb: "/img/illustrations/7.jpg",
        span: 2,
      },
      {
        src: "/img/illustrations/8.jpg",
        thumb: "/img/illustrations/8.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/9.jpg",
        thumb: "/img/illustrations/9.jpg",
        span: 1,
      },
    ],
  },
  {
    category: "Client Work",
    items: [
      { heading: "Client Work", span: 3 },
      {
        src: "/img/illustrations/10.jpg",
        thumb: "/img/illustrations/10.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/11.jpg",
        thumb: "/img/illustrations/11.jpg",
        span: 2,
      },
      {
        src: "/img/illustrations/12.jpg",
        thumb: "/img/illustrations/12.jpg",
        span: 2,
      },
      {
        src: "/img/illustrations/13.jpg",
        thumb: "/img/illustrations/13.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/14.jpg",
        thumb: "/img/illustrations/14.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/15.jpg",
        thumb: "/img/illustrations/15.jpg",
        span: 2,
      },
    ],
  },
  {
    category: "Illustrations",
    items: [
      { heading: "Illustrations", span: 2 },
      {
        src: "/img/illustrations/16.jpg",
        thumb: "/img/illustrations/16.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/17.jpg",
        thumb: "/img/illustrations/17.jpg",
        span: 2,
      },
      {
        src: "/img/illustrations/18.jpg",
        thumb: "/img/illustrations/18.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/19.jpg",
        thumb: "/img/illustrations/19.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/20.jpg",
        thumb: "/img/illustrations/20.jpg",
        span: 2,
      },
      {
        src: "/img/illustrations/21.jpg",
        thumb: "/img/illustrations/21.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/22.jpg",
        thumb: "/img/illustrations/22.jpg",
        span: 2,
      },
    ],
  },
  {
    category: "Vector Arts",
    items: [
      { heading: "Vector Arts", span: 3 },
      {
        src: "/img/illustrations/23.jpg",
        thumb: "/img/illustrations/23.jpg",
        span: 2,
      },
      {
        src: "/img/illustrations/24.jpg",
        thumb: "/img/illustrations/24.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/25.jpg",
        thumb: "/img/illustrations/25.jpg",
        span: 2,
      },
      {
        src: "/img/illustrations/26.jpg",
        thumb: "/img/illustrations/26.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/27.jpg",
        thumb: "/img/illustrations/27.jpg",
        span: 2,
      },
      {
        src: "/img/illustrations/28.jpg",
        thumb: "/img/illustrations/28.jpg",
        span: 1,
      },
    ],
  },
  {
    category: "Sketches",
    items: [
      { heading: "Sketches", span: 3 },
      {
        src: "/img/illustrations/29.jpg",
        thumb: "/img/illustrations/29.jpg",
        span: 2,
      },
      {
        src: "/img/illustrations/30.jpg",
        thumb: "/img/illustrations/30.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/31.jpg",
        thumb: "/img/illustrations/31.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/32.jpg",
        thumb: "/img/illustrations/32.jpg",
        span: 2,
      },
    ],
  },
  {
    category: "Extras",
    items: [
      { heading: "Extra Work", span: 2 },
      {
        src: "/img/illustrations/33.jpg",
        thumb: "/img/illustrations/33.jpg",
        span: 2,
      },
      {
        src: "/img/illustrations/34.jpg",
        thumb: "/img/illustrations/34.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/35.jpg",
        thumb: "/img/illustrations/35.jpg",
        span: 2,
      },
      {
        src: "/img/illustrations/36.jpg",
        thumb: "/img/illustrations/36.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/37.jpg",
        thumb: "/img/illustrations/37.jpg",
        span: 1,
      },
      {
        src: "/img/illustrations/38.jpg",
        thumb: "/img/illustrations/38.jpg",
        span: 1,
      },
    ],
  },
];

export default function GalleryGrid() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Flatten all images from all categories for navigation
  const allImages = galleryData.flatMap((category) =>
    category.items
      .filter((item) => item.src)
      .map((item) => ({
        src: item.src!,
        thumb: item.thumb!,
        span: item.span,
      }))
  );

  const handleImageClick = (imageSrc: string) => {
    const imageIndex = allImages.findIndex((img) => img.src === imageSrc);
    setCurrentImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePrevious = () => {
    const newIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : allImages.length - 1;
    setCurrentImageIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentImageIndex < allImages.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="bg-white">
      <div className="text-center">
        <h2 className="khula-regular text-black text-5xl max-sm:text-3xl tracking-tight mt-20 ">
          PROJECTS
        </h2>
      </div>
      <div className="p-6 pt-16">
        {/* Masonry-style column layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {galleryData.map((category, catIdx) =>
            category.items.map((item, i) =>
              item.heading ? (
                <div
                  key={`${catIdx}-${i}`}
                  className="w-full break-inside-avoid rounded-xl p-8 items-center hidden"
                >
                  <h2 className="text-4xl font-extrabold uppercase  poppins-extrabold text-center">
                    {item.heading}
                  </h2>
                </div>
              ) : (
                <div
                  key={`${catIdx}-${i}`}
                  className="break-inside-avoid overflow-hidden rounded-xl shadow-md cursor-pointer mb-4"
                  onClick={() => handleImageClick(item.src || "")}
                >
                  <img
                    src={item.thumb}
                    alt="gallery"
                    className="w-full object-cover rounded-xl"
                  />
                </div>
              )
            )
          )}
        </div>

        {/* Framer Motion Modal */}
        <ImageModal
          images={allImages}
          currentIndex={currentImageIndex}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
