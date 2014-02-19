class HomeController < ApplicationController
  

  def home

    require 'base64'
    require 'openssl'
    require 'digest/sha1'

    policy_path =  File.join(Rails.root, 'config', 'policy.json')
    policy_doc = File.open(policy_path)
    policy_document = File.read(policy_doc)
    aws_secret_key = "UlhO9JUMz6cqcuInv35tC4XtxiOsn6/OkUKN3m3h"

    @policy = Base64.encode64(policy_document).gsub("\n","")
    @signature = Base64.encode64(OpenSSL::HMAC.digest(OpenSSL::Digest::Digest.new('sha1'), aws_secret_key, @policy)).gsub("\n","")

    @album = params[:album]

  end

  def viewalbum


  end

  def newalbum
  end
end
