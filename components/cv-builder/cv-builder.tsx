"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import type { CVData, Message, CVBuilderState } from "./types"
import ChatInterface from "./chat-interface"
import CVPreview from "./cv-preview"
import { Download, FileText, Copy } from "lucide-react"

const initialCVData: CVData = {
  personalDetails: {
    name: "",
    title: "",
  },
}

const welcomeMessage: Message = {
  id: uuidv4(),
  role: "assistant",
  content:
    "Welcome to the CV Builder! I'll help you create a professional CV. You can see your CV being built in real-time in the preview pane. Would you like to start from scratch or use a template?",
}

export default function CVBuilder() {
  const [state, setState] = useState<CVBuilderState>({
    messages: [welcomeMessage],
    cvData: initialCVData,
    template: "modern",
    currentSection: "personal",
  })

  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content,
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }))

    // Simulate AI response
    setIsTyping(true)
    setTimeout(() => {
      processUserInput(content)
      setIsTyping(false)
    }, 1000)
  }

  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase()
    let response = ""
    const updatedData = { ...state.cvData }

    // Process based on current section
    if (state.currentSection === "personal") {
      if (lowerInput.includes("name") || lowerInput.includes("i am") || lowerInput.includes("my name")) {
        // Extract name
        const nameMatch = input.match(/(?:name is|I am|my name is) ([A-Za-z\s]+)/i)
        if (nameMatch && nameMatch[1]) {
          const name = nameMatch[1].trim()
          updatedData.personalDetails.name = name
          response = `Great! I've added your name: ${name}. What's your professional title or current position?`
          setState((prev) => ({
            ...prev,
            cvData: updatedData,
          }))
        } else {
          response = "Could you please provide your full name?"
        }
      } else if (lowerInput.includes("title") || lowerInput.includes("position") || lowerInput.includes("job")) {
        // Extract title
        const title = input.replace(/(?:title is|position is|job is|i am a|i'm a)/i, "").trim()
        updatedData.personalDetails.title = title
        response = `I've added your title: ${title}. Now, let's add your contact information. What's your email address?`
        setState((prev) => ({
          ...prev,
          cvData: updatedData,
        }))
      } else if (lowerInput.includes("email")) {
        // Extract email
        const emailMatch = input.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i)
        if (emailMatch && emailMatch[1]) {
          const email = emailMatch[1].trim()
          updatedData.personalDetails.email = email
          response = `I've added your email: ${email}. What's your phone number?`
          setState((prev) => ({
            ...prev,
            cvData: updatedData,
          }))
        } else {
          response = "Could you please provide a valid email address?"
        }
      } else if (lowerInput.includes("phone")) {
        // Extract phone
        const phoneMatch = input.match(/(\+?[\d\s()-]{10,})/i)
        if (phoneMatch && phoneMatch[1]) {
          const phone = phoneMatch[1].trim()
          updatedData.personalDetails.phone = phone
          response = `I've added your phone number: ${phone}. Where are you located (city, country)?`
          setState((prev) => ({
            ...prev,
            cvData: updatedData,
          }))
        } else {
          response = "Could you please provide your phone number?"
        }
      } else if (lowerInput.includes("location") || lowerInput.includes("city") || lowerInput.includes("country")) {
        // Extract location
        const location = input.replace(/(?:location is|i live in|i am in|i'm in|i am from|i'm from)/i, "").trim()
        updatedData.personalDetails.location = location
        response = `I've added your location: ${location}. Do you have a personal website or LinkedIn profile you'd like to include?`
        setState((prev) => ({
          ...prev,
          cvData: updatedData,
        }))
      } else if (lowerInput.includes("website") || lowerInput.includes("linkedin")) {
        // Extract website
        const websiteMatch = input.match(/(https?:\/\/[^\s]+|[^\s]+\.[^\s]+)/i)
        if (websiteMatch && websiteMatch[1]) {
          const website = websiteMatch[1].trim()
          updatedData.personalDetails.website = website
          response = `I've added your website: ${website}. Now, let's move on to your professional summary. Please provide a brief overview of your professional background and key strengths.`
          setState((prev) => ({
            ...prev,
            cvData: updatedData,
            currentSection: "summary",
          }))
        } else {
          response = "Could you please provide your website URL?"
        }
      } else if (lowerInput.includes("template")) {
        if (lowerInput.includes("modern")) {
          setState((prev) => ({
            ...prev,
            template: "modern",
          }))
          response = "I've set your CV template to Modern. Let's continue with your personal details."
        } else if (lowerInput.includes("classic")) {
          setState((prev) => ({
            ...prev,
            template: "classic",
          }))
          response = "I've set your CV template to Classic. Let's continue with your personal details."
        } else if (lowerInput.includes("minimal")) {
          setState((prev) => ({
            ...prev,
            template: "minimal",
          }))
          response = "I've set your CV template to Minimal. Let's continue with your personal details."
        } else {
          response = "I offer three templates: Modern, Classic, and Minimal. Which one would you prefer?"
        }
      } else {
        response = "Let's start by adding your personal details. What's your full name?"
      }
    } else if (state.currentSection === "summary") {
      if (input.length > 20) {
        updatedData.summary = input
        response =
          "Great summary! Now, let's add your work experience. Please provide details about your most recent position (job title, company name, dates, and key responsibilities)."
        setState((prev) => ({
          ...prev,
          cvData: updatedData,
          currentSection: "experience",
        }))
      } else {
        response =
          "Could you provide a more detailed professional summary? This should highlight your key strengths and career objectives."
      }
    } else if (state.currentSection === "experience") {
      if (lowerInput.includes("title") && lowerInput.includes("company")) {
        // Extract job details
        const titleMatch = input.match(/title[:\s]+([^,]+)/i)
        const companyMatch = input.match(/company[:\s]+([^,]+)/i)
        const datesMatch = input.match(/dates?[:\s]+([^,]+)/i)

        if (titleMatch && companyMatch) {
          const title = titleMatch[1].trim()
          const company = companyMatch[1].trim()
          const dates = datesMatch ? datesMatch[1].trim() : ""

          // Initialize experience array if it doesn't exist
          if (!updatedData.experience) {
            updatedData.experience = []
          }

          // Add new experience
          updatedData.experience.push({
            title,
            company,
            startDate: dates.split("-")[0]?.trim() || "2020",
            endDate: dates.split("-")[1]?.trim() || "Present",
            responsibilities: [],
          })

          response = `I've added your position at ${company}. Now, please list some key responsibilities or achievements for this role (one at a time).`
          setState((prev) => ({
            ...prev,
            cvData: updatedData,
          }))
        } else {
          response =
            "Please provide your job title and company name in the format: Title: [Your Title], Company: [Company Name], Dates: [Start-End]"
        }
      } else if (updatedData.experience && updatedData.experience.length > 0) {
        // Add responsibility to the most recent experience
        const lastExperienceIndex = updatedData.experience.length - 1

        if (!updatedData.experience[lastExperienceIndex].responsibilities) {
          updatedData.experience[lastExperienceIndex].responsibilities = []
        }

        updatedData.experience[lastExperienceIndex].responsibilities.push(input)

        response =
          "I've added this responsibility. Would you like to add another responsibility or achievement for this role? Or type 'next' to move on to education."

        setState((prev) => ({
          ...prev,
          cvData: updatedData,
        }))
      } else if (lowerInput === "next" || lowerInput === "education") {
        response =
          "Great! Now let's add your education. Please provide details about your most recent education (degree, institution, dates)."
        setState((prev) => ({
          ...prev,
          currentSection: "education",
        }))
      } else {
        response =
          "Let's add your work experience. Please provide your job title, company name, and dates in the format: Title: [Your Title], Company: [Company Name], Dates: [Start-End]"
      }
    } else if (state.currentSection === "education") {
      if (lowerInput.includes("degree") && lowerInput.includes("institution")) {
        // Extract education details
        const degreeMatch = input.match(/degree[:\s]+([^,]+)/i)
        const institutionMatch = input.match(/institution[:\s]+([^,]+)/i)
        const datesMatch = input.match(/dates?[:\s]+([^,]+)/i)

        if (degreeMatch && institutionMatch) {
          const degree = degreeMatch[1].trim()
          const institution = institutionMatch[1].trim()
          const dates = datesMatch ? datesMatch[1].trim() : ""

          // Initialize education array if it doesn't exist
          if (!updatedData.education) {
            updatedData.education = []
          }

          // Add new education
          updatedData.education.push({
            degree,
            institution,
            startDate: dates.split("-")[0]?.trim() || "2016",
            endDate: dates.split("-")[1]?.trim() || "2020",
            achievements: [],
          })

          response = `I've added your education at ${institution}. Would you like to add any achievements or notable coursework? Or type 'next' to move on to skills.`
          setState((prev) => ({
            ...prev,
            cvData: updatedData,
          }))
        } else {
          response =
            "Please provide your degree and institution in the format: Degree: [Your Degree], Institution: [Institution Name], Dates: [Start-End]"
        }
      } else if (
        updatedData.education &&
        updatedData.education.length > 0 &&
        lowerInput !== "next" &&
        lowerInput !== "skills"
      ) {
        // Add achievement to the most recent education
        const lastEducationIndex = updatedData.education.length - 1

        if (!updatedData.education[lastEducationIndex].achievements) {
          updatedData.education[lastEducationIndex].achievements = []
        }

        updatedData.education[lastEducationIndex].achievements.push(input)

        response =
          "I've added this achievement. Would you like to add another achievement? Or type 'next' to move on to skills."

        setState((prev) => ({
          ...prev,
          cvData: updatedData,
        }))
      } else if (lowerInput === "next" || lowerInput === "skills") {
        response =
          "Now, let's list your skills. Please provide your key skills (technical, soft skills, languages, etc.) one by one, or as a comma-separated list."
        setState((prev) => ({
          ...prev,
          currentSection: "skills",
        }))
      } else {
        response =
          "Let's add your education. Please provide your degree, institution, and dates in the format: Degree: [Your Degree], Institution: [Institution Name], Dates: [Start-End]"
      }
    } else if (state.currentSection === "skills") {
      if (lowerInput !== "next" && lowerInput !== "certifications") {
        // Initialize skills array if it doesn't exist
        if (!updatedData.skills) {
          updatedData.skills = []
        }

        // Check if input contains multiple skills (comma-separated)
        if (input.includes(",")) {
          const skillsList = input
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0)
          updatedData.skills = [...updatedData.skills, ...skillsList]
        } else {
          updatedData.skills.push(input)
        }

        response =
          "I've added this skill. Would you like to add more skills? Or type 'next' to move on to certifications."

        setState((prev) => ({
          ...prev,
          cvData: updatedData,
        }))
      } else if (lowerInput === "next" || lowerInput === "certifications") {
        response =
          "Great! Do you have any certifications or courses you'd like to add? Please provide them in the format: Name: [Certification Name], Issuer: [Issuing Organization], Date: [Completion Date]"
        setState((prev) => ({
          ...prev,
          currentSection: "certifications",
        }))
      }
    } else if (state.currentSection === "certifications") {
      if (
        lowerInput.includes("name") &&
        lowerInput.includes("issuer") &&
        !lowerInput.includes("next") &&
        !lowerInput.includes("references")
      ) {
        // Extract certification details
        const nameMatch = input.match(/name[:\s]+([^,]+)/i)
        const issuerMatch = input.match(/issuer[:\s]+([^,]+)/i)
        const dateMatch = input.match(/date[:\s]+([^,]+)/i)

        if (nameMatch && issuerMatch) {
          const name = nameMatch[1].trim()
          const issuer = issuerMatch[1].trim()
          const date = dateMatch ? dateMatch[1].trim() : "2023"

          // Initialize certifications array if it doesn't exist
          if (!updatedData.certifications) {
            updatedData.certifications = []
          }

          // Add new certification
          updatedData.certifications.push({
            name,
            issuer,
            date,
          })

          response = `I've added your ${name} certification. Would you like to add another certification? Or type 'next' to move on to references.`
          setState((prev) => ({
            ...prev,
            cvData: updatedData,
          }))
        } else {
          response =
            "Please provide your certification in the format: Name: [Certification Name], Issuer: [Issuing Organization], Date: [Completion Date]"
        }
      } else if (lowerInput === "next" || lowerInput === "references") {
        response =
          "Would you like to add any references? Please provide them in the format: Name: [Reference Name], Position: [Their Position], Company: [Their Company], Contact: [Email or Phone]"
        setState((prev) => ({
          ...prev,
          currentSection: "references",
        }))
      } else if (lowerInput === "skip" || lowerInput === "no") {
        response =
          "No problem. Would you like to add any references? Please provide them in the format: Name: [Reference Name], Position: [Their Position], Company: [Their Company], Contact: [Email or Phone]"
        setState((prev) => ({
          ...prev,
          currentSection: "references",
        }))
      } else {
        response =
          "Do you have any certifications you'd like to add? Please provide them in the format: Name: [Certification Name], Issuer: [Issuing Organization], Date: [Completion Date]. Or type 'skip' to move on."
      }
    } else if (state.currentSection === "references") {
      if (
        lowerInput.includes("name") &&
        lowerInput.includes("position") &&
        !lowerInput.includes("finish") &&
        !lowerInput.includes("done")
      ) {
        // Extract reference details
        const nameMatch = input.match(/name[:\s]+([^,]+)/i)
        const positionMatch = input.match(/position[:\s]+([^,]+)/i)
        const companyMatch = input.match(/company[:\s]+([^,]+)/i)
        const contactMatch = input.match(/contact[:\s]+([^,]+)/i)

        if (nameMatch && positionMatch && companyMatch) {
          const name = nameMatch[1].trim()
          const position = positionMatch[1].trim()
          const company = companyMatch[1].trim()
          const contact = contactMatch ? contactMatch[1].trim() : ""

          // Initialize references array if it doesn't exist
          if (!updatedData.references) {
            updatedData.references = []
          }

          // Add new reference
          updatedData.references.push({
            name,
            position,
            company,
            contact,
          })

          response = `I've added ${name} as a reference. Would you like to add another reference? Or type 'finish' to complete your CV.`
          setState((prev) => ({
            ...prev,
            cvData: updatedData,
          }))
        } else {
          response =
            "Please provide your reference in the format: Name: [Reference Name], Position: [Their Position], Company: [Their Company], Contact: [Email or Phone]"
        }
      } else if (lowerInput === "finish" || lowerInput === "done" || lowerInput === "complete") {
        response =
          "Congratulations! Your CV is now complete. You can download it or make any final edits. Is there anything specific you'd like to change or improve?"
      } else if (lowerInput === "skip" || lowerInput === "no") {
        response =
          "No problem. Your CV is now complete! You can download it or make any final edits. Is there anything specific you'd like to change or improve?"
      } else {
        response =
          "Would you like to add any references? Please provide them in the format: Name: [Reference Name], Position: [Their Position], Company: [Their Company], Contact: [Email or Phone]. Or type 'skip' to finish your CV."
      }
    }

    // Add AI response
    const aiMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content: response,
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, aiMessage],
    }))
  }

  const handleDownloadCV = () => {
    alert("Download functionality would be implemented here")
  }

  const handleCopyCV = () => {
    alert("Copy to clipboard functionality would be implemented here")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="h-full">
        <ChatInterface
          messages={state.messages}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          className="h-full"
        />
      </div>

      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">CV Preview</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setState((prev) => ({ ...prev, template: "modern" }))}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                state.template === "modern"
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700",
              )}
            >
              Modern
            </button>
            <button
              onClick={() => setState((prev) => ({ ...prev, template: "classic" }))}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                state.template === "classic"
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700",
              )}
            >
              Classic
            </button>
            <button
              onClick={() => setState((prev) => ({ ...prev, template: "minimal" }))}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                state.template === "minimal"
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700",
              )}
            >
              Minimal
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-auto">
          <CVPreview data={state.cvData} template={state.template} />

          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={handleCopyCV}
              className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownloadCV}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

