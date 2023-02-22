import { useEffect, useState } from "react";

function clock() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
}

export const useGetTime = () => {
    const [hour, setHour] = useState(clock());
    
    useEffect(() => {
        const interval = setInterval(() => {
            setHour(clock());
        }, 30000);
    
        return () => clearInterval(interval);
    }, []);
    
    return hour;
}