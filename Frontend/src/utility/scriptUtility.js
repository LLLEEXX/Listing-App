import { useState, useEffect, createContext, useContext} from "react";
import { useMediaQuery } from "@mui/material";


export default function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return;
  }, []);

  return screenWidth;
}

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return;
  }, []);

  return scrollPosition;
}

//Color Variables
export const colors = {
  black: "#030708",
  primary: "#39a3cc",
  secondary: "#95d2e9",
  accent: "#59bde3",
  light: "#F0F8FC",
  bg: "#fafdfe",
  secondaryBg: "#E6F5FA",
  greyBg: "#F2F5F6",
  active: "#E0EEF4",
  mainBg: "#F5F5F5",
};

//UseMediaQueries
export const useBreakpoint = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:960px)"
  );
  const isLargeScreen = useMediaQuery("(min-width:961px)");

  return {
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
  };
};

