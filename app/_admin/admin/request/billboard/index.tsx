import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/request/billboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/admin/request/billboard/"!</div>
}
