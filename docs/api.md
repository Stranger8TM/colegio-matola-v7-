# API do Colégio Privado da Matola

Esta documentação descreve os endpoints disponíveis na API do Colégio Privado da Matola.

## Base URL

\`\`\`
https://escolaprivada.co.mz/api/v1
\`\`\`

## Autenticação

A API utiliza autenticação baseada em tokens JWT. Para acessar endpoints protegidos, você deve incluir o token no cabeçalho `Authorization`:

\`\`\`
Authorization: Bearer seu_token_jwt
\`\`\`

### Obter Token

**Endpoint:** `POST /auth/login`

**Corpo da Requisição:**
\`\`\`json
{
  "username": "seu_usuario",
  "password": "sua_senha"
}
\`\`\`

**Resposta de Sucesso:**
\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "Nome do Usuário",
      "email": "email@exemplo.com",
      "profileImage": "url_da_imagem",
      "role": "student|teacher|admin"
    },
    "token": "seu_token_jwt"
  },
  "message": "Login realizado com sucesso"
}
\`\`\`

## Alunos

### Listar Alunos

**Endpoint:** `GET /students`

**Parâmetros de Consulta:**
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Limite de itens por página (padrão: 10)
- `sortBy` (opcional): Campo para ordenação (padrão: name)
- `sortOrder` (opcional): Ordem de classificação (asc ou desc, padrão: asc)
- `search` (opcional): Termo de pesquisa para nome ou email
- `class` (opcional): Filtrar por classe
- `status` (opcional): Filtrar por status (active, inactive, suspended)

**Resposta de Sucesso:**
\`\`\`json
{
  "success": true,
  "data": {
    "students": [
      {
        "id": "student_id",
        "name": "Nome do Aluno",
        "email": "aluno@exemplo.com",
        "profileImage": "url_da_imagem",
        "class": "10ª Classe",
        "grade": "A",
        "status": "active",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
\`\`\`

### Obter Aluno

**Endpoint:** `GET /students/:id`

**Resposta de Sucesso:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "student_id",
    "name": "Nome do Aluno",
    "email": "aluno@exemplo.com",
    "profileImage": "url_da_imagem",
    "class": "10ª Classe",
    "grade": "A",
    "parentName": "Nome do Responsável",
    "parentContact": "Contato do Responsável",
    "status": "active",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
\`\`\`

### Criar Aluno

**Endpoint:** `POST /students`

**Corpo da Requisição:**
\`\`\`json
{
  "name": "Nome do Aluno",
  "email": "aluno@exemplo.com",
  "class": "10ª Classe",
  "grade": "A",
  "profileImage": "url_da_imagem",
  "parentName": "Nome do Responsável",
  "parentContact": "Contato do Responsável",
  "status": "active"
}
\`\`\`

**Resposta de Sucesso:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "student_id",
    "name": "Nome do Aluno",
    "email": "aluno@exemplo.com",
    "profileImage": "url_da_imagem",
    "class": "10ª Classe",
    "grade": "A",
    "parentName": "Nome do Responsável",
    "parentContact": "Contato do Responsável",
    "status": "active",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Aluno criado com sucesso"
}
\`\`\`

### Atualizar Aluno

**Endpoint:** `PUT /students/:id`

**Corpo da Requisição:**
\`\`\`json
{
  "name": "Nome Atualizado",
  "email": "email_atualizado@exemplo.com",
  "class": "11ª Classe",
  "grade": "A+",
  "profileImage": "nova_url_da_imagem",
  "parentName": "Novo Nome do Responsável",
  "parentContact": "Novo Contato do Responsável",
  "status": "active"
}
\`\`\`

**Resposta de Sucesso:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "student_id",
    "name": "Nome Atualizado",
    "email": "email_atualizado@exemplo.com",
    "profileImage": "nova_url_da_imagem",
    "class": "11ª Classe",
    "grade": "A+",
    "parentName": "Novo Nome do Responsável",
    "parentContact": "Novo Contato do Responsável",
    "status": "active",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Aluno atualizado com sucesso"
}
\`\`\`

### Excluir Aluno

**Endpoint:** `DELETE /students/:id`

**Resposta de Sucesso:**
\`\`\`json
{
  "success": true,
  "message": "Aluno excluído com sucesso"
}
\`\`\`

### Obter Notas do Aluno

**Endpoint:** `GET /students/:id/grades`

**Parâmetros de Consulta:**
- `term` (opcional): Filtrar por trimestre
- `subject` (opcional): Filtrar por disciplina

**Resposta de Sucesso:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "grade_id",
      "studentId": "student_id",
      "teacherId": "teacher_id",
      "teacherName": "Nome do Professor",
      "subject": "Matemática",
      "value": 16.5,
      "term": "1º Trimestre",
      "comments": "Excelente desempenho",
      "date": "2023-01-01T00:00:00.000Z"
    }
  ]
}
\`\`\`

## Professores

### Listar Professores

**Endpoint:** `GET /teachers`

**Parâmetros de Consulta:**
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Limite de itens por página (padrão: 10)
- `sortBy` (opcional): Campo para ordenação (padrão: name)
- `sortOrder` (opcional): Ordem de classificação (asc ou desc, padrão: asc)
- `search` (opcional): Termo de pesquisa para nome ou email
- `subject` (opcional): Filtrar por disciplina
- `status` (opcional): Filtrar por status (active, inactive)

**Resposta de Sucesso:**
\`\`\`json
{
  "success": true,
  "data": {
    "teachers": [
      {
        "id": "teacher_id",
        "name": "Nome do Professor",
        "email": "professor@exemplo.com",
        "profileImage": "url_da_imagem",
        "subject": "Matemática",
        "status": "active",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
\`\`\`

## Materiais

### Listar Materiais

**Endpoint:** `GET /materials`

**Parâmetros de Consulta:**
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Limite de itens por página (padrão: 10)
- `sortBy` (opcional): Campo para ordenação (padrão: uploadDate)
- `sortOrder` (opcional): Ordem de classificação (asc ou desc, padrão: desc)
- `search` (opcional): Termo de pesquisa para título ou descrição
- `subject` (opcional): Filtrar por disciplina
- `class` (opcional): Filtrar por classe alvo
- `teacherId` (opcional): Filtrar por professor

**Resposta de Sucesso:**
\`\`\`json
{
  "success": true,
  "data": {
    "materials": [
      {
        "id": "material_id",
        "title": "Título do Material",
        "description": "Descrição do Material",
        "subject": "Matemática",
        "fileUrl": "url_do_arquivo",
        "classTarget": "10ª Classe",
        "teacherId": "teacher_id",
        "teacherName": "Nome do Professor",
        "uploadDate": "2023-01-01T00:00:00.000Z",
        "downloads": 42
      }
    ],
    "pagination": {
      "total": 200,
      "page": 1,
      "limit": 10,
      "totalPages": 20,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
\`\`\`

## Aulas Gravadas

### Listar Aulas Gravadas

**Endpoint:** `GET /recorded-lessons`

**Parâmetros de Consulta:**
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Limite de itens por página (padrão: 10)
- `sortBy` (opcional): Campo para ordenação (padrão: uploadDate)
- `sortOrder` (opcional): Ordem de classificação (asc ou desc, padrão: desc)
- `search` (opcional): Termo de pesquisa para título ou descrição
- `subject` (opcional): Filtrar por disciplina
- `class` (opcional): Filtrar por classe alvo
- `teacherId` (opcional): Filtrar por professor

**Resposta de Sucesso:**
\`\`\`json
{
  "success": true,
  "data": {
    "lessons": [
      {
        "id": "lesson_id",
        "title": "Título da Aula",
        "description": "Descrição da Aula",
        "subject": "Matemática",
        "videoUrl": "url_do_video",
        "thumbnailUrl": "url_da_miniatura",
        "duration": 2700,
        "classTarget": "10ª Classe",
        "teacherId": "teacher_id",
        "teacherName": "Nome do Professor",
        "  "10ª Classe",
        "teacherId": "teacher_id",
        "teacherName": "Nome do Professor",
        "uploadDate": "2023-01-01T00:00:00.000Z",
        "views": 128
      }
    ],
    "pagination": {
      "total": 150,
      "page": 1,
      "limit": 10,
      "totalPages": 15,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
\`\`\`

## Notas

### Listar Notas

**Endpoint:** `GET /grades`

**Parâmetros de Consulta:**
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Limite de itens por página (padrão: 10)
- `sortBy` (opcional): Campo para ordenação (padrão: date)
- `sortOrder` (opcional): Ordem de classificação (asc ou desc, padrão: desc)
- `studentId` (opcional): Filtrar por aluno
- `teacherId` (opcional): Filtrar por professor
- `subject` (opcional): Filtrar por disciplina
- `term` (opcional): Filtrar por trimestre
- `class` (opcional): Filtrar por classe

**Resposta de Sucesso:**
\`\`\`json
{
  "success": true,
  "data": {
    "grades": [
      {
        "id": "grade_id",
        "studentId": "student_id",
        "studentName": "Nome do Aluno",
        "teacherId": "teacher_id",
        "teacherName": "Nome do Professor",
        "subject": "Matemática",
        "value": 16.5,
        "term": "1º Trimestre",
        "comments": "Excelente desempenho",
        "date": "2023-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 500,
      "page": 1,
      "limit": 10,
      "totalPages": 50,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
\`\`\`

## Eventos

### Listar Eventos

**Endpoint:** `GET /events`

**Parâmetros de Consulta:**
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Limite de itens por página (padrão: 10)
- `sortBy` (opcional): Campo para ordenação (padrão: date)
- `sortOrder` (opcional): Ordem de classificação (asc ou desc, padrão: asc)
- `search` (opcional): Termo de pesquisa para título ou descrição
- `type` (opcional): Filtrar por tipo (academic, cultural, sports, other)
- `startDate` (opcional): Filtrar por data de início
- `endDate` (opcional): Filtrar por data de término
- `targetClass` (opcional): Filtrar por classe alvo

**Resposta de Sucesso:**
\`\`\`json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "event_id",
        "title": "Título do Evento",
        "description": "Descrição do Evento",
        "date": "2023-01-01T00:00:00.000Z",
        "location": "Local do Evento",
        "type": "academic",
        "targetClass": "10ª Classe"
      }
    ],
    "pagination": {
      "total": 30,
      "page": 1,
      "limit": 10,
      "totalPages": 3,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
\`\`\`

## Estatísticas

### Obter Estatísticas

**Endpoint:** `GET /statistics`

**Resposta de Sucesso:**
\`\`\`json
{
  "success": true,
  "data": {
    "totalStudents": 500,
    "totalTeachers": 50,
    "totalCourses": 20,
    "activeClasses": 15,
    "pendingAdmissions": 25,
    "monthlyRevenue": "150000",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
\`\`\`

## Códigos de Status

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Requisição inválida ou dados ausentes
- `401 Unauthorized`: Autenticação necessária ou falha na autenticação
- `403 Forbidden`: Acesso negado ao recurso
- `404 Not Found`: Recurso não encontrado
- `409 Conflict`: Conflito com o estado atual do recurso
- `500 Internal Server Error`: Erro interno do servidor

## Formato de Resposta

Todas as respostas seguem o mesmo formato:

\`\`\`json
{
  "success": true|false,
  "data": {...},  // Presente apenas em respostas bem-sucedidas
  "error": "...",  // Presente apenas em respostas de erro
  "message": "..."  // Mensagem informativa opcional
}
