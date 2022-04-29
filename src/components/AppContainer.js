import "./style.css";
import React from "react";
import { SortingCellGrid } from "./SortingCellGrid";
import { ReactComponent as ShuffleSvg } from "./refresh-svg.svg";
import { ReactComponent as PlaySvg } from "./play-svg.svg";

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      arrayColor: Array(10).fill("#989c94"),
      sortSpeed: 500,
      stopRunning: false,
      isRunning: false,
      currentAlgorithm: "Bubble Sort",
    };
  }

  shuffle() {
    this.setState({ stopRunning: true });
    let arr = this.state.arrayNum;
    let currentIndex = arr.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    // console.log(array);
    this.setState({ arrayNum: arr });
    this.setColorGray();
  }

  delay = async (ms) => new Promise((res) => setTimeout(res, ms));

  swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  async bubbleSort() {
    let arr = this.state.arrayNum;
    let len = arr.length;
    let swapHappend = true;
    while (swapHappend) {
      swapHappend = false;
      for (var i = 1; i < len; i++) {
        //Check Swap
        if (arr[i - 1] > arr[i]) {
          this.swap(arr, i, i - 1);
          swapHappend = true;
        }

        // let color =
        //   (!swapHappend && i === arr[i - 1]) || false ? "#449dd1" : "#989c94";
        this.state.arrayColor[i - 1] = "#989c94";
        this.state.arrayColor[i] = "#fd4f4f";
        this.setState({ arrayColor: this.state.arrayColor, arrayNum: arr });
        await this.delay(this.state.sortSpeed);
        if (this.state.stopRunning) return;
      }
      if (this.state.stopRunning) return;

      // await this.delay(this.state.sortSpeed);
      // this.state.arrayColor[len - 1] = "#449dd1";
      // this.setState({ arrayColor: this.state.arrayColor });
      this.setColorGray();
      len--;
    }
  }

  async insertionSort() {
    let arr = this.state.arrayNum;
    let len = arr.length;
    let i = 1;
    while (i < len) {
      let j = i;
      while (j > 0 && arr[j - 1] > arr[j]) {
        this.state.arrayColor[j] = "#fd4f4f";
        // this.state.arrayColor[j - 1] = "#449dd1";
        this.setState({ arrayColor: this.state.arrayColor, arrayNum: arr });
        await this.delay(this.state.sortSpeed / 2);
        if (this.state.stopRunning) return;
        this.swap(arr, j, j - 1);
        this.state.arrayColor[j - 1] = "#fd4f4f";
        // this.state.arrayColor[j] = "#449dd1";
        this.state.arrayColor[j] = "#989c94";
        this.setState({ arrayColor: this.state.arrayColor, arrayNum: arr });
        await this.delay(this.state.sortSpeed / 2);
        if (this.state.stopRunning) return;
        // this.state.arrayColor[j] = "#989c94";
        j--;
      }
      this.state.arrayColor[j] = "#989c94";
      i++;
    }
  }

  async quickSort(arr, left, right) {
    // if (this.state.stopRunning) return;
    if (left >= right || left < 0) return;
    var index = await this.partition(arr, left, right); //index returned from partition

    await this.quickSort(arr, left, index - 1);

    await this.quickSort(arr, index + 1, right);
  }

  async partition(arr, left, right) {
    // console.log(arr.length, "partition");
    var pivot = arr[right]; //middle element
    var i = left - 1; //left pointer
    this.state.arrayColor[right] = "#449dd1";
    this.setState({ arrayColor: this.state.arrayColor, arrayNum: arr });
    // await this.delay(this.state.sortSpeed);
    for (var j = left; j < right; j++) {
      // while (arr[i] < pivot) {
      //   i++;
      // }
      // while (arr[j] > pivot) {
      //   j--;
      // }
      if (arr[j] <= pivot && i - 1 !== j) {
        i++;
        this.state.arrayColor[i] = "#fd4f4f";
        this.state.arrayColor[j] = "#fd4f4f";
        this.setState({ arrayColor: this.state.arrayColor, arrayNum: arr });
        await this.delay(this.state.sortSpeed / 2);
        if (this.state.stopRunning) return;
        this.swap(arr, i, j);
        this.state.arrayColor[i] = "#989c94";
        this.state.arrayColor[j] = "#989c94";
        this.setState({ arrayColor: this.state.arrayColor, arrayNum: arr });
        await this.delay(this.state.sortSpeed / 2);
        if (this.state.stopRunning) return;
      }
    }
    this.state.arrayColor[right] = "#989c94";
    i++;
    this.swap(arr, i, right);
    return i;
  }

  async mergeSort(arr, left, right) {
    if (left < right) {
      let middle = Math.floor((left + right) / 2);

      // Sort first and second halves
      await this.mergeSort(arr, left, middle);
      await this.mergeSort(arr, middle + 1, right);

      await this.merge(arr, left, middle, right);
    }
    // this.setState({ arrayColor: this.state.arrayColor, arrayNum: arr });
  }

  async merge(arr, start, mid, end) {
    let start2 = mid + 1;

    // If the direct merge is already sorted
    if (arr[mid] <= arr[start2]) {
      return;
    }

    // let arr1 = arr.slice(start-1, mid);
    // let arr2 = arr.slice(mid, end);
    // let i = 0;
    // let j = 0;
    // let len = arr1.length;

    // while(i < len || j < len){
    //   if(arr1[i] < arr2[j])
    // }

    // // Two pointers to maintain start
    // // of both arrays to merge
    // return;
    while (start <= mid && start2 <= end) {
      // If element 1 is in right place
      if (arr[start] <= arr[start2]) {
        start++;
      } else {
        let value = arr[start2];
        let index = start2;

        // Shift all the elements between element 1
        // element 2, right by 1.
        while (index !== start) {
          arr[index] = arr[index - 1];
          index--;
        }
        arr[start] = value;

        // Update all the pointers
        start++;
        mid++;
        start2++;
      }
      // this.state.arrayColor[start] = "#1d4f4f";
      // this.state.arrayColor[start2] = "#fd4f4f";
      // this.setState({ arrayColor: this.state.arrayColor, arrayNum: arr });
      // await this.delay(this.state.sortSpeed / 2);
      // if (this.state.stopRunning) return;
      // this.swap(arr, start, start2); //swap two elements
      // this.state.arrayColor[start] = "#989c94";
      // this.state.arrayColor[start2] = "#989c94";

      // if (arr[start] <= arr[start2]) {
      //   start++;
      // } else {
      //   // while (arr[start] > arr[start2]) {
      //   this.state.arrayColor[start] = "#1d4f4f";
      //   this.state.arrayColor[start2] = "#fd4f4f";
      //   this.setState({ arrayColor: this.state.arrayColor, arrayNum: arr });
      //   await this.delay(this.state.sortSpeed / 2);
      //   if (this.state.stopRunning) return;
      //   this.swap(arr, start, start2); //swap two elements
      //   this.state.arrayColor[start] = "#989c94";
      //   this.state.arrayColor[start2] = "#989c94";
      //   start++;
      //   start2++;
      //   console.log(start, arr[start], start2, arr[start2]);
      //   // }
      //   mid++;
      // }
      // this.state.arrayColor[j] = "#989c94";
      this.setState({ arrayColor: this.state.arrayColor, arrayNum: arr });

      this.setState({ arrayColor: this.state.arrayColor, arrayNum: arr });
      await this.delay(this.state.sortSpeed / 1);
    }
  }

  async heapSort() {
    var arr = this.state.arrayNum;
    var len = arr.length;

    // Build heap (rearrange array)
    for (var i = Math.floor(len / 2) - 1; i >= 0; i--)
      await this.heapify(arr, len, i);

    // One by one extract an element from heap
    for (i = len - 1; i > 0; i--) {
      // Move current root to end
      var temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;

      // call max heapify on the reduced heap
      await this.heapify(arr, i, 0);
    }
    this.setState({ arrayNum: arr });
  }

  // To heapify a subtree rooted with node i which is
  // an index in arr[]. n is size of heap
  async heapify(arr, n, parent) {
    var largest = parent; // Initialize largest as root
    var left = 2 * parent + 1; // left = 2*i + 1
    var right = 2 * parent + 2; // right = 2*i + 2

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) largest = left;

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) largest = right;

    // If largest is not root
    if (largest !== parent) {
      let a = parseInt(Math.floor(Math.random() * 10));
      this.state.arrayColor[parent] = "#" + a + "d4f4f";
      this.setState({ arrayColor: this.state.arrayColor, arrayNum: arr });
      await this.delay(this.state.sortSpeed / 2);
      this.swap(arr, parent, largest);

      this.setState({ arrayColor: this.state.arrayColor, arrayNum: arr });
      await this.delay(this.state.sortSpeed / 2);

      // Recursively heapify the affected sub-tree
      await this.heapify(arr, n, largest);
    }
  }

  /* l is for left index and r is right index
  of the sub-array of arr to be sorted */

  setColorGray() {
    this.setState({ arrayColor: this.state.arrayColor.fill("#989c94") });
  }

  async setColorCorrect() {
    for (let i = 0; i < this.state.arrayColor.length; i++) {
      this.state.arrayColor[i] = "#679436";
      this.setState({ arrayColor: this.state.arrayColor });
      await this.delay(this.state.sortSpeed / 10);
    }
  }

  async runAlgorithm() {
    if (this.state.isRunning) return;
    await this.setState({ stopRunning: false, isRunning: true });
    // console.log(this.state.currentAlgorithm);
    // this.state.currentAlgorithm();
    var arr = this.state.arrayNum;
    var len = arr.length;
    switch (this.state.currentAlgorithm) {
      case "Bubble Sort":
        await this.bubbleSort();
        break;
      case "Insertion Sort":
        await this.insertionSort();
        break;
      case "Quick Sort":
        await this.quickSort(arr, 0, len - 1);
        break;
      case "Merge Sort":
        await this.mergeSort(arr, 0, len - 1);
        break;
      case "Heap Sort":
        await this.heapSort();
        break;
      default:
        console.log(this.state.currentAlgorithm, "is not a algorithm");
    }
    if (!this.state.stopRunning) await this.setColorCorrect();
    this.setState({ isRunning: false });

    // this.setState({ arrayNum: this.bblSort() });
  }

  generateNewArrays(len) {
    this.setState({ stopRunning: true });
    let newArrayNum = Array(parseInt(len));
    let newArrayColor = Array(parseInt(len)).fill("#989c94");

    for (let i = 0; i < len; i++) {
      newArrayNum[i] = i + 1;
    }

    this.setState({
      arrayNum: newArrayNum,
      arrayColor: newArrayColor,
    });
    // this.shuffle();
  }

  render() {
    return (
      <main>
        <h1 className="h1Part1">Algorithm</h1>
        <div className="mainApp">
          <div className="algorithmContainer">
            <div className="chooseAlgorithm">
              <h2>Choose Algorithm</h2>
              <button
                className="algorithmButton"
                onClick={() =>
                  this.setState({ currentAlgorithm: "Bubble Sort" })
                }
              >
                Bubble Sort
              </button>
              <button
                className="algorithmButton"
                onClick={() =>
                  this.setState({ currentAlgorithm: "Insertion Sort" })
                }
              >
                Insertion Sort
              </button>
              <button
                className="algorithmButton"
                onClick={() =>
                  this.setState({ currentAlgorithm: "Merge Sort" })
                }
              >
                Merge Sort
              </button>
              <button
                className="algorithmButton"
                onClick={() =>
                  this.setState({ currentAlgorithm: "Quick Sort" })
                }
              >
                Quick Sort
              </button>
              <button
                className="algorithmButton"
                onClick={() => this.setState({ currentAlgorithm: "Heap Sort" })}
              >
                Heap Sort
              </button>
            </div>
            <div className="selectedAlgorithm">
              <h2>Selected Algorithm</h2>
              <p>{this.state.currentAlgorithm}</p>
            </div>
          </div>
          <div className="sortingAndButtonContainer">
            <div className="sortingCellGridContainer">
              <SortingCellGrid
                arrayNum={this.state.arrayNum}
                arrayColor={this.state.arrayColor}
              ></SortingCellGrid>
            </div>
            <div className="buttonContainer">
              <div className="sliderContainer">
                <h2>Number of Columns</h2>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={this.state.arrayNum.length}
                  onChange={(event) =>
                    this.generateNewArrays(event.target.value)
                  }
                  // onChange={({target: {value: radius}})}
                  className="numColumnsSlider"
                  id="slider"
                  step="1"
                ></input>
                <p>Current amount: {this.state.arrayNum.length}</p>
              </div>
              <div className="sliderContainer">
                <h2>Sorting delay</h2>
                <input
                  type="range"
                  min="1"
                  max="1000"
                  value={this.state.sortSpeed}
                  onChange={(event) =>
                    this.setState({
                      sortSpeed: event.target.value,
                    })
                  }
                  className="sliderSpeed"
                  id="slider"
                  step="1"
                ></input>

                <p>Delay per comparision: {this.state.sortSpeed} ms</p>
              </div>
              <button
                className="shuffleButton"
                title="Shuffle columns"
                onClick={() => this.shuffle()}
              >
                <ShuffleSvg className="shuffleSvg"></ShuffleSvg>
              </button>
              <button
                className="runButton"
                title="Run choosen algorithm"
                onClick={() => this.runAlgorithm()}
              >
                <PlaySvg className="playSvg"></PlaySvg>
              </button>
            </div>
          </div>
        </div>
        <h1 className="h1Part2">Visualization</h1>
      </main>
    );
  }
}
