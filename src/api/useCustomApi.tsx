import { url } from "inspector";
import { useEffect, useState } from "react";

interface Props {
  name: string;
}

const useCustomApi = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<string>("");

  const fetchCountry = async (url: string) => {
    await fetch(`https://api.nationalize.io/?name=${url}`)
      .then((response) => {
        return response.json();
      })
      .then(function (data) {
        return fetch(
          `https://restcountries.com/v3.1/alpha/${data.country[0].country_id}`
        );
      })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setLoading(false);
        console.log(json[0].name.common);
        setData(() => json[0].name.common);
      })
      .catch((error) => {
        setError(true);
      });
  };

  return { fetchCountry, loading, data, error,setData };
};
export default useCustomApi;
