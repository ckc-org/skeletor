#!/bin/bash

# default to cat
print_command=cat

# or if we have lolcat, use that!
if command -v lolcat &> /dev/null
then
    print_command=lolcat
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






$(echo $print_command) << EOF
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

                                                                            ${white}${dim}made with ❤️  by ${reset_standout}${cyan}C${white}k${magenta}c ${reset}





Please select your preferred frontend..
    ${green}${bold}1. Vue [recommended/default]${reset}
    2. React
    3. React + react native


EOF

# take input
# default 1, if no input
# set branch name from input
# get project folder name from input
# git clone branch INTO NEW FOLDER NAME
# replace {{ project_name }} shit
# go into folder and run make
# make should do all the stuff necessary for react, react native


