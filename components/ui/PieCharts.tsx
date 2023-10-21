"use client"
import { PieChart, Pie, ResponsiveContainer } from 'recharts'


const PieCharts = () => {
  const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "jan",
      "value": 189
    }
  ];
  return (
    <ResponsiveContainer width="95%" height={300}>
      <PieChart>
        <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieCharts