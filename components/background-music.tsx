'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function BackgroundMusicComponent({ onToggle }: { onToggle: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    audioRef.current = new Audio('./sound.mp3')
    audioRef.current.loop = true

    const playPromise = audioRef.current.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaying(true)
        })
        .catch((error) => {
          console.log("Autoplay prevented:", error)
          setPlaying(false)
        })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [playing])

  const togglePlaying = () => {
    setPlaying(!playing)
    onToggle() // Call the onToggle function to show the message
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed bottom-4 right-4 bg-white/10 hover:bg-white/20 text-white z-50"
      onClick={togglePlaying}
      aria-label={playing ? "Mute background music" : "Unmute background music"}
    >
      {playing ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
    </Button>
  )
}

export default BackgroundMusicComponent;
