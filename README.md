# AIMI-ZPE (Sistema de Atendimento Inteligente Multilíngue)

Sistema frontend desenvolvido para a Zona de Processamento de Exportação (ZPE), que oferece atendimento inteligente multilíngue com suporte a 10 idiomas, múltiplos canais de comunicação, processamento de documentos e base de conhecimento integrada.

## Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web
- **TypeScript**: Linguagem tipada para desenvolvimento robusto
- **Tailwind CSS**: Framework CSS utilitário
- **i18next**: Solução para internacionalização
- **Zustand**: Gerenciamento de estado global
- **Tesseract.js**: OCR para reconhecimento de texto em documentos
- **Chart.js**: Visualização de dados para painéis analíticos

## Funcionalidades Principais

- Gestão de Idiomas e Tradução Automática (RF01)
- Atendimento por Múltiplos Canais e Chatbot Conversacional (RF02)
- Processamento de Consultas e Documentos (RF03)
- Base de Conhecimento Centralizada (RF04)
- Perfil e Personalização de Usuários (RF05)
- Resolução de Problemas Inteligente (RF06)
- Integração com Sistemas Externos (RF07)
- Análise Preditiva e Inteligência de Negócios (RF08)
- Gerenciamento de Fluxos de Trabalho (RF09)
- Segurança e Compliance (RF10)
- Qualidade e Melhoria Contínua (RF11)
- Alta Disponibilidade e Desempenho (RF12)

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/aimi-zpe.git
cd aimi-zpe

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

```
aimi-zpe/
├── app/                 # Rotas e layouts da aplicação Next.js
├── components/          # Componentes reutilizáveis da interface
├── contexts/            # Contextos para gerenciamento de estado (idioma, tema)
├── public/              # Arquivos estáticos
└── styles/              # Estilos globais
```

## Modo de Desenvolvimento

Para executar o projeto em modo de desenvolvimento:

```bash
npm run dev
```

## Build de Produção

Para gerar a versão de produção:

```bash
npm run build
npm run start
``` 