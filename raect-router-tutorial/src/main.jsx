import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
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
  loader as contactLoader,
  action as contactAction,
} from './routes/contact'
import EditContact, {
  action as editAction,
} from "./routes/edit";
import {
  action as deleteAction,
 } from "./routes/destroy";
import Index from './routes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path="/"
      element={<Root/>}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage/>}
    >
      <Route errorElement={<ErrorPage/>}>
        <Route
          index
          element={<Index></Index>}
        />
        <Route
          path="contacts/:contactId"
          element={<Contact/>}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element= {<EditContact/>}
          action={editAction}
          loader={contactLoader}
          ></Route>
        <Route
          path="contacts/:contactId/destroy"
          action={deleteAction}
          errorElement={<div>Oops! There was an error</div>}
        ></Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
