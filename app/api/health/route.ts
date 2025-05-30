import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: process.env.DATABASE_URL ? "configured" : "not configured",
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: "Health check failed",
      },
      { status: 500 },
    )
  }
}
