import { useEffect } from "react";
import WebFont from "webfontloader";
import { useAppSelector } from "../../../app/hooks";
import SecondStorePage from "./second/SecondStorePage";

const StorePage = () => {
  const settings = useAppSelector((state) => state.layoutSettings);

  useEffect(() => {
    if (settings.fonts) {
      const fontsToLoad = Object.values(settings.fonts).filter(Boolean); // Get all non-empty font values
      WebFont.load({
        google: {
          families: fontsToLoad, // Load fonts dynamically
        },
      });
    }
  }, [settings.fonts]);

  return (
      <SecondStorePage />
  );
};

export default StorePage;