// For syntax highlighting only
const html = String.raw;

class ThemeToggle extends HTMLElement {
  constructor() {
    super();

    this.STORAGE_KEY = 'user-color-scheme';
    this.COLOR_MODE_KEY = '--color-mode';
  }

  connectedCallback() {
    this.render();
  }

  getCSSCustomProp(propKey) {
    let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

    // Tidy up the string if there’s something to work with
    if (response.length) {
      response = response.replace(/\'|"/g, '').trim();
    }

    // Return the string response by default
    return response;
  }

  applySetting(passedSetting) {
    let currentSetting = passedSetting || localStorage.getItem(this.STORAGE_KEY);

    if (currentSetting) {
      document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
      this.setButtonLabelAndStatus(currentSetting);
    } else {
      this.setButtonLabelAndStatus(this.getCSSCustomProp(this.COLOR_MODE_KEY));
    }
  }

  toggleSetting() {
    let currentSetting = localStorage.getItem(this.STORAGE_KEY);

    switch (currentSetting) {
      case null:
        currentSetting =
          this.getCSSCustomProp(this.COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
        break;
      case 'light':
        currentSetting = 'dark';
        break;
      case 'dark':
        currentSetting = 'light';
        break;
    }

    localStorage.setItem(this.STORAGE_KEY, currentSetting);

    return currentSetting;
  }

  setButtonLabelAndStatus(currentSetting) {
    // this.modeToggleButton.innerText = `${
    //   currentSetting === 'dark' ? 'Light' : 'Dark'
    // } theme`;
    this.modeStatusElement.innerText = `Color mode is now "${currentSetting}"`;
    this.modeToggleButton.classList.remove('light', 'dark');
    this.modeToggleButton.classList.add(`${currentSetting}`);
  }

  render() {
    this.innerHTML = html`
      <div role="status" class="visually-hidden js-mode-status"></div>
      <div class="">
        <button role="button" class="relative w-20 h-8 rounded-full shadow-inner overflow-hidden theme-toggle js-mode-toggle flex items-center cursor-pointer">
        <svg width="128" height="33" viewBox="0 0 128 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="toggle-slider">
        <g id="disc" filter="url(#filter0_d)">
        <path id="outer" d="M64 28C70.6276 28 76 22.6274 76 16C76 9.37259 70.6276 4 64 4C57.3726 4 52 9.37259 52 16C52 22.6274 57.3726 28 64 28Z" fill="#464F54"/>
        <path id="half-moon" d="M69.5727 14.2896C69.5727 18.312 66.312 21.5727 62.2896 21.5727C59.6074 21.5727 57.2639 20.1228 56 17.964C56.7223 21.965 60.2226 25 64.4319 25C69.1643 25 73 21.1638 73 16.4317C73 12.2225 69.9652 8.7222 65.9639 8C68.1228 9.26387 69.5727 11.6074 69.5727 14.2896Z" fill="white"/>
        </g>
        <g id="stars">
        <path id="sttar" d="M8.02674 13.2C8.59377 13.2 9.05348 12.7299 9.05348 12.15C9.05348 11.5701 8.59377 11.1 8.02674 11.1C7.45971 11.1 7 11.5701 7 12.15C7 12.7299 7.45971 13.2 8.02674 13.2Z" fill="white"/>
        <path id="star" d="M21.4539 28.5746C22.3604 28.5746 23.0953 27.8231 23.0953 26.896C23.0953 25.9689 22.3604 25.2174 21.4539 25.2174C20.5474 25.2174 19.8125 25.9689 19.8125 26.896C19.8125 27.8231 20.5474 28.5746 21.4539 28.5746Z" fill="white"/>
        <path id="star_2" d="M9.88321 21.8787C10.3365 21.8787 10.7039 21.5029 10.7039 21.0394C10.7039 20.5758 10.3365 20.2001 9.88321 20.2001C9.42994 20.2001 9.0625 20.5758 9.0625 21.0394C9.0625 21.5029 9.42994 21.8787 9.88321 21.8787Z" fill="white"/>
        <path id="star_3" d="M38.7664 9.55159C39.6729 9.55159 40.4078 8.80008 40.4078 7.87303C40.4078 6.94598 39.6729 6.19446 38.7664 6.19446C37.8599 6.19446 37.125 6.94598 37.125 7.87303C37.125 8.80008 37.8599 9.55159 38.7664 9.55159Z" fill="white"/>
        <path id="star_4" d="M42.3987 25.4017C42.6706 25.4017 42.8911 25.1762 42.8911 24.8981C42.8911 24.62 42.6706 24.3945 42.3987 24.3945C42.1267 24.3945 41.9062 24.62 41.9062 24.8981C41.9062 25.1762 42.1267 25.4017 42.3987 25.4017Z" fill="white"/>
        <path id="60s-star" d="M23.2884 4.02741C23.3231 4.32006 23.1336 4.59488 22.8391 4.72212L25.8741 13.6929L27.8081 10.5205C27.497 10.4628 27.2534 10.2417 27.219 9.95228C27.1751 9.5826 27.4891 9.24138 27.9204 9.19015C28.3517 9.13891 28.7369 9.39706 28.7808 9.76674C28.8248 10.1364 28.5107 10.4776 28.0794 10.5289C28.0442 10.5331 28.0093 10.5352 27.9749 10.5354L26.9078 13.9257L33.5768 11.7671C33.4542 11.5302 33.4819 11.2679 33.6507 11.1572C33.8355 11.036 34.1195 11.1424 34.2849 11.3947C34.4503 11.647 34.4346 11.9497 34.2498 12.0709C34.1115 12.1615 33.9178 12.1249 33.7597 11.9951L27.8168 15.0618L30.8346 17.9463C31.199 17.5305 31.7179 17.3889 31.9978 17.6305C32.2795 17.8737 32.2123 18.4135 31.8475 18.836C31.4827 19.2585 30.9586 19.4038 30.6768 19.1605C30.4549 18.969 30.4494 18.5936 30.6353 18.2363L26.5428 16.1888L29.1547 25.9364C29.5549 25.8718 29.939 26.0555 30.065 26.3976C30.2112 26.7949 29.9541 27.2552 29.4907 27.4258C29.0272 27.5964 28.533 27.4127 28.3867 27.0155C28.2532 26.6527 28.456 26.2373 28.8453 26.038L25.3393 16.9765L23.1816 20.3892C23.4218 20.4795 23.5983 20.6745 23.6272 20.9176C23.6712 21.2873 23.3571 21.6285 22.9258 21.6798C22.4945 21.731 22.1093 21.4729 22.0654 21.1032C22.0215 20.7335 22.3355 20.3923 22.7668 20.341C22.8241 20.3342 22.8807 20.3329 22.9357 20.3365L24.0806 16.524L17.6974 18.3133C17.7537 18.6956 17.5579 19.0545 17.2282 19.1428C16.8686 19.2392 16.486 18.9772 16.3735 18.5577C16.2611 18.1381 16.4615 17.7199 16.8211 17.6236C17.1004 17.5487 17.3936 17.6901 17.5633 17.9535L24.2408 14.9607L20.3874 12.8504C20.3175 12.9745 20.1748 13.0466 19.9307 13.0756C19.4994 13.1268 18.9149 13.0242 18.871 12.6545C18.827 12.2848 19.1214 11.7161 19.5527 11.6648C19.984 11.6136 20.3889 12.0992 20.4328 12.4689C20.4409 12.5373 20.4436 12.5994 20.4399 12.6555L24.5542 14.0465L22.464 4.79593C22.0847 4.79009 21.7662 4.54708 21.7265 4.21296C21.6826 3.84327 21.9966 3.50205 22.4279 3.45082C22.8592 3.39958 23.2445 3.65773 23.2884 4.02741Z" fill="white"/>
        </g>
        <g id="clouds">
        <g id="cloud">
        <path d="M112.455 14.2024H98.0802C96.3791 14.2024 95 15.6127 95 17.3524C95 19.0921 96.3791 20.5024 98.0802 20.5024H112.455C114.156 20.5024 115.535 19.0921 115.535 17.3524C115.535 15.6127 114.156 14.2024 112.455 14.2024Z" fill="white"/>
        <path d="M105.938 14.8981C105.938 12.9651 107.47 11.3981 109.36 11.3981C111.25 11.3981 112.782 12.9651 112.782 14.8981V15.5227C112.782 15.5643 112.75 15.5981 112.708 15.5981H106.011C105.97 15.5981 105.938 15.5643 105.938 15.5227V14.8981Z" fill="white"/>
        <path d="M98.4373 15.25C98.4373 12.3505 100.736 10 103.571 10C106.406 10 108.705 12.3505 108.705 15.25V15.5798C108.705 15.591 108.696 15.6 108.685 15.6H98.4571C98.4462 15.6 98.4373 15.591 98.4373 15.5798V15.25Z" fill="white"/>
        </g>
        <g id="cloud_2">
        <path d="M96.3091 10.2371H88.6428C87.7355 10.2371 87 10.9893 87 11.9171C87 12.8449 87.7355 13.5971 88.6428 13.5971H96.3091C97.2164 13.5971 97.9519 12.8449 97.9519 11.9171C97.9519 10.9893 97.2164 10.2371 96.3091 10.2371Z" fill="white"/>
        <path d="M92.8438 10.6097C92.8438 9.5788 93.661 8.74307 94.6686 8.74307C95.6769 8.74307 96.4942 9.5788 96.4942 10.6097V10.9428C96.4942 10.965 96.4764 10.9831 96.4551 10.9831H92.8828C92.8609 10.9831 92.8438 10.965 92.8438 10.9428V10.6097Z" fill="white"/>
        <path d="M88.8127 10.8C88.8127 9.25363 90.0386 8 91.5507 8C93.0627 8 94.2886 9.25363 94.2886 10.8V10.9759C94.2886 10.9819 94.2838 10.9867 94.2784 10.9867H88.823C88.8175 10.9867 88.8127 10.9819 88.8127 10.9759V10.8Z" fill="white"/>
        </g>
        </g>
        </g>
        <defs>
        <filter id="filter0_d" x="49" y="1" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset dx="1" dy="1"/>
        <feGaussianBlur stdDeviation="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.125 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        </defs>
        </svg>
        

        
        </button>
      </div>
    `;

    this.afterRender();
  }

  afterRender() {
    this.modeToggleButton = document.querySelector('.js-mode-toggle');
    this.modeStatusElement = document.querySelector('.js-mode-status');
    this.modeTextElement = document.querySelector('.js-mode-text');

    this.modeToggleButton.addEventListener('click', evt => {
      evt.preventDefault();

      this.applySetting(this.toggleSetting());
      if (mock) {
        renderStyleguideValues('.mock-main');
      }
    });

    this.applySetting();
  }
}

if ('customElements' in window) {
  customElements.define('theme-toggle', ThemeToggle);
}

export default ThemeToggle;
