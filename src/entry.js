import { helloWorld } from './utils'
import { createPage } from './ui/page'

helloWorld();


// Build UI
var mainDiv = document.createElement('div');
createPage(mainDiv);
document.body.appendChild(mainDiv);