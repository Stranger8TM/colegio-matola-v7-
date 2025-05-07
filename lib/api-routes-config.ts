export const API_VERSION = "v1"
export const API_BASE_PATH = `/api/${API_VERSION}`

// Configuração de rotas para os novos modelos
export const API_ROUTES = {
  // Rotas existentes
  AUTH: {
    LOGIN: `${API_BASE_PATH}/auth/login`,
    LOGOUT: `${API_BASE_PATH}/auth/logout`,
    REFRESH: `${API_BASE_PATH}/auth/refresh`,
  },
  STUDENTS: {
    BASE: `${API_BASE_PATH}/students`,
    DETAIL: (id: string) => `${API_BASE_PATH}/students/${id}`,
    GRADES: (id: string) => `${API_BASE_PATH}/students/${id}/grades`,
  },
  TEACHERS: {
    BASE: `${API_BASE_PATH}/teachers`,
    DETAIL: (id: string) => `${API_BASE_PATH}/teachers/${id}`,
  },
  MATERIALS: {
    BASE: `${API_BASE_PATH}/materials`,
    DETAIL: (id: string) => `${API_BASE_PATH}/materials/${id}`,
  },
  RECORDED_LESSONS: {
    BASE: `${API_BASE_PATH}/recorded-lessons`,
    DETAIL: (id: string) => `${API_BASE_PATH}/recorded-lessons/${id}`,
  },

  // Novas rotas
  LIBRARY: {
    BOOKS: {
      BASE: `${API_BASE_PATH}/library/books`,
      DETAIL: (id: string) => `${API_BASE_PATH}/library/books/${id}`,
      SEARCH: `${API_BASE_PATH}/library/books/search`,
      POPULAR: `${API_BASE_PATH}/library/books/popular`,
    },
    LOANS: {
      BASE: `${API_BASE_PATH}/library/loans`,
      DETAIL: (id: string) => `${API_BASE_PATH}/library/loans/${id}`,
      USER: (userId: string) => `${API_BASE_PATH}/library/loans/user/${userId}`,
      OVERDUE: `${API_BASE_PATH}/library/loans/overdue`,
    },
  },
  EXTRACURRICULAR: {
    ACTIVITIES: {
      BASE: `${API_BASE_PATH}/extracurricular/activities`,
      DETAIL: (id: string) => `${API_BASE_PATH}/extracurricular/activities/${id}`,
      ENROLLMENTS: (id: string) => `${API_BASE_PATH}/extracurricular/activities/${id}/enrollments`,
    },
    ENROLLMENTS: {
      BASE: `${API_BASE_PATH}/extracurricular/enrollments`,
      DETAIL: (id: string) => `${API_BASE_PATH}/extracurricular/enrollments/${id}`,
      USER: (userId: string) => `${API_BASE_PATH}/extracurricular/enrollments/user/${userId}`,
    },
  },
  ATTENDANCE: {
    BASE: `${API_BASE_PATH}/attendance`,
    DETAIL: (id: string) => `${API_BASE_PATH}/attendance/${id}`,
    CLASS: (classId: string) => `${API_BASE_PATH}/attendance/class/${classId}`,
    STUDENT: (studentId: string) => `${API_BASE_PATH}/attendance/student/${studentId}`,
    DATE: (date: string) => `${API_BASE_PATH}/attendance/date/${date}`,
    REPORT: `${API_BASE_PATH}/attendance/report`,
  },
  CALENDAR: {
    EVENTS: {
      BASE: `${API_BASE_PATH}/calendar/events`,
      DETAIL: (id: string) => `${API_BASE_PATH}/calendar/events/${id}`,
      UPCOMING: `${API_BASE_PATH}/calendar/events/upcoming`,
      DATE_RANGE: `${API_BASE_PATH}/calendar/events/range`,
    },
    ACADEMIC_TERMS: {
      BASE: `${API_BASE_PATH}/calendar/terms`,
      DETAIL: (id: string) => `${API_BASE_PATH}/calendar/terms/${id}`,
      CURRENT: `${API_BASE_PATH}/calendar/terms/current`,
    },
  },
  COMMUNICATION: {
    MESSAGES: {
      BASE: `${API_BASE_PATH}/communication/messages`,
      DETAIL: (id: string) => `${API_BASE_PATH}/communication/messages/${id}`,
      INBOX: (userId: string) => `${API_BASE_PATH}/communication/messages/inbox/${userId}`,
      SENT: (userId: string) => `${API_BASE_PATH}/communication/messages/sent/${userId}`,
      UNREAD: (userId: string) => `${API_BASE_PATH}/communication/messages/unread/${userId}`,
    },
    ANNOUNCEMENTS: {
      BASE: `${API_BASE_PATH}/communication/announcements`,
      DETAIL: (id: string) => `${API_BASE_PATH}/communication/announcements/${id}`,
      ACTIVE: `${API_BASE_PATH}/communication/announcements/active`,
    },
  },
  TRANSPORTATION: {
    ROUTES: {
      BASE: `${API_BASE_PATH}/transportation/routes`,
      DETAIL: (id: string) => `${API_BASE_PATH}/transportation/routes/${id}`,
    },
    VEHICLES: {
      BASE: `${API_BASE_PATH}/transportation/vehicles`,
      DETAIL: (id: string) => `${API_BASE_PATH}/transportation/vehicles/${id}`,
    },
    STOPS: {
      BASE: `${API_BASE_PATH}/transportation/stops`,
      DETAIL: (id: string) => `${API_BASE_PATH}/transportation/stops/${id}`,
      ROUTE: (routeId: string) => `${API_BASE_PATH}/transportation/stops/route/${routeId}`,
    },
    STUDENT_ROUTES: {
      BASE: `${API_BASE_PATH}/transportation/student-routes`,
      DETAIL: (id: string) => `${API_BASE_PATH}/transportation/student-routes/${id}`,
      STUDENT: (studentId: string) => `${API_BASE_PATH}/transportation/student-routes/student/${studentId}`,
    },
  },
  HEALTH: {
    RECORDS: {
      BASE: `${API_BASE_PATH}/health/records`,
      DETAIL: (id: string) => `${API_BASE_PATH}/health/records/${id}`,
      STUDENT: (studentId: string) => `${API_BASE_PATH}/health/records/student/${studentId}`,
    },
    MEDICATIONS: {
      BASE: `${API_BASE_PATH}/health/medications`,
      DETAIL: (id: string) => `${API_BASE_PATH}/health/medications/${id}`,
      STUDENT: (studentId: string) => `${API_BASE_PATH}/health/medications/student/${studentId}`,
    },
    INCIDENTS: {
      BASE: `${API_BASE_PATH}/health/incidents`,
      DETAIL: (id: string) => `${API_BASE_PATH}/health/incidents/${id}`,
      STUDENT: (studentId: string) => `${API_BASE_PATH}/health/incidents/student/${studentId}`,
    },
  },
  FINANCE: {
    PAYMENTS: {
      BASE: `${API_BASE_PATH}/finance/payments`,
      DETAIL: (id: string) => `${API_BASE_PATH}/finance/payments/${id}`,
      STUDENT: (studentId: string) => `${API_BASE_PATH}/finance/payments/student/${studentId}`,
      PENDING: `${API_BASE_PATH}/finance/payments/pending`,
      OVERDUE: `${API_BASE_PATH}/finance/payments/overdue`,
    },
    INVOICES: {
      BASE: `${API_BASE_PATH}/finance/invoices`,
      DETAIL: (id: string) => `${API_BASE_PATH}/finance/invoices/${id}`,
      STUDENT: (studentId: string) => `${API_BASE_PATH}/finance/invoices/student/${studentId}`,
    },
    SCHOLARSHIPS: {
      BASE: `${API_BASE_PATH}/finance/scholarships`,
      DETAIL: (id: string) => `${API_BASE_PATH}/finance/scholarships/${id}`,
      STUDENT: (studentId: string) => `${API_BASE_PATH}/finance/scholarships/student/${studentId}`,
    },
  },
  EXAMS: {
    BASE: `${API_BASE_PATH}/exams`,
    DETAIL: (id: string) => `${API_BASE_PATH}/exams/${id}`,
    SCHEDULE: `${API_BASE_PATH}/exams/schedule`,
    RESULTS: {
      BASE: `${API_BASE_PATH}/exams/results`,
      EXAM: (examId: string) => `${API_BASE_PATH}/exams/${examId}/results`,
      STUDENT: (studentId: string) => `${API_BASE_PATH}/exams/results/student/${studentId}`,
    },
  },
}
