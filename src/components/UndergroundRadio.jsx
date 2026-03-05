import React from 'react';
import './UndergroundRadio.css';

export default function UndergroundRadio() {
  const bars = Array.from({ length: 14 });

  return (
    <div className="underground-radio">
      <div className="radio-top">
        <div className="radio-freq">[ 87.7 FM ]</div>
        <div className="on-air">
          <span className="on-air-dot" />
          ON AIR
        </div>
      </div>

      <div className="radio-station">
        <div className="station-title">NEON FM - La Voix de la Cite</div>
        <div className="station-sub">Synthwave retro transmission</div>
      </div>

      <div className="vu-meter">
        {bars.map((_, index) => (
          <div
            key={`bar-${index}`}
            className="vu-bar"
            style={{ animationDelay: `${index * 0.08}s` }}
          />
        ))}
      </div>

      <div className="radio-message">Synthwave non-stop. La ville brille pour vous.</div>
    </div>
  );
}