export type Certificate = {
  title: string
  description: string
  image: string
  link?: string
}

export const featuredCertificates: Certificate[] = [
  {
    title: 'IGESC',
    description:
      'Formação complementar em tecnologia e desenvolvimento de sistemas pela instituição IGESC. Desenvolvido no 5º semestre de ADS na PUC Minas.',
    image: 'images/Certificados/certificado-igesc.jpg',
  },
  {
    title: 'Power Track',
    description:
      'Projeto integrador acadêmico — aplicativo mobile de bem-estar. Desenvolvido no 3º semestre de ADS na PUC Minas.',
    image: 'images/Certificados/certificado-powertrack.png',
  },
  {
    title: 'Apoiamente',
    description:
      'Projeto acadêmico dedicado ao apoio à saúde mental estudantil, com foco em acessibilidade e bem-estar. Desenvolvido no 4º semestre de ADS na PUC Minas.',
    image: 'images/Certificados/certificado-apoiamente.png',
  },
]

export const aluraCertificates: Certificate[] = [
  {
    title: 'Especialização NestJS',
    description:
      'Formação focada em APIs escaláveis, arquitetura backend e boas práticas com NestJS.',
    image: 'images/Certificados/certificado-nestjs.png',
    link: 'https://cursos.alura.com.br/user/lucasbebianolbx/degree-nest-js-v474195-474195/certificate',
  },
  {
    title: 'Certificação TypeScript',
    description:
      'Tipagem estática, orientação a objetos e desenvolvimento seguro com TypeScript.',
    image: 'images/Certificados/certificado-typescript.png',
    link: 'https://cursos.alura.com.br/certificate/999f7185-265a-4ef2-856f-dc4cdfd63501?lang=pt_BR',
  },
  {
    title: 'Certificação ChatGPT e IA',
    description:
      'Estudos sobre inteligência artificial aplicada, prompts e produtividade com IA.',
    image: 'images/Certificados/certificado-chatgpt.png',
    link: 'https://cursos.alura.com.br/certificate/953ce1c6-f7b4-4569-b736-3e30300bb9be?lang=pt_BR',
  },
]
