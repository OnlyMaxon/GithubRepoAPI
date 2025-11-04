export interface Achievement {
  id: string
  name: string
  description: string
  tier?: 'bronze' | 'silver' | 'gold' | 'default'
  icon: string
  category: 'contribution' | 'community' | 'activity' | 'special'
  requirements: string[]
  tips: string[]
  checkProgress?: (userData: any) => { progress: number; current: number; target: number; unlocked: boolean }
}

export const achievements: Achievement[] = [
  {
    id: 'quickdraw',
    name: 'Quickdraw',
    description: 'Closed a pull request or issue within 5 minutes of opening',
    tier: 'default',
    icon: '⚡',
    category: 'activity',
    requirements: [
      'Open a pull request or issue',
      'Close it within 5 minutes'
    ],
    tips: [
      'Create a simple typo fix PR and merge it quickly',
      'Open an issue to track a task and close it immediately after completion',
      'Great for testing workflows in your own repositories'
    ]
  },
  {
    id: 'pair-extraordinaire',
    name: 'Pair Extraordinaire',
    description: 'Co-authored commits on merged pull requests',
    tier: 'default',
    icon: '👥',
    category: 'community',
    requirements: [
      'Have at least one commit with a co-author',
      'The PR containing the commit must be merged'
    ],
    tips: [
      'Add "Co-authored-by: name <email@example.com>" to commit messages',
      'Collaborate with friends or colleagues on projects',
      'Pair programming sessions are perfect for earning this'
    ]
  },
  {
    id: 'pull-shark',
    name: 'Pull Shark',
    description: 'Merged pull requests',
    tier: 'bronze',
    icon: '🦈',
    category: 'contribution',
    requirements: [
      'Bronze: 2 merged pull requests',
      'Silver: 16 merged pull requests',
      'Gold: 128 merged pull requests'
    ],
    tips: [
      'Contribute to open source projects',
      'Fix documentation typos in popular repositories',
      'Work on your own projects and merge feature branches',
      'Review the "good first issue" label on GitHub'
    ]
  },
  {
    id: 'galaxy-brain',
    name: 'Galaxy Brain',
    description: 'Answered discussions that were accepted',
    tier: 'bronze',
    icon: '🧠',
    category: 'community',
    requirements: [
      'Bronze: 2 accepted answers',
      'Silver: 8 accepted answers',
      'Gold: 16 accepted answers'
    ],
    tips: [
      'Browse GitHub Discussions in repositories you know well',
      'Answer questions in your areas of expertise',
      'Provide detailed, helpful responses with code examples',
      'Follow projects and help newcomers'
    ]
  },
  {
    id: 'yolo',
    name: 'YOLO',
    description: 'Merged a pull request without review',
    tier: 'default',
    icon: '🚀',
    category: 'activity',
    requirements: [
      'Merge a pull request without code review',
      'Works best in your own repositories'
    ],
    tips: [
      'Create a quick fix PR in your own repository',
      'Merge it immediately without requesting review',
      'Perfect for urgent hotfixes or small changes'
    ]
  },
  {
    id: 'starstruck',
    name: 'Starstruck',
    description: 'Repository received stars',
    tier: 'bronze',
    icon: '⭐',
    category: 'community',
    requirements: [
      'Bronze: 16 stars',
      'Silver: 128 stars',
      'Gold: 512 stars'
    ],
    tips: [
      'Create useful open source projects',
      'Share your projects on social media and dev communities',
      'Write good documentation and README files',
      'Solve real problems that others face'
    ]
  },
  {
    id: 'public-sponsor',
    name: 'Public Sponsor',
    description: 'Sponsored an open source contributor',
    tier: 'default',
    icon: '❤️',
    category: 'community',
    requirements: [
      'Publicly sponsor at least one developer or project via GitHub Sponsors'
    ],
    tips: [
      'Find projects you use regularly and sponsor their maintainers',
      'Even $1/month counts toward this achievement',
      'Support the open source ecosystem'
    ]
  },
  {
    id: 'arctic-code-vault',
    name: 'Arctic Code Vault Contributor',
    description: 'Contributed code to repositories archived in the Arctic Code Vault',
    tier: 'default',
    icon: '🧊',
    category: 'special',
    requirements: [
      'Had code in the 2020 GitHub Archive Program snapshot'
    ],
    tips: [
      'This was a one-time event from February 2, 2020',
      'No longer obtainable, but historical achievement',
      'Contributes to future snapshots may bring new opportunities'
    ]
  },
  {
    id: 'mars-2020-contributor',
    name: 'Mars 2020 Helicopter Contributor',
    description: 'Contributed to repositories used in the Mars 2020 Helicopter Mission',
    tier: 'default',
    icon: '🚁',
    category: 'special',
    requirements: [
      'Contributed to specific open source libraries used by NASA'
    ],
    tips: [
      'This was a special historical achievement',
      'No longer obtainable',
      'Similar opportunities may arise for future missions'
    ]
  },
  {
    id: 'heart-on-sleeve',
    name: 'Heart On Your Sleeve',
    description: 'Reacted to GitHub content with ❤️',
    tier: 'default',
    icon: '💖',
    category: 'activity',
    requirements: [
      'React to issues, PRs, or discussions with the heart emoji'
    ],
    tips: [
      'Show appreciation for helpful issues or PRs',
      'Use the ❤️ reaction on content you find valuable',
      'Engage with the community positively'
    ]
  },
  {
    id: 'open-sourcerer',
    name: 'Open Sourcerer',
    description: 'User has repositories that received pull requests from others',
    tier: 'default',
    icon: '🔮',
    category: 'community',
    requirements: [
      'Have a repository that received merged pull requests from other users'
    ],
    tips: [
      'Create open source projects and accept contributions',
      'Add "good first issue" labels to attract contributors',
      'Write contributing guidelines to help others participate',
      'Be welcoming and responsive to new contributors'
    ]
  }
]

export interface UserData {
  login: string
  avatarUrl: string
  publicRepos: number
  followers: number
  following: number
  createdAt: string
}
