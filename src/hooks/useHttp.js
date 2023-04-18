import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (configRequest, applyData, takeError = (error) => {}) => {
      setIsLoading(true);
      setError(null);

      let urlBase = "http://localhost:8081";

      //Agrego Token
      let headers = { ...configRequest.headers };
      if (configRequest.token) {
        headers = {
          ...headers,
          Authorization: "Bearer " + configRequest.token,
        };
      }

      let err;
      try {
        const response = await fetch(urlBase + configRequest.endpoint, {
          method: configRequest.method ? configRequest.method : "GET",
          headers: headers,
          body: configRequest.body ? JSON.stringify(configRequest.body) : null,
        });

        if (!response.ok) {
          console.log("response not ok", response);
          const errorResponse = await response.json();

          err = {
            type: errorResponse.statusText,
            code: errorResponse.status,
            message: errorResponse.message ?? errorResponse.statusText,
          };

          setError(err);

          return; //caputo el error en el componente
        }

        const data = await response.json();
        applyData(data);
      } catch (error) {
        console.log("catch error", error);
        if (!err) {
          err = {
            type: "Error",
            code: 0,
            message: error.message,
          };
        }
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
