"use client"

import { useState } from "react"
import type { FurnitureConfig, FurnitureItem } from "@/app/page"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Check,
  Crown,
  Star,
  Palette,
  Ruler,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Armchair,
  Sofa,
  Table,
  BookOpen,
  Square,
} from "lucide-react"

interface ConfigPanelProps {
  config: FurnitureConfig
  onConfigChange: (config: FurnitureConfig) => void
  selectedItem: FurnitureItem
  onItemChange: (item: FurnitureItem) => void
}

const furnitureItems = [
  {
    id: "chair",
    name: "Royal Armchair",
    icon: Armchair,
    price: "From AED 3,200",
    description: "Luxury carved armchair with royal styling and premium upholstery",
    features: ["Hand-carved details", "Premium upholstery", "Gold accents", "Ergonomic design"],
  },
  {
    id: "sofa",
    name: "Majlis Sofa",
    icon: Sofa,
    price: "From AED 12,500",
    description: "Traditional Arabic floor seating with authentic Middle Eastern design",
    features: ["Traditional low profile", "Authentic Arabic design", "Premium cushioning", "Brass inlays"],
  },
  {
    id: "table",
    name: "Heritage Table",
    icon: Table,
    price: "From AED 4,800",
    description: "Ornate coffee table with intricate brass inlays and carved details",
    features: ["Brass medallion center", "Hand-carved apron", "Ornate turned legs", "Lower display shelf"],
  },
  {
    id: "bookshelf",
    name: "Executive Shelf",
    icon: BookOpen,
    price: "From AED 6,200",
    description: "Professional bookshelf with adjustable shelves and cabinet doors",
    features: ["Adjustable shelves", "Cabinet storage", "Crown molding", "Executive finish"],
  },
  {
    id: "stool",
    name: "Designer Stool",
    icon: Square,
    price: "From AED 1,800",
    description: "Modern designer stool with premium materials and sleek styling",
    features: ["Minimalist design", "Premium padding", "Sturdy construction", "Versatile use"],
  },
] as const

const woodTypes = [
  {
    id: "oak",
    name: "European Oak",
    description: "Classic & durable",
    color: "#DEB887",
    premium: false,
    grain: "Medium",
  },
  {
    id: "walnut",
    name: "American Walnut",
    description: "Rich & elegant",
    color: "#8B4513",
    premium: true,
    grain: "Fine",
  },
  {
    id: "mahogany",
    name: "Honduran Mahogany",
    description: "Luxurious & smooth",
    color: "#C04000",
    premium: true,
    grain: "Fine",
  },
  {
    id: "cherry",
    name: "Wild Cherry",
    description: "Warm & sophisticated",
    color: "#DE3163",
    premium: true,
    grain: "Medium",
  },
  {
    id: "teak",
    name: "Burmese Teak",
    description: "Exotic & prestigious",
    color: "#CD853F",
    premium: true,
    grain: "Fine",
  },
]

const fabricTypes = [
  { id: "leather", name: "Italian Leather", description: "Premium Nappa leather", premium: true, texture: "Smooth" },
  { id: "velvet", name: "Silk Velvet", description: "Luxurious European velvet", premium: true, texture: "Plush" },
  { id: "cotton", name: "Organic Cotton", description: "Natural & breathable", premium: false, texture: "Woven" },
  { id: "linen", name: "Belgian Linen", description: "Fine European linen", premium: true, texture: "Textured" },
  { id: "silk", name: "Mulberry Silk", description: "Pure silk upholstery", premium: true, texture: "Smooth" },
]

const sizeOptions = [
  { id: "small", name: "Compact", description: "Space-saving design", scale: "0.9x", rooms: "Studio, Small rooms" },
  { id: "medium", name: "Standard", description: "Perfect proportions", scale: "1.0x", rooms: "Living room, Office" },
  { id: "large", name: "Grand", description: "Statement piece", scale: "1.1x", rooms: "Large spaces, Villa" },
]

const premiumFrameColors = [
  { color: "#2C1810", name: "Espresso", premium: true, finish: "Satin" },
  { color: "#8B4513", name: "Cognac", premium: true, finish: "Gloss" },
  { color: "#A0522D", name: "Sienna", premium: false, finish: "Matte" },
  { color: "#654321", name: "Dark Chocolate", premium: true, finish: "Satin" },
  { color: "#D2691E", name: "Amber", premium: false, finish: "Matte" },
  { color: "#CD853F", name: "Golden Oak", premium: false, finish: "Satin" },
  { color: "#8B7355", name: "Driftwood", premium: true, finish: "Matte" },
  { color: "#A0785A", name: "Caramel", premium: false, finish: "Satin" },
  { color: "#5D4037", name: "Walnut", premium: true, finish: "Gloss" },
]

