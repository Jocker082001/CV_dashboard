"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { OnboardingFlow } from "./onboarding-flow"

interface SignUpDialogProps {
  children: React.ReactNode
}

export function SignUpDialog({ children }: SignUpDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [showOnboarding, setShowOnboarding] = useState(false)
  const { toast } = useToast()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validate inputs
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success - proceed to onboarding
      setIsLoading(false)
      setShowOnboarding(true)
    } catch (err: any) {
      setError(err.message || "Failed to create account")
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        if (!newOpen) {
          // Reset state when dialog closes
          setShowOnboarding(false)
          setEmail("")
          setPassword("")
          setConfirmPassword("")
          setError("")
        }
      }}
    >
      <DialogTrigger asChild data-signup-trigger="true">
        {children}
      </DialogTrigger>
      <DialogContent className={showOnboarding ? "sm:max-w-[600px]" : "sm:max-w-[425px]"}>
        {!showOnboarding ? (
          <>
            <DialogHeader>
              <DialogTitle>Create an Account</DialogTitle>
              <DialogDescription>Join CareerBoost to accelerate your career journey</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSignUp} className="space-y-4 pt-4">
              {error && <div className="bg-red-50 p-3 rounded-md text-red-500 text-sm">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
              <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-purple-600"
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    // Open sign in dialog after a short delay
                    setTimeout(() => {
                      const signInTrigger = document.querySelector("[data-dialog-trigger='true']")
                      if (signInTrigger) {
                        ;(signInTrigger as HTMLElement).click()
                      }
                    }, 100)
                  }}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </>
        ) : (
          <OnboardingFlow
            email={email}
            onComplete={() => {
              setOpen(false)
              toast({
                title: "Account created successfully",
                description: "Welcome to CareerBoost!",
              })
              // Redirect to dashboard
              window.location.href = "/dashboard"
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

