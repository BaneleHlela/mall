import { QrCode } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import QRCodePosterExample from "./the_mall/basic_store_post/QRCodePosterExample";
import QRCodeGenerator from "./the_mall/posters/QRCodeGenerator";
import FramedPoster from "./the_mall/posters/FramedPoster";

const Scribbler: React.FC = () => {
  const mainRef = useRef<HTMLElement | null>(null);
  const [scrollText, setScrollText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const mainScroll = mainRef.current?.scrollTop ?? 0;

      setScrollText(
        `scrollTop: ${[
          window.scrollY,
          document.body.scrollTop,
          mainScroll,
        ].join(" / ")}`
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  console.log(window.scrollY);
  return (
    <div className="h-screen w-full max-w-md flex items-center justify-center">
      <QRCodeGenerator storeSlug="yo-solution" />
      {/* <FramedPoster
        imageUrl="https://storage.googleapis.com/the-mall-uploads-giza/stores/mall-designs/images/Black%20And%20White%20Vintage%20Bold%20Party%20Celebration%20Birthday%20Newspaper%20Flyer.png"
        color="#fff"
      /> */}
      {/* <div className="w-full h-[50%] bg-white">
        <div className="w-full h-[60%] bg-black"></div>
      </div> */}
    </div>
    
  );
};

export default Scribbler;