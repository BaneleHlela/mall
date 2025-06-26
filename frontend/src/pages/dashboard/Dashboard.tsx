import DashBoardMenubar from '../../components/dashboard/menubar/DashBoardMenubar'
import { Routes, Route } from 'react-router-dom'
import DashboardTopbar from '../../components/dashboard/menubar/DashboardTopbar'
import DashboardSections from './supporting/DashboardSections'

const Dashboard = () => {
  return (
    <div
        className='h-screen w-screen flex flex-row overflow-clip'
    >
        <DashBoardMenubar />
        <div className="flex flex-col w-full">
            <DashboardTopbar />
            <Routes>
                <Route path="/sections" element={<DashboardSections />} />
            </Routes>
        </div>
    </div>
  )
}

export default Dashboard