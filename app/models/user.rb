class User < ActiveRecord::Base
	validates_uniqueness_of :ip, :scope => :sid
end
