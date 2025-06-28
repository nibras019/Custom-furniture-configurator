"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Armchair, Sofa, Table, BookOpen, Circle, ChevronDown } from "lucide-react"
import { useState } from "react"
import type { FurnitureItem } from "@/app/page"

interface ItemSelectorProps {
  selectedItem: FurnitureItem
  onItemChange: (item: FurnitureItem) => void
  isMobile: boolean
}

const furnitureItems = [
  {
    id: "chair",
    name: "Royal Armchair",
    icon: Armchair,
    price: "From AED 3,200",
    shortName: "Royal Chair",
    description: "Luxury carved armchair with royal styling",
  },
  {
    id: "sofa",
    name: "Majlis Sofa",
    icon: Sofa,
    price: "From AED 12,500",
    shortName: "Majlis",
    description: "Traditional Arabic floor seating",
  },
  {
    id: "table",
    name: "Heritage Table",
    icon: Table,
    price: "From AED 4,800",
    shortName: "Heritage",
    description: "Ornate coffee table with brass inlays",
  },
  {
    id: "bookshelf",
    name: "Executive Shelf",
    icon: BookOpen,
    price: "From AED 6,200",
    shortName: "Executive",
    description: "Professional bookshelf with cabinet doors",
  },
  {
    id: "ottoman",
    name: "Palace Ottoman",
    icon: Circle,
    price: "From AED 2,800",
    shortName: "Palace",
    description: "Royal tufted ottoman with gold accents",
  },
] as const

export function ItemSelector({ selectedItem, onItemChange, isMobile }: ItemSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const selectedItemData = furnitureItems.find((item) => item.id === selectedItem)

  if (isMobile) {
    return (
      <div className="relative">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
          <Button
            variant="ghost"
            className="w-full p-3 justify-between hover:bg-gray-50/50"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center space-x-3">
              {selectedItemData && (
                <>
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                    <selectedItemData.icon className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-sm">{selectedItemData.shortName}</div>
                    <div className="text-xs text-gray-600">{selectedItemData.price}</div>
                  </div>
                </>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </Button>

          {isExpanded && (
            <div className="border-t border-gray-100 p-2 space-y-1 max-h-80 overflow-y-auto">
              {furnitureItems.map((item) => {
                const Icon = item.icon
                const isSelected = selectedItem === item.id
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`w-full p-3 justify-start transition-all duration-200 ${
                      isSelected
                        ? "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-900 border border-amber-200"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      onItemChange(item.id as FurnitureItem)
                      setIsExpanded(false)
                    }}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? "bg-gradient-to-br from-amber-200 to-amber-300"
                            : "bg-gradient-to-br from-gray-100 to-gray-200"
                        }`}
                      >
                        <Icon className={`w-3 h-3 ${isSelected ? "text-amber-700" : "text-gray-600"}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{item.shortName}</div>
                        <div className="text-xs text-gray-500">{item.price}</div>
                        <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                      </div>
                      {isSelected && (
                        <Badge variant="secondary" className="bg-amber-200 text-amber-800 text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                  </Button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Desktop version with enhanced descriptions
  return (
    <div className="relative">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
        <Button
          variant="ghost"
          className="w-full p-4 justify-between hover:bg-gray-50/50"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-3">
            {selectedItemData && (
              <>
                <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                  <selectedItemData.icon className="w-5 h-5 text-amber-700" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{selectedItemData.name}</div>
                  <div className="text-sm text-gray-600">{selectedItemData.price}</div>
                  <div className="text-xs text-gray-500 mt-1">{selectedItemData.description}</div>
                </div>
              </>
            )}
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        </Button>

        {isExpanded && (
          <div className="border-t border-gray-100 p-2 space-y-1">
            {furnitureItems.map((item) => {
              const Icon = item.icon
              const isSelected = selectedItem === item.id
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full p-3 justify-start transition-all duration-200 ${
                    isSelected
                      ? "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-900 border border-amber-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    onItemChange(item.id as FurnitureItem)
                    setIsExpanded(false)
                  }}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? "bg-gradient-to-br from-amber-200 to-amber-300"
                          : "bg-gradient-to-br from-gray-100 to-gray-200"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? "text-amber-700" : "text-gray-600"}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.price}</div>
                      <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                    </div>
                    {isSelected && (
                      <Badge variant="secondary" className="bg-amber-200 text-amber-800 text-xs">
                        Selected
                      </Badge>
                    )}
                  </div>
                </Button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
