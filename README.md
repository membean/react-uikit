# react-uikit

A collection of components with accessibility built in for use in the different Membean React apps.

## How To Use

The library is installed via npm/yarn directly from this private github repo with the following line in your projects `package.json` dependencies:

```bash
git+ssh://git@github.com/membean/react-uikit.git#v0.3.0
```

This assumes that the computer running the yarn/npm install has an ssh key that is valid for our github org.

Once the library is installed, components can be imported using the following:

```js
import { TextInput } from "@membean/react-uikit";
```

## How To Release A New Version

The versions are based on git tags. Once you have made changes to the library that you want to use in another project you will need to cut a new release with the following steps:

1. Make sure you are on the `master` branch and all your changes are committed.
2. Bump the [version](https://github.com/membean/react-uikit/blob/master/package.json#L3) in the `package.json`.
3. [Make a new commit with ONLY the version bump you just made in `package.json` using a commit message that is only the version number.](https://github.com/membean/react-uikit/commit/1e86cf90ac5c80bc042f551020f50541d2af8e45)
4. Run `git tag vx.x.x.` (make sure to include the `v` prefix before the version number on the tag but NOT in the package.json).
5. Push `master` first, then push the tag with `git push origin vx.x.x`.
6. It's helpful to create a new [release](https://github.com/membean/react-uikit/releases) from the github UI describing the changes in the tagged version you just pushed.
7. Lastly, update the version number in the dependent project's package.json, remove the node_modules folder, and rerun npm/yarn install to pull in the latest changes.
