import React, { useEffect, useState } from "react";

interface IntermediateUIProps {
  loadingTexts: string[];
}

const IntermediateUI: React.FC<IntermediateUIProps> = ({ loadingTexts }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (textIndex < loadingTexts.length - 1) {
      const timeout = setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setTextIndex((i) => i + 1);
          setFade(true);
        }, 400);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [textIndex, loadingTexts.length]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999] rounded-3xl p-12">
      <div
        className="w-[700px] max-w-[98vw] h-[7px] rounded-[3.5px] overflow-hidden mb-12 shadow-[0_2px_12px_#4f8cff22] relative"
        style={{
          background: "rgba(200, 220, 255, 0.7)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent 0%, #4f8cff 30%, #1cb5e0 50%, #4f8cff 70%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "continuous-loader 1.6s linear infinite",
          }}
        />
        <style>
          {`
            @keyframes continuous-loader {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}
        </style>
      </div>

      <div
        className="min-h-[40px] text-[1.25rem] font-medium tracking-[0.01em] text-center px-4"
        style={{
          color: "#2a3a4d",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      >
        {loadingTexts[textIndex]}
      </div>
    </div>
  );
};

export default IntermediateUI;
