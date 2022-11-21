import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import store from "./contexts/store";
import Login from "./modules/auth/Login";
import PrivateRoute from "./modules/auth/PrivateRoute";
import Home from "./modules/common/Home";
import SopiList from "./modules/solicitude/SopiList";

function App() {


  return (
    <Provider store={store}>

      <div className="text-3xl font-bold underline">
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/sopis" element={<PrivateRoute/>}>

            <Route path="" element={<SopiList/>}></Route>
            <Route path=":sopiId" element={<SopiList/>}></Route>
          </Route>
          <Route path="*" element={<Home/>}></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
