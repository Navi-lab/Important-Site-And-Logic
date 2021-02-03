require 'macaddr'

class P12GetLocationController < ApplicationController
  
	skip_before_action :verify_authenticity_token
	
	def get_location
		
		#@in_put = request.env['HTTP_CLIENT_IP']
		
		@in_put = "203.92.59.154"
		
		results = Geocoder.search(@in_put)
		
		result_2 = Geocoder.search(results.first.coordinates)
		
		@out_data = {
						'coordinates': results.first.coordinates,
						'country': results.first.country,
						'city': results.first.city,
						'address': results.first.address,
						'new_addr': result_2
					}
		
		render json: {status: 'SUCCESS', message: 'Location', data: @out_data}, status: :ok	
	
	end
	
	def get_device_info
		
		#@user_agent = 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.17 Safari/537.36'
		
		@user_agent = request.headers['User-Agent']
		
		logger.debug request.headers['User-Agent'].inspect
		
		client = DeviceDetector.new(@user_agent)
		
		@result = {
					'browser_name': client.name,
					'browser_version': client.full_version,
					'os_name': client.os_name,
					'os_version': client.os_full_version,
					'device_name': client.device_name,
					'device_type': client.device_type
		
				}
				
		render json: {status: 'SUCCESS', message: 'DeviceInfo', data: @result}, status: :ok
	
	end
	
	def get_mac_address
		`ping -c 1 #{request.env['HTTP_CLIENT_IP']}`
		sleep(3) # For dramatic effect
		arptable = `arp -a`
		entries = arptable.split("\n")
		#entries = Mac.addr(request.env['HTTP_CLIENT_IP'])
		render json: {status: 'SUCCESS', message: 'Mac Address', data: entries}, status: :ok
		
		
	end	

=begin
	
	@client_id = request.ip
	@mac_address = get_mac_address(@client_id)

	def get_mac_address(ip_address)
		'ping -c 1 #{request.ip}'
		sleep(3)
		arptable = `arp -a`
		entries = arptable.split("\n")
		ipmap = {}
		entries.each do |e|
			ent = e.split(" ")
			ipmap["#{ent[1].gsub(/\(|\)/, "")}"] = ent[3]
		end
		
		return ipmap["#{request.ip}"]
	end
=end
	
end