require 'base64'

class P1ConfAnswerController < ApplicationController
 
	skip_before_action :verify_authenticity_token

	def index

		if params[:ans_abbr]

			@answers = P1ConfAnswer.select("answer_abbr").distinct

		end

		if params[:par_ans_abbr]

			@answers = P1ConfAnswer.select("id, answer, ans_scale").where("answer_abbr = ? and ans_scale = (select max(ans_scale) from p1_conf_answers where answer_abbr = ?)", Base64.decode64(params[:par_ans_abbr]), Base64.decode64(params[:par_ans_abbr]))

		end
		
		if params[:par_scale] && params[:par_ans_abbr]

			@answers = P1ConfAnswer.select("id, answer, ans_scale").where("answer_abbr = ? and ans_scale = ?", Base64.decode64(params[:par_ans_abbr]), Base64.decode64(params[:par_scale]))

		end
		
		if params[:all_ans]

			@answers = P1ConfAnswer.all

		end

		render json: {status: 'SUCCESS', message: 'List of answers', data: @answers}, status: :ok
	end

	def show

		@answers = P1ConfAnswer.find(params[:id])

		render json: {status: 'SUCCESS', message: 'answers Details', data: @answers}, status: :ok
	end

	def create
		@answers = P1ConfAnswer.new(create_params)

		if @answers.save

			render json: {status: 'SUCCESS', message: 'answers is added', data: @answers}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create answers', data: @answers.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@answers = P1ConfAnswer.find(params[:id])

		if @answers.update_attributes( update_params)

			render json:{status: 'SUCCESS', message: 'Updated answers', data: @answers}, status: :ok
		else

			#logger.error "ERROR: P1ConfAnswer Create: #{@answers.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating answers', data: @answers.errors},
			status: :unprocessable_entity
		end
	end

	private

	def create_params
		params.permit(	:answer,
						:ans_scale,
						:answer_abbr)
	end

	def update_params
		params.permit(	:answer,
						:ans_scale,
						:answer_abbr,
						:status )
	end
end 
