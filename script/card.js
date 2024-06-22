const ROOT = document.querySelector('#root');
const ID = localStorage.getItem('id');

const getData = async () => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${ID}`);
  const result = await response.json();
  return result;
}

const render = async () => {
  const character = await getData();
  ROOT.innerHTML = `
    <div class="card">
      <h2 class='character__name'>${character.name}</h2>
      <img src="${character.image}" alt="profile picture">
      <p class='character__species'>${character.species}</p>
      <p class='character__state'>${character.status}</p>
      <p class='character__location'>${character.location.name}</p>
    </div>
  `;
}

(() => {
  render();
})()