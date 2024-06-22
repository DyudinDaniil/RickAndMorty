const ROOT = document.querySelector('#root');
const SEARCH = document.querySelector('#search');
const NAV = document.querySelector('.nav__list');
let ACTIVE_PAGE = 1;


const render = async () => {
  const answer = await getData(ACTIVE_PAGE);
  rerender(answer);

  // answer.map(character => {
  //   const div = document.createElement('div');
  //   div.addEventListener('click', () => {
  //     localStorage.setItem('id', 1);
  //     window.location.href = `../card.html`;
  //   });
  //   div.className = 'character__card'
  //   div.innerHTML = `
  //     <h2 class='character__name'>${character.name}</h2>
  //     <img src="${character.image}" alt="profile picture">
  //     <p class='character__species'><span>Specie:</span>${character.species}</p>
  //     <p class='character__state'><span>State:</span>${character.status}</p>
  //     <p class='character__location'><span>Location:</span>${character.location.name}</p>
  //   `;
  //   ROOT.appendChild(div);
  // });
}

const rerender = (arr) => {
  ROOT.innerHTML = '';

  arr.map(character => {
    const div = document.createElement('div');
    div.className = 'character__card'
    div.addEventListener('click', () => {
      localStorage.setItem('id', character.id);
      window.location.href = `../card.html`;
    });
    div.innerHTML = `
      <h2 class='character__name'>${character.name}</h2>
      <img src="${character.image}" alt="profile picture">
      <p class='character__species'>${character.species}</p>
      <p class='character__state'>${character.status}</p>
      <p class='character__location'>${character.location.name}</p>
    `;
    ROOT.appendChild(div);
  });
}

const pageListRender = () => {
  NAV.innerHTML = '';
  for (let i = ACTIVE_PAGE - 2; i < ACTIVE_PAGE + 5; ++i) {
    if (i > 0 && i < 43) {
      const li = document.createElement('li');
      li.className = 'nav__item';
      li.innerHTML = `<a href="#" class="nav__link" data-page="${i}">${i}</a>`;
      li.addEventListener('click', (e) => {
        ACTIVE_PAGE = +e.target.dataset.page;
        console.log(ACTIVE_PAGE);
        pageListRender();
        render();
      });
      NAV.appendChild(li);
    }
  }
}


const filterSearch = async () => {
  const answer = await getData();
  const filtered = answer.filter(character => {
    return character.name.toLowerCase().includes(SEARCH.value.toLowerCase());
  });

  rerender(filtered);
}

const getData = async () => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${ACTIVE_PAGE}`);
  const json = await response.json();
  const results = await json.results;
  return results;
}

// init
(() => {
  render();
  pageListRender();
})()