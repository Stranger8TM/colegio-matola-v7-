# Documentação do Chatbot IA do Colégio Privado da Matola

Esta documentação descreve a implementação e funcionalidades do chatbot com IA integrada do Colégio Privado da Matola.

## Visão Geral

O chatbot IA é uma ferramenta interativa que permite aos usuários obter informações sobre o colégio, cursos, processos de admissão e outras questões relevantes. Ele utiliza a API Groq para processamento de linguagem natural e oferece recursos avançados como pesquisa na internet, análise de texto e raciocínio passo a passo.

## Arquitetura

O sistema do chatbot é composto pelos seguintes componentes:

1. **Interface do Usuário (Frontend)**
   - Componente React `AdvancedChatbot`
   - Gerenciamento de estado para mensagens e histórico de conversas
   - Animações e feedback visual

2. **Backend de Processamento**
   - API Route `/api/chat` para processamento de mensagens
   - Integração com a API Groq via `groq-service.ts`
   - Funções de sistema para pesquisa, análise e raciocínio

3. **Armazenamento**
   - Armazenamento local para histórico de conversas
   - Persistência de feedback do usuário

## Fluxo de Dados

1. O usuário envia uma mensagem através da interface
2. A mensagem é enviada para o endpoint `/api/chat`
3. O backend processa a mensagem usando a API Groq
4. Se necessário, funções especiais são chamadas (pesquisa, análise, etc.)
5. A resposta é retornada ao frontend e exibida ao usuário
6. A conversa é salva no histórico local

## Funcionalidades Principais

### Processamento de Linguagem Natural
O chatbot utiliza o modelo Groq para entender e responder às perguntas dos usuários em linguagem natural.

### Pesquisa na Internet
Quando o usuário faz perguntas que requerem informações atualizadas, o chatbot pode realizar pesquisas na internet para fornecer respostas precisas.

### Análise de Texto
O chatbot pode analisar textos fornecidos pelo usuário, identificando aspectos como sentimento, estrutura gramatical e conteúdo.

### Raciocínio Passo a Passo
Para problemas complexos, o chatbot pode decompor o raciocínio em etapas, explicando cada passo do processo de solução.

### Histórico de Conversas
O sistema mantém um histórico das conversas do usuário, permitindo retomar conversas anteriores.

### Feedback do Usuário
Os usuários podem fornecer feedback sobre as respostas, ajudando a melhorar a qualidade do sistema.

## Configuração e Personalização

### Prompt do Sistema
O comportamento do chatbot é definido por um prompt de sistema que estabelece seu tom, conhecimentos e limitações. Este prompt pode ser ajustado no arquivo `groq-config.ts`.

### Funções do Sistema
As funções especiais do sistema (pesquisa, análise, raciocínio) são definidas no arquivo `groq-service.ts` e podem ser estendidas conforme necessário.

### Perguntas Sugeridas
O chatbot oferece perguntas sugeridas para ajudar os usuários a começarem a interação. Estas sugestões podem ser personalizadas no componente `AdvancedChatbot`.

## Manutenção e Monitoramento

### Logs e Depuração
O sistema registra erros e interações importantes no console, facilitando a depuração.

### Feedback e Melhorias
O feedback dos usuários é coletado e pode ser usado para melhorar as respostas e funcionalidades do chatbot.

## Considerações de Segurança

### Validação de Entrada
Todas as entradas do usuário são validadas antes do processamento.

### Limitações de Uso
O sistema implementa limitações para evitar uso excessivo ou abusivo da API.

### Privacidade
As conversas são armazenadas apenas localmente no navegador do usuário, respeitando sua privacidade.

## Desenvolvido por Gabriel Vieira

Este chatbot foi desenvolvido por Gabriel Vieira como parte do projeto do site do Colégio Privado da Matola.
\`\`\`

## 8. Corrigindo a Página de Contato com Localização Correta
