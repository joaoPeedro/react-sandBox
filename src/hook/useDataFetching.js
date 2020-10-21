import { useState, useEffect, useRef } from "react";
import axios from "axios";

const useDataFetching = (endpoint = null, params = "") => {
  // ter referência ao componente para caso o seu useRef ser false
  // não correr o setState
  const isCurrent = useRef(true);
  const [state, setState] = useState({ data: null, dataState: "PENDING" });

  const callYourMom = (endpoint, params) => {
    if (!endpoint) return;
    let cancel;

    axios({
      method: "GET",
      url: endpoint, // string
      params: params, // {}
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        if (isCurrent.current) {
          setState({ data: res.data, dataState: "FULFILLED" });
        }
      })
      .catch((err) => {
        if (isCurrent.current) {
          console.log(err);
          if (axios.isCancel(err)) return;
          setState({ data: null, dataState: "REJECTED" });
        }
      });

    return () => cancel();
  };

  useEffect(() => {
    callYourMom(endpoint, params);
    return () => {
      // called when the component is going to unmount
      isCurrent.current = false;
    };
  }, []);

  return [
    state,
    (newUrl = endpoint, newParams = params) => {
      setState((state) => ({
        data: null,
        dataState: "PENDING",
      }));
      callYourMom(newUrl, newParams);
    },
  ];
};

export default useDataFetching;
