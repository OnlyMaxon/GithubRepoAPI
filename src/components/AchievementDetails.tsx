import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle, Lock, Lightbulb, ListChecks } from '@phosphor-icons/react'
import { Achievement } from '@/lib/achievements'
import { cn } from '@/lib/utils'

interface AchievementDetailsProps {
  achievement: Achievement | null
  open: boolean
  onOpenChange: (open: boolean) => void
  unlocked?: boolean
  progress?: number
}

export function AchievementDetails({ achievement, open, onOpenChange, unlocked = false, progress = 0 }: AchievementDetailsProps) {
  if (!achievement) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-start gap-4 mb-2">
            <div className="text-6xl">{achievement.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <DialogTitle className="text-2xl">{achievement.name}</DialogTitle>
                {achievement.tier && achievement.tier !== 'default' && (
                  <Badge 
                    variant="outline"
                    className={cn(
                      'text-xs uppercase tracking-wider',
                      achievement.tier === 'gold' && 'border-accent text-accent bg-accent/10',
                      achievement.tier === 'silver' && 'border-muted-foreground/50 text-muted-foreground',
                      achievement.tier === 'bronze' && 'border-primary/50 text-primary'
                    )}
                  >
                    {achievement.tier}
                  </Badge>
                )}
                {unlocked ? (
                  <Badge className="bg-accent text-accent-foreground">
                    <CheckCircle weight="fill" className="w-3 h-3 mr-1" />
                    Unlocked
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <Lock weight="fill" className="w-3 h-3 mr-1" />
                    Locked
                  </Badge>
                )}
              </div>
              <DialogDescription className="text-base">
                {achievement.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {!unlocked && progress > 0 && (
              <div className="space-y-3 p-4 bg-accent/5 rounded-lg border border-accent/20">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Your Progress</span>
                  <span className="text-lg font-bold text-accent">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent to-accent/80 transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Keep going! You're {Math.round(progress)}% of the way there.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <ListChecks className="w-5 h-5" />
                Requirements
              </div>
              <ul className="space-y-2">
                {achievement.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-md">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <span className="text-sm leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
                <Lightbulb weight="fill" className="w-5 h-5" />
                Tips to Unlock
              </div>
              <ul className="space-y-3">
                {achievement.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-accent/5 rounded-md border border-accent/20">
                    <span className="text-accent text-xl flex-shrink-0">💡</span>
                    <span className="text-sm leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <Badge variant="outline" className="capitalize">
                  {achievement.category}
                </Badge>
                <span>•</span>
                <span>{achievement.requirements.length} requirement{achievement.requirements.length > 1 ? 's' : ''}</span>
                <span>•</span>
                <span>{achievement.tips.length} tip{achievement.tips.length > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
