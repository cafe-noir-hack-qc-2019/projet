# Koddein master - vue

> the beta version of our front stack

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Developers](#developers)
  - [Requirements](#Requirements)
  - [Run, watch, build](#run-watch-build)
  - [More notes](#more-notes)
    - [App flow](#app-flow)
    - [App flow](#app-flow)
- [Acknowledgments](#Acknowledgments)

## Introduction


## Features

this stack is an uptodate starter featuring

- babel 7
- eslint
- vue 2.5

## Developers

### Requirements

- node 8.x +
- npm x.x.x
`npm install --save-dev babel-cli babel-preset-env`


### Run, watch, build

first install dependencies (`yarn`)

- `yarn run build:prod`
  - build our final code (minify assets etc)
  - some aliases : `yarn run build`

- `yarn run build:dev`
  - build our *final* code, but within our **development** environment
  - don't optimize assets etc
  - USE THIS ONLY FOR DEBUG
  - some aliases : `yarn run build`

- `yarn run watch:dev`
  - launch a dev server and watch our code
  - some aliases : `yarn start` | `yarn run dev`

- `yarn run watch:prod`
  - launch a dev server and watch our code, but within our production environment
  - NEVER TESTED !!!

### More notes

#### App flow

- instanciate index.js
- init vue, router etc
  - if route is `/` redirect to `/:defaultLocale`
- init TheApp.vue
  - display loader
  - preload globales, assets etc
  - init our stores (watch resizes etc)
  - wait for route component (the router may preload the route component)
- then, all internal stuff should be initialized, the router may resolve your route
  - if nop, redirect 404
  - if yess, load component
- when all loaded, hide loader and show page :)

#### i18n

there is many way to add i18n texts

- in components `<i18n>`
  - will be build within our components, and accessible only into those

- assets/i18n/[locale].js
  - will be build in an `i18n.js` file for each locale (if 2 locales then `i18n0.js` + `i18n1.js`) - our app will load only the one needed

- within our `api/globales`
  - merged within local i18n, if same key, the one of api will override our local one


#### stylus

@see Camille and @Ravy, they build some kffein libs
or @Nicolas (he know about this stuff too)

... @todo explain injected vars etc

## Acknowledgments

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

<!-- @exemple build status
[![Build Status](https://img.shields.io/travis/gitpoint/git-point.svg?style=flat-square)](https://travis-ci.org/gitpoint/git-point)
[![Coveralls](https://img.shields.io/coveralls/github/gitpoint/git-point.svg?style=flat-square)](https://coveralls.io/github/gitpoint/git-point)
[![All Contributors](https://img.shields.io/badge/all_contributors-73-orange.svg?style=flat-square)](./CONTRIBUTORS.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![Gitter chat](https://img.shields.io/badge/chat-on_gitter-008080.svg?style=flat-square)](https://gitter.im/git-point)
-->

***N/A***

<!-- @example preview
Lorem ipsume dolor blablabla

**Available for both iOS and Android.**

<p align="center">
  <img src = "http://i.imgur.com/HowF6aM.png" width=350>
</p>
-->

## Features

***N/A***

<!--
Lorem ipsume dolor blablabla

* [x] feature 1
* [ ] next feature -->

<!-- @exemple why not some screanshots
<p align="center">
  <img src = "http://i.imgur.com/IkSnFRL.png" width=700>
</p>
-->

## Deploy

***N/A***

## Dev

### install

### build

## Acknowledgments

Thanks to [JetBrains](https://www.jetbrains.com) for supporting us with a [free Open Source License](https://www.jetbrains.com/buy/opensource).


