"use client"

import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import type { ResumeData } from "../types"

interface TemplateOneProps {
  data: ResumeData
}

export default function TemplateOne({ data }: TemplateOneProps) {
  return (
    <div className="w-full h-full bg-white flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-zinc-50 p-8 flex flex-col">
        {/* Profile Photo */}
        {data.photo && (
          <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
            <Image src={data.photo || "/placeholder.svg"} alt={data.fullName} fill className="object-cover" />
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-3 mb-8">
          {data.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-zinc-600" />
              <span className="text-sm">{data.phone}</span>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-zinc-600" />
              <span className="text-sm">{data.email}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-600" />
              <span className="text-sm">{data.location}</span>
            </div>
          )}
        </div>

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Languages</h3>
            <div className="space-y-2">
              {data.languages.map((language, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">{language.name}</span>
                    <span className="text-sm text-zinc-600">{language.level}</span>
                  </div>
                  <div className="h-1.5 bg-zinc-200 rounded-full">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: `${language.proficiency}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Skills</h3>
            <div className="space-y-2">
              {data.skills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">{skill.name}</span>
                  </div>
                  <div className="h-1.5 bg-zinc-200 rounded-full">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{data.fullName}</h1>
          <h2 className="text-xl text-zinc-600">{data.title}</h2>
        </div>

        {/* About */}
        {data.about && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-zinc-600">{data.about}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Experience</h3>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{exp.title}</h4>
                      <p className="text-zinc-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-zinc-500">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
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
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-zinc-600">{edu.school}</p>
                    </div>
                    <span className="text-sm text-zinc-500">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </span>
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

