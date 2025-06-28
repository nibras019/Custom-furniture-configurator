"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, MessageCircle, Share2, Heart, Camera, ChevronLeft, ChevronRight } from "lucide-react"

interface FloatingActionsProps {
  onConfigToggle: () => void
  onContactClick: () => void
  isConfigOpen: boolean
}

export function FloatingActions({ onConfigToggle, onContactClick, isConfigOpen }: FloatingActionsProps) {
  return (
    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 space-y-3">
      {/* Configuration Toggle */}
      <Button
        onClick={onConfigToggle}
        className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-xl shadow-xl border border-gray-200/50 hover:bg-gray-50 text-gray-700"
        size="sm"
      >
        {isConfigOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </Button>

      {/* Quick Actions */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-2 space-y-2">
        <Button variant="ghost" size="sm" className="w-10 h-10 rounded-xl hover:bg-gray-50 relative" title="Customize">
          <Settings className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 rounded-xl hover:bg-gray-50 relative"
          title="Save to Favorites"
        >
          <Heart className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" className="w-10 h-10 rounded-xl hover:bg-gray-50" title="Take Screenshot">
          <Camera className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" className="w-10 h-10 rounded-xl hover:bg-gray-50" title="Share">
          <Share2 className="w-4 h-4" />
        </Button>

        <Button
          onClick={onContactClick}
          className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white relative"
          size="sm"
          title="Contact Us"
        >
          <MessageCircle className="w-4 h-4" />
          <Badge className="absolute -top-1 -right-1 w-3 h-3 p-0 bg-red-500 text-white text-xs animate-pulse">!</Badge>
        </Button>
      </div>
    </div>
  )
}
