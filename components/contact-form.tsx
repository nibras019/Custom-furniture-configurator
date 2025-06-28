"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, X } from "lucide-react"
import type { FurnitureConfig, FurnitureItem } from "@/app/page"

interface ContactFormProps {
  onClose: () => void
  config: FurnitureConfig
  item: FurnitureItem
  isMobile: boolean
}

export function ContactForm({ onClose, config, item, isMobile }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData, { config, item })
    onClose()
  }

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-white">
          <div>
            <h2 className="text-lg font-bold text-amber-900">Get Quote</h2>
            <p className="text-sm text-gray-600">We'll contact you within 24 hours</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="w-8 h-8 rounded-full">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-amber-800 font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-amber-200 focus:border-amber-400 h-12"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-amber-800 font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-amber-200 focus:border-amber-400 h-12"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-amber-800 font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-amber-200 focus:border-amber-400 h-12"
                placeholder="+971 XX XXX XXXX"
                required
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-amber-800 font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="border-amber-200 focus:border-amber-400"
                rows={4}
                placeholder="Tell us about your requirements..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-4 h-12"
            >
              Send Quote Request
            </Button>
          </form>

          {/* Your Selection */}
          <div className="p-4 bg-amber-100 rounded-xl border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-2">Your Selection:</h4>
            <div className="text-sm text-amber-800 space-y-1">
              <div>Item: {item.charAt(0).toUpperCase() + item.slice(1)}</div>
              <div>Wood: {config.woodType.charAt(0).toUpperCase() + config.woodType.slice(1)}</div>
              <div>Fabric: {config.fabricType.charAt(0).toUpperCase() + config.fabricType.slice(1)}</div>
              <div>Size: {config.size.charAt(0).toUpperCase() + config.size.slice(1)}</div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-amber-900">Contact Information</h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <Phone className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-medium text-amber-800">+971 4 XXX XXXX</div>
                  <div className="text-sm text-gray-600">Call us anytime</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <Mail className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-medium text-amber-800">info@majlisfurniture.ae</div>
                  <div className="text-sm text-gray-600">Email us your requirements</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-medium text-amber-800">Dubai Design District</div>
                  <div className="text-sm text-gray-600">Building 6, Street 3A, Dubai, UAE</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <Clock className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-medium text-amber-800">Sat - Thu: 9AM - 9PM</div>
                  <div className="text-sm text-gray-600">Friday: 2PM - 9PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dubai Advantages */}
          <div className="p-4 bg-emerald-100 rounded-xl border border-emerald-200">
            <h4 className="font-semibold text-emerald-900 mb-2">🇦🇪 Dubai Advantages:</h4>
            <div className="text-sm text-emerald-800 space-y-1">
              <div>✓ Free delivery across UAE</div>
              <div>✓ 5-year comprehensive warranty</div>
              <div>✓ Custom sizing available</div>
              <div>✓ Premium after-sales service</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop version (unchanged)
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-white to-amber-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-900 flex items-center">
            <span className="text-2xl mr-2">🏺</span>
            Get Your Custom Quote
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-amber-800 font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-amber-200 focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-amber-800 font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-amber-200 focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-amber-800 font-medium">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border-amber-200 focus:border-amber-400"
                  placeholder="+971 XX XXX XXXX"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-amber-800 font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="border-amber-200 focus:border-amber-400"
                  rows={4}
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3"
              >
                Send Quote Request
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="font-medium text-amber-800">+971 4 XXX XXXX</div>
                    <div className="text-sm text-gray-600">Call us anytime</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="font-medium text-amber-800">info@majlisfurniture.ae</div>
                    <div className="text-sm text-gray-600">Email us your requirements</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="font-medium text-amber-800">Dubai Design District</div>
                    <div className="text-sm text-gray-600">Building 6, Street 3A, Dubai, UAE</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="font-medium text-amber-800">Sat - Thu: 9AM - 9PM</div>
                    <div className="text-sm text-gray-600">Friday: 2PM - 9PM</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-100 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2">Your Selection:</h4>
              <div className="text-sm text-amber-800">
                <div>Item: {item.charAt(0).toUpperCase() + item.slice(1)}</div>
                <div>Wood: {config.woodType.charAt(0).toUpperCase() + config.woodType.slice(1)}</div>
                <div>Fabric: {config.fabricType.charAt(0).toUpperCase() + config.fabricType.slice(1)}</div>
                <div>Size: {config.size.charAt(0).toUpperCase() + config.size.slice(1)}</div>
              </div>
            </div>

            <div className="p-4 bg-emerald-100 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-2">🇦🇪 Dubai Advantages:</h4>
              <div className="text-sm text-emerald-800 space-y-1">
                <div>✓ Free delivery across UAE</div>
                <div>✓ 5-year comprehensive warranty</div>
                <div>✓ Custom sizing available</div>
                <div>✓ Premium after-sales service</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
