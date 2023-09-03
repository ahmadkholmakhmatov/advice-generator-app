function init() {
  const generateAdviceButton = document.querySelector("#generate-advice-button");
  const elCardIndex = document.getElementById("card__index");
  const elCardQuoteText = document.getElementById("card-quote-text");
  async function getRandomAdvice() {
    const apiUrl = "https://api.adviceslip.com/advice";
    let advice;
    elCardIndex.innerHTML='...';
    elCardQuoteText.innerHTML='Loading...'
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
    elCardIndex.innerHTML = advice.slip.id;
    elCardQuoteText.innerHTML = advice.slip.advice;
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
  function generateAdviceButtonClickHandler() {
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
