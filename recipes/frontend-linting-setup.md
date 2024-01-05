# Frontend Linting Setup

---
Some notes:
- Using eslint to catch errors/bad patterns. Config file: `/src/frontend/.eslintrc.js`
- Using prettier to format code. Config file: `/src/frontend/.prettierrc`
- Custom git hooks defined in `/bin/hooks/`. This formats and lints the code prior to committing.

---
## Lint on save setup:

### Pycharm:

#### Configure Prettier in PyCharm:

1. Go back to **Settings/ Preferences**.
2. Navigate to **Languages & Frameworks > JavaScript > Prettier**.
3. Configure the path to Prettier (`node_modules/.bin/prettier`).
4. Check `Run on save` and `Run on 'Reformat Code' action` options (you may need to restart your IDE for this to work)

#### Enable Prettier on Save:

- In the same Prettier settings window, check the option **On code reformat** and **On save**. This will ensure that Prettier formats your files when you save them or when you manually reformat your code.

#### Apply and Close:

- Click **Apply** and then **OK** to close the settings and save your configuration.


### VSCode:

#### Install Prettier Extension:

1. Open VSCode.
2. Go to the Extensions view by clicking on the square icon on the sidebar or press `Ctrl+Shift+X`.
3. Search for `Prettier - Code formatter` in the Extensions view search bar.
4. Click on the Install button to install the Prettier extension.

#### Configure Prettier in VSCode:

1. Open your project folder in VSCode.
2. Go to **File > Preferences > Settings** (or press `Ctrl+,`).
3. In the search bar at the top, type `Prettier`.
4. Configure the path to Prettier (`node_modules/.bin/prettier`).

#### Enable Prettier on Save:

- Still in the Settings, search for `Editor: Format On Save` and make sure it's checked.
- OPTIONAL: Customize this behavior per language by searching for `"[language]": { "editor.formatOnSave": true }`, replacing `[language]` with a specific language like `javascript` or `typescript`.

#### Apply and Close:

- Close the Settings tab to apply your configurations.


