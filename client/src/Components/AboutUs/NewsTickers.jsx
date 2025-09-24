import React from "react";

const NewsTickers = () => {
  const newsItems = [
    "New AI-Powered Threat Detection System Launched",
    "Awarded Best Security Company 2024",
    "24/7 Emergency Response Available",
    " Advanced Cybersecurity Solutions Now Available",
    " Mobile Security App Downloaded 100K+ Times",
    " New Branch Office Opening in Downtown",
    " Lightning-Fast Response Time Under 5 Minutes",
    " Zero Security Breaches for 3 Consecutive Years",
  ];

  return (
    <div className="bg-[#15487d] py-2 overflow-hidden relative">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {/* First set */}
          {newsItems.map((item, index) => (
            <div key={index} className="flex-shrink-0 px-8">
              <span className="text-white font-medium text-lg">{item}</span>
            </div>
          ))}

          {/* Duplicate set for seamless infinite loop */}
          {newsItems.map((item, index) => (
            <div key={`duplicate-${index}`} className="flex-shrink-0 px-8">
              <span className="text-white font-medium text-lg">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Inline CSS keyframes */}
      <style jsx>{`
        .ticker-wrapper {
          display: flex;
          width: 100%;
          overflow: hidden;
        }

        .ticker-content {
          display: flex;
          white-space: nowrap;
          animation: scroll-left 40s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default NewsTickers;
