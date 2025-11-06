"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Heart, Shield, Users, MessageCircle, CheckCircle, ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChatBot } from "@/components/chatbot"
import { useToast } from "@/hooks/use-toast"
import confetti from "canvas-confetti"

const questions = [
  {
    id: 1,
    question: "Little interest or pleasure in doing things",
    type: "depression",
  },
  {
    id: 2,
    question: "Feeling down, depressed, or hopeless",
    type: "depression",
  },
  {
    id: 3,
    question: "Trouble falling or staying asleep, or sleeping too much",
    type: "both",
  },
  {
    id: 4,
    question: "Feeling tired or having little energy",
    type: "depression",
  },
  {
    id: 5,
    question: "Poor appetite or overeating",
    type: "depression",
  },
  {
    id: 6,
    question: "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
    type: "depression",
  },
  {
    id: 7,
    question: "Trouble concentrating on things, such as reading the newspaper or watching television",
    type: "both",
  },
  {
    id: 8,
    question: "Moving or speaking so slowly that other people could have noticed",
    type: "depression",
  },
  {
    id: 9,
    question: "Thoughts that you would be better off dead, or of hurting yourself",
    type: "depression",
  },
]

const options = [
  { value: 0, label: "NOT AT ALL", score: 0 },
  { value: 1, label: "SEVERAL DAYS", score: 1 },
  { value: 2, label: "MORE THAN HALF THE DAYS", score: 2 },
  { value: 3, label: "NEARLY EVERY DAY", score: 3 },
]

export default function HomePage() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showAssessment, setShowAssessment] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleStartAssessment = () => {
    setShowWelcome(true)
  }

  const handleBeginAssessment = () => {
    setShowWelcome(false)
    setShowAssessment(true)
  }

  const handleAnswer = (questionId: number, score: number) => {
    console.log(`Question ${questionId} answered with score: ${score}`)
    setAnswers((prev) => ({ ...prev, [questionId]: score }))
  }

  const handleSubmit = async () => {
    console.log("Submit button clicked")
    console.log("Current answers:", answers)

    setIsSubmitting(true)

    try {
      // Check if all questions are answered
      const unansweredQuestions = questions.filter((q) => !(q.id in answers))
      console.log("Unanswered questions:", unansweredQuestions)

      if (unansweredQuestions.length > 0) {
        toast({
          title: "Incomplete Assessment",
          description: `Please answer all questions. ${unansweredQuestions.length} question(s) remaining.`,
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Calculate scores
      const depressionScore = questions
        .filter((q) => q.type === "depression" || q.type === "both")
        .reduce((sum, q) => sum + (answers[q.id] || 0), 0)

      const anxietyScore = questions
        .filter((q) => q.type === "anxiety" || q.type === "both")
        .reduce((sum, q) => sum + (answers[q.id] || 0), 0)

      console.log("Depression Score:", depressionScore)
      console.log("Anxiety Score:", anxietyScore)

      // Save results to localStorage
      const results = {
        depression: depressionScore,
        anxiety: anxietyScore,
        answers: answers,
        timestamp: new Date().toISOString(),
      }

      localStorage.setItem("assessmentResults", JSON.stringify(results))
      console.log("Results saved to localStorage:", results)

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      // Show completion modal
      setShowCompletion(true)

      // Navigate to results after showing completion modal
      setTimeout(() => {
        router.push("/results")
      }, 3000)
    } catch (error) {
      console.error("Error submitting assessment:", error)
      toast({
        title: "Submission Error",
        description: "There was an error submitting your assessment. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const getAnsweredCount = () => {
    return Object.keys(answers).length
  }

  if (!showAssessment) {
    return (
      <>
        {/* Welcome Modal */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border"
              >
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center"
                  >
                    <Brain className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    Welcome to Your Mental Health Assessment
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    This assessment will help us understand how you've been feeling lately. Your responses are
                    completely confidential and will help us provide personalized recommendations.
                  </p>
                  <Button
                    onClick={handleBeginAssessment}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Begin Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Welcome to <span className="text-blue-600 dark:text-blue-400">BrightMind</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Your journey to better mental health starts here. Get personalized insights, resources, and support for
                depression and anxiety.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-lg px-8 py-4" onClick={handleStartAssessment}>
                  Start Your Assessment
                </Button>
              </motion.div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Smart Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Evidence-based questionnaire to assess your mental health
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <CardTitle>Personalized Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tailored recommendations based on your unique needs
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <CardTitle>Safe & Secure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your privacy and data security are our top priorities
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <CardTitle>Community Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Connect with others and access professional resources
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </section>

          {/* Disclaimer */}
          <section className="bg-yellow-50 dark:bg-yellow-900/20 py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important Notice</h3>
                <p className="text-yellow-700 dark:text-yellow-300">
                  This assessment is for informational purposes only and does not replace professional medical advice.
                  If you're experiencing severe symptoms or having thoughts of self-harm, please contact a mental health
                  professional or crisis helpline immediately.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Floating Chat Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
        </motion.div>

        <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border"
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Assessment Complete!</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Thank you for completing the assessment. We're preparing your personalized results...
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Analyzing your responses</span>
                  <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-8">Depression Test</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              {/* Step 1 - Active */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="mt-2 text-center">
                  <div className="font-semibold text-blue-600">Test</div>
                  <div className="text-sm text-blue-600">Questions</div>
                </div>
              </div>

              {/* Connector */}
              <div className="w-24 h-0.5 bg-gray-300 mx-4"></div>

              {/* Step 2 - Inactive */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-2 border-gray-300 rounded-full"></div>
                <div className="mt-2 text-center">
                  <div className="font-semibold text-gray-500">Optional</div>
                  <div className="text-sm text-gray-500">Questions</div>
                </div>
              </div>

              {/* Connector */}
              <div className="w-24 h-0.5 bg-gray-300 mx-4"></div>

              {/* Step 3 - Inactive */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-2 border-gray-300 rounded-full"></div>
                <div className="mt-2 text-center">
                  <div className="font-semibold text-gray-500">Your</div>
                  <div className="text-sm text-gray-500">Results</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Assessment Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-8">
              <div className="mb-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  <span className="font-semibold">Over the last 2 weeks,</span> how often have you been bothered by any
                  of the following problems?
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Please note, all fields are required. ({getAnsweredCount()}/{questions.length} completed)
                </p>
              </div>

              <div className="space-y-8">
                {questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {question.id}. {question.question}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {options.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleAnswer(question.id, option.score)}
                          className={`flex items-center justify-center px-4 py-3 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 border-2 ${
                            answers[question.id] === option.score
                              ? "bg-blue-600 text-white border-blue-600"
                              : "text-gray-700 bg-gray-100 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="mt-12 text-center"
              >
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || getAnsweredCount() < questions.length}
                  size="lg"
                  className="px-12 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Assessment"}
                </Button>

                {getAnsweredCount() < questions.length && (
                  <p className="text-sm text-gray-500 mt-2">Please answer all {questions.length} questions to submit</p>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
