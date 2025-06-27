"use client"

import type { FurnitureConfig, FurnitureItem } from "@/app/page"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Crown, Star } from "lucide-react"

interface ConfigPanelProps {
  config: FurnitureConfig
  onConfigChange: (config: FurnitureConfig) => void
  selectedItem: FurnitureItem
}

const woodTypes = [
  { id: "oak", name: "European Oak", description: "Classic & durable", color: "#DEB887", premium: false },
  { id: "walnut", name: "American Walnut", description: "Rich & elegant", color: "#8B4513", premium: true },
  { id: "mahogany", name: "Honduran Mahogany", description: "Luxurious & smooth", color: "#C04000", premium: true },
  { id: "cherry", name: "Wild Cherry", description: "Warm & sophisticated", color: "#DE3163", premium: true },
  { id: "teak", name: "Burmese Teak", description: "Exotic & prestigious", color: "#CD853F", premium: true },
]

const fabricTypes = [
  { id: "leather", name: "Italian Leather", description: "Premium Nappa leather", premium: true },
  { id: "velvet", name: "Silk Velvet", description: "Luxurious European velvet", premium: true },
  { id: "cotton", name: "Organic Cotton", description: "Natural & breathable", premium: false },
  { id: "linen", name: "Belgian Linen", description: "Fine European linen", premium: true },
  { id: "silk", name: "Mulberry Silk", description: "Pure silk upholstery", premium: true },
]

const sizeOptions = [
  { id: "small", name: "Compact", description: "Space-saving design", scale: "0.8x" },
  { id: "medium", name: "Standard", description: "Perfect proportions", scale: "1.0x" },
  { id: "large", name: "Grand", description: "Statement piece", scale: "1.2x" },
]

const premiumFrameColors = [
  { color: "#2C1810", name: "Espresso", premium: true },
  { color: "#8B4513", name: "Cognac", premium: true },
  { color: "#A0522D", name: "Sienna", premium: false },
  { color: "#654321", name: "Dark Chocolate", premium: true },
  { color: "#D2691E", name: "Amber", premium: false },
  { color: "#CD853F", name: "Golden Oak", premium: false },
  { color: "#8B7355", name: "Driftwood", premium: true },
  { color: "#A0785A", name: "Caramel", premium: false },
  { color: "#5D4037", name: "Walnut", premium: true },
]

const premiumFabricColors = [
  { color: "#2C1810", name: "Midnight", premium: true },
  { color: "#8B0000", name: "Burgundy", premium: true },
  { color: "#191970", name: "Royal Navy", premium: true },
  { color: "#006400", name: "Forest", premium: false },
  { color: "#4B0082", name: "Imperial Purple", premium: true },
  { color: "#800080", name: "Plum", premium: true },
  { color: "#2F4F4F", name: "Charcoal", premium: false },
  { color: "#654321", name: "Tobacco", premium: true },
  { color: "#8B4513", name: "Cognac", premium: true },
  { color: "#556B2F", name: "Olive", premium: false },
  { color: "#B22222", name: "Crimson", premium: true },
  { color: "#483D8B", name: "Sapphire", premium: true },
]

const itemNames = {
  chair: "Armchair",
  sofa: "Luxury Sofa",
  table: "Coffee Table",
  bookshelf: "Bookshelf",
  ottoman: "Ottoman",
}

