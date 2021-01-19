const inputBlock = document.querySelector(".inputBlock");
const outputBlock = document.querySelector(".outputBlock");
const hiddenDiv = document.createElement("div");
hiddenDiv.classList.add("hiddenDivStyles");

const autoResizeHandler = (target) => {
  const { value } = target;

  target.parentNode.appendChild(hiddenDiv);
  hiddenDiv.innerHTML = value + '<br style="line-height: 3px;">';
  hiddenDiv.style.visibility = "hidden";
  hiddenDiv.style.display = "block";
  target.style.height = hiddenDiv.offsetHeight + "px";
  hiddenDiv.style.visibility = "visible";
  hiddenDiv.style.display = "none";
};

const getMatchLetter = (string) => {
  let letterArray = [];
  string = string.trim();

  for (let i = 0; i < string.length; i++) {
    if (letterArray.map(({ letter }) => letter).includes(string[i])) {
      letterArray = letterArray.map(({ letter, times }) =>
        letter === string[i] ? { letter, times: times + 1 } : { letter, times }
      );
    } else {
      letterArray = [...letterArray, { letter: string[i], times: 1 }];
    }
  }

  return letterArray.some(({ times }) => times === 2) ? string : null;
};

const inputHandler = ({ target }) => {
  const { value } = target;
  const valueArray = value.split("\n");
  const matchArray = valueArray.map(getMatchLetter).filter((item) => item);
  const outPutValue = matchArray.join("</br>");

  outputBlock.innerHTML = outPutValue;
  autoResizeHandler(target);
};

inputBlock.addEventListener("input", inputHandler);
