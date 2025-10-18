const quizForm = document.getElementById("quizForm");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const timeDisplay = document.getElementById("time");

let timeLeft = 300; // 5 minutes
let timer;

startBtn.addEventListener("click", () => {
    // kunin yung value ng input
    const minutes = parseInt(document.getElementById("time-input").value) || 5;
    timeLeft = minutes * 60; // convert minutes to seconds

    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    buildQuiz();
    startTimer();
});


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    timeDisplay.textContent = formatTime(timeLeft);
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function buildQuiz() {
    quizForm.innerHTML = ""; // clear form before building
    questions.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `
          <p>${index + 1}. ${item.q.replace(/^\d+\.\s*/, "")}</p>
          <label><input type="radio" name="q${index}" value="a" /> a) ${item.options.a}</label><br>
          <label><input type="radio" name="q${index}" value="b" /> b) ${item.options.b}</label><br>
          <label><input type="radio" name="q${index}" value="c" /> c) ${item.options.c}</label><br>
          <label><input type="radio" name="q${index}" value="d" /> d) ${item.options.d}</label>
        `;
        quizForm.appendChild(div);
    });

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit Quiz";
    quizForm.appendChild(submitBtn);
}


quizForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearInterval(timer);
    submitQuiz();
});

function submitQuiz() {
    let score = 0;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    const wrongAnswers = [];

    questions.forEach((item, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const correct = item.a;

        if (selected && selected.value === correct) {
            score++;
        } else {
            const yourAnswer = selected ? selected.value : "None";
            wrongAnswers.push({
                number: i + 1,
                question: item.q,
                yourAnswer: yourAnswer !== "None" ? `${yourAnswer}) ${item.options[yourAnswer]}` : "No answer selected",
                correctAnswer: `${correct}) ${item.options[correct]}`
            });
        }
    });

    resultDiv.innerHTML += `<p>✅ You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>.</p>`;

    if (wrongAnswers.length > 0) {
        resultDiv.innerHTML += `<h3>❌ Incorrect Answers:</h3>`;
        wrongAnswers.forEach(item => {
            resultDiv.innerHTML += `
            <div style="margin-bottom: 10px;">
              <strong>Q${item.number}:</strong> ${item.question}<br/>
              <span style="color: red;">Your Answer: ${item.yourAnswer}</span><br/>
              <span style="color: green;">Correct Answer: ${item.correctAnswer}</span>
            </div>
          `;
        });
    } else {
        resultDiv.innerHTML += `<p style="color: green;">🎉 Perfect score! Great job!</p>`;
    }

    quizForm.style.display = "none";
}

// Shuffle array (Fisher–Yates algorithm)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const randomizeBtn = document.getElementById("randomize-btn");

randomizeBtn.addEventListener("click", () => {
    shuffle(questions);
    alert("✅ Questions randomized! Now click Start Quiz.");
});



