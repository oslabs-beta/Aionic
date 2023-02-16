import { useNavigate } from "react-router";
import { MouseEvent, useEffect, useRef, useState } from "react";

function AppsList() {

  interface dbObj {
    name: string,
    uid: string
  }

  interface Data {
    [key: string]: dbObj;
  }


  
  const [appList, setAppList] = useState({});
  const [apps, setApps] = useState([]);
  const [gitUser, setGitUser] = useState('');
  const appListRef = useRef({})
  let navigate = useNavigate();
 
  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      console.log(appList.curr)
      let appName = e.target.parentNode.childNodes[0].innerText;
      // console.log('applistref on button click is: ', appListRef);
      navigate('/home/manifests', { state: { query: appListRef.curr[appName] } });
  }

  //grab the app lists and display
  useEffect((): void => {
    const appsArr: any = [];

      //add username here not in parent
    fetch('http://localhost:3000/api/apps?' + new URLSearchParams({
      user: 'aribengiyat'
    }))
      .then((data: Response) => data.json())
      .then((data) => {
        //they are objects with two elements, name and uid
        const stateObj: Data  = {};
        for (const app of data) {
          stateObj[app.name] = app;
          appsArr.push(
            <div>
              <h2>{`${app.name}`}</h2>
              <button onClick={(e) => handleClick(e)}>Click for details</button>
            </div>
          )
        }
        setAppList(stateObj);
        setApps(appsArr);
      })
  }, [])

  useEffect(() => {
    // console.log('appList updated is: ', appList);
    appListRef.curr = appList;
    // console.log('applistref is: ', appListRef);
  },[appList])

  
  return (
    <div>
      <h1>This is AppsList</h1>
      <section className="container">
        {apps}
      </section>
    </div>
  )
}


export default AppsList