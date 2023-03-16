use std::error::Error;
use async_compression::futures::bufread::GzipDecoder;
use futures::{
    io::{self, BufReader, ErrorKind},
    prelude::*,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let url = "https://github.com/jpcamara/jsonline_gzip_streaming/raw/main/reviews.json.gz";
    let response = reqwest::get(url).await?;
    let reader = response
        .bytes_stream()
        .map_err(|e| io::Error::new(ErrorKind::Other, e))
        .into_async_read();

    let mut gz_decoder = GzipDecoder::new(BufReader::new(reader));
    gz_decoder.multiple_members(true); // supports multiline parsing
    let decoder = BufReader::new(gz_decoder);
    let mut lines_stream = decoder.lines().map(|l| l.unwrap());

    let mut line = lines_stream.next().await.unwrap_or(String::from(""));
    while line.len() > 0 {
        println!("{:?}", line);
        line = lines_stream.next().await.unwrap_or(String::from(""));
    }

    Ok(())
}