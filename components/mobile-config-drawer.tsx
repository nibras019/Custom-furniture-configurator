"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { X, Check, Crown, ChevronRight, Palette, Star, Ruler } from "lucide-react"
import type { FurnitureConfig, FurnitureItem } from "@/app/page"

interface MobileConfigDrawerProps {
  isOpen: boolean
  onClose: () => void
  config: FurnitureConfig
  onConfigChange: (config: FurnitureConfig) => void
  selectedItem: FurnitureItem
}

const woodTypes = [
  { id: "oak", name: "European Oak", description: "Classic & durable", color: "#DEB887", premium: false },
  { id: "walnut", name: "American Walnut", description: "Rich & elegant", color: "#8B4513", premium: true },
  { id: "mahogany", name: "Honduran Mahogany", description: "Luxurious", color: "#C04000", premium: true },
  { id: "cherry", name: "Wild Cherry", description: "Warm & sophisticated", color: "#DE3163", premium: true },
  { id: "teak", name: "Burmese Teak", description: "Exotic & prestigious", color: "#CD853F", premium: true },
]

const fabricTypes = [
  { id: "leather", name: "Italian Leather", description: "Premium Nappa", premium: true },
  { id: "velvet", name: "Silk Velvet", description: "Luxurious European", premium: true },
  { id: "cotton", name: "Organic Cotton", description: "Natural & breathable", premium: false },
  { id: "linen", name: "Belgian Linen", description: "Fine European", premium: true },
  { id: "silk", name: "Mulberry Silk", description: "Pure silk", premium: true },
]

const sizeOptions = [
  { id: "small", name: "Compact", description: "Space-saving", scale: "0.9x" },
  { id: "medium", name: "Standard", description: "Perfect proportions", scale: "1.0x" },
  { id: "large", name: "Grand", description: "Statement piece", scale: "1.1x" },
]

const frameColors = [
  { color: "#2C1810", name: "Espresso" },
  { color: "#8B4513", name: "Cognac" },
  { color: "#A0522D", name: "Sienna" },
  { color: "#654321", name: "Chocolate" },
  { color: "#D2691E", name: "Amber" },
  { color: "#CD853F", name: "Golden Oak" },
]

const fabricColors = [
  { color: "#2C1810", name: "Midnight" },
  { color: "#8B0000", name: "Burgundy" },
  { color: "#191970", name: "Navy" },
  { color: "#006400", name: "Forest" },
  { color: "#4B0082", name: "Purple" },
  { color: "#800080", name: "Plum" },
]

