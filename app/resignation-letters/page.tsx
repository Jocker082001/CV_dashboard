"use client"

import { useState } from "react"
import Layout from "@/components/resume-builder/layout"
import { Button } from "@/components/ui/button"
import { FileEdit, Plus, Search, MoreVertical, Download, Copy, Trash2, Edit, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function ResignationLettersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("my-letters")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [letterToDelete, setLetterToDelete] = useState<number | null>(null)

  // Sample resignation letter templates
  const templates = [
    {
      id: 1,
      title: "Standard",
      description: "Professional and straightforward resignation letter",
      preview: "/placeholder.svg?height=160&width=280",
    },
    {
      id: 2,
      title: "Grateful",
      description: "Express appreciation for your time with the company",
      preview: "/placeholder.svg?height=160&width=280",
    },
    {
      id: 3,
      title: "Immediate",
      description: "For situations requiring immediate departure",
      preview: "/placeholder.svg?height=160&width=280",
    },
    {
      id: 4,
      title: "Career Change",
      description: "Explain your departure due to a career change",
      preview: "/placeholder.svg?height=160&width=280",
    },
  ]

  // Sample user resignation letters with additional data
  const [userLetters, setUserLetters] = useState([
    {
      id: 1,
      title: "Resignation - TechCorp Inc.",
      date: "Created Apr 5, 2025",
      preview: "/placeholder.svg?height=160&width=280",
      content:
        "Dear [Manager's Name],\n\nI am writing to formally notify you of my resignation from my position as [Your Position] at TechCorp Inc., effective [Last Working Day, typically two weeks from today]...",
    },
  ])

  // Function to handle creating a new resignation letter
  const handleCreateNew = () => {
    router.push("/new-resignation-letter")
  }

  // Function to handle editing a resignation letter
  const handleEdit = (id: number) => {
    router.push(`/new-resignation-letter?edit=${id}`)
  }

  // Function to handle duplicating a resignation letter
  const handleDuplicate = (id: number) => {
    const letterToDuplicate = userLetters.find((letter) => letter.id === id)
    if (letterToDuplicate) {
      const newLetter = {
        ...letterToDuplicate,
        id: Math.max(...userLetters.map((l) => l.id)) + 1,
        title: `${letterToDuplicate.title} (Copy)`,
        date: `Created ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
      }
      setUserLetters([...userLetters, newLetter])
      toast({
        title: "Resignation letter duplicated",
        description: "Your resignation letter has been duplicated successfully.",
      })
    }
  }

  // Function to handle downloading a resignation letter
  const handleDownload = (id: number) => {
    // In a real app, this would generate a PDF
    toast({
      title: "Download started",
      description: "Your resignation letter is being downloaded.",
    })
  }

  // Function to handle copying a resignation letter to clipboard
  const handleCopy = (id: number) => {
    const letterToCopy = userLetters.find((letter) => letter.id === id)
    if (letterToCopy) {
      navigator.clipboard.writeText(letterToCopy.content)
      toast({
        title: "Copied to clipboard",
        description: "Resignation letter content has been copied to your clipboard.",
      })
    }
  }

  // Function to confirm deletion of a resignation letter
  const confirmDelete = (id: number) => {
    setLetterToDelete(id)
    setShowDeleteDialog(true)
  }

  // Function to handle deleting a resignation letter
  const handleDelete = () => {
    if (letterToDelete !== null) {
      setUserLetters(userLetters.filter((letter) => letter.id !== letterToDelete))
      setShowDeleteDialog(false)
      setLetterToDelete(null)
      toast({
        title: "Resignation letter deleted",
        description: "Your resignation letter has been deleted.",
      })
    }
  }

  // Function to handle using a template
  const handleUseTemplate = (templateId: number) => {
    router.push(`/new-resignation-letter?template=${templateId}`)
  }

  // Filter letters based on search query
  const filteredLetters = userLetters.filter((letter) => letter.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Resignation Letters</h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Create professional resignation letters for a smooth transition
            </p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            New Resignation Letter
          </Button>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search resignation letters..."
            className="pl-10 bg-white dark:bg-zinc-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="my-letters" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="my-letters">My Letters</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="guide">Resignation Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="my-letters">
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
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => handleEdit(letter.id)}>
                        <FileEdit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDownload(letter.id)}>
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleCopy(letter.id)}>
                        <Copy className="w-4 h-4" />
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
                    {searchQuery
                      ? "No resignation letters match your search"
                      : "You haven't created any resignation letters yet"}
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleCreateNew}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Resignation Letter
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="templates">
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
          </TabsContent>

          <TabsContent value="guide">
            <Card>
              <CardHeader>
                <CardTitle>How to Write an Effective Resignation Letter</CardTitle>
                <CardDescription>
                  Follow these guidelines to ensure a professional and smooth transition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">1. Keep it professional</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Regardless of your reasons for leaving, maintain a professional tone. This is a formal business
                    document that may be kept in your employment file.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">2. State your intention clearly</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Begin by clearly stating your intention to resign and specify your last working day. Standard notice
                    is typically two weeks, but check your contract.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">3. Express gratitude</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Thank your employer for the opportunities you've had during your employment. Mention specific
                    experiences or skills you've gained if appropriate.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">4. Offer assistance with transition</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Offer to help with the transition period, such as training your replacement or documenting your
                    current processes and responsibilities.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">5. End on a positive note</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Close with well wishes for the company's future and your hope to stay in touch with colleagues. This
                    helps maintain professional relationships.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleCreateNew}>
                  Create a Resignation Letter
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Resignation Letter</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this resignation letter? This action cannot be undone.
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

