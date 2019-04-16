import React, { useRef } from 'react';

const Theme = () => {
  const defaultOption = useRef(null);
  const themeWrapper = useRef(null);
  const themeToggler = useRef(null);

  const toggleThemeDisplay = () => {
    themeWrapper.current.classList.toggle('active');

    if (themeWrapper.current.classList.contains('active')) {
      themeToggler.current.textContent = 'Close';
    } else {
      themeToggler.current.textContent = 'Theme';
    }
  };

  const handleThemeOption = (e) => {
    const el = e.target;
    const app = document.getElementById('app');
    app.className = '';
    app.classList.add(`theme--${el.value}`);

    toggleThemeDisplay();
  };

  return (
    <div 
        className="theme"
        ref={themeWrapper}
    >
      <button 
          className="theme-toggle" 
          onClick={toggleThemeDisplay}
          ref={themeToggler}
      >
      Theme
      </button>
       <div className="theme-chooser">
         <div> 
            <input 
                checked="checked"
                id="default"  
                name="theme-color" 
                onChange={handleThemeOption} 
                ref={defaultOption}
                type="radio" 
                value="default"
            />
             <label htmlFor="default">Default</label>
          </div>
         <div> 
            <input 
                id="blue" 
                name="theme-color" 
                onChange={handleThemeOption} 
                type="radio" 
                value="blue"
            />
             <label htmlFor="blue">Blue</label> 
        </div>
         <div> 
            <input 
                id="pink" 
                name="theme-color" 
                onChange={handleThemeOption} 
                type="radio" 
                value="pink"
            /> 
            <label htmlFor="pink">Pink</label> 
        </div>
         <div> 
            <input 
                id="yellow" 
                name="theme-color" 
                onChange={handleThemeOption} 
                type="radio" 
                value="yellow"
              /> 
            <label htmlFor="yellow" >Yellow</label> 
        </div>
         <div> 
            <input 
                id="purple" 
                name="theme-color" 
                onChange={handleThemeOption} 
                type="radio" 
                value="purple"
            /> 
           <label htmlFor="purple">Purple</label> 
        </div>
         <div> 
            <input 
                id="black" 
                name="theme-color" 
                onChange={handleThemeOption} 
                type="radio" 
                value="dark"
            /> 
            <label htmlFor="black">Black</label> 
        </div>
       </div>
    </div>
  );
};

export default Theme;
