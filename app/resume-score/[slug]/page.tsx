"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Layout from "@/components/resume-builder/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Download,
  FileText,
  Zap,
  Award,
  Lightbulb,
  BarChart3,
} from "lucide-react"

export default function ResumeScorePage() {
  const params = useParams()
  const resumeSlug = params.slug as string
  const resumeName = resumeSlug.replace(/-/g, " ")

  // State for score data
  const [scoreData, setScoreData] = useState({
    overallScore: 78,
    sections: {
      format: { score: 90, feedback: "Good formatting with consistent spacing and margins" },
      content: { score: 75, feedback: "Content is relevant but could use more quantifiable achievements" },
      impact: { score: 65, feedback: "Action verbs are used, but impact could be stronger" },
      keywords: { score: 85, feedback: "Good use of industry keywords and skills" },
      grammar: { score: 95, feedback: "Excellent grammar and spelling throughout" },
    },
    improvements: [
      {
        id: 1,
        category: "content",
        severity: "medium",
        issue: "Lack of quantifiable achievements",
        suggestion:
          "Add metrics and specific results to your achievements (e.g., 'Increased sales by 20%' instead of 'Increased sales')",
      },
      {
        id: 2,
        category: "impact",
        severity: "high",
        issue: "Weak action verbs",
        suggestion:
          "Replace generic verbs like 'managed' or 'worked on' with stronger alternatives like 'spearheaded' or 'orchestrated'",
      },
      {
        id: 3,
        category: "keywords",
        severity: "low",
        issue: "Missing some job-specific keywords",
        suggestion: "Add more keywords from the job description, especially technical skills and industry terminology",
      },
    ],
    ats: {
      compatibility: 82,
      feedback:
        "Your resume is mostly ATS-friendly, but some improvements could help it pass more automated screenings",
    },
    industry: "Technology",
    jobTitle: "Product Manager",
  })

  // Simulate loading state
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get score data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 dark:text-green-400"
    if (score >= 70) return "text-amber-600 dark:text-amber-400"
    return "text-red-600 dark:text-red-400"
  }

  // Function to get progress color based on score
  const getProgressColor = (score: number) => {
    if (score >= 85) return "bg-green-600 dark:bg-green-400"
    if (score >= 70) return "bg-amber-600 dark:bg-amber-400"
    return "bg-red-600 dark:bg-red-400"
  }

  // Function to get severity badge
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
          >
            High Priority
          </Badge>
        )
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800"
          >
            Medium Priority
          </Badge>
        )
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
          >
            Low Priority
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Resume Score</h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Detailed analysis and feedback for <span className="font-medium">{resumeName}</span>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-8 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-t-purple-600 border-zinc-200 dark:border-zinc-800 animate-spin mb-4"></div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Analyzing Your Resume</h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-center max-w-md">
                  We're checking your resume against industry standards, ATS compatibility, and best practices...
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overall Score Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative w-40 h-40 flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                          {scoreData.overallScore}
                        </div>
                      </div>
                      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * scoreData.overallScore) / 100}
                          className={getScoreColor(scoreData.overallScore)}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Your Resume Score</h2>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                        Your resume is{" "}
                        <span className={getScoreColor(scoreData.overallScore)}>
                          {scoreData.overallScore >= 85
                            ? "excellent"
                            : scoreData.overallScore >= 70
                              ? "good"
                              : "needs improvement"}
                        </span>
                        . Here's how it compares to industry standards for {scoreData.jobTitle} roles.
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-600 dark:text-zinc-400">Format & Structure</span>
                          <span className={getScoreColor(scoreData.sections.format.score)}>
                            {scoreData.sections.format.score}%
                          </span>
                        </div>
                        <Progress value={scoreData.sections.format.score} className="h-2 bg-zinc-200 dark:bg-zinc-800">
                          <div
                            className={`h-full ${getProgressColor(scoreData.sections.format.score)}`}
                            style={{ width: `${scoreData.sections.format.score}%` }}
                          />
                        </Progress>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-600 dark:text-zinc-400">Content Quality</span>
                          <span className={getScoreColor(scoreData.sections.content.score)}>
                            {scoreData.sections.content.score}%
                          </span>
                        </div>
                        <Progress value={scoreData.sections.content.score} className="h-2 bg-zinc-200 dark:bg-zinc-800">
                          <div
                            className={`h-full ${getProgressColor(scoreData.sections.content.score)}`}
                            style={{ width: `${scoreData.sections.content.score}%` }}
                          />
                        </Progress>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-600 dark:text-zinc-400">Impact & Achievement</span>
                          <span className={getScoreColor(scoreData.sections.impact.score)}>
                            {scoreData.sections.impact.score}%
                          </span>
                        </div>
                        <Progress value={scoreData.sections.impact.score} className="h-2 bg-zinc-200 dark:bg-zinc-800">
                          <div
                            className={`h-full ${getProgressColor(scoreData.sections.impact.score)}`}
                            style={{ width: `${scoreData.sections.impact.score}%` }}
                          />
                        </Progress>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    ATS Compatibility
                  </CardTitle>
                  <CardDescription>How well your resume performs with Applicant Tracking Systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-4">
                      <div className="w-full h-full rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                          {scoreData.ats.compatibility}%
                        </div>
                      </div>
                      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * scoreData.ats.compatibility) / 100}
                          className={getScoreColor(scoreData.ats.compatibility)}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">{scoreData.ats.feedback}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analysis Tabs */}
            <Tabs defaultValue="improvements">
              <TabsList className="mb-4">
                <TabsTrigger value="improvements">Improvements</TabsTrigger>
                <TabsTrigger value="strengths">Strengths</TabsTrigger>
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
              </TabsList>

              <TabsContent value="improvements">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      Suggested Improvements
                    </CardTitle>
                    <CardDescription>
                      Address these issues to improve your resume score and increase your chances of getting interviews
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {scoreData.improvements.map((improvement) => (
                        <div
                          key={improvement.id}
                          className="border-b border-zinc-200 dark:border-zinc-800 pb-6 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">{improvement.issue}</h3>
                            {getSeverityBadge(improvement.severity)}
                          </div>
                          <p className="text-zinc-600 dark:text-zinc-400 mb-4">{improvement.suggestion}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800">
                              {improvement.category.charAt(0).toUpperCase() + improvement.category.slice(1)}
                            </Badge>
                            <Button
                              variant="link"
                              size="sm"
                              className="text-purple-600 dark:text-purple-400 p-0 h-auto"
                            >
                              Learn more
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="strengths">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      Resume Strengths
                    </CardTitle>
                    <CardDescription>
                      Areas where your resume performs well compared to industry standards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-100 dark:border-green-900">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">Excellent Formatting</h3>
                          <p className="text-zinc-600 dark:text-zinc-400">{scoreData.sections.format.feedback}</p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-100 dark:border-green-900">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">
                            Strong Grammar & Spelling
                          </h3>
                          <p className="text-zinc-600 dark:text-zinc-400">{scoreData.sections.grammar.feedback}</p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-100 dark:border-green-900">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">Good Keyword Usage</h3>
                          <p className="text-zinc-600 dark:text-zinc-400">{scoreData.sections.keywords.feedback}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="keywords">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      Keyword Analysis
                    </CardTitle>
                    <CardDescription>
                      How well your resume matches keywords for {scoreData.jobTitle} roles in {scoreData.industry}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-4">Present Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200">
                            Product Management
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200">
                            Agile
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200">
                            Scrum
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200">
                            User Research
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200">
                            Roadmap
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200">
                            Stakeholder Management
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200">
                            KPIs
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200">
                            A/B Testing
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-4">Missing Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200">
                            Product Strategy
                          </Badge>
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200">
                            OKRs
                          </Badge>
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200">
                            Customer Journey
                          </Badge>
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200">
                            Product Analytics
                          </Badge>
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200">
                            Go-to-Market
                          </Badge>
                        </div>
                      </div>

                      <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">Keyword Tip</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                              Including industry-specific keywords can increase your resume's visibility in ATS
                              searches. Consider adding the missing keywords where relevant in your experience section.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button variant="outline" className="sm:w-auto" onClick={() => window.history.back()}>
                Back to Resume
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white sm:w-auto">
                <Zap className="h-4 w-4 mr-2" />
                Improve with AI
              </Button>
              <Button variant="outline" className="sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

