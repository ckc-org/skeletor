#!/bin/sh
dir=$(pwd)
hooks_dir=${dir}/git_hooks/
FILES=${hooks_dir}*
for f in ${FILES}
    do
    mkdir -p .git/hooks/
    ln -s "${hooks_dir}${f##*/}" "${dir}/.git/hooks/${f##*/}"
    chmod +x "${hooks_dir}${f##*/}"
    echo "Creating symlink for hook(s): ${f##*/}"
done
