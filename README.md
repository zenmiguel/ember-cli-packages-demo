# ember-cli-packages-demo

This is a demo and reference implementation for a way of building Ember Apps prior by breaking app.[js|css] into smaller packages that can be lazy loaded. For now, the demo only does the different packages, but will be expandaded soon to also do lazy loading. 

*Note:* there is a ton of overlap with the work being done for * [ember engines](https://github.com/dgeb/ember-engines). While you might find this interesting, I strongly recommend you NOT to use this techniques and instead wait for ember-engines unless you're really desperate (like I am) to get lazy loading. 

## Current Ember Apps

The typical output of an Ember App looks something like: 

- dist/
  - index.html
  - assets/
    app.js
    app.css
    vendor.js
    vendor.css

## Output of Packages  

- dist/
  - index.html
  - assets/
    boot.js
    boot.css
    package1.js
    package1.css
    package2.js
    package2.css
    vedor.js*
    vendor.csss

\* In the future we might also break vendor into different packages. For example: 

* vendor-stable, to get better caching of vendor libs rarely revved, like Ember or jQuery. 
* vendor-boot, the minimum necessary to boot the app. Hopefully this file would be empty and boot only requires vendor-stable. 
* vendor, everything else. 

The vendor split is important as well since is common to have an internal addon that is really volatile and would invalidate your cache during daily deployments.  

*Note* this demo doesn't do the vendor split yet. 

## How it works

This demo tweaks ember-cli-build to create multiple EmberApps for each package, each of them will have its output. For each package, it also changes certain to avoid unnecessary processing of addons to get faster builds for packages. 

### Dev File Structure

At the top level, this is the traditional `ember-app` which will turn into boot. Only put here anything that is strictly required to get to the first page or maybe even just the shell of your app or whatever is more important for a first time load. For example, your login page, the navbar or maybe a home page. Each app will have different requirements, but the guidance is to keep it small. Initializers also have to be here since packages won't be available when we creat the app. 

At the top level, we have a new "packages" folder. In the future they might become engines and the idea is to move away from this structure into whatever the engine structure ends up being. Each package is an ember-app, with the exception of initializers. By convention. 

Tests. Currently, all tests live under the traditional folders. However, in the future, tests for a package will move under each package folder. 

### JS

All the JS modules are namespaced with the package name. For example, the route defined in `package1/routes/package1.js` is defined as `define('package1/routes/package1'` in the output code. This is because that's simply the name of the app when building. That gives us the advantage of being explicit about the way we consume and refer to code. However, this also requires a new resolver that can lookup for routes under the packages see (`app/resolvers/packages.js`). 

#### Potential issues

The config/environment lives under `[modulePrefix]/config/environment`, which means it has the same path for every package. This is fine in most cases except if you're plannign to share your packages across applications. 


### CSS 

This demo uses ember-cli-sass, but the same tecnique would work with vanilla CSS (but please use a pre-processor) or Less. Is not tested with postCSS, but I guess it will just work. 

### Code generators

This is just a demo and I won't get to write a generator, but if this was a real thing we would be able to `ember generate package new-package-name`. For now, just create a folder and start writing components, routes, etc. Packages get auto-resolved. Also, all the OOB generators could take a parameter to specify the package, something like `ember generate component new-component --package package1`. 

### Bundling packages

[TODO:] this will be implemented soon. I recommend splitting the packages based on functional areas of your application or volatility. While that makes sense when distributing work across teams, it might not be the best way to serve the assets. There's an additional bundle step that will grab the output of two packages and concatenate them together. We will have a configuration file to define the bundles, which will also generate metadata for the lazy-loader to know what bundle to load. 

## Prerequisites

* [Ember CLI](http://www.ember-cli.com/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

This is just a demo for packaging ember apps, for now it's not deployed anywhere, please run it locally. 

## Further Reading / Useful Links

* [ember engines](https://github.com/dgeb/ember-engines)
* [ember packager](https://github.com/chadhietala/ember-cli-packager)
