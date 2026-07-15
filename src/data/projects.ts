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
      'Aplicativo mobile multiplataforma para gestão de bem-estar, focado no rastreamento de atividades físicas, metas de hidratação e monitoramento evolutivo.',
    longDescription:
      'Solução mobile desenvolvida como projeto principal do 3º semestre de ADS na PUC Minas. O Power Track combina um ecossistema frontend ágil construído em React Native e Expo com um backend robusto e escalável em C# e TSQL. O grande diferencial do projeto está na sua engenharia rigorosa, sustentada por um ciclo completo de desenvolvimento documentado: desde a especificação e design de interface até planos detalhados e registros de testes de software e usabilidade com usuários reais.',
    tech: ['React Native', 'Expo', 'JavaScript', 'TypeScript', 'C#', 'TSQL'],
    highlights: [
      'Arquitetura moderna com ecossistema mobile integrado a uma API Backend estruturada.',
      'Módulo dinâmico para registro, acompanhamento e histórico de atividades físicas.',
      'Documentação técnica abrangente dividida em etapas, cobrindo o Contexto, Especificação e Arquitetura da Solução.',
      'Projeto de Interface validado através de wireframes e design de telas centrado no usuário.',
      'Garantia de qualidade comprovada por Planos e Registros de Testes de Software e Usabilidade.',
      'Apresentação completa da solução final validada em formato de pitch audiovisual.',
    ],
    image: 'images/powertrack/power-track-main.png',
    images: [
      'images/powertrack/powertrack-mobile (1).png',
      'images/powertrack/powertrack-mobile (2).png',
      'images/powertrack/powertrack-mobile (3).png',
      'images/powertrack/powertrack-mobile (4).png',
      'images/powertrack/powertrack-mobile (5).png',
      'images/powertrack/powertrack-mobile (6).png',
      'images/powertrack/powertrack-mobile (7).png',
      'images/powertrack/powertrack-mobile (8).png',
      'images/powertrack/powertrack-mobile (9).png',
    ],
    link: 'https://github.com/xavierlbx/power-track',
    year: '2024',
    status: 'Concluído',
    device: 'mobile',
  },
  {
    title: 'Kanbam',
    description:
      'Aplicação web full stack de gerenciamento de tarefas em estilo Kanban, contando com autenticação JWT, interface altamente reativa e assistente de IA integrado.',
    longDescription:
      'Sistema Kanban interativo e moderno desenvolvido com Vue 3 e NestJS. A aplicação oferece controle completo de fluxo de trabalho com movimentação drag-and-drop, segurança robusta via tokens de acesso e um chat inteligente integrado à API do Gemini para auxiliar na gestão. O ecossistema é totalmente conteinerizado com Docker e integrado ao Prisma ORM para persistência eficiente.',
    tech: ['Vue 3', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker', 'Gemini API'],
    highlights: [
      'Autenticação segura de usuários com fluxo completo de JWT (Login/Cadastro)',
      'Board interativo com sistema drag-and-drop (arraste e solte) para movimentação fluida de tarefas',
      'Assistente de Inteligência Artificial integrado (Gemini API) via chatbox nativo',
      'Gerenciamento dinâmico de tarefas através de modais interativos e responsivos',
      'Arquitetura backend modular, escalável e documentada de forma automatizada via Swagger',
      'Persistência e modelagem de dados robustas utilizando Prisma ORM e PostgreSQL',
      'Ambiente de desenvolvimento isolado e de rápida inicialização orquestrado com Docker Compose',
    ],
    image: '/images/kanban/kanban-desktop (1).png',
    images: [
      '/images/kanban/kanban-desktop (1).png',
      '/images/kanban/kanban-desktop (2).png',
      '/images/kanban/kanban-desktop (3).png',
      '/images/kanban/kanban-desktop (4).png',
      '/images/kanban/kanban-desktop (5).png',
      '/images/kanban/kanban-mobile (1).png',
      '/images/kanban/kanban-mobile (2).png',
      '/images/kanban/kanban-mobile (3).png',
    ],
    imageDevices: ['desktop', 'desktop', 'desktop', 'desktop', 'desktop', 'mobile', 'mobile', 'mobile'],
    link: 'https://github.com/xavierlbx/kanbam',
    year: '2026',
    status: 'Em evolução',
    device: 'both',
  },
  {
    title: 'Apoia Mente',
    description:
      'Plataforma distribuída de atendimento psicológico comunitário baseada em microsserviços para conectar psicólogos voluntários a pessoas em vulnerabilidade social.',
    longDescription:
      'Desenvolvido no 4º semestre de ADS na PUC Minas e premiado como destaque do semestre, o ApoiaMente é uma plataforma de impacto social com arquitetura distribuída em microsserviços e um API Gateway centralizador em C#. O projeto destaca-se pelo rigor técnico de sua engenharia de software, apresentando uma documentação robusta que cobre desde a concepção (contexto, especificação e wireframes) até a governança de qualidade, com registros minuciosos de testes unitários, de integração e de sistema.',
    tech: ['React', 'React Native', 'TypeScript', 'C# ASP.NET Core', 'API Gateway', 'Microsserviços', 'Testes Unitários & Integração'],
    highlights: [
      'Arquitetura distribuída em microsserviços com API Gateway centralizando os serviços',
      'Cadastro dual com fluxos de experiência distintos para Pacientes e Psicólogos',
      'Agendamento de sessões e videochamadas criptografadas e integradas',
      'Ecossistema multiplataforma: aplicação Web (Navegador) e Mobile (APK Android)',
      'Documentação completa: do design de interface (Wireframes) à arquitetura de solução',
      'Garantia de qualidade validada por testes de sistema, unitários e de integração',
      'Projeto Destaque Acadêmico — 4º Semestre ADS PUC Minas',
    ],
    image: '/images/apoiamente/apoia-mente-main.png',
    images: [
      '/images/apoiamente/apoiamente-desktop (1).png',
      '/images/apoiamente/apoiamente-desktop (2).png',
      '/images/apoiamente/apoiamente-desktop (3).png',
      '/images/apoiamente/apoiamente-mobile (1).png',
      '/images/apoiamente/apoiamente-mobile (2).png',
      '/images/apoiamente/apoiamente-mobile (3).png',
      '/images/apoiamente/apoiamente-mobile (4).png',
      '/images/apoiamente/apoiamente-mobile (5).png',
    ],
    imageDevices: ['desktop', 'desktop', 'desktop', 'mobile', 'mobile', 'mobile', 'mobile', 'mobile'],
    link: 'https://github.com/xavierlbx/apoia-mente',
    liveLink: 'https://www.apoiamente.com.br',
    year: '2025',
    status: 'Concluído',
    device: 'both',
  },
  {
    title: 'IGESC Conecta',
    description:
      'Sistema sociotécnico inovador para modernização e centralização da gestão interna e processos do Instituto GESC.',
    longDescription:
      'Solução corporativa desenvolvida para uma empresa real, projetada para substituir o uso de planilhas descentralizadas por uma plataforma integrada de alta eficiência. O projeto conquistou o posto de Destaque Acadêmico no 5º semestre de ADS na PUC Minas. Unindo um ecossistema frontend robusto em TypeScript com um backend escalável em C#, o sistema automatiza fluxos de trabalho, organiza dados operacionais e garante total controle, auditoria e acessibilidade às informações institucionais.',
    tech: ['TypeScript', 'React', 'C#', 'Entity Framework Core', 'CQRS', 'JavaScript', 'HTML', 'CSS'],
    highlights: [
      'Premiado como Destaque Acadêmico do 5º semestre de ADS — PUC Minas.',
      'Desenvolvido para uma empresa real com foco em resolver dores e necessidades de negócio reais.',
      'Centralização e modernização de processos internos, eliminando o controle ineficiente por planilhas.',
      'Módulo avançado de auditoria e filtragem inteligente por status de doações e empresas parceiras.',
      'Garantia de qualidade validada por Planos de Testes de Software e usabilidade aplicados ao cenário real.',
      'Arquitetura moderna (Full Stack) com implantação contínua e documentação técnica ponta a ponta.',
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
