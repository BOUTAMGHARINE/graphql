package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	if _, err := os.Stat("./templates/index.html"); os.IsNotExist(err) {
		fmt.Println("Le fichier n'existe pas.")
		return
	}
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))


	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		http.ServeFile(w, r, "./templates/index.html")
	})
	

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err, "we can't serve")
		return
	}
	fmt.Println("server runing at http://localhost:8080")
}
