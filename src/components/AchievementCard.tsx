import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Lock, CheckCircle } from '@phosphor-icons/react'
import { Achievement } from '@/lib/achievements'

interface AchievementCardProps {
  achievement: Achievement
  unlocked?: boolean
  progress?: number
  onClick?: () => void
}

export function AchievementCard({ achievement, unlocked = false, progress = 0, onClick }: AchievementCardProps) {
  const isInProgress = !unlocked && progress > 0

  return (
    <Card
      onClick={onClick}
      className={cn(
        'relative overflow-hidden p-6 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg',
        unlocked && 'bg-gradient-to-br from-accent/10 to-accent/5 border-accent/50',
        !unlocked && 'opacity-60 grayscale hover:grayscale-0 hover:opacity-80'
      )}
    >
      {unlocked && (
        <div className="absolute top-3 right-3">
          <CheckCircle weight="fill" className="w-6 h-6 text-accent" />
        </div>
      )}
      
      {!unlocked && (
        <div className="absolute top-3 right-3">
          <Lock weight="fill" className="w-5 h-5 text-muted-foreground" />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className={cn(
            'text-5xl flex-shrink-0 transition-transform',
            unlocked && 'scale-110'
          )}>
            {achievement.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 flex-wrap mb-2">
              <h3 className="font-semibold text-lg leading-tight">
                {achievement.name}
              </h3>
              {achievement.tier && achievement.tier !== 'default' && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    'text-xs uppercase tracking-wider',
                    achievement.tier === 'gold' && 'border-accent text-accent',
                    achievement.tier === 'silver' && 'border-muted-foreground/50 text-muted-foreground',
                    achievement.tier === 'bronze' && 'border-primary/50 text-primary'
                  )}
                >
                  {achievement.tier}
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {achievement.description}
            </p>
          </div>
        </div>

        {isInProgress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-accent">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent to-accent/80 transition-all duration-500 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Badge variant="secondary" className="text-xs">
            {achievement.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {achievement.requirements.length} requirement{achievement.requirements.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </Card>
  )
}
