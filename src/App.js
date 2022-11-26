import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { reloadAction } from "./contexts/actions";
import store from "./contexts/store";
import Login from "./modules/auth/Login";
import PrivateRoute from "./modules/auth/PrivateRoute";
import Home from "./modules/common/Home";
import Layout from "./modules/common/Layout";
import UserMessage from "./modules/common/UserMessage";
import DocList from "./modules/management/DocList";
import ManagerAdd from "./modules/management/ManagerAdd";
import TicketDetail from "./modules/management/TicketDetail";
import TicketList from "./modules/management/TicketList";
import TicketNew from "./modules/management/TicketNew";
import PurchaseEdit from "./modules/purchases/PurchaseEdit";
import PurchaseList from "./modules/purchases/PurchaseList";
import SopiEdit from "./modules/solicitude/SopiEdit";
import SopiList from "./modules/solicitude/SopiList";
import SopiNew from "./modules/solicitude/SopiNew";

function App() {

  const dispatch = useDispatch()

  dispatch(reloadAction())
  useEffect(() => {
  },[])


  return (
 

      <div className="">
        <UserMessage/>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<Layout/>}>
            <Route path="/sopis" element={<PrivateRoute />}>
              <Route path="" element={<SopiList />}></Route>
              <Route path="nueva" element={<PrivateRoute requiredPermission={'SOPI_CREAR'}><SopiNew /></PrivateRoute>}></Route>
              <Route path=":sopiId" element={<SopiEdit />}></Route>
            </Route>
            <Route path="/compras" element={<PrivateRoute/>}>
              <Route path="" element={<PurchaseList/>}/>
              <Route path="tickets/crear" element={<TicketNew/>}/>
              <Route path=":purchaseId/gestores/añadir" element={<ManagerAdd/>}/>
              <Route path="documentos/:purchaseId" element={<DocList/>}/>
              <Route path=":purchaseId/tickets" element={<TicketList/>}/>
              <Route path=":purchaseId" element={<PurchaseEdit/>}/>
            </Route>
            <Route path="/tickets">
              <Route path="" element={<TicketList/>}/>
              <Route path=":ticketId" element={<TicketDetail/>}/>

            </Route>
            <Route path="*" element={<Home />}></Route>
          </Route>
        </Routes>
      </div>

  );
}

export default App;
