package Graph

import (
	"fmt"
	"html/template"
	"net/http"
)

func Handelhome(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("/templates/index.html")
	if err != nil {
		fmt.Println("hi",err)
		http.Error(w, "Internl Server Error", http.StatusInternalServerError)
		return
	}
	err = tmpl.Execute(w,nil)
	if err != nil {
		http.Error(w, "Internl Server Error", http.StatusInternalServerError)
		return
	}
}


