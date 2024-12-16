import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import BooksPage from './components/BooksPage';
import CategoryPage from './components/CategoryPage';
import AddCategory from './components/AddCategory';
import EditCategory from './components/EditCategory';
import EditBook from './components/EditBook';
import AddBook from './components/AddBook';

function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body/>,
      children: [
        {
          path: "/",
          element: <CategoryPage />
        },
        {
          path: "/addcategory",
          element: <AddCategory />
        },
        {
          path: "/editcategory/:catId",
          element: <EditCategory />
        },
        {
          path: "/books/:catId",
          element: <BooksPage /> 
        },
        {
          path: "/addbooks/:catId",
          element: <AddBook />
        },
        {
          path: "/editbooks/:bookId",
          element: <EditBook />
        },
      ]
    }
  ])

  return (
    <div className="">
      <RouterProvider router={appRouter}/>
    </div>
  );
}

export default App;
