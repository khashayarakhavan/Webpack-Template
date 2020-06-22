import _ from 'lodash';
import "./style.css";
import Icon from "Images/user.png";
import Data from "Utilities/data.xml";
import printMe from './print.js';

function component() {
    const element = document.createElement('div');
    const btn = document.createElement("button");

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add("hello");
    btn.innerHTML = "Click me and check the console!";
    btn.onclick = printMe;

    // Add the image to our existing div..
    const myIcon = new Image();
    myIcon.src = Icon;
 
    element.appendChild(myIcon);
    element.appendChild(btn);

    console.log(Data);

    return element;
}

// document.body.appendChild(component());
let HMRelement = component(); // Store the element to re-render on print.js changes
document.body.appendChild(HMRelement);

if (module.hot) {
   module.hot.accept('./print.js', function() {
     console.log('Accepting the updated printMe module!');
    //  printMe();
    document.body.removeChild(HMRelement);
    HMRelement = component(); // Re-render the "component" to update the click handler
    document.body.appendChild(HMRelement);
   })
 }