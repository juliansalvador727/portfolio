"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type SoundName = "move" | "confirm" | "back";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
};

const HOVER_SOUND_SRC = "/p3r/hoversoundeffect.wav";
const CLICK_SOUND_SRC = "/p3r/onclick.wav";

const SoundContext = createContext<SoundContextValue>({
  enabled: false,
  toggle: () => {},
  play: () => {},
});

export function useP3RSound() {
  return useContext(SoundContext);
}

/** Persona-style menu sounds. */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setEnabled(localStorage.getItem("p3r-sound") === "on");
  }, []);

  useEffect(() => {
    const hoverSound = new Audio(HOVER_SOUND_SRC);
    const clickSound = new Audio(CLICK_SOUND_SRC);
    hoverSound.preload = "auto";
    clickSound.preload = "auto";
    hoverSound.volume = 0.6;
    clickSound.volume = 0.7;
    hoverSoundRef.current = hoverSound;
    clickSoundRef.current = clickSound;

    return () => {
      hoverSound.pause();
      clickSound.pause();
      hoverSoundRef.current = null;
      clickSoundRef.current = null;
    };
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      localStorage.setItem("p3r-sound", prev ? "off" : "on");
      return !prev;
    });
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      try {
        if (name === "move") {
          const hoverSound =
            hoverSoundRef.current ?? new Audio(HOVER_SOUND_SRC);
          hoverSoundRef.current = hoverSound;
          hoverSound.currentTime = 0;
          void hoverSound.play().catch(() => {});
          return;
        }

        if (name === "confirm") {
          const clickSound = clickSoundRef.current ?? new Audio(CLICK_SOUND_SRC);
          clickSoundRef.current = clickSound;
          clickSound.currentTime = 0;
          void clickSound.play().catch(() => {});
          return;
        }

        const Ctor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        ctxRef.current ??= new Ctor();
        const ctx = ctxRef.current;
        if (ctx.state === "suspended") void ctx.resume();

        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = "square";
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(220, t + 0.09);
        gain.gain.setValueAtTime(0.04, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
        osc.start(t);
        osc.stop(t + 0.11);
      } catch {
        // Audio unavailable — stay silent.
      }
    },
    [enabled]
  );

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}
