import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Landingpage = React.lazy(() => import('./views/dashboardtest'))
const Announcement = React.lazy(() => import('./views/crud/crudAnnouncement'))
const LMS = React.lazy(() => import('./views/ui/LearningManagement/index'))
const ModuleDetails = React.lazy(() => import('./views/ui/LearningManagement/Modules/index'))
const Programs = React.lazy(() => import('./views/ui/LearningManagement/Programs/index'))
const TrainingShedule = React.lazy(() => import('./views/ui/TrainingManagement/Schedule/index'))
const TalentManagement = React.lazy(() => import('./views/ui/TalentManagement/index'))
const EmployeeManagement = React.lazy(() => import('./views/ui/EmployeeManagement/index'))
const AccessControl = React.lazy(() => import('./views/ui/EmployeeManagement/AccessControl/index'))
const BudgetReports = React.lazy(() => import('./views/ui/BudgetManagement/index'))
const TrainingEngagement = React.lazy(() => import('./views/ui/TrainingEngagement/index'))

//Integration
const IntegrationAdmin = React.lazy(() => import('./views/ui/Integration/Admin/index'))
const IntegrationHr1 = React.lazy(() => import('./views/ui/Integration/Hr1/index'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
    { path: '/', exact: true, name: 'Home' },

    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/dashboardtest', name: 'Dashboard', element: Landingpage },
    { path: '/crud', name: 'Announcement', element: Announcement },
    {
        path: '/ui/LearningManagement/Programs',
        name: 'Programs',
        element: Programs,
    },
    { path: '/ui/LearningManagement/index', name: 'LMS', element: LMS },
    { path: '/ui/LearningManagement/Modules/index', name: 'Fileviewer', element: ModuleDetails },
    {
        path: '/ui/TrainingManagement/Schedule',
        name: 'TrainingDashboard',
        element: TrainingShedule,
    },
    { path: '/ui/TalentManagement', name: 'TalentManagement', element: TalentManagement },
    { path: '/ui/EmployeeManagement', name: 'Employee', element: EmployeeManagement },
    {
        path: '/ui/EmployeeManagement/AccessControl',
        name: 'AccessControl',
        element: AccessControl,
    },
    { path: '/ui/BudgetManagement', name: 'BudgetReports', element: BudgetReports },
    { path: '/ui/TrainingEngagement', name: 'TrainingEngagement', element: TrainingEngagement },
    { path: '/widgets', name: 'Widgets', element: Widgets },

    //Integration
    { path: '/ui/Integration/Admin', name: 'IntegrationAdmin', element: IntegrationAdmin },
    { path: '/ui/Integration/Hr1', name: 'IntegrationHr1', element: IntegrationHr1 },
]

export default routes
