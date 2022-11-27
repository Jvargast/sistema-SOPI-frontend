import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

export const useCheckPermission = (permission) => {

    const [hasPermission, setHasPermission] = useState(false);

    const user = useSelector(store => store.authReducer);

    useEffect(() => {
        if (user && user.permissions) {
            setHasPermission(user.permissions.find(p => p.name == permission));
        }
    }, [user, user.permissions])

    return hasPermission;

}


export const useCheckAnyPermission = (permissionList) => {

    const [hasPermission, setHasPermission] = useState(false);

    const user = useSelector(store => store.authReducer);

    useEffect(() => {
        if (user.permissions) {
            console.log(user.permissions)
            for (let permission of permissionList) {
                if (user.permissions.find(p => p.name == permission)) {
                    setHasPermission(true);
                    console.log('asdjalsdkjalskdjalskdjlk')
                    break;
                }
            }
        }

    }, [user])

    return hasPermission;

}