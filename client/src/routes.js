import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Landingpage = React.lazy(() => import('./views/dashboardtest'))
const Announcement = React.lazy(() => import('./views/crud/crudAnnouncement'))
const LMS = React.lazy(() => import('./views/ui/LearningManagement/index'))
const ModuleDetails = React.lazy(() => import('./views/ui/LearningManagement/Modules/index'))
const TrainingDashboard = React.lazy(() => import('./views/ui/TrainingManagement/Programs/index'))
const TrainingShedule = React.lazy(() => import('./views/ui/TrainingManagement/Schedule/index'))
const TalentManagement = React.lazy(() => import('./views/ui/TalentManagement/index'))
const BudgetReports = React.lazy(() => import('./views/ui/BudgetManagement/index'))
const TrainingEngagement = React.lazy(() => import('./views/ui/TrainingEngagement/index'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
    { path: '/', exact: true, name: 'Home' },

    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/dashboardtest', name: 'Dashboard', element: Landingpage },
    { path: '/crud', name: 'Announcement', element: Announcement },
    { path: '/ui/LearningManagement/index', name: 'LMS', element: LMS },
    { path: '/ui/LearningManagement/Modules/:moduleId', name: 'Module', element: ModuleDetails },
    {
        path: '/ui/TrainingManagement/Programs',
        name: 'TrainingDashboard',
        element: TrainingDashboard,
    },
    {
        path: '/ui/TrainingManagement/Schedule',
        name: 'TrainingDashboard',
        element: TrainingShedule,
    },
    { path: '/ui/TalentManagement', name: 'TalentManagement', element: TalentManagement },
    { path: '/ui/BudgetManagement', name: 'BudgetReports', element: BudgetReports },
    { path: '/ui/TrainingEngagement', name: 'TrainingEngagement', element: TrainingEngagement },
    { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