export function MobileConfigDrawer({ isOpen, onClose, config, onConfigChange, selectedItem }: MobileConfigDrawerProps) {
  const [activeSection, setActiveSection] = useState<"wood" | "fabric" | "frameColor" | "fabricColor" | "size" | null>(
    null,
  )

  const updateConfig = (updates: Partial<FurnitureConfig>) => {
    onConfigChange({ ...config, ...updates })
  }

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const renderSectionContent = () => {
    switch (activeSection) {
      case "wood":
        return (
          <div className="space-y-3">
            {woodTypes.map((wood) => (
              <Button
                key={wood.id}
                variant={config.woodType === wood.id ? "default" : "outline"}
                className={`w-full p-4 h-auto justify-start text-left ${
                  config.woodType === wood.id
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => {
                  updateConfig({ woodType: wood.id as FurnitureConfig["woodType"] })
                  setActiveSection(null)
                }}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div
                    className="w-8 h-8 rounded-lg border-2 border-white/20"
                    style={{ backgroundColor: wood.color }}
                  />
                  <div className="flex-1">
                    <div className="font-medium flex items-center">
                      {wood.name}
                      {wood.premium && (
                        <Badge className="ml-2 bg-yellow-400 text-yellow-900 text-xs">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                      {config.woodType === wood.id && <Check className="w-4 h-4 ml-auto" />}
                    </div>
                    <div className="text-sm opacity-75">{wood.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )

      case "fabric":
        return (
          <div className="space-y-3">
            {fabricTypes.map((fabric) => (
              <Button
                key={fabric.id}
                variant={config.fabricType === fabric.id ? "default" : "outline"}
                className={`w-full p-4 h-auto justify-start text-left ${
                  config.fabricType === fabric.id
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => {
                  updateConfig({ fabricType: fabric.id as FurnitureConfig["fabricType"] })
                  setActiveSection(null)
                }}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 rounded-lg border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200" />
                  <div className="flex-1">
                    <div className="font-medium flex items-center">
                      {fabric.name}
                      {fabric.premium && (
                        <Badge className="ml-2 bg-yellow-400 text-yellow-900 text-xs">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                      {config.fabricType === fabric.id && <Check className="w-4 h-4 ml-auto" />}
                    </div>
                    <div className="text-sm opacity-75">{fabric.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )

      case "frameColor":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {frameColors.map((preset) => (
                <Button
                  key={preset.color}
                  variant="outline"
                  className={`w-full h-16 p-2 border-2 ${
                    config.frameColor === preset.color ? "border-amber-500 ring-2 ring-amber-200" : "border-gray-300"
                  }`}
                  onClick={() => updateConfig({ frameColor: preset.color })}
                >
                  <div className="w-full h-full rounded" style={{ backgroundColor: preset.color }}>
                    {config.frameColor === preset.color && (
                      <div className="w-full h-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium">Custom:</span>
              <input
                type="color"
                value={config.frameColor}
                onChange={(e) => updateConfig({ frameColor: e.target.value })}
                className="w-10 h-8 rounded border cursor-pointer"
              />
              <span className="text-xs font-mono bg-white px-2 py-1 rounded border">
                {config.frameColor.toUpperCase()}
              </span>
            </div>
          </div>
        )

      case "fabricColor":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {fabricColors.map((preset) => (
                <Button
                  key={preset.color}
                  variant="outline"
                  className={`w-full h-12 p-1 border-2 ${
                    config.fabricColor === preset.color ? "border-amber-500 ring-2 ring-amber-200" : "border-gray-300"
                  }`}
                  onClick={() => updateConfig({ fabricColor: preset.color })}
                >
                  <div className="w-full h-full rounded" style={{ backgroundColor: preset.color }}>
                    {config.fabricColor === preset.color && (
                      <div className="w-full h-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium">Custom:</span>
              <input
                type="color"
                value={config.fabricColor}
                onChange={(e) => updateConfig({ fabricColor: e.target.value })}
                className="w-10 h-8 rounded border cursor-pointer"
              />
              <span className="text-xs font-mono bg-white px-2 py-1 rounded border">
                {config.fabricColor.toUpperCase()}
              </span>
            </div>
          </div>
        )

      case "size":
        return (
          <div className="space-y-3">
            {sizeOptions.map((size) => (
              <Button
                key={size.id}
                variant={config.size === size.id ? "default" : "outline"}
                className={`w-full p-4 h-auto justify-start text-left ${
                  config.size === size.id
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => {
                  updateConfig({ size: size.id as FurnitureConfig["size"] })
                  setActiveSection(null)
                }}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 rounded-lg border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold">
                    {size.scale}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium flex items-center">
                      {size.name}
                      {config.size === size.id && <Check className="w-4 h-4 ml-auto" />}
                    </div>
                    <div className="text-sm opacity-75">{size.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden ui-overlay">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-white flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {activeSection ? "Select Option" : "Customize Furniture"}
            </h2>
            <p className="text-sm text-gray-600">
              {activeSection ? "Choose your preferred option" : "Personalize your furniture"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={activeSection ? () => setActiveSection(null) : onClose}
            className="w-8 h-8 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto mobile-config-scroll" style={{ maxHeight: "calc(85vh - 80px)" }}>
          <div className="p-4">
            {activeSection ? (
              renderSectionContent()
            ) : (
              <div className="space-y-3">
                {/* Wood Selection */}
                <Card className="border border-gray-200">
                  <Button
                    variant="ghost"
                    className="w-full p-4 justify-between hover:bg-gray-50"
                    onClick={() => setActiveSection("wood")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                        <Star className="w-4 h-4 text-amber-700" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Wood Type</div>
                        <div className="text-sm text-gray-600">
                          {woodTypes.find((w) => w.id === config.woodType)?.name}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Button>
                </Card>

                {/* Fabric Selection */}
                <Card className="border border-gray-200">
                  <Button
                    variant="ghost"
                    className="w-full p-4 justify-between hover:bg-gray-50"
                    onClick={() => setActiveSection("fabric")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                        <Star className="w-4 h-4 text-purple-700" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Fabric Type</div>
                        <div className="text-sm text-gray-600">
                          {fabricTypes.find((f) => f.id === config.fabricType)?.name}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Button>
                </Card>

                {/* Frame Color */}
                <Card className="border border-gray-200">
                  <Button
                    variant="ghost"
                    className="w-full p-4 justify-between hover:bg-gray-50"
                    onClick={() => setActiveSection("frameColor")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                        <Palette className="w-4 h-4 text-blue-700" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Frame Color</div>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded border border-gray-300"
                            style={{ backgroundColor: config.frameColor }}
                          />
                          <span className="text-sm text-gray-600">
                            {frameColors.find((c) => c.color === config.frameColor)?.name || "Custom"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Button>
                </Card>

                {/* Fabric Color */}
                <Card className="border border-gray-200">
                  <Button
                    variant="ghost"
                    className="w-full p-4 justify-between hover:bg-gray-50"
                    onClick={() => setActiveSection("fabricColor")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                        <Palette className="w-4 h-4 text-green-700" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Fabric Color</div>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded border border-gray-300"
                            style={{ backgroundColor: config.fabricColor }}
                          />
                          <span className="text-sm text-gray-600">
                            {fabricColors.find((c) => c.color === config.fabricColor)?.name || "Custom"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Button>
                </Card>

                {/* Size Selection */}
                <Card className="border border-gray-200">
                  <Button
                    variant="ghost"
                    className="w-full p-4 justify-between hover:bg-gray-50"
                    onClick={() => setActiveSection("size")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                        <Ruler className="w-4 h-4 text-orange-700" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Size</div>
                        <div className="text-sm text-gray-600">
                          {sizeOptions.find((s) => s.id === config.size)?.name}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Button>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
