import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

const Analysis = () => {
  return (
    <div>Analysis</div>
  )
}

export const Route = createFileRoute("/_usersauth/users/analysis/")({
  component: Analysis,
})

export default Analysis
