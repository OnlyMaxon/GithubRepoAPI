import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Trophy, MagnifyingGlass, User } from '@phosphor-icons/react'
import { UserData } from '@/lib/achievements'

interface UserProfileHeaderProps {
  user: UserData | null
  unlockedCount: number
  totalCount: number
  onSearch: (username: string) => void
  isLoading?: boolean
}

export function UserProfileHeader({ user, unlockedCount, totalCount, onSearch, isLoading = false }: UserProfileHeaderProps) {
  const [username, setUsername] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onSearch(username.trim())
    }
  }

  const progressPercent = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {user ? (
          <>
            <Avatar className="w-20 h-20 border-4 border-background shadow-lg">
              <AvatarImage src={user.avatarUrl} alt={user.login} />
              <AvatarFallback><User className="w-10 h-10" /></AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">@{user.login}</h2>
                <p className="text-sm text-muted-foreground">
                  Tracking GitHub achievements progress
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Trophy weight="fill" className="w-5 h-5 text-accent" />
                  <span className="font-semibold">{unlockedCount}</span>
                  <span className="text-muted-foreground">/ {totalCount} achievements</span>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {Math.round(progressPercent)}%
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent to-accent/80 transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Change user..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full md:w-48"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !username.trim()}>
                  <MagnifyingGlass className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="w-full space-y-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">GitHub Achievement Tracker</h2>
              <p className="text-muted-foreground">
                Enter a GitHub username to view achievement progress
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto md:mx-0">
              <Input
                type="text"
                placeholder="Enter GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !username.trim()}>
                <MagnifyingGlass className="w-5 h-5 mr-2" />
                Search
              </Button>
            </form>
          </div>
        )}
      </div>
    </Card>
  )
}
