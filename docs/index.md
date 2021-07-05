# General documentation for new_project

## CircleCI testing script
`circle.yml` in the base directory of this project is, by default, built for speed. It does the least possible to get the job of testing done. It is
not set up to run end-to-end tests by default. There is another version of this CircleCI config file in the `docs` directory which builds docker
containers from scratch and includes an easy way to enable selenium tests.
