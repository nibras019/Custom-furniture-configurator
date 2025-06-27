"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Check, Share2 } from "lucide-react"

interface SaveModalProps {
  isOpen: boolean
  onClose: () => void
  shareUrl: string
  onCopy: (text: string) => Promise<void>
}

export function SaveModal({ isOpen, onClose, shareUrl, onCopy }: SaveModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await onCopy(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Custom Furniture Design",
          text: "Check out my custom furniture configuration!",
          url: shareUrl,
        })
      } catch (error) {
        // Fallback to copy if share fails
        handleCopy()
      }
    } else {
      handleCopy()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Configuration Saved!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Your furniture configuration has been saved. Share this link with others to show them your design.
          </p>

          <div className="space-y-2">
            <Label htmlFor="share-url" className="text-sm font-medium">
              Shareable Link
            </Label>
            <div className="flex space-x-2">
              <Input id="share-url" value={shareUrl} readOnly className="flex-1" />
              <Button onClick={handleCopy} variant="outline" size="icon" className="shrink-0">
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button onClick={handleShare} className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
