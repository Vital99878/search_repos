export const input = document.querySelector( '.search__input' )
export const result_list = document.querySelector( '.search__result-list' )
export const favorites__list = document.querySelector( '.favorites__list' )
export const fragment = document.createDocumentFragment();

export let cash_favorites = []
export let repos = [];

export function get_repos( cb_results, search_text ) {

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

    xhr.open( 'get', `https://api.github.com/search/repositories?q=${search_text }&per_page=5&sort=stars&order=desc` )
    console.log(search_text)

    xhr.addEventListener( 'load', () => {
      const response = JSON.parse( xhr.responseText )

      repos = response.items.map( ( item ) => {
        return { name: item.name, owner: item.owner.login, stars: item.stargazers_count, url: item.url }
      } )

      cb_results( repos )

    } )

    xhr.addEventListener( 'error', ( e ) => {
      cb( [ { name: 'no results', owner: 'no results', stars: 'no results' } ] )
    } )

    xhr.send()
  }

}
const debounce = ( fn, debounceTime ) => {
  let timeout;

  return function() {
    let fn_call = () => {fn.apply( this, arguments )}
    clearTimeout( timeout )
    timeout = setTimeout( fn_call, debounceTime )
  }

};
get_repos = debounce( get_repos, 500 )









