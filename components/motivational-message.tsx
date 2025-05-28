"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Lightbulb, Star, Award, Sparkles, Zap } from "lucide-react"

// Lista de mensagens motivacionais para professores
const teacherMessages = [
  {
    message: "Você está moldando o futuro de Moçambique, um aluno de cada vez.",
    author: "Nelson Mandela",
    quote: "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
  },
  {
    message: "Seu impacto vai muito além da sala de aula. Você inspira sonhos e transforma vidas.",
    author: "Malala Yousafzai",
    quote: "Um professor, um livro, uma caneta podem mudar o mundo.",
  },
  {
    message: "Cada aula que você ministra é uma oportunidade de inspirar uma mente jovem a alcançar grandeza.",
    author: "William Arthur Ward",
    quote:
      "O professor medíocre conta. O bom professor explica. O professor superior demonstra. O grande professor inspira.",
  },
  {
    message:
      "Seu trabalho hoje está construindo o Moçambique de amanhã. Continue acreditando no potencial de cada aluno.",
    author: "Samora Machel",
    quote: "A educação é a base para o desenvolvimento da nossa nação.",
  },
  {
    message: "Quando um professor acredita, o aluno conquista. Seu apoio faz toda a diferença.",
    author: "Henry Adams",
    quote: "Um professor afeta a eternidade; ele nunca pode dizer onde sua influência termina.",
  },
  {
    message: "Sua dedicação transforma desafios em oportunidades de aprendizado. Você é extraordinário!",
    author: "Graça Machel",
    quote: "A educação é a chave para abrir a porta dourada da liberdade.",
  },
  {
    message:
      "Cada explicação paciente, cada sorriso encorajador, cada momento extra que você dedica faz diferença na vida de um aluno.",
    author: "Carl Jung",
    quote: "Quem olha para fora, sonha; quem olha para dentro, acorda.",
  },
  {
    message:
      "Você não está apenas ensinando conteúdo, está formando caráter, cultivando sonhos e inspirando excelência.",
    author: "Aristóteles",
    quote: "Aqueles que sabem, fazem. Aqueles que compreendem, ensinam.",
  },
  {
    message: "Seu conhecimento ilumina mentes, mas é sua paixão pelo ensino que acende o fogo do aprendizado.",
    author: "Plutarco",
    quote: "A mente não é um vaso a ser preenchido, mas um fogo a ser aceso.",
  },
  {
    message:
      "Hoje pode ser difícil, mas lembre-se: você está formando os líderes, inovadores e cidadãos que transformarão Moçambique.",
    author: "José Craveirinha",
    quote: "Somos feitos da mesma matéria que os sonhos.",
  },
]

// Lista de mensagens motivacionais para alunos
const studentMessages = [
  {
    message:
      "Cada página que você lê, cada problema que resolve, cada desafio que enfrenta está construindo seu futuro brilhante.",
    author: "Nelson Mandela",
    quote: "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
  },
  {
    message: "Seu potencial é ilimitado. Continue aprendendo, questionando e crescendo todos os dias.",
    author: "Mia Couto",
    quote: "O que faz andar a estrada? É o sonho. Enquanto a gente sonhar, a estrada permanecerá viva.",
  },
  {
    message: "Cada esforço de hoje é uma vitória garantida no seu amanhã. Persista!",
    author: "Paulina Chiziane",
    quote: "Não há nada impossível para quem persiste.",
  },
  {
    message:
      "Você tem o poder de transformar não apenas sua vida, mas também a de sua família e comunidade através da educação.",
    author: "Malala Yousafzai",
    quote: "Um livro, uma caneta, uma criança e um professor podem mudar o mundo.",
  },
  {
    message: "Sua curiosidade e dedicação são as ferramentas que abrirão todas as portas do conhecimento.",
    author: "Albert Einstein",
    quote: "A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original.",
  },
  {
    message: "Cada desafio superado na escola é um passo em direção ao líder que você está destinado a se tornar.",
    author: "Samora Machel",
    quote: "Estudar, produzir e combater são tarefas do nosso tempo.",
  },
  {
    message: "Não tenha medo de sonhar grande. Com educação e determinação, você pode alcançar qualquer objetivo.",
    author: "Graça Machel",
    quote:
      "Sonhe com o que você quiser. Vá para onde queira ir. Seja o que quiser ser, porque você só tem uma vida e uma chance de fazer tudo o que quer fazer.",
  },
  {
    message:
      "Sua jornada educacional é única. Valorize cada aprendizado, celebre cada conquista, por menor que pareça.",
    author: "José Craveirinha",
    quote: "Somos feitos da mesma matéria que os sonhos.",
  },
  {
    message: "O conhecimento que você adquire hoje será a força que transformará Moçambique amanhã.",
    author: "Noémia de Sousa",
    quote: "Sangue negro, sangue forte, sangue do meu sangue, sangue da vida.",
  },
  {
    message: "Acredite em si mesmo. Você tem talentos únicos que o mundo precisa. Continue aprendendo e crescendo.",
    author: "Maya Angelou",
    quote: "Nada funcionará se você não fizer.",
  },
]

// Ícones para as mensagens
const icons = [
  <Lightbulb key="lightbulb" className="h-6 w-6 text-yellow-500" />,
  <Star key="star" className="h-6 w-6 text-yellow-500" />,
  <Award key="award" className="h-6 w-6 text-yellow-500" />,
  <Sparkles key="sparkles" className="h-6 w-6 text-yellow-500" />,
  <Zap key="zap" className="h-6 w-6 text-yellow-500" />,
]

interface MotivationalMessageProps {
  type: "teacher" | "student"
  userName?: string
}

export default function MotivationalMessage({ type, userName }: MotivationalMessageProps) {
  const [message, setMessage] = useState<any>(null)
  const [icon, setIcon] = useState<React.ReactNode | null>(null)

  useEffect(() => {
    // Selecionar uma mensagem aleatória com base no tipo
    const messages = type === "teacher" ? teacherMessages : studentMessages
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    const randomIcon = icons[Math.floor(Math.random() * icons.length)]

    setMessage(randomMessage)
    setIcon(randomIcon)
  }, [type])

  if (!message) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-6 mb-6 shadow-sm"
    >
      <div className="flex items-start">
        <div className="bg-white dark:bg-gray-800 rounded-full p-3 mr-4 shadow-sm">{icon}</div>
        <div>
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">
            {userName ? `Olá, ${userName}!` : type === "teacher" ? "Olá, Professor!" : "Olá, Estudante!"}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">{message.message}</p>
          <div className="mt-4 border-l-4 border-blue-300 dark:border-blue-700 pl-4 italic">
            <p className="text-gray-600 dark:text-gray-400">{message.quote}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">— {message.author}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
