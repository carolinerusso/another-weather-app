## What it does
- Uses Google's Geocode API and Dark Sky's Weather API to get weather forecast details based on zip code,
- Uses AWS API Gateway to [mask Dark Sky's Weather API secret key](https://darksky.net/dev/docs/faq#cross-origin) (without requiring a backend server or proxy server), 
- Uses Webpack and Babel to build and transpile JSX and ES6 syntax,
- Renders the view with React.js,
- Follows BEM naming methodology and groups Sass partials by component,
- Uses min-width, mobile-first @media queries to handle responsive behavior, and 
- Uses Autoprefixer (PostCSS) to deal with vendor prefixes