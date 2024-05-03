import { Quiz } from "./quiz.js"

export class Setting {

    constructor() {
        this.category = document.getElementById("category")
        this.difficulty = document.getElementsByName("difficulty")
        this.numberOfQuestions = document.getElementById("numberOfQuestions")
        document.getElementById("startBtn").addEventListener("click", this.startQuiz.bind(this))
    }

    /*
        1- get inputs values
        2- construct api url 
        3- fetch data from api
    */

    async startQuiz() {
        // get inputs values
        let category = this.category.value
        let difficulty = Array.from(this.difficulty).find((elm) => { return elm.checked }).value
        let numberOfQuestions = this.numberOfQuestions.value
        // construct API URL
        const API = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`
        let questions = await this.fetchData(API)
        if (questions.length > 0) {
            $("#setting").slideUp(500)
            $("#quiz").slideDown(500)

            let quiz = new Quiz(questions)
        }


        // fetch data
    }

    async fetchData(url) {
        let response = await fetch(url)
        response = await response.json()
        return response.results
    }
}