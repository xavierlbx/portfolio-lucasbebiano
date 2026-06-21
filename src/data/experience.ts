export type ExperienceItem = {
  company: string
  role: string
  subtitle?: string
  location: string
  period: string
  bullets: string[]
  tech?: string[]
  isPrimary?: boolean
}

export const experiences: ExperienceItem[] = [
  {
    company: 'Prodabel',
    role: 'Estagiário de Desenvolvimento',
    location: 'Belo Horizonte, MG',
    period: '2024 – 2025',
    isPrimary: true,
    bullets: [
      'Desenvolvimento de sistemas web modernos, participando de todo o ciclo — do código ao ambiente de produção.',
      'Atuação em equipe multidisciplinar com metodologia ágil (Scrum), contribuindo em cerimônias e entregas.',
      'Levantamento e validação de requisitos com stakeholders, traduzindo necessidades de negócio em soluções técnicas.',
    ],
    tech: ['Vue.js', 'Node.js', 'TypeScript', 'NestJS', 'Oracle'],
  },
  {
    company: 'Cardiesel',
    role: 'Jovem Aprendiz — TI',
    subtitle: 'Concessionária Mercedes-Benz',
    location: 'Belo Horizonte, MG',
    period: '2022 – 2023',
    isPrimary: false,
    bullets: [
      'Participação na implantação de novo sistema interno, sendo ponto de contato entre equipe técnica e usuários finais.',
      'Suporte técnico e atendimento a colaboradores via Service Desk, auxiliando na resolução de problemas do dia a dia.',
    ],
  },
]
