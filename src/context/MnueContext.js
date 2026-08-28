import { createContext, useEffect, useState } from "react";

export const Menu = createContext("");


export default function MenuContext({children})
{
    const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 768);

    useEffect(() => {
        const desktopQuery = window.matchMedia("(min-width: 768px)");
        const handleBreakpointChange = (event) => {
            setIsOpen(event.matches);
        };

        desktopQuery.addEventListener("change", handleBreakpointChange);
        return () => desktopQuery.removeEventListener("change", handleBreakpointChange);
    }, []);
return(
<Menu.Provider value={{isOpen ,setIsOpen}}>{children}</Menu.Provider>);
}
