#!/bin/sh

#env vars
RSYNC=/usr/bin/rsync
SSH=/usr/bin/ssh
RUSER=remoteUser
LUSER=localUser
KEY=pathTosshKey
RHOST=remoteHost
RPORT=remotePort
RPATH=remotePath


ssh-keygen -t rsa -b 4096 -f /home/$LUSER/.ssh/AmbientPreProd

#Attention cette commande supprime toutes les clés publiques autorisées a se connecter sans mot de passe

scp -P $RPORT  /home/$LUSER/.ssh/AmbientPreProd.pub $RUSER@$RHOST:~/.ssh/authorized_keys
