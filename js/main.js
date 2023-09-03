function init() {
  const generateAdviceButton = document.querySelector(
    "#generate-advice-button"
  );
  async function getRandomAdvice() {
    const apiUrl = "https://api.adviceslip.com/advice";
    let advice;
    try {
      const response = await fetch(apiUrl);
      if (response.status === 200) {
        const data = await response.json();
        advice = data;
        displayAdvice(advice);
      } else {
        throw new Error("Failed to fetch data from the API");
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
    return advice;
  }
  function displayAdvice(advice) {
    document.getElementById("card__index").innerHTML = advice.slip.id;
    document.getElementById("card-quote-text").innerHTML = advice.slip.advice;
  }
  function documntKeyUpHandler(event) {
    if (
      event.code !== "Space" ||
      document.activeElement === generateAdviceButton
    ) {
      return;
    }
    getRandomAdvice();
  }
  function generateAdviceButtonClickHandler(event) {
    getRandomAdvice();
  }
  if (generateAdviceButton) {
    generateAdviceButton.addEventListener(
      "click",
      generateAdviceButtonClickHandler
    );
  }
  document.addEventListener("keyup", documntKeyUpHandler);
}

document.addEventListener("DOMContentLoaded", init);
