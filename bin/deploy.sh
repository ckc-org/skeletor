#!/usr/bin/env bash
build_flag='true'

optspec=":-:"
while getopts "$optspec" optchar; do
    case "${optchar}" in
        -)
            case "${OPTARG}" in
                dont-build)
                    build_flag='false'
                    ;;
                *)
                    echo "Unknown option --${OPTARG}" >&2
                    ;;
            esac;;
        h)
            echo "usage: $0 [--dont-build]" >&2
            exit 2
            ;;
        *)
            if [ "$OPTERR" != 1 ] || [ "${optspec:0:1}" = ":" ]; then
                echo "Non-option argument: '-${OPTARG}'" >&2
            fi
            ;;
    esac
done

# build by default, pass --dont-build to not build
if [[ $build_flag == 'true' ]]; then
    docker-compose up -d --build
else
    docker-compose up -d
fi

# build assets
docker-compose exec builder npm run generate

# setup database and gather assets; make sure we run this _after_ building frontend assets
docker-compose exec django ./manage.py collectstatic --noinput
docker-compose exec django ./manage.py migrate
