'use client'

import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FloatingCallButtonProps {
  phone?: string
  label?: string
}

export default function FloatingCallButton({
  phone = process.env.NEXT_PUBLIC_SUPPORT_PHONE || '+1234567890',
  label = 'Call Now',
}: FloatingCallButtonProps) {
  const telHref = `tel:${phone}`

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a href={telHref} aria-label={`Call us at ${phone}`}>
        <Button
          className="shadow-lg shadow-black/20 rounded-full px-5 py-6 h-12 gap-2 bg-green-600 hover:bg-green-700"
          size="lg"
        >
          <Phone className="h-5 w-5" />
          <span className="sr-only md:not-sr-only md:inline">{label}</span>
        </Button>
      </a>
    </div>
  )
}

