"use client"

import { useState } from "react"
import type { FurnitureConfig, FurnitureItem } from "@/app/page"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Sparkles, ChevronDown, ChevronUp } from "lucide-react"
import { ScrollManager } from "./scroll-manager"

interface EnhancedConfigPanelProps {
  config: FurnitureConfig
  onConfigChange: (config: FurnitureConfig) => void
  selectedItem: FurnitureItem
}

// ... (keep all the existing data arrays: woodTypes, fabricTypes, etc.)

export function EnhancedConfigPanel({ config, onConfigChange, selectedItem }: EnhancedConfigPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    wood: true,
    fabric: true,
    frameColor: false,
    fabricColor: false,
    size: false,
  })

  const updateConfig = (updates: Partial<FurnitureConfig>) => {
    onConfigChange({ ...config, ...updates })
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleScroll = (event: Event) => {
    // Custom scroll handling logic
    console.log("Config panel scrolled", event)
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Fixed Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-white flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900">Customize</h2>
          <Sparkles className="w-5 h-5 text-amber-600" />
        </div>
        <p className="text-sm text-gray-600 mb-2">Design your perfect furniture piece</p>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-white border-amber-200 text-amber-800">
            Premium Collection
          </Badge>
          <Badge variant="outline" className="bg-white border-blue-200 text-blue-800">
            Made in Dubai
          </Badge>
        </div>
      </div>

      {/* Scrollable Configuration Options */}
      <ScrollManager className="flex-1 p-4" onScroll={handleScroll} enableVirtualScrolling={true}>
        <div className="space-y-1">
          {/* Wood Type Selection */}
          <Card className="border-0 shadow-none">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto hover:bg-gray-50/50"
              onClick={() => toggleSection("wood")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-700" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Wood Selection</div>
                  <div className="text-sm text-gray-600">Premium hardwoods</div>
                </div>
              </div>
              {expandedSections.wood ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </Button>

            {expandedSections.wood && (
              <CardContent className="p-4 pt-0 space-y-3">
                {/* Wood type options would go here */}
                <div className="space-y-2">
                  {["Oak", "Walnut", "Mahogany", "Cherry", "Teak"].map((wood) => (
                    <Button
                      key={wood}
                      variant="outline"
                      className="w-full justify-start p-3 h-auto hover:bg-amber-50 border-gray-200 bg-transparent"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-amber-200 rounded"></div>
                        <span>{wood}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
          <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          {/* Fabric Type Selection */}
          <Card className="border-0 shadow-none">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto hover:bg-gray-50/50"
              onClick={() => toggleSection("fabric")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-700" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Upholstery Selection</div>
                  <div className="text-sm text-gray-600">Luxury fabrics</div>
                </div>
              </div>
              {expandedSections.fabric ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </Button>

            {expandedSections.fabric && (
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="space-y-2">
                  {["Leather", "Velvet", "Cotton", "Linen", "Silk"].map((fabric) => (
                    <Button
                      key={fabric}
                      variant="outline"
                      className="w-full justify-start p-3 h-auto hover:bg-purple-50 border-gray-200 bg-transparent"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-purple-200 rounded"></div>
                        <span>{fabric}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
          {/* Add more sections as needed */}
          <div className="h-20"></div> {/* Spacer for testing scroll */}
        </div>
      </ScrollManager>
    </div>
  )
}
