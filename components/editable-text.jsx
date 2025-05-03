"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function EditableText({ value, onChange, className, element = "p" }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    onChange(editedValue)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      setIsEditing(false)
      onChange(editedValue)
    }
    if (e.key === "Escape") {
      setIsEditing(false)
      setEditedValue(value)
    }
  }

  const handleChange = (e) => {
    setEditedValue(e.target.value)
  }

  if (isEditing) {
    return (
      <textarea
        ref={inputRef}
        value={editedValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full resize-none overflow-hidden bg-white border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500",
          className,
        )}
        style={{ minHeight: "2em" }}
      />
    )
  }

  const Element = element
  return (
    <Element
      onClick={handleClick}
      className={cn(
        className,
        "cursor-pointer hover:ring-2 hover:ring-purple-200 hover:ring-opacity-50 rounded px-1 -mx-1",
      )}
    >
      {value}
    </Element>
  )
}
