document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        // Part 1: Hello & Weather
        {
            question: "What is a friendly greeting?",
            image: "images/1.png", // Description for placeholder
            options: ["Goodbye", "Hello", "Thank you"],
            correctAnswer: "Hello",
            pageRef: "Page 3"
        },
        {
            question: "How's the weather?",
            image: "images/2.png",
            options: ["Rainy", "Cloudy", "Sunny"],
            correctAnswer: "Sunny",
            pageRef: "Page 6/Picture Cards"
        },
        {
            question: "What do you wear when it's rainy?",
            image: "images/3.png",
            options: ["Shorts", "Boots", "Cap"],
            correctAnswer: "Boots",
            pageRef: "Page 8/Picture Cards"
        },
        // Part 2: Days & Time
        {
            question: "What day is it?",
            image: "images/4.png",
            options: ["Sunday", "Friday", "Monday"],
            correctAnswer: "Monday",
            pageRef: "Page 10/Picture Cards"
        },
        {
            question: "What time is it?",
            image: "images/5.png",
            options: ["7 o'clock", "9 o'clock", "12 o'clock"],
            correctAnswer: "9 o'clock",
            pageRef: "Page 13"
        },
        {
            question: "What does he do in the morning?",
            image: "images/6.png",
            options: ["Go home", "Wake up", "Do homework"],
            correctAnswer: "Wake up",
            pageRef: "Page 19"
        },
         // Part 3: School Stuff
        {
            question: "What is this?",
            image: "images/7.png",
            options: ["Pen", "Pencil", "Eraser"],
            correctAnswer: "Pencil",
            pageRef: "Page 18/Picture Cards"
        },
        {
            question: "What is this?",
            image: "images/8.png",
            options: ["Ruler", "Notebook", "Glue stick"],
            correctAnswer: "Ruler",
            pageRef: "Page 18/Picture Cards"
        },
        {
            question: "What is this place?",
            image: "images/9.png",
            options: ["Gym", "Classroom", "Library"],
            correctAnswer: "Library",
            pageRef: "Page 30/Picture Cards"
        },
        {
            question: "What is this place?",
            image: "images/10.png",
            options: ["Computer room", "Music room", "Lunch room"],
            correctAnswer: "Computer room",
            pageRef: "Page 30/Picture Cards"
        },
         // Part 4: Alphabet & Places
        {
            question: "What letter is this?",
            image: "images/11.png",
            options: ["c", "g", "q"],
            correctAnswer: "g",
            pageRef: "Page 22/Picture Cards"
        },
        {
            question: "What place is this?",
            image: "images/12.png",
            options: ["Hospital", "Supermarket", "Station"],
            correctAnswer: "Supermarket",
            pageRef: "Page 22/Picture Cards"
        },
        {
            question: "What color is this?",
            image: "images/13.png",
            options: ["Red", "Yellow", "Blue"],
            correctAnswer: "Blue",
            pageRef: "Page 25/Picture Cards"
        },
         // Part 5: Food & Wants
        {
            question: "What fruit is this?",
            image: "images/14.png",
            options: ["Apples", "Melons", "Bananas"],
            correctAnswer: "Bananas",
            pageRef: "Page 26/Picture Cards"
        },
        {
            question: "What vegetable is this?",
            image: "images/15.png",
            options: ["Corn", "Carrots", "Cucumbers"],
            correctAnswer: "Carrots",
            pageRef: "Page 26/Picture Cards"
        },
        {
            question: "This looks yummy! It's a _____.",
            image: "images/16.png",
            options: ["Pizza", "Parfait", "Sandwich"],
            correctAnswer: "Parfait",
            pageRef: "Page 28"
        },
         // Part 6: My Day
        {
            question: "What is he doing?",
            image: "images/17.png",
            options: ["Washing his face", "Brushing his teeth", "Putting away his futon"],
            correctAnswer: "Brushing his teeth",
            pageRef: "Page 35"
        },
        {
            question: "What might his parent say?",
            image: "images/18.png",
            options: ["Good night", "See you later", "I'm hungry"],
            correctAnswer: "See you later",
            pageRef: "Page 37"
        },
        {
            question: "He checks his _____.",
            image: "images/19.png",
            options: ["Lunch box", "School bag", "Homework"],
            correctAnswer: "School bag",
            pageRef: "Page 36"
        },
         // Part 7: Bonus Round!
        {
            question: "Choose the correct word: I ____ Mondays.",
            imageDesc: null, // No image for this one
            options: ["am", "like", "go"],
            correctAnswer: "like",
            pageRef: "General"
        },
        {
            question: "(Listening Concept) Imagine your teacher says 'Apple'. Choose the picture.",
            imageDesc: "Teacher speaking icon (Conceptual)", // Or leave null
            options: ["Apple", "Banana", "Orange"], // Simplified for display, represent options conceptually
            correctAnswer: "Apple", // Assuming teacher says Apple
            // Note: Requires images for options if used visually. We'll use text buttons.
            // To make this truly visual, you'd need image paths in options and adjust rendering.
            pageRef: "Listening - Conceptual",
            optionImages: { // Example of how you *could* add option images
                 "Apple": "placeholder_apple.png",
                 "Banana": "placeholder_banana.png",
                 "Orange": "placeholder_orange.png"
            }
        },
        {
            question: "How do you ask someone what they want?",
            imageDesc: null,
            options: ["What time is it?", "How's the weather?", "What do you want?"],
            correctAnswer: "What do you want?",
            pageRef: "General"
        }
    ];

    // --- Correct Answer Mapping (Based on your key if needed, but inferred from data above is better) ---
    // If your separate answer key (b, c, b, c...) MUST be used, you'd need a more complex setup.
    // Storing the full correct answer text within the question object (as done above) is recommended.

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null; // Store the button element selected

    const questionNumberEl = document.getElementById('question-number');
    const totalQuestionsEl = document.getElementById('total-questions');
    const scoreEl = document.getElementById('score');
    const questionTextEl = document.getElementById('question-text');
    const questionImageEl = document.getElementById('question-image');
    const imageContainerEl = document.getElementById('image-container');
    const imageDescriptionFallbackEl = document.getElementById('image-description-fallback');
    const optionsContainerEl = document.getElementById('options-container');
    const feedbackEl = document.getElementById('feedback');
    const nextButton = document.getElementById('next-button');
    const resultsContainer = document.getElementById('results-container');
    const quizContainer = document.getElementById('quiz-container'); // Actually the main content area
    const finalScoreEl = document.getElementById('final-score');
    const totalQuestionsFinalEl = document.getElementById('total-questions-final');
    const restartButton = document.getElementById('restart-button');


    function generatePlaceholderImageUrl(text) {
        if (!text) return "";
        // Simple placeholder URL using placeholder.com
        const encodedText = encodeURIComponent(text);
        return `https://via.placeholder.com/300x200/e0e0e0/666666?text=${encodedText}`;
    }

    function loadQuestion() {
        selectedAnswer = null; // Reset selected answer
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback'; // Reset feedback class
        nextButton.classList.add('hidden');
        optionsContainerEl.innerHTML = ''; // Clear previous options

        if (currentQuestionIndex >= quizData.length) {
            showResults();
            return;
        }

        const currentQuestion = quizData[currentQuestionIndex];

        questionNumberEl.textContent = currentQuestionIndex + 1;
        questionTextEl.textContent = currentQuestion.question;

        // Handle Image
        if (currentQuestion.image) { // <--- CHECK FOR 'image' INSTEAD
            // We are using a direct path now, no need for placeholder function
            questionImageEl.src = currentQuestion.image; // <--- SET SRC DIRECTLY FROM 'image' PROPERTY
            questionImageEl.alt = currentQuestion.question; // <--- SET ALT TEXT (e.g., use question text)
            questionImageEl.style.display = 'block';
            imageDescriptionFallbackEl.style.display = 'none';
            imageContainerEl.style.display = 'flex'; // Make sure container is visible
            // Optional: Add error handling for image loading
            questionImageEl.onerror = () => {
                console.error("Failed to load image:", currentQuestion.image); // Log error to console
                questionImageEl.style.display = 'none'; // Hide broken image icon
                imageDescriptionFallbackEl.textContent = `(Image not found at: ${currentQuestion.image})`;
                imageDescriptionFallbackEl.style.display = 'block';
            };
        } else {
            // This part remains the same - hide image elements if no image property
            questionImageEl.style.display = 'none';
            imageDescriptionFallbackEl.style.display = 'none';
            imageContainerEl.style.display = 'none';
        }


        // Create Option Buttons
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', handleOptionClick);
            optionsContainerEl.appendChild(button);
        });
    }

    function handleOptionClick(event) {
        // Disable all buttons once an option is clicked
        const buttons = optionsContainerEl.querySelectorAll('button');
        buttons.forEach(button => {
            button.disabled = true;
        });

        selectedAnswer = event.target; // Store the clicked button
        const answerText = selectedAnswer.textContent;
        const currentQuestion = quizData[currentQuestionIndex];
        const correctAnswer = currentQuestion.correctAnswer;

        if (answerText === correctAnswer) {
            score++;
            scoreEl.textContent = score;
            selectedAnswer.classList.add('correct');
            feedbackEl.textContent = 'Correct!';
            feedbackEl.classList.add('correct');
        } else {
            selectedAnswer.classList.add('incorrect');
            feedbackEl.textContent = `Incorrect. The correct answer was: ${correctAnswer}`;
            feedbackEl.classList.add('incorrect');
            // Optionally highlight the correct answer as well
             buttons.forEach(button => {
                if(button.textContent === correctAnswer) {
                    button.classList.add('reveal-correct');
                }
            });
        }

        nextButton.classList.remove('hidden'); // Show the next button
        if (currentQuestionIndex === quizData.length - 1) {
            nextButton.textContent = 'Finish Quiz';
        }
    }

    function showResults() {
        document.getElementById('question-area').classList.add('hidden'); // Hide question part
        resultsContainer.classList.remove('hidden');
        finalScoreEl.textContent = score;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        scoreEl.textContent = score;
        selectedAnswer = null;
        resultsContainer.classList.add('hidden');
        document.getElementById('question-area').classList.remove('hidden');
        nextButton.textContent = 'Next Question';
        nextButton.classList.add('hidden'); // Hide until answer selected
        loadQuestion();
    }

    // Initial setup
    totalQuestionsEl.textContent = quizData.length;
    totalQuestionsFinalEl.textContent = quizData.length;
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });
    restartButton.addEventListener('click', restartQuiz);

    // Load the first question
    loadQuestion();
});