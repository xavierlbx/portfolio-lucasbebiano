// Dados de contato lidos de variáveis de ambiente (VITE_*).
// Os fallbacks garantem funcionamento em desenvolvimento sem um .env local.
// Em produção, as variáveis são substituídas em tempo de build pelo Vite.

export type ContactInfo = {
  phone: string
  phoneLabel: string
  email: string
  github: string
  githubLabel: string
  linkedin: string
  linkedinLabel: string
}

export const CONTACT: ContactInfo = {
  phone: import.meta.env.VITE_CONTACT_PHONE ?? '+5531995202028',
  phoneLabel: import.meta.env.VITE_CONTACT_PHONE_LABEL ?? '+55 (31) 99520-2028',
  email: import.meta.env.VITE_CONTACT_EMAIL ?? 'lucasbebianolbx@gmail.com',
  github: import.meta.env.VITE_CONTACT_GITHUB ?? 'https://github.com/xavierlbx',
  githubLabel: import.meta.env.VITE_CONTACT_GITHUB_LABEL ?? 'github.com/xavierlbx',
  linkedin: import.meta.env.VITE_CONTACT_LINKEDIN ?? 'https://linkedin.com/in/lucas-bebiano',
  linkedinLabel: import.meta.env.VITE_CONTACT_LINKEDIN_LABEL ?? 'linkedin.com/in/lucas-bebiano',
}

// Derivados pré-computados para não repetir a lógica de formatação no template.
export const contactPhoneHref = `tel:${CONTACT.phone.replace(/[\s()-]/g, '')}`
export const contactEmailHref = `mailto:${CONTACT.email}`
