import React, { useState, useEffect, useRef, useCallback } from 'react';
import eventBus from '../eventBus';
import './UndergroundRadio.css';

// Default "Normal" state constants
const DEFAULTS = {
  frequency: '87.7',
  stationName: 'NEON FM',
  subContext: 'La Voix de la Cité',
  themeColor: 'blue',
  fullMessage: 'Synthwave non-stop. La ville brille pour vous.',
};

export default function UndergroundRadio() {
  const bars = Array.from({ length: 14 });

  // --- 1. State Management ---
  const [frequency, setFrequency] = useState(DEFAULTS.frequency);
  const [stationName, setStationName] = useState(DEFAULTS.stationName);
  const [subContext, setSubContext] = useState(DEFAULTS.subContext);
  const [themeColor, setThemeColor] = useState(DEFAULTS.themeColor);
  const [fullMessage, setFullMessage] = useState(DEFAULTS.fullMessage);
  const [displayedMessage, setDisplayedMessage] = useState('');

  // Ref to track typewriter interval
  const typewriterRef = useRef(null);

  // Helper to apply a full state transition
  const applyState = useCallback(({ freq, name, sub, color, msg }) => {
    setFrequency(freq);
    setStationName(name);
    setSubContext(sub);
    setThemeColor(color);
    setFullMessage(msg);
  }, []);

  // --- 2. Typewriter Effect ---
  useEffect(() => {
    // Reset displayed message when fullMessage changes
    setDisplayedMessage('');
    let index = 0;

    // Clear any previous interval
    if (typewriterRef.current) {
      clearInterval(typewriterRef.current);
    }

    typewriterRef.current = setInterval(() => {
      if (index < fullMessage.length) {
        setDisplayedMessage(fullMessage.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typewriterRef.current);
        typewriterRef.current = null;
      }
    }, 40);

    // Cleanup on unmount or when fullMessage changes again
    return () => {
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current);
        typewriterRef.current = null;
      }
    };
  }, [fullMessage]);

  // --- 3. Event Bus Listeners ---
  useEffect(() => {
    const unsubWeather = eventBus.on('weather:change', ({ condition }) => {
      if (condition === 'storm') {
        applyState({
          freq: '87.7',
          name: 'NEON FM',
          sub: '⚠️ ALERTE MÉTÉO',
          color: 'red',
          msg: '⚠️ ALERTE MÉTÉO - Pluie toxique détectée. Restez chez vous.',
        });
        eventBus.emit('radio:broadcast', {
          message: '⚠️ ALERTE MÉTÉO - Pluie toxique détectée. Restez chez vous.',
          frequency: '87.7',
          isEmergency: true,
        });
      }
    });

    const unsubPower = eventBus.on('power:outage', ({ severity }) => {
      if (severity === 'partial') {
        applyState({
          freq: '91.3',
          name: '☢ UNDERGROUND RADIO',
          sub: '',
          color: 'orange',
          msg: '⚡ COUPURE ZONES B-D. Les équipes sont sur place.',
        });
        eventBus.emit('radio:broadcast', {
          message: '⚡ COUPURE ZONES B-D. Les équipes sont sur place.',
          frequency: '91.3',
          isEmergency: true,
        });
      } else if (severity === 'total') {
        applyState({
          freq: '91.3',
          name: '☢ UNDERGROUND RADIO',
          sub: '',
          color: 'red',
          msg: '☠️ BLACKOUT TOTAL. La ville est dans le noir. Restez calmes.',
        });
        eventBus.emit('radio:broadcast', {
          message: '☠️ BLACKOUT TOTAL. La ville est dans le noir. Restez calmes.',
          frequency: '91.3',
          isEmergency: true,
        });
      }
    });

    const unsubHacker = eventBus.on('hacker:command', ({ command }) => {
      if (command === 'riot') {
        applyState({
          freq: '666.6',
          name: '☢ UNDERGROUND RADIO',
          sub: '',
          color: 'red',
          msg: 'LA RÉSISTANCE PARLE. LE MOMENT EST VENU. NEON CITY APPARTIENT AU PEUPLE.',
        });
        eventBus.emit('radio:broadcast', {
          message: 'LA RÉSISTANCE PARLE. LE MOMENT EST VENU. NEON CITY APPARTIENT AU PEUPLE.',
          frequency: '666.6',
          isEmergency: true,
        });
      } else if (command === 'love') {
        applyState({
          freq: '88.8',
          name: '💕 PEACE FM',
          sub: 'Un message de paix',
          color: 'green',
          msg: 'UN MESSAGE DE PAIX DE VOS HACKERS AMIS. AIMEZ-VOUS. LA NUIT EST BELLE.',
        });
        eventBus.emit('radio:broadcast', {
          message: 'UN MESSAGE DE PAIX DE VOS HACKERS AMIS. AIMEZ-VOUS. LA NUIT EST BELLE.',
          frequency: '88.8',
          isEmergency: false,
        });
      } else if (command === 'reset') {
        applyState({
          freq: DEFAULTS.frequency,
          name: DEFAULTS.stationName,
          sub: DEFAULTS.subContext,
          color: DEFAULTS.themeColor,
          msg: DEFAULTS.fullMessage,
        });
        eventBus.emit('radio:broadcast', {
          message: DEFAULTS.fullMessage,
          frequency: DEFAULTS.frequency,
          isEmergency: false,
        });
      }
    });

    // Cleanup: unsubscribe from all events on unmount
    return () => {
      unsubWeather();
      unsubPower();
      unsubHacker();
    };
  }, [applyState]);

  // --- 4. Event Emitter (Simulate Button) ---
  const handleSimulate = useCallback(() => {
    // Apply the blackout state locally so the UI reacts
    applyState({
      freq: '91.3',
      name: '☢ UNDERGROUND RADIO',
      sub: '',
      color: 'red',
      msg: '☠️ BLACKOUT TOTAL. La ville est dans le noir. Restez calmes.',
    });

    // Also emit for any external MFEs listening
    eventBus.emit('radio:broadcast', {
      message: 'BLACKOUT TOTAL. La ville est dans le noir.',
      frequency: '91.3',
      isEmergency: true,
    });
  }, [applyState]);

  // --- Theme color mapping for VU bars ---
  const barColorMap = {
    red: 'linear-gradient(180deg, #ff6b6b 0%, #ff2d2d 55%, #b91c1c 100%)',
    orange: 'linear-gradient(180deg, #ffbe76 0%, #f39c12 55%, #e67e22 100%)',
    green: 'linear-gradient(180deg, #a8ffce 0%, #34d399 55%, #059669 100%)',
    blue: 'linear-gradient(180deg, #8bf6ff 0%, #45b3ff 55%, #2a6fd8 100%)',
  };
  const barGradient =
    barColorMap[themeColor] ||
    'linear-gradient(180deg, #8bf6ff 0%, #45b3ff 55%, #2a6fd8 100%)';

  // --- Crisis mode class ---
  const isCrisis = frequency !== '87.7';

  return (
    <div className={`underground-radio${isCrisis ? ' crisis' : ''}`}>
      <div className="radio-top">
        <div className="radio-freq">[ {frequency} FM ]</div>
        <div className="radio-top-right">
          <button className="simulate-btn" onClick={handleSimulate}>
            ▶ SIMULATE PIRATE SIGNAL
          </button>
          <div className="on-air">
            <span className="on-air-dot" />
            ON AIR
          </div>
        </div>
      </div>

      <div className="radio-station">
        <div className="station-title">{stationName}</div>
        <div className="station-sub">{subContext || '\u00A0'}</div>
      </div>

      <div className="vu-meter">
        {bars.map((_, index) => (
          <div
            key={`bar-${index}`}
            className={`vu-bar${isCrisis ? ' vu-bar-intense' : ''}`}
            style={{
              animationDelay: `${index * 0.08}s`,
              background: barGradient,
            }}
          />
        ))}
      </div>

      <div className="radio-message">
        {displayedMessage}
        <span className="typewriter-cursor">|</span>
      </div>
    </div>
  );
}