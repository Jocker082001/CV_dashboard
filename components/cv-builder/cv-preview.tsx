import { cn } from "@/lib/utils"
import { Mail, Phone, MapPin, Globe, Calendar, Award } from "lucide-react"
import type { CVData } from "./types"

interface CVPreviewProps {
  data: CVData
  template?: "modern" | "classic" | "minimal"
  className?: string
}

export default function CVPreview({ data, template = "modern", className }: CVPreviewProps) {
  if (template === "classic") {
    return <ClassicTemplate data={data} className={className} />
  }

  if (template === "minimal") {
    return <MinimalTemplate data={data} className={className} />
  }

  return <ModernTemplate data={data} className={className} />
}

function ModernTemplate({ data, className }: Omit<CVPreviewProps, "template">) {
  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm",
        className,
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 rounded-t-xl">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
          {data.personalDetails.name || "Your Name"}
        </h1>
        <h2 className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
          {data.personalDetails.title || "Professional Title"}
        </h2>

        <div className="flex flex-wrap gap-4 text-sm">
          {data.personalDetails.email && (
            <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
              <Mail className="w-4 h-4" />
              <span>{data.personalDetails.email}</span>
            </div>
          )}

          {data.personalDetails.phone && (
            <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
              <Phone className="w-4 h-4" />
              <span>{data.personalDetails.phone}</span>
            </div>
          )}

          {data.personalDetails.location && (
            <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
              <MapPin className="w-4 h-4" />
              <span>{data.personalDetails.location}</span>
            </div>
          )}

          {data.personalDetails.website && (
            <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
              <Globe className="w-4 h-4" />
              <span>{data.personalDetails.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Summary */}
        {data.summary && (
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 border-b border-zinc-200 dark:border-zinc-800 pb-1">
              Professional Summary
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">{data.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-1">
              Work Experience
            </h3>
            <div className="space-y-4">
              {data.experience.map((job, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-700">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-600"></div>
                  <div className="mb-1 flex justify-between">
                    <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-50">{job.title}</h4>
                    <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      <span>
                        {job.startDate} - {job.endDate || "Present"}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    <span className="font-medium">{job.company}</span>
                    {job.location && <span> • {job.location}</span>}
                  </div>
                  <ul className="list-disc list-outside ml-4 text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-1">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-700">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-600"></div>
                  <div className="mb-1 flex justify-between">
                    <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-50">{edu.degree}</h4>
                    <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      <span>
                        {edu.startDate} - {edu.endDate || "Present"}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    <span className="font-medium">{edu.institution}</span>
                    {edu.location && <span> • {edu.location}</span>}
                  </div>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="list-disc list-outside ml-4 text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-1">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-1">
              Certifications
            </h3>
            <div className="space-y-2">
              {data.certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-zinc-500 dark:text-zinc-400 mt-0.5" />
                  <div>
                    <div className="text-zinc-900 dark:text-zinc-50 font-medium">{cert.name}</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {cert.issuer} • {cert.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-1">
              References
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.references.map((ref, index) => (
                <div key={index} className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                  <div className="text-zinc-900 dark:text-zinc-50 font-medium">{ref.name}</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {ref.position} at {ref.company}
                  </div>
                  {ref.contact && <div className="text-sm text-zinc-600 dark:text-zinc-400">{ref.contact}</div>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function ClassicTemplate({ data, className }: Omit<CVPreviewProps, "template">) {
  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm",
        className,
      )}
    >
      {/* Header */}
      <div className="p-6 text-center border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-1">
          {data.personalDetails.name || "Your Name"}
        </h1>
        <h2 className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
          {data.personalDetails.title || "Professional Title"}
        </h2>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {data.personalDetails.email && (
            <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
              <Mail className="w-4 h-4" />
              <span>{data.personalDetails.email}</span>
            </div>
          )}

          {data.personalDetails.phone && (
            <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
              <Phone className="w-4 h-4" />
              <span>{data.personalDetails.phone}</span>
            </div>
          )}

          {data.personalDetails.location && (
            <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
              <MapPin className="w-4 h-4" />
              <span>{data.personalDetails.location}</span>
            </div>
          )}

          {data.personalDetails.website && (
            <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
              <Globe className="w-4 h-4" />
              <span>{data.personalDetails.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Summary */}
        {data.summary && (
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 text-center uppercase tracking-wider">
              Professional Summary
            </h3>
            <div className="w-full h-px bg-zinc-300 dark:bg-zinc-700 mb-3"></div>
            <p className="text-zinc-600 dark:text-zinc-400">{data.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 text-center uppercase tracking-wider">
              Work Experience
            </h3>
            <div className="w-full h-px bg-zinc-300 dark:bg-zinc-700 mb-3"></div>
            <div className="space-y-4">
              {data.experience.map((job, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{job.title}</h4>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {job.startDate} - {job.endDate || "Present"}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    {job.company}
                    {job.location && `, ${job.location}`}
                  </div>
                  <ul className="list-disc list-outside ml-5 text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 text-center uppercase tracking-wider">
              Education
            </h3>
            <div className="w-full h-px bg-zinc-300 dark:bg-zinc-700 mb-3"></div>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{edu.degree}</h4>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    {edu.institution}
                    {edu.location && `, ${edu.location}`}
                  </div>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="list-disc list-outside ml-5 text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 text-center uppercase tracking-wider">
              Skills
            </h3>
            <div className="w-full h-px bg-zinc-300 dark:bg-zinc-700 mb-3"></div>
            <div className="flex flex-wrap gap-x-1 gap-y-2">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">{skill}</span>
                  {index < data.skills.length - 1 && <span className="mx-2 text-zinc-400 dark:text-zinc-600">•</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 text-center uppercase tracking-wider">
              Certifications
            </h3>
            <div className="w-full h-px bg-zinc-300 dark:bg-zinc-700 mb-3"></div>
            <div className="space-y-2">
              {data.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between">
                  <div className="text-zinc-900 dark:text-zinc-50 font-medium">
                    {cert.name}, {cert.issuer}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">{cert.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 text-center uppercase tracking-wider">
              References
            </h3>
            <div className="w-full h-px bg-zinc-300 dark:bg-zinc-700 mb-3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.references.map((ref, index) => (
                <div key={index}>
                  <div className="text-zinc-900 dark:text-zinc-50 font-medium">{ref.name}</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {ref.position} at {ref.company}
                  </div>
                  {ref.contact && <div className="text-sm text-zinc-600 dark:text-zinc-400">{ref.contact}</div>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function MinimalTemplate({ data, className }: Omit<CVPreviewProps, "template">) {
  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm",
        className,
      )}
    >
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
          {data.personalDetails.name || "Your Name"}
        </h1>
        <h2 className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
          {data.personalDetails.title || "Professional Title"}
        </h2>

        <div className="flex flex-wrap gap-4 text-sm">
          {data.personalDetails.email && (
            <div className="text-zinc-600 dark:text-zinc-400">{data.personalDetails.email}</div>
          )}

          {data.personalDetails.phone && (
            <div className="text-zinc-600 dark:text-zinc-400">{data.personalDetails.phone}</div>
          )}

          {data.personalDetails.location && (
            <div className="text-zinc-600 dark:text-zinc-400">{data.personalDetails.location}</div>
          )}

          {data.personalDetails.website && (
            <div className="text-zinc-600 dark:text-zinc-400">{data.personalDetails.website}</div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 space-y-6">
        {/* Summary */}
        {data.summary && (
          <section>
            <h3 className="text-md font-semibold text-zinc-900 dark:text-zinc-50 mb-2">PROFILE</h3>
            <p className="text-zinc-600 dark:text-zinc-400">{data.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h3 className="text-md font-semibold text-zinc-900 dark:text-zinc-50 mb-3">EXPERIENCE</h3>
            <div className="space-y-4">
              {data.experience.map((job, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-50">{job.title}</h4>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {job.startDate} - {job.endDate || "Present"}
                    </div>
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    {job.company}
                    {job.location && ` • ${job.location}`}
                  </div>
                  <ul className="list-disc list-outside ml-4 text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-md font-semibold text-zinc-900 dark:text-zinc-50 mb-3">EDUCATION</h3>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-50">{edu.degree}</h4>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </div>
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    {edu.institution}
                    {edu.location && ` • ${edu.location}`}
                  </div>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="list-disc list-outside ml-4 text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h3 className="text-md font-semibold text-zinc-900 dark:text-zinc-50 mb-3">SKILLS</h3>
            <div className="flex flex-wrap gap-x-1 gap-y-2">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">{skill}</span>
                  {index < data.skills.length - 1 && <span className="mx-2 text-zinc-400 dark:text-zinc-600">•</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h3 className="text-md font-semibold text-zinc-900 dark:text-zinc-50 mb-3">CERTIFICATIONS</h3>
            <div className="space-y-2">
              {data.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between">
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {cert.name}, {cert.issuer}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">{cert.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <section>
            <h3 className="text-md font-semibold text-zinc-900 dark:text-zinc-50 mb-3">REFERENCES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.references.map((ref, index) => (
                <div key={index}>
                  <div className="text-zinc-600 dark:text-zinc-400">{ref.name}</div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    {ref.position} at {ref.company}
                  </div>
                  {ref.contact && <div className="text-sm text-zinc-500 dark:text-zinc-400">{ref.contact}</div>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

