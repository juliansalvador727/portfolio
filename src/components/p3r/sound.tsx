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
const BACK_SOUND_SRC = "/p3r/goback.wav";

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
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const backSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setEnabled(localStorage.getItem("p3r-sound") === "on");
  }, []);

  useEffect(() => {
    const hoverSound = new Audio(HOVER_SOUND_SRC);
    const clickSound = new Audio(CLICK_SOUND_SRC);
    const backSound = new Audio(BACK_SOUND_SRC);
    hoverSound.preload = "auto";
    clickSound.preload = "auto";
    backSound.preload = "auto";
    hoverSound.volume = 0.6;
    clickSound.volume = 0.7;
    backSound.volume = 0.7;
    hoverSoundRef.current = hoverSound;
    clickSoundRef.current = clickSound;
    backSoundRef.current = backSound;

    return () => {
      hoverSound.pause();
      clickSound.pause();
      backSound.pause();
      hoverSoundRef.current = null;
      clickSoundRef.current = null;
      backSoundRef.current = null;
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

        const backSound = backSoundRef.current ?? new Audio(BACK_SOUND_SRC);
        backSoundRef.current = backSound;
        backSound.currentTime = 0;
        void backSound.play().catch(() => {});
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
