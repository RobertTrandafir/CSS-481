const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";


buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const value = button.textContent;

        if (value === "C") {
            expression = "";
            display.value = "0";
        }
        else if (value === "=") {
            if (expression !== "") {
                try {
                    const result = calculate(expression);
                    expression = result.toString();
                    display.value = expression;
                }
                catch (error) {
                    expression = "";
                    display.value = "Error";
                }
            }
        }
        else {
            expression += value;
            display.value = expression;
        }
    });
});

function calculate(expression) {
    expression = expression.replace(/x/g, "*");

    const numbers = [];
    const operators = [];
    let currentNumber = "";

    for (let i = 0; i < expression.length; i++) {

        const character = expression[i];

        if (character >= "0" && character <= "9") {
            currentNumber += character;
        }
        else if (character === "+" || character === "-" || character === "*" || character === "/") {
            if (currentNumber === "") {
                throw new Error("Invalid expression");
            }

            numbers.push(Number(currentNumber));
            operators.push(character);
            currentNumber = "";
        }
        else {
            throw new Error("Invalid character");
        }
    }

    if (currentNumber === "") {
        throw new Error("Invalid expression");
    }

    numbers.push(Number(currentNumber));

    // First calculate multiplication and division
    for (let i = 0; i < operators.length; i++) {

        if (operators[i] === "*" || operators[i] === "/") {

            let result;

            if (operators[i] === "*") {
                result = numbers[i] * numbers[i + 1];
            }
            else {
                if (numbers[i + 1] === 0) {
                    throw new Error("Cannot divide by zero");
                }

                result = numbers[i] / numbers[i + 1];
            }

            numbers.splice(i, 2, result);
            operators.splice(i, 1);

            i--;
        }
    }


    // Then calculate addition and subtraction
    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {

        if (operators[i] === "+") {
            result += numbers[i + 1];
        }
        else if (operators[i] === "-") {
            result -= numbers[i + 1];
        }
    }

    return result;
}