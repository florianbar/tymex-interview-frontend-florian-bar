"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

import { getRandomUserImage, getRandomImageColor } from "@/utils/images";

interface UserImage {
  alt: string;
}

export default function UserImage({ alt }: UserImage) {
  const [image] = useState(getRandomUserImage());
  const [imageColor] = useState(getRandomImageColor());

  const gradientStyles = useMemo<string>(() => {
    if (!imageColor) return "";

    let gradientStyles = "bg-gradient-to-r ";

    switch (imageColor) {
      case "purple":
        gradientStyles +=
          "from-[var(--tymex-purple-1)] to-[var(--tymex-purple-2)]";
        break;
      case "green":
        gradientStyles +=
          "from-[var(--tymex-green-1)] to-[var(--tymex-green-2)]";
        break;
      case "yellow":
        gradientStyles +=
          "from-[var(--tymex-yellow-1)] to-[var(--tymex-yellow-2)]";
        break;
      case "red":
        gradientStyles += "from-[var(--tymex-red-1)] to-[var(--tymex-red-2)]";
        break;
      case "blue":
      default:
        gradientStyles += "from-[var(--tymex-blue-1)] to-[var(--tymex-blue-2)]";
        break;
    }

    return gradientStyles;
  }, [imageColor]);

  return (
    <div className={`w-full h-[233px] rounded-sm relative ${gradientStyles}`}>
      <Image
        src={image}
        alt={alt}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        width={235}
        height={197}
      />
    </div>
  );
}
