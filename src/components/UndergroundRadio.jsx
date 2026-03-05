import React from 'react';
import './UndergroundRadio.css';

export default function UndergroundRadio() {
  return (
    <div className="underground-radio">
      <div className="radio-top">
        <div className="radio-freq">TODO FM</div>
        <div className="on-air">ON AIR</div>
      </div>

      <button className="simulate-btn" disabled>
        SIMULATE PIRATE SIGNAL (TODO)
      </button>

      <div className="radio-station">
        <div className="station-title">UNDERGROUND RADIO - STUDENT STARTER</div>
        <div className="station-sub">TODO: typewriter + emergency modes</div>
      </div>

      <div className="vu-meter">
        <div className="vu-bar" />
        <div className="vu-bar" />
        <div className="vu-bar" />
      </div>

      <div className="radio-message">
        TODO: listen hacker:command, power:outage, weather:change and emit radio:broadcast.
      </div>
    </div>
  );
}