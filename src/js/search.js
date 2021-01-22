import { input, result_list, fragment, favorites__list, repos, cash_favorites, get_repos } from './data_for_search'



function add_item_to_favorites( el_index ) {

  if ( cash_favorites.includes( repos[ el_index ].url ) ) {
    alert( '!this repo already in favorites!' )
    input.value = ''
    while ( result_list.firstChild ) {
      result_list.removeChild( result_list.firstChild );
    }

    return
  }

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

  cash_favorites.push( repos[ el_index ].url )

  favorite_item__content.appendChild( favorite_item__p_name )
  favorite_item__content.appendChild( favorite_item__p_owner )
  favorite_item__content.appendChild( favorite_item__p_stars )

  favorite_item.appendChild( favorite_item__content )
  favorite_item.appendChild( favorite_item__delete_button )
  favorite_item.dataset.url = repos[ el_index ].url;

  favorites__list.prepend( favorite_item )

  input.value = ''
  while ( result_list.firstChild ) {
    result_list.removeChild( result_list.firstChild );
  }
}

function delete_from_favorites( e ) {

  let del_item = e.target.parentNode;

  if ( del_item.className === 'favorites__item' ) {

    let data_url = del_item.getAttribute( 'data-url' );

    cash_favorites.map( ( item, index ) => {
      if ( item === data_url ) {
        delete cash_favorites[ index ];
      }
    } )

    del_item.remove()

  }

}

input.addEventListener( 'keyup', () => get_repos( ( repos ) => {
  repos.forEach( ( repo, index ) => {
    let result_item = document.createElement( 'li' );
    result_item.classList.add( 'search__result-item' )
    result_item.textContent = repo.name;
    result_item.dataset.index = index
    result_item.dataset.url = repo.url

    fragment.appendChild( result_item )
  } )
  result_list.appendChild( fragment )
}, input.value ) )

result_list.addEventListener( 'click', ( e ) => {
  let el_index = e.target.getAttribute( 'data-index' );
  add_item_to_favorites( el_index )
  favorites__list.addEventListener( 'click', ( e ) => {
    delete_from_favorites( e )
  } )
} )











