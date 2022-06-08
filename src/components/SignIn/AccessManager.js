import { useState } from "react";

import AccessContext from "../../contexts/access-context";

const AccessManager = (props) => {
    const [currentUser, setCurrentUser] = useState({ id: null, password: null });

    const signUserIn = (id, password) => {
        if (id && password) {
            setCurrentUser({ id, password });
        };
    };

    const signUserOff = () => {
        setCurrentUser({ id: null, password: null });
    };

    return (
        <AccessContext.Provider value={{ currentUser: currentUser, signUserIn, signUserOff }}>
            {props.children}
        </AccessContext.Provider>
    );
};

export default AccessManager;
