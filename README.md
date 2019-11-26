# MonstaDex

## installation
####NPM (Node Package Manager)
```bash
## install npm on our computer
# then we can run the command 
--
npm install
--
## which will install all our packages and dependencies 
# listed in the package.json file
```
#### PIP (PIP Installs Packages)
```bash
## We will need to install our project dependencies
# for python with pip - so install that if it's not
--
pip install -r requirements.txt
--

```
#### Set up Django!
```bash
## You will need to migrate
--
python manage.py migrate
--
```

```bash
## then create a super user:
--
python manage.py createsuperuser
--
```
```bash
## Now serve the webpage up to your localhost
--
python manage.py runserver
--
 ```

```html
can now view http://localhost:8000
```


```html
The HTML files we will be modifying/editing will be found in 
'src/templates/'
The 'base.html' file is where we will put our tags, and our header

Once it is up and running, 
we should go to localhost:8000/cms/ to edit our content!

```