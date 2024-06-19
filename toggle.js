let lightTheme = true; 
const toggleThemeElement = document.getElementById("toggleButton");
const lightThemeDisplaySpanElement = toggleThemeElement.firstElementChild;
const darkThemeDisplaySpanElement = toggleThemeElement.lastElementChild; 
const toggleSwitch = document.querySelector("#toggleCheckbox");
lightThemeDisplaySpanElement.style.display = "none"; 

toggleSwitch.addEventListener("click", () => { 
    let newTheme = lightTheme ? "dark" : "light"; 
    lightTheme = !lightTheme; 
    if(lightTheme){
        lightThemeDisplaySpanElement.style.display = "none"; 
        darkThemeDisplaySpanElement.style.display = "inline-block"; 
        toggleThemeElement.style.paddingLeft = "0px"; 
        toggleThemeElement.style.paddingRight= "5px"; 
    }else{
        lightThemeDisplaySpanElement.style.display = "inline-block"; 
        darkThemeDisplaySpanElement.style.display = "none";
        toggleThemeElement.style.paddingLeft = "5px"; 
        toggleThemeElement.style.paddingRight= "0px";  
    }
    document.querySelector("html").setAttribute("data-theme", newTheme); 
}); 

