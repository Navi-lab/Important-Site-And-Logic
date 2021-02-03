class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  
  #validates_acceptance_of :first_name, :allow_nil => false, :on => :create
  
  validates :email, presence: true, format: /\A[^@]+@[^@]+\z/
  
  validates :first_name, length: { minimum: 5, maximum: 10 }, presence: true
  
  validates :last_name, length: { maximum: 10 }
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable, :confirmable, :lockable
end
 