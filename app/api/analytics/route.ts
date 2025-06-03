import { type NextRequest, NextResponse } from "next/server"
import config from "@/lib/config"

export async function POST(req: NextRequest) {
  try {
    const event = await req.json()

    // Log analytics event
    console.log("📊 Analytics Event Received:", {
      ...event,
      timestamp: new Date().toISOString(),
      environment: config.app.environment,
    })

    // Here you could store in database or send to external service
    // For now, we'll just acknowledge receipt

    return NextResponse.json({
      success: true,
      message: "Event tracked successfully",
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ success: false, error: "Failed to track event" }, { status: 500 })
  }
}
