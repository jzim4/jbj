# ChemBox
Jonah Zimmer, Bresy Pedraza, James Bradley

## The Project
For Software Design and Development (COMP-225) at Macalester College, we were tasked with creating any software application in one semester. Inspired by Bresy's and James' experience as chemistry majors, we decided to create ChemBox, a web-app learning tool for General Chemistry students at Macalester. Existing chemistry simulations are often both visually unappealing and difficult to understand. We therefore set out to make an improved learning tool that addresses this hole in the market. The app content is inspired by the Macalester General Chemistry curriculum, but our app would likely be useful to students at other schools. 

## Dependencies
The site is built in [React](https://react.dev/), and we used the [p5.js](https://p5js.org/) graphics package for the simulations. The sprites for the orbital activity were drawn by James and Bresy in [Piskel](https://www.piskelapp.com/). The javascript files are bundled with a combination of [browserify](https://browserify.org/) and [babel](https://babeljs.io/). While you can access the site from the [public url](http://jzim4.github.io/jbj), if you wish to download the code locally, running the following line in the terminal will allow you to download all the necessary dependencies.
```bash
npm install
```

## Making Changes to the Code
In order to make changes to the code, you must prompt browserify and babel to compile the javascript. To do so, run the following line in the terminal, and this will overwrite the file called in the html file, bundle.js, with the new changes.
```bash
npm run build
```

## The Site Code Structure
The site begins with the file index.html located in the base directory. Also in the base directory is simulations.json, which contains image links and instructions for each simulation. 

From there, in the pages directory, index.js creates the root for the React components. The home page is built in the files homePage.jsx and homePageModules.jsx. The former creates the title and images, while the latter, using the data from simulations.json, creates thumbnails that give the user access to the simulations. 

When a user clicks on any of the thumbnails on the home page, they are brought to a simulation page. The simulations are created in instructionPage.js and simulationPage.jsx. The click event then tells these two files which simulation and supplemental information will be displayed.

Finally, simulationPage.jsx calls the files that draw on the canvas and therefore create the simulation. The code that creates the simulations is located in the directory sims.

## Microstates

The Microstates activity was in the process of development toward the end of the semester but was not successfully implemented into the final website. A prototype that runs in the p5.js editor can be found here: https://editor.p5js.org/jbradley5/sketches/KO2DY6-Ap
