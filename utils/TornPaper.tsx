import React from "react";

const TornPaper = ({
  text,
  textColor,
  bgColor,
}: {
  text: string;
  textColor: string;
  bgColor: string;
}) => {
  // Split text into words
  const words = text.split(" ");

  // Create lines with maximum 5 words per line
  const MAX_WORDS_PER_LINE = 5;
  const lines: string[] = [];

  for (let i = 0; i < words.length; i += MAX_WORDS_PER_LINE) {
    lines.push(words.slice(i, i + MAX_WORDS_PER_LINE).join(" "));
  }

  // Calculate dimensions
  const longestLine = lines.reduce(
    (max, line) => (line.length > max.length ? line : max),
    ""
  );
  const width = Math.max(150, longestLine.length * 13);
  const height = Math.max(60, 40 + lines.length * 28); // Base height + line height per line

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
    >
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
      </filter>
      <path
        d={`M10,15 C${width * 0.1},10 ${width * 0.2},20 ${width * 0.3},15 C${
          width * 0.4
        },20 ${width * 0.5},10 ${width * 0.6},15 C${width * 0.7},10 ${
          width * 0.8
        },20 ${width * 0.9},15 L${width - 10},15 L${width - 10},${
          height - 20
        } C${width * 0.9},${height - 10} ${width * 0.7},${height - 15} ${
          width * 0.5
        },${height - 10} C${width * 0.3},${height - 15} ${width * 0.1},${
          height - 10
        } 10,${height - 10} Z`}
        fill={bgColor}
        filter="url(#shadow)"
      />
      <foreignObject x="10" y="20" width={width - 20} height={height - 30}>
        <div
          style={{
            fontFamily: "VT323",
            fontSize: "24px",
            textAlign: "center",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
            color: textColor,
          }}
        >
          {lines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </foreignObject>
    </svg>
  );
};

export default TornPaper;
