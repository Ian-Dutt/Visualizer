export function selectionSort(arr){
  const animationOrder = []
  let minIdx
  for(let i = 0; i < arr.length - 1; i++){
    minIdx = i;
    for(let j = i + 1; j < arr.length; j++){
        animationOrder.push(j)
        if(arr[j] < arr[minIdx]) {
            minIdx = j
        }
    }
    swap(arr, minIdx, i)
    animationOrder.push([i, minIdx])
  }
  return animationOrder
}

export function bubbleSort(arr){
  let swapped = false
  const animationOrder = []
  for(let i = 0; i < arr.length - 1; i++){
    swapped = false
    for(let j = 0; j < arr.length - i - 1; j++){
      animationOrder.push(j)
      if(arr[j] > arr[j + 1]){
        swap(arr, j, j+1)
        animationOrder.push([j, j+1])
        swapped = true
      }
    }
    if(swapped === false) break
  }
  return animationOrder
}
/*
MergeSort algorithm adapted from https://www.geeksforgeeks.org/merge-sort/#


*/
export function mergeSort(arr){
    const animationOrder = []
    function merge(l, m, r){
        const n1 = m-l+1;
        const n2 = r-m;
        if(n1 === 0 || n2 === 0) return
        const leftArr = new Array(n1)
        const rightArr = new Array(n2)

        for(let i = 0; i < n1; i++) leftArr[i] = arr[l+i]
        for(let j = 0; j < n2; j++) rightArr[j] = arr[m+1+j]

        let i = 0
        let j = 0
        let k = l

        while(i < n1 && j < n2){
            let move
            if(leftArr[i] <= rightArr[j]){
                arr[k] = leftArr[i]
                move = [k, leftArr[i]]
                i++
            }else{
                arr[k] = rightArr[j]
                move = [k, rightArr[j]]
                j++
            }
            animationOrder.push(move)
            k++
        }
        

        while (i < n1) {
            arr[k] = leftArr[i];
            animationOrder.push([k, leftArr[i]])
            i++;
            k++;
        }
     
        // Copy the remaining elements of
        // R[], if there are any
        while (j < n2) {
            arr[k] = rightArr[j];
            animationOrder.push([k, rightArr[j]])
            j++;
            k++;
        }
    }
    function sort(l, r){
        if(l>=r) return
        const m = l + parseInt((r-l)/2)
        sort(l, m)
        sort(m+1, r)
        merge(l, m ,r)
    }
    sort(0, arr.length-1)
    console.log(animationOrder)
    return animationOrder
}

function swap(arr, i, j){
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}