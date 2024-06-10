import { useEffect, useState } from "react";

export const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)

    const httpConfig = (data, method) => {
        if (method === "POST") {
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



    useEffect(() => {
        const httpRequest = async () => {

            if (method === "POST") {

                try {
                    let fetchOptions = [url, config];

                    const res = await fetch(...fetchOptions)

                    const textResponse = await res.text();

                    sessionStorage.setItem("token", textResponse.replace(/'/g, '"'));

                    

                    setResponse({
                        status: res.status,
                        data: textResponse.message || textResponse
                    });

                } catch (error) {
                    setError(error)
                }

            }

        }

        httpRequest();
    }, [config])

    return { data, httpConfig, response, error };
}