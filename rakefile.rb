require 'jekyll'
require 'rake-jekyll'
require 'blurhash'
require 'rmagick'
require 'image_processing/mini_magick'
require 'base64'

task :project_imgs_to_txt do
  extensions = ['.jpg', '.png', '.gif']

  Dir.each_child('_projects') do |project|
    next if project == '.DS_Store'
    folder = File.basename(project, '.md')
    puts "Creating base64 images for #{project}..."

    Dir.foreach('./_images/' + folder + '/') do |file|
      next unless file
      extension = File.extname(file)

      # check that its an img
      next unless extensions.include?(extension)

      name = File.basename(file, extension)
      name_array = name.to_s.split('.')
      next if name_array.include?('low')
      temp_name = name + '.txt.jpg'

      Dir.mkdir('./_includes/projects/' + folder) unless Dir.exists?('./_includes/projects/' + folder)
      temp = File.path('./tmp/' + name + extension)
      input = File.path('./_images/' + folder + '/' + file)
      output = './_includes/projects/' + folder + '/' + name + '.txt'

      w = name_array[1].to_i
      h = name_array[2].to_i
      
      magick = ImageProcessing::MiniMagick
        .source(input)
        .resize_to_limit(w/90,h/90)
        .convert('JPG:- | base64')
        .call(save: false)

      magick << temp
      magick.call

      magick = ImageProcessing::MiniMagick
        .source(temp)
        .resize_to_limit(w,h)
        .convert('JPG:- | base64')
        .call

      `bash image2urijpeg.sh #{temp} > #{output}`
    end
  end

end