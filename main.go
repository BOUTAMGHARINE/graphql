package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	if _, err := os.Stat("index.html"); os.IsNotExist(err) {
		fmt.Println("The file does not exist.")
		return
	}
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "index.html")
	})
	fmt.Println("server runing at http://localhost:8080")

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err, "we can't serve")
		return
	}
	
	
}
