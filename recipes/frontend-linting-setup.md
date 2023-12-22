# Frontend Linting Setup

---
Some notes:
- Using eslint to catch errors/bad patterns. Config file: `/src/frontend/.eslintrc.js`
- Using prettier to format code. Config file: `/src/frontend/.prettierrc`
- Custom git hooks defined in `/bin/hooks/`. This formats and lints the code prior to committing.

---

## Git Commit Hook Setup:

Get into hooks directory:
```
cd .git/hooks
```
Sync custom hook with git: 
```
ln -s ../../bin/git_hooks/pre-commit pre-commit
```
Go back to project root and make hook executable:
```
cd ..; cd ..; chmod +x bin/git_hooks/pre-commit
```
Ensure it works by running
```
ls -l .git/hooks
```
You should see pre-commit hook listed there.


Now a couple more files we need to make executable. 
From root of project run:
```
 chmod +x ./bin/linting/format_frontend.sh  
```
```
 chmod +x ./bin/linting/lint_frontend.sh  
```


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
