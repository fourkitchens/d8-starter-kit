# Require plugins.
local_plugins = ENV['VAGRANT_PLUGINS']

if ("#{local_plugins}" == '' && local_plugins != nil)
  # Nothing
else
  # Define plugins to be installed.
  if (local_plugins != nil)
    required_plugins = local_plugins.split
  else
    required_plugins = %w(vagrant-hostsupdater vagrant-auto_network vagrant-cachier)
  end

  plugin_installed = false
  required_plugins.each do |plugin|
    unless Vagrant.has_plugin?(plugin)
      system "vagrant plugin install #{plugin}"
      plugin_installed = true
    end
  end

  # If new plugins installed, restart Vagrant process
  if plugin_installed === true
     exec "vagrant #{ARGV.join' '}"
  end
end

require 'pathname'
require 'fileutils'
if File.exist?('./config.yml')
  FileUtils.cp('./config.yml', './vendor/geerlingguy/drupal-vm/config.yml');
end
if File.exist?('./local.config.yml')
  FileUtils.cp('./local.config.yml', './vendor/geerlingguy/drupal-vm/local.config.yml');
end
if File.exist?('./Vagrantfile.local')
  FileUtils.cp('./Vagrantfile.local', './vendor/geerlingguy/drupal-vm/Vagrantfile.local');
end

# Load the real Vagrantfile
dir = File.dirname(__FILE__) + '/'
load dir + "vendor/geerlingguy/drupal-vm/Vagrantfile"
