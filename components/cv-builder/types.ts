export interface PersonalDetails {
  name: string
  title: string
  email?: string
  phone?: string
  location?: string
  website?: string
}

export interface Experience {
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  responsibilities: string[]
}

export interface Education {
  institution: string
  degree: string
  location?: string
  startDate: string
  endDate?: string
  achievements?: string[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
}

export interface Reference {
  name: string
  position: string
  company: string
  contact?: string
}

export interface CVData {
  personalDetails: PersonalDetails
  summary?: string
  experience?: Experience[]
  education?: Education[]
  skills?: string[]
  certifications?: Certification[]
  references?: Reference[]
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export interface CVBuilderState {
  messages: Message[]
  cvData: CVData
  template: "modern" | "classic" | "minimal"
  currentSection: "personal" | "summary" | "experience" | "education" | "skills" | "certifications" | "references"
}

