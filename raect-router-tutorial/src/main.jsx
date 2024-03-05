import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'
import ErrorPage from "./error-page";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import 
  Contact,
{
  Loader as contactLoader,
} from './routes/contact'
import EditContact from "./routes/edit";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage/>,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element:<Contact/>,
        loader: contactLoader,
      },
      {
        path:"contacts/:contactId/edit",
        element:<EditContact/>,
        loader:contactLoader,
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
