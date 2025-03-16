"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface TemplateSelectorProps {
  selectedTemplate: number
  onSelectTemplate: (templateId: number) => void
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const templates = [
    {
      id: 1,
      name: "Modern Clean",
      description: "A clean and modern template with a left sidebar",
      preview: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Professional Classic",
      description: "A traditional template with burgundy accents",
      preview: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Timeline Style",
      description: "A modern template with timeline experience section",
      preview: "/placeholder.svg",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={cn(
            "relative cursor-pointer transition-all hover:ring-2 hover:ring-purple-500",
            selectedTemplate === template.id && "ring-2 ring-purple-500",
          )}
          onClick={() => onSelectTemplate(template.id)}
        >
          <div className="relative aspect-[210/297] rounded-t-lg overflow-hidden">
            <Image src={template.preview || "/placeholder.svg"} alt={template.name} fill className="object-cover" />
          </div>
          <div className="p-4">
            <h3 className="font-medium">{template.name}</h3>
            <p className="text-sm text-zinc-500">{template.description}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

