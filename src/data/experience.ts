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
      'Atuação na reescrita de sistema legado em Java para arquitetura moderna utilizando Vue 3, Node.js e NestJS.',
      'Definição de padrões arquiteturais (camadas e modular) e apoio na disseminação da nova stack entre equipes.',
      'Ciclo completo de entrega (do código à produção) via pipelines de CI/CD no GitLab, sob metodologia ágil Scrum.',
      'Levantamento de requisitos com stakeholders, alinhando regras de negócio a soluções técnicas eficientes.',
      'Aumento de produtividade no desenvolvimento com o uso prático de IA assistiva (GitHub Copilot e Gemini Academy).'
    ],
    tech: ['Vue.js 3', 'Node.js', 'TypeScript', 'NestJS', 'Oracle', 'GitLab CI/CD'],
  },
  {
    company: 'Cardiesel',
    role: 'Jovem Aprendiz — TI',
    subtitle: 'Concessionária Mercedes-Benz',
    location: 'Belo Horizonte, MG',
    period: '2022 – 2023',
    isPrimary: false,
    bullets: [
      'Ponto focal na implantação do novo sistema de reembolso de combustível, fazendo a ponte entre técnicos e usuários.',
      'Suporte técnico e atendimento de Service Desk aos colaboradores, garantindo a resolução ágil de incidentes na plataforma de gestão.',
      'Manutenção e auditoria de planilhas em Excel para garantir a integridade dos dados operacionais da empresa.'
    ],
    tech: ['Service Desk', 'Excel', 'Gestão de Incidentes'],
  },
]
