### 1.5.1

- Add new pull commands including pull-db, pull-assets and combination of both commands into pull-all
  - Those new commands still need to use an argument path for the location of the scripts file inside the VM
  - Later improvement will need to include reading from .env file using variable SCRIPTS_LOCAL_PATH
  Ex. SCRIPTS_LOCAL_PATH="/home/vagrant/mty-collection-epicerie/src/craftCMS/scripts"

- Add stop command that stop current running project
  - Vagrant and Docker supported

### 1.4.12

- Add Server Init pipeline to quickly setup folders structure for new deployment repository
  - This script remove unused folders and add deploy-cache, releases and storage folders used for CraftCMS specificities
  - This sould be run each time a new deployment pipeline needs to be set (This should be run for dev, stage and prod)


### 1.4.11

- Update buddy work deployment file for CraftCMS 3 Stack : It adds more decoupled actions instead of one master action 
for deployment so we now have something like
  - Clone repo
  - Create release
  - Composer install
  - Clear cache
  - Optimized images generation
  - Finalize
  - Slack notification

  It now easier to toggle each actions for desired state, for example you can now disable clear cache or optimized image generation for each deploy.

### 1.4.10

- fix `yo koddein:update`

### 1.4.9

- add koddein docs (wip)
  - some doc about this generator
  - how to install / edit / use
  - about our docs (wip)

### 1.4.7

- Fix generator error due to devDependencie **string** - switched for dependency

### 1.4.6

Fixed

- Package-lock.json missing

### 1.4.5

Added

- Buddy Works configuration-ready pipeline for CraftCMS stack

### 1.4.4

- quick fix for generator
- switch ~~bitbucket~~ to gitlab

### 1.4.3

* improve vue boilerplate
  - fix app init flow - @todo doc
    - create router, init languages, use settings.js...
  - fix i18n - but still don't use `<i18n>` vue components blocks
  - improve mocs (i18n, faker.js...)
  - add news
    - home featuring news
    - collection news page
    - single news page
  - wip pagebuilder (title, quote, spacer)

### 1.4

* refactoring craft-cms stack
  - remove useless folders/files
  - add services methods
  - move extends object
  - remove specific projet files
* add ApiModule

### 1.3.2

* use commons as a template to inject in those stacks (vue, stimulus)
  - so we will update commons for all commons related stuff (webpack, babel, eslint, base stylus...)

### 1.3

* add clean up-to-date stacks
  + common (simple, only to build js/css with livereload etc)
    - [x] create clean (simple) stack
    - [ ] plus this to yeoman
    - [ ] add doc
  + vue
    - stack ready but still have to add yeoman
    - [x] create clean (simple) stack
    - [ ] plus this to yeoman
    - [ ] complete all features (see /src/vue/docs/koddein/todo.md)
    - [ ] add doc
    - [ ] remove ? vueJS (old stack) - or at least rename it

### 1.2

* integrate wordpress stack

### 1.1.2

* ~~yeoman: create a task install~~
* ~~yeoman: create a task boot~~
* ~~yeoman: create a task update~~
* ~~yeoman: check current version~~
* ~~yeoman: save create config as a yo-rc file to save create conf~~
* add yarn commands at project root

### 1.1

* integrate webpack stack at top level
* integrate vueJS yeoman task
* add craftCMS develop plugins in composer.json
* ~~craftCMS deployment documentation~~
* vueJS deployment documentation
* craftCMS/vueJS deployment documentation
* Laravel/vueJS deployment documentation
* Laravel deployment documentation
* start craftCMS stack documentation
* ~~create a bash script to deploy yeoman package automatically~~

### 1.0

* ~~complete yeoman generator task for basic flow~~
* ~~Complete global structure~~

### 0.0.1

- Add git flow process
