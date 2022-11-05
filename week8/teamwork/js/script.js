function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener("DOMContentLoaded", () => {
    const ramdom = getRandomInt(1, 452)
    fetchData(ramdom)
})
document.addEventListener("DOMContentLoaded", () => {
    const ramdom = getRandomInt(1, 452)
    fetchData2(ramdom)
})

const fetchData = async (id) => {
    try {
        console.log(id)
        
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        
        console.log(data)

        const pokemon = {
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            imgJuego: data.sprites.front_default,
            imgCvg: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            experience: data.base_experience,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            especial: data.stats[3].base_stat,
            abilities: data.abilities[0].ability.name,
        }

        pintarCard(pokemon)
    
    } catch (error) {
        console.log(error)
    }
} 

const pintarCard = pokemon => {
    const flex = document.querySelector('.flex')
    const template = document.getElementById('card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.imgCvg)
    //clone.querySelector('.card-body-img').setAttribute('src', pokemon.imgJuego)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp}hp</span>`
    clone.querySelector('.card-body-text').textContent = pokemon.experience + ' exp'
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.attack + 'K'
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial + 'K'
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa + 'K'
    clone.querySelector('.card-back-text').innerHTML = `${pokemon.abilities }`

    fragment.appendChild(clone)
    flex.appendChild(fragment)
}

const fetchData2 = async (id) => {
    try {
        console.log(id)
        
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        
        console.log(data)

        const pokemon = {
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            imgJuego: data.sprites.front_default,
            imgCvg: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            experience: data.base_experience,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            especial: data.stats[3].base_stat,
            abilities: data.abilities[0].ability.name,

        }

        pintarCard2(pokemon)
    
    } catch (error) {
        console.log(error)
    }
} 

const pintarCard2 = pokemon => {
    const flex = document.querySelector('.flex')
    const template = document.getElementById('card1').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.getElementById('cardbodyimg').setAttribute('src', pokemon.imgCvg)
    //clone.querySelector('.card-body-img').setAttribute('src', pokemon.imgJuego)
    clone.getElementById('cardbodytitle').innerHTML = `${pokemon.nombre} <span>${pokemon.hp}hp</span>`
    clone.getElementById('cardbodytext').textContent = pokemon.experience + ' exp'
    clone.querySelectorAll('.card-footer-social1 h3')[0].textContent = pokemon.attack + 'K'
    clone.querySelectorAll('.card-footer-social1 h3')[1].textContent = pokemon.especial + 'K'
    clone.querySelectorAll('.card-footer-social1 h3')[2].textContent = pokemon.defensa + 'K'
    clone.querySelector('.card-back-text').innerHTML = `${pokemon.abilities }`

    fragment.appendChild(clone)
    flex.appendChild(fragment)
}


function refreshPage(){
    window.location.reload();
} 




// $('.flip').flip({
//     trigger: 'click'
// });