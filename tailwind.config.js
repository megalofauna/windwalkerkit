const _ = require('lodash')

module.exports = {
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px'
    },
    colors: {
      transparent: 'transparent',

      black: '#111111',
      white: '#fff',

      primary: {
        100: '#F0B429',
        200: '#F7C948',
        300: '#FADB5F',
        400: '#FCE588',
        500: '#FFF3C4',
        600: '#FFFBEA'
      },
      neutral: {
        100: '#1C322E',
        200: '#304743',
        300: '#40514D',
        400: '#4D605B',
        500: '#666C6A',
        600: '#738881',
        700: '#8FACA2',
        800: '#B7C4BF',
        900: '#EAEBEB',
        1000: '#F5F5F5'
      }
    },
    skin: {
      background: {
        'header': 'var(--bg-header)',
        'body': 'var(--bg-body)',
        'link': 'var(--bg-link)',
        'link-hover': 'var(--bg-link-hover)',
        'code-inline': 'var(--bg-code-inline)',
        'code-block': 'var(--bg-code-block)',
        'callout': 'var(--bg-callout)',
        'footer': 'var(--bg-footer)',
      },
      text: {
        'header': 'var(--text-header)',
        'body': 'var(--text-body)',
        'link': 'var(--text-link)',
        'link-hover': 'var(--text-link-hover)',
        'code-inline': 'var(--text-code-inline)',
        'code-block': 'var(--text-code-block)',
        'footer': 'var(--text-footer)'
      },
      border: {
        'primary': 'var(--border-primary)',
        'secondary': 'var(--border-secondary)'
      }
    },
    container: {
      center: true
    },
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      title: [
        'Inter Bold',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: [
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      ],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.375rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    opacity: {
      '0': '0',
      '25': '0.25',
      '50': '0.5',
      '75': '0.75',
      '100': '1',
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12',
    },
    extend: {
      spacing: {
        'micro-ch': '0.5ch',
        'micro-ex': '0.125ex'
      },
      maxWidth: {
        '7xl': '80rem',
        '8xl': '96rem'
      }
    }
  },
  variants: {
    accessibility: ['responsive', 'focus'],
    alignContent: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColor: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: ['responsive'],
    borderColor: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive', 'hover'],
    boxShadow: ['responsive', 'hover', 'focus'],
    cursor: ['responsive'],
    display: ['responsive'],
    fill: ['responsive'],
    flex: ['responsive'],
    flexDirection: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    flexWrap: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive'],
    fontSize: ['responsive'],
    fontSmoothing: ['responsive'],
    fontStyle: ['responsive'],
    fontWeight: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    inset: ['responsive'],
    justifyContent: ['responsive'],
    letterSpacing: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    objectFit: ['responsive'],
    objectPosition: ['responsive'],
    opacity: ['responsive', 'hover', 'focus'],
    order: ['responsive'],
    outline: ['responsive', 'focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    placeholderColor: ['responsive', 'focus'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    stroke: ['responsive'],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover', 'focus'],
    textDecoration: ['responsive', 'hover', 'focus'],
    textTransform: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    wordBreak: ['responsive'],
    zIndex: ['responsive'],
  },
  corePlugins: {},
  plugins: [
    function ({
      addUtilities,
      theme,
      e
    }) {
      const backgrounds = _.map(theme('skin.background'),
        (value, key) => {
          return {
            [`.bg-${key}`]: {
              backgroundColor: `${value}`
            }
          }
        })
      addUtilities(backgrounds);
      const text = _.map(theme('skin.text'), (value, key) => {
        return {
          [`.text-${key}`]: {
            color: `${value}`
          }
        }
      })
      addUtilities(text);
      const borders = _.map(theme('skin.border'), (value, key) => {
        return {
          [`.border-${key}`]: {
            borderColor: `${value}`
          }
        }
      })
      addUtilities(borders);
    },
    function ({
      addComponents
    }) {
      const bleeds = {
        '.bleed-full': {
          position: 'relative',
          width: '100vw',
          marginLeft: '50%',
          transform: 'translateX(-50%)'
        },
        '.bleed-lg': {
          position: 'relative',
          width: '50vw',
          marginLeft: '50%',
          transform: 'translateX(-50%)'
        },
      }
      addComponents(bleeds, ['responsive'])
    }
  ]
}