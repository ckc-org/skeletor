#!/bin/sh
dir=$(pwd)
hooks_dir=${dir}/git_hooks/
FILES=${hooks_dir}*
for f in $FILES
    do
    ln -s "${hooks_dir}${f##*/}" "${dir}/.git/hooks/${f##*/}"
    echo "Creating symlink for hook(s): ${f##*/}"
done
