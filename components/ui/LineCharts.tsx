"use client"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const LineCharts = () => {
const data = [
    {
    id: '1', 
    month: 'jan', 
    amt: 2400
    },
    {
        id: '2', 
        month: 'feb', 
        amt: 2000
        },
        {
            id: '3', 
            month: 'march', 
            amt: 2700
            },
            {
                id: '4', 
                month: 'april', 
                amt: 2500
                },
]

  return (
    <div className=''>
        {/* aspect={1.2} */}
        <ResponsiveContainer width="95%" height={300}>
            <LineChart data={data}>
                <Line type="monotone" dataKey="amt" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis dataKey='amt' />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default LineCharts