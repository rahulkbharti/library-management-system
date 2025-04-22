import { useContext } from "react";

const authContext = useContext({
    userdata: {
        name: "",
        user_id: "",
    }
});

const ContextProvider = () => {
    const context = useContext(authContext);
    return (
        <ContextProvider context={context} />
    )
}