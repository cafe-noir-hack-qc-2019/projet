
![alt text](https://brand.kffein.com/logo_full.png)

# Master Starter Kit

Main stack for KFFEIN projects

## Stack description

### Local serveur

* laravel homstead

### Backend stacks

* Craft3
* Laravel

### Frontend stack

* Main stacks
  * Stimulus (used if backend php rendering)
  * Vuejs (used if fontend js rendering)
* Libraries
  * Stylus (koutoswiss)
  * GSAP (pro)
  * Scrollmagic
  * SwiperJS
  * Modernizr/Detectizr

### Tools

* Webpack 4
* babel (env preset)
* Eslint with Airbnb config
* PostCss (autoprefixer)

### Project installer

* Yeoman

### Plugins

* kffein/craft-bulk-edit
* kffein/craft-koddein-fields
* ether/seo
* nystudio107/craft-imageoptimize
* doublesecretagency/craft-inventory
* craftcms/redactor
* spicywebau/craft-neo
* studioespresso/craft-navigate

## Requierements

* composer 1.6 | [Doc](https://getcomposer.org/download/)
* virtualbox 5.1 | [Doc](https://www.virtualbox.org/)
* vagrant 1.9 | [Doc](https://www.vagrantup.com/docs/installation/)
* yeoman | [Doc](http://yeoman.io/)
* yarn 1.5 | [Doc](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
* laravel/homestead 5.2.0 | [Doc](https://laravel.com/docs/5.6/homestead) (1)
* php 7.0+
* nvm (to easily switch of node version) | [Doc](http://dev.topheman.com/install-nvm-with-homebrew-to-use-multiple-versions-of-node-and-iojs-easily/)


(1), If you have issiue installing the proper version of laravel=homestead, you can use the following line of code:

```
vagrant box add laravel/homestead https://vagrantcloud.com/laravel/homestead --box-version 5.2
```

## Introduction

This stack is divided in 3 mains parts

| the local VM        | the project techno stack           | the project installer           |
| ------------- |:-------------:|:-------------:|
| the local VM is handle from the root of the project     | the techno stack is handle from src/stackname | the yeoman installer that will install everything |


## the installer

### Install the installer

The installer is done in yeoman.
You can install the installer globally to get it available everytime

0- install yeoman

```
nvm use 10.13
npm install -g yo
```

1- You must add Gemfury KFFEIN private repo to your global npm repo list:

```
npm config set registry https://npm-proxy.fury.io/CNtsDNp2wiJazToZHUdc/agence-kffein/
npm config set ca ""
```

2- add KODDEIN Starter kit in global:

`npm install -g generator-koddein --registry https://npm-proxy.fury.io/CNtsDNp2wiJazToZHUdc/agence-kffein/`

### Run the installer and start a new project

Everytime you want to create a project:

1. run the installer

  `yo koddein`

2. Reply the answers related to your configuration

3. If you've installed the vagrant-hostsupdater you do not need to update your hosts file otherwise you should match it with your VM IP Address. To install vagrant-hostupdater just run

  `vagrant plugin install vagrant-hostsupdater`

	This plugin will ask your password when you start a VM with `vagrant up`
    
5. Edit .env file to set up your project

### Update the installer

As stacks changes, generator will be updated.
It need to be updated on a regular basis
`yo koddein:update`

#### experienced issues while updating

If you'r generator isn't up-do-date event after this try :

- set the correct npm version `nvm use 10.13`
- try install the latest release : `npm install -g generator-koddein@1.4.4 --registry https://npm-proxy.fury.io/CNtsDNp2wiJazToZHUdc/agence-kffein/`
  - Note that you may use the correct version
- if you still have this error when `kodein:init`; try :
  - find where the generator is installed (mine was `~/.nvm/versions/node/v10.13.0/lib/node_modules/generator-koddein`)
  - then from there, simply run `yarn` (you may set the correct npm version `nvm use 10.13`)


## Architecture

* The code is taken from src/stackName.
* Web entry point for all stacks is **/public**
* Yeo man scarfolding templates are located in **/generators** folder

Each subproject has his own readme file with instructions



## Daily usage

After creating project stack, to run the project, run

`vagrant up`

### Tips
> 1- If any change need to be done on homestead file create a Homestead.example.yaml file so every developer is aware of the specific config.


> 2- Some projects are embed with Database. Database file is located into **_db**. You need to edit **after.sh** script to launch database provisionning.
**after.sh** cames with a few example in comments.

## stack documentation

> Each stack has it own documentation within `/src/stackname`

[CraftCMS Starter kit documentation](src/craftCMS/README.md)

[Laravel Starter kit documentation](src/laravel/README.md)

[WordPress Starter kit documentation](src/wordpress/README.md)

[VueJS Starter kit documentation](src/vueJS/README.md)

[Webpack Starter kit documentation](src/webpack/README.md)

[Commons Starter kit documentation](src/commons/README.md)

[Yeoman scarfolding kit documentation](src/yeoman/README.md)

## TODO
* delete git precommit hook ( yeoman one )
* deploiement readme for each stack ( envoyer config )
* for laravel on deploiement prod, document the symlink of .env from / to /src/laravel
* webpack for all project
* Script to check if local machine fits needs and install this
* * findout is local machine have the lastest yeoman installer

## Change logs

1.3.0
- Add Nuxt stack
- Refactor generator and add `src/yeoman/config.js` for common config

1.0.1

- Add WordPress + Twig (Timber) stack to yeoman with a starter theme and few plugins (ACF, Timber). Loads with an default db mapped with the application name
- Add README.md to src/wordpress
