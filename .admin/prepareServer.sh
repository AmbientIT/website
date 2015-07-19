#!/usr/bin/env bash
su
apt-get install imagemagick
wget download.gna.org/wkhtmltopdf/0.12/0.12.2.1/wkhtmltox-0.12.2.1_linux-trusty-amd64.deb
dpkg wkhtmltox-0.12.2.1_linux-trusty-amd64.deb
rm wkhtmltox-0.12.2.1_linux-trusty-amd64.deb
apt-get install -f
