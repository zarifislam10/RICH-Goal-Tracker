"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Send, ArrowLeft } from "lucide-react"

type Principle = {
  id: string
  name: string
  color: string
  bgColor: string
  hoverColor: string
  description: string
  cloudImage: string
}

const principles: Principle[] = [
  {
    id: "i-matter",
    name: "I Matter",
    color: "text-blue-600",
    bgColor: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    description: "Setting goals that help me value myself and build confidence",
    cloudImage: "/i-matter-cloud.png",
  },
  {
    id: "responsibility",
    name: "Responsibility",
    color: "text-red-600",
    bgColor: "bg-red-500",
    hoverColor: "hover:bg-red-600",
    description: "Taking ownership of my actions and commitments",
    cloudImage: "/responsibility-cloud.png",
  },
  {
    id: "considerate",
    name: "Considerate",
    color: "text-yellow-600",
    bgColor: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-600",
    description: "Being thoughtful and kind in my interactions with others",
    cloudImage: "/considerate-cloud.png",
  },
  {
    id: "strategies",
    name: "Strategies",
    color: "text-green-600",
    bgColor: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    description: "Developing smart approaches to reach my goals",
    cloudImage: "/strategies-cloud.png",
  },
]

export default function GoalReflectionTracker() {
  const [selectedPrinciple, setSelectedPrinciple] = useState<Principle | null>(null)
  const [goalText, setGoalText] = useState("")
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handlePrincipleSelect = (principle: Principle) => {
    setSelectedPrinciple(principle)
    setGoalText("")
    setSuggestions([])
  }

  const handleBackToPrinciples = () => {
    setSelectedPrinciple(null)
    setGoalText("")
    setSuggestions([])
  }

  const generateSuggestions = async () => {
    if (!selectedPrinciple) return

    setIsLoadingSuggestions(true)

    // Simulate AI suggestions - in a real app, this would call Gemini API
    setTimeout(() => {
      const mockSuggestions = {
        "i-matter": [
          "I will practice positive self-talk every morning",
          "I will celebrate one small achievement each day",
          "I will ask for help when I need it without feeling bad",
        ],
        responsibility: [
          "I will complete my homework before recreational activities",
          "I will keep my commitments to friends and family",
          "I will take care of my belongings and space",
        ],
        considerate: [
          "I will listen actively when others are speaking",
          "I will offer help to classmates who are struggling",
          "I will think before I speak to avoid hurting feelings",
        ],
        strategies: [
          "I will break big tasks into smaller, manageable steps",
          "I will use a planner to organize my time effectively",
          "I will practice new skills for 15 minutes each day",
        ],
      }

      setSuggestions(mockSuggestions[selectedPrinciple.id as keyof typeof mockSuggestions] || [])
      setIsLoadingSuggestions(false)
    }, 1500)
  }

  const handleSubmitGoal = () => {
    if (!goalText.trim()) return

    // In a real app, this would save the goal to a database
    alert(`Goal submitted for ${selectedPrinciple?.name}!\n\n"${goalText}"`)

    // Reset form
    setGoalText("")
    setSuggestions([])
  }

  const useSuggestion = (suggestion: string) => {
    setGoalText(suggestion)
  }

  const renderSuggestions = () => {
    if (suggestions.length > 0) {
      return (
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-purple-800 mb-4">💡 Here are some ideas to inspire you:</h3>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border border-purple-200 cursor-pointer hover:bg-purple-50 transition-colors duration-200"
                onClick={() => setGoalText(suggestion)}
              >
                <p className="text-gray-700">{suggestion}</p>
                <p className="text-sm text-purple-600 mt-2">Click to use this suggestion</p>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  if (!selectedPrinciple) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Goal Reflection Tracker</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose a RICH principle to set a meaningful goal that will help you grow!
            </p>
          </div>

          {/* Principle Buttons */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {principles.map((principle) => (
              <Card
                key={principle.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-white/80 backdrop-blur-sm"
                onClick={() => handlePrincipleSelect(principle)}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-48 h-32 mx-auto mb-6 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={principle.cloudImage || "/placeholder.svg"}
                      alt={`${principle.name} cloud`}
                      className="w-48 h-32 object-cover drop-shadow-lg"
                    />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${principle.color}`}>{principle.name}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Fun decorative elements */}
          <div className="fixed top-20 left-10 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
          <div
            className="fixed top-40 right-20 w-6 h-6 bg-pink-400 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="fixed bottom-20 left-20 w-10 h-10 bg-blue-400 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="fixed bottom-40 right-10 w-7 h-7 bg-green-400 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={handleBackToPrinciples}
            variant="outline"
            className="bg-white text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Principles
          </Button>
          <div className={`px-6 py-3 rounded-full ${selectedPrinciple.bgColor} text-white font-bold text-lg shadow-lg`}>
            {selectedPrinciple.name}
          </div>
        </div>

        {/* Goal Setting Interface */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Set Your {selectedPrinciple.name} Goal
              </h2>

              <div className="space-y-6">
                {/* Goal Input */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    What goal would you like to set for {selectedPrinciple.name}?
                  </label>
                  <Textarea
                    value={goalText}
                    onChange={(e) => setGoalText(e.target.value)}
                    placeholder={`Write your ${selectedPrinciple.name.toLowerCase()} goal here...`}
                    className="min-h-32 text-lg p-4 border-2 border-gray-200 focus:border-purple-400 rounded-xl resize-none"
                  />
                </div>

                {/* AI Suggestions Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={generateSuggestions}
                    disabled={isLoadingSuggestions}
                    className={`${selectedPrinciple.bgColor} ${selectedPrinciple.hoverColor} text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105`}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {isLoadingSuggestions ? "Getting Ideas..." : "Get AI Suggestions"}
                  </Button>
                </div>

                {/* Suggestions */}
                {renderSuggestions()}

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleSubmitGoal}
                    disabled={!goalText.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 text-xl font-bold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Send className="w-6 h-6 mr-3" />
                    Submit My Goal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Decorative elements */}
        <div className="fixed top-20 left-10 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
        <div
          className="fixed top-40 right-20 w-6 h-6 bg-pink-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="fixed bottom-20 left-20 w-10 h-10 bg-blue-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="fixed bottom-40 right-10 w-7 h-7 bg-green-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>
    </div>
  )
}
