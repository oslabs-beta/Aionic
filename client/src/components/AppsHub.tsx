import { useState } from "react"
import AppsList from "./AppsList"
import TokenInput from "./TokenInput";

function AppsHub(props) {

  const [token, setToken] = useState('');

  if (!token) {
    return (
      <div>
        <TokenInput setToken={ setToken} />
      </div>
    )
  } else {
    return (
      <div>
        <h1>This is AppsHub</h1>
        <AppsList />
      </div>
    )
  }
}


export default AppsHub