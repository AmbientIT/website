#!/bin/sh

#env vars
RSYNC=/usr/bin/rsync
SSH=/usr/bin/ssh
RUSER=cjacquin
LUSER=charl
KEY=/home/$LUSER/.ssh/AmbientProd
RHOST=62.210.107.69
RPORT=25015
RPATH=/home/$RUSER/ambient-it-website

ssh-keygen -t rsa -b 4096 -f /home/$LUSER/.ssh/AmbientProd

scp -P $RPORT  /home/$LUSER/.ssh/AmbientProd.pub $RUSER@$RHOST:~/.ssh/authorized_keys
