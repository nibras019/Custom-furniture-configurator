"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Share2, Star, Crown } from "lucide-react"
import type { FurnitureConfig, FurnitureItem } from "@/app/page"

interface PriceDisplayProps {
  config: FurnitureConfig
  item: FurnitureItem
}

const basePrices = {
  chair: 3200,
  sofa: 12500,
  table: 4800,
  bookshelf: 6200,
  stool: 1800,
}

const materialPremiums = {
  woodType: {
    oak: 0,
    walnut: 800,
    mahogany: 1200,
    cherry: 900,
    teak: 1800,
  },
  fabricType: {
    cotton: 0,
    linen: 500,
    leather: 1200,
    velvet: 900,
    silk: 1500,
  },
  size: {
    small: -300,
    medium: 0,
    large: 600,
  },
}

export function PriceDisplay({ config, item }: PriceDisplayProps) {
  const totalPrice = useMemo(() => {
    const basePrice = basePrices[item]
    const woodPremium = materialPremiums.woodType[config.woodType]
    const fabricPremium = materialPremiums.fabricType[config.fabricType]
    const sizePremium = materialPremiums.size[config.size]

    return basePrice + woodPremium + fabricPremium + sizePremium
  }, [config, item])

  const itemNames = {
    chair: "Royal Armchair",
    sofa: "Majlis Luxury Sofa",
    table: "Heritage Coffee Table",
    bookshelf: "Executive Bookshelf",
    stool: "Designer Stool",
  }

  const itemDescriptions = {
    chair: "Handcrafted royal armchair with premium upholstery and gold accents",
    sofa: "Traditional Arabic majlis seating with authentic Middle Eastern design",
    table: "Heritage coffee table featuring intricate brass inlays and carved details",
    bookshelf: "Executive bookshelf with adjustable shelves and cabinet storage",
    stool: "Modern designer stool with premium materials and sleek styling",
  }

  const savings = Math.round(totalPrice * 0.15) // Show 15% savings

  return (
    <Card className="m-6 bg-gradient-to-br from-amber-50 to-white border-amber-200 shadow-xl">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Item Title */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-xl font-bold text-amber-900">{itemNames[item]}</h3>
              <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
            <p className="text-sm text-amber-700 mb-3">{itemDescriptions[item]}</p>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm text-gray-600 ml-2">(4.9/5 from 127 reviews)</span>
            </div>
          </div>

          {/* Configuration Summary */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Wood Type:</span>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {config.woodType.charAt(0).toUpperCase() + config.woodType.slice(1)}
                {materialPremiums.woodType[config.woodType] > 0 && <Crown className="w-3 h-3 ml-1" />}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Upholstery:</span>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {config.fabricType.charAt(0).toUpperCase() + config.fabricType.slice(1)}
                {materialPremiums.fabricType[config.fabricType] > 0 && <Crown className="w-3 h-3 ml-1" />}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Size:</span>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {config.size.charAt(0).toUpperCase() + config.size.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-amber-200 pt-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price:</span>
                <span>AED {basePrices[item].toLocaleString()}</span>
              </div>
              {materialPremiums.woodType[config.woodType] > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Premium Wood:</span>
                  <span>+AED {materialPremiums.woodType[config.woodType].toLocaleString()}</span>
                </div>
              )}
              {materialPremiums.fabricType[config.fabricType] > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Premium Fabric:</span>
                  <span>+AED {materialPremiums.fabricType[config.fabricType].toLocaleString()}</span>
                </div>
              )}
              {materialPremiums.size[config.size] !== 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Size Adjustment:</span>
                  <span>
                    {materialPremiums.size[config.size] > 0 ? "+" : ""}AED{" "}
                    {materialPremiums.size[config.size].toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-amber-200 mt-3 pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-700">Total Price:</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-900">AED {totalPrice.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Including 5% VAT</div>
                </div>
              </div>

              {/* Savings Badge */}
              <div className="bg-emerald-100 border border-emerald-200 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-emerald-800">Limited Time Offer</div>
                    <div className="text-xs text-emerald-700">
                      Save AED {savings.toLocaleString()} with our premium package
                    </div>
                  </div>
                  <Badge className="bg-emerald-500 text-white">15% OFF</Badge>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 h-12">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart - AED {totalPrice.toLocaleString()}
              </Button>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Delivery & Service Info */}
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="text-sm text-emerald-800">
                  <div className="font-semibold flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Free White Glove Delivery
                  </div>
                  <div className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>5 Year Comprehensive Warranty
                  </div>
                  <div className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    30 Day Money Back Guarantee
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-800">
                  <div className="font-semibold">🇦🇪 Made in Dubai Excellence</div>
                  <div>Handcrafted by master artisans using premium materials</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
