#!/bin/sh
dir=$(pwd)
hooks_dir=${dir}/bin/git_hooks/
FILES=${hooks_dir}*
for f in ${FILES}
    do
    mkdir -p .git/hooks/
    ln -sf "${hooks_dir}${f##*/}" "${dir}/.git/hooks/${f##*/}"
    echo "Creating symlink for hook(s): ${f##*/}"
done
