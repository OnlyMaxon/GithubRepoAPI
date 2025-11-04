# Planning Guide

A GitHub Achievement Tracker that helps users understand, track, and work toward earning genuine GitHub profile achievements through their real contributions and activities.

**Experience Qualities**:
1. **Informative** - Clearly explains what each achievement is, how to earn it, and tracks user progress
2. **Motivational** - Encourages users to engage more with GitHub through visual progress tracking and actionable tips
3. **Transparent** - Shows real data from the user's GitHub profile to provide honest assessment of achievement eligibility

**Complexity Level**: Light Application (multiple features with basic state)
- This app fetches real GitHub user data, displays achievement information, tracks progress, and provides actionable guidance - making it more than a simple tool but not requiring complex state management or backend infrastructure.

## Essential Features

### Achievement Gallery
- **Functionality**: Displays all available GitHub achievements with badges, descriptions, and unlock criteria
- **Purpose**: Educates users about what achievements exist and how to earn them
- **Trigger**: App loads with full gallery visible
- **Progression**: User lands on app → sees grid of all achievements → can view locked/unlocked status → reads requirements for each
- **Success criteria**: All GitHub achievements displayed with accurate unlock criteria and visual distinction between earned/unearned

### Personal Progress Tracker
- **Functionality**: Shows user's current GitHub profile data and progress toward unearned achievements
- **Purpose**: Provides personalized insight into how close the user is to earning specific achievements
- **Trigger**: User authenticates or views their profile
- **Progression**: User opens app → views achievements → sees personalized progress bars → identifies which achievements are closest to earning
- **Success criteria**: Accurate reflection of user's GitHub activity with clear progress indicators

### Achievement Details Modal
- **Functionality**: Expandable detailed view for each achievement with tips and strategies
- **Purpose**: Helps users understand exactly what actions to take to earn specific achievements
- **Trigger**: User clicks on any achievement card
- **Progression**: User clicks achievement → modal opens → shows detailed requirements → displays actionable tips → user can take action
- **Success criteria**: Clear, actionable guidance that users can immediately apply to their GitHub workflow

### Actionable Tips System
- **Functionality**: Provides specific, practical advice for earning each achievement
- **Purpose**: Removes ambiguity and gives users concrete next steps
- **Trigger**: Displayed in achievement details and as suggestions
- **Progression**: User views achievement → reads tips → understands specific actions → can implement immediately
- **Success criteria**: Tips are specific enough to act on (e.g., "Star 3 more repositories" vs "Be more active")

## Edge Case Handling

- **Unauthenticated Users**: Show achievement gallery with generic progress states and prompt to view personal progress
- **API Rate Limiting**: Display cached data with timestamp and refresh availability indicator
- **Missing Data**: Show placeholder states with explanations when GitHub data is incomplete
- **New Achievements**: Design allows for easy addition of new achievements as GitHub introduces them
- **Private Activity**: Explain that some achievements may not track properly if profile is fully private

## Design Direction

The design should feel professional and motivational, like a gaming achievement system but with GitHub's developer-focused aesthetic - clean, modern, and purpose-driven with subtle gamification elements that inspire without feeling juvenile.

## Color Selection

Triadic color scheme that combines GitHub's signature colors with motivational accent colors for achievements and progress.

- **Primary Color**: GitHub Dark (oklch(0.205 0 0)) - Represents the core GitHub brand and authority
- **Secondary Colors**: Muted slate (oklch(0.45 0.01 250)) for locked achievements, creating visual hierarchy
- **Accent Color**: Achievement Gold (oklch(0.75 0.15 85)) - Celebrates earned achievements and progress milestones
- **Foreground/Background Pairings**: 
  - Background (White oklch(1 0 0)): Dark text (oklch(0.145 0 0)) - Ratio 20:1 ✓
  - Card (White oklch(1 0 0)): Dark text (oklch(0.145 0 0)) - Ratio 20:1 ✓
  - Primary (GitHub Dark oklch(0.205 0 0)): White text (oklch(0.985 0 0)) - Ratio 16:1 ✓
  - Accent (Achievement Gold oklch(0.75 0.15 85)): Dark text (oklch(0.205 0 0)) - Ratio 8.5:1 ✓
  - Muted (Light Gray oklch(0.97 0 0)): Muted text (oklch(0.556 0 0)) - Ratio 5.2:1 ✓

## Font Selection

Typography should be clean and developer-friendly while maintaining approachability - using GitHub's preferred system fonts with Inter for its excellent readability and modern aesthetic.

- **Typographic Hierarchy**: 
  - H1 (Page Title): Inter Bold/32px/tight letter-spacing/-0.02em
  - H2 (Section Headers): Inter Semibold/24px/normal letter-spacing
  - H3 (Achievement Names): Inter Semibold/18px/normal letter-spacing
  - Body (Descriptions): Inter Regular/15px/1.6 line-height
  - Small (Meta info): Inter Regular/13px/muted color
  - Badge Text: Inter Medium/12px/uppercase/0.05em letter-spacing

## Animations

Motion should feel purposeful and rewarding, with subtle interactions that acknowledge user engagement and celebratory animations when achievements are close to completion - balancing professional restraint with motivational delight.

- **Purposeful Meaning**: Use shimmer effects on locked achievements to suggest potential, smooth progress bar fills to show advancement, and subtle scale transforms on hover to invite interaction
- **Hierarchy of Movement**: Achievement cards get primary animation focus with hover lifts and progress changes, modal transitions are smooth and contextual, and progress bars animate their fills to celebrate advancement

## Component Selection

- **Components**: 
  - Card (achievement displays with custom styling for locked/unlocked states)
  - Dialog (detailed achievement information and tips)
  - Progress (visual progress bars for achievement tracking)
  - Badge (compact achievement status indicators)
  - Avatar (user profile display)
  - Tabs (switching between all achievements, earned, and in-progress views)
  - Scroll-area (for long achievement lists)
  - Tooltip (quick info on hover)

- **Customizations**: 
  - Custom achievement card component with gradient borders for unlocked achievements
  - Progress component with gold accent color for visual celebration
  - Custom badge component with GitHub achievement badge styling

- **States**: 
  - Achievement cards: locked (grayscale), in-progress (partial color with progress), unlocked (full color with gold accent)
  - Buttons: subtle hover lift with shadow, active press down, disabled state with reduced opacity
  - Progress bars: smooth animated fills, color transitions based on completion percentage

- **Icon Selection**: 
  - Trophy (earned achievements)
  - Lock (locked achievements) 
  - Target (in-progress goals)
  - GitBranch (contribution-related achievements)
  - Star (community achievements)
  - Code (coding streak achievements)
  - Users (collaboration achievements)

- **Spacing**: 
  - Page padding: p-6 md:p-8
  - Section gaps: gap-8
  - Card grid: gap-4
  - Card internal: p-6
  - Component spacing: space-y-4 for vertical stacks

- **Mobile**: 
  - Single column achievement grid on mobile, 2 columns on tablet, 3-4 on desktop
  - Sticky header with user info collapses to compact bar on scroll
  - Dialog/modal transitions to full-screen drawer on mobile using vaul
  - Touch-optimized card sizes with minimum 44px tap targets
  - Progressive disclosure with expandable sections on mobile for detailed info
