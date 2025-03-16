import Layout from "@/components/resume-builder/layout"
import CreateResumeCard from "@/components/resume-builder/create-resume-card"
import ResumeCard from "@/components/resume-builder/resume-card"

export default function DashboardPage() {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-8">Hello, Marcio Jocker</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <CreateResumeCard />
          <ResumeCard
            title="untitled_resume"
            updatedAt="12 Mar 25"
            previewUrl="/placeholder.svg?height=297&width=210"
          />
          <ResumeCard
            title="untitled_resume"
            updatedAt="12 Mar 25"
            previewUrl="/placeholder.svg?height=297&width=210"
          />
        </div>
      </div>
    </Layout>
  )
}

