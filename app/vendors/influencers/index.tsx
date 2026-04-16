import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export const Route = createFileRoute("/vendors/influencers/")({
  component: page,
})

export default page
