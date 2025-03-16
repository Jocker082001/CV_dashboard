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
  Briefcase,
  GraduationCap,
  Star,
  Award,
  Phone,
  Mail,
  MapPin,
  Globe,
  Plus,
  Trash2,
  Save,
  Download,
  Eye,
  CheckCircle,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import CVPreview from "@/components/cv-builder/cv-preview"
import type { CVData } from "@/components/cv-builder/types"

// Resume template options
const templates = [
  { id: "modern", name: "Modern", image: "/placeholder.svg?height=200&width=150" },
  { id: "classic", name: "Classic", image: "/placeholder.svg?height=200&width=150" },
  { id: "minimal", name: "Minimal", image: "/placeholder.svg?height=200&width=150" },
]

// Steps in the resume building process
const steps = [
  { id: "template", title: "Choose Template", icon: FileText },
  { id: "personal", title: "Personal Details", icon: User },
  { id: "summary", title: "Professional Summary", icon: FileText },
  { id: "experience", title: "Work Experience", icon: Briefcase },
  { id: "education", title: "Education", icon: GraduationCap },
  { id: "skills", title: "Skills", icon: Star },
  { id: "certifications", title: "Certifications", icon: Award },
  { id: "preview", title: "Preview & Download", icon: Eye },
]

export default function BuildResumePage() {
  // State for tracking current step
  const [currentStep, setCurrentStep] = useState("template")

  // State for resume data
  const [resumeData, setResumeData] = useState<CVData>({
    personalDetails: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
    },
    summary: "",
    experience: [
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        responsibilities: [""],
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        location: "",
        startDate: "",
        endDate: "",
        achievements: [],
      },
    ],
    skills: [],
    certifications: [],
    references: [],
  })

  // State for selected template
  const [selectedTemplate, setSelectedTemplate] = useState<"modern" | "classic" | "minimal">("modern")

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

  // Function to update personal details
  const updatePersonalDetails = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [field]: value,
      },
    }))
  }

  // Function to update summary
  const updateSummary = (value: string) => {
    setResumeData((prev) => ({
      ...prev,
      summary: value,
    }))
  }

  // Function to add a new experience entry
  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          responsibilities: [""],
        },
      ],
    }))
  }

  // Function to update an experience entry
  const updateExperience = (index: number, field: string, value: string) => {
    setResumeData((prev) => {
      const updatedExperience = [...(prev.experience || [])]
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value,
      }
      return {
        ...prev,
        experience: updatedExperience,
      }
    })
  }

  // Function to add a responsibility to an experience entry
  const addResponsibility = (experienceIndex: number) => {
    setResumeData((prev) => {
      const updatedExperience = [...(prev.experience || [])]
      updatedExperience[experienceIndex] = {
        ...updatedExperience[experienceIndex],
        responsibilities: [...updatedExperience[experienceIndex].responsibilities, ""],
      }
      return {
        ...prev,
        experience: updatedExperience,
      }
    })
  }

  // Function to update a responsibility
  const updateResponsibility = (experienceIndex: number, responsibilityIndex: number, value: string) => {
    setResumeData((prev) => {
      const updatedExperience = [...(prev.experience || [])]
      const updatedResponsibilities = [...updatedExperience[experienceIndex].responsibilities]
      updatedResponsibilities[responsibilityIndex] = value
      updatedExperience[experienceIndex] = {
        ...updatedExperience[experienceIndex],
        responsibilities: updatedResponsibilities,
      }
      return {
        ...prev,
        experience: updatedExperience,
      }
    })
  }

  // Function to remove an experience entry
  const removeExperience = (index: number) => {
    setResumeData((prev) => {
      const updatedExperience = [...(prev.experience || [])]
      updatedExperience.splice(index, 1)
      return {
        ...prev,
        experience: updatedExperience.length
          ? updatedExperience
          : [
              {
                title: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                responsibilities: [""],
              },
            ],
      }
    })
  }

  // Function to add a new education entry
  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          institution: "",
          degree: "",
          location: "",
          startDate: "",
          endDate: "",
          achievements: [],
        },
      ],
    }))
  }

  // Function to update an education entry
  const updateEducation = (index: number, field: string, value: string) => {
    setResumeData((prev) => {
      const updatedEducation = [...(prev.education || [])]
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value,
      }
      return {
        ...prev,
        education: updatedEducation,
      }
    })
  }

  // Function to remove an education entry
  const removeEducation = (index: number) => {
    setResumeData((prev) => {
      const updatedEducation = [...(prev.education || [])]
      updatedEducation.splice(index, 1)
      return {
        ...prev,
        education: updatedEducation.length
          ? updatedEducation
          : [
              {
                institution: "",
                degree: "",
                location: "",
                startDate: "",
                endDate: "",
                achievements: [],
              },
            ],
      }
    })
  }

  // Function to update skills
  const updateSkills = (skillsString: string) => {
    const skillsArray = skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "")
    setResumeData((prev) => ({
      ...prev,
      skills: skillsArray,
    }))
  }

  // Function to add a new certification
  const addCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [
        ...(prev.certifications || []),
        {
          name: "",
          issuer: "",
          date: "",
        },
      ],
    }))
  }

  // Function to update a certification
  const updateCertification = (index: number, field: string, value: string) => {
    setResumeData((prev) => {
      const updatedCertifications = [...(prev.certifications || [])]
      updatedCertifications[index] = {
        ...updatedCertifications[index],
        [field]: value,
      }
      return {
        ...prev,
        certifications: updatedCertifications,
      }
    })
  }

  // Function to remove a certification
  const removeCertification = (index: number) => {
    setResumeData((prev) => {
      const updatedCertifications = [...(prev.certifications || [])]
      updatedCertifications.splice(index, 1)
      return {
        ...prev,
        certifications: updatedCertifications,
      }
    })
  }

  // Function to save resume
  const saveResume = () => {
    // In a real app, this would save to a database
    alert("Resume saved successfully!")
  }

  // Function to download resume
  const downloadResume = () => {
    // In a real app, this would generate a PDF
    alert("Resume download functionality would be implemented here")
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
                  onClick={() => setSelectedTemplate(template.id as "modern" | "classic" | "minimal")}
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

        {/* Personal Details Step */}
        {currentStep === "personal" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Personal Details</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Add your contact information so employers can reach you
            </p>

            <Card className="mb-8">
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={resumeData.personalDetails.name}
                      onChange={(e) => updatePersonalDetails("name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      placeholder="Senior Product Manager"
                      value={resumeData.personalDetails.title}
                      onChange={(e) => updatePersonalDetails("title", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                      <Input
                        id="email"
                        placeholder="john.doe@example.com"
                        className="pl-10"
                        value={resumeData.personalDetails.email}
                        onChange={(e) => updatePersonalDetails("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                        value={resumeData.personalDetails.phone}
                        onChange={(e) => updatePersonalDetails("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                      <Input
                        id="location"
                        placeholder="San Francisco, CA"
                        className="pl-10"
                        value={resumeData.personalDetails.location}
                        onChange={(e) => updatePersonalDetails("location", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website/LinkedIn (Optional)</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                      <Input
                        id="website"
                        placeholder="linkedin.com/in/johndoe"
                        className="pl-10"
                        value={resumeData.personalDetails.website}
                        onChange={(e) => updatePersonalDetails("website", e.target.value)}
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

        {/* Professional Summary Step */}
        {currentStep === "summary" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Professional Summary</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Write a compelling summary that highlights your key strengths and career objectives
            </p>

            <Card className="mb-8">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/30"
                      onClick={() => {
                        // In a real implementation, this would call an AI service
                        const improvedSummary =
                          "Results-driven professional with 8+ years of experience in product management and strategic leadership. Demonstrated success in driving product innovation, optimizing user experiences, and delivering solutions that increased revenue by 35% and user engagement by 40%. Skilled in cross-functional team leadership, agile methodologies, and translating business requirements into successful product roadmaps."
                        updateSummary(improvedSummary)
                      }}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Improve with AI</span>
                    </Button>
                  </div>
                  <Textarea
                    id="summary"
                    placeholder="Experienced product manager with 8+ years of experience driving product strategy and execution. Proven track record of launching successful products that increase revenue and user engagement."
                    className="min-h-[200px]"
                    value={resumeData.summary}
                    onChange={(e) => updateSummary(e.target.value)}
                  />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Click "Improve with AI" to generate a professional summary based on your experience and skills.
                  </p>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                    Tips for a great summary:
                  </h3>
                  <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 list-disc list-inside">
                    <li>Keep it concise (3-5 sentences)</li>
                    <li>Highlight your most relevant skills and achievements</li>
                    <li>Tailor it to the types of jobs you're applying for</li>
                    <li>Include years of experience and key specialties</li>
                    <li>Use strong action verbs and quantify achievements when possible</li>
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

        {/* Work Experience Step */}
        {currentStep === "experience" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Work Experience</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Add your work history, starting with your most recent position
            </p>

            {resumeData.experience?.map((experience, index) => (
              <Card key={index} className="mb-6">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Position {index + 1}</CardTitle>
                    {resumeData.experience && resumeData.experience.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor={`job-title-${index}`}>Job Title</Label>
                      <Input
                        id={`job-title-${index}`}
                        placeholder="Senior Product Manager"
                        value={experience.title}
                        onChange={(e) => updateExperience(index, "title", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`company-${index}`}>Company</Label>
                      <Input
                        id={`company-${index}`}
                        placeholder="TechCorp Inc."
                        value={experience.company}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`job-location-${index}`}>Location (Optional)</Label>
                      <Input
                        id={`job-location-${index}`}
                        placeholder="San Francisco, CA"
                        value={experience.location}
                        onChange={(e) => updateExperience(index, "location", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                        <Input
                          id={`start-date-${index}`}
                          placeholder="Jan 2020"
                          value={experience.startDate}
                          onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`end-date-${index}`}>End Date</Label>
                        <Input
                          id={`end-date-${index}`}
                          placeholder="Present"
                          value={experience.endDate}
                          onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Responsibilities & Achievements</Label>
                    {experience.responsibilities.map((responsibility, respIndex) => (
                      <div key={respIndex} className="flex gap-2 items-center">
                        <Input
                          placeholder="Led product strategy and roadmap for flagship SaaS platform"
                          value={responsibility}
                          onChange={(e) => updateResponsibility(index, respIndex, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="flex-shrink-0 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/30"
                          onClick={() => {
                            // In a real implementation, this would call an AI service
                            const improvedText = responsibility
                              ? responsibility.replace(
                                  /^(managed|worked on|helped with|responsible for|did)/i,
                                  "Spearheaded",
                                ) + " resulting in 25% improvement in efficiency"
                              : "Spearheaded strategic initiatives that increased team productivity by 30% and reduced costs by 15%"
                            updateResponsibility(index, respIndex, improvedText)
                          }}
                          title="Improve with AI"
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addResponsibility(index)} className="mt-2">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Responsibility
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="mb-8 w-full py-6 border-dashed" onClick={addExperience}>
              <Plus className="w-4 h-4 mr-1" />
              Add Another Position
            </Button>

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

        {/* Education Step */}
        {currentStep === "education" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Education</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Add your educational background, starting with your highest degree
            </p>

            {resumeData.education?.map((education, index) => (
              <Card key={index} className="mb-6">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Education {index + 1}</CardTitle>
                    {resumeData.education && resumeData.education.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${index}`}>Degree</Label>
                      <Input
                        id={`degree-${index}`}
                        placeholder="Bachelor of Science in Computer Science"
                        value={education.degree}
                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`institution-${index}`}>Institution</Label>
                      <Input
                        id={`institution-${index}`}
                        placeholder="University of California, Berkeley"
                        value={education.institution}
                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`edu-location-${index}`}>Location (Optional)</Label>
                      <Input
                        id={`edu-location-${index}`}
                        placeholder="Berkeley, CA"
                        value={education.location}
                        onChange={(e) => updateEducation(index, "location", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`edu-start-date-${index}`}>Start Date</Label>
                        <Input
                          id={`edu-start-date-${index}`}
                          placeholder="Sep 2016"
                          value={education.startDate}
                          onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`edu-end-date-${index}`}>End Date</Label>
                        <Input
                          id={`edu-end-date-${index}`}
                          placeholder="May 2020"
                          value={education.endDate}
                          onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="mb-8 w-full py-6 border-dashed" onClick={addEducation}>
              <Plus className="w-4 h-4 mr-1" />
              Add Another Education
            </Button>

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

        {/* Skills Step */}
        {currentStep === "skills" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Skills</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">Add your key skills and competencies</p>

            <Card className="mb-8">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="skills">Skills (comma separated)</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/30"
                      onClick={() => {
                        // In a real implementation, this would call an AI service
                        const improvedSkills =
                          "Product Management, Agile Methodologies, User Research, Data Analysis, Cross-functional Leadership, Strategic Planning, Stakeholder Communication, Product Roadmapping, A/B Testing, User Experience Design, Market Analysis, Product Launch Strategy, KPI Tracking, Customer Journey Mapping, Competitive Analysis"
                        updateSkills(improvedSkills)
                      }}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Suggest Skills with AI</span>
                    </Button>
                  </div>
                  <Textarea
                    id="skills"
                    placeholder="Product Management, Agile Methodologies, User Research, Data Analysis, Cross-functional Leadership, Strategic Planning"
                    className="min-h-[150px]"
                    value={resumeData.skills?.join(", ")}
                    onChange={(e) => updateSkills(e.target.value)}
                  />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Click "Suggest Skills with AI" to generate relevant skills based on your experience and industry.
                  </p>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">Tips for skills:</h3>
                  <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 list-disc list-inside">
                    <li>Include a mix of technical and soft skills</li>
                    <li>Prioritize skills mentioned in job descriptions you're targeting</li>
                    <li>Be specific (e.g., "React.js" instead of just "JavaScript")</li>
                    <li>Include relevant tools and software you're proficient in</li>
                    <li>Consider adding language proficiencies if relevant</li>
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

        {/* Certifications Step */}
        {currentStep === "certifications" && (
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Certifications</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Add any relevant certifications or courses you've completed
            </p>

            {resumeData.certifications && resumeData.certifications.length > 0 ? (
              resumeData.certifications.map((certification, index) => (
                <Card key={index} className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Certification {index + 1}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCertification(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
                        <Input
                          id={`cert-name-${index}`}
                          placeholder="Certified Scrum Master (CSM)"
                          value={certification.name}
                          onChange={(e) => updateCertification(index, "name", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`cert-issuer-${index}`}>Issuing Organization</Label>
                        <Input
                          id={`cert-issuer-${index}`}
                          placeholder="Scrum Alliance"
                          value={certification.issuer}
                          onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`cert-date-${index}`}>Date</Label>
                        <Input
                          id={`cert-date-${index}`}
                          placeholder="May 2022"
                          value={certification.date}
                          onChange={(e) => updateCertification(index, "date", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="mb-6 border-dashed">
                <CardContent className="p-6 text-center">
                  <p className="text-zinc-500 dark:text-zinc-400 mb-4">No certifications added yet</p>
                </CardContent>
              </Card>
            )}

            <Button variant="outline" className="mb-8 w-full py-6 border-dashed" onClick={addCertification}>
              <Plus className="w-4 h-4 mr-1" />
              Add Certification
            </Button>

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
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">Review your resume and make any final adjustments</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <Card>
                  <CardContent className="p-6">
                    <Tabs defaultValue="preview">
                      <div className="flex justify-between items-center mb-4">
                        <TabsList>
                          <TabsTrigger value="preview">Preview</TabsTrigger>
                          <TabsTrigger value="modern">Modern</TabsTrigger>
                          <TabsTrigger value="classic">Classic</TabsTrigger>
                          <TabsTrigger value="minimal">Minimal</TabsTrigger>
                        </TabsList>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open("#", "_blank")}
                          className="flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Full Page Preview</span>
                        </Button>
                      </div>

                      <div className="relative">
                        <TabsContent value="preview" className="border rounded-md p-0 overflow-hidden">
                          <div className="bg-zinc-100 dark:bg-zinc-800 p-2 flex justify-between items-center border-b">
                            <div className="flex space-x-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">Resume Preview</div>
                            <div className="w-4"></div>
                          </div>
                          <div className="p-6 max-h-[600px] overflow-auto bg-white dark:bg-zinc-900">
                            <CVPreview data={resumeData} template={selectedTemplate} />
                          </div>
                        </TabsContent>

                        <TabsContent value="modern" className="border rounded-md p-0 overflow-hidden">
                          <div className="bg-zinc-100 dark:bg-zinc-800 p-2 flex justify-between items-center border-b">
                            <div className="flex space-x-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">Modern Template</div>
                            <div className="w-4"></div>
                          </div>
                          <div className="p-6 max-h-[600px] overflow-auto bg-white dark:bg-zinc-900">
                            <CVPreview data={resumeData} template="modern" />
                          </div>
                        </TabsContent>

                        <TabsContent value="classic" className="border rounded-md p-0 overflow-hidden">
                          <div className="bg-zinc-100 dark:bg-zinc-800 p-2 flex justify-between items-center border-b">
                            <div className="flex space-x-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">Classic Template</div>
                            <div className="w-4"></div>
                          </div>
                          <div className="p-6 max-h-[600px] overflow-auto bg-white dark:bg-zinc-900">
                            <CVPreview data={resumeData} template="classic" />
                          </div>
                        </TabsContent>

                        <TabsContent value="minimal" className="border rounded-md p-0 overflow-hidden">
                          <div className="bg-zinc-100 dark:bg-zinc-800 p-2 flex justify-between items-center border-b">
                            <div className="flex space-x-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">Minimal Template</div>
                            <div className="w-4"></div>
                          </div>
                          <div className="p-6 max-h-[600px] overflow-auto bg-white dark:bg-zinc-900">
                            <CVPreview data={resumeData} template="minimal" />
                          </div>
                        </TabsContent>

                        <div className="absolute bottom-4 right-4 flex gap-2">
                          <Button variant="outline" size="sm" className="bg-white/80 dark:bg-zinc-900/80 shadow-sm">
                            <Download className="w-3.5 h-3.5 mr-1" />
                            <span>Download</span>
                          </Button>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm">
                            <Zap className="w-3.5 h-3.5 mr-1" />
                            <span>Improve with AI</span>
                          </Button>
                        </div>
                      </div>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Options</CardTitle>
                    <CardDescription>Save your resume or download it as a PDF</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resume-name">Resume Name</Label>
                      <Input id="resume-name" placeholder="My Professional Resume" />
                    </div>

                    <div className="space-y-2">
                      <Label>Template</Label>
                      <Select
                        value={selectedTemplate}
                        onValueChange={(value) => setSelectedTemplate(value as "modern" | "classic" | "minimal")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={downloadResume}>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="w-full" onClick={saveResume}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Resume
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resume Checklist</CardTitle>
                    <CardDescription>Make sure your resume is complete and error-free</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Contact information is complete</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Professional summary is concise and impactful</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Work experience includes achievements</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Education section is complete</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Skills are relevant to target positions</span>
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
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => saveResume()}>
                Save and Finish
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

