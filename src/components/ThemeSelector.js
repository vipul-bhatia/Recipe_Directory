import './ThemeSelector.css';
import { useTheme } from '../hooks/useTheme';
import React from 'react'
import modeIcon from '../assets/mode-icon.svg'

export default function ThemeSelector() {

    const {changeColor, changeMode , mode} = useTheme()
    const themeColors =['#58249c', '#f5b041', '#f54242', '#f542f5', '#42f5f5', '#42f542']
    const toggleMode = ()=>{
        changeMode(mode === 'dark' ? 'light': 'dark')
    }
    console.log(mode)
  return (
    <div className='theme-selector'>
        <div className='mode-toggle'>
            <img 
            onClick={toggleMode}
            src={modeIcon} 
            alt= "dark/light toggle icon"
            style={{filter: mode === 'dark' ? 'invert(100%)': 'invert(20%)'}}
            />
        </div>
      <div className='theme-buttons'>
            {themeColors.map(color => (
                <div
                key={color}
                onClick={() => changeColor(color)}
                style={{ background: color}}
                />
            ))}
      </div>
    </div>
  )
}
