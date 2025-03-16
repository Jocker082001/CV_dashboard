export interface ResumeData {
  fullName: string
  title: string
  photo?: string
  email?: string
  phone?: string
  location?: string
  about?: string
  experience?: {
    title: string
    company: string
    location?: string
    startDate: string
    endDate?: string
    description: string
  }[]
  education?: {
    degree: string
    school: string
    location?: string
    startDate: string
    endDate?: string
    description?: string
  }[]
  skills?: {
    name: string
    level: number
  }[]
  languages?: {
    name: string
    level: string
    proficiency: number
  }[]
}

