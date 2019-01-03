import React from 'react';

const Theme = () => {
  const toggleThemeDisplay = (e) => {
    e.stopPropagation();
    const parent = e.target.parentElement;
    parent.classList.toggle('toggleOption');
    //console.log('triggered');
  };

  const handleThemeOption = (e) => {
  
    const el = e.target;
    const app = document.getElementById('app');
    app.className = '';
    app.classList.add(`theme--${el.value}`);
    //console.log(el.value);
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('default').checked = true;
  });

  
  return (
    <div className="theme">
       <div className="theme-toggle" onClick={toggleThemeDisplay}>
          <img src="../images/paintbrush.svg"></img> 
       </div>
       <div className="theme-chooser">
         <div> 
            <input type="radio" name="theme-color" onChange={handleThemeOption} id="default"  value="default"/>
             <label htmlFor="default">Default</label>
          </div>
         <div> 
            <input type="radio" name="theme-color" onChange={handleThemeOption} id="blue" value="blue"/>
             <label htmlFor="blue">Blue</label> 
        </div>
         <div> 
            <input type="radio" name="theme-color" onChange={handleThemeOption} id="pink" value="pink"/> 
            <label htmlFor="pink">Pink</label> 
        </div>
         <div> 
            <input type="radio" name="theme-color" onChange={handleThemeOption} id="yellow" value="yellow"/> 
            <label htmlFor="yellow" >Yellow</label> 
        </div>
         <div> 
            <input type="radio" name="theme-color" onChange={handleThemeOption} id="purple" value="purple"/> 
           <label htmlFor="purple">Purple</label> 
        </div>
         <div> 
            <input type="radio" name="theme-color" onChange={handleThemeOption} id="black" value="dark"/> 
            <label htmlFor="black">Black</label> 
        </div>
       </div>
    </div>
 );
}

export default Theme;