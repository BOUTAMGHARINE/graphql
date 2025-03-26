package main

import (
	"fmt"
	"net/http"

	Graph "Graph/server/controles"
)

func main() {
	http.HandleFunc("/", Graph.Handelhome)

	fmt.Println("server runing at http://localhost:4444")
	err := http.ListenAndServe(":4444", nil)
	if err != nil {
		fmt.Println(err, "we can't serve")
		return
	}
}