const premiumFabricColors = [
  { color: "#2C1810", name: "Midnight", premium: true, mood: "Elegant" },
  { color: "#8B0000", name: "Burgundy", premium: true, mood: "Royal" },
  { color: "#191970", name: "Royal Navy", premium: true, mood: "Classic" },
  { color: "#006400", name: "Forest", premium: false, mood: "Natural" },
  { color: "#4B0082", name: "Imperial Purple", premium: true, mood: "Luxury" },
  { color: "#800080", name: "Plum", premium: true, mood: "Rich" },
  { color: "#2F4F4F", name: "Charcoal", premium: false, mood: "Modern" },
  { color: "#654321", name: "Tobacco", premium: true, mood: "Warm" },
  { color: "#8B4513", name: "Cognac", premium: true, mood: "Classic" },
  { color: "#556B2F", name: "Olive", premium: false, mood: "Natural" },
  { color: "#B22222", name: "Crimson", premium: true, mood: "Bold" },
  { color: "#483D8B", name: "Sapphire", premium: true, mood: "Elegant" },
]

export function ConfigPanel({ config, onConfigChange, selectedItem, onItemChange }: ConfigPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    items: true,
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

  const selectedItemData = furnitureItems.find((item) => item.id === selectedItem)

  const PremiumBadge = ({ premium }: { premium: boolean }) => {
    if (!premium) return null
    return (
      <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs">
        <Crown className="w-3 h-3 mr-1" />
        Premium
      </Badge>
    )
  }

  const SectionHeader = ({
    title,
    icon: Icon,
    section,
    subtitle,
  }: {
    title: string
    icon: any
    section: keyof typeof expandedSections
    subtitle?: string
  }) => (
    <Button
      variant="ghost"
      className="w-full justify-between p-4 h-auto hover:bg-gray-50/50"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-amber-700" />
        </div>
        <div className="text-left">
          <div className="font-semibold text-gray-900">{title}</div>
          {subtitle && <div className="text-sm text-gray-600">{subtitle}</div>}
        </div>
      </div>
      {expandedSections[section] ? (
        <ChevronUp className="w-4 h-4 text-gray-400" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-400" />
      )}
    </Button>
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
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

      {/* Configuration Options */}
      <div className="flex-1 overflow-y-auto config-panel-scroll">
        <div className="space-y-1 p-4">
          {/* Furniture Item Selection */}
          <Card className="border-0 shadow-none">
            <SectionHeader
              title="Furniture Selection"
              icon={selectedItemData?.icon || Armchair}
              section="items"
              subtitle={selectedItemData?.name}
            />
            {expandedSections.items && (
              <CardContent className="p-4 pt-0">
                {/* Current Selection Display */}
                {selectedItemData && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-amber-300 rounded-xl flex items-center justify-center flex-shrink-0">
                        <selectedItemData.icon className="w-6 h-6 text-amber-800" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-bold text-amber-900">{selectedItemData.name}</h3>
                          <Badge className="bg-amber-600 text-white text-xs">Selected</Badge>
                        </div>
                        <p className="text-sm text-amber-800 mb-2">{selectedItemData.description}</p>
                        <div className="text-sm font-semibold text-amber-900 mb-3">{selectedItemData.price}</div>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedItemData.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-1 text-xs text-amber-800">
                              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Item Selection Grid */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Choose Different Item:</h4>
                  {furnitureItems.map((item) => {
                    const Icon = item.icon
                    const isSelected = selectedItem === item.id
                    return (
                      <Button
                        key={item.id}
                        variant={isSelected ? "default" : "outline"}
                        className={`w-full p-3 h-auto justify-start text-left transition-all duration-200 ${
                          isSelected
                            ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg border-amber-500"
                            : "hover:bg-gray-50 border-gray-200"
                        }`}
                        onClick={() => onItemChange(item.id as FurnitureItem)}
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              isSelected ? "bg-white/20" : "bg-gradient-to-br from-gray-100 to-gray-200"
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-gray-600"}`} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium flex items-center">
                              {item.name}
                              {isSelected && <Check className="w-4 h-4 ml-auto" />}
                            </div>
                            <div className={`text-sm ${isSelected ? "opacity-90" : "text-gray-500"}`}>{item.price}</div>
                          </div>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            )}
          </Card>

          <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Wood Type Selection */}
          <Card className="border-0 shadow-none">
            <SectionHeader
              title="Wood Selection"
              icon={Star}
              section="wood"
              subtitle={`${woodTypes.find((w) => w.id === config.woodType)?.name}`}
            />
            {expandedSections.wood && (
              <CardContent className="p-4 pt-0 space-y-3">
                {woodTypes.map((wood) => (
                  <Button
                    key={wood.id}
                    variant={config.woodType === wood.id ? "default" : "outline"}
                    className={`w-full p-4 h-auto justify-start text-left transition-all duration-200 ${
                      config.woodType === wood.id
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg border-amber-500"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                    onClick={() => updateConfig({ woodType: wood.id as FurnitureConfig["woodType"] })}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div
                        className="w-10 h-10 rounded-xl border-2 border-white/20 shadow-sm"
                        style={{ backgroundColor: wood.color }}
                      />
                      <div className="flex-1">
                        <div className="font-medium flex items-center">
                          {wood.name}
                          <PremiumBadge premium={wood.premium} />
                          {config.woodType === wood.id && <Check className="w-4 h-4 ml-auto" />}
                        </div>
                        <div className="text-sm opacity-75">{wood.description}</div>
                        <div className="text-xs opacity-60">Grain: {wood.grain}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            )}
          </Card>

          <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Fabric Type Selection */}
          <Card className="border-0 shadow-none">
            <SectionHeader
              title="Upholstery Selection"
              icon={Sparkles}
              section="fabric"
              subtitle={`${fabricTypes.find((f) => f.id === config.fabricType)?.name}`}
            />
            {expandedSections.fabric && (
              <CardContent className="p-4 pt-0 space-y-3">
                {fabricTypes.map((fabric) => (
                  <Button
                    key={fabric.id}
                    variant={config.fabricType === fabric.id ? "default" : "outline"}
                    className={`w-full p-4 h-auto justify-start text-left transition-all duration-200 ${
                      config.fabricType === fabric.id
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg border-amber-500"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                    onClick={() => updateConfig({ fabricType: fabric.id as FurnitureConfig["fabricType"] })}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="w-10 h-10 rounded-xl border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm" />
                      <div className="flex-1">
                        <div className="font-medium flex items-center">
                          {fabric.name}
                          <PremiumBadge premium={fabric.premium} />
                          {config.fabricType === fabric.id && <Check className="w-4 h-4 ml-auto" />}
                        </div>
                        <div className="text-sm opacity-75">{fabric.description}</div>
                        <div className="text-xs opacity-60">Texture: {fabric.texture}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            )}
          </Card>

          <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Frame Color Selection */}
          <Card className="border-0 shadow-none">
            <SectionHeader
              title="Frame Finish"
              icon={Palette}
              section="frameColor"
              subtitle={`${premiumFrameColors.find((c) => c.color === config.frameColor)?.name || "Custom"}`}
            />
            {expandedSections.frameColor && (
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {premiumFrameColors.map((preset) => (
                    <Button
                      key={preset.color}
                      variant="outline"
                      className={`w-full h-20 p-2 border-2 transition-all duration-200 hover:scale-105 relative ${
                        config.frameColor === preset.color
                          ? "border-amber-500 ring-2 ring-amber-200 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => updateConfig({ frameColor: preset.color })}
                      title={`${preset.name} - ${preset.finish} finish`}
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
                      <div className="absolute bottom-1 left-1 right-1">
                        <div className="text-xs font-medium text-center bg-white/90 rounded px-1 py-0.5">
                          {preset.name}
                        </div>
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
              </CardContent>
            )}
          </Card>

          <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Fabric Color Selection */}
          <Card className="border-0 shadow-none">
            <SectionHeader
              title="Upholstery Color"
              icon={Palette}
              section="fabricColor"
              subtitle={`${premiumFabricColors.find((c) => c.color === config.fabricColor)?.name || "Custom"}`}
            />
            {expandedSections.fabricColor && (
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {premiumFabricColors.map((preset) => (
                    <Button
                      key={preset.color}
                      variant="outline"
                      className={`w-full h-16 p-1 border-2 transition-all duration-200 hover:scale-105 relative ${
                        config.fabricColor === preset.color
                          ? "border-amber-500 ring-2 ring-amber-200 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => updateConfig({ fabricColor: preset.color })}
                      title={`${preset.name} - ${preset.mood} mood`}
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
              </CardContent>
            )}
          </Card>

          <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Size Selection */}
          <Card className="border-0 shadow-none">
            <SectionHeader
              title="Size Options"
              icon={Ruler}
              section="size"
              subtitle={`${sizeOptions.find((s) => s.id === config.size)?.name}`}
            />
            {expandedSections.size && (
              <CardContent className="p-4 pt-0 space-y-3">
                {sizeOptions.map((size) => (
                  <Button
                    key={size.id}
                    variant={config.size === size.id ? "default" : "outline"}
                    className={`w-full p-4 h-auto justify-start text-left transition-all duration-200 ${
                      config.size === size.id
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg border-amber-500"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                    onClick={() => updateConfig({ size: size.id as FurnitureConfig["size"] })}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="w-10 h-10 rounded-xl border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold shadow-sm">
                        {size.scale}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium flex items-center">
                          {size.name}
                          {config.size === size.id && <Check className="w-4 h-4 ml-auto" />}
                        </div>
                        <div className="text-sm opacity-75">{size.description}</div>
                        <div className="text-xs opacity-60">Best for: {size.rooms}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
