const apiUrl = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username){
  const resp = await fetch(apiUrl + username)
  const respData = await resp.json()

  createUser(respData)
 getRepos(username)
}


function createUser(user){
   

   const cardHtml = `
  <div class="card">
   <div>
       <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
   </div>
   <div class="user-info">
       <h2>${user.name}</h2>
       <p>${user.bio}</p>
       <ul class="info">
           <li>${user.followers}<strong>Followers</strong></li>
           <li>${user.following}<strong>Following</strong></li>
           <li>${user.public_repos}<strong>Repos</strong></li>
       </ul>
       <h4>Repos :</h4>
       <div id="repos"></div>
   </div>
 </div>
 `;
   main.innerHTML = cardHtml
}

function addRepos(repos){
    const reposEl = document.getElementById('repos')

    repos
    .sort((a,b) => b.stargazers_count - a.stargazers_count)
    .slice(4,10).forEach((repo)=>{
        const repoEl = document.createElement('a')
        repoEl.classList.add('repos')

        repoEl.href = repo.html_url
        repoEl.target = '_blank'
        repoEl.innerText = repo.name

        reposEl.appendChild(repoEl)
    })
}


form.addEventListener('submit', e =>{
    e.preventDefault()

    const user = search.value 
        if(user){
            getUser(user)

            search.value = "";
        }
})