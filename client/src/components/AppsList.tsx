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


  const apps = [];
  const [appList, setAppList] = useState({});
  let navigate = useNavigate();
 
  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    navigate('/home/manifests');
  }

  //grab the app lists and display
  useEffect(():void => {
    fetch('http://localhost:3000/api/apps')
      .then((data: Response) => data.json())
      .then((data) => {
        //they are objects with two elements, name and uid
        const stateObj: Data  = {};
        for (const app of data) {
          stateObj[app.name] = app;
          apps.push(
            <div>
              <h2>{app.name}</h2>
              <button>Click for details</button>
            </div>
          )
        }
      })
  }, [])
  
  return (
    <div>
      <h1>This is AppsList</h1>
      <section className="container">

      </section>
      <button onClick={(e)=>handleClick(e)}>Click me to go to manifests!</button>
    </div>
  )
}


export default AppsList