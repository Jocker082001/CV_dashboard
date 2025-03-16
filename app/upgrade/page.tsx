"use client"

import type React from "react"

import { useState } from "react"
import { Check, Zap, CreditCard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function UpgradePage() {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const { toast } = useToast()

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan)
    setPaymentOpen(true)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentOpen(false)
    toast({
      title: "Subscription activated!",
      description: `Your ${selectedPlan} plan has been successfully activated.`,
    })
  }

  const plans = {
    monthly: [
      {
        name: "Basic",
        price: "$9.99",
        description: "Essential tools for job seekers",
        features: [
          "5 Resume Templates",
          "3 Cover Letter Templates",
          "Basic AI Assistance",
          "Job Tracker (5 applications)",
          "Email Support",
        ],
        popular: false,
      },
      {
        name: "Pro",
        price: "$19.99",
        description: "Advanced features for serious job hunters",
        features: [
          "15 Resume Templates",
          "10 Cover Letter Templates",
          "Advanced AI Assistance",
          "Job Tracker (Unlimited)",
          "Contact Management",
          "Priority Support",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "$39.99",
        description: "Complete solution for career professionals",
        features: [
          "All Pro Features",
          "Unlimited Templates",
          "Premium AI Tools",
          "Career Coaching Session",
          "LinkedIn Profile Optimization",
          "24/7 Priority Support",
        ],
        popular: false,
      },
    ],
    yearly: [
      {
        name: "Basic",
        price: "$99.99",
        originalPrice: "$119.88",
        description: "Essential tools for job seekers",
        features: [
          "5 Resume Templates",
          "3 Cover Letter Templates",
          "Basic AI Assistance",
          "Job Tracker (5 applications)",
          "Email Support",
        ],
        popular: false,
      },
      {
        name: "Pro",
        price: "$199.99",
        originalPrice: "$239.88",
        description: "Advanced features for serious job hunters",
        features: [
          "15 Resume Templates",
          "10 Cover Letter Templates",
          "Advanced AI Assistance",
          "Job Tracker (Unlimited)",
          "Contact Management",
          "Priority Support",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "$399.99",
        originalPrice: "$479.88",
        description: "Complete solution for career professionals",
        features: [
          "All Pro Features",
          "Unlimited Templates",
          "Premium AI Tools",
          "Career Coaching Session",
          "LinkedIn Profile Optimization",
          "24/7 Priority Support",
        ],
        popular: false,
      },
    ],
  }

  return (
    <div className="container max-w-6xl py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Upgrade Your Plan</h1>
        <p className="mt-2 text-muted-foreground">Choose the perfect plan to accelerate your career journey</p>
      </div>

      <Tabs defaultValue="monthly" className="mb-8" onValueChange={setBillingCycle}>
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
            <TabsTrigger value="yearly">
              Yearly Billing
              <Badge variant="outline" className="ml-2 bg-purple-100 text-purple-600 hover:bg-purple-100">
                Save 16%
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="monthly" className="mt-0">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.monthly.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                billingCycle="monthly"
                onSelect={() => handlePlanSelect(plan.name)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="yearly" className="mt-0">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.yearly.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                billingCycle="yearly"
                onSelect={() => handlePlanSelect(plan.name)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 bg-purple-50 dark:bg-purple-950/30 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Need help choosing a plan?</h3>
            <p className="text-muted-foreground mt-1">
              Our team is ready to help you find the perfect plan for your needs.
            </p>
          </div>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>

      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete your subscription</DialogTitle>
            <DialogDescription>
              You're subscribing to the {selectedPlan} plan with {billingCycle} billing.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePaymentSubmit}>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="card-name">Name on card</Label>
                <Input id="card-name" placeholder="John Smith" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-number">Card number</Label>
                <Input id="card-number" placeholder="4242 4242 4242 4242" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Now
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface PlanCardProps {
  plan: any
  billingCycle: string
  onSelect: () => void
}

function PlanCard({ plan, billingCycle, onSelect }: PlanCardProps) {
  return (
    <Card className={`relative flex flex-col ${plan.popular ? "border-purple-400 shadow-lg" : ""}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <Badge className="bg-purple-600">Most Popular</Badge>
        </div>
      )}
      <CardHeader className={plan.popular ? "pt-8" : ""}>
        <CardTitle>{plan.name}</CardTitle>
        <div className="flex items-baseline mt-2">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="ml-1 text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
        </div>
        {plan.originalPrice && (
          <span className="text-sm text-muted-foreground line-through">
            {plan.originalPrice}/{billingCycle === "monthly" ? "month" : "year"}
          </span>
        )}
        <CardDescription className="mt-2">{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {plan.features.map((feature: string) => (
            <li key={feature} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSelect}
          className={`w-full ${plan.popular ? "bg-purple-600 hover:bg-purple-700" : ""}`}
          variant={plan.popular ? "default" : "outline"}
        >
          {plan.popular ? (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Get Started
            </>
          ) : (
            <>
              Select Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

