export let input = document.querySelector( '.search__input' )
export const debounce = ( fn, debounceTime ) => {
  let timeout;

  return function () {
    let fn_call = () => {fn.apply (this, arguments)}
    clearTimeout (timeout)
    timeout = setTimeout (fn_call, debounceTime)
  }

};











