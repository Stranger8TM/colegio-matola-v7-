import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ForumLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-md rounded-xl overflow-hidden">
            <CardContent className="p-4">
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-3">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center">
                      <Skeleton className="h-8 w-8 rounded-full mr-3" />
                      <Skeleton className="h-8 flex-1" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="border-0 shadow-md rounded-xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Skeleton className="hidden md:block h-10 w-10 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Skeleton className="h-5 w-16 rounded-full" />
                          <Skeleton className="h-5 w-24 rounded-full" />
                        </div>
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-3/4 mb-3" />
                        <div className="flex flex-wrap gap-3">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-28" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
