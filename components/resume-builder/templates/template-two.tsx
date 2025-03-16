"use client"

import type { ResumeData } from "../types"

interface TemplateTwoProps {
  data: ResumeData
}

export default function TemplateTwo({ data }: TemplateTwoProps) {
  return (
    <div className="w-full h-full flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-[#4a2b2b] text-white p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          {data.email && <p className="mb-2">{data.email}</p>}
          {data.phone && <p className="mb-2">{data.phone}</p>}
          {data.location && <p>{data.location}</p>}
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <ul className="list-none space-y-2">
              {data.skills.map((skill, index) => (
                <li key={index}>{skill.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Languages</h2>
            <ul className="list-none space-y-2">
              {data.languages.map((language, index) => (
                <li key={index}>
                  {language.name} - {language.level}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-yellow-400 py-4 px-6 mb-6">
            <h1 className="text-3xl font-bold">{data.fullName}</h1>
          </div>
          {data.about && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Profile</h2>
              <p className="text-zinc-600">{data.about}</p>
            </div>
          )}
        </div>

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{exp.title}</h3>
                    <span className="text-zinc-500">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-zinc-600 mb-1">{exp.company}</p>
                  <p className="text-zinc-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <span className="text-zinc-500">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-zinc-600 mb-1">{edu.school}</p>
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

