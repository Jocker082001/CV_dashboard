"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Check } from "lucide-react"

interface OnboardingFlowProps {
  email: string
  onComplete: () => void
}

type Step = {
  title: string
  description: string
}

const steps: Step[] = [
  {
    title: "Personal Information",
    description: "Tell us about yourself",
  },
  {
    title: "Professional Background",
    description: "Share your work experience",
  },
  {
    title: "Career Goals",
    description: "Let us know what you're looking for",
  },
  {
    title: "Complete",
    description: "Your account is ready",
  },
]

export function OnboardingFlow({ email, onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Personal information
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")

  // Professional background
  const [jobTitle, setJobTitle] = useState("")
  const [experience, setExperience] = useState("")
  const [industry, setIndustry] = useState("")

  // Career goals
  const [jobSearchStatus, setJobSearchStatus] = useState("")
  const [desiredRole, setDesiredRole] = useState("")
  const [goals, setGoals] = useState("")

  const handleNext = async () => {
    if (currentStep === steps.length - 2) {
      // Last step before completion
      setIsLoading(true)

      // Simulate API call to save all data
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsLoading(false)
      setCurrentStep(currentStep + 1)
    } else if (currentStep === steps.length - 1) {
      // Complete onboarding
      onComplete()
    } else {
      // Move to next step
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    if (currentStep === 0) {
      return firstName.trim() !== "" && lastName.trim() !== ""
    } else if (currentStep === 1) {
      return jobTitle.trim() !== "" && industry !== ""
    } else if (currentStep === 2) {
      return jobSearchStatus !== "" && desiredRole.trim() !== ""
    }
    return true
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${index > currentStep ? "text-gray-400" : "text-purple-600"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  index < currentStep
                    ? "bg-purple-600 text-white"
                    : index === currentStep
                      ? "border-2 border-purple-600 text-purple-600"
                      : "border-2 border-gray-200 text-gray-400"
                }`}
              >
                {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span className="text-xs hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
          <div
            className="bg-purple-600 h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="py-4">
        <h2 className="text-xl font-bold">{steps[currentStep].title}</h2>
        <p className="text-gray-500">{steps[currentStep].description}</p>

        {currentStep === 0 && (
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name *</Label>
                <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name *</Label>
                <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (optional)</Label>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="job-title">Current Job Title *</Label>
              <Input id="job-title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select years of experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label>Job Search Status *</Label>
              <RadioGroup value={jobSearchStatus} onValueChange={setJobSearchStatus}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="actively-looking" id="actively-looking" />
                  <Label htmlFor="actively-looking">Actively looking for a job</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="open-to-opportunities" id="open-to-opportunities" />
                  <Label htmlFor="open-to-opportunities">Open to opportunities</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-looking" id="not-looking" />
                  <Label htmlFor="not-looking">Not currently looking</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="desired-role">Desired Role/Position *</Label>
              <Input id="desired-role" value={desiredRole} onChange={(e) => setDesiredRole(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goals">Career Goals (optional)</Label>
              <Textarea
                id="goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="What are you hoping to achieve in your career?"
                className="min-h-[100px]"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4 mt-6 text-center">
            <div className="mx-auto bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Your account is ready!</h3>
            <p className="text-gray-500">
              Thank you for completing your profile, {firstName}. You're all set to start using CareerBoost to
              accelerate your career journey.
            </p>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
        {currentStep > 0 && currentStep < steps.length - 1 ? (
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div></div>
        )}
        <Button
          type="button"
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleNext}
          disabled={!isStepValid() || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : currentStep === steps.length - 1 ? (
            "Go to Dashboard"
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  )
}

