import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Zap } from "lucide-react"
import { SignInDialog } from "@/components/auth/sign-in-dialog"
import { SignUpDialog } from "@/components/auth/sign-up-dialog"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold">CareerBoost</span>
          </div>
          <div className="flex items-center gap-4">
            <SignInDialog>
              <Button variant="ghost">Sign In</Button>
            </SignInDialog>
            <SignUpDialog>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Sign Up</Button>
            </SignUpDialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Accelerate Your Career Journey
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Create professional resumes, cover letters, and track job applications all in one place. Get
                  AI-powered assistance to stand out from the crowd.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <SignUpDialog>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </SignUpDialog>
                <Link href="/dashboard" passHref>
                  <Button variant="outline">Explore Dashboard</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="Dashboard Preview"
                className="rounded-lg object-cover shadow-lg"
                height="500"
                src="/placeholder.svg?height=500&width=600"
                width="600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything You Need for Your Job Search
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our all-in-one platform helps you create professional documents, track applications, and land your dream
                job.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="p-2 bg-purple-100 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-center text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trusted by Job Seekers</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our users have to say about their experience with our platform.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm"
              >
                <p className="text-gray-500">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-200 p-1">
                    <div className="h-8 w-8 rounded-full bg-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-purple-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Boost Your Career?
              </h2>
              <p className="max-w-[900px] text-purple-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of job seekers who have successfully landed their dream jobs with our platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <SignUpDialog>
                <Button className="bg-white text-purple-600 hover:bg-gray-100">Get Started for Free</Button>
              </SignUpDialog>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <p className="text-sm text-gray-500">© 2025 CareerBoost. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link className="text-sm text-gray-500 hover:underline" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm text-gray-500 hover:underline" href="#">
              Privacy Policy
            </Link>
            <Link className="text-sm text-gray-500 hover:underline" href="#">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Resume Builder",
    description: "Create professional resumes with customizable templates and AI-powered suggestions.",
    icon: <CheckCircle2 className="h-6 w-6 text-purple-600" />,
  },
  {
    title: "Cover Letters",
    description: "Generate tailored cover letters that highlight your skills and experience.",
    icon: <CheckCircle2 className="h-6 w-6 text-purple-600" />,
  },
  {
    title: "Job Tracker",
    description: "Keep track of all your job applications, interviews, and follow-ups in one place.",
    icon: <CheckCircle2 className="h-6 w-6 text-purple-600" />,
  },
  {
    title: "AI Assistance",
    description: "Get intelligent suggestions to improve your resume and cover letters.",
    icon: <CheckCircle2 className="h-6 w-6 text-purple-600" />,
  },
  {
    title: "Contact Management",
    description: "Organize your professional contacts and references for easy access.",
    icon: <CheckCircle2 className="h-6 w-6 text-purple-600" />,
  },
  {
    title: "Resignation Letters",
    description: "Create professional resignation letters when it's time to move on to new opportunities.",
    icon: <CheckCircle2 className="h-6 w-6 text-purple-600" />,
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Software Engineer",
    quote:
      "I landed my dream job at a top tech company thanks to the resume and cover letter I created with this platform.",
  },
  {
    name: "Michael Chen",
    title: "Marketing Manager",
    quote: "The AI suggestions helped me highlight my achievements in a way I never would have thought of on my own.",
  },
  {
    name: "Emily Rodriguez",
    title: "Financial Analyst",
    quote: "The job tracker feature helped me stay organized during my job search and follow up at the right times.",
  },
]

