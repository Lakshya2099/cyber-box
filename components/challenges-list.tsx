"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, AlertTriangle, Search, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { useCTF, type Challenge } from "@/context/ctf-context"

interface ChallengesListProps {
  competitionId: string
}

export function ChallengesList({ competitionId }: ChallengesListProps) {
  const { competitions, solveChallenge, getUserSolvedChallenges } = useCTF()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"points" | "difficulty">("points")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [flagInput, setFlagInput] = useState("")
  const [flagError, setFlagError] = useState(false)
  const [flagSuccess, setFlagSuccess] = useState(false)

  const competition = competitions[competitionId]
  const userSolvedChallenges = getUserSolvedChallenges(competitionId)

  if (!competition) {
    return (
      <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
        <CardContent className="p-8 text-center">
          <p className="text-gray-400">Competition not found.</p>
        </CardContent>
      </Card>
    )
  }

  // Get unique categories
  const categories = Array.from(new Set(competition.challenges.map((c: Challenge) => c.category)))

  // Filter and sort challenges
  let filteredChallenges = [...competition.challenges]

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredChallenges = filteredChallenges.filter(
      (c) => c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query),
    )
  }

  // Apply category filter
  if (categoryFilter) {
    filteredChallenges = filteredChallenges.filter((c) => c.category === categoryFilter)
  }

  // Apply difficulty filter
  if (difficultyFilter) {
    filteredChallenges = filteredChallenges.filter((c) => c.difficulty === difficultyFilter)
  }

  // Sort challenges
  filteredChallenges.sort((a, b) => {
    if (sortBy === "points") {
      return sortOrder === "asc" ? a.points - b.points : b.points - a.points
    } else {
      // Sort by difficulty
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 }
      return sortOrder === "asc"
        ? difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        : difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]
    }
  })

  const handleSortToggle = (sortType: "points" | "difficulty") => {
    if (sortBy === sortType) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(sortType)
      setSortOrder("desc")
    }
  }

  const openChallengeDialog = (challenge: Challenge) => {
    setSelectedChallenge(challenge)
    setFlagInput("")
    setFlagError(false)
    setFlagSuccess(false)
  }

  const handleFlagSubmit = () => {
    if (!selectedChallenge) return

    // In a real app, you would validate the flag against the server
    // For this demo, we'll just check if the flag is not empty
    if (flagInput.trim() === "") {
      setFlagError(true)
      return
    }

    // Mark the challenge as solved
    solveChallenge(competitionId, selectedChallenge.id)
    setFlagSuccess(true)
    setFlagError(false)

    // Close the dialog after a delay
    setTimeout(() => {
      setSelectedChallenge(null)
    }, 2000)
  }

  const difficultyColor = {
    easy: "bg-green-500 text-green-50 border-green-600",
    medium: "bg-amber-500 text-amber-50 border-amber-600",
    hard: "bg-red-500 text-red-50 border-red-600",
  }

  const difficultyLabel = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900/40 border-gray-800/50"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-gray-900/40 border-gray-800/50"
                onClick={() => setCategoryFilter(null)}
              >
                <Filter className="h-4 w-4" />
                {categoryFilter || "All Categories"}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>

              {categories.length > 0 && (
                <div className="absolute top-full right-0 mt-1 w-48 rounded-md bg-gray-900 border border-gray-800 shadow-lg z-10">
                  <div className="py-1">
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800"
                      onClick={() => setCategoryFilter(null)}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800"
                        onClick={() => setCategoryFilter(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-gray-900/40 border-gray-800/50"
                onClick={() => setDifficultyFilter(null)}
              >
                <Filter className="h-4 w-4" />
                {difficultyFilter
                  ? difficultyLabel[difficultyFilter as keyof typeof difficultyLabel]
                  : "All Difficulties"}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>

              <div className="absolute top-full right-0 mt-1 w-48 rounded-md bg-gray-900 border border-gray-800 shadow-lg z-10">
                <div className="py-1">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800"
                    onClick={() => setDifficultyFilter(null)}
                  >
                    All Difficulties
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800"
                    onClick={() => setDifficultyFilter("easy")}
                  >
                    Easy
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800"
                    onClick={() => setDifficultyFilter("medium")}
                  >
                    Medium
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800"
                    onClick={() => setDifficultyFilter("hard")}
                  >
                    Hard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900/60 rounded-md border border-gray-800/50">
            <div className="flex-1 font-medium text-gray-300">Challenge</div>
            <div
              className="w-24 text-center font-medium text-gray-300 cursor-pointer flex items-center justify-center"
              onClick={() => handleSortToggle("difficulty")}
            >
              Difficulty
              {sortBy === "difficulty" &&
                (sortOrder === "asc" ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                ))}
            </div>
            <div
              className="w-24 text-center font-medium text-gray-300 cursor-pointer flex items-center justify-center"
              onClick={() => handleSortToggle("points")}
            >
              Points
              {sortBy === "points" &&
                (sortOrder === "asc" ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                ))}
            </div>
            <div className="w-24 text-center font-medium text-gray-300">Status</div>
          </div>

          {filteredChallenges.length > 0 ? (
            filteredChallenges.map((challenge) => {
              const isSolved = userSolvedChallenges.includes(challenge.id) || challenge.solved

              return (
                <div
                  key={challenge.id}
                  className={`flex items-center justify-between px-4 py-3 rounded-md border transition-colors cursor-pointer ${
                    isSolved
                      ? "bg-green-900/10 border-green-500/30 hover:bg-green-900/20"
                      : "bg-gray-900/40 border-gray-800/50 hover:bg-gray-900/60"
                  }`}
                  onClick={() => openChallengeDialog(challenge)}
                >
                  <div className="flex-1">
                    <div className="font-medium text-white">{challenge.title}</div>
                    <div className="text-sm text-gray-400">{challenge.category}</div>
                  </div>
                  <div className="w-24 text-center">
                    <Badge className={`${difficultyColor[challenge.difficulty]}`}>
                      {difficultyLabel[challenge.difficulty]}
                    </Badge>
                  </div>
                  <div className="w-24 text-center font-medium text-amber-400">{challenge.points}</div>
                  <div className="w-24 text-center">
                    {isSolved ? (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Solved
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-gray-700 text-gray-400">
                        Unsolved
                      </Badge>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No challenges match your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Challenge Dialog */}
      <Dialog open={!!selectedChallenge} onOpenChange={() => setSelectedChallenge(null)}>
        <DialogContent className="sm:max-w-[550px] bg-gray-900/95 text-white border-gray-800/80 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-orange-900/5 to-gray-900/10 rounded-lg"></div>

          <DialogHeader className="relative">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={`${selectedChallenge ? difficultyColor[selectedChallenge.difficulty] : ""}`}>
                {selectedChallenge?.difficulty ? difficultyLabel[selectedChallenge.difficulty] : ""}
              </Badge>
              <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700">
                {selectedChallenge?.category}
              </Badge>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                {selectedChallenge?.points} pts
              </Badge>
            </div>
            <DialogTitle className="text-xl">{selectedChallenge?.title}</DialogTitle>
            <DialogDescription className="text-gray-400">{selectedChallenge?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 relative">
            {selectedChallenge?.hint && (
              <div className="flex items-start gap-2 p-3 rounded-md border border-amber-500/20 bg-amber-500/5 text-amber-400">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Hint</p>
                  <p className="text-sm">{selectedChallenge.hint}</p>
                </div>
              </div>
            )}

            {userSolvedChallenges.includes(selectedChallenge?.id || "") || selectedChallenge?.solved ? (
              <div className="flex items-center justify-center p-4 rounded-md border border-green-500/30 bg-green-500/10">
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Challenge Solved!</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label htmlFor="flag" className="block text-sm font-medium text-gray-300">
                  Submit Flag
                </label>
                <div className="flex gap-2">
                  <Input
                    id="flag"
                    placeholder="flag{...}"
                    value={flagInput}
                    onChange={(e) => {
                      setFlagInput(e.target.value)
                      setFlagError(false)
                    }}
                    className={`bg-gray-800/70 border-gray-700/50 ${flagError ? "border-red-500" : ""}`}
                  />
                  <Button
                    onClick={handleFlagSubmit}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500"
                  >
                    Submit
                  </Button>
                </div>
                {flagError && <p className="text-sm text-red-400">Please enter a valid flag.</p>}
                {flagSuccess && <p className="text-sm text-green-400">Correct flag! Challenge solved.</p>}
              </div>
            )}
          </div>

          <DialogFooter className="relative">
            <Button
              variant="outline"
              onClick={() => setSelectedChallenge(null)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

