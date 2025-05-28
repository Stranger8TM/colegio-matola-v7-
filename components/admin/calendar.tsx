"use client"

import { useState } from "react"
import { CalendarIcon, Plus, Trash2, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Feriados nacionais de Moçambique 2023
const mozambiqueHolidays = [
  { date: "2023-01-01", name: "Ano Novo" },
  { date: "2023-02-03", name: "Dia dos Heróis Moçambicanos" },
  { date: "2023-04-07", name: "Dia da Mulher Moçambicana" },
  { date: "2023-04-14", name: "Sexta-feira Santa" },
  { date: "2023-05-01", name: "Dia do Trabalhador" },
  { date: "2023-06-25", name: "Dia da Independência" },
  { date: "2023-09-07", name: "Dia da Vitória" },
  { date: "2023-09-25", name: "Dia das Forças Armadas" },
  { date: "2023-10-04", name: "Dia da Paz e Reconciliação" },
  { date: "2023-12-25", name: "Natal" },
]

// Eventos escolares (exemplo)
const initialSchoolEvents = [
  { id: "1", date: "2023-02-15", name: "Início do Ano Letivo", type: "school" },
  { id: "2", date: "2023-04-01", name: "Feira de Ciências", type: "school" },
  { id: "3", date: "2023-06-30", name: "Fim do 1º Semestre", type: "school" },
  { id: "4", date: "2023-07-15", name: "Início do 2º Semestre", type: "school" },
  { id: "5", date: "2023-11-30", name: "Formatura", type: "school" },
]

export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState(initialSchoolEvents)
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({ date: "", name: "", type: "school" })
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  // Ajustar para que a semana comece na segunda-feira (0 = Segunda, 6 = Domingo)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const dayNames = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleAddEvent = () => {
    if (newEvent.date && newEvent.name) {
      const newId = (events.length + 1).toString()
      setEvents([...events, { ...newEvent, id: newId }])
      setNewEvent({ date: "", name: "", type: "school" })
      setShowAddEvent(false)
    }
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const isHoliday = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mozambiqueHolidays.find((holiday) => holiday.date === dateStr)
  }

  const getEventsForDate = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.filter((event) => event.date === dateStr)
  }

  const handleDateClick = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    setSelectedDate(dateStr)
    setNewEvent({ ...newEvent, date: dateStr })
  }

  // Gerar dias do calendário
  const calendarDays = []
  for (let i = 0; i < adjustedFirstDay; i++) {
    calendarDays.push(
      <div
        key={`empty-${i}`}
        className="h-12 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
      ></div>,
    )
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const isToday = new Date().toDateString() === date.toDateString()
    const holiday = isHoliday(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dayEvents = getEventsForDate(currentDate.getFullYear(), currentDate.getMonth(), day)
    const isSelected =
      selectedDate ===
      `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

    calendarDays.push(
      <div
        key={`day-${day}`}
        className={`h-24 border border-gray-200 dark:border-gray-700 p-1 overflow-hidden transition-colors
          ${isToday ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700" : "bg-white dark:bg-gray-800"}
          ${isSelected ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""}
          ${holiday ? "bg-red-50 dark:bg-red-900/10" : ""}
          hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer`}
        onClick={() => handleDateClick(currentDate.getFullYear(), currentDate.getMonth(), day)}
      >
        <div className="flex justify-between items-start">
          <span className={`text-sm font-medium ${isToday ? "text-blue-600 dark:text-blue-400" : ""}`}>{day}</span>
          {holiday && (
            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-1 rounded">
              Feriado
            </span>
          )}
        </div>

        {holiday && <div className="text-xs text-red-600 dark:text-red-400 truncate mt-1">{holiday.name}</div>}

        {dayEvents.map((event, idx) => (
          <div
            key={event.id}
            className={`text-xs truncate mt-1 px-1 rounded
              ${event.type === "school" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300" : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"}`}
          >
            {event.name}
          </div>
        ))}
      </div>,
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Calendário Escolar</CardTitle>
            <CardDescription>Gerencie eventos e visualize feriados</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={prevMonth}>
              &lt;
            </Button>
            <span className="text-sm font-medium">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              &gt;
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayNames.map((day, index) => (
            <div key={index} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">{calendarDays}</div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Eventos</h3>
            <Button onClick={() => setShowAddEvent(!showAddEvent)} size="sm" className="bg-blue-800 hover:bg-blue-700">
              {showAddEvent ? <Check className="mr-1 h-4 w-4" /> : <Plus className="mr-1 h-4 w-4" />}
              {showAddEvent ? "Concluir" : "Adicionar Evento"}
            </Button>
          </div>

          {showAddEvent && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20"
            >
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Data</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nome do Evento</label>
                  <input
                    type="text"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    placeholder="Nome do evento"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  >
                    <option value="school">Evento Escolar</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
                <Button onClick={handleAddEvent} className="bg-green-600 hover:bg-green-700">
                  Adicionar Evento
                </Button>
              </div>
            </motion.div>
          )}

          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {events.length > 0 ? (
              events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium">{event.name}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(event.date).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">Nenhum evento adicionado</div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-2">Legenda</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-sm mr-1"></div>
                <span className="text-xs">Evento Escolar</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-sm mr-1"></div>
                <span className="text-xs">Feriado Nacional</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-sm mr-1"></div>
                <span className="text-xs">Outro Evento</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
