"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Radio, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  Waves
} from 'lucide-react';

const stations = [
  { id: '1', name: 'Lofi Beats', genre: 'Lo-Fi', url: 'https://streams.ilovemusic.de/iloveradio17.mp3' },
  { id: '2', name: 'Chillhop', genre: 'Chill', url: 'https://streams.fluxfm.de/Chillhop/mp3-128/streams.fluxfm.de/' },
  { id: '3', name: 'Deep Focus', genre: 'Ambient', url: 'https://ice1.somafm.com/deepspaceone-128-mp3' },
  { id: '4', name: 'Synthwave', genre: 'Retro', url: 'https://radio.plaza.one/mp3' },
];

export function CardRadio() {
  const [currentStation, setCurrentStation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(stations[currentStation].url);
    audioRef.current.volume = volume[0] / 100;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const changeStation = (direction) => {
    const wasPlaying = isPlaying;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    const newIndex = direction === 'next' 
      ? (currentStation + 1) % stations.length
      : (currentStation - 1 + stations.length) % stations.length;
    
    setCurrentStation(newIndex);
    audioRef.current = new Audio(stations[newIndex].url);
    audioRef.current.volume = isMuted ? 0 : volume[0] / 100;
    
    if (wasPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      setIsPlaying(false);
    }
  };

  const station = stations[currentStation];

  return (
    <div className="cyber-card p-6 relative overflow-hidden">
      {/* Animated background */}
      {isPlaying && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-pulse" />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 bg-primary/20 rounded-sm ${isPlaying ? 'animate-pulse-glow' : ''}`}>
            <Radio className="w-5 h-5 text-primary cyber-text-glow" />
          </div>
          <h2 className="text-lg font-semibold tracking-wider uppercase text-foreground">
            Rádio Focus
          </h2>
          {isPlaying && (
            <Waves className="w-4 h-4 text-secondary ml-auto animate-pulse" />
          )}
        </div>

        {/* Station info */}
        <div className="bg-muted/50 p-4 rounded-sm mb-6 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-muted-foreground uppercase">
              Estação {currentStation + 1}/{stations.length}
            </span>
            <span className="text-xs font-mono px-2 py-1 bg-secondary/20 text-secondary rounded-sm">
              {station.genre}
            </span>
          </div>
          <p className="text-xl font-bold text-foreground glitch-text">
            {station.name}
          </p>
          {isPlaying && (
            <div className="flex items-center gap-1 mt-2">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              <span className="text-xs font-mono text-secondary">AO VIVO</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeStation('prev')}
            className="h-10 w-10 text-foreground hover:text-primary hover:bg-primary/20"
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={togglePlay}
            size="icon"
            className={`h-14 w-14 rounded-full transition-all duration-300 ${
              isPlaying 
                ? 'bg-secondary hover:bg-secondary/90 cyber-glow-cyan' 
                : 'bg-primary hover:bg-primary/90 cyber-glow-pink'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-secondary-foreground" />
            ) : (
              <Play className="w-6 h-6 text-primary-foreground ml-1" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeStation('next')}
            className="h-10 w-10 text-foreground hover:text-primary hover:bg-primary/20"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-xs font-mono text-muted-foreground w-8 text-right">
            {volume[0]}%
          </span>
        </div>
      </div>
    </div>
  );
}
