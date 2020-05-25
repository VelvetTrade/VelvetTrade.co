import { useEffect, useState, useRef } from "react";

export default function useSticky ( ) {
  const [ isSticky, setSicky ] = useState(false);
  const element = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      console.log(`Current Y = ${window.scrollY}, Top = ${element.current.getBoundingClientRect().top}, Bot = ${element.current.getBoundingClientRect().bottom}`);
      (window.scrollY >= element.current.getBoundingClientRect().top) 
      ? setSicky(true) 
      : setSicky (false)
    };
  
    // This function handle the scroll performance issue
    const debounce = (func, wait = 20, immediate = true) => {
      let timeOut
      return () => {
        let context = this,
          args = arguments;
          
        // function for delaying 
        const later = () => {
          timeOut = null
          if (!immediate) func.apply(context, args)
        }
  
        const callNow = immediate && !timeOut
        clearTimeout(timeOut)
        timeOut = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
      }
    }
    
    window.addEventListener("scroll", debounce(handleScroll))

    return function cleanup() {
      window.removeEventListener("scroll", () => handleScroll)
    }
  })

  return { isSticky, element }
}