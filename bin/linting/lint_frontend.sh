eslint "$@" --ext .js,.vue,.ts --ignore-path .gitignore
eslint_status=$?

echo "ESLint status: $eslint_status"

# Check the exit status of ESLint
if [ $eslint_status -ne 0 ]; then
    echo "Linting errors detected"
    exit 1
fi

exit 0
