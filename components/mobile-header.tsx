"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, Phone, MessageCircle } from "lucide-react"
import type { FurnitureItem } from "@/app/page"

interface MobileHeaderProps {
  selectedItem: FurnitureItem
  onMenuClick: () => void
  onContactClick: () => void
}

const itemNames = {
  chair: "Royal Armchair",
  sofa: "Majlis Sofa",
  table: "Heritage Table",
  bookshelf: "Executive Shelf",
  ottoman: "Palace Ottoman",
}

export function MobileHeader({ selectedItem, onMenuClick, onContactClick }: MobileHeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg sticky top-0 z-50 safe-area-top">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-bold">M</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">MAJLIS</h1>
              <p className="text-xs text-gray-600">{itemNames[selectedItem]}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onContactClick}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="w-10 h-10 rounded-xl border border-gray-200 hover:bg-gray-50"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-xs">
              5Y Warranty
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
              Free Delivery
            </Badge>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            <Phone className="w-3 h-3" />
            <span>+971 4 XXX XXXX</span>
          </div>
        </div>
      </div>
    </header>
  )
}
