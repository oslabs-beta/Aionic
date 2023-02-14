import { useNavigate } from "react-router";
import { MouseEvent, useEffect, useState } from "react";

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
  let navigate = useNavigate();
 
  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    let appName = e.target.value;
    navigate(`/home/manifests?${appList.name}`);
  }

  //grab the app lists and display
  useEffect((): void => {
    const appsArr: any = [];

    fetch('http://localhost:3000/api/apps')
      .then((data: Response) => data.json())
      .then((data) => {
        console.log(data);
        //they are objects with two elements, name and uid
        const stateObj: Data  = {};
        for (const app of data) {
          stateObj[app.name] = app;
          appsArr.push(
            <div>
              <h2>{`${app.name}`}</h2>
              <button>Click for details</button>
            </div>
          )
        }
        setAppList(stateObj);
        setApps(appsArr);
      })
  }, [])

  
  return (
    <div>
      <h1>This is AppsList</h1>
      <section className="container">
        {apps}
      </section>
      <button onClick={(e)=>handleClick(e)}>Click me to go to manifests!</button>
    </div>
  )
}


export default AppsList