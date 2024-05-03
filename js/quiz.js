
export class Quiz {
    constructor(questions) {
        this.currentQuestion = 0;
        this.question = questions;
        this.totalNumberOfQuestions = questions.length
        this.score=0
        document.getElementById("next").addEventListener("click", this.nextQuestion.bind(this))
        document.getElementById("tryAgain").addEventListener("click",this.tryAgain.bind(this))
        this.showQuestion();
    }

    // shuffle method
    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    showQuestion() {
        // Access elements of Quiz Section
        document.getElementById("currentQuestion").innerHTML = this.currentQuestion + 1;
        document.getElementById("totalNumberOfQuestions").innerHTML = this.totalNumberOfQuestions;
        console.log(this.question);
        document.getElementById("question").innerHTML = this.question[this.currentQuestion].question;

        // array of answers before Shuffle
        let answers = [this.question[this.currentQuestion].correct_answer, ...this.question[this.currentQuestion].incorrect_answers]
        // array of answers before Shuffle
        this.shuffle(answers)

        // Answers Containers
        let answersContainer = ``;
        for (let i = 0; i < answers.length; i++) {
            answersContainer += `<label class="form-check-label">
            <input type="radio" class="form-check-input" name="answer" value="${answers[i]}">
            ${answers[i]}
            </label><br/>
            `
        }
        document.getElementById("rowAnswer").innerHTML = answersContainer;
    }
    nextQuestion() {

        //user Answer element
        let userAnswerElement = Array.from(document.getElementsByName('answer')).find((element) => { return element.checked })

        if (userAnswerElement != undefined) {
            $("#alert").fadeOut(250);
            //user Answer value
            let userAnswer = userAnswerElement.value;

            //Correct answer value
            
            let correctAnswer = this.question[this.currentQuestion].correct_answer;
            this.checkUserAnswers(userAnswer, correctAnswer)

            this.currentQuestion++;
            if (this.currentQuestion < this.question.length) {
                this.showQuestion()
            }
            else {
                // Go to finish page
                $('#quiz').slideUp(500)
                $('#finish').slideDown(500)
                document.getElementById("score").innerHTML = this.score
                
            }
        }
        else {
            $("#alert").show(500);

        }
    }
    checkUserAnswers(userAnswer, correctAnswer) {
        if (userAnswer == correctAnswer) {
            $('#Correct').fadeIn(500).fadeOut(250)
            this.score++;
        }
        else {
            $('#inCorrect').fadeIn(500).fadeOut(200)
        }
    }

    tryAgain(){
        $("#finish").slideUp(500)
        $("#setting").slideDown(500)
    }
}

