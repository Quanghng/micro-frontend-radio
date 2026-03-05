import React, { useEffect, useMemo, useState } from 'react';
import './UndergroundRadio.css';

const INITIAL_STATE = {
  frequency: '87.7',
  title: 'NEON FM - La Voix de la Cite',
  subtitle: 'Synthwave retro transmission',
  message: 'Synthwave non-stop. La ville brille pour vous.',
  isEmergency: false,
};

const EMERGENCY_TITLE = 'UNDERGROUND RADIO';

function getEventBus() {
  if (typeof window !== 'undefined') {
    if (window.__NEOCITY_EVENT_BUS__) {
      return window.__NEOCITY_EVENT_BUS__;
    }
    if (window.eventBus) {
      return window.eventBus;
    }
  }
  return {
    on: () => () => {},
    emit: () => {},
  };
}

export default function UndergroundRadio() {
  const eventBus = useMemo(() => getEventBus(), []);
  const [radioState, setRadioState] = useState(INITIAL_STATE);
  const [simulateIndex, setSimulateIndex] = useState(0);
  const bars = Array.from({ length: 14 });
  const simulationSteps = useMemo(
    () => [
      { event: 'weather:change', payload: { condition: 'storm' }, label: 'weather:change(storm)' },
      { event: 'power:outage', payload: { severity: 'partial' }, label: 'power:outage(partial)' },
      { event: 'power:outage', payload: { severity: 'total' }, label: 'power:outage(total)' },
      { event: 'hacker:command', payload: { command: 'riot' }, label: "hacker:command('riot')" },
      { event: 'hacker:command', payload: { command: 'love' }, label: "hacker:command('love')" },
      { event: 'hacker:command', payload: { command: 'reset' }, label: "hacker:command('reset')" },
    ],
    []
  );

  useEffect(() => {
    const subscribe = (eventName, listener) => {
      if (typeof eventBus.on !== 'function') {
        return () => {};
      }
      const unsubscribe = eventBus.on(eventName, listener);
      return typeof unsubscribe === 'function' ? unsubscribe : () => {};
    };

    const unsubWeather = subscribe('weather:change', ({ condition } = {}) => {
      if (condition !== 'storm') return;
      setRadioState({
        frequency: '87.7',
        title: INITIAL_STATE.title,
        subtitle: 'Meteo urbaine',
        message: '⚠ ALERTE METEO - Pluie toxique detectee. Restez chez vous.',
        isEmergency: false,
      });
    });

    const unsubPower = subscribe('power:outage', ({ severity } = {}) => {
      if (severity === 'partial') {
        setRadioState({
          frequency: '91.3',
          title: EMERGENCY_TITLE,
          subtitle: 'Signal de crise',
          message: '⚡ COUPURE ZONES B-D. Les equipes sont sur place.',
          isEmergency: true,
        });
      }
      if (severity === 'total') {
        setRadioState({
          frequency: '91.3',
          title: EMERGENCY_TITLE,
          subtitle: 'Signal de crise',
          message: '☠ BLACKOUT TOTAL. La ville est dans le noir. Restez calmes.',
          isEmergency: true,
        });
      }
    });

    const unsubHacker = subscribe('hacker:command', ({ command } = {}) => {
      if (command === 'riot') {
        setRadioState({
          frequency: '666.6',
          title: EMERGENCY_TITLE,
          subtitle: 'Canal pirate active',
          message: 'LA RESISTANCE PARLE. LE MOMENT EST VENU. NEON CITY APPARTIENT AU PEUPLE.',
          isEmergency: true,
        });
      }
      if (command === 'love') {
        setRadioState({
          frequency: '88.8',
          title: INITIAL_STATE.title,
          subtitle: 'Message public',
          message: '💕 UN MESSAGE DE PAIX. AIMEZ-VOUS. LA NUIT EST BELLE.',
          isEmergency: false,
        });
      }
      if (command === 'reset') {
        setRadioState(INITIAL_STATE);
      }
    });

    return () => {
      unsubWeather();
      unsubPower();
      unsubHacker();
    };
  }, [eventBus]);

  const handleSimulate = () => {
    const step = simulationSteps[simulateIndex % simulationSteps.length];
    if (typeof eventBus.emit === 'function') {
      eventBus.emit(step.event, step.payload);
    }
    setSimulateIndex((current) => (current + 1) % simulationSteps.length);
  };

  return (
    <div className={`underground-radio ${radioState.isEmergency ? 'is-emergency' : ''}`}>
      <div className="radio-top">
        <div className="radio-freq">[ {radioState.frequency} FM ]</div>
        <div className="on-air">
          <span className="on-air-dot" />
          ON AIR
        </div>
      </div>

      <button className="simulate-btn" type="button" onClick={handleSimulate}>
        SIMULATE {simulationSteps[simulateIndex % simulationSteps.length].label}
      </button>

      <div className="radio-station">
        <div className="station-title">{radioState.title}</div>
        <div className="station-sub">{radioState.subtitle}</div>
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

      <div className="radio-message">{radioState.message}</div>
    </div>
  );
}
