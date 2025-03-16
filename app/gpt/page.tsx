"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Layout from "@/components/resume-builder/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Zap, Send, FileText, Download, Copy, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types for our chat and resume data
type MessageType = {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type ResumeData = {
  name: string
  title: string
  contact: {
    email: string
    phone: string
    location: string
  }
  summary: string
  experience: Array<{
    title: string
    company: string
    location: string
    period: string
    bullets: string[]
  }>
  education?: Array<{
    degree: string
    institution: string
    location: string
    period: string
  }>
  skills?: string[]
}

// Sample resume data
const initialResumeData: ResumeData = {
  name: "Marcio Jocker",
  title: "Senior Product Manager",
  contact: {
    email: "marcio@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  },
  summary:
    "Innovative Product Manager with 8+ years of experience driving product strategy and execution. Proven track record of launching successful products that increase revenue and user engagement. Skilled in agile methodologies, user research, and cross-functional team leadership.",
  experience: [
    {
      title: "Senior Product Manager",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      period: "Jan 2020 - Present",
      bullets: [
        "Led product strategy and roadmap for flagship SaaS platform",
        "Increased user retention by 35% through data-driven UX improvements",
        "Managed cross-functional team of designers, engineers, and QA specialists",
      ],
    },
  ],
  skills: ["Product Strategy", "Agile Methodologies", "User Research", "Data Analysis", "Cross-functional Leadership"],
}

// Sample initial messages
const initialMessages: MessageType[] = [
  {
    role: "assistant",
    content: "Hello! I'm your AI resume assistant. How can I help you improve your resume today?",
    timestamp: new Date(),
  },
]

export default function GPTPage() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<MessageType[]>(initialMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [newResumeOpen, setNewResumeOpen] = useState(false)
  const [newResumeData, setNewResumeData] = useState({
    name: "",
    title: "",
    experience: "",
    skills: "",
    education: "",
    jobTarget: "",
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    // Add user message to chat
    const userMessage: MessageType = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      let responseContent = ""

      // Simple response logic based on user input
      if (inputMessage.toLowerCase().includes("summary")) {
        responseContent =
          "I'd be happy to help improve your professional summary! Here's a suggestion:\n\n\"Results-driven Product Manager with 8+ years of experience transforming business requirements into successful digital products. Increased revenue by $2.5M and improved user retention by 35% through strategic product enhancements. Expert in agile methodologies, user research, and leading cross-functional teams to deliver exceptional products.\""

        // Update resume data
        setResumeData((prev) => ({
          ...prev,
          summary:
            "Results-driven Product Manager with 8+ years of experience transforming business requirements into successful digital products. Increased revenue by $2.5M and improved user retention by 35% through strategic product enhancements. Expert in agile methodologies, user research, and leading cross-functional teams to deliver exceptional products.",
        }))
      } else if (inputMessage.toLowerCase().includes("experience") || inputMessage.toLowerCase().includes("work")) {
        responseContent =
          "Let's enhance your work experience section. Try adding more quantifiable achievements. Here's an improved version of your first role:\n\n\"Senior Product Manager at TechCorp Inc.\n• Spearheaded product strategy that increased annual revenue by $1.2M (15%)\n• Improved user retention by 35% through implementation of personalized user journeys\n• Led cross-functional team of 12 to deliver 4 major product releases ahead of schedule\""

        // Update resume data
        setResumeData((prev) => ({
          ...prev,
          experience: [
            {
              ...prev.experience[0],
              bullets: [
                "Spearheaded product strategy that increased annual revenue by $1.2M (15%)",
                "Improved user retention by 35% through implementation of personalized user journeys",
                "Led cross-functional team of 12 to deliver 4 major product releases ahead of schedule",
              ],
            },
          ],
        }))
      } else if (inputMessage.toLowerCase().includes("skill")) {
        responseContent =
          "For your skills section, I recommend highlighting technical and soft skills that are relevant to product management roles. Here's an updated list:\n\n• Product Strategy & Roadmapping\n• Agile & Scrum Methodologies\n• User Research & Usability Testing\n• Data Analysis & A/B Testing\n• Cross-functional Team Leadership\n• Product Metrics & KPIs\n• Stakeholder Management\n• Technical Requirement Documentation"

        // Update resume data
        setResumeData((prev) => ({
          ...prev,
          skills: [
            "Product Strategy & Roadmapping",
            "Agile & Scrum Methodologies",
            "User Research & Usability Testing",
            "Data Analysis & A/B Testing",
            "Cross-functional Team Leadership",
            "Product Metrics & KPIs",
            "Stakeholder Management",
            "Technical Requirement Documentation",
          ],
        }))
      } else {
        responseContent =
          "I can help you improve various sections of your resume. Would you like me to help with your professional summary, work experience, skills, or something else? Just let me know which part you'd like to enhance."
      }

      const assistantMessage: MessageType = {
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  // Handle key press for sending messages
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Function to handle creating a new resume with GPT
  const handleCreateNewResume = () => {
    setIsLoading(true)

    // Simulate AI generating a resume
    setTimeout(() => {
      // Create new resume based on form data
      const newResume: ResumeData = {
        name: newResumeData.name,
        title: newResumeData.jobTarget,
        contact: {
          email: "user@example.com",
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA",
        },
        summary: `Dedicated ${newResumeData.jobTarget} with ${newResumeData.experience} of experience. Passionate about delivering high-quality results and continuously improving skills in ${newResumeData.skills}.`,
        experience: [
          {
            title: newResumeData.jobTarget,
            company: "Previous Company",
            location: "San Francisco, CA",
            period: "2020 - Present",
            bullets: [
              `Leveraged expertise in ${newResumeData.skills} to deliver successful projects`,
              "Collaborated with cross-functional teams to achieve business objectives",
              "Implemented process improvements resulting in 20% efficiency gains",
            ],
          },
        ],
        education: [
          {
            degree: newResumeData.education,
            institution: "University",
            location: "San Francisco, CA",
            period: "2015 - 2019",
          },
        ],
        skills: newResumeData.skills.split(",").map((skill) => skill.trim()),
      }

      setResumeData(newResume)
      setNewResumeOpen(false)
      setIsLoading(false)

      // Add a message from the assistant about the new resume
      const assistantMessage: MessageType = {
        role: "assistant",
        content: `I've created a new resume for your ${newResumeData.jobTarget} position! Take a look at the preview. You can now ask me to help improve specific sections or make other changes.`,
        timestamp: new Date(),
      }

      setMessages([assistantMessage])

      toast({
        title: "Resume Created",
        description: "Your new resume has been generated successfully!",
      })
    }, 2000)
  }

  // Function to copy resume to clipboard
  const handleCopyResume = () => {
    // Create a formatted string of the resume
    const resumeText = `
${resumeData.name}
${resumeData.title}
${resumeData.contact.email} | ${resumeData.contact.phone} | ${resumeData.contact.location}

PROFESSIONAL SUMMARY
${resumeData.summary}

EXPERIENCE
${resumeData.experience
  .map(
    (exp) =>
      `${exp.title}
${exp.company}, ${exp.location}
${exp.period}
${exp.bullets.map((bullet) => `• ${bullet}`).join("\n")}`,
  )
  .join("\n\n")}

${
  resumeData.skills
    ? `SKILLS
${resumeData.skills.join(", ")}`
    : ""
}

${
  resumeData.education
    ? `EDUCATION
${resumeData.education
  .map(
    (edu) =>
      `${edu.degree}
${edu.institution}, ${edu.location}
${edu.period}`,
  )
  .join("\n\n")}`
    : ""
}
    `.trim()

    navigator.clipboard.writeText(resumeText)
    toast({
      title: "Resume Copied",
      description: "Resume content copied to clipboard",
    })
  }

  // Function to download resume as a text file
  const handleDownloadResume = () => {
    // Create a formatted string of the resume (same as copy function)
    const resumeText = `
${resumeData.name}
${resumeData.title}
${resumeData.contact.email} | ${resumeData.contact.phone} | ${resumeData.contact.location}

PROFESSIONAL SUMMARY
${resumeData.summary}

EXPERIENCE
${resumeData.experience
  .map(
    (exp) =>
      `${exp.title}
${exp.company}, ${exp.location}
${exp.period}
${exp.bullets.map((bullet) => `• ${bullet}`).join("\n")}`,
  )
  .join("\n\n")}

${
  resumeData.skills
    ? `SKILLS
${resumeData.skills.join(", ")}`
    : ""
}

${
  resumeData.education
    ? `EDUCATION
${resumeData.education
  .map(
    (edu) =>
      `${edu.degree}
${edu.institution}, ${edu.location}
${edu.period}`,
  )
  .join("\n\n")}`
    : ""
}
    `.trim()

    // Create a blob and download link
    const blob = new Blob([resumeText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${resumeData.name.replace(/\s+/g, "_")}_Resume.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded as a text file",
    })
  }

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Resumeup GPT</h1>
              <span className="text-xs font-semibold bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded">
                BETA
              </span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400">
              AI-powered resume assistant to help you craft the perfect resume
            </p>
          </div>

          <Dialog open={newResumeOpen} onOpenChange={setNewResumeOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Zap className="w-4 h-4 mr-2" />
                New Resume with GPT
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create a New Resume with GPT</DialogTitle>
                <DialogDescription>
                  Fill in some basic information and our AI will generate a resume for you.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newResumeData.name}
                    onChange={(e) => setNewResumeData({ ...newResumeData, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="jobTarget" className="text-right">
                    Target Job
                  </Label>
                  <Input
                    id="jobTarget"
                    value={newResumeData.jobTarget}
                    onChange={(e) => setNewResumeData({ ...newResumeData, jobTarget: e.target.value })}
                    placeholder="e.g. Software Engineer"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="experience" className="text-right">
                    Experience
                  </Label>
                  <Select
                    onValueChange={(value) => setNewResumeData({ ...newResumeData, experience: value })}
                    defaultValue={newResumeData.experience}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Years of experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2 years">1-2 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="5-10 years">5-10 years</SelectItem>
                      <SelectItem value="10+ years">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="education" className="text-right">
                    Education
                  </Label>
                  <Input
                    id="education"
                    value={newResumeData.education}
                    onChange={(e) => setNewResumeData({ ...newResumeData, education: e.target.value })}
                    placeholder="e.g. Bachelor's in Computer Science"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="skills" className="text-right">
                    Key Skills
                  </Label>
                  <Textarea
                    id="skills"
                    value={newResumeData.skills}
                    onChange={(e) => setNewResumeData({ ...newResumeData, skills: e.target.value })}
                    placeholder="e.g. JavaScript, React, Node.js"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateNewResume} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Resume"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume Preview */}
          <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                <h2 className="font-medium text-zinc-900 dark:text-zinc-50">Resume Preview</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleCopyResume}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleDownloadResume}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 h-[600px] overflow-auto">
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">{resumeData.name}</h1>
                  <p className="text-zinc-500 dark:text-zinc-400">{resumeData.title}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <span>{resumeData.contact.email}</span>
                    <span>{resumeData.contact.phone}</span>
                    <span>{resumeData.contact.location}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                    Professional Summary
                  </h2>
                  <p className="text-zinc-700 dark:text-zinc-300">{resumeData.summary}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium text-zinc-900 dark:text-zinc-50">{exp.title}</h3>
                          <span className="text-sm text-zinc-500 dark:text-zinc-400">{exp.period}</span>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                          {exp.company}, {exp.location}
                        </p>
                        <ul className="list-disc list-inside text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {resumeData.education && (
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                      Education
                    </h2>
                    <div className="space-y-4">
                      {resumeData.education.map((edu, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <h3 className="font-medium text-zinc-900 dark:text-zinc-50">{edu.degree}</h3>
                            <span className="text-sm text-zinc-500 dark:text-zinc-400">{edu.period}</span>
                          </div>
                          <p className="text-sm text-zinc-700 dark:text-zinc-300">
                            {edu.institution}, {edu.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {resumeData.skills && (
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                      Skills
                    </h2>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">{resumeData.skills.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="font-medium text-zinc-900 dark:text-zinc-50">Resume Assistant</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Ask for help with your resume or get suggestions
              </p>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.role === "assistant"
                      ? "bg-purple-50 dark:bg-purple-950"
                      : "bg-zinc-100 dark:bg-zinc-800 ml-auto"
                  } p-3 rounded-lg max-w-[80%]`}
                >
                  <p className="text-zinc-900 dark:text-zinc-50 whitespace-pre-line">{message.content}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
              {isLoading && (
                <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg max-w-[80%] flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <p className="text-zinc-900 dark:text-zinc-50">Thinking...</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  className="flex-1"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                />
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

