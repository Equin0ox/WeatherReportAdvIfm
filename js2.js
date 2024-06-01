const btnVyhledat = document.getElementById('btnVyhledat');
const vysledky = document.getElementById('vysledky');
const key = "731dc816c05f2cc493d37e183f2041ee"

function vytvorRadek(data) {
  const { name, main, wind, weather} = data;
  const radek = document.createElement('div');
  radek.classList.add('radek-pocasi');
  radek.innerHTML = `
      <h2>Počasí v ${name}</h2>
      <p>Teplota: ${main.temp} °C</p>
      <p>Popis: ${weather[0].description}</p>
      <p>Vlhkost: ${main.humidity}%</p>
      <p>Vítr: ${wind.speed} m/s (${wind.deg}°)</p>
      <button class="btn-odstranit">Odstranit</button>
  `;
  return radek;
}

btnVyhledat.addEventListener('click', async () => {
  const mesto = document.getElementById('mesto').value;

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${mesto}&appid=${key}&units=metric`);
    if (!response.ok) {
      throw new Error('Chyba při stahování dat');
    }
    const data = await response.json();
    const radekPocasi = vytvorRadek(data);
    vysledky.appendChild(radekPocasi);

    radekPocasi.querySelector('.btn-odstranit').addEventListener('click', () => {
      vysledky.removeChild(radekPocasi);
    });
  } catch (error) {
    console.error('Chyba:', error.message);
  }
});
