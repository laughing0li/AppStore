#!/bin/bash

# Script to start up Apache
#
# Apache serves the main website static files

# Start up apache
/usr/sbin/apache2ctl -D FOREGROUND