export function ConfigPanel({ config, onConfigChange, selectedItem }: ConfigPanelProps) {
  const updateConfig = (updates: Partial<FurnitureConfig>) => {
    onConfigChange({ ...config, ...updates })
  }

  const PremiumBadge = ({ premium }: { premium: boolean }) => {
    if (!premium) return null
    return (
      <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
        <Crown className="w-3 h-3 mr-1" />
        Premium
      </Badge>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-900">Configure</h2>
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <p className="text-sm text-gray-600">Customize your {itemNames[selectedItem]}</p>
      </div>

      {/* Configuration Options */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Wood Type Selection */}
        <div>
          <Label className="text-lg font-semibold text-gray-900 mb-4 block flex items-center">
            Wood Selection
            <Star className="w-4 h-4 ml-2 text-amber-500" />
          </Label>
          <div className="grid gap-3">
            {woodTypes.map((wood) => (
              <Button
                key={wood.id}
                variant={config.woodType === wood.id ? "default" : "outline"}
                className={`w-full p-4 h-auto justify-start text-left transition-all duration-200 ${
                  config.woodType === wood.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => updateConfig({ woodType: wood.id as FurnitureConfig["woodType"] })}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div
                    className="w-8 h-8 rounded-lg border-2 border-white/20 shadow-sm"
                    style={{ backgroundColor: wood.color }}
                  />
                  <div className="flex-1">
                    <div className="font-medium flex items-center">
                      {wood.name}
                      <PremiumBadge premium={wood.premium} />
                      {config.woodType === wood.id && <Check className="w-4 h-4 ml-auto" />}
                    </div>
                    <div className="text-sm opacity-75">{wood.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Fabric Type Selection */}
        <div>
          <Label className="text-lg font-semibold text-gray-900 mb-4 block flex items-center">
            Upholstery Selection
            <Star className="w-4 h-4 ml-2 text-amber-500" />
          </Label>
          <div className="grid gap-3">
            {fabricTypes.map((fabric) => (
              <Button
                key={fabric.id}
                variant={config.fabricType === fabric.id ? "default" : "outline"}
                className={`w-full p-4 h-auto justify-start text-left transition-all duration-200 ${
                  config.fabricType === fabric.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => updateConfig({ fabricType: fabric.id as FurnitureConfig["fabricType"] })}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 rounded-lg border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm" />
                  <div className="flex-1">
                    <div className="font-medium flex items-center">
                      {fabric.name}
                      <PremiumBadge premium={fabric.premium} />
                      {config.fabricType === fabric.id && <Check className="w-4 h-4 ml-auto" />}
                    </div>
                    <div className="text-sm opacity-75">{fabric.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Frame Color Selection */}
        <div>
          <Label className="text-lg font-semibold text-gray-900 mb-4 block">Frame Finish</Label>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {premiumFrameColors.map((preset) => (
              <Button
                key={preset.color}
                variant="outline"
                className={`w-full h-20 p-2 border-2 transition-all duration-200 hover:scale-105 relative ${
                  config.frameColor === preset.color
                    ? "border-blue-500 ring-2 ring-blue-200 shadow-lg"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => updateConfig({ frameColor: preset.color })}
                title={preset.name}
              >
                <div className="w-full h-full rounded-lg shadow-inner" style={{ backgroundColor: preset.color }}>
                  {preset.premium && (
                    <div className="absolute top-1 right-1">
                      <Crown className="w-3 h-3 text-yellow-400" />
                    </div>
                  )}
                  {config.frameColor === preset.color && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white drop-shadow-lg" />
                    </div>
                  )}
                </div>
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <Label htmlFor="frame-color-input" className="text-sm font-medium">
              Custom Finish:
            </Label>
            <input
              id="frame-color-input"
              type="color"
              value={config.frameColor}
              onChange={(e) => updateConfig({ frameColor: e.target.value })}
              className="w-12 h-8 rounded-lg border border-gray-300 cursor-pointer shadow-sm"
            />
            <span className="text-sm text-gray-600 font-mono bg-white px-2 py-1 rounded border">
              {config.frameColor.toUpperCase()}
            </span>
          </div>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Fabric Color Selection */}
        <div>
          <Label className="text-lg font-semibold text-gray-900 mb-4 block">Upholstery Color</Label>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {premiumFabricColors.map((preset) => (
              <Button
                key={preset.color}
                variant="outline"
                className={`w-full h-16 p-1 border-2 transition-all duration-200 hover:scale-105 relative ${
                  config.fabricColor === preset.color
                    ? "border-blue-500 ring-2 ring-blue-200 shadow-lg"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => updateConfig({ fabricColor: preset.color })}
                title={preset.name}
              >
                <div className="w-full h-full rounded shadow-inner" style={{ backgroundColor: preset.color }}>
                  {preset.premium && (
                    <div className="absolute top-0.5 right-0.5">
                      <Crown className="w-2.5 h-2.5 text-yellow-400" />
                    </div>
                  )}
                  {config.fabricColor === preset.color && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white drop-shadow-lg" />
                    </div>
                  )}
                </div>
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <Label htmlFor="fabric-color-input" className="text-sm font-medium">
              Custom Color:
            </Label>
            <input
              id="fabric-color-input"
              type="color"
              value={config.fabricColor}
              onChange={(e) => updateConfig({ fabricColor: e.target.value })}
              className="w-12 h-8 rounded-lg border border-gray-300 cursor-pointer shadow-sm"
            />
            <span className="text-sm text-gray-600 font-mono bg-white px-2 py-1 rounded border">
              {config.fabricColor.toUpperCase()}
            </span>
          </div>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Size Selection */}
        <div>
          <Label className="text-lg font-semibold text-gray-900 mb-4 block">Size Options</Label>
          <div className="grid gap-3">
            {sizeOptions.map((size) => (
              <Button
                key={size.id}
                variant={config.size === size.id ? "default" : "outline"}
                className={`w-full p-4 h-auto justify-start text-left transition-all duration-200 ${
                  config.size === size.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => updateConfig({ size: size.id as FurnitureConfig["size"] })}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 rounded-lg border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold shadow-sm">
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
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="p-6 border-t border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
          Your Configuration
        </h3>
        <div className="text-sm text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span>Wood:</span>
            <span className="font-medium">{woodTypes.find((w) => w.id === config.woodType)?.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Upholstery:</span>
            <span className="font-medium">{fabricTypes.find((f) => f.id === config.fabricType)?.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Size:</span>
            <span className="font-medium">{sizeOptions.find((s) => s.id === config.size)?.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
