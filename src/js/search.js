import { debounce, input, result_list, fragment } from './data'



export function get_repos( cb, search_text ) {

  const xhr = new XMLHttpRequest()

  if ( search_text === '' ) {
    while ( result_list.firstChild ) {
      result_list.removeChild( result_list.firstChild );
    }

  }
  else {

    while ( result_list.firstChild ) {
      result_list.removeChild( result_list.firstChild );
    }

    xhr.open( 'get', `https://api.github.com/search/repositories?q=${ search_text }&per_page=5&sort=stars&order=desc` )

    xhr.addEventListener( 'load', () => {
      const response = JSON.parse( xhr.responseText )

      let repos = response.items.map( ( item ) => {
        return { name: item.name, owner: item.owner.login, stars: item.stargazers_count }
      } )

      cb( repos )

    } )

    xhr.addEventListener( 'error', ( e ) => {
      cb( [ { name: 'no results', owner: 'no results', stars: 'no results' } ] )
    } )

    xhr.send()
  }

}

get_repos = debounce( get_repos, 500 )

input.addEventListener( 'keyup', () => get_repos( ( repos ) => {
  console.log( repos )

  repos.forEach( repo => {
    let result_item = document.createElement( 'li' );
    result_item.classList.add( 'search__result-item' )
    result_item.textContent = repo.name;
    fragment.appendChild( result_item )
  } )
  result_list.appendChild( fragment )
}, input.value ) )













