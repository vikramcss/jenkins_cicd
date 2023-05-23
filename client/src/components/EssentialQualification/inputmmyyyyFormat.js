export const format = (node, formatFunction) => {
  function updateValue(e) {
    node.value = formatFunction(node.value);
  }

  node.addEventListener("input", updateValue);
  node.addEventListener("paste", updateValue);

  // Format on intial hydration
  node.value = formatFunction(node.value);

  return {
    destroy() {
      node.removeEventListener("input", updateValue);
      node.removeEventListener("paste", updateValue);
    },
  };
};

export const cardNumber = (value) => {
  let onlyNumbers = value
  console.log('length of value is :', value.length)
  if (onlyNumbers.length > 2 && onlyNumbers.length < 7) {
    let [month, year] = value.split('-')
    if( isNaN(month) ) {
        return ''
    }
    if(Number(month)>12 || Number(month) < 1) {
        return ''
    }

  } else if(onlyNumbers.length == 7) {
    let [month, year] = onlyNumbers.split('-')
    console.log('year is :', year)
    if( isNaN(year) ) {
        return `${month}-` 
    }
    if(Number(year)>2023 || Number(year) < 1980) {
        return `${month}-` 
    }

  } else {
    if( isNaN(value) ) {
        return ''
    }

  }
//   if (onlyNumbers.length == 2) {
//     let tmpArray = onlyNumbers.split("");
//     tmpArray[2] = "-";
//     onlyNumbers = tmpArray.join('')
//   }
  if (onlyNumbers.length >= 3) {
    let tmpArray = onlyNumbers.split("");
    if(tmpArray[1].length > 4) {
        onlyNumbers = [tmpArray[0],tmpArray[1],tmpArray[2],tmpArray[3],tmpArray[4],tmpArray[5],tmpArray[6]].join('')
    }
  }
  return onlyNumbers;
};
