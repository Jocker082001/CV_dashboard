"use client"

import type React from "react"

import { useState } from "react"
import Layout from "@/components/resume-builder/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, MoreHorizontal, Pencil, Trash2, Mail, Phone, Briefcase, Filter } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define contact type
type Contact = {
  id: string
  name: string
  email: string
  phone: string
  company: string
  position: string
  category: "Recruiter" | "Reference" | "Colleague" | "Other"
  notes: string
}

// Sample contacts data
const initialContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    company: "Tech Innovations Inc.",
    position: "Senior Recruiter",
    category: "Recruiter",
    notes: "Met at the SF Tech Conference. Interested in my frontend development experience.",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 987-6543",
    company: "Global Solutions",
    position: "Engineering Manager",
    category: "Reference",
    notes: "Former manager at StartupX. Willing to provide a strong recommendation.",
  },
  {
    id: "3",
    name: "Jessica Williams",
    email: "jessica.w@example.com",
    phone: "(555) 456-7890",
    company: "Creative Designs Co.",
    position: "UX Director",
    category: "Colleague",
    notes: "Collaborated on the redesign project. Good contact for UX/UI positions.",
  },
]

export default function ContactsPage() {
  // State for contacts
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("All")

  // State for new/edit contact
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentContact, setCurrentContact] = useState<Contact>({
    id: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    category: "Other",
    notes: "",
  })

  // Filter contacts based on search query and category
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.position.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "All" || contact.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Handle adding a new contact
  const handleAddContact = () => {
    setIsEditMode(false)
    setCurrentContact({
      id: Math.random().toString(36).substring(2, 9),
      name: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      category: "Other",
      notes: "",
    })
    setIsDialogOpen(true)
  }

  // Handle editing a contact
  const handleEditContact = (contact: Contact) => {
    setIsEditMode(true)
    setCurrentContact(contact)
    setIsDialogOpen(true)
  }

  // Handle deleting a contact
  const handleDeleteContact = (id: string) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      setContacts(contacts.filter((contact) => contact.id !== id))
    }
  }

  // Handle saving a contact (add or edit)
  const handleSaveContact = () => {
    if (isEditMode) {
      setContacts(contacts.map((contact) => (contact.id === currentContact.id ? currentContact : contact)))
    } else {
      setContacts([...contacts, currentContact])
    }
    setIsDialogOpen(false)
  }

  // Handle input change for contact form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentContact({ ...currentContact, [name]: value })
  }

  // Handle select change for category
  const handleCategoryChange = (value: string) => {
    setCurrentContact({
      ...currentContact,
      category: value as "Recruiter" | "Reference" | "Colleague" | "Other",
    })
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Contacts</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Manage your professional network and references</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white" onClick={handleAddContact}>
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-zinc-400 w-4 h-4" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Recruiter">Recruiters</SelectItem>
                    <SelectItem value="Reference">References</SelectItem>
                    <SelectItem value="Colleague">Colleagues</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-zinc-500 dark:text-zinc-400">{contact.position}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="w-3.5 h-3.5 mr-2 text-zinc-400" />
                            {contact.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-3.5 h-3.5 mr-2 text-zinc-400" />
                            {contact.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Briefcase className="w-3.5 h-3.5 mr-2 text-zinc-400" />
                          {contact.company}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            contact.category === "Recruiter"
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                              : contact.category === "Reference"
                                ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                                : contact.category === "Colleague"
                                  ? "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                                  : "bg-zinc-50 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                          }
                        >
                          {contact.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditContact(contact)}>
                              <Pencil className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 dark:text-red-400"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                      {searchQuery || categoryFilter !== "All"
                        ? "No contacts match your search criteria"
                        : "No contacts added yet"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add/Edit Contact Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Contact" : "Add New Contact"}</DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Update the contact information below"
                  : "Fill in the details to add a new contact to your network"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={currentContact.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={currentContact.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Recruiter">Recruiter</SelectItem>
                      <SelectItem value="Reference">Reference</SelectItem>
                      <SelectItem value="Colleague">Colleague</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={currentContact.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(555) 123-4567"
                    value={currentContact.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Company Name"
                    value={currentContact.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    name="position"
                    placeholder="Job Title"
                    value={currentContact.position}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  name="notes"
                  placeholder="Add any relevant notes about this contact"
                  value={currentContact.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSaveContact}>
                {isEditMode ? "Save Changes" : "Add Contact"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

