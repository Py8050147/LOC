"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

let browersQueryClient: QueryClient | undefined = undefined

function makeQueryClient() {
    return new QueryClient()
}

function getQueryClient() {
   if (typeof window === undefined) {
    return makeQueryClient()
   } else {
    if (!browersQueryClient) {
        browersQueryClient = makeQueryClient()
    }
    return browersQueryClient
   }
    

}

const queryClient = getQueryClient()

export function QueryProvider({children}: {children: React.ReactNode}) {
    return <QueryClientProvider  client={queryClient}>
         {children}
     </QueryClientProvider>
 }