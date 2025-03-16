"use client"

import React from "react"

import { useState } from "react"
import Layout from "@/components/resume-builder/layout"
import { Button } from "@/components/ui/button"
import {
  BriefcaseIcon,
  Plus,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  MoreVertical,
  Building,
  MapPin,
  DollarSign,
  Edit,
  Trash2,
  FileText,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"

// Job application status types
type Status = "applied" | "interview" | "offer" | "rejected" | "saved"

// Job application interface
interface JobApplication {
  id: string
  company: string
  position: string
  location: string
  salary?: string
  status: Status
  date: string
  logo?: string
  url?: string
  notes?: string
  nextStep?: {
    type: string
    date: string
  }
}

export default function JobTrackerPage() {
  // State for job applications
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([
    {
      id: "1",
      company: "TechCorp Inc.",
      position: "Senior Product Manager",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      status: "interview",
      date: "Apr 10, 2025",
      logo: "/placeholder.svg?height=40&width=40",
      nextStep: {
        type: "Second Interview",
        date: "Apr 15, 2025",
      },
    },
    {
      id: "2",
      company: "InnovateSoft",
      position: "UX Designer",
      location: "Remote",
      salary: "$90,000 - $110,000",
      status: "applied",
      date: "Apr 8, 2025",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      company: "Global Finance",
      position: "Marketing Specialist",
      location: "New York, NY",
      status: "rejected",
      date: "Apr 5, 2025",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      company: "StartupXYZ",
      position: "Frontend Developer",
      location: "Austin, TX",
      salary: "$100,000 - $130,000",
      status: "offer",
      date: "Apr 2, 2025",
      logo: "/placeholder.svg?height=40&width=40",
      nextStep: {
        type: "Offer Review",
        date: "Apr 12, 2025",
      },
    },
    {
      id: "5",
      company: "DataViz Corp",
      position: "Data Analyst",
      location: "Chicago, IL",
      status: "saved",
      date: "Mar 30, 2025",
      logo: "/placeholder.svg?height=40&width=40",
    },
  ])

  // State for search query
  const [searchQuery, setSearchQuery] = useState("")

  // State for status filter
  const [statusFilter, setStatusFilter] = useState("all")

  // State for sort order
  const [sortOrder, setSort] = useState("newest")

  // State for add/edit job dialog
  const [showJobDialog, setShowJobDialog] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentJob, setCurrentJob] = useState<JobApplication | null>(null)

  // State for delete confirmation dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [jobToDelete, setJobToDelete] = useState<string | null>(null)

  // State for update status dialog
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [jobToUpdateStatus, setJobToUpdateStatus] = useState<string | null>(null)

  // State for add notes dialog
  const [showNotesDialog, setShowNotesDialog] = useState(false)
  const [jobToAddNotes, setJobToAddNotes] = useState<string | null>(null)
  const [notesInput, setNotesInput] = useState("")

  // Status badge configuration
  const statusConfig = {
    applied: {
      label: "Applied",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      icon: Clock,
    },
    interview: {
      label: "Interview",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      icon: Calendar,
    },
    offer: {
      label: "Offer",
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      icon: CheckCircle,
    },
    rejected: {
      label: "Rejected",
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      icon: XCircle,
    },
    saved: {
      label: "Saved",
      color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      icon: AlertCircle,
    },
  }

  // Default empty job application
  const emptyJob: JobApplication = {
    id: "",
    company: "",
    position: "",
    location: "",
    salary: "",
    status: "saved",
    date: format(new Date(), "MMM dd, yyyy"),
    logo: "/placeholder.svg?height=40&width=40",
  }

  // Function to handle adding a new job application
  const handleAddJob = () => {
    setIsEditing(false)
    setCurrentJob({
      ...emptyJob,
      id: Math.random().toString(36).substring(2, 9),
    })
    setShowJobDialog(true)
  }

  // Function to handle editing a job application
  const handleEditJob = (id: string) => {
    const jobToEdit = jobApplications.find((job) => job.id === id)
    if (jobToEdit) {
      setIsEditing(true)
      setCurrentJob(jobToEdit)
      setShowJobDialog(true)
    }
  }

  // Function to handle saving a job application (add or edit)
  const handleSaveJob = (job: JobApplication) => {
    if (isEditing) {
      setJobApplications((prev) => prev.map((j) => (j.id === job.id ? job : j)))
      toast({
        title: "Job application updated",
        description: "Your job application has been updated successfully.",
      })
    } else {
      setJobApplications((prev) => [...prev, job])
      toast({
        title: "Job application added",
        description: "Your job application has been added successfully.",
      })
    }
    setShowJobDialog(false)
  }

  // Function to confirm deletion of a job application
  const confirmDeleteJob = (id: string) => {
    setJobToDelete(id)
    setShowDeleteDialog(true)
  }

  // Function to handle deleting a job application
  const handleDeleteJob = () => {
    if (jobToDelete) {
      setJobApplications((prev) => prev.filter((job) => job.id !== jobToDelete))
      setShowDeleteDialog(false)
      setJobToDelete(null)
      toast({
        title: "Job application removed",
        description: "The job application has been removed successfully.",
      })
    }
  }

  // Function to open status update dialog
  const openStatusUpdateDialog = (id: string) => {
    setJobToUpdateStatus(id)
    setShowStatusDialog(true)
  }

  // Function to handle updating job status
  const handleUpdateStatus = (status: Status) => {
    if (jobToUpdateStatus) {
      setJobApplications((prev) => prev.map((job) => (job.id === jobToUpdateStatus ? { ...job, status } : job)))
      setShowStatusDialog(false)
      setJobToUpdateStatus(null)
      toast({
        title: "Status updated",
        description: `Job application status updated to ${statusConfig[status].label}.`,
      })
    }
  }

  // Function to open add notes dialog
  const openAddNotesDialog = (id: string) => {
    const job = jobApplications.find((job) => job.id === id)
    if (job) {
      setJobToAddNotes(id)
      setNotesInput(job.notes || "")
      setShowNotesDialog(true)
    }
  }

  // Function to handle saving notes
  const handleSaveNotes = () => {
    if (jobToAddNotes) {
      setJobApplications((prev) => prev.map((job) => (job.id === jobToAddNotes ? { ...job, notes: notesInput } : job)))
      setShowNotesDialog(false)
      setJobToAddNotes(null)
      toast({
        title: "Notes saved",
        description: "Your notes have been saved successfully.",
      })
    }
  }

  // Calculate job application stats
  const stats = [
    {
      label: "Total Applications",
      value: jobApplications.length,
    },
    {
      label: "Interviews",
      value: jobApplications.filter((job) => job.status === "interview").length,
    },
    {
      label: "Offers",
      value: jobApplications.filter((job) => job.status === "offer").length,
    },
    {
      label: "Response Rate",
      value:
        jobApplications.length > 0
          ? `${Math.round((jobApplications.filter((job) => job.status === "interview" || job.status === "offer").length / jobApplications.length) * 100)}%`
          : "0%",
    },
  ]

  // Filter and sort job applications
  const filteredJobs = jobApplications
    .filter(
      (job) =>
        // Filter by search query
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter(
      (job) =>
        // Filter by status
        statusFilter === "all" || job.status === statusFilter,
    )
    .sort((a, b) => {
      // Sort by selected order
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()

      if (sortOrder === "newest") {
        return dateB - dateA
      } else if (sortOrder === "oldest") {
        return dateA - dateB
      } else if (sortOrder === "company") {
        return a.company.localeCompare(b.company)
      }
      return 0
    })

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Job Tracker</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Track and manage your job applications in one place</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleAddJob}>
            <Plus className="w-4 h-4 mr-2" />
            Add Job Application
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
            <Input
              placeholder="Search jobs..."
              className="pl-10 bg-white dark:bg-zinc-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all" value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="saved">Saved</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="newest" value={sortOrder} onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="company">Company Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Applications */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const StatusIcon = statusConfig[job.status].icon

              return (
                <Card key={job.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center p-4 gap-4">
                      {/* Logo */}
                      <div className="w-10 h-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 overflow-hidden">
                        <img
                          src={job.logo || "/placeholder.svg"}
                          alt={`${job.company} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 truncate">{job.position}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
                          <div className="flex items-center gap-1">
                            <Building className="w-3.5 h-3.5" />
                            <span>{job.company}</span>
                          </div>
                          {job.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{job.location}</span>
                            </div>
                          )}
                          {job.salary && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3.5 h-3.5" />
                              <span>{job.salary}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status and Date */}
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className={`flex items-center gap-1 ${statusConfig[job.status].color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span>{statusConfig[job.status].label}</span>
                        </Badge>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">{job.date}</div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditJob(job.id)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openStatusUpdateDialog(job.id)}>
                              <Clock className="w-4 h-4 mr-2" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openAddNotesDialog(job.id)}>
                              <FileText className="w-4 h-4 mr-2" />
                              Add Notes
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 dark:text-red-400"
                              onClick={() => confirmDeleteJob(job.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Next Step (if available) */}
                    {job.nextStep && (
                      <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                          {job.nextStep.type}:
                        </span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">{job.nextStep.date}</span>
                      </div>
                    )}

                    {/* Notes (if available) */}
                    {job.notes && (
                      <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Notes:</span>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 pl-6">{job.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <Card className="bg-zinc-50 dark:bg-zinc-900 border-dashed">
              <CardContent className="pt-6 pb-6 text-center">
                <BriefcaseIcon className="w-12 h-12 mx-auto mb-4 text-zinc-300 dark:text-zinc-700" />
                <p className="text-zinc-500 dark:text-zinc-400 mb-4">
                  {searchQuery || statusFilter !== "all"
                    ? "No job applications match your search criteria"
                    : "You haven't added any job applications yet"}
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleAddJob}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Job Application
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add/Edit Job Dialog */}
      <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Job Application" : "Add New Job Application"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the details of your job application."
                : "Enter the details of the job you're applying for."}
            </DialogDescription>
          </DialogHeader>

          {currentJob && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    placeholder="Software Engineer"
                    value={currentJob.position}
                    onChange={(e) => setCurrentJob({ ...currentJob, position: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="TechCorp Inc."
                    value={currentJob.company}
                    onChange={(e) => setCurrentJob({ ...currentJob, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="San Francisco, CA"
                    value={currentJob.location}
                    onChange={(e) => setCurrentJob({ ...currentJob, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range (Optional)</Label>
                  <Input
                    id="salary"
                    placeholder="$80,000 - $100,000"
                    value={currentJob.salary || ""}
                    onChange={(e) => setCurrentJob({ ...currentJob, salary: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Application Status</Label>
                  <Select
                    value={currentJob.status}
                    onValueChange={(value: Status) => setCurrentJob({ ...currentJob, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saved">Saved</SelectItem>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Application Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={new Date(currentJob.date).toISOString().split("T")[0]}
                    onChange={(e) => {
                      const date = new Date(e.target.value)
                      const formattedDate = format(date, "MMM dd, yyyy")
                      setCurrentJob({ ...currentJob, date: formattedDate })
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">Job Posting URL (Optional)</Label>
                <Input
                  id="url"
                  placeholder="https://example.com/job-posting"
                  value={currentJob.url || ""}
                  onChange={(e) => setCurrentJob({ ...currentJob, url: e.target.value })}
                />
              </div>

              {(currentJob.status === "interview" || currentJob.status === "offer") && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nextStepType">Next Step</Label>
                    <Input
                      id="nextStepType"
                      placeholder="Phone Interview"
                      value={currentJob.nextStep?.type || ""}
                      onChange={(e) =>
                        setCurrentJob({
                          ...currentJob,
                          nextStep: {
                            type: e.target.value,
                            date: currentJob.nextStep?.date || format(new Date(), "MMM dd, yyyy"),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextStepDate">Next Step Date</Label>
                    <Input
                      id="nextStepDate"
                      type="date"
                      value={
                        currentJob.nextStep?.date
                          ? new Date(currentJob.nextStep.date).toISOString().split("T")[0]
                          : new Date().toISOString().split("T")[0]
                      }
                      onChange={(e) => {
                        const date = new Date(e.target.value)
                        const formattedDate = format(date, "MMM dd, yyyy")
                        setCurrentJob({
                          ...currentJob,
                          nextStep: {
                            type: currentJob.nextStep?.type || "Interview",
                            date: formattedDate,
                          },
                        })
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this job application..."
                  value={currentJob.notes || ""}
                  onChange={(e) => setCurrentJob({ ...currentJob, notes: e.target.value })}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJobDialog(false)}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => currentJob && handleSaveJob(currentJob)}
            >
              {isEditing ? "Update" : "Add"} Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Job Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this job application? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteJob} className="bg-red-600 hover:bg-red-700 text-white">
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Application Status</DialogTitle>
            <DialogDescription>Select the new status for this job application.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            {(Object.keys(statusConfig) as Status[]).map((status) => (
              <Button
                key={status}
                variant="outline"
                className={`justify-start h-auto py-3 ${status === "offer" ? "border-green-500" : ""}`}
                onClick={() => handleUpdateStatus(status)}
              >
                <div className={`mr-2 p-1 rounded-full ${statusConfig[status].color}`}>
                  {React.createElement(statusConfig[status].icon, { className: "w-4 h-4" })}
                </div>
                <span>{statusConfig[status].label}</span>
              </Button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Notes Dialog */}
      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Notes</DialogTitle>
            <DialogDescription>Add or update notes for this job application.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Add details about the job, interview experience, or things to follow up on..."
              className="min-h-[200px]"
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotesDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSaveNotes}>
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

