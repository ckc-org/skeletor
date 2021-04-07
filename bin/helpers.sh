#!/usr/bin/env bash

# Usage:
# SKELETOR_VERSION=$(get_skeletor_master_sha)
function get_skeletor_master_sha() {
    echo $(
        curl -s 'https://api.github.com/repos/ckc-org/skeletor/git/trees/master' | \
            python -c "import sys, json; print(json.load(sys.stdin)['sha'])"
    )
}
