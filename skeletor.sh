#!/bin/bash

# ----------------------------------------------------------------------------
# Script overview:
#     take input PROJECT_NAME if not provided to shell script already
#
#     take input PREFERRED_FRONTEND, default = 1
#       PREFERRED_FRONTEND_WEB_VUEJS=1
#       PREFERRED_FRONTEND_WEB_VUEJS_MOBILE_REACT_NATIVE=2
#
#     git clone master into PROJECT_NAME
#
#     remove mobile dir if PREFERRED_FRONTEND_WEB_VUEJS
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



#cat << EOF
#
#
#Please provide a folder/project name:
#
#
#EOF

read -p "Please provide a folder/project name: ${green}" PROJECT_NAME
echo "${reset}"

if [[ -z "$PROJECT_NAME" ]]; then
    echo -e "\n${red}${bold}ERROR: PROJECT_NAME is required!${reset}"
    exit 1
fi

cat << EOF

Available frontends:
    ${green}${bold}1. Vue (web only) [recommended/default]${reset}
    2. Vue (web) + React Native (mobile)

EOF

PREFERRED_FRONTEND_WEB_VUEJS=1
PREFERRED_FRONTEND_WEB_VUEJS_MOBILE_REACT_NATIVE=2

read -p "Please enter your preferred frontend: ${green}" PREFERRED_FRONTEND
echo "${reset}"

# Set default to 1 if no input given
PREFERRED_FRONTEND=${PREFERRED_FRONTEND:-1}

if [[ $PREFERRED_FRONTEND -gt 2 ]]; then
    echo -e "\n${red}${bold}ERROR: Invalid PREFERRED_FRONTEND choice... must be 1 or 2!${reset}"
    exit 2
fi

if [[ $PREFERRED_FRONTEND == 2 ]]; then
    echo -e "\n${red}${bold}ERROR: Fake out, we don't support React Native in skeletor yet ...!${reset}"
    exit 2
fi

echo "Git cloning into directory ${green}'$PROJECT_NAME'${reset} with frontend choice ${green}#$PREFERRED_FRONTEND${reset}"

git clone https://github.com/ckc-org/skeletor.git $PROJECT_NAME &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "\n${red}${bold}ERROR: Failed to clone git repo into ${PROJECT_NAME}${reset}"
    exit 3
fi

# remove mobile dir if PREFERRED_FRONTEND_WEB_VUEJS

# replace {{ project_name }} shit

# remove readme top section

# go into folder and run make

# make should do all the stuff necessary for react, react native


