"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CuboidIcon as Cube, Smartphone, Home, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"

interface ViewControlsProps {
  viewMode: "3d" | "ar" | "room"
  onViewModeChange: (mode: "3d" | "ar" | "room") => void
}

export function ViewControls({ viewMode, onViewModeChange }: ViewControlsProps) {
  return (
    <div className="space-y-3">
      {/* View Mode Selector */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-2">
        <div className="flex space-x-1">
          <Button
            variant={viewMode === "3d" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("3d")}
            className={`flex-1 ${
              viewMode === "3d" ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white" : "hover:bg-gray-50"
            }`}
          >
            <Cube className="w-4 h-4 mr-2" />
            3D View
          </Button>
          <Button
            variant={viewMode === "ar" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("ar")}
            className={`flex-1 ${
              viewMode === "ar" ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white" : "hover:bg-gray-50"
            }`}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            AR View
            <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800 text-xs">
              New
            </Badge>
          </Button>
          <Button
            variant={viewMode === "room" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("room")}
            className={`flex-1 ${
              viewMode === "room" ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white" : "hover:bg-gray-50"
            }`}
          >
            <Home className="w-4 h-4 mr-2" />
            Room
          </Button>
        </div>
      </div>

      {/* Camera Controls */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-2">
        <div className="grid grid-cols-3 gap-1">
          <Button variant="ghost" size="sm" className="hover:bg-gray-50">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-50">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-50">
            <ZoomOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
