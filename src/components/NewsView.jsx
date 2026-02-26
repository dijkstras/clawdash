import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, RefreshCw, Newspaper } from "lucide-react"

const categoryColors = {
  tech: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  design: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  local: "bg-green-500/20 text-green-400 border-green-500/30",
  business: "bg-amber-500/20 text-amber-400 border-amber-500/30"
}

export default function NewsView() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const fetchNews = async () => {
    setLoading(true)
    try {
      const response = await fetch('/news.json')
      const data = await response.json()
      setNews(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch news:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
    // Refresh every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const refreshNews = () => {
    fetchNews()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Newspaper className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Nieuws</h2>
            <p className="text-sm text-muted-foreground">
              Samenvatting van belangrijke updates
            </p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={refreshNews}
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Vernieuwen
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Laatst bijgewerkt: {lastUpdated.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
      </p>

      {/* News Grid */}
      <div className="grid gap-4">
        {news.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Geen nieuwsitems gevonden. Check later opnieuw.
            </CardContent>
          </Card>
        ) : (
          news.map((item) => (
            <Card key={item.id} className="hover:bg-accent/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant="outline" 
                        className={categoryColors[item.category] || "bg-gray-500/20 text-gray-400"}
                      >
                        {item.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.source} • {item.timestamp}
                      </span>
                    </div>
                    <CardTitle className="text-base font-medium leading-tight">
                      {item.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">
                  {item.summary}
                </p>
                
                <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Lees meer
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Categories */}
      <div className="pt-4">
        <p className="text-sm font-medium mb-3">Categorieën</p>
        <div className="flex flex-wrap gap-2">
          {['Tech', 'Design', 'Business', 'Local', 'Wetenschap'].map((cat) => (
            <Badge key={cat} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
              {cat}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
