const searchInput = document.getElementById("search-input");
const resultsArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");

function requestApi(searchTerm) {
  const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((results) => displayResult(results))
    .catch((error) => console.error("Erro ao buscar artistas: ", error));
}

function displayResult(results) {
  if (!results || results.length === 0) {
    console.error("Nenhum resultado encontrado");
    return; // Sai da função se não houver resultados
  }

  resultPlaylist.classList.add("hidden");
  const artistName = document.getElementById("artist-name");
  const artistImage = document.getElementById("artist-img");

  if (!artistName || !artistImage) {
    console.error("Elementos HTML não encontrados");
    return;
  }

  results.forEach((element) => {
    console.log(element);
    artistName.innerText = element.name;
    artistImage.src = element.urlImg;
  });
  resultsArtist.classList.remove("hidden");
}

document.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultPlaylist.classList.remove("hidden");
    resultsArtist.classList.add("hidden");
    return;
  }
  requestApi(searchTerm);
});
