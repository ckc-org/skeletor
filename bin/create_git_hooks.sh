#!/bin/sh

# This is executed from the root repo dir usually
echo '🪝 Setting up git hooks 🪝'

for f in ./bin/git_hooks/*
do
    mkdir -p .git/hooks/

    # get filename from full path
    filename=$(basename -- "$f")

#    echo "Linking git hook -> ${f} to .git/hooks/${filename}"
    ln -sf "../../bin/git_hooks/${filename}" ".git/hooks/${filename}"


    # Make our hooks executable
    if [ "$filename" = "pre-commit" ] || [ "$filename" = "pre-push" ] || [ "$filename" = "post-merge" ]; then
        chmod +x "$f"
        echo "Setting up: ${f}"
    fi

done


# Make other necessary files executable
chmod +x ./bin/linting/format_frontend.sh
chmod +x ./bin/linting/lint_frontend.sh

# Verify setup
if [ "$(ls -l .git/hooks/)" ]; then
    echo "✅ Git hooks setup complete!"
else
    echo "❌ Git hooks setup failed!"
    exit 1
fi
