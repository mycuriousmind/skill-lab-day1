export const portfolio = {
  name: 'Swojas',
  title: 'Student · aspiring full-stack developer',
  education: 'RVCE · CSE',
  availability: 'Open to learning and collaboration',
  theme: { defaultAccent: 'blue' as const },
  headline: 'Building digital experiences beyond the ordinary.',
  intro:
    "I'm a computer science student who enjoys turning ideas into useful, interactive experiences—and learning how the pieces work behind the scenes.",
  about:
    "I'm currently studying computer science at RVCE and exploring how thoughtful interfaces, application logic, and data fit together. I like learning by making small things, testing ideas, and improving them one step at a time.",
  learning:
    'Currently building web fundamentals, growing my programming practice, and exploring how frontend and backend systems connect.',
  email: '',
  links: {
    github: '',
    linkedin: '',
    resume: '',
  },
}

export const skills = [
  {
    name: 'HTML',
    group: 'Frontend',
    status: 'Learning',
    detail: 'Practising semantic page structure and accessible markup.',
  },
  {
    name: 'CSS',
    group: 'Frontend',
    status: 'Learning',
    detail: 'Exploring layouts, responsive design, and visual systems.',
  },
  {
    name: 'C',
    group: 'Programming',
    status: 'Comfortable',
    detail: 'Used in coursework and a first-semester calculator project.',
  },
  {
    name: 'Robotics',
    group: 'Interests',
    status: 'Exploring',
    detail: 'A hands-on interest, including a line-follower build with Arduino.',
  },
]

export type ProjectCategory = 'Frontend' | 'Full-Stack' | '3D / Creative Coding'

export type Project = {
  id: string
  title: string
  summary: string
  problem: string
  features: string[]
  technologies: string[]
  category: ProjectCategory
  status: string
  accent: 'blue' | 'violet' | 'cyan'
  liveUrl?: string
  repositoryUrl?: string
  lessons: string
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Personal portfolio',
    summary:
      'A student portfolio that brings together learning goals, early projects, and an interactive 3D experiment.',
    problem:
      'Create a clear home for work in progress without overstating experience or hiding the learning journey.',
    features: [
      'Responsive sections for skills, projects, learning, and contact',
      'Interactive 3D energy core and object explorer',
      'Filterable project cards with keyboard-friendly details',
    ],
    technologies: ['React', 'TypeScript', 'Three.js', 'CSS'],
    category: '3D / Creative Coding',
    status: 'In progress',
    accent: 'violet',
    lessons:
      'This portfolio is a place to practise component-based UI, accessibility, and a first interactive 3D scene.',
  },
  {
    id: 'student-planner-concept',
    title: 'Student planner concept',
    summary: 'Concept only—not built. An idea for a simple place to organise coursework and deadlines.',
    problem:
      'Students often keep assignments and due dates in different places. This is an early idea for bringing them together.',
    features: [
      'A proposed overview of upcoming tasks',
      'An idea for grouping work by course',
      'No working product or user data exists yet',
    ],
    technologies: ['Product idea', 'Not built'],
    category: 'Full-Stack',
    status: 'Concept · not built',
    accent: 'blue',
    lessons: 'This is an idea to explore, not a completed or in-progress application.',
  },
  {
    id: 'responsive-layout-concept',
    title: 'Responsive layout study',
    summary: 'Concept only—not built. A proposed exercise in adapting a simple interface to different screens.',
    problem:
      'A useful page should remain clear on both a narrow phone and a wide screen. This is a practice idea, not an implemented page.',
    features: [
      'An idea to compare compact and wide layouts',
      'A chance to practise CSS structure and responsive rules',
      'No finished interface or live demo exists',
    ],
    technologies: ['CSS', 'Not built'],
    category: 'Frontend',
    status: 'Concept · not built',
    accent: 'cyan',
    lessons: 'This is a proposed learning exercise and is not represented as completed work.',
  },
]

export const journey = [
  {
    title: 'Computer Science student',
    place: 'RVCE',
    date: 'Current',
    description:
      'Studying computer science and building a foundation through coursework and small projects.',
  },
  {
    title: 'First C project',
    place: 'Coursework',
    date: 'First semester',
    description:
      'Built a calculator while learning programming fundamentals in C.',
  },
  {
    title: 'Robotics club build',
    place: 'Robotics club',
    date: 'Ongoing learning',
    description:
      'Explored a line-follower project using Arduino as part of a robotics build.',
  },
]
