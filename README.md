# truth-project

## What is Trust Project 

Trust Project is a service that allows you to generate a new identity.
This service use several APIs to generate personal information and our algorithms process them to make a credible profile.

## Why use trust project 

Nowadays it is quite impossible to be anonymous on the internet.
One solution is to create new profile and use them to hide your activity.
Trust project help you to create such credible profile.

## How to access trust project

You can access to our last release [here](https://truth-project.herokuapp.com)

## How to run it

You can run it by yourself with docker or without.
First clone this repository in a local folder.
Then open a terminal in this folder.

### Without docker

- ``` npm install ```
- ``` npm run dev ```
- *note: be sure to have npm installed on your computer* 

### With docker

- ``` docker build -t image_name . ```
- *note: replace image_name by the name you want*
- ``` docker run -p 8080:8080 --env PORT=8080 image_name ```
- *note: replace image_name by the name you put before*

### Access it

In both cases you can access it on [localhost:8080](http://localhost:8080)

## Developer section

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Compile and Minify for Production

```sh
npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
