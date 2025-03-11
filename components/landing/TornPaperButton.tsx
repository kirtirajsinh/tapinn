"use client";
import React from "react";

const TornPaperButton = ({
  text,
  onClick,
  loading,
  children,
}: {
  text: string;
  onClick: () => void;
  loading?: boolean;
  children: React.ReactNode;
}) => {
  // Split text into words for multi-line display if needed
  const words = text.split(" ");
  const lines = [];
  for (let i = 0; i < words.length; i += 5) {
    lines.push(words.slice(i, i + 5).join(" "));
  }

  // Calculate dimensions based on text length
  const width = Math.max(150, text.length * 10);
  const height = Math.max(60, 40 + lines.length * 28);

  // Generate the path string with the dynamic width and height values
  const pathString = `M10,15 C${width * 0.1},10 ${width * 0.2},20 ${
    width * 0.3
  },15 C${width * 0.4},20 ${width * 0.5},10 ${width * 0.6},15 C${
    width * 0.7
  },10 ${width * 0.8},20 ${width * 0.9},15 L${width - 10},15 L${width - 10},${
    height - 20
  } C${width * 0.9},${height - 10} ${width * 0.7},${height - 15} ${
    width * 0.5
  },${height - 10} C${width * 0.3},${height - 15} ${width * 0.1},${
    height - 10
  } 10,${height - 10} Z`;

  return (
    <button
      onClick={onClick}
      className={`
        relative
        bg-secondary
        shadow-md
        hover:shadow-lg
        transition-all
        duration-300
        transform
       hover:scale-105
       cursor-pointer
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        font-semibold
        text-4xl
      `}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        clipPath: `path('${pathString}')`,
      }}
      disabled={loading}
    >
      {children}
    </button>
  );
};
export default TornPaperButton;
