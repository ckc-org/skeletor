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
3. Configure the path to Prettier (usually it's in your `node_modules/.bin/prettier` in your project directory).
4. Check `Run on save` and `Run on 'Reformat Code' action` options 

#### Enable Prettier on Save:

- In the same Prettier settings window, check the option **On code reformat** and **On save**. This will ensure that Prettier formats your files when you save them or when you manually reformat your code.

#### Apply and Close:

- Click **Apply** and then **OK** to close the settings and save your configuration.
