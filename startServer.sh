#!/bin/bash
# My script to call run server on ip address and open corresponding server page
clear;
a=$(ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}');
echo $a;
/usr/bin/google-chrome-stable "http://$a:8080/ITunes_Lab";
/bin/bash /usr/local/share/jboss/bin/standalone.sh -Djboss.bind.address="$a" -Djboss.bind.address.management="$a";



