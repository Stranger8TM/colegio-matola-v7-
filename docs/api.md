# API do Colégio Matola - Documentação

## Visão Geral

Esta API fornece acesso aos dados e funcionalidades do sistema do Colégio Matola. Ela permite gerenciar estudantes, professores, materiais de estudo, aulas gravadas e muito mais.

## Base URL

\`\`\`
https://colegiomatola.vercel.app/api/v1
\`\`\`

## Autenticação

A maioria dos endpoints requer autenticação. Para autenticar, envie um token JWT no cabeçalho `Authorization`:

\`\`\`
Authorization: Bearer seu_token_jwt
\`\`\`

Para obter um token, use o endpoint de login:

\`\`\`
POST /auth/login
\`\`\`

### Exemplo de Requisição de Login

\`\`\`json
{
  "email": "usuario@colegiomatola.com",
  "password": "senha_segura"
}
\`\`\`

### Exemplo de Resposta de Login

\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@colegiomatola.com",
    "role": "teacher"
  }
}
\`\`\`

## Paginação

Endpoints que retornam listas de recursos suportam paginação através dos parâmetros de consulta:

- `page`: Número da página (padrão: 1)
- `limit`: Número de itens por página (padrão: 10, máximo: 100)

### Exemplo de Resposta Paginada

\`\`\`json
{
  "data": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
\`\`\`

## Endpoints

### Estudantes

#### Listar Estudantes

\`\`\`
GET /students
\`\`\`

Parâmetros de consulta:
- `grade`: Filtrar por série
- `name`: Filtrar por nome (pesquisa parcial)

#### Obter Estudante por ID

\`\`\`
GET /students/{id}
\`\`\`

#### Criar Estudante

\`\`\`
POST /students
\`\`\`

#### Atualizar Estudante

\`\`\`
PUT /students/{id}
\`\`\`

#### Excluir Estudante

\`\`\`
DELETE /students/{id}
\`\`\`

#### Listar Notas de um Estudante

\`\`\`
GET /students/{id}/grades
\`\`\`

### Professores

#### Listar Professores

\`\`\`
GET /teachers
\`\`\`

Parâmetros de consulta:
- `subject`: Filtrar por disciplina

#### Obter Professor por ID

\`\`\`
GET /teachers/{id}
\`\`\`

#### Criar Professor

\`\`\`
POST /teachers
\`\`\`

#### Atualizar Professor

\`\`\`
PUT /teachers/{id}
\`\`\`

#### Excluir Professor

\`\`\`
DELETE /teachers/{id}
\`\`\`

### Materiais de Estudo

#### Listar Materiais

\`\`\`
GET /materials
\`\`\`

Parâmetros de consulta:
- `subject`: Filtrar por disciplina
- `grade`: Filtrar por série

#### Obter Material por ID

\`\`\`
GET /materials/{id}
\`\`\`

#### Criar Material

\`\`\`
POST /materials
\`\`\`

#### Atualizar Material

\`\`\`
PUT /materials/{id}
\`\`\`

#### Excluir Material

\`\`\`
DELETE /materials/{id}
\`\`\`

### Aulas Gravadas

#### Listar Aulas Gravadas

\`\`\`
GET /recorded-lessons
\`\`\`

Parâmetros de consulta:
- `subject`: Filtrar por disciplina
- `grade`: Filtrar por série
- `teacher`: Filtrar por professor

#### Obter Aula Gravada por ID

\`\`\`
GET /recorded-lessons/{id}
\`\`\`

#### Criar Aula Gravada

\`\`\`
POST /recorded-lessons
\`\`\`

#### Atualizar Aula Gravada

\`\`\`
PUT /recorded-lessons/{id}
\`\`\`

#### Excluir Aula Gravada

\`\`\`
DELETE /recorded-lessons/{id}
\`\`\`

#### Listar Comentários de uma Aula

\`\`\`
GET /recorded-lessons/{id}/comments
\`\`\`

#### Adicionar Comentário a uma Aula

\`\`\`
POST /recorded-lessons/{id}/comments
\`\`\`

### Estatísticas

#### Obter Estatísticas do Sistema

\`\`\`
GET /statistics
\`\`\`

Requer permissão de administrador ou diretor.

## Códigos de Status

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Parâmetros inválidos ou ausentes
- `401 Unauthorized`: Autenticação necessária ou inválida
- `403 Forbidden`: Permissão insuficiente
- `404 Not Found`: Recurso não encontrado
- `429 Too Many Requests`: Limite de taxa excedido
- `500 Internal Server Error`: Erro no servidor

## Limites de Taxa

A API tem um limite de 100 requisições por IP a cada 15 minutos. Se você exceder esse limite, receberá um código de status 429.

## Formatos de Dados

### Estudante

\`\`\`json
{
  "id": 1,
  "name": "Nome do Estudante",
  "email": "estudante@email.com",
  "grade": "9º Ano",
  "enrollmentDate": "2023-01-15",
  "parentName": "Nome do Responsável",
  "contactNumber": "+258 84 123 4567",
  "address": "Av. Principal, 123, Matola",
  "dateOfBirth": "2008-05-20"
}
\`\`\`

### Nota

\`\`\`json
{
  "id": 1,
  "studentId": 1,
  "subject": "Matemática",
  "grade": 16.5,
  "term": "1º Trimestre",
  "date": "2023-03-25",
  "teacherName": "Gabriel Silva",
  "comments": "Excelente desempenho nos exercícios"
}
\`\`\`

### Professor

\`\`\`json
{
  "id": 1,
  "name": "Gabriel Silva",
  "email": "gabriel.silva@colegiomatola.com",
  "subject": "Matemática",
  "bio": "Professor de Matemática com 10 anos de experiência",
  "education": "Mestrado em Matemática Aplicada",
  "joinedAt": "2018-03-15"
}
\`\`\`

### Material de Estudo

\`\`\`json
{
  "id": 1,
  "title": "Matemática Básica",
  "subject": "Matemática",
  "grade": "8º Ano",
  "type": "PDF",
  "url": "/materials/matematica-basica.pdf",
  "description": "Material completo sobre operações básicas de matemática",
  "pages": 45,
  "uploadedBy": "Gabriel Silva",
  "uploadedAt": "2023-05-10",
  "downloads": 128
}
\`\`\`

### Aula Gravada

\`\`\`json
{
  "id": 1,
  "title": "Equações do 2º Grau",
  "subject": "Matemática",
  "grade": "9º Ano",
  "teacher": "Gabriel Silva",
  "duration": "45:30",
  "url": "/videos/equacoes-2-grau.mp4",
  "thumbnail": "/thumbnails/equacoes-2-grau.jpg",
  "description": "Nesta aula, o professor Gabriel explica como resolver equações do segundo grau usando a fórmula de Bhaskara e outros métodos.",
  "uploadedAt": "2023-08-10",
  "views": 256,
  "likes": 45
}
\`\`\`

### Comentário

\`\`\`json
{
  "id": 1,
  "lessonId": 1,
  "user": "Nome do Usuário",
  "text": "Excelente aula, professor!",
  "date": "2023-08-11"
}
\`\`\`

### Estatísticas

\`\`\`json
{
  "students": {
    "total": 850,
    "byGrade": {
      "1º Ano": 65,
      "2º Ano": 72,
      "...": "..."
    },
    "gender": {
      "male": 430,
      "female": 420
    },
    "newEnrollments": {
      "lastMonth": 15,
      "lastYear": 120
    }
  },
  "teachers": {
    "total": 45,
    "bySubject": {
      "Matemática": 8,
      "Português": 7,
      "...": "..."
    },
    "gender": {
      "male": 22,
      "female": 23
    }
  },
  "content": {
    "recordedLessons": 156,
    "materials": 320,
    "mostViewedLessons": [
      { "id": 1, "title": "Equações do 2º Grau", "views": 256 },
      "..."
    ],
    "mostDownloadedMaterials": [
      { "id": 2, "title": "Gramática Portuguesa", "downloads": 185 },
      "..."
    ]
  },
  "performance": {
    "averageGrades": {
      "Matemática": 14.2,
      "Português": 15.5,
      "...": "..."
    },
    "passRate": 92.5,
    "topPerformingClass": "10º Ano",
    "improvementAreas": ["Matemática", "Inglês"]
  },
  "system": {
    "activeUsers": {
      "daily": 320,
      "weekly": 720,
      "monthly": 820
    },
    "peakUsageTimes": ["10:00", "14:00", "19:00"],
    "deviceUsage": {
      "desktop": 45,
      "mobile": 40,
      "tablet": 15
    }
  }
}
\`\`\`

## Erros

### Exemplo de Resposta de Erro

\`\`\`json
{
  "error": "Mensagem de erro detalhada"
}
\`\`\`

## Suporte

Para suporte técnico, entre em contato com a equipe de TI do Colégio Matola:

- Email: suporte@colegiomatola.com
- Telefone: +258 21 123 456
