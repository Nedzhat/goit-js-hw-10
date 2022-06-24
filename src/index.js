import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY));

function findCountry(e) {
  const dataCountryFull = e.target.value;
  const dataCountry = dataCountryFull.trim();
  if (dataCountry) {
    fetchCountries(dataCountry)
      .then(country => {
        if (country.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          clearMarkupCountry();
        } else if (country.length >= 2 && country.length <= 10) {
          createMarkupSomeCountry(country);
        } else if (country.length < 2) {
          createMarkupOneCountry(country);
        }
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        clearMarkupCountry();
      });
  } else {
    clearMarkupCountry();
  }
}

function createMarkupSomeCountry(country) {
  countryInfoRef.innerHTML = '';
  let data = '';
  for (let i = 0; i < country.length; i += 1) {
    data += `<li class="country-item">
      <div class="wrapper-country"><img
        src="${country[i].flags.png}"
        alt=""
        width="40"
        height="30"
        class="country-img"
      />
      <p class="country-desc">${country[i].name.official}</p></div>
    </li>`;
  }
  countryListRef.innerHTML = data;
}

function createMarkupOneCountry(country) {
  countryListRef.innerHTML = '';
  const data = `
        <div class="wrapper-country">
          <img
            src="${country[0].flags.png}"
            alt=""
            width="40"
            height="30"
            class="country-img"
          />
          <p class="country-desc-alone">${country[0].name.official}</p>
        </div>
        <p class="country-desc-info">
          <span class="active">Capital:</span> ${country[0].capital}
        </p>
        <p class="country-desc-info">
          <span class="active">Population:</span> ${country[0].population}
        </p>
        <p class="country-desc-info">
          <span class="active">Languages:</span> ${Object.values(
            country[0].languages
          )}
        </p>`;

  countryInfoRef.innerHTML = data;
}

function clearMarkupCountry() {
  countryInfoRef.innerHTML = '';
  countryListRef.innerHTML = '';
}
