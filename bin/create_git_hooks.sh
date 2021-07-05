#!/bin/sh

# This is executed from the root repo dir usually

for f in ./bin/git_hooks/*
do
    mkdir -p .git/hooks/
    echo "making git hook -> ${f} into .git/hooks/${f##*/}"
    ln -sf "${f}" ".git/hooks/${f##*/}"
done
