#!/bin/bash
for ((i = 1; i <= 3; i++))
do
    if [ -z "${!i}" ]; then
        echo "No arguments supplied"
        exit 1
    else
        echo "${!i}"
    fi
done
