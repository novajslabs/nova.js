import { useEffect, useState } from "react"

export const useSearchParams = ( url = location.search, opt = { unique: true } ) => {
  const _urlSearch = new URL(url)
  const [ params, setParams ] = useState( () => Object.fromEntries( _urlSearch.searchParams.entries() ) );

  useEffect( () => {
    const len = Object.values(params).length
    if( !opt || opt.unique || len === _urlSearch.searchParams?.size ) return;
    for( const [key, value] of _urlSearch.searchParams ){
      if( value === params?.[key] ) continue;
      if( Array.isArray(params?.[key]) && Array.from(params?.[key]).includes(value) ) continue;
      setParams( { ...params, [key]: [ ...params?.[key], value] } )
    }
  }, [] )

  return params;
}
