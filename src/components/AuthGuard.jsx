import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

const CORRECT_PASSWORD = "sjoerd2025"

export default function AuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if already authenticated in this session
    const auth = sessionStorage.getItem('dashboard_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem('dashboard_auth', 'true')
      setIsAuthenticated(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="animate-pulse text-primary">Laden...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">James Dashboard</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Voer het wachtwoord in om toegang te krijgen
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Wachtwoord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={error ? "border-red-500" : ""}
                  autoFocus
                />
                {error && (
                  <p className="text-sm text-red-500 mt-2">
                    Onjuist wachtwoord. Probeer opnieuw.
                  </p>
                )}
              </div>
              
              <Button type="submit" className="w-full">
                Inloggen
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return children
}
