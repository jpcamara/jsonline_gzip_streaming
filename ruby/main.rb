require "down"

url = "https://github.com/jpcamara/jsonline_gzip_streaming/raw/main/example.json.gz"

remote_file = Down.open(url)
io = remote_file
options = {}
Zlib::GzipReader.zcat(io) do |line|
  puts "woop woop"
  puts line
end