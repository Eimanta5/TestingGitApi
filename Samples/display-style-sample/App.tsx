
import React, { useEffect, useState }  from "react";
import { AuthorizationClient } from "@bentley/itwinjs-sandbox";
import DisplayStylesUI from "./code/DisplayStylesUI";

function App() {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    AuthorizationClient.initializeOidc().then(() => setAuthReady(true));
  }, []);

  if (!authReady)
    return (<></>);

  return (
    <>
      <DisplayStylesUI></DisplayStylesUI>
    </>
  );
}

export default App;
