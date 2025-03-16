"use client"

import { useState } from "react"
import Layout from "@/components/resume-builder/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronRight,
  ChevronLeft,
  User,
  FileText,
  Building,
  Mail,
  Phone,
  Download,
  Save,
  Eye,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Add this import at the top if not already present
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

// Cover letter template options
const templates = [
  { id: "professional", name: "Professional", image: "/placeholder.svg?height=200&width=150" },
  { id: "creative", name: "Creative", image: "/placeholder.svg?height=200&width=150" },
  { id: "simple", name: "Simple", image: "/placeholder.svg?height=200&width=150" },
]

// Steps in the cover letter building process
const steps = [
  { id: "template", title: "Choose Template", icon: FileText },
  { id: "job-details", title: "Job Details", icon: Building },
  { id: "recipient", title: "Recipient", icon: User },
  { id: "introduction", title: "Introduction", icon: FileText },
  { id: "body", title: "Body", icon: FileText },
  { id: "closing", title: "Closing", icon: FileText },
  { id: "preview", title: "Preview & Download", icon: Eye },
]

export default function NewCoverLetterPage() {
  // State for tracking current step
  const [currentStep, setCurrentStep] = useState("template")

  // State for cover letter data
  const [coverLetterData, setCoverLetterData] = useState({
    template: "professional",
    jobDetails: {
      position: "",
      company: "",
      jobDescription: "",
      location: "",
      date: new Date().toISOString().split("T")[0],
    },
    recipient: {
      name: "",
      title: "",
      company: "",
      address: "",
      email: "",
      phone: "",
    },
    sender: {
      name: "",
      title: "",
      address: "",
      email: "",
      phone: "",
    },
    introduction: "",
    body: {
      paragraph1: "",
      paragraph2: "",
      paragraph3: "",
    },
    closing: {
      paragraph: "",
      signature: "",
    },
    letterName: "My Cover Letter",
  })

  // State for selected template
  const [selectedTemplate, setSelectedTemplate] = useState("professional")

  // State for AI enhancement
  const [isEnhancing, setIsEnhancing] = useState(false)

  // Add this state for tracking which text area is being enhanced
  const [enhancingField, setEnhancingField] = useState<string | null>(null)

  const router = useRouter()

  // Add this to handle URL parameters for template selection and editing
  useEffect(() => {
    // Check for template parameter
    const params = new URLSearchParams(window.location.search)
    const templateId = params.get("template")
    const editId = params.get("edit")

    if (templateId) {
      // Set the selected template based on the URL parameter
      const template = templates.find((t) => t.id === templateId)
      if (template) {
        setSelectedTemplate(template.id)
      }
    }

    if (editId) {
      // Load the cover letter data for editing
      // In a real app, this would fetch from an API
      // For now, we'll simulate with sample data
      const letterToEdit = {
        template: "professional",
        jobDetails: {
          position: "Software Engineer",
          company: "Google",
          jobDescription: "Developing cutting-edge web applications...",
          location: "Mountain View, CA",
          date: new Date().toISOString().split("T")[0],
        },
        recipient: {
          name: "Hiring Manager",
          title: "Talent Acquisition Lead",
          company: "Google",
          address: "1600 Amphitheatre Parkway, Mountain View, CA",
          email: "hiring@google.com",
          phone: "",
        },
        sender: {
          name: "John Doe",
          title: "Software Engineer",
          address: "123 Main St, San Francisco, CA",
          email: "john.doe@example.com",
          phone: "(555) 123-4567",
        },
        introduction: "I am writing to express my interest in the Software Engineer position at Google...",
        body: {
          paragraph1: "With over 5 years of experience in full-stack development...",
          paragraph2: "In my current role at TechCorp, I've led the development of...",
          paragraph3: "I'm particularly drawn to Google's mission to organize the world's information...",
        },
        closing: {
          paragraph:
            "Thank you for considering my application. I would welcome the opportunity to discuss how my skills and experience align with your needs for the Software Engineer role.",
          signature: "Sincerely,",
        },
        letterName: "Software Engineer - Google Application",
      }

      setCoverLetterData(letterToEdit)
      setCurrentStep("job-details") // Start at job details for editing
    }
  }, [])

  // Function to navigate to next step
  const goToNextStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id)
      window.scrollTo(0, 0)
    }
  }

  // Function to navigate to previous step
  const goToPreviousStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id)
      window.scrollTo(0, 0)
    }
  }

  // Function to update job details
  const updateJobDetails = (field: string, value: string) => {
    setCoverLetterData((prev) => ({
      ...prev,
      jobDetails: {
        ...prev.jobDetails,
        [field]: value,
      },
    }))
  }

  // Function to update recipient details
  const updateRecipient = (field: string, value: string) => {
    setCoverLetterData((prev) => ({
      ...prev,
      recipient: {
        ...prev.recipient,
        [field]: value,
      },
    }))
  }

  // Function to update sender details
  const updateSender = (field: string, value: string) => {
    setCoverLetterData((prev) => ({
      ...prev,
      sender: {
        ...prev.sender,
        [field]: value,
      },
    }))
  }

  // Function to update introduction
  const updateIntroduction = (value: string) => {
    setCoverLetterData((prev) => ({
      ...prev,
      introduction: value,
    }))
  }

  // Function to update body paragraphs
  const updateBodyParagraph = (paragraph: string, value: string) => {
    setCoverLetterData((prev) => ({
      ...prev,
      body: {
        ...prev.body,
        [paragraph]: value,
      },
    }))
  }

  // Function to update closing
  const updateClosing = (field: string, value: string) => {
    setCoverLetterData((prev) => ({
      ...prev,
      closing: {
        ...prev.closing,
        [field]: value,
      },
    }))
  }

  // Add this function to enhance any text field with AI
  const enhanceTextWithAI = async (field: string, value: string, updateFunction: (value: string) => void) => {
    if (!value) return

    setEnhancingField(field)

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, this would call an AI API
    const enhancedText = improveText(value, field)

    // Update the text with enhanced version
    updateFunction(enhancedText)

    // Show success toast
    toast({
      title: "Text enhanced",
      description: "Your text has been professionally enhanced by AI.",
    })

    setEnhancingField(null)
  }

  // Helper function to simulate AI text improvement for different fields
  const improveText = (text: string, field: string) => {
    // This is a simple simulation - in a real app, this would use an actual AI service
    const commonImprovements = [
      { from: /good/gi, to: "excellent" },
      { from: /nice/gi, to: "impressive" },
      { from: /want/gi, to: "seek" },
      { from: /like/gi, to: "appreciate" },
      { from: /think/gi, to: "believe" },
      { from: /get/gi, to: "obtain" },
      { from: /use/gi, to: "utilize" },
      { from: /make/gi, to: "develop" },
      { from: /very/gi, to: "significantly" },
    ]

    // Field-specific improvements
    const fieldImprovements = {
      jobDescription: [
        { from: /requirements/gi, to: "qualifications" },
        { from: /needed/gi, to: "required" },
        { from: /skills/gi, to: "competencies" },
        { from: /job/gi, to: "position" },
        { from: /candidate/gi, to: "professional" },
      ],
      introduction: [
        { from: /I am writing/gi, to: "I am pleased to submit my application" },
        { from: /I want to apply/gi, to: "I am eager to be considered" },
        { from: /I saw your job posting/gi, to: "I was intrigued by your job posting" },
        { from: /I'm interested/gi, to: "I am particularly interested" },
      ],
      bodyParagraph: [
        { from: /I worked/gi, to: "I successfully managed" },
        { from: /I did/gi, to: "I accomplished" },
        { from: /I helped/gi, to: "I contributed to" },
        { from: /I was responsible for/gi, to: "I spearheaded" },
        { from: /I learned/gi, to: "I developed expertise in" },
      ],
      closing: [
        { from: /Thank you/gi, to: "I appreciate your consideration" },
        { from: /I hope to hear/gi, to: "I look forward to discussing" },
        { from: /I can start/gi, to: "I am available to commence" },
        { from: /call me/gi, to: "contact me" },
      ],
    }

    let enhancedText = text

    // Apply common improvements
    commonImprovements.forEach(({ from, to }) => {
      enhancedText = enhancedText.replace(from, to)
    })

    // Apply field-specific improvements
    const specificImprovements = fieldImprovements[field as keyof typeof fieldImprovements] || []
    specificImprovements.forEach(({ from, to }) => {
      enhancedText = enhancedText.replace(from, to)
    })

    // Add professional phrases if text is short
    if (enhancedText.length < 100) {
      if (field === "introduction") {
        enhancedText +=
          " My background and professional achievements align well with the requirements outlined in the job description."
      } else if (field === "bodyParagraph") {
        enhancedText +=
          " This experience has equipped me with the skills necessary to excel in this role and make immediate contributions to your organization."
      } else if (field === "closing") {
        enhancedText +=
          " I am excited about the possibility of bringing my unique skills and experience to your esteemed organization."
      }
    }

    return enhancedText
  }

  // Update the saveCoverLetter function to handle both saving and updating
  const saveCoverLetter = () => {
    // In a real app, this would save to a database
    const params = new URLSearchParams(window.location.search)
    const editId = params.get("edit")

    if (editId) {
      toast({
        title: "Cover letter updated",
        description: "Your cover letter has been updated successfully.",
      })
    } else {
      toast({
        title: "Cover letter saved",
        description: "Your cover letter has been saved successfully.",
      })
    }

    // Redirect to cover letters page after saving
    setTimeout(() => {
      router.push("/cover-letters")
    }, 1500)
  }

  // Function to download cover letter
  const downloadCoverLetter = () => {
    // In a real app, this would generate a PDF
    alert("Cover letter download functionality would be implemented here")
  }

  // Function to enhance text with AI
  const enhanceWithAI = async () => {
    if (!coverLetterData.jobDetails.jobDescription) return

    setIsEnhancing(true)

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, this would call an AI API
    const enhancedText = improveJobDescription(coverLetterData.jobDetails.jobDescription)

    // Update the job description with enhanced text
    updateJobDetails("jobDescription", enhancedText)

    // Show success toast
    toast({
      title: "Text enhanced",
      description: "Your job description has been professionally enhanced by AI.",
    })

    setIsEnhancing(false)
  }

  // Helper function to simulate AI text improvement
  const improveJobDescription = (text) => {
    // This is a simple simulation - in a real app, this would use an actual AI service
    const improvements = [
      { from: /requirements/gi, to: "qualifications" },
      { from: /needed/gi, to: "required" },
      { from: /want/gi, to: "seek" },
      { from: /good/gi, to: "excellent" },
      { from: /skills/gi, to: "competencies" },
      { from: /job/gi, to: "position" },
      { from: /candidate/gi, to: "professional" },
    ]

    let enhancedText = text

    // Apply improvements
    improvements.forEach(({ from, to }) => {
      enhancedText = enhancedText.replace(from, to)
    })

    // Add some structure if the text is long enough
    if (text.length > 100) {
      const sentences = enhancedText.split(/[.!?]+/).filter((s) => s.trim().length > 0)

      if (sentences.length >= 3) {
        // Format with bullet points for key requirements
        const firstPart = sentences.slice(0, 2).join(". ") + "."
        const bulletPoints = sentences
          .slice(2)
          .map((s) => "• " + s.trim())
          .join("\n")

        enhancedText = `${firstPart}\n\nKey qualifications:\n${bulletPoints}`
      }
    }

    return enhancedText
  }

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="hidden md:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center" onClick={() => setCurrentStep(step.id)}>
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mb-2 cursor-pointer",
                    currentStep === step.id
                      ? "bg-purple-600 text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400",
                  )}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium",
                    currentStep === step.id
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-zinc-500 dark:text-zinc-400",
                  )}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile Progress Indicator */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={goToPreviousStep} disabled={currentStep === steps[0].id}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Step {steps.findIndex((step) => step.id === currentStep) + 1} of {steps.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextStep}
              disabled={currentStep === steps[steps.length - 1].id}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Template Selection Step */}
        {currentStep === "template" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Choose a Template</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Select a template that best represents your professional style
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedTemplate === template.id && "ring-2 ring-purple-600 dark:ring-purple-400",
                  )}
                  onClick={() => {
                    setSelectedTemplate(template.id)
                    setCoverLetterData((prev) => ({
                      ...prev,
                      template: template.id,
                    }))
                  }}
                >
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
                      <img
                        src={template.image || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">{template.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={goToNextStep}>
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Job Details Step */}
        {currentStep === "job-details" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Job Details</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Enter information about the position you're applying for
            </p>

            <Card className="mb-8">
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position/Job Title</Label>
                    <Input
                      id="position"
                      placeholder="Senior Product Manager"
                      value={coverLetterData.jobDetails.position}
                      onChange={(e) => updateJobDetails("position", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      placeholder="TechCorp Inc."
                      value={coverLetterData.jobDetails.company}
                      onChange={(e) => updateJobDetails("company", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                      id="location"
                      placeholder="San Francisco, CA"
                      value={coverLetterData.jobDetails.location}
                      onChange={(e) => updateJobDetails("location", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={coverLetterData.jobDetails.date}
                      onChange={(e) => updateJobDetails("date", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="jobDescription">Job Description (Optional)</Label>
                    <div className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                      <span className="text-purple-600 dark:text-purple-400">✨</span>
                      <span>AI-assisted</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Textarea
                      id="jobDescription"
                      placeholder="Paste the job description here to help tailor your cover letter"
                      className="min-h-[150px]"
                      value={coverLetterData.jobDetails.jobDescription}
                      onChange={(e) => updateJobDetails("jobDescription", e.target.value)}
                    />
                    {coverLetterData.jobDetails.jobDescription && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="absolute bottom-2 right-2 flex items-center gap-1 bg-white dark:bg-zinc-900"
                        onClick={enhanceWithAI}
                        disabled={isEnhancing}
                      >
                        {isEnhancing ? (
                          <>
                            <span className="animate-pulse">Enhancing...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-purple-600 dark:text-purple-400">✨</span>
                            Enhance with AI
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                    <span>This won't appear in your cover letter, but will help you tailor your content</span>
                    <div
                      className="ml-auto flex items-center gap-1 text-purple-600 dark:text-purple-400 cursor-help"
                      title="Our AI can help improve your text to sound more professional"
                    >
                      <span className="text-xs">AI can enhance your text to sound more professional</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={goToPreviousStep}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={goToNextStep}>
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Recipient Step */}
        {currentStep === "recipient" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Recipient Details</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Enter information about the person you're addressing the letter to
            </p>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recipient Information</CardTitle>
                <CardDescription>
                  If you don't know the recipient's name, you can use "Hiring Manager" or "Recruitment Team"
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="recipient-name">Recipient's Name</Label>
                    <Input
                      id="recipient-name"
                      placeholder="John Smith"
                      value={coverLetterData.recipient.name}
                      onChange={(e) => updateRecipient("name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient-title">Recipient's Title</Label>
                    <Input
                      id="recipient-title"
                      placeholder="Hiring Manager"
                      value={coverLetterData.recipient.title}
                      onChange={(e) => updateRecipient("title", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient-company">Company</Label>
                    <Input
                      id="recipient-company"
                      placeholder="TechCorp Inc."
                      value={coverLetterData.recipient.company}
                      onChange={(e) => updateRecipient("company", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient-address">Address (Optional)</Label>
                    <Input
                      id="recipient-address"
                      placeholder="123 Business St, San Francisco, CA 94103"
                      value={coverLetterData.recipient.address}
                      onChange={(e) => updateRecipient("address", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient-email">Email (Optional)</Label>
                    <Input
                      id="recipient-email"
                      placeholder="john.smith@techcorp.com"
                      value={coverLetterData.recipient.email}
                      onChange={(e) => updateRecipient("email", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient-phone">Phone (Optional)</Label>
                    <Input
                      id="recipient-phone"
                      placeholder="+1 (555) 123-4567"
                      value={coverLetterData.recipient.phone}
                      onChange={(e) => updateRecipient("phone", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Enter your contact information for the letter header</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sender-name">Your Name</Label>
                    <Input
                      id="sender-name"
                      placeholder="Jane Doe"
                      value={coverLetterData.sender.name}
                      onChange={(e) => updateSender("name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sender-title">Your Title (Optional)</Label>
                    <Input
                      id="sender-title"
                      placeholder="Senior Product Manager"
                      value={coverLetterData.sender.title}
                      onChange={(e) => updateSender("title", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sender-address">Your Address</Label>
                    <Input
                      id="sender-address"
                      placeholder="456 Residence Ave, San Francisco, CA 94103"
                      value={coverLetterData.sender.address}
                      onChange={(e) => updateSender("address", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sender-email">Your Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                      <Input
                        id="sender-email"
                        placeholder="jane.doe@example.com"
                        className="pl-10"
                        value={coverLetterData.sender.email}
                        onChange={(e) => updateSender("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sender-phone">Your Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                      <Input
                        id="sender-phone"
                        placeholder="+1 (555) 987-6543"
                        className="pl-10"
                        value={coverLetterData.sender.phone}
                        onChange={(e) => updateSender("phone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={goToPreviousStep}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={goToNextStep}>
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Introduction Step */}
        {currentStep === "introduction" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Introduction</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Create a compelling opening paragraph that grabs attention
            </p>

            <Card className="mb-8">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="introduction">Introduction Paragraph</Label>
                    <div className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                      <span className="text-purple-600 dark:text-purple-400">✨</span>
                      <span>AI-assisted</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Textarea
                      id="introduction"
                      placeholder="I am writing to express my interest in the Senior Product Manager position at TechCorp Inc. With over 8 years of experience in product management and a proven track record of launching successful products, I am excited about the opportunity to bring my expertise to your team."
                      className="min-h-[200px]"
                      value={coverLetterData.introduction}
                      onChange={(e) => updateIntroduction(e.target.value)}
                    />
                    {coverLetterData.introduction && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="absolute bottom-2 right-2 flex items-center gap-1 bg-white dark:bg-zinc-900"
                        onClick={() =>
                          enhanceTextWithAI("introduction", coverLetterData.introduction, updateIntroduction)
                        }
                        disabled={enhancingField === "introduction"}
                      >
                        {enhancingField === "introduction" ? (
                          <span className="animate-pulse">Enhancing...</span>
                        ) : (
                          <>
                            <span className="text-purple-600 dark:text-purple-400">✨</span>
                            Enhance with AI
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                    <span>Create a compelling opening that grabs attention</span>
                    <div
                      className="ml-auto flex items-center gap-1 text-purple-600 dark:text-purple-400 cursor-help"
                      title="Our AI can help improve your text to sound more professional"
                    >
                      <span className="text-xs">AI can enhance your introduction to sound more professional</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                    Tips for a great introduction:
                  </h3>
                  <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 list-disc list-inside">
                    <li>Mention the specific position you're applying for</li>
                    <li>Briefly state how you found out about the position (if relevant)</li>
                    <li>Include a brief statement about your qualifications</li>
                    <li>Express enthusiasm for the role and company</li>
                    <li>Keep it concise - aim for 3-5 sentences</li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                    Example Introduction
                  </h3>
                  <p className="text-sm text-purple-800 dark:text-purple-200 italic">
                    "I am excited to apply for the Marketing Manager position at ABC Company, which I discovered through
                    your LinkedIn posting. With five years of experience developing successful marketing campaigns and a
                    proven track record of increasing brand visibility by 45%, I am confident in my ability to
                    contribute to your team's continued success. I have long admired ABC Company's innovative approach
                    to digital marketing and would be thrilled to bring my strategic thinking and creative
                    problem-solving skills to your organization."
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={goToPreviousStep}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={goToNextStep}>
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Body Step */}
        {currentStep === "body" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Body Paragraphs</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Highlight your relevant experience, skills, and achievements
            </p>

            <Card className="mb-8">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="paragraph1">First Paragraph - Your Experience</Label>
                    <div className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                      <span className="text-purple-600 dark:text-purple-400">✨</span>
                      <span>AI-assisted</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Textarea
                      id="paragraph1"
                      placeholder="In my current role as Product Manager at InnovateTech, I have successfully led cross-functional teams to deliver products that increased user engagement by 35% and revenue by $2.5M annually. I have developed expertise in agile methodologies, user research, and data-driven decision making, which align perfectly with the requirements outlined in your job description."
                      className="min-h-[150px]"
                      value={coverLetterData.body.paragraph1}
                      onChange={(e) => updateBodyParagraph("paragraph1", e.target.value)}
                    />
                    {coverLetterData.body.paragraph1 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="absolute bottom-2 right-2 flex items-center gap-1 bg-white dark:bg-zinc-900"
                        onClick={() =>
                          enhanceTextWithAI("bodyParagraph", coverLetterData.body.paragraph1, (value) =>
                            updateBodyParagraph("paragraph1", value),
                          )
                        }
                        disabled={enhancingField === "paragraph1"}
                      >
                        {enhancingField === "paragraph1" ? (
                          <span className="animate-pulse">Enhancing...</span>
                        ) : (
                          <>
                            <span className="text-purple-600 dark:text-purple-400">✨</span>
                            Enhance with AI
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                    <span>Focus on your relevant experience and how it relates to the job requirements</span>
                    <div
                      className="ml-auto flex items-center gap-1 text-purple-600 dark:text-purple-400 cursor-help"
                      title="Our AI can help improve your text to sound more professional"
                    >
                      <span className="text-xs">AI can enhance your text to sound more professional</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="paragraph2">Second Paragraph - Your Skills & Achievements</Label>
                    <div className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                      <span className="text-purple-600 dark:text-purple-400">✨</span>
                      <span>AI-assisted</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Textarea
                      id="paragraph2"
                      placeholder="Throughout my career, I have demonstrated strong leadership and communication skills while managing product roadmaps and stakeholder expectations. One of my key achievements was spearheading the development of a new mobile application that attracted 100,000 users within the first month of launch. I also implemented a customer feedback loop that reduced churn by 20% and improved overall product satisfaction scores."
                      className="min-h-[150px]"
                      value={coverLetterData.body.paragraph2}
                      onChange={(e) => updateBodyParagraph("paragraph2", e.target.value)}
                    />
                    {coverLetterData.body.paragraph2 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="absolute bottom-2 right-2 flex items-center gap-1 bg-white dark:bg-zinc-900"
                        onClick={() =>
                          enhanceTextWithAI("bodyParagraph", coverLetterData.body.paragraph2, (value) =>
                            updateBodyParagraph("paragraph2", value),
                          )
                        }
                        disabled={enhancingField === "paragraph2"}
                      >
                        {enhancingField === "paragraph2" ? (
                          <span className="animate-pulse">Enhancing...</span>
                        ) : (
                          <>
                            <span className="text-purple-600 dark:text-purple-400">✨</span>
                            Enhance with AI
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                    <span>Highlight specific achievements and quantify results when possible</span>
                    <div
                      className="ml-auto flex items-center gap-1 text-purple-600 dark:text-purple-400 cursor-help"
                      title="Our AI can help improve your text to sound more professional"
                    >
                      <span className="text-xs">AI can enhance your achievements to sound more impressive</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="paragraph3">Third Paragraph - Why This Company</Label>
                    <div className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                      <span className="text-purple-600 dark:text-purple-400">✨</span>
                      <span>AI-assisted</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Textarea
                      id="paragraph3"
                      placeholder="I am particularly drawn to TechCorp's mission to make technology accessible to everyone and your commitment to innovation. Your recent launch of the AI-powered platform aligns with my interest in emerging technologies, and I am excited about the opportunity to contribute to your future product initiatives. I believe my combination of technical knowledge and business acumen would make me a valuable addition to your team."
                      className="min-h-[150px]"
                      value={coverLetterData.body.paragraph3}
                      onChange={(e) => updateBodyParagraph("paragraph3", e.target.value)}
                    />
                    {coverLetterData.body.paragraph3 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="absolute bottom-2 right-2 flex items-center gap-1 bg-white dark:bg-zinc-900"
                        onClick={() =>
                          enhanceTextWithAI("bodyParagraph", coverLetterData.body.paragraph3, (value) =>
                            updateBodyParagraph("paragraph3", value),
                          )
                        }
                        disabled={enhancingField === "paragraph3"}
                      >
                        {enhancingField === "paragraph3" ? (
                          <span className="animate-pulse">Enhancing...</span>
                        ) : (
                          <>
                            <span className="text-purple-600 dark:text-purple-400">✨</span>
                            Enhance with AI
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                    <span>Explain why you're interested in this specific company and position</span>
                    <div
                      className="ml-auto flex items-center gap-1 text-purple-600 dark:text-purple-400 cursor-help"
                      title="Our AI can help improve your text to sound more professional"
                    >
                      <span className="text-xs">AI can enhance your company interest to sound more genuine</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                    Tips for effective body paragraphs:
                  </h3>
                  <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 list-disc list-inside">
                    <li>Use specific examples to demonstrate your skills and experience</li>
                    <li>Quantify your achievements with numbers and percentages when possible</li>
                    <li>Match your skills to the job requirements</li>
                    <li>Show enthusiasm for the company and explain why you're a good fit</li>
                    <li>Keep each paragraph focused on a specific theme</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={goToPreviousStep}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={goToNextStep}>
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Closing Step */}
        {currentStep === "closing" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Closing</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">Create a strong closing paragraph and signature</p>

            <Card className="mb-8">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="closing-paragraph">Closing Paragraph</Label>
                    <div className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                      <span className="text-purple-600 dark:text-purple-400">✨</span>
                      <span>AI-assisted</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Textarea
                      id="closing-paragraph"
                      placeholder="Thank you for considering my application. I am excited about the opportunity to discuss how my skills and experience align with your needs for the Senior Product Manager role. I would welcome the chance to further discuss how I can contribute to TechCorp's continued success. Please find my resume attached, and I look forward to the opportunity to speak with you soon."
                      className="min-h-[150px]"
                      value={coverLetterData.closing.paragraph}
                      onChange={(e) => updateClosing("paragraph", e.target.value)}
                    />
                    {coverLetterData.closing.paragraph && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="absolute bottom-2 right-2 flex items-center gap-1 bg-white dark:bg-zinc-900"
                        onClick={() =>
                          enhanceTextWithAI("closing", coverLetterData.closing.paragraph, (value) =>
                            updateClosing("paragraph", value),
                          )
                        }
                        disabled={enhancingField === "closing"}
                      >
                        {enhancingField === "closing" ? (
                          <span className="animate-pulse">Enhancing...</span>
                        ) : (
                          <>
                            <span className="text-purple-600 dark:text-purple-400">✨</span>
                            Enhance with AI
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                    <span>Express gratitude, reiterate interest, and include a call to action</span>
                    <div
                      className="ml-auto flex items-center gap-1 text-purple-600 dark:text-purple-400 cursor-help"
                      title="Our AI can help improve your text to sound more professional"
                    >
                      <span className="text-xs">AI can enhance your closing to sound more impactful</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signature">Signature</Label>
                  <Input
                    id="signature"
                    placeholder="Sincerely, Jane Doe"
                    value={coverLetterData.closing.signature}
                    onChange={(e) => updateClosing("signature", e.target.value)}
                  />
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                    Tips for a strong closing:
                  </h3>
                  <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 list-disc list-inside">
                    <li>Thank the reader for their time and consideration</li>
                    <li>Express enthusiasm for the opportunity to interview</li>
                    <li>
                      Include a clear call to action (e.g., "I look forward to discussing this opportunity further")
                    </li>
                    <li>Mention any attachments (resume, portfolio, etc.)</li>
                    <li>Use a professional sign-off (e.g., "Sincerely," "Best regards," "Respectfully")</li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                    Example Closing
                  </h3>
                  <p className="text-sm text-purple-800 dark:text-purple-200 italic">
                    "Thank you for considering my application. I am excited about the opportunity to bring my skills and
                    passion to your team and would welcome the chance to discuss how I can contribute to your company's
                    goals. I have attached my resume for your review and am available for an interview at your
                    convenience. I look forward to hearing from you soon."
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={goToPreviousStep}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={goToNextStep}>
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Preview & Download Step */}
        {currentStep === "preview" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Preview & Download</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Review your cover letter and make any final adjustments
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <Card>
                  <CardContent className="p-6">
                    <Tabs defaultValue="preview">
                      <TabsList className="mb-4">
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="professional">Professional</TabsTrigger>
                        <TabsTrigger value="creative">Creative</TabsTrigger>
                        <TabsTrigger value="simple">Simple</TabsTrigger>
                      </TabsList>
                      <TabsContent value="preview" className="h-[600px] overflow-auto p-6 border rounded-md">
                        <div className="space-y-6">
                          {/* Sender Info */}
                          <div className="text-right">
                            <p className="font-medium">{coverLetterData.sender.name}</p>
                            <p>{coverLetterData.sender.address}</p>
                            <p>{coverLetterData.sender.email}</p>
                            <p>{coverLetterData.sender.phone}</p>
                          </div>

                          {/* Date */}
                          <p>
                            {new Date(coverLetterData.jobDetails.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>

                          {/* Recipient Info */}
                          <div>
                            <p className="font-medium">{coverLetterData.recipient.name}</p>
                            <p>{coverLetterData.recipient.title}</p>
                            <p>{coverLetterData.recipient.company}</p>
                            <p>{coverLetterData.recipient.address}</p>
                          </div>

                          {/* Salutation */}
                          <p>Dear {coverLetterData.recipient.name || "Hiring Manager"},</p>

                          {/* Introduction */}
                          <p>{coverLetterData.introduction}</p>

                          {/* Body Paragraphs */}
                          <p>{coverLetterData.body.paragraph1}</p>
                          <p>{coverLetterData.body.paragraph2}</p>
                          <p>{coverLetterData.body.paragraph3}</p>

                          {/* Closing */}
                          <p>{coverLetterData.closing.paragraph}</p>

                          {/* Signature */}
                          <p className="mt-8">{coverLetterData.closing.signature || "Sincerely,"}</p>
                          <p className="mt-4">{coverLetterData.sender.name}</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="professional" className="h-[600px] overflow-auto p-6 border rounded-md">
                        <div className="space-y-6">
                          {/* Professional template preview */}
                          <div className="text-center mb-6">
                            <h2 className="text-xl font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
                              {coverLetterData.sender.name}
                            </h2>
                            <div className="flex justify-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                              <span>{coverLetterData.sender.email}</span>
                              <span>•</span>
                              <span>{coverLetterData.sender.phone}</span>
                            </div>
                            <div className="mt-2 h-0.5 w-32 bg-zinc-200 dark:bg-zinc-700 mx-auto"></div>
                          </div>

                          <div className="text-right">
                            <p>
                              {new Date(coverLetterData.jobDetails.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>

                          <div>
                            <p>{coverLetterData.recipient.name}</p>
                            <p>{coverLetterData.recipient.title}</p>
                            <p>{coverLetterData.recipient.company}</p>
                            <p>{coverLetterData.recipient.address}</p>
                          </div>

                          <p>Dear {coverLetterData.recipient.name || "Hiring Manager"},</p>

                          <p>{coverLetterData.introduction}</p>
                          <p>{coverLetterData.body.paragraph1}</p>
                          <p>{coverLetterData.body.paragraph2}</p>
                          <p>{coverLetterData.body.paragraph3}</p>
                          <p>{coverLetterData.closing.paragraph}</p>

                          <p className="mt-8">{coverLetterData.closing.signature || "Sincerely,"}</p>
                          <p className="mt-4">{coverLetterData.sender.name}</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="creative" className="h-[600px] overflow-auto p-6 border rounded-md">
                        <div className="space-y-6">
                          {/* Creative template preview */}
                          <div className="flex justify-between items-center border-b border-purple-200 dark:border-purple-800 pb-4">
                            <div>
                              <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400">
                                {coverLetterData.sender.name}
                              </h2>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">{coverLetterData.sender.title}</p>
                            </div>
                            <div className="text-right text-sm">
                              <p>{coverLetterData.sender.email}</p>
                              <p>{coverLetterData.sender.phone}</p>
                            </div>
                          </div>

                          <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-md">
                            <p className="font-medium">Position: {coverLetterData.jobDetails.position}</p>
                            <p>Company: {coverLetterData.jobDetails.company}</p>
                            <p>
                              Date:{" "}
                              {new Date(coverLetterData.jobDetails.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>

                          <p>Dear {coverLetterData.recipient.name || "Hiring Manager"},</p>

                          <p>{coverLetterData.introduction}</p>
                          <p>{coverLetterData.body.paragraph1}</p>
                          <p>{coverLetterData.body.paragraph2}</p>
                          <p>{coverLetterData.body.paragraph3}</p>
                          <p>{coverLetterData.closing.paragraph}</p>

                          <div className="border-t border-purple-200 dark:border-purple-800 pt-4">
                            <p>{coverLetterData.closing.signature || "Sincerely,"}</p>
                            <p className="font-bold text-purple-600 dark:text-purple-400">
                              {coverLetterData.sender.name}
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="simple" className="h-[600px] overflow-auto p-6 border rounded-md">
                        <div className="space-y-6">
                          {/* Simple template preview */}
                          <div>
                            <p>{coverLetterData.sender.name}</p>
                            <p>{coverLetterData.sender.address}</p>
                            <p>{coverLetterData.sender.email}</p>
                            <p>{coverLetterData.sender.phone}</p>
                          </div>

                          <p>
                            {new Date(coverLetterData.jobDetails.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>

                          <div>
                            <p>{coverLetterData.recipient.name}</p>
                            <p>{coverLetterData.recipient.title}</p>
                            <p>{coverLetterData.recipient.company}</p>
                            <p>{coverLetterData.recipient.address}</p>
                          </div>

                          <p>Dear {coverLetterData.recipient.name || "Hiring Manager"},</p>

                          <p>
                            <strong>Re: Application for {coverLetterData.jobDetails.position}</strong>
                          </p>

                          <p>{coverLetterData.introduction}</p>
                          <p>{coverLetterData.body.paragraph1}</p>
                          <p>{coverLetterData.body.paragraph2}</p>
                          <p>{coverLetterData.body.paragraph3}</p>
                          <p>{coverLetterData.closing.paragraph}</p>

                          <p>{coverLetterData.closing.signature || "Sincerely,"}</p>
                          <p>{coverLetterData.sender.name}</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cover Letter Options</CardTitle>
                    <CardDescription>Save your cover letter or download it as a PDF</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="letter-name">Cover Letter Name</Label>
                      <Input
                        id="letter-name"
                        placeholder="Application for Product Manager at TechCorp"
                        value={coverLetterData.letterName}
                        onChange={(e) =>
                          setCoverLetterData((prev) => ({
                            ...prev,
                            letterName: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Template</Label>
                      <Select
                        value={coverLetterData.template}
                        onValueChange={(value) =>
                          setCoverLetterData((prev) => ({
                            ...prev,
                            template: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="simple">Simple</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={downloadCoverLetter}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="w-full" onClick={saveCoverLetter}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Cover Letter
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cover Letter Checklist</CardTitle>
                    <CardDescription>Make sure your cover letter is complete and error-free</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Contact information is complete</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Addressed to the correct recipient</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Introduction is engaging and relevant</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Body paragraphs highlight relevant skills and experience</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Closing includes a call to action</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Professional tone throughout</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={goToPreviousStep}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => saveCoverLetter()}>
                Save and Finish
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

