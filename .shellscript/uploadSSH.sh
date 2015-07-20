#!/bin/sh

#env vars
RSYNC=/usr/bin/rsync
SSH=/usr/bin/ssh
RUSER=SitePreProd
LUSER=charl
KEY=/home/$LUSER/.ssh/AmbientPreProd
RHOST=ambientpreprod.cloudapp.net
RPORT=25015
RPATH=/home/$RUSER/ambient-it-website

ssh-keygen -t rsa -b 4096 -f /home/$LUSER/.ssh/AmbientPreProd

scp -P $RPORT  /home/$LUSER/.ssh/AmbientPreProd.pub $RUSER@$RHOST:~/.ssh/authorized_keys
