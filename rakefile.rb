require 'rake-jekyll'
require 'blurhash'
require 'rmagick'
require 'image_processing/mini_magick'
require "base64"

task :build do
  puts 'foo'
  # images = Dir["./_images/bemo/*.jpg"]

  # Dir.foreach("./_images/bemo/") {|x| puts "Got #{x}" }
  # puts images.inspect
  # image = Magick::ImageList.new('./_images/test.jpg')

  # image = File.open('./_images/test.jpg',  "r")

  # image = './_images/test.jpg'
  # processed = ImageProcessing::MiniMagick
  #   .source('./_images/test.jpg')
  #   .resize_to_limit(400, 400)
  #   .convert("JPG:- | base64")
  #   .call(save: false)

  # puts processed.inspect

  # processed << "output.txt"
  # processed.call
  # puts processed.inspect

  # plain = Base64.encode64("output.txt")
  # puts plain.inspect



  # pipeline = ImageProcessing::MiniMagick.source('./_images/test.jpg')

  # result = pipeline.call(save: false).convert!("png")

  # File.extname(result.path)
  # puts result.path
  # puts result.inspect

  # 360×4912

# magick = ImageProcessing::MiniMagick
#   .source('./_images/test.jpg')
#   .resize_to_limit(12, 120)
#   .convert("JPG:- | base64")
#   .call(save: false)

# magick #=> #<MiniMagick::Tool::Convert ...>

# magick << "output.jpg"
# magick.call

# puts magick.inspect



  # puts Blurhash.encode(image.columns, image.rows, image.export_pixels)
end