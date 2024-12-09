// Version 2024.1209.1
// 2024.1209.1: Initial version
import './index.css'
import axios from 'axios';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomeLayout, Landing, Error, Roles, SingleRole } from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useAppContext } from './context'
import { singleRoleLoader } from './pages/SingleRole';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/roles',
        element: <Roles />,
      },
      {
        path: '/roles/:routeId',
        element: <SingleRole />,
        loader: singleRoleLoader,
      }
    ]
  },
  {
    path: '/about',
    element: (
      <div>
        <h2>about page</h2>
      </div>
    ),
  },
]);

function App() {
  const { user, setUser } = useAppContext();
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_IDM_URL}/whoami`);
        //console.log('fetchUser, data=', data);
        if (data.status) {
          setUser(data.data);
        } else {
          setUser({ username: 'anonymous' });
        }
      } catch (error) {
        console.error('App.jsx, fetchUser', error);
      }
    }
    fetchUser();
  }, []);

  //console.log('username', user.username);
  console.log('user', user);
  //console.log('allCookies', allCookies); // liefert ein leeres Objekt - weil die Cookies auf Port 8080 sind (React aber auf 5173 "hört")
  return (
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>)


}

export default App
