"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import EditableText from "./editable-text.jsx"

// Sample data for AI regeneration
const headlines = [
  "Transform Your Digital Experience",
  "Elevate Your Online Presence",
  "Unlock Your Website's Potential",
  "Redefine Your Web Strategy",
  "Create Stunning Digital Experiences",
]

const subheadlines = [
  "Powerful tools to help you build beautiful, responsive websites in record time.",
  "Streamline your workflow and boost productivity with our intuitive platform.",
  "Join thousands of businesses that trust us to deliver exceptional results.",
  "Cutting-edge technology meets user-friendly design for the perfect web solution.",
  "Take your online presence to the next level with our comprehensive toolkit.",
]

const images = [
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1181403/pexels-photo-1181403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3182777/pexels-photo-3182777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
]

export function HeroSection() {
  const [headline, setHeadline] = useState(headlines[0])
  const [subheadline, setSubheadline] = useState(subheadlines[0])
  const [image, setImage] = useState(images[0])
  const [isRegenerating, setIsRegenerating] = useState(false)

  const getRandomItem = (array, current) => {
    const filteredArray = array.filter((item) => item !== current)
    return filteredArray[Math.floor(Math.random() * filteredArray.length)]
  }

  const regenerateContent = () => {
    setIsRegenerating(true)

    // Simulate AI regeneration with a slight delay
    setTimeout(() => {
      setHeadline(getRandomItem(headlines, headline))
      setSubheadline(getRandomItem(subheadlines, subheadline))
      setImage(getRandomItem(images, image))
      setIsRegenerating(false)
    }, 800)
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <EditableText
                value={headline}
                onChange={setHeadline}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900"
                element="h1"
              />

              <EditableText
                value={subheadline}
                onChange={setSubheadline}
                className="text-xl text-gray-600 max-w-lg"
                element="p"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={regenerateContent}
                disabled={isRegenerating}
                className={cn("border-purple-200 text-purple-600 hover:bg-purple-50", isRegenerating && "opacity-70")}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {isRegenerating ? "Regenerating..." : "Regenerate with AI"}
              </Button>
            </div>

            <p className="text-sm text-gray-500 italic">Click on any text to edit it directly</p>
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-xl transition-all duration-500">
            <div className={cn("transition-opacity duration-500", isRegenerating ? "opacity-30" : "opacity-100")}>
              <img
                src={image || "/placeholder.svg"}
                alt="Hero illustration"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {isRegenerating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
