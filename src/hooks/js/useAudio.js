import { useEffect, useState } from 'react';

export const useAudio = (ref) => {
  const audio = ref.current;

  const [audioState, setAudioState] = useState({
    isPaused: audio ? audio?.paused : true,
    isMuted: audio ? audio?.muted : false,
    currentVolume: audio ? audio?.volume : 100,
    currentTime: audio ? audio?.currentTime : 0
  });

  const play = () => {
    audio?.play();
    setAudioState((prev) => {
      return {
        ...prev,
        isPaused: false,
        isMuted: audio ? audio.muted : prev.isMuted
      };
    });
  };

  const pause = () => {
    audio?.pause();
    setAudioState((prev) => {
      return {
        ...prev,
        isPaused: true
      };
    });
  };

  const handlePlayPauseControl = (e) => {
    setAudioState((prev) => {
      return {
        ...prev,
        isPaused: e.target.paused
      };
    });
  };

  const togglePause = () => (audio?.paused ? play() : pause());

  const handleVolume = (delta) => {
    const deltaDecimal = delta / 100;

    if (audio) {
      let newVolume = audio?.volume + deltaDecimal;

      if (newVolume >= 1) {
        newVolume = 1;
      } else if (newVolume <= 0) {
        newVolume = 0;
      }

      audio.volume = newVolume;
      setAudioState((prev) => {
        return {
          ...prev,
          currentVolume: newVolume * 100
        };
      });
    }
  };

  const handleVolumeControl = (e) => {
    if (e.target && audio) {
      const newVolume = e.target.volume * 100;

      handleMute(audio.muted);
      setAudioState((prev) => ({
        ...prev,
        currentVolume: newVolume
      }));
    }
  };

  const handleMute = (mute) => {
    if (audio) {
      audio.muted = mute;
      setAudioState((prev) => {
        return {
          ...prev,
          isMuted: mute
        };
      });
    }
  };

  const handleTime = (delta = 5) => {
    if (audio) {
      let newTime = audio.currentTime + delta;

      if (newTime >= audio.duration) {
        newTime = audio.duration;
      } else if (newTime <= 0) {
        newTime = 0;
      }

      audio.currentTime = newTime;
      setAudioState((prev) => {
        return {
          ...prev,
          currentTime: newTime
        };
      });
    }
  };

  const handleTimeControl = (e) => {
    setAudioState((prev) => {
      return {
        ...prev,
        currentTime: e.target.currentTime
      };
    });
  };

  useEffect(() => {
    return () => {
      pause();
    };
  }, []);

  useEffect(() => {
    if (audio) {
      audio.addEventListener('volumechange', handleVolumeControl);
      audio.addEventListener('play', handlePlayPauseControl);
      audio.addEventListener('pause', handlePlayPauseControl);
      audio.addEventListener('timeupdate', handleTimeControl);

      return () => {
        audio.removeEventListener('volumechange', handleVolumeControl);
        audio.addEventListener('play', handlePlayPauseControl);
        audio.addEventListener('pause', handlePlayPauseControl);
        audio.addEventListener('timeupdate', handleTimeControl);
      };
    }
  }, [audio]);

  return {
    ...audioState,
    play,
    pause,
    togglePause,
    increaseVolume: (increase = 5) => handleVolume(increase),
    decreaseVolume: (decrease = 5) => handleVolume(decrease * -1),
    mute: () => handleMute(true),
    unmute: () => handleMute(false),
    toggleMute: () => handleMute(!audio?.muted),
    forward: (increase = 5) => handleTime(increase),
    back: (decrease = 5) => handleTime(decrease * -1)
  };
};
