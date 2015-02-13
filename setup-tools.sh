#!/usr/bin/env bash
apt-get update >/dev/null 2>&1
apt-get install -y curl >/dev/null 2>&1

su - vagrant <<-'EOF'
  gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
  curl -k -L https://get.rvm.io | bash -s stable --ruby
EOF
