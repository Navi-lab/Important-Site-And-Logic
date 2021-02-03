class ApplicationController < ActionController::Base
	
	protect_from_forgery with: :null_session
	
	before_action :configure_permitted_parameters, if: :devise_controller?
	
	protected

	def configure_permitted_parameters
	
		devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
	end
	
	def login_required
	
		if !current_user
		
			respond_to do | format|
				
				format.html{
				
					redirect_to '/users/sign_in'
					
				}
				
				format.html{
				
					render :json => { 'error'=> 'Access Denied' }.to_json
					
				}
			end
		end	
	end
	
end
