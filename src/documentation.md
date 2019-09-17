---
layout: layouts/documentation.njk
title: Documentation
subHead: Getting started with WindWalker
---

## TailwindCSS resources

1. Tailwind screencasts
2. Tailwind docs
3. Tailwind CSS Intellisense plugin for VS Code

If you're using VS Code, you'll probably want to install [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss). It's invaluable. 


WindWalker's CSS is Tailwind-based through and through. While the most common (and probably most preferable) way to use Tailwind is by applying its classes directly in your markup (e.g., `<div class="lg:max-w-4xl"> {{ content }} </div>`), this approach won't always work.

 WindWalker Tailwind styles in three different but complementary ways, all depending on the goal at hand. 

## Styling strategies
The way WindWalker leverages Tailwind falls into three broad strategic categories:

1. Layout
2. Site Theming
3. Build-time selector styling

### Layout
Layout styling generally happens in the markup of WindWalker's `.njk` templates. As noted above, this is the most common way to apply Tailwind styles. If you've used Tailwind before, you'll be familiar with this approach. 

It looks something like this:

```markup
<header class="md:flex md:justify-between md:items-center"></header>
```
Where WindWalker differs from some other Tailwind projects is that _layout_ styling almost exclusively reserved for, well, layout concerns: e.g., display properties, widths, heights, margin, padding, max-widths, etc. As a general rule, WindWalker eschews applying things like background colors (e.g., `bg-red`), text colors (e.g., `text-white`), and border colors (e.g., `border-gray-700`) in the markup itself. 

Why? Mainly because I wanted WindWalker's colors to be easily and centrally configurable.  

### Site Theming

While this approach works well for WindWalker's needs, feel free to 

#### Theming Flow

The theming flow is as follows:
`tailwind.config.js` 👉 `src/css/theme/assignment.css` 👉 `src/css/theme/application.css`


#### Palette configuration

The entry point for theming is `tailwind.config.js`, specifically in ...

```markup
module.exports = {
  theme: {
    colors: {}  
  }
}
```
There, you'll find three color objects: `primary`, `neutral`, and `supporting`. This is where you will configure your site palette that Tailwind will use to generate corresponding color classes. 

#### Variable assignment

In `assignment.css`, we use Tailwind's `theme()` function to assign our 
palette configuration to native CSS variables that can be used for theming. 

```css
:root {
  --color-bg: theme('colors.white');
  --text-body: theme('colors.neutral.100');
}
```

#### Theme application

In `application.css`, we take the variable assignments we made above and apply them to selectors (typically either elements tags like `body` or classes like `.footer`).

#### Theming exclusions

Not everything in WindWalker is directly themable. Syntax highlighting (`src/css/components/syntax-highlighting.css`), for example, uses a pre-baked code syntax theme called a11y-dark theme for JavaScript, CSS, and HTML created by Eric Bailey. That doesn't mean you're stuck with this particular theme. It just means that you'll need to replace it wholesale inside the `syntax-highliting.css` file with another theme of your choosing. 

Lea Verou's [Prism](https://prismjs.com/) is a great resource for syntax highlighting themes. You can download a variety of themes from her site or clone them directly from the [Github project](https://github.com/PrismJS/prism/blob/gh-pages/themes/).

> **NOTE:** If you know you'll never need code syntax highlighting for your project, you can safely remove the `@import 'components/syntax-highlighting` statement from `src/css/site.css` and delete `src/css/components/syntax-highlighting.css` from the project.

## Project Credits
## Styling strategies
## Styling strategies
## Styling strategies
## Styling strategies
## Styling strategies
## Styling strategies
## Styling strategies
## Styling strategies
## Styling strategies
## Styling strategies
## Styling strategies
## Styling strategies
## Styling strategies
