import { debounce, input } from './data'



export function get_repos( cb, search_text ) {
  const xhr = new XMLHttpRequest()

  xhr.open( 'get', `https://api.github.com/search/repositories?q=${ search_text }&per_page=5&sort=stars&order=desc` )
  xhr.addEventListener( 'load', () => {
    const response = JSON.parse( xhr.responseText )
    let search_res = response.items.map( ( { name, owner, stargazers_count } ) => {
      return { name: name, owner: owner.login, stars: stargazers_count }
    } )

    cb( search_res )
  } )
  xhr.addEventListener( 'error', ( e ) => console.log( 'error', e ) )
  xhr.send()
}

get_repos = debounce( get_repos, 500 )
input.addEventListener( 'keyup', () => get_repos( ( res ) => console.log( res ), input.value ) )













