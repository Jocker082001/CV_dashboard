"use client"

import { useState } from "react"
import Layout from "@/components/resume-builder/layout"
import { Button } from "@/components/ui/button"
import { Mail, Plus, Search, MoreVertical, Trash2, Copy, Download, Edit, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

export default function CoverLettersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [letterToDelete, setLetterToDelete] = useState<number | null>(null)

  // Sample cover letter templates
  const templates = [
    {
      id: 1,
      title: "Professional",
      description: "Formal and traditional cover letter suitable for corporate roles",
      preview: "/placeholder.svg?height=160&width=280",
    },
    {
      id: 2,
      title: "Creative",
      description: "Modern design for creative industries and startups",
      preview: "/placeholder.svg?height=160&width=280",
    },
    {
      id: 3,
      title: "Academic",
      description: "Structured format for academic and research positions",
      preview: "/placeholder.svg?height=160&width=280",
    },
  ]

  // Sample user cover letters with additional data
  const [userCoverLetters, setUserCoverLetters] = useState([
    {
      id: 1,
      title: "Software Engineer - Google",
      date: "Created Mar 15, 2025",
      preview: "/placeholder.svg?height=160&width=280",
      content:
        "Dear Hiring Manager,\n\nI am writing to express my interest in the Software Engineer position at Google...",
    },
    {
      id: 2,
      title: "Product Manager - Apple",
      date: "Created Feb 28, 2025",
      preview: "/placeholder.svg?height=160&width=280",
      content: "Dear Hiring Manager,\n\nI am excited to apply for the Product Manager position at Apple...",
    },
  ])

  // Function to handle creating a new cover letter
  const handleCreateNew = () => {
    router.push("/new-cover-letter")
  }

  // Function to handle editing a cover letter
  const handleEdit = (id: number) => {
    router.push(`/new-cover-letter?edit=${id}`)
  }

  // Function to handle duplicating a cover letter
  const handleDuplicate = (id: number) => {
    const letterToDuplicate = userCoverLetters.find((letter) => letter.id === id)
    if (letterToDuplicate) {
      const newLetter = {
        ...letterToDuplicate,
        id: Math.max(...userCoverLetters.map((l) => l.id)) + 1,
        title: `${letterToDuplicate.title} (Copy)`,
        date: `Created ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
      }
      setUserCoverLetters([...userCoverLetters, newLetter])
      toast({
        title: "Cover letter duplicated",
        description: "Your cover letter has been duplicated successfully.",
      })
    }
  }

  // Function to handle downloading a cover letter
  const handleDownload = (id: number) => {
    // In a real app, this would generate a PDF
    toast({
      title: "Download started",
      description: "Your cover letter is being downloaded.",
    })
  }

  // Function to handle copying a cover letter to clipboard
  const handleCopy = (id: number) => {
    const letterToCopy = userCoverLetters.find((letter) => letter.id === id)
    if (letterToCopy) {
      navigator.clipboard.writeText(letterToCopy.content)
      toast({
        title: "Copied to clipboard",
        description: "Cover letter content has been copied to your clipboard.",
      })
    }
  }

  // Function to confirm deletion of a cover letter
  const confirmDelete = (id: number) => {
    setLetterToDelete(id)
    setShowDeleteDialog(true)
  }

  // Function to handle deleting a cover letter
  const handleDelete = () => {
    if (letterToDelete !== null) {
      setUserCoverLetters(userCoverLetters.filter((letter) => letter.id !== letterToDelete))
      setShowDeleteDialog(false)
      setLetterToDelete(null)
      toast({
        title: "Cover letter deleted",
        description: "Your cover letter has been deleted.",
      })
    }
  }

  // Function to handle using a template
  const handleUseTemplate = (templateId: number) => {
    router.push(`/new-cover-letter?template=${templateId}`)
  }

  // Filter cover letters based on search query
  const filteredLetters = userCoverLetters.filter((letter) =>
    letter.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Cover Letters</h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Create professional cover letters tailored to specific job applications
            </p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            New Cover Letter
          </Button>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search cover letters..."
            className="pl-10 bg-white dark:bg-zinc-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Your Cover Letters */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Your Cover Letters</h2>

          {filteredLetters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLetters.map((letter) => (
                <Card key={letter.id} className="overflow-hidden">
                  <div
                    className="h-40 bg-zinc-100 dark:bg-zinc-800 relative"
                    style={{
                      backgroundImage: `url(${letter.preview})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-900"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(letter.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(letter.id)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(letter.id)}>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={() => confirmDelete(letter.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{letter.title}</CardTitle>
                    <CardDescription>{letter.date}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => handleEdit(letter.id)}>
                      <Mail className="w-4 h-4 mr-2" />
                      Edit Cover Letter
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-zinc-50 dark:bg-zinc-900 border-dashed">
              <CardContent className="pt-6 pb-6 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-zinc-300 dark:text-zinc-700" />
                <p className="text-zinc-500 dark:text-zinc-400 mb-4">
                  {searchQuery ? "No cover letters match your search" : "You haven't created any cover letters yet"}
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleCreateNew}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Cover Letter
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Templates */}
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Cover Letter Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <div
                  className="h-40 bg-zinc-100 dark:bg-zinc-800"
                  style={{
                    backgroundImage: `url(${template.preview})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => handleUseTemplate(template.id)}>
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Cover Letter</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this cover letter? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

