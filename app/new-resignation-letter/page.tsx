"use client"

import { useState, useEffect } from "react"
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
  Calendar,
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
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

// Resignation letter template options
const templates = [
  { id: "standard", name: "Standard", image: "/placeholder.svg?height=200&width=150" },
  { id: "grateful", name: "Grateful", image: "/placeholder.svg?height=200&width=150" },
  { id: "immediate", name: "Immediate", image: "/placeholder.svg?height=200&width=150" },
  { id: "career-change", name: "Career Change", image: "/placeholder.svg?height=200&width=150" },
]

// Steps in the resignation letter building process
const steps = [
  { id: "template", title: "Choose Template", icon: FileText },
  { id: "company-details", title: "Company Details", icon: Building },
  { id: "dates", title: "Dates", icon: Calendar },
  { id: "content", title: "Letter Content", icon: FileText },
  { id: "preview", title: "Preview & Download", icon: Eye },
]

export default function NewResignationLetterPage() {
  const router = useRouter()

  // State for tracking current step
  const [currentStep, setCurrentStep] = useState("template")

  // State for resignation letter data
  const [resignationData, setResignationData] = useState({
    template: "standard",
    companyDetails: {
      company: "",
      managerName: "",
      managerTitle: "",
      yourPosition: "",
      department: "",
    },
    dates: {
      submissionDate: new Date().toISOString().split("T")[0],
      lastWorkingDay: "",
      noticeLength: "2 weeks",
    },
    content: {
      reason: "personal",
      reasonDetails: "",
      gratitude: "",
      transitionHelp: "",
      closing: "",
    },
    sender: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    letterName: "My Resignation Letter",
  })

  // State for selected template
  const [selectedTemplate, setSelectedTemplate] = useState("standard")

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
        setResignationData((prev) => ({
          ...prev,
          template: template.id,
        }))
      }
    }

    if (editId) {
      // Load the resignation letter data for editing
      // In a real app, this would fetch from an API
      // For now, we'll simulate with sample data
      const letterToEdit = {
        template: "standard",
        companyDetails: {
          company: "TechCorp Inc.",
          managerName: "John Smith",
          managerTitle: "HR Director",
          yourPosition: "Software Engineer",
          department: "Engineering",
        },
        dates: {
          submissionDate: new Date().toISOString().split("T")[0],
          lastWorkingDay: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          noticeLength: "2 weeks",
        },
        content: {
          reason: "new-opportunity",
          reasonDetails:
            "I have accepted a position at another company that will further my growth and development in my career.",
          gratitude:
            "I am grateful for the opportunities for professional development that you have provided during my time at TechCorp Inc. I have enjoyed working for the company and appreciate the support provided to me during my tenure.",
          transitionHelp:
            "I am willing to help with the transition of my duties to my replacement. Please let me know how I can be of assistance during my remaining time at the company.",
          closing: "I wish you and the company continued success in the future.",
        },
        sender: {
          name: "Jane Doe",
          email: "jane.doe@example.com",
          phone: "(555) 123-4567",
          address: "123 Main St, San Francisco, CA",
        },
        letterName: "Resignation - TechCorp Inc.",
      }

      setResignationData(letterToEdit)
      setSelectedTemplate(letterToEdit.template)
      setCurrentStep("company-details") // Start at company details for editing
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

  // Function to update company details
  const updateCompanyDetails = (field: string, value: string) => {
    setResignationData((prev) => ({
      ...prev,
      companyDetails: {
        ...prev.companyDetails,
        [field]: value,
      },
    }))
  }

  // Function to update dates
  const updateDates = (field: string, value: string) => {
    setResignationData((prev) => ({
      ...prev,
      dates: {
        ...prev.dates,
        [field]: value,
      },
    }))
  }

  // Function to update content
  const updateContent = (field: string, value: string) => {
    setResignationData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }))
  }

  // Function to update sender details
  const updateSender = (field: string, value: string) => {
    setResignationData((prev) => ({
      ...prev,
      sender: {
        ...prev.sender,
        [field]: value,
      },
    }))
  }

  // Function to save resignation letter
  const saveResignationLetter = () => {
    // In a real app, this would save to a database
    const params = new URLSearchParams(window.location.search)
    const editId = params.get("edit")

    if (editId) {
      toast({
        title: "Resignation letter updated",
        description: "Your resignation letter has been updated successfully.",
      })
    } else {
      toast({
        title: "Resignation letter saved",
        description: "Your resignation letter has been saved successfully.",
      })
    }

    // Redirect to resignation letters page after saving
    setTimeout(() => {
      router.push("/resignation-letters")
    }, 1500)
  }

  // Function to download resignation letter
  const downloadResignationLetter = () => {
    // In a real app, this would generate a PDF
    toast({
      title: "Download started",
      description: "Your resignation letter is being downloaded.",
    })
  }

  // Function to calculate last working day based on notice length
  const calculateLastWorkingDay = (noticeLength: string) => {
    const today = new Date()
    let daysToAdd = 14 // Default 2 weeks

    switch (noticeLength) {
      case "1 week":
        daysToAdd = 7
        break
      case "3 weeks":
        daysToAdd = 21
        break
      case "1 month":
        daysToAdd = 30
        break
      default:
        daysToAdd = 14
    }

    const lastDay = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
    return lastDay.toISOString().split("T")[0]
  }

  // Update last working day when notice length changes
  useEffect(() => {
    const lastWorkingDay = calculateLastWorkingDay(resignationData.dates.noticeLength)
    updateDates("lastWorkingDay", lastWorkingDay)
  }, [resignationData.dates.noticeLength])

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
              Select a template that best fits your resignation situation
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedTemplate === template.id && "ring-2 ring-purple-600 dark:ring-purple-400",
                  )}
                  onClick={() => {
                    setSelectedTemplate(template.id)
                    setResignationData((prev) => ({
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

        {/* Company Details Step */}
        {currentStep === "company-details" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Company Details</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Enter information about your current employer and position
            </p>

            <Card className="mb-8">
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      placeholder="TechCorp Inc."
                      value={resignationData.companyDetails.company}
                      onChange={(e) => updateCompanyDetails("company", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yourPosition">Your Current Position</Label>
                    <Input
                      id="yourPosition"
                      placeholder="Software Engineer"
                      value={resignationData.companyDetails.yourPosition}
                      onChange={(e) => updateCompanyDetails("yourPosition", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department (Optional)</Label>
                    <Input
                      id="department"
                      placeholder="Engineering"
                      value={resignationData.companyDetails.department}
                      onChange={(e) => updateCompanyDetails("department", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="managerName">Manager's Name</Label>
                    <Input
                      id="managerName"
                      placeholder="John Smith"
                      value={resignationData.companyDetails.managerName}
                      onChange={(e) => updateCompanyDetails("managerName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="managerTitle">Manager's Title (Optional)</Label>
                    <Input
                      id="managerTitle"
                      placeholder="HR Director"
                      value={resignationData.companyDetails.managerTitle}
                      onChange={(e) => updateCompanyDetails("managerTitle", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sender-name">Your Full Name</Label>
                  <Input
                    id="sender-name"
                    placeholder="Jane Doe"
                    value={resignationData.sender.name}
                    onChange={(e) => updateSender("name", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sender-email">Your Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                      <Input
                        id="sender-email"
                        placeholder="jane.doe@example.com"
                        className="pl-10"
                        value={resignationData.sender.email}
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
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                        value={resignationData.sender.phone}
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

        {/* Dates Step */}
        {currentStep === "dates" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Important Dates</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">Specify your notice period and last working day</p>

            <Card className="mb-8">
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="submissionDate">Today's Date</Label>
                    <Input
                      id="submissionDate"
                      type="date"
                      value={resignationData.dates.submissionDate}
                      onChange={(e) => updateDates("submissionDate", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="noticeLength">Notice Period</Label>
                    <Select
                      value={resignationData.dates.noticeLength}
                      onValueChange={(value) => updateDates("noticeLength", value)}
                    >
                      <SelectTrigger id="noticeLength">
                        <SelectValue placeholder="Select notice period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 week">1 Week</SelectItem>
                        <SelectItem value="2 weeks">2 Weeks (Standard)</SelectItem>
                        <SelectItem value="3 weeks">3 Weeks</SelectItem>
                        <SelectItem value="1 month">1 Month</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Standard notice period is 2 weeks, but check your contract or company policy
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastWorkingDay">Last Working Day</Label>
                    <Input
                      id="lastWorkingDay"
                      type="date"
                      value={resignationData.dates.lastWorkingDay}
                      onChange={(e) => updateDates("lastWorkingDay", e.target.value)}
                    />
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      This date is calculated based on your notice period, but you can adjust it if needed
                    </p>
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

        {/* Content Step */}
        {currentStep === "content" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Letter Content</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">Customize the content of your resignation letter</p>

            <Card className="mb-8">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Leaving</Label>
                  <Select
                    value={resignationData.content.reason}
                    onValueChange={(value) => updateContent("reason", value)}
                  >
                    <SelectTrigger id="reason">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Reasons</SelectItem>
                      <SelectItem value="new-opportunity">New Job Opportunity</SelectItem>
                      <SelectItem value="career-change">Career Change</SelectItem>
                      <SelectItem value="relocation">Relocation</SelectItem>
                      <SelectItem value="health">Health Reasons</SelectItem>
                      <SelectItem value="family">Family Reasons</SelectItem>
                      <SelectItem value="retirement">Retirement</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reasonDetails">Additional Details (Optional)</Label>
                  <Textarea
                    id="reasonDetails"
                    placeholder="I have accepted a position at another company that will further my growth and development in my career."
                    className="min-h-[100px]"
                    value={resignationData.content.reasonDetails}
                    onChange={(e) => updateContent("reasonDetails", e.target.value)}
                  />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    You don't need to provide specific details if you prefer not to
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gratitude">Expression of Gratitude</Label>
                  <Textarea
                    id="gratitude"
                    placeholder="I am grateful for the opportunities for professional development that you have provided during my time at [Company Name]. I have enjoyed working for the company and appreciate the support provided to me during my tenure."
                    className="min-h-[150px]"
                    value={resignationData.content.gratitude}
                    onChange={(e) => updateContent("gratitude", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transitionHelp">Transition Assistance</Label>
                  <Textarea
                    id="transitionHelp"
                    placeholder="I am willing to help with the transition of my duties to my replacement. Please let me know how I can be of assistance during my remaining time at the company."
                    className="min-h-[100px]"
                    value={resignationData.content.transitionHelp}
                    onChange={(e) => updateContent("transitionHelp", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="closing">Closing Statement</Label>
                  <Textarea
                    id="closing"
                    placeholder="I wish you and the company continued success in the future."
                    className="min-h-[100px]"
                    value={resignationData.content.closing}
                    onChange={(e) => updateContent("closing", e.target.value)}
                  />
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
              Review your resignation letter and make any final adjustments
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <Card>
                  <CardContent className="p-6">
                    <Tabs defaultValue="preview">
                      <TabsList className="mb-4">
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="standard">Standard</TabsTrigger>
                        <TabsTrigger value="grateful">Grateful</TabsTrigger>
                        <TabsTrigger value="immediate">Immediate</TabsTrigger>
                      </TabsList>
                      <TabsContent value="preview" className="h-[600px] overflow-auto p-6 border rounded-md">
                        <div className="space-y-6">
                          {/* Sender Info */}
                          <div className="text-right">
                            <p className="font-medium">{resignationData.sender.name}</p>
                            <p>{resignationData.sender.email}</p>
                            <p>{resignationData.sender.phone}</p>
                          </div>

                          {/* Date */}
                          <p>
                            {new Date(resignationData.dates.submissionDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>

                          {/* Recipient Info */}
                          <div>
                            <p className="font-medium">{resignationData.companyDetails.managerName}</p>
                            <p>{resignationData.companyDetails.managerTitle}</p>
                            <p>{resignationData.companyDetails.company}</p>
                          </div>

                          {/* Subject */}
                          <p className="font-medium">
                            Subject: Letter of Resignation - {resignationData.companyDetails.yourPosition}
                          </p>

                          {/* Salutation */}
                          <p>Dear {resignationData.companyDetails.managerName || "Manager"},</p>

                          {/* Body */}
                          <p>
                            I am writing to formally notify you of my resignation from my position as{" "}
                            {resignationData.companyDetails.yourPosition} at {resignationData.companyDetails.company},
                            effective{" "}
                            {new Date(resignationData.dates.lastWorkingDay).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            .
                          </p>

                          {resignationData.content.reasonDetails && <p>{resignationData.content.reasonDetails}</p>}

                          <p>{resignationData.content.gratitude}</p>

                          <p>{resignationData.content.transitionHelp}</p>

                          <p>{resignationData.content.closing}</p>

                          {/* Signature */}
                          <p className="mt-8">Sincerely,</p>
                          <p className="mt-4">{resignationData.sender.name}</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="standard" className="h-[600px] overflow-auto p-6 border rounded-md">
                        <div className="space-y-6">
                          {/* Standard template preview */}
                          <div className="text-right">
                            <p className="font-medium">{resignationData.sender.name}</p>
                            <p>{resignationData.sender.email}</p>
                            <p>{resignationData.sender.phone}</p>
                          </div>

                          <p>
                            {new Date(resignationData.dates.submissionDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>

                          <div>
                            <p className="font-medium">{resignationData.companyDetails.managerName}</p>
                            <p>{resignationData.companyDetails.managerTitle}</p>
                            <p>{resignationData.companyDetails.company}</p>
                          </div>

                          <p className="font-medium">Subject: Letter of Resignation</p>

                          <p>Dear {resignationData.companyDetails.managerName || "Manager"},</p>

                          <p>
                            Please accept this letter as formal notification of my resignation from the position of{" "}
                            {resignationData.companyDetails.yourPosition} with {resignationData.companyDetails.company}.
                            My last day of employment will be{" "}
                            {new Date(resignationData.dates.lastWorkingDay).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            .
                          </p>

                          <p>
                            I appreciate the opportunities for professional development that you have provided during my
                            time at {resignationData.companyDetails.company}. Thank you for your support and guidance.
                          </p>

                          <p>
                            Please let me know how I can be of assistance during the transition period. I am willing to
                            help train my replacement and ensure a smooth handover of my responsibilities.
                          </p>

                          <p>I wish you and the company continued success.</p>

                          <p className="mt-8">Sincerely,</p>
                          <p className="mt-4">{resignationData.sender.name}</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="grateful" className="h-[600px] overflow-auto p-6 border rounded-md">
                        <div className="space-y-6">
                          {/* Grateful template preview */}
                          <div className="text-right">
                            <p className="font-medium">{resignationData.sender.name}</p>
                            <p>{resignationData.sender.email}</p>
                            <p>{resignationData.sender.phone}</p>
                          </div>

                          <p>
                            {new Date(resignationData.dates.submissionDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>

                          <div>
                            <p className="font-medium">{resignationData.companyDetails.managerName}</p>
                            <p>{resignationData.companyDetails.managerTitle}</p>
                            <p>{resignationData.companyDetails.company}</p>
                          </div>

                          <p className="font-medium">Subject: Resignation - With Gratitude</p>

                          <p>Dear {resignationData.companyDetails.managerName || "Manager"},</p>

                          <p>
                            It is with mixed emotions that I submit my resignation from my position as{" "}
                            {resignationData.companyDetails.yourPosition} at {resignationData.companyDetails.company},
                            effective{" "}
                            {new Date(resignationData.dates.lastWorkingDay).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            .
                          </p>

                          <p>
                            I want to express my sincere gratitude for the incredible opportunities for growth and
                            development that you and the company have provided me during my tenure. The skills I have
                            gained, the professional relationships I have built, and the experiences I have had at{" "}
                            {resignationData.companyDetails.company} have been invaluable to my career and personal
                            growth.
                          </p>

                          <p>
                            I am committed to ensuring a smooth transition and will do everything possible to complete
                            my current projects and train my replacement before my departure. Please let me know how I
                            can be of assistance during this transition period.
                          </p>

                          <p>
                            I will always look back on my time at {resignationData.companyDetails.company} with
                            appreciation and fondness. I wish you and the entire team continued success in the future.
                          </p>

                          <p className="mt-8">With gratitude,</p>
                          <p className="mt-4">{resignationData.sender.name}</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="immediate" className="h-[600px] overflow-auto p-6 border rounded-md">
                        <div className="space-y-6">
                          {/* Immediate template preview */}
                          <div className="text-right">
                            <p className="font-medium">{resignationData.sender.name}</p>
                            <p>{resignationData.sender.email}</p>
                            <p>{resignationData.sender.phone}</p>
                          </div>

                          <p>
                            {new Date(resignationData.dates.submissionDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>

                          <div>
                            <p className="font-medium">{resignationData.companyDetails.managerName}</p>
                            <p>{resignationData.companyDetails.managerTitle}</p>
                            <p>{resignationData.companyDetails.company}</p>
                          </div>

                          <p className="font-medium">Subject: Immediate Resignation</p>

                          <p>Dear {resignationData.companyDetails.managerName || "Manager"},</p>

                          <p>
                            I am writing to inform you of my immediate resignation from my position as{" "}
                            {resignationData.companyDetails.yourPosition} at {resignationData.companyDetails.company},
                            effective today,{" "}
                            {new Date(resignationData.dates.submissionDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            .
                          </p>

                          <p>
                            I understand that this is a departure from the standard notice period, and I sincerely
                            apologize for any inconvenience this may cause. Due to urgent personal circumstances, I am
                            unable to continue in my role.
                          </p>

                          <p>
                            I am grateful for the opportunities and experiences I have gained during my time at{" "}
                            {resignationData.companyDetails.company}. I will do my best to assist with the transition
                            remotely if needed.
                          </p>

                          <p>Thank you for your understanding during this difficult time.</p>

                          <p className="mt-8">Sincerely,</p>
                          <p className="mt-4">{resignationData.sender.name}</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resignation Letter Options</CardTitle>
                    <CardDescription>Save your resignation letter or download it as a PDF</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="letter-name">Resignation Letter Name</Label>
                      <Input
                        id="letter-name"
                        placeholder="Resignation - TechCorp Inc."
                        value={resignationData.letterName}
                        onChange={(e) =>
                          setResignationData((prev) => ({
                            ...prev,
                            letterName: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Template</Label>
                      <Select
                        value={resignationData.template}
                        onValueChange={(value) =>
                          setResignationData((prev) => ({
                            ...prev,
                            template: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="grateful">Grateful</SelectItem>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="career-change">Career Change</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={downloadResignationLetter}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="w-full" onClick={saveResignationLetter}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Resignation Letter
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resignation Letter Checklist</CardTitle>
                    <CardDescription>Make sure your letter is complete and professional</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Clear statement of resignation</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Last working day specified</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Professional and positive tone</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Expression of gratitude included</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Offer to assist with transition</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Professional closing</span>
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
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={saveResignationLetter}>
                Save and Finish
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

