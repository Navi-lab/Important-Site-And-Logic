require 'base64'

class P1ConfContactInfoController < ApplicationController
 
	skip_before_action :verify_authenticity_token

	def index

		if params[:search_key]

			@contact_info = P1ConfContactInfo.all

		end

		render json: {status: 'SUCCESS', message: 'List of Contact Info', data: @contact_info}, status: :ok
	end

	def show

		@contact_info = P1ConfContactInfo.find(params[:id])

		render json: {status: 'SUCCESS', message: 'Contact Info Details', data: @contact_info}, status: :ok
	end

	def create
		@contact_info = P1ConfContactInfo.new(create_params)

		if @contact_info.save

			render json: {status: 'SUCCESS', message: 'Contact Info is added', data: @contact_info}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Contact Info', data: @contact_info.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@contact_info = P1ConfContactInfo.find(params[:id])

		if @contact_info.update_attributes( update_params)

			render json:{status: 'SUCCESS', message: 'Updated Contact Info', data: @contact_info}, status: :ok
		else
			
			render json:{status: 'ERROR', message: 'Error while updating Contact Info', data: @contact_info.errors},
			status: :unprocessable_entity
		end
	end

	private

	def create_params
		params.permit(	:contact_info_col)
	end

	def update_params
		params.permit(	:contact_info_col )
	end
end 
