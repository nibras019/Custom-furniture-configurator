"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Menu, Search, User, ShoppingBag } from "lucide-react"

interface NavigationHeaderProps {
  onContactClick: () => void
}

export function NavigationHeader({ onContactClick }: NavigationHeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+971 4 XXX XXXX</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@majlisfurniture.ae</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Dubai Design District</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200">
              Free Delivery
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
              5 Year Warranty
            </Badge>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  MAJLIS LUXURY
                </h1>
                <p className="text-sm text-gray-600 font-medium">Premium Furniture Collection</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Collections
            </a>
            <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Custom Design
            </a>
            <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Showroom
            </a>
            <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              About
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingBag className="w-4 h-4" />
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-amber-500 text-white text-xs">
                0
              </Badge>
            </Button>
            <Button
              onClick={onContactClick}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-6 shadow-lg"
            >
              Get Quote
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
