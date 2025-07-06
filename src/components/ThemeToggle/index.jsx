import React, { useEffect, useState } from 'react'
import "./ThemeToggle.css"
import Toggle from 'react-toggle'
import { useMediaQuery } from 'react-responsive'
import "react-toggle/style.css"

const ThemeToggle = () => {
    useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)",
        },
        undefined,
        preferDark=>{
            setIsDark(preferDark)
        }
    )
    const storageKey = "theme"
    const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem(storageKey)));
    useEffect(()=>{
        if (isDark){
            document.firstElementChild
            .setAttribute('data-theme', 'dark');
            localStorage.setItem(storageKey,JSON.stringify(true));
            return;
        }
        else{
            document.firstElementChild
            .setAttribute('data-theme','light');
            return;
        }
    },[isDark])

  return (
    <div className='theme__toggle__container'>
        <Toggle
        checked={isDark}
        onChange={(event)=>setIsDark(event.target.checked)}
        icons={false}
        />
    </div>
  )
}

export default ThemeToggle