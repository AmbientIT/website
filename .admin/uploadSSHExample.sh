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


##### PARTIE A EXECUTER UNE FOIS ##########
#commande a tapper dans un shell sur ton pc
ssh-keygen -t rsa -b 4096 -f /home/$LUSER/.ssh/AmbientPreProd

#copie cle sur serveur
#mettre le contenu du  fichier sur ton pc : /home/charles/.ssh/AmbientPreProd.pub dans le #fichier du serveur :
#/home/SitePreProd/.ssh/authorized_keys
#Attention cette commande supprime toutes les clés publiques autorisées a se connecter sans mot de passe

scp -P $RPORT  /home/$LUSER/.ssh/AmbientPreProd.pub $RUSER@$RHOST:~/.ssh/authorized_keys
