if Object.const_defined?('NewGoogleRecaptcha')
  NewGoogleRecaptcha.setup do |config|
    config.site_key   = "6LepdbQUAAAAAKMBun1tx8du_CzRy62Gj5tDns0O"
    config.secret_key = "6LepdbQUAAAAAFbwdrWDhQxXN9zaXNr9xFNmgbQw"
    config.minimum_score = 0.5
  end
end
