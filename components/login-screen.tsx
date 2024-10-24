'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Github } from 'lucide-react'
import BackgroundMusic from './background-music'

export function LoginScreenComponent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showAutoplayMessage, setShowAutoplayMessage] = useState(false)

  const hideMessage = () => {
    setShowAutoplayMessage(false)
  }

  useEffect(() => {
    // Check if autoplay is supported
    const audio = new Audio()
    audio.play().then(() => {
      audio.pause()
    }).catch(() => {
      setShowAutoplayMessage(true)
      const timer = setTimeout(() => {
        setShowAutoplayMessage(false)
      }, 10000)
      return () => clearTimeout(timer)
    })
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
    console.log('Login attempted with:', username, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 relative overflow-hidden">
      {/* Dreamlike floating elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </motion.div>

      {/* Login form */}
      <Card className="w-96 backdrop-blur-md bg-white/10 text-white border-none shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">DreamShare</CardTitle>
          <CardDescription className="text-center text-gray-300">Enter the realm of dreams</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-200">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-400" />
            </div>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 border-white/30">
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 border-white/30">
              <Github className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardFooter>
      </Card>

      <BackgroundMusic onToggle={hideMessage} />

      <AnimatePresence>
        {showAutoplayMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 transform bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm"
          >
            Click the sound icon to experience the full dreamscape
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
