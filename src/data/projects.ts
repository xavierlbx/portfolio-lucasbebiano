export type Project = {
  title: string
  description: string
  longDescription: string
  tech: string[]
  highlights: string[]
  image: string
  images?: string[]
  /** Per-image device override — maps 1-to-1 with `images[]`. Used when `device` is 'both'. */
  imageDevices?: ('desktop' | 'mobile')[]
  link: string
  liveLink?: string
  year: string
  status: string
  device: 'desktop' | 'mobile' | 'both'
}

export const projects: Project[] = [
/*   {
    title: 'Portifólio Pessoal',
    description:
      'Site portfólio responsivo com animações, dark mode e seções de projetos, habilidades e contato.',
    longDescription:
      'Portfólio desenvolvido para apresentar minha trajetória como Desenvolvedor Full Stack, com foco em clareza, identidade visual e boa experiência de navegação. Estruturado com uma base moderna e performática, evoluído com responsividade, fluidez e organização de conteúdo.',
    tech: ['Vue 3', 'TypeScript', 'Vite', 'Tailwind CSS', 'Pinia'],
    highlights: [
      'Animação de digitação na apresentação inicial',
      'Carrossel infinito de habilidades com drag/touch',
      'Modal de detalhes dos projetos',
      'Tema escuro com persistência de preferência',
      'Interface totalmente responsiva (mobile e desktop)',
      'Testes automatizados com Vitest',
      'Deploy contínuo via Vercel',
    ],
    image: 'images/previa_portifolio.png',
    images: ['images/previa_portifolio.png'],
    link: 'https://github.com/xavierlbx/portifolio-lucasxavier',
    liveLink: 'https://portifolio-lucasxavier.vercel.app/',
    year: '2025',
    status: 'Em evolução',
  }, */
  {
    title: 'Power Track',
    description:
      'Aplicativo mobile para organizar e aprimorar a rotina de bem-estar, com controle de treinos e ingestão de água.',
    longDescription:
      'Aplicativo mobile desenvolvido no 3º semestre do curso de ADS na PUC Minas, com o objetivo de ajudar os usuários a organizar, gerenciar e aprimorar sua rotina de bem-estar. Permite registrar treinos, controlar a ingestão diária de água e acompanhar a evolução física ao longo do tempo. Disponível para Android.',
    tech: ['React Native', 'Expo', 'JavaScript', 'C#', 'Entity Framework'],
    highlights: [
      'Registro e histórico de treinos personalizados',
      'Controle de ingestão diária de água',
      'Acompanhamento de evolução física',
      'Autenticação de usuários',
      'Disponível como APK para Android',
      'Projeto acadêmico — 3º Semestre ADS PUC Minas',
    ],
    image: 'images/powertrack/power-track-main.png',
    images: [
      'images/powertrack/power-track-photo (1).png',
      'images/powertrack/power-track-photo (2).png',
      'images/powertrack/power-track-photo (3).png',
      'images/powertrack/power-track-photo (4).png',
      'images/powertrack/power-track-photo (5).png',
      'images/powertrack/power-track-photo (6).png',
      'images/powertrack/power-track-photo (7).png',
    ],
    link: 'https://github.com/xavierlbx/power-track',
    year: '2024',
    status: 'Concluído',
    device: 'mobile',
  },
  {
    title: 'Kanbam',
    description:
      'Aplicação web de gerenciamento de tarefas em estilo Kanban, com autenticação, organização por colunas e interface responsiva.',
    longDescription:
      'Projeto full stack de um Kanban interativo, com frontend em Vue 3 e backend em NestJS. A aplicação permite autenticação de usuários, visualização de tarefas por colunas e criação de novas tarefas via modal. A base do backend foi estruturada com Prisma e PostgreSQL, com suporte a ambiente local via Docker Compose.',
    tech: ['Vue 3', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker'],
    highlights: [
      'Fluxo de autenticação com telas de login e cadastro',
      'Board Kanban com colunas Backlog, To Do, Doing e Done',
      'Movimentação de tarefas por arraste e solte entre colunas',
      'Criação de tarefas por modal com campos de título, coluna e descrição',
      'Interface adaptada para desktop e mobile',
      'Backend estruturado em NestJS com Prisma',
      'Banco PostgreSQL orquestrado com Docker Compose',
    ],
    image: '/images/kanban/kanban-main.png',
    images: [
      '/images/kanban/kanban-image.png',
      '/images/kanban/kanban-image (2).png',
      '/images/kanban/kanban-image (3).png',
      '/images/kanban/kanban-image (4).png',
      '/images/kanban/kanban-image (5).png',
    ],
    link: 'https://github.com/xavierlbx/kanbam',
    year: '2026',
    status: 'Em evolução',
    device: 'desktop',
  },
  {
    title: 'Apoia Mente',
    description:
      'Plataforma de atendimento psicológico comunitário conectando psicólogos voluntários a pessoas em vulnerabilidade social.',
    longDescription:
      'Desenvolvido no 4º semestre do curso de ADS na PUC Minas, o ApoiaMente conecta psicólogos voluntários a pessoas em vulnerabilidade social, oferecendo agendamento de sessões e videochamadas seguras. Conta com frontend web (TypeScript), frontend mobile e backend com API Gateway em C#. Disponível via web e APK para Android.',
    tech: ['TypeScript', 'C# ASP.NET', 'React Native', 'API Gateway'],
    highlights: [
      'Cadastro dual: Paciente ou Psicólogo',
      'Agendamento de sessões de psicologia',
      'Videochamadas integradas e seguras',
      'Frontend web acessível pelo navegador',
      'App mobile disponível como APK para Android',
      'API Gateway centralizando os serviços',
      'Projeto acadêmico — 4º Semestre ADS PUC Minas',
    ],
    image: '/images/apoiamente/apoia-mente-main.png',
    images: [
      '/images/apoiamente/apoia-mente-photo (1).png',
      '/images/apoiamente/apoia-mente-photo (2).png',
      '/images/apoiamente/apoia-mente-photo (3).png',
      '/images/apoiamente/apoia-mente-photo (4).png',
      '/images/apoiamente/apoia-mente-photo (5).png',
      '/images/apoiamente/apoia-mente-photo (6).png',
      '/images/apoiamente/apoia-mente-photo (7).png',
    ],
    // Adjust the order below to match your actual image sequence (desktop = web, mobile = app)
    imageDevices: ['desktop', 'desktop', 'desktop', 'mobile', 'mobile', 'mobile', 'mobile'],
    link: 'https://github.com/xavierlbx/apoia-mente',
    liveLink: 'https://www.apoiamente.com.br',
    year: '2025',
    status: 'Concluído',
    device: 'both',
  },
  {
    title: 'Igesc Conecta',
    description:
      'Plataforma web para modernizar a gestão interna do Instituto GESC, substituindo planilhas por um sistema integrado.',
    longDescription:
      'Desenvolvido no 5º semestre do curso de ADS na PUC Minas, o IGESC Conecta tem como objetivo modernizar a gestão interna do Instituto GESC, centralizando informações e organizando processos de forma mais eficiente. Conta com backend em ASP.NET Web API e frontend em React 19 com TypeScript, além de geração de relatórios e upload de CSV.',
    tech: [
      'React 19',
      'TypeScript',
      'Vite',
      'C# ASP.NET',
      'Material UI',
      'MUI X',
      'Axios',
      'Firebase',
    ],
    highlights: [
      'Gerenciamento de empresas e doações',
      'Gerenciamento de times com filtros avançados',
      'Gerador de relatórios PDF/CSV',
      'Upload de arquivos CSV com drag-and-drop',
      'Integração OpenAPI com backend',
      'Filtragem por status e informações de auditoria',
      'Deploy no Firebase Hosting',
      'Projeto acadêmico — 5º Semestre ADS PUC Minas',
    ],
    image: '/images/igesc/igesc-main.png',
    images: [
      '/images/igesc/igesc-photo (1).png',
      '/images/igesc/igesc-photo (2).png',
      '/images/igesc/igesc-photo (3).png',
      '/images/igesc/igesc-photo (4).png',
      '/images/igesc/igesc-photo (5).png',
      '/images/igesc/igesc-photo (6).png',
      '/images/igesc/igesc-photo (7).png',
    ],
    link: 'https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t1-pmv-ads-2025-2-e5-projigescconecta',
    year: '2025',
    status: 'Concluído',
    device: 'desktop',
  }
]
