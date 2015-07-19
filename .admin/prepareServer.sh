#!/usr/bin/env bash

sudo apt-get install imagemagick
wget download.gna.org/wkhtmltopdf/0.12/0.12.2.1/wkhtmltox-0.12.2.1_linux-trusty-amd64.deb
sudo dpkg wkhtmltox-0.12.2.1_linux-trusty-amd64.deb -i
rm wkhtmltox-0.12.2.1_linux-trusty-amd64.deb
sudo apt-get install -f
sudo npm i jspm -g
