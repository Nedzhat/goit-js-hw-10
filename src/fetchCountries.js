export function fetchCountries(dataCountry) {
  return fetch(`https://restcountries.com/v3.1/name/${dataCountry}?fields=name,capital,population,flags,languages
`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
