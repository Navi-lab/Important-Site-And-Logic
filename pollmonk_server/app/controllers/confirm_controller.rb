class ConfirmController < ApplicationController
  def index
  end

  def edit
  end

  def create
  end

  def emailcheck
    @check_email = User.where(:email=>params[:email])
    respond_to do |format|
      format.html { }
      format.json { render json: @check_email }
    end
  end
  def checkforgot
    @user = User.where(:email=>params[:email])
    respond_to do |format|
      format.json {render :json => {exist_email: @user.present?}}
    end
  end
end
