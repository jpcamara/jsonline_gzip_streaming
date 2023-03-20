package main

import (
	"bufio"
	"compress/gzip"
	"fmt"
	"net/http"
	"os"
)

func main() {
	url := "https://github.com/jpcamara/jsonline_gzip_streaming/raw/main/example.json.gz"

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("There was an issue returning the response")
		os.Exit(1)
	}
	defer resp.Body.Close()

	reader, err := gzip.NewReader(resp.Body)
	if err != nil {
		fmt.Println("There was setting up the gzip reader")
		os.Exit(1)
	}
	defer reader.Close()

	scanner := bufio.NewScanner(reader)

	for scanner.Scan() {
		fmt.Print("woop: ")
		fmt.Println(scanner.Text())
	}
}
