require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module PollmonkServer
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
	
	#Rails.logger = Logger.new("log/#{Rails.env}.log")
  
	#config.logger = ActiveSupport::Logger.new("log/#{Rails.env}.log")
  
	Rails.application.config.session_store :cookie_store, key: '_monk_cookie'
	
  end
end
