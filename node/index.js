//const resp = await fetch('https://github.com/jpcamara/jsonline_gzip_streaming/raw/main/reviews.json.gz')

const url = 'https://github.com/jpcamara/jsonline_gzip_streaming/raw/main/reviews.json.gz'

const response = await fetch(url);
const decompressionStream = new DecompressionStream('gzip');
const decompressedReadableStream = response.body.pipeThrough(decompressionStream);

// Create a TextDecoderStream and pipe the decompressed data through it
const textDecoderStream = new TextDecoderStream();
const textReadableStream = decompressedReadableStream.pipeThrough(textDecoderStream);

// Initialize a ReadableStreamDefaultReader and a buffer for storing incomplete lines
const reader = textReadableStream.getReader();
let incompleteLine = '';

// Process the stream
while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  // Process each line
  const lines = value.split('\n');
  lines[0] = incompleteLine + lines[0];

  // Store the last, potentially incomplete line for the next iteration
  incompleteLine = lines.pop();

  for (const line of lines) {
    // Process the line (e.g., console.log or any other processing)
    console.log(line);
  }
}

// Process the remaining line
if (incompleteLine) {
  console.log(incompleteLine);
}