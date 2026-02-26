import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Clock, CheckCircle2, Calendar, Activity, Newspaper } from "lucide-react"

const menuItems = [
  { id: 'timeline', label: 'Timeline', icon: Activity },
  { id: 'tasks', label: 'Taken', icon: CheckCircle2 },
  { id: 'calendar', label: 'Kalender', icon: Calendar },
  { id: 'news', label: 'Nieuws', icon: Newspaper },
]

export default function Sidebar({ activeView, setActiveView }) {
  const [health] = useState(98)
  const [memory] = useState(72)
  const [activeTasks] = useState(3)

  return (
    <aside className="w-64 bg-card border-r flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center overflow-hidden">
            <img 
              src="https://mockmind-api.uifaces.co/content/cartoon/10.jpg" 
              alt="James"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-bold text-lg">James</h1>
            <p className="text-xs text-muted-foreground">Jouw assistent</p>
          </div>
        </div>
      </div>

      {/* James Status Card */}
      <div className="p-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="https://mockmind-api.uifaces.co/content/cartoon/10.jpg" 
                  alt="James avatar"
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card flex items-center justify-center">
                  <span className="text-xs">⚡</span>
                </div>
              </div>
              <div>
                <CardTitle className="text-base">James</CardTitle>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <Badge variant="secondary" className="text-xs">Online</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">System Health</span>
                <span className="text-green-500">{health}%</span>
              </div>
              <Progress value={health} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Memory</span>
                <span className="text-blue-500">{memory}%</span>
              </div>
              <Progress value={memory} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Active Tasks</span>
                <span className="text-primary">{activeTasks}</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                variant={activeView === item.id ? "default" : "ghost"}
                className="w-full justify-start gap-3"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </nav>

      <Separator className="mx-4 w-auto" />

      {/* James Schedule */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">
          James' Schedule
        </p>
        
        <div className="space-y-2">
          {[
            { time: '09:00', label: 'Kanaal check' },
            { time: '13:00', label: 'Middag check' },
            { time: '17:00', label: 'Einddag check' },
          ].map((item) => (
            <div key={item.time} className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground w-12">{item.time}</span>
              <span className="text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
