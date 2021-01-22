import { debounce, input, result_list, fragment, favorites__list } from './data'


let repos = [];

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

      repos = response.items.map( ( item ) => {
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
  repos.forEach( ( repo, index ) => {
    let result_item = document.createElement( 'li' );
    result_item.classList.add( 'search__result-item' )
    result_item.textContent = repo.name;
    result_item.dataset.index = index
    fragment.appendChild( result_item )
  } )
  result_list.appendChild( fragment )
}, input.value ) )

function add_item_to_favorites( el_index ) {
  let favorite_item = document.createElement( 'li' )
  let favorite_item__content = document.createElement( 'div' )
  let favorite_item__p_name = document.createElement( 'p' )
  let favorite_item__p_owner = document.createElement( 'p' )
  let favorite_item__p_stars = document.createElement( 'p' )
  let favorite_item__delete_button = document.createElement( 'button' )

  favorite_item.classList.add( 'favorites__item' )
  favorite_item__content.classList.add( 'favorites__content' )
  favorite_item__delete_button.classList.add( 'favorites__close-button' )
  favorite_item__delete_button.classList.add( 'close-button' )

  favorite_item__p_name.textContent = `Name: ${ repos[ el_index ].name }`
  favorite_item__p_owner.textContent = `Owner: ${ repos[ el_index ].owner }`
  favorite_item__p_stars.textContent = `Stars: ${ repos[ el_index ].stars }`

  favorite_item__content.appendChild( favorite_item__p_name )
  favorite_item__content.appendChild( favorite_item__p_owner )
  favorite_item__content.appendChild( favorite_item__p_stars )

  favorite_item.appendChild( favorite_item__content )
  favorite_item.appendChild( favorite_item__delete_button )

  favorites__list.prepend( favorite_item )

  input.value = ''
  while ( result_list.firstChild ) {
    result_list.removeChild( result_list.firstChild );
  }
}

function delete_from_favorites( e ) {
  let del_item = e.target.parentNode;
  if ( del_item.className === 'favorites__item' ) {
    del_item.remove()
  }

}

result_list.addEventListener( 'click', ( e ) => {
  let el_index = e.target.getAttribute( 'data-index' );
  add_item_to_favorites( el_index )
  favorites__list.addEventListener( 'click', ( e ) => {
    delete_from_favorites( e )
  } )
} )











