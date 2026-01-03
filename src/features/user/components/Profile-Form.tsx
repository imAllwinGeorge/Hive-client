"use client"

import type React from "react"
import { useState } from "react"
import { User, Mail } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store"

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false)
  const user = useSelector((state: RootState) => state.auth.user)

const [formData, setFormData] = useState(() => ({
  userName: user?.userName ?? "",
  email: user?.email ?? ""
}))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    console.log("[v0] Saving profile:", formData)
    setIsEditing(false)
  }
  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Profile Information</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:opacity-80 transition-opacity"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <User className="w-4 h-4" />
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.userName}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <Mail className="w-4 h-4" />
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted disabled:cursor-not-allowed"
          />
        </div>

       
      </div>
    </div>
  )
}
