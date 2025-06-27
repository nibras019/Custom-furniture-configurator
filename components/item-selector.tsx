"use client"

import { Button } from "@/components/ui/button"
import { Armchair, Sofa, Table, BookOpen, Circle } from "lucide-react"
import type { FurnitureItem } from "@/app/page"

interface ItemSelectorProps {
  selectedItem: FurnitureItem
  onItemChange: (item: FurnitureItem) => void
}

const furnitureItems = [
  { id: "chair", name: "Armchair", icon: Armchair, description: "Premium leather armchair" },
  { id: "sofa", name: "Sofa", icon: Sofa, description: "Luxury 3-seater sofa" },
  { id: "table", name: "Coffee Table", icon: Table, description: "Elegant coffee table" },
  { id: "bookshelf", name: "Bookshelf", icon: BookOpen, description: "Modern bookshelf unit" },
  { id: "ottoman", name: "Ottoman", icon: Circle, description: "Comfortable ottoman" },
] as const

export function ItemSelector({ selectedItem, onItemChange }: ItemSelectorProps) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-2">
      <div className="grid grid-cols-1 gap-2">
        {furnitureItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={selectedItem === item.id ? "default" : "ghost"}
              className={`w-full justify-start p-4 h-auto transition-all duration-200 ${
                selectedItem === item.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "hover:bg-gray-100/80 text-gray-700"
              }`}
              onClick={() => onItemChange(item.id as FurnitureItem)}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </div>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
