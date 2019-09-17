
const ww = {};

// Nav
ww.nav = function(navWrapper, navSelector) {
  const wrapper = document.querySelector(navWrapper);
  const nav = wrapper.querySelector(navSelector);
  const navOpen = document.querySelector('#navOpen');
  const navClose = document.querySelector('#navClose');
  navOpen.addEventListener('click', ()=> {
    wrapper.classList.remove('hidden');
    wrapper.classList.add('bg-white', 'overflow-y-auto');
    nav.classList.add('open');
    navOpen.classList.add('hidden');
    navClose.classList.remove('hidden');
  })
  navClose.addEventListener('click', ()=> {
    wrapper.classList.add('hidden');
    nav.classList.remove('open');
    navOpen.classList.remove('hidden');
    navClose.classList.add('hidden');
  })
};

// ww.nav('.nav-wrapper', '.nav-collapse');

const styleguideUtils = {
  extractRGB: function( element, numberValues ) {
    // const desiredProperty = JSON.parse(property : property)
    // const desiredProperty = property
    // console.log(desiredProperty)
    // const numberValues = getComputedStyle(document.querySelector(element)).desiredProperty.replace(/['\"rgb(,)"]+/g, '').split(" ")
    // console.log(getComputedStyle(document.querySelector(element)).desiredProperty)
    const digits = numberValues.map(Number)
    const inputToHex = sgu.RGBToHex(digits[0], digits[1], digits[2]);
    return inputToHex
  },
  RGBToHex: function(r,g,b){
    var bin = r << 16 | g << 8 | b;
    return "#" + (function(h){
        return new Array(7-h.length).join("0")+h
    })(bin.toString(16).toUpperCase())
  },
  generateTemplate: function( element ) {
    const RGBOutput = sgu.extractRGB( element, getComputedStyle(document.querySelector(element)).backgroundColor.replace(/['\"rgb(,)"]+/g, '').split(" ") )
    const color = sgu.extractRGB ( element, getComputedStyle(document.querySelector(element)).color.replace(/['\"rgb(,)"]+/g, '').split(" ") )
    let currentStyleValues = "";
    if (RGBOutput === '#000000') {
      currentStyleValues = 
      `<p class="leading-relaxed">The current background color is <code>transparent</code> and the current text color is <code>${color}</code></p>`  
    } else {
      currentStyleValues = 
      `<p class="leading-relaxed">The current background color <code>${RGBOutput}</code> and the text color is <code>${color}</code></p>`
    }
    const container = document.querySelector(`${element} .style-values`)
    console.log(container)
    container.innerHTML = currentStyleValues
  },
  extractTextColor: function( element ) {
    return textColor = getComputedStyle(document.querySelector(element)).color
  }
}
const sgu = styleguideUtils;

const renderStyleguideValues = function ( element ) {
  return sgu.generateTemplate( element )
}

// console.log(sgu.grabVariable('.mock-header'))
// renderStyleguideValues('.mock-header')
const mock = document.querySelector('[class^="mock-"]')
if (mock) {
  renderStyleguideValues('.mock-main')
}
// renderStyleguideValues('.mock-footer')


