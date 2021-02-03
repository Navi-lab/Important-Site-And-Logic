class P1ConfSurCategoryController < ApplicationController
 
	skip_before_action :verify_authenticity_token

	def index

		if params[:search_key]

			@sur_category = P1ConfSurCategory.where("lower(survey_category) like lower(\'%" + params[:search_key] + "%\')")

		else

			@sur_category = P1ConfSurCategory.where("status='Active'")
			
			#@sur_category = P1ConfSurCategory.where("status='Active' and survey_category in (select distinct(survey_category) from p12_mm_templates)")

		end

		render json: {status: 'SUCCESS', message: 'List of Survey Category', data: @sur_category}, status: :ok
	end

	def show

		@sur_category = P1ConfSurCategory.find(params[:id])

		render json: {status: 'SUCCESS', message: 'Survey Category Details', data: @sur_category}, status: :ok
	end

	def create
		@sur_category = P1ConfSurCategory.new(create_params)

		if @sur_category.save

			render json: {status: 'SUCCESS', message: 'Survey Category is added', data: @sur_category}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Survey Category', data: @sur_category.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@sur_category = P1ConfSurCategory.find(params[:id])

		if @sur_category.update_attributes( update_params)

			render json:{status: 'SUCCESS', message: 'Updated Survey Category', data: @sur_category}, status: :ok
		else

			#logger.error "ERROR: P1ConfSurCategory Create: #{@sur_category.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Survey Category', data: @sur_category.errors},
			status: :unprocessable_entity
		end
	end

	private

	def create_params
		params.permit(	:survey_category,
						:img_url )
	end

	def update_params
		params.permit(	:survey_category,
						:status )
	end
end 
