import { useEffect, useState } from "react";

export const useFetch = (url) => {

    const [data,setData] = useState(null)

    const [config,setConfig] = useState(null)
    const [method,setMethod] = useState(null)

    const httpConfig = (data,method) => {
        if(method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
                
            })

            setMethod(method)
        }
    }



    useEffect(() =>{
        const httpRequest = async () =>{

            if(method === "POST"){

                let fetchOptions = [url,config];
        
                const response = await fetch(...fetchOptions)
                
                const res = await response.text();
        
                console.log(res);
                }
       
        }

        httpRequest();
    }, [config])
    
    return {data, httpConfig};
}