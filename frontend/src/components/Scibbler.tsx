import { QrCode } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import QRCodePosterExample from "./the_mall/basic_store_post/QRCodePosterExample";
import QRCodeGenerator from "./the_mall/posters/QRCodeGenerator";

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
    <div className="h-screen flex items-center justify-center">
      <QRCodeGenerator storeSlug="emagwinyeni" />
    </div>
    
  );
};

export default Scribbler;