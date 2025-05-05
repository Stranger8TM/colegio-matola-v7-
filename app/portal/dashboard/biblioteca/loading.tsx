import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BibliotecaLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
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
        <div className="hidden md:block lg:col-span-1">
          <Card className="border-0 shadow-md rounded-xl overflow-hidden">
            <CardContent className="p-4">
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-2">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full rounded-lg" />
                  ))}
              </div>

              <Skeleton className="h-6 w-24 my-4" />
              <Skeleton className="h-10 w-full rounded-md" />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Skeleton className="h-8 w-48 mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="border-0 shadow-md rounded-xl overflow-hidden">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/3">
                      <Skeleton className="h-48 w-full" />
                    </div>
                    <div className="md:w-2/3 p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-full mb-3" />
                      <Skeleton className="h-4 w-2/3 mb-4" />
                      <Skeleton className="h-4 w-full mb-3" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                </Card>
              ))}
          </div>

          <Skeleton className="h-8 w-48 mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="border-0 shadow-md rounded-xl overflow-hidden">
                  <div className="p-4">
                    <Skeleton className="h-32 w-full rounded-lg mb-3" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
