# react-uikit

A collection of components with accessibility built in for use in the different Membean React apps.

## How To Use

### Preferred

This library is published to github. You must configure your environment to authenticate to github so that you can `yarn add` or `npm install` this private package from the `@membean` github organization. The best way to do this is to [create a personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) and store it in `~/.npmrc` as described [here](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#authenticating-with-a-personal-access-token).

Once you have completed the previous you should be able to successfully run `yarn add @membean/react-uikit` in the same directory as your `package.json` file.

### Alternative

The library can be installed via npm/yarn directly from this private github repo with the following line in your projects `package.json` dependencies:

```bash
git+ssh://git@github.com/membean/react-uikit.git#v0.14.0
```

Please specify the desired version at the end of the above line.

This assumes that the computer running the yarn/npm install has an ssh key that is valid for our github org.

Once the library is installed, components can be imported using the following:

```js
import { TextInput } from "@membean/react-uikit";
```

### Demo Page

To view demos of all the available components you can run the following to open a test page:

1. `yarn install`
2. `yarn start`
3. Navigate to localhost:3000

---

## How To Release A New Version

### Using `standard-version` with github packages (Preferred)

[Standard-version](https://github.com/conventional-changelog/standard-version) is a library that helps with standardizing releases. It is responsible for creating the git tag, git release and updating the changelog with the commits since the previous release. Assuming you are authenticated to github packages with a personal access token in `~/.npmrc` as described above you can follow these steps to publish a new version:

1. Make sure you are on the `master` branch and all your changes are committed.
2. Run `npx standard-version --dry-run` to do a dry run and verify the new package looks correct. (If you are prompted to install `standard-version` please do so)
3. If everything look correct, run `npx standard-version -r minor`. (Replace "minor" with whatever the release is (major|minor|patch)).
4. After the script runs you will be prompted to finalize the release by running `git push --follow-tags origin master && npm publish`.
5. You can now check Github and confirm you see the new package in the "packages" section of the repository.

### Manually tagging and releasing a new version

The versions are based on git tags. Once you have made changes to the library that you want to use in another project you will need to cut a new release with the following steps:

1. Make sure you are on the `master` branch and all your changes are committed.
2. Bump the [version](https://github.com/membean/react-uikit/blob/master/package.json#L3) in the `package.json`.
3. [Make a new commit with ONLY the version bump you just made in `package.json` using a commit message that is only the version number.](https://github.com/membean/react-uikit/commit/1e86cf90ac5c80bc042f551020f50541d2af8e45)
4. Run `git tag vx.x.x.` (make sure to include the `v` prefix before the version number on the tag but NOT in the package.json).
5. Push `master` first, then push the tag with `git push origin vx.x.x`.
6. It's helpful to create a new [release](https://github.com/membean/react-uikit/releases) from the github UI describing the changes in the tagged version you just pushed.
7. Lastly, update the version number in the dependent project's package.json, remove the node_modules folder, and rerun npm/yarn install to pull in the latest changes.

---

## Local Development

### Using Yarn Link

Yarn link is a tool for locally linking packages using npm. For example, you can have local changes to components in the `react-uikit` and have the `membean` repository use a symlink in `node_modules` to point `@membean/react-uikit` to the local version of the library. This is especially useful when you are making a lot of small changes and want to see them reflected in project immediately.

1. Make sure you build/rebuild the library after any changes using `yarn build`.
2. Run `yarn link` in this repository on your machine.
3. In the membean repository run `yarn link @membean/react-uikit`.
4. Restart `webpack-dev-server` if it is running.
5. Whenever you want to see changes update in the UI just re-run `yarn build` in the uikit repositiory.
6. When finished make sure to run `yarn unlink @membean/react-uikit` to remove the symlink to the local repository.

### Publish Beta Versions

If you wish to publish beta releases and install them in other packages you can do so with the following steps:

1. Update the `version` in `package.json` to have the following suffix `-beta.0`.
2. Run `yarn build` after you have made the changes.
3. Run `npm publish --beta`.
4. You can now run `yarn add @membean/react-uikit@0.14.1-beta.0` in other repositories.
