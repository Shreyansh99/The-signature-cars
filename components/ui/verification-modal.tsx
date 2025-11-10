'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
// Simple client-side token generation (CSRFTokenManager uses Node crypto which doesn't work in browser)
const generateSessionId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const generateToken = () => {
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
};

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (code: string, sessionId: string, csrfToken: string) => Promise<{ valid: boolean; token?: string; error?: string; remaining_attempts?: number }>
  onSuccess: () => void
}

export function VerificationModal({ isOpen, onClose, onVerify, onSuccess }: VerificationModalProps) {
  const [code, setCode] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [csrfToken, setCsrfToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [remainingAttempts, setRemainingAttempts] = useState(5)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // Generate session ID and CSRF token on mount
    const newSessionId = generateSessionId()
    const newCsrfToken = generateToken()
    
    setSessionId(newSessionId)
    setCsrfToken(newCsrfToken)
    
    // Store CSRF token for API requests
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('csrf_token', newCsrfToken)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await onVerify(code, sessionId, csrfToken)
      
      if (result.valid) {
        setIsSuccess(true)
        setTimeout(() => {
          onSuccess()
          onClose()
        }, 1500)
      } else {
        const attempts = result.remaining_attempts ?? 4
        setRemainingAttempts(attempts)
        if (attempts <= 0) {
          setError('Maximum attempts exceeded. Please try again later.')
        } else {
          setError(result.error || `Invalid code. ${attempts} attempts remaining.`)
        }
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setCode('')
    setError('')
    setIsSuccess(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Your Listing</DialogTitle>
          <DialogDescription>
            Enter the verification code to proceed with adding your car listing.
          </DialogDescription>
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Default Code:</strong> <code className="bg-blue-100 px-2 py-1 rounded">SIGNATURE2024</code>
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Contact support if you need a custom verification code.
            </p>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verification-code">Verification Code</Label>
            <Input
              id="verification-code"
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="uppercase"
              maxLength={20}
              disabled={isLoading || isSuccess || remainingAttempts <= 0}
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {isSuccess && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Verification successful! Redirecting...</span>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || isSuccess || remainingAttempts <= 0 || !code.trim()}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}