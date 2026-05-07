export type Skill = {
  name: string
  /** URL do ícone SVG (devicons CDN) */
  icon: string
  subText: string
}

export const skills: Skill[] = [
  {
    name: 'HTML',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    subText: 'Linguagem de marcação web',
  },
  {
    name: 'CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    subText: 'Estilização e layout web',
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    subText: 'Linguagem da web dinâmica',
  },
  {
    name: 'C#',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    subText: 'Linguagem backend Microsoft',
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    subText: 'Runtime JavaScript backend',
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    subText: 'JavaScript com tipagem estática',
  },
  {
    name: 'NestJS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg',
    subText: 'Framework Node.js backend modular',
  },
  {
    name: 'Vue.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    subText: 'Framework JavaScript reativo',
  },
  {
    name: 'Entity Framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
    subText: 'ORM para .NET e C#',
  },
]
