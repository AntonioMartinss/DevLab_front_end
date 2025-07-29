export const typography = {
  // ========== ELEMENTOS GERAIS ==========
  general: {
    body: 'text-sm',           // 14px - Parágrafos, conteúdo principal
    base: 'text-base',         // 16px - Texto base do navegador
    subtitle: 'text-lg',       // 18px - Seções, categorias
    heading2: 'text-xl',       // 20px - H2, H3
    heading1: 'text-2xl',      // 24px - H1, logo
    small: 'text-xs',          // 12px - Metadados, rodapés
  },

  // ========== FORMULÁRIOS ==========
  forms: {
    title: 'text-2xl',         // 24px - "Fazer Login"
    subtitle: 'text-base',     // 16px - "Entre com suas credenciais"
    label: 'text-sm',          // 14px - "Email", "Senha"
    input: 'text-base',        // 16px - Campo de texto (IMPORTANTE: nunca menor no mobile!)
    placeholder: 'text-base',  // 16px - "Digite seu email..."
    error: 'text-xs',          // 12px - "Campo obrigatório"
    help: 'text-xs',           // 12px - "Mínimo 8 caracteres"
    buttonPrimary: 'text-base', // 16px - "Entrar", "Cadastrar"
    buttonSecondary: 'text-sm', // 14px - "Cancelar", "Voltar"
    linkSecondary: 'text-sm',  // 14px - "Esqueci minha senha"
  },
}