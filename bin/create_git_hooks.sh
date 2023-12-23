#!/bin/sh

# This is executed from the root repo dir usually

for f in ./bin/git_hooks/*
do
    mkdir -p .git/hooks/

    # get filename from full path
    filename=$(basename -- "$f")

    echo "making git hook -> ${f} into .git/hooks/${filename}"
    ln -sf "../../bin/git_hooks/${filename}" ".git/hooks/${filename}"
done
