import React, { useEffect, useRef, useState } from "react";

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
    <>
      <header>{scrollText}</header>

      <main
        ref={mainRef}
        style={{ height: "200vh", overflow: "auto" }}
      >
        Content
      </main>
    </>
  );
};

export default Scribbler;