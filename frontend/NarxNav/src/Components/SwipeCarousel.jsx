import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import './SmsChat.css';
import ip from "../Components/Config";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 5;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 500,
  damping: 50,
};

const SwipeCarousel = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [images, setImages] = useState([]);
  const dragX = useMotionValue(0);

  useEffect(() => {
    fetch(`http://185.105.89.222:8080/api/carousels/`)
      .then((response) => response.json())
      .then((data) => {
        setImages(data.map(item => item.image_uz));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();
      if (x === 0) {
        setImgIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }
    }, AUTO_DELAY);
    return () => clearInterval(intervalRef);
  }, [images, dragX]);

  const onDragEnd = (event, info) => {
    const x = info.offset.x;
    if (x <= -DRAG_BUFFER) {
      setImgIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    } else if (x >= DRAG_BUFFER) {
      setImgIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }
    dragX.set(0); // Reset dragX after drag ends
  };

  return (
    <div className="relavite   w-full overflow-hidden py-4">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${imgIndex * 100}%` }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing w-full"
      >
        <Images imgIndex={imgIndex} images={images} />
      </motion.div>
      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} images={images} />
      <GradientEdges />
    </div>
  );
};

const Images = ({ imgIndex, images }) => {
  return (
    <>
      {images.map((imgSrc, idx) => (
        <motion.div
          key={idx}
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{ scale: imgIndex === idx ? 1 : 0.90 }}
          transition={SPRING_OPTIONS}
          className="aspect-video w-full shrink-0 "
        />
      ))}
    </>
  );
};

const Dots = ({ imgIndex, setImgIndex, images }) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {images.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setImgIndex(idx)}
          className={`h-3 w-3 rounded-full transition-colors ${
            idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
          }`}
        />
      ))}
    </div>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="animation-photo pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px]" />
      <div className="animation-photo pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px]" />
    </>
  );
};

export default SwipeCarousel;
