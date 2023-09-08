#!/bin/bash


#
#
#    ▄████████    ▄█   ▄█▄    ▄████████  ▄█          ▄████████     ███      ▄██████▄     ▄████████
#   ███    ███   ███ ▄███▀   ███    ███ ███         ███    ███ ▀█████████▄ ███    ███   ███    ███
#   ███    █▀    ███▐██▀     ███    █▀  ███         ███    █▀     ▀███▀▀██ ███    ███   ███    ███
#   ███         ▄█████▀     ▄███▄▄▄     ███        ▄███▄▄▄         ███   ▀ ███    ███  ▄███▄▄▄▄██▀
# ▀███████████ ▀▀█████▄    ▀▀███▀▀▀     ███       ▀▀███▀▀▀         ███     ███    ███ ▀▀███▀▀▀▀▀
#          ███   ███▐██▄     ███    █▄  ███         ███    █▄      ███     ███    ███ ▀███████████
#    ▄█    ███   ███ ▀███▄   ███    ███ ███▌    ▄   ███    ███     ███     ███    ███   ███    ███
#  ▄████████▀    ███   ▀█▀   ██████████ █████▄▄██   ██████████    ▄████▀    ▀██████▀    ███    ███
#                ▀                      ▀                                               ███    ███
#
# Usage:
#
#    $ bash <(curl -fsSL https://skeletor.ckcollab.com)
#
#
# Environment variables:
#    SKELETOR_BRANCH: the branch name to use when cloning from Skeletor git repo, default = master
#


# ----------------------------------------------------------------------------
# Script overview:
#     make sure docker is running
#
#     take input PROJECT_NAME if not provided to shell script already
#
#     take input FRONTEND, default = 1
#       FRONTEND_WEB_VUEJS=1
#       FRONTEND_WEB_VUEJS_MOBILE_REACT_NATIVE=2
#
#     git clone master into PROJECT_NAME
#
#     if FRONTEND_WEB_VUEJS then remove mobile dir
#
#     replace {{ project_name }} with PROJECT_NAME
#
#     remove readme top section
#
#     run make (django, vue, react native setup done here)
#
# ----------------------------------------------------------------------------



# default to cat
fancy_print_command=cat

# or if we have lolcat, use that!
if command -v lolcat &> /dev/null
then
    fancy_print_command=lolcat
fi

black=`tput setaf 0`
red=`tput setaf 1`
green=`tput setaf 2`
magenta=`tput setaf 5`
cyan=`tput setaf 6`
white=`tput setaf 7`


bold=`tput bold`
dim=`tput dim`
reset_standout=`tput rmso`
white_bg=`tput setab 7`
underline=`tput smul`

reset=`tput sgr0`






cat << EOF
${red}
   ▄████████    ▄█   ▄█▄    ▄████████  ▄█          ▄████████     ███      ▄██████▄     ▄████████
  ███    ███   ███ ▄███▀   ███    ███ ███         ███    ███ ▀█████████▄ ███    ███   ███    ███
  ███    █▀    ███▐██▀     ███    █▀  ███         ███    █▀     ▀███▀▀██ ███    ███   ███    ███
  ███         ▄█████▀     ▄███▄▄▄     ███        ▄███▄▄▄         ███   ▀ ███    ███  ▄███▄▄▄▄██▀
▀███████████ ▀▀█████▄    ▀▀███▀▀▀     ███       ▀▀███▀▀▀         ███     ███    ███ ▀▀███▀▀▀▀▀
         ███   ███▐██▄     ███    █▄  ███         ███    █▄      ███     ███    ███ ▀███████████
   ▄█    ███   ███ ▀███▄   ███    ███ ███▌    ▄   ███    ███     ███     ███    ███   ███    ███
 ▄████████▀    ███   ▀█▀   ██████████ █████▄▄██   ██████████    ▄████▀    ▀██████▀    ███    ███
               ▀                      ▀                                               ███    ███

EOF

$(echo $fancy_print_command) << EOF
 --------------------------------------------------------------------------- ${white}${dim}made with ❤️  by ${reset_standout}${cyan}C${white}k${magenta}c ${reset}


EOF

# Setup cross platform helper functions
cross_platform_sed() {
    # The first argument is the sed expression
    local expr="$1"
    shift  # Remove the first argument from $@

    # Detect the OS
    local OS=$(uname)

    if [ "$OS" = "Darwin" ]; then  # macOS
        sed -i '' "$expr" "$@"
    elif [ "$OS" = "Linux" ]; then  # Linux
        sed -i "$expr" "$@"
    else
        echo "Unsupported OS: $OS"
        exit 1
    fi
}

# Make sure Docker is running first..
if ! docker info > /dev/null 2>&1; then
  echo -e "\n${red}${bold}ERROR: This script uses docker, and docker isn't running - please start docker and try again!${reset}"
  exit 4
fi

# Get user input
read -p "Please provide a folder/project name: ${green}" PROJECT_NAME
echo "${reset}"

if [[ -z "$PROJECT_NAME" ]]; then
    echo -e "\n${red}${bold}ERROR: PROJECT_NAME is required!${reset}"
    exit 1
fi

# Choose a frontend
cat << EOF
${underline}Available frontends:${reset}
    ${green}${bold}1. Vue (web only) [recommended/default]${reset}
    2. Vue (web) + React Native (mobile)

EOF

FRONTEND_WEB_VUEJS=1
FRONTEND_WEB_VUEJS_MOBILE_REACT_NATIVE=2

read -p "Please select your preferred frontend: ${green}" FRONTEND
echo "${reset}"

# Set default to 1 if no input given
FRONTEND=${FRONTEND:-1}

if [[ $FRONTEND -gt 2 ]]; then
    echo -e "\n${red}${bold}ERROR: Invalid FRONTEND choice... must be 1 or 2!${reset}"
    exit 2
fi

# Select skeletor branch, default is master
: "${SKELETOR_BRANCH:=master}"

# Clone repo into $PROJECT_NAME dir
echo -e "Git cloning from branch $SKELETOR_BRANCH into directory ${green}'$PROJECT_NAME'${reset} with frontend choice ${green}#$FRONTEND${reset}\n"

git clone -b $SKELETOR_BRANCH https://github.com/ckc-org/skeletor.git $PROJECT_NAME &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "\n${red}${bold}ERROR: Failed to clone git repo into directory ${underline}${PROJECT_NAME}${reset}"
    exit 3
fi


# Go to project directory OR exit if fail
cd $PROJECT_NAME || exit 3


# Remove opening of README, before "---" line
cross_platform_sed '1,/^---$/d' README.md

# Replace "SKELETOR_NAME_PLACEHOLDER" with $PROJECT_NAME
grep -rl "SKELETOR_NAME_PLACEHOLDER" . | xargs cross_platform_sed -e "s@SKELETOR_NAME_PLACEHOLDER@$PROJECT_NAME@g"


# Remove mobile dir if we don't need it
if [[ $FRONTEND == "$FRONTEND_WEB_VUEJS" ]]; then
    rm -rf src/mobile
fi


# Remove Skeletor specific stuff
echo -e "Cleaning up stuff...\n"
rm -rf .git
rm -rf docs
rm skeletor.sh
rm LICENSE
rm .github/workflows/skeletor_test.yml

# Run Make
echo -e "Running Skeletor make...\n"

make

echo -e "\n${green}${bold}Done!${reset}"
