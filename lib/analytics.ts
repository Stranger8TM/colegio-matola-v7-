import config from "./config"

interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: Date
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private isEnabled: boolean

  constructor() {
    this.isEnabled = config.app.environment === "production"
  }

  track(name: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return

    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: new Date(),
    }

    this.events.push(event)

    // Log to console in development
    if (config.app.environment === "development") {
      console.log("📊 Analytics Event:", event)
    }

    // Here you could send to external analytics service
    this.sendToService(event)
  }

  private async sendToService(event: AnalyticsEvent) {
    try {
      // Example: send to your analytics endpoint
      await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })
    } catch (error) {
      console.error("Failed to send analytics event:", error)
    }
  }

  getEvents() {
    return this.events
  }

  clearEvents() {
    this.events = []
  }
}

export const analytics = new Analytics()

// Common tracking functions
export const trackPageView = (page: string) => {
  analytics.track("page_view", { page })
}

export const trackButtonClick = (button: string, location?: string) => {
  analytics.track("button_click", { button, location })
}

export const trackFormSubmit = (form: string, success: boolean) => {
  analytics.track("form_submit", { form, success })
}

export const trackChatbotInteraction = (message: string, response?: string) => {
  analytics.track("chatbot_interaction", { message, response })
}
