## The Twelve-Factor App

Source for the content app running at: https://12factor.net/

12F (for short) is a Sinatra app that consumes a truck load of markdown content, parses it using [kramdown](https://github.com/gettalong/kramdown) and [front_matter_parser](https://github.com/waiting-for-dev/front_matter_parser), and renders it for all to enjoy.

12F uses the latest of all its gems on Ruby 3.2.

### Development

```sh
bundle install
heroku local:start
open http://localhost:5000
```

### Production deploy

```sh
heroku create
git push heroku master
heroku open
```

### Meta

Original Creator: Adam Wiggins

Contributiors: James Lindenbaum, Mark McGranaghan, Chris Stolt, Ryan
Daigle, Mark Imbriaco, Keith Rarick, Will Leinweber, Jesper Jørgensen, James
Ward, Adam Seligman, Phil Hagelberg, Jon Mountjoy, Matthew Turland, Daniel
Jomphe, Mattt Thompson, Anand Narasimhan, Lucas Fais, Pete Hodgson

Translations and edits by:
[@sigerello](https://github.com/sigerello),
[@mahnunchik](https://github.com/mahnunchik),
[@francescomalatesta](https://github.com/francescomalatesta),
[@astralhpi](https://github.com/astralhpi),
[@liangshan](https://github.com/liangshan),
[@orangain](https://github.com/orangain),
[@Keirua](https://github.com/Keirua),
Clément Camin,
Bob Marteen,
[@dmathieu](https://github.com/dmathieu),
[@fernandes](https://github.com/fernandes),
[@gwmoura](https://github.com/gwmoura),
[@lfilho](https://github.com/lfilho),
[@Arturszott](https://github.com/Arturszott),
[@melikeyurtoglu](https://github.com/melikeyurtoglu),
[@filiphanes](https://github.com/filiphanes)
and [more](https://github.com/heroku/12factor/graphs/contributors).

2023 Brand Refresh™ by [@johlym](https://github.com/johlym).

Released under the MIT License:
https://opensource.org/licenses/MIT
