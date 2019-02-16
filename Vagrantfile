# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"

  config.vm.network "forwarded_port", guest: 3000, host: 8080, host_ip: "127.0.0.1"

  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
    echo 'LC_ALL=en_US.UTF-8' >> /etc/environment
    echo 'LANG=en_US.UTF-8' >> /etc/environment
  SHELL
  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
  SHELL
end
