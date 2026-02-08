import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { PageUrls } from './constants/pageUrls'
const PrivateAdminRoutes = lazy(() => import('./PrivateAdminRoutes'))
const PrivateRoutes = lazy(() => import('./PrivateRoutes'))
const PublicRoutes = lazy(() => import('./PublicRoutes'))
const PermissionsPage = lazy(
  () => import('./screens/admin/components/Permissions')
)
const Settings = lazy(() => import('./screens/admin/components/settings'))
const Users = lazy(() => import('./screens/admin/components/Users'))
const EditFile = lazy(() => import('./screens/main/edit-file'))
const SingleFile = lazy(() => import('./screens/main/single-file'))
const AddFile = lazy(() => import('./screens/main/add-file'))
const Tasks = lazy(() => import('./screens/main/tasks'))
const Files = lazy(() => import('./screens/main/files'))
const Adviser = lazy(() => import('./screens/main/adviser'))
const HomePage = lazy(() => import('./screens/main/home'))
const LoginPage = lazy(() => import('./screens/Authentication'))

export const routes: RouteObject[] = [
  {
    path: PageUrls.main.home,
    element: <PrivateRoutes page={<HomePage />} />,
  },
  {
    path: PageUrls.main.addFile,
    element: <PrivateRoutes page={<AddFile />} />,
  },
  {
    path: PageUrls.main.files,
    element: <PrivateRoutes page={<Files />} />,
  },
  {
    path: `${PageUrls.main.files}/:id`,
    element: <PrivateRoutes page={<SingleFile />} />,
  },
  {
    path: `${PageUrls.main.editFile}/:id`,
    element: <PrivateRoutes page={<EditFile />} />,
  },
  {
    path: PageUrls.main.adviser,
    element: <PrivateRoutes page={<Adviser />} />,
  },
  {
    path: `${PageUrls.main.tasks}/:id`,
    element: <PrivateRoutes page={<Tasks />} />,
  },
  {
    path: `${PageUrls.main.tasks}`,
    element: <PrivateRoutes page={<Tasks />} />,
  },

  // admin routes
  {
    path: PageUrls.Admin.settings,
    element: <PrivateAdminRoutes page={<Settings />} />,
  },
  {
    path: PageUrls.Admin.adviser,
    element: <PrivateAdminRoutes page={<Users />} />,
  },
  {
    path: PageUrls.Admin.permissions,
    element: <PrivateAdminRoutes page={<PermissionsPage />} />,
  },
  // {
  //   path: PageUrls.Admin.addForm,
  //   element: <PrivateAdminRoutes page={<AddForm />} />,
  // },
  {
    path: PageUrls.Authentication.auth,
    element: <PublicRoutes page={<LoginPage />} />,
  },
]
