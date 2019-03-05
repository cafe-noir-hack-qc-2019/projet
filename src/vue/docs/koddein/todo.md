# Todo for this stack (KODDEIN-MASTER)

## Add a test page

- integration medias
  - types
    - font
    - audio
    - video
    - image
    - svg : both url / inline / vue?
  - in files :
    - js (`require()`)
    - css (`url()`)
    - html (`src=""`) if vuejs for exemple, + test html copy webpack

## re-add cool stuff of old vue stack

- fix transitions mixins
- create recipies for standards stuff
  - get ridd of i18n / router...
- add minimal standard layout
  - header + navbar
  - content zone
  - footer
- put `Picture` and `Video` in gemfury
- create form validator component
- create modale component

## test webpack

- split chunks
- use as a compiler only

## refactoring

- clean code
  - utils for modernizr / detectizr / ie pollyfills conditionals / fontawesome
    - and create recipies (doc)
    - maybe add yeoman ;)

- write doc

## merge

use this stack as a base and merge others into this one

- how to merge package.json
- merge webpack

stacks :

- vue
- stimulus

## Lab

### proposal

- build legacy code version for ie
  - include pollyfils / hack etc
  - inject `is_ie=true` somewhere in our code
  - use html conditional comments ;)
