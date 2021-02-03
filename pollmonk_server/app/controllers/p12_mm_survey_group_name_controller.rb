require 'base64'  

class P12MmSurveyGroupNameController < ApplicationController
 
	skip_before_action :verify_authenticity_token

	def index

		if params[:survey_id]

			@sur_group = P12MmSurveyGroupName.where("survey_id = ?", Base64.decode64(params[:survey_id])).order('group_name')
		end

		render json: {status: 'SUCCESS', message: 'List of Survey Category', data: @sur_group}, status: :ok
	end

	def show

		@sur_group = P12MmSurveyGroupName.find(Base64.decode64(params[:id]))

		render json: {status: 'SUCCESS', message: 'Survey Category Details', data: @sur_group}, status: :ok
	end

	def create
		@sur_group = P12MmSurveyGroupName.new(create_params)

		if @sur_group.save

			render json: {status: 'SUCCESS', message: 'Survey Category is added', data: @sur_group}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Survey Category', data: @sur_group.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@sur_group = P12MmSurveyGroupName.find(Base64.decode64(params[:id]))

		if @sur_group.update_attributes(update_params)

			render json:{status: 'SUCCESS', message: 'Updated Survey Category', data: @sur_group}, status: :ok
		else

			render json:{status: 'ERROR', message: 'Error while updating Survey Category', data: @sur_group.errors},
			status: :unprocessable_entity
		end
	end
	
	def destroy
	
		@sur_group = P12MmSurveyGroupName.find(Base64.decode64(params[:id]))

		if @sur_group.destroy
		
			render json:{status: 'SUCCESS', message: 'Deleted survey group', data: @sur_group}, status: :ok
		else

			render json:{status: 'ERROR', message: 'Error while deleting survey group', data: @sur_group.errors},
			status: :unprocessable_entity
		end	
	end 

	private

	def create_params
		params.permit(	:survey_id,
						:group_name )
	end

	def update_params
		params.permit(	:survey_id,
						:group_name )
	end
end 
