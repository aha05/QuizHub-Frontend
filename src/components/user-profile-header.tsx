import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, LogOut, User, Trophy, Star } from "lucide-react"

export function UserProfileHeader() {
  return (
    <Card className="p-6 mb-8 border-border/50 bg-card/50 backdrop-blur">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/30">
            <AvatarImage src="/diverse-user-avatars.png" alt="User" />
            <AvatarFallback className="bg-primary/20 text-primary text-xl">JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-balance">John Doe</h1>
            <p className="text-muted-foreground">Quiz Master Level 5</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">
                <Trophy className="h-3 w-3 mr-1" />
                Top Scorer
              </Badge>
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/30">
                <Star className="h-3 w-3 mr-1" />
                5-Day Streak
              </Badge>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="border-border/50 bg-transparent">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  )
}
