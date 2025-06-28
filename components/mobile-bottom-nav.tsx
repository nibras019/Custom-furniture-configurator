"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Settings, DollarSign, MessageCircle } from "lucide-react"
import type { FurnitureConfig, FurnitureItem } from "@/app/page"

interface MobileBottomNavProps {
  activeTab: "home" | "config" | "price" | "contact"
  onTabChange: (tab: "home" | "config" | "price" | "contact") => void
  config: FurnitureConfig
  item: FurnitureItem
}

const basePrices = {
  chair: 2500,
  sofa: 8500,
  table: 3200,
  bookshelf: 4800,
  ottoman: 1800,
}

export function MobileBottomNav({ activeTab, onTabChange, config, item }: MobileBottomNavProps) {
  const basePrice = basePrices[item]
  const estimatedPrice = Math.round(basePrice * 1.2) // Quick estimation

  return (
    <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-lg safe-area-bottom ui-overlay no-zoom">
      <div className="px-4 py-2">
        {/* Quick Price Display */}
        <div className="flex items-center justify-between mb-3 p-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
          <div>
            <div className="text-sm font-medium text-amber-900">Estimated Price</div>
            <div className="text-lg font-bold text-amber-800">AED {estimatedPrice.toLocaleString()}</div>
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold px-4"
            onClick={() => onTabChange("price")}
          >
            View Details
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1">
          <Button
            variant={activeTab === "home" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("home")}
            className={`flex flex-col items-center space-y-1 h-auto py-3 ${
              activeTab === "home"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-xs font-medium">View</span>
          </Button>

          <Button
            variant={activeTab === "config" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("config")}
            className={`flex flex-col items-center space-y-1 h-auto py-3 relative ${
              activeTab === "config"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-xs font-medium">Customize</span>
            <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500 animate-pulse" />
          </Button>

          <Button
            variant={activeTab === "price" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("price")}
            className={`flex flex-col items-center space-y-1 h-auto py-3 ${
              activeTab === "price"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-medium">Price</span>
          </Button>

          <Button
            variant={activeTab === "contact" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("contact")}
            className={`flex flex-col items-center space-y-1 h-auto py-3 ${
              activeTab === "contact"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs font-medium">Contact</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
