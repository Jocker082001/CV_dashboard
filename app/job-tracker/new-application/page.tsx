"use client"

import { useState } from "react"
import Layout from "@/components/resume-builder/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, BriefcaseIcon, Building, MapPin, DollarSign, Calendar, Link2, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"

export default function NewJobApplicationPage() {
  const router = useRouter()

  // State for job application data
  const [jobData, setJobData] = useState({
    position: "",
    company: "",
    location: "",
    salary: "",
    status: "saved",
    applicationDate: format(new Date(), "yyyy-MM-dd"),
    jobUrl: "",
    notes: "",
    nextStep: {
      type: "",
      date: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"), // Default to 1 week from now
    },
  })

  // Function to update job data
  const updateJobData = (field: string, value: string) => {
    setJobData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Function to update next step data
  const updateNextStep = (field: string, value: string) => {
    setJobData((prev) => ({
      ...prev,
      nextStep: {
        ...prev.nextStep,
        [field]: value,
      },
    }))
  }

  // Function to save job application
  const saveJobApplication = () => {
    // Validate required fields
    if (!jobData.position || !jobData.company) {
      toast({
        title: "Missing information",
        description: "Please fill in the position and company fields.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would save to a database
    toast({
      title: "Job application saved",
      description: "Your job application has been saved successfully.",
    })

    // Redirect to job tracker page
    setTimeout(() => {
      router.push("/job-tracker")
    }, 1500)
  }

  return (
    <Layout>
      <div className="p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.push("/job-tracker")}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Add Job Application</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Track a new job opportunity</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Enter information about the position you're applying for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="position">
                  <span className="flex items-center gap-2">
                    <BriefcaseIcon className="w-4 h-4" />
                    Position/Job Title*
                  </span>
                </Label>
                <Input
                  id="position"
                  placeholder="Software Engineer"
                  value={jobData.position}
                  onChange={(e) => updateJobData("position", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">
                  <span className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Company Name*
                  </span>
                </Label>
                <Input
                  id="company"
                  placeholder="TechCorp Inc."
                  value={jobData.company}
                  onChange={(e) => updateJobData("company", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </span>
                </Label>
                <Input
                  id="location"
                  placeholder="San Francisco, CA"
                  value={jobData.location}
                  onChange={(e) => updateJobData("location", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Salary Range
                  </span>
                </Label>
                <Input
                  id="salary"
                  placeholder="$80,000 - $100,000"
                  value={jobData.salary}
                  onChange={(e) => updateJobData("salary", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Application Status</Label>
                <Select value={jobData.status} onValueChange={(value) => updateJobData("status", value)}>
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
                <Label htmlFor="applicationDate">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Application Date
                  </span>
                </Label>
                <Input
                  id="applicationDate"
                  type="date"
                  value={jobData.applicationDate}
                  onChange={(e) => updateJobData("applicationDate", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobUrl">
                <span className="flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  Job Posting URL
                </span>
              </Label>
              <Input
                id="jobUrl"
                placeholder="https://example.com/job-posting"
                value={jobData.jobUrl}
                onChange={(e) => updateJobData("jobUrl", e.target.value)}
              />
            </div>

            {(jobData.status === "interview" || jobData.status === "offer") && (
              <div className="space-y-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Next Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nextStepType">Next Step Type</Label>
                    <Input
                      id="nextStepType"
                      placeholder="Phone Interview"
                      value={jobData.nextStep.type}
                      onChange={(e) => updateNextStep("type", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextStepDate">Next Step Date</Label>
                    <Input
                      id="nextStepDate"
                      type="date"
                      value={jobData.nextStep.date}
                      onChange={(e) => updateNextStep("date", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Notes
                </span>
              </Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this job application..."
                className="min-h-[150px]"
                value={jobData.notes}
                onChange={(e) => updateJobData("notes", e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/job-tracker")}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={saveJobApplication}>
              Save Job Application
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}