const questions = [
    {
        q: "3. The process Plan Resource Management (9.1) defines the approach for which four activities related to resources?",
        options: {
            a: "Estimating, acquiring, managing, and utilizing",
            b: "Tracking, providing feedback, resolving issues, and managing change",
            c: "Identifying, acquiring, managing, and defining roles",
            d: "Obtaining, developing, managing, and controlling"
        },
        a: "c"
    },
    {
        q: "4. Failing to efficiently manage and control resources is identified as a major source of project risk. This risk can manifest as excessive operational costs resulting from which of the following?",
        options: {
            a: "Lacking critical equipment",
            b: "Improper inventory levels",
            c: "Quality issues from poor materials",
            d: "Mismanagement of team competencies"
        },
        a: "b"
    },
    {
        q: "5. Which resource optimization method is specifically concerned with minimizing inventory and reducing waste by receiving goods only when they are needed?",
        options: {
            a: "Theory of Constraints (TOC)",
            b: "Lean Management",
            c: "Just-in-Time (JIT) manufacturing",
            d: "Kaizen"
        },
        a: "c"
    },
    {
        q: "6. Which resource management process has Resource Requirements (specific types and quantities needed) as its key output?",
        options: {
            a: "Control Resources",
            b: "Acquire Resources",
            c: "Estimate Activity Resources",
            d: "Plan Resource Management"
        },
        a: "c"
    },
    {
        q: "7. Which organizational resource optimization method focuses on the continuous pursuit of small, incremental improvements?",
        options: {
            a: "Just-in-Time (JIT)",
            b: "Kaizen",
            c: "Lean Management",
            d: "Theory of Constraints (TOC)"
        },
        a: "b"
    },
    {
        q: "8. Which factor for tailoring resource management focuses on whether the project is using an adaptive/agile versus a predictive life cycle approach?",
        options: {
            a: "The project's Life cycle approach",
            b: "The Physical location of resources",
            c: "The method of Acquisition and Management",
            d: "Diversity and training needs"
        },
        a: "a"
    },
    {
        q: "9. Resources that are procured are acquired in which manner?",
        options: {
            a: "Assigned (internally)",
            b: "Utilized (efficiently)",
            c: "Externally",
            d: "Procured (externally)"
        },
        a: "d"
    },
    {
        q: "10. Which of the following management methods aims to optimize resource utilization by eliminating waste and maximizing value?",
        options: {
            a: "Lean Management",
            b: "Theory of Constraints (TOC)",
            c: "Kaizen",
            d: "Emotional Intelligence (EI)"
        },
        a: "a"
    },
    {
        q: "11. The shift in resource management is moving away from a command-and-control structure toward which kind of approach?",
        options: {
            a: "A highly centralized, predictive approach",
            b: "A collaborative and supportive approach that empowers teams",
            c: "A focus on full-time, highly specialized staff",
            d: "A purely internal resource acquisition method"
        },
        a: "b"
    },
    {
        q: "12. Which of the following emerging trends encourages project managers to focus on self-management and self-awareness (Personal EI)?",
        options: {
            a: "Self-Organizing Teams",
            b: "Emotional Intelligence (EI)",
            c: "Theory of Constraints (TOC)",
            d: "Just-in-Time (JIT) manufacturing"
        },
        a: "b"
    },
    {
        q: "13. Which form of Emotional Intelligence (EI) is described as focusing on relationship management?",
        options: {
            a: "Personal EI (self-awareness)",
            b: "Personal EI (self-management)",
            c: "Inbound EI (self-management)",
            d: "Outbound EI (relationship management)"
        },
        a: "d"
    },
    {
        q: "14. For the project manager, the Team Management Focus includes all of the following except which one?",
        options: {
            a: "Ensuring professional and ethical behavior",
            b: "Efficient allocation of tangible resources",
            c: "Proactively developing team skills",
            d: "Acquiring, motivating, and empowering the team"
        },
        a: "b"
    },
    {
        q: "15. Which process is responsible for ensuring that assigned physical resources are available as planned and for monitoring their planned versus actual use?",
        options: {
            a: "Manage Team",
            b: "Develop Team",
            c: "Control Resources",
            d: "Estimate Activity Resources"
        },
        a: "c"
    },
    {
        q: "16. The process of Acquire Resources (9.3) involves obtaining which of the following?",
        options: {
            a: "Resource Requirements and the RBS",
            b: "The Resource Management Plan and the Team Charter",
            c: "Team members, facilities, equipment, and materials",
            d: "The estimates for material, equipment, and supplies"
        },
        a: "c"
    },
    {
        q: "17. When is a team considered self-organizing?",
        options: {
            a: "When they function with centralized control",
            b: "When they function without centralized control",
            c: "When team members are only generalists",
            d: "When the project manager actively manages team performance"
        },
        a: "b"
    },
    {
        q: "18. What is the ultimate goal of the Manage Team (9.5) process?",
        options: {
            a: "To optimize overall project performance",
            b: "To acquire necessary supplies",
            c: "To estimate material quantities",
            d: "To define resource allocation guidance"
        },
        a: "a"
    },
    {
        q: "19. In agile environments, which type of team member is often preferred to maximize focus and facilitate accelerated decision-making?",
        options: {
            a: "Full-time specialized experts",
            b: "Command-and-control leaders",
            c: "Part-time operational support",
            d: "Generalizing specialists"
        },
        a: "d"
    },
    {
        q: "20. For the project manager, the Team Management Focus includes all of the following except which one?",
        options: {
            a: "Team values, operating guidelines, and conflict resolution processes",
            b: "Team competencies, interaction, and environment",
            c: "Team performance, resolved issues, and managed changes",
            d: "Resource demand, required configurations, and supply"
        },
        a: "d"
    },
    {
        q: "21. Resource Risk, manifesting as delays from lacking critical equipment, can be caused by the failure to efficiently manage and control which types of resources?",
        options: {
            a: "Only material and supplies",
            b: "Only facilities",
            c: "Both physical and team resources",
            d: "Only team resources"
        },
        a: "c"
    },
    {
        q: "22. The challenges unique to Virtual Teams/Distributed Teams include difficulty in which three areas?",
        options: {
            a: "Acquisition, motivation, and empowerment",
            b: "Planning, executing, and monitoring costs",
            c: "Estimating, allocating, and controlling",
            d: "Communication, tracking progress, and managing cultural differences"
        },
        a: "d"
    },
    {
        q: "23. Which of the following is an example of a physical resource?",
        options: {
            a: "Team members",
            b: "Supplies",
            c: "Operating guidelines",
            d: "Competencies"
        },
        a: "b"
    },
    {
        q: "24. Which of the following is a key tailoring consideration related to the team?",
        options: {
            a: "Physical location of resources",
            b: "Required resource configurations",
            c: "Diversity and the need for special training",
            d: "Industry-specific resources required"
        },
        a: "c"
    },
    {
        q: "25. What is the purpose of the Resource Management Plan?",
        options: {
            a: "To provide guidance on categorization, allocation, management, and release",
            b: "To estimate the type and quantity of resources needed",
            c: "To track team performance and resolve issues",
            d: "To obtain team members and equipment"
        },
        a: "a"
    },
    {
        q: "26. What is a Resource Breakdown Structure (RBS) defined as?",
        options: {
            a: "The specific types and quantities of resources needed",
            b: "A document guiding resource allocation and release",
            c: "A hierarchical list of resources by category and type",
            d: "The plan for acquiring resources internally or externally"
        },
        a: "c"
    },
    {
        q: "27. The project manager is responsible for managing factors that influence the team, such as organizational change, politics, culture, and what else?",
        options: {
            a: "The project's life cycle approach",
            b: "Resource demand",
            c: "Geographical locations",
            d: "Industry-specific resources"
        },
        a: "c"
    },
    {
        q: "28. In the context of resource risk, quality issues can arise from which of the following?",
        options: {
            a: "Organizational politics",
            b: "Lacking critical equipment",
            c: "Improper inventory levels",
            d: "Poor materials"
        },
        a: "d"
    },
    {
        q: "29. The process Estimate Activity Resources (9.2) addresses which two elements in addition to estimating team resources?",
        options: {
            a: "Resource allocation and resource release",
            b: "The organizational structure and the political landscape",
            c: "The type and quantity of material, equipment, and supplies",
            d: "The overall team environment and team member interaction"
        },
        a: "c"
    },
    {
        q: "30. The process Develop Team (9.4) is primarily focused on improving which of the following areas?",
        options: {
            a: "Tracking team performance and resolving issues",
            b: "Team member competencies, interaction, and environment",
            c: "Obtaining necessary facilities and equipment",
            d: "Monitoring planned versus actual use of physical resources"
        },
        a: "b"
    },
    {
        q: "31. Which process is specifically responsible for documenting team values, operating guidelines, and conflict resolution procedures?",
        options: {
            a: "Acquire Resources",
            b: "Manage Team",
            c: "Develop Team",
            d: "Plan Resource Management"
        },
        a: "d"
    },
    {
        q: "32. The project manager's role in managing the project team is described as acting as both a leader and what else?",
        options: {
            a: "A manager",
            b: "A generalizing specialist",
            c: "A resource breakdown specialist",
            d: "A resource provider"
        },
        a: "a"
    }
];




