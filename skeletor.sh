#!/bin/bash

# ----------------------------------------------------------------------------
# Script overview:
#     take input PROJECT_NAME if not provided to shell script already
#
#     take input FRONTEND, default = 1
#       FRONTEND_WEB_VUEJS=1
#       FRONTEND_WEB_VUEJS_MOBILE_REACT_NATIVE=2
#
#     git clone master into PROJECT_NAME
#
#     remove mobile dir if FRONTEND_WEB_VUEJS
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


read -p "Please provide a folder/project name: ${green}" PROJECT_NAME
echo "${reset}"

if [[ -z "$PROJECT_NAME" ]]; then
    echo -e "\n${red}${bold}ERROR: PROJECT_NAME is required!${reset}"
    exit 1
fi

# Choose a frontend
cat << EOF

Available frontends:
    ${green}${bold}1. Vue (web only) [recommended/default]${reset}
    2. Vue (web) + React Native (mobile)

EOF

FRONTEND_WEB_VUEJS=1
FRONTEND_WEB_VUEJS_MOBILE_REACT_NATIVE=2

read -p "Please enter your preferred frontend: ${green}" FRONTEND
echo "${reset}"

# Set default to 1 if no input given
FRONTEND=${FRONTEND:-1}

if [[ $FRONTEND -gt 2 ]]; then
    echo -e "\n${red}${bold}ERROR: Invalid FRONTEND choice... must be 1 or 2!${reset}"
    exit 2
fi


# Clone repo
echo "Git cloning into directory ${green}'$PROJECT_NAME'${reset} with frontend choice ${green}#$FRONTEND${reset}"

git clone ~/src/skeletor $PROJECT_NAME &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "\n${red}${bold}ERROR: Failed to clone git repo into ${PROJECT_NAME}${reset}"
    exit 3
fi


# Go to project directory OR exit if fail
cd $PROJECT_NAME || exit 3


# Remove opening of README, before "-------------" line
sed -i '' '1,/^-----------------$/d' README.md

# Replace "SKELETOR_NAME_PLACEHOLDER" with $PROJECT_NAME
grep -rl "SKELETOR_NAME_PLACEHOLDER" . | xargs sed -i "" -e "s@SKELETOR_NAME_PLACEHOLDER@$PROJECT_NAME@g"


# Remove mobile dir if we don't need it
if [[ $FRONTEND == "$FRONTEND_WEB_VUEJS" ]]; then
    rm -rf src/mobile
fi


# Remove Skeletor specific stuff
echo -e "Cleaning up stuff...\n\n"
rm -rf .git
rm -rf docs
rm skeletor.sh


# Run Make
echo -e "\n\n${green}${bold}Running Skeletor make...${reset}\n\n"
make
