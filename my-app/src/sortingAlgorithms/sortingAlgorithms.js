export function bubbleSort(array) {
    const animations = [];
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        animations.push([j, j + 1]); // Comparison
        if (array[j] > array[j + 1]) {
          animations.push([j, array[j + 1]]); // Swap
          animations.push([j + 1, array[j]]);
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
    return animations;
  }
  
  export function quickSort(array) {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(array, low, high, animations) {
    if (low < high) {
      const pivotIndex = partition(array, low, high, animations);
      quickSortHelper(array, low, pivotIndex - 1, animations);
      quickSortHelper(array, pivotIndex + 1, high, animations);
    }
  }
  
  function partition(array, low, high, animations) {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      animations.push([j, high]); // Comparison
      if (array[j] < pivot) {
        i++;
        animations.push([i, array[j]]);
        animations.push([j, array[i]]);
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    animations.push([i + 1, array[high]]);
    animations.push([high, array[i + 1]]);
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
  }
  
  export function insertionSort(array) {
    const animations = [];
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        animations.push([j, j + 1]); // Comparison
        animations.push([j + 1, array[j]]); // Swap
        array[j + 1] = array[j];
        j--;
      }
      animations.push([j + 1, key]); // Place key
      array[j + 1] = key;
    }
    return animations;
  }
  
  export function mergeSort(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
  
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]); // Comparison
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
  
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
  
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  
  export function heapSort(array) {
    const animations = [];
    const length = array.length;
  
    const heapify = (array, length, i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
  
      if (left < length && array[left] > array[largest]) largest = left;
      if (right < length && array[right] > array[largest]) largest = right;
  
      if (largest !== i) {
        animations.push([i, array[largest]]);
        animations.push([largest, array[i]]);
        [array[i], array[largest]] = [array[largest], array[i]];
        heapify(array, length, largest);
      }
    };
  
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) heapify(array, length, i);
  
    for (let i = length - 1; i > 0; i--) {
      animations.push([0, array[i]]);
      animations.push([i, array[0]]);
      [array[0], array[i]] = [array[i], array[0]];
      heapify(array, i, 0);
    }
  
    return animations;
  }
  