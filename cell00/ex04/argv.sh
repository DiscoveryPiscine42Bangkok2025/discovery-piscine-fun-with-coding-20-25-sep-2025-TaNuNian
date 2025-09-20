#!/bin/bash
for ((i = 1; i <= 3; i++))
do
    if [ ! -z "${!i}" ]; then
        echo "${!i}"
    fi
done
