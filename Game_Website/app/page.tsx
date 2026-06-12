"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, RotateCcw, Play, Pause, Star } from "lucide-react"

interface GameCard {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

type Difficulty = "easy" | "medium" | "hard"

const EMOJIS = [
  "🎮",
  "🎯",
  "🎲",
  "🎪",
  "🎨",
  "🎭",
  "🎪",
  "🎸",
  "🎺",
  "🎻",
  "🎹",
  "🎤",
  "🎧",
  "🎬",
  "🎭",
  "🎨",
  "🎯",
  "🎮",
]

const DIFFICULTY_CONFIG = {
  easy: { pairs: 6, gridCols: "grid-cols-3", time: 60 },
  medium: { pairs: 8, gridCols: "grid-cols-4", time: 90 },
  hard: { pairs: 12, gridCols: "grid-cols-4", time: 120 },
}

export default function MemoryGame() {
  const [cards, setCards] = useState<GameCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameState, setGameState] = useState<"setup" | "playing" | "paused" | "won" | "lost">("setup")
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState<Record<Difficulty, number>>({
    easy: 0,
    medium: 0,
    hard: 0,
  })

  // Load best scores from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("memoryGameBestScores")
    if (saved) {
      setBestScore(JSON.parse(saved))
    }
  }, [])

  // Save best scores to localStorage
  useEffect(() => {
    localStorage.setItem("memoryGameBestScores", JSON.stringify(bestScore))
  }, [bestScore])

  // Initialize game
  const initializeGame = useCallback(() => {
    const config = DIFFICULTY_CONFIG[difficulty]
    const selectedEmojis = EMOJIS.slice(0, config.pairs)
    const gameEmojis = [...selectedEmojis, ...selectedEmojis]

    // Shuffle cards
    const shuffledCards = gameEmojis
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5)

    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setTimeLeft(config.time)
    setScore(0)
    setGameState("setup")
  }, [difficulty])

  // Start game
  const startGame = () => {
    setGameState("playing")
  }

  // Pause/Resume game
  const togglePause = () => {
    setGameState(gameState === "playing" ? "paused" : "playing")
  }

  // Reset game
  const resetGame = () => {
    initializeGame()
  }

  // Timer effect
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("lost")
    }
  }, [gameState, timeLeft])

  // Handle card click
  const handleCardClick = (cardId: number) => {
    if (gameState !== "playing" || flippedCards.length >= 2) return

    const card = cards.find((c) => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched) return

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    // Flip the card
    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)))

    // Check for match when 2 cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)

      const [firstId, secondId] = newFlippedCards
      const firstCard = cards.find((c) => c.id === firstId)
      const secondCard = cards.find((c) => c.id === secondId)

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c)))
          setMatchedPairs((prev) => prev + 1)
          setFlippedCards([])

          // Calculate score bonus for quick matches
          const timeBonus = Math.max(0, timeLeft - DIFFICULTY_CONFIG[difficulty].time + 60)
          const moveBonus = Math.max(0, 100 - moves * 2)
          setScore((prev) => prev + 100 + timeBonus + moveBonus)
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c)))
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  // Check win condition
  useEffect(() => {
    if (matchedPairs === DIFFICULTY_CONFIG[difficulty].pairs && gameState === "playing") {
      setGameState("won")

      // Update best score
      if (score > bestScore[difficulty]) {
        setBestScore((prev) => ({
          ...prev,
          [difficulty]: score,
        }))
      }
    }
  }, [matchedPairs, difficulty, gameState, score, bestScore])

  // Initialize game on difficulty change
  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getScoreStars = () => {
    if (score >= 800) return 3
    if (score >= 600) return 2
    if (score >= 400) return 1
    return 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">🧠 Memory Game</h1>
          <p className="text-white/80 text-lg">Match all the pairs to win!</p>
        </div>

        {/* Game Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">Difficulty:</span>
                <Select
                  value={difficulty}
                  onValueChange={(value: Difficulty) => setDifficulty(value)}
                  disabled={gameState === "playing"}
                >
                  <SelectTrigger className="w-32 bg-white/20 border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {gameState === "setup" && (
                <Button onClick={startGame} className="bg-green-500 hover:bg-green-600">
                  <Play className="w-4 h-4 mr-2" />
                  Start Game
                </Button>
              )}

              {(gameState === "playing" || gameState === "paused") && (
                <Button
                  onClick={togglePause}
                  variant="outline"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  {gameState === "playing" ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {gameState === "playing" ? "Pause" : "Resume"}
                </Button>
              )}

              <Button
                onClick={resetGame}
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white text-lg px-3 py-1">
                Time: {formatTime(timeLeft)}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white text-lg px-3 py-1">
                Moves: {moves}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white text-lg px-3 py-1">
                Score: {score}
              </Badge>
            </div>
          </div>

          {bestScore[difficulty] > 0 && (
            <div className="mt-4 text-center">
              <Badge variant="outline" className="bg-yellow-500/20 border-yellow-500/50 text-yellow-100">
                <Trophy className="w-4 h-4 mr-1" />
                Best Score ({difficulty}): {bestScore[difficulty]}
              </Badge>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
          {gameState === "setup" && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎮</div>
              <h2 className="text-2xl font-bold text-white mb-2">Ready to Play?</h2>
              <p className="text-white/80 mb-6">Click "Start Game" to begin your memory challenge!</p>
            </div>
          )}

          {gameState === "paused" && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⏸️</div>
              <h2 className="text-2xl font-bold text-white mb-2">Game Paused</h2>
              <p className="text-white/80">Click "Resume" to continue playing</p>
            </div>
          )}

          {(gameState === "playing" || (gameState !== "setup" && gameState !== "paused")) && (
            <div className={`grid ${DIFFICULTY_CONFIG[difficulty].gridCols} gap-4 max-w-2xl mx-auto`}>
              {cards.map((card) => (
                <Card
                  key={card.id}
                  className={`aspect-square cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    card.isFlipped || card.isMatched
                      ? "bg-white shadow-lg"
                      : "bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500"
                  } ${card.isMatched ? "ring-4 ring-green-400" : ""}`}
                  onClick={() => handleCardClick(card.id)}
                >
                  <CardContent className="flex items-center justify-center h-full p-0">
                    {card.isFlipped || card.isMatched ? (
                      <span className="text-4xl md:text-5xl">{card.emoji}</span>
                    ) : (
                      <span className="text-4xl md:text-5xl text-white/50">?</span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Win Screen */}
          {gameState === "won" && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-4">Congratulations!</h2>
              <div className="flex justify-center mb-4">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${i < getScoreStars() ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                  />
                ))}
              </div>
              <div className="space-y-2 text-white/90 mb-6">
                <p className="text-xl">
                  Final Score: <span className="font-bold text-yellow-300">{score}</span>
                </p>
                <p>Completed in {moves} moves</p>
                <p>Time remaining: {formatTime(timeLeft)}</p>
              </div>
              <Button onClick={resetGame} className="bg-green-500 hover:bg-green-600 text-lg px-8 py-3">
                Play Again
              </Button>
            </div>
          )}

          {/* Lose Screen */}
          {gameState === "lost" && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⏰</div>
              <h2 className="text-3xl font-bold text-white mb-4">Time's Up!</h2>
              <div className="space-y-2 text-white/90 mb-6">
                <p className="text-xl">
                  You matched {matchedPairs} out of {DIFFICULTY_CONFIG[difficulty].pairs} pairs
                </p>
                <p>
                  Final Score: <span className="font-bold text-yellow-300">{score}</span>
                </p>
              </div>
              <Button onClick={resetGame} className="bg-blue-500 hover:bg-blue-600 text-lg px-8 py-3">
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mt-6">
          <h3 className="text-xl font-bold text-white mb-3">How to Play:</h3>
          <ul className="text-white/80 space-y-2">
            <li>• Click on cards to flip them and reveal the emoji</li>
            <li>• Match two cards with the same emoji to keep them flipped</li>
            <li>• Match all pairs before time runs out to win</li>
            <li>• Higher scores are awarded for fewer moves and faster completion</li>
            <li>• Choose different difficulty levels for more challenge</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
