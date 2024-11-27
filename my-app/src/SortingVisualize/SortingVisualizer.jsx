import React from "react";
import "./SortingVisualizer.css";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 50; i++) {
      array.push(this.randomIntFromInterval(5, 500)); // Generate random heights
    }
    this.setState({ array });
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  animateSort(animations) {
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const isComparison = i % 2 === 0;

      if (isComparison) {
        const [barOneIdx, barTwoIdx] = animations[i];

        if (!arrayBars[barOneIdx] || !arrayBars[barTwoIdx]) continue;

        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        setTimeout(() => {
          barOneStyle.backgroundColor = "red";
          barTwoStyle.backgroundColor = "red";
        }, i * 10);

        setTimeout(() => {
          barOneStyle.backgroundColor = "teal";
          barTwoStyle.backgroundColor = "teal";
        }, (i + 1) * 10);
      } else {
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          if (!arrayBars[barIdx]) return;
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
        }, i * 10);
      }
    }
  }

  bubbleSort() {
    const animations = [];
    const array = this.state.array.slice();

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

    this.animateSort(animations);
  }

  quickSort() {
    const animations = [];
    const array = this.state.array.slice();

    const quickSortHelper = (array, low, high) => {
      if (low < high) {
        const pivotIndex = partition(array, low, high);
        quickSortHelper(array, low, pivotIndex - 1);
        quickSortHelper(array, pivotIndex + 1, high);
      }
    };

    const partition = (array, low, high) => {
      const pivot = array[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        animations.push([j, high]); // Comparing pivot with element
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
    };

    quickSortHelper(array, 0, array.length - 1);
    this.animateSort(animations);
  }

  insertionSort() {
    const animations = [];
    const array = this.state.array.slice();

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

    this.animateSort(animations);
  }

  mergeSort() {
    const animations = [];
    const auxiliaryArray = this.state.array.slice();
    const mainArray = this.state.array.slice();

    const mergeSortHelper = (mainArray, startIdx, endIdx, auxiliaryArray) => {
      if (startIdx === endIdx) return;
      const middleIdx = Math.floor((startIdx + endIdx) / 2);
      mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
      mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
      doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
    };

    const doMerge = (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray) => {
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
    };

    mergeSortHelper(mainArray, 0, mainArray.length - 1, auxiliaryArray);

    this.animateSort(animations);
  }

  heapSort() {
    const animations = [];
    const array = this.state.array.slice();

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

    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
      heapify(array, array.length, i);
    }

    for (let i = array.length - 1; i > 0; i--) {
      animations.push([0, array[i]]);
      animations.push([i, array[0]]);
      [array[0], array[i]] = [array[i], array[0]];
      heapify(array, i, 0);
    }

    this.animateSort(animations);
  }

  render() {
    const { array } = this.state;

    return (
      <>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.insertionSort()}>Insertion Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
        </div>
      </>
    );
  }
}
