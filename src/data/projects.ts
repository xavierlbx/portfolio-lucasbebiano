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
      'Animação de digitação na home',
      'Carrossel infinito de skills com drag/touch',
      'Modal de detalhes dos projetos',
      'Tema escuro com persistência',
      'Interface responsiva (mobile e desktop)',
      'Testes automatizados com Vitest',
      'Deploy contínuo na Vercel',
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
      'App mobile para organizar a rotina de bem-estar: treinos e ingestão de água.',
    longDescription:
      'App mobile do 3º semestre de ADS na PUC Minas para organizar a rotina de bem-estar. Registra treinos, controla a ingestão de água e acompanha a evolução física. Disponível para Android.',
    tech: ['React Native', 'Expo', 'JavaScript', 'C#', 'Entity Framework'],
    highlights: [
      'Registro e histórico de treinos',
      'Controle de ingestão de água',
      'Acompanhamento da evolução física',
      'Autenticação de usuários',
      'APK disponível para Android',
      'Projeto acadêmico — 3º semestre ADS PUC Minas',
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
      'Kanban web com autenticação, colunas de tarefas e interface responsiva. No ar com Vercel, Render e Supabase.',
    longDescription:
      'Kanban full stack com Vue 3 e NestJS. Autenticação, colunas de tarefas e criação via modal. Backend com Prisma e PostgreSQL. No ar: frontend na Vercel, API no Render e banco no Supabase.',
    tech: ['Vue 3', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker', 'Vercel', 'Render', 'Supabase'],
    highlights: [
      'Login e cadastro de usuários',
      'Colunas Backlog, To Do, Doing e Done',
      'Arraste e solte de tarefas',
      'Criação de tarefas por modal',
      'Interface desktop e mobile',
      'Backend em NestJS com Prisma',
      'No ar: Vercel, Render e Supabase',
    ],
    image: '/images/kanban/kanban-main.png',
    images: [
      '/images/kanban/kanban-image.png',
      '/images/kanban/kanban-image (2).png',
      '/images/kanban/kanban-image (3).png',
      '/images/kanban/kanban-image (4).png',
      '/images/kanban/kanban-image (5).png',
      '/images/kanban/kanban-image (6).png',
    ],
    link: 'https://github.com/xavierlbx/kanbam',
    liveLink: 'https://kanbam-one.vercel.app/',
    year: '2026',
    status: 'Em evolução',
    device: 'desktop',
  },
  {
    title: 'Apoia Mente',
    description:
      'Plataforma de atendimento psicológico comunitário entre psicólogos voluntários e pessoas em vulnerabilidade.',
    longDescription:
      'Projeto do 4º semestre de ADS na PUC Minas. Conecta psicólogos voluntários a pessoas em vulnerabilidade, com agendamento e videochamadas. Web, mobile e API Gateway em C#. Disponível via web e APK Android.',
    tech: ['TypeScript', 'C# ASP.NET', 'React Native', 'API Gateway'],
    highlights: [
      'Cadastro de paciente ou psicólogo',
      'Agendamento de sessões',
      'Videochamadas seguras',
      'Acesso web pelo navegador',
      'App mobile em APK Android',
      'API Gateway centralizando os serviços',
      'Projeto acadêmico — 4º semestre ADS PUC Minas',
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
      'Plataforma web para modernizar a gestão interna do Instituto GESC, no lugar de planilhas.',
    longDescription:
      'Projeto do 5º semestre de ADS na PUC Minas. Centraliza a gestão interna do Instituto GESC. Backend ASP.NET Web API, frontend React 19 + TypeScript, relatórios e upload de CSV.',
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
      'Gestão de empresas e doações',
      'Gestão de times com filtros',
      'Gerador de relatórios PDF/CSV',
      'Upload de CSV por arraste e solte',
      'Integração OpenAPI com o backend',
      'Filtros por status e auditoria',
      'Deploy no Firebase Hosting',
      'Projeto acadêmico — 5º semestre ADS PUC Minas',
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
