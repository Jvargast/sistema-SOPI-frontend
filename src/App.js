import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import store from "./contexts/store";
import Login from "./modules/auth/Login";
import PrivateRoute from "./modules/auth/PrivateRoute";
import Home from "./modules/common/Home";
import Layout from "./modules/common/Layout";
import DocList from "./modules/management/DocList";
import PurchaseEdit from "./modules/purchases/PurchaseEdit";
import PurchaseList from "./modules/purchases/PurchaseList";
import SopiEdit from "./modules/solicitude/SopiEdit";
import SopiList from "./modules/solicitude/SopiList";
import SopiNew from "./modules/solicitude/SopiNew";

function App() {


  return (
    <Provider store={store}>

      <div className="">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<Layout/>}>
            <Route path="/sopis" element={<PrivateRoute />}>
              <Route path="" element={<SopiList />}></Route>
              <Route path="nueva" element={<SopiNew />}></Route>
              <Route path=":sopiId" element={<SopiEdit />}></Route>
            </Route>
            <Route path="/compras" element={<PrivateRoute/>}>
              <Route path="" element={<PurchaseList/>}/>
              <Route path="documentos/:purchaseId" element={<DocList/>}/>
              <Route path=":purchaseId" element={<PurchaseEdit/>}/>
            </Route>
            <Route path="*" element={<Home />}></Route>
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
