"use client"

import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import type { ResumeData } from "../types"

interface TemplateThreeProps {
  data: ResumeData
}

export default function TemplateThree({ data }: TemplateThreeProps) {
  return (
    <div className="w-full h-full flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-zinc-800 text-white p-8">
        {/* Profile Photo */}
        {data.photo && (
          <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden">
            <Image src={data.photo || "/placeholder.svg"} alt={data.fullName} fill className="object-cover" />
          </div>
        )}

        {/* About Me */}
        {data.about && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">About Me</h2>
            <p className="text-zinc-300">{data.about}</p>
          </div>
        )}

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <div className="space-y-3">
            {data.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>{data.phone}</span>
              </div>
            )}
            {data.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>{data.email}</span>
              </div>
            )}
            {data.location && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>{data.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="space-y-3">
              {data.skills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <span>{skill.name}</span>
                  <div className="h-1.5 bg-zinc-700 rounded-full">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Languages</h2>
            <div className="space-y-3">
              {data.languages.map((language, index) => (
                <div key={index} className="space-y-1">
                  <span>{language.name}</span>
                  <div className="h-1.5 bg-zinc-700 rounded-full">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${language.proficiency}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{data.fullName}</h1>
          <h2 className="text-xl text-zinc-600">{data.title}</h2>
        </div>

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-purple-500">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-purple-500 rounded-full" />
                  <div className="mb-2">
                    <h3 className="text-lg font-medium">{exp.title}</h3>
                    <p className="text-zinc-600">{exp.company}</p>
                    <p className="text-sm text-zinc-500">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </p>
                  </div>
                  <p className="text-zinc-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-purple-500">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-purple-500 rounded-full" />
                  <div className="mb-2">
                    <h3 className="text-lg font-medium">{edu.degree}</h3>
                    <p className="text-zinc-600">{edu.school}</p>
                    <p className="text-sm text-zinc-500">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </p>
                  </div>
                  {edu.description && <p className="text-zinc-600">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

