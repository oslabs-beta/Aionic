import { useNavigate } from 'react-router';
import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import { GitUserContext } from './Protected';

function AppsList() {
  interface dbObj {
    name: string;
    uid: string;
  }

  interface Data {
    [key: string]: dbObj;
  }

  const [appList, setAppList] = useState({});
  const [apps, setApps] = useState([]);
  const appListRef = useRef({});
  let navigate = useNavigate();
  const gitUser = useContext(GitUserContext);

  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    let appName = e.target.parentNode.childNodes[0].innerText;
    navigate('/home/manifests', { state: { query: appListRef.curr[appName] } });
  };

  //grab the app lists and display
  useEffect((): void => {
    const appsArr: any = [];

    //add username here not in parent
    fetch(
      'http://localhost:3000/api/apps?' +
        new URLSearchParams({
          user: gitUser,
        })
    )
      .then((data: Response) => data.json())
      .then((data) => {
        //they are objects with two elements, name and uid
        const stateObj: Data = {};
        for (const app of data) {
          stateObj[app.name] = app;
          stateObj[app.name].repo = app.source.repoURL;
          appsArr.push(
            <div className='border flex flex-col m-2 items-center space-y-3 bg-white drop-shadow rounded-md w-1/4 p-10 hover:shadow-lg'>
              <h2 className='text-center text-2xl text-gray-900'>{`${app.name}`}</h2>
              <button
                className='rounded-md bg-orange-500 w-20 hover:bg-orange-600 px-4 py-1 text-white'
                onClick={(e) => handleClick(e)}
              >
                View
              </button>
            </div>
          );
        }
        setAppList(stateObj);
        setApps(appsArr);
      })
      .catch((err) => console.log('error occured fetching apps: '));
  }, []);

  useEffect(() => {
    appListRef.curr = appList;
  }, [appList]);

  return (
    <div className='flex flex-col place-content-center items-center'>
      <h1 className='text-lg text-center my-7'>Select an app to view</h1>
      <section className='container flex flex-wrap justify-center'>
        {apps}
      </section>
    </div>
  );
}

export default AppsList;
