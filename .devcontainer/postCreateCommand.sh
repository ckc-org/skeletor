CODESPACE_NAME=$(jq -r ".CODESPACE_NAME" /workspaces/.codespaces/shared/environment-variables.json)

# If we have github CODESPACE_NAME, then do fancy setup stuff..
if [ -n "${CODESPACE_NAME}" ]; then
    echo "!!! Setting up Skeletor codespace debugging"

    # Wait for docker sock to be ready, print period while waiting, time out
    # after 60 seconds
    counter=0
    while ! [[ -e /var/run/docker.sock ]]; do
      if [[ $counter -gt 60 ]]; then
        echo "Timed out waiting for docker socket"
        exit 1
      fi

      counter=$((counter+1))
      printf '.'
      sleep 1
    done

    # Copy env, we'll change it with codespace specific values
    cp .env_sample .env

    CODESPACE_FRONTEND_URL="https://$CODESPACE_NAME-3000.app.github.dev"
    CODESPACE_BACKEND_URL="https://$CODESPACE_NAME-8000.app.github.dev"

    # Write these new values to .env
    sed -i "s|FRONTEND_URL=.*|FRONTEND_URL=$CODESPACE_FRONTEND_URL|g" .env
    sed -i "s|BACKEND_URL=.*|BACKEND_URL=$CODESPACE_BACKEND_URL|g" .env
fi

# Start the project!
make
