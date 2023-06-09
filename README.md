# Flyo

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

```sh


git init
git add .
git commit -m "your commit"
git remote add origin https://github.com/RoeeFurman/Fyloo.git

# go to vite.config.js file and set base to your repo name

export default defineConfig({
base: '/YOUR_REPO_NAME',
...
})
# remove the dist directory from the project’s .gitignore file


# run the build command
npm run build

# make sure git knows about your subtree (the subfolder with your site).
git add dist
git commit -m "Initial dist subtree commit"

# use subtree push to send it to the gh-pages branch on GitHub
git subtree push --prefix dist origin gh-pages
​
# Boom. If your folder isn’t called dist, then you’ll need to change that in each of the commands above.
```

# source: https://gist.github.com/cobyism/4730490

```sh
# Deploy to vercel

## First login to vercel
vercel login # (choose github login)

## deploy
vercel

# if you want to upload a newer version
vercel --prod
```
