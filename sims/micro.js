import React from 'react';
import Sketch from 'react-p5';

function Microstates() {
    let barchartWidth = 900;
    let barchartHeight = 125;
    let canvasWidth = 922;
    let canvasHeight = 600;
    let x_offset = -75;
    let y_offset = 350;
    
    // cite
    function findCombinations(q, p) {
      let results = [];
  
      function helper(currentSum = 0, currentList = []) {
          if (currentList.length === p) {
              if (currentSum === q) {
                  results.push([...currentList]);
              }
              return;
          }
  
          for (let i = 0; i <= q - currentSum; i++) {
              helper(currentSum + i, [...currentList, i]);
          }
      }
  
      helper();
      return results;
  }
            
            function fact(n) { 
                let res = 1; 
                if(n === 0)
                    return 1;
                for (let i = 2; i <= n; i++) 
                    res = res * i; 
                return res; 
            }
    
    function genArr(n) {
        let newArr = [];
        for (let i = 0; i < n; i++) {
            newArr.push(i);
        }
        return newArr;
    }
    
            // https://www.geeksforgeeks.org/transpose-a-two-dimensional-2d-array-in-javascript/#
            // function transpose(arrays) {
            //     return arrays[0].map((_, i) => arrays.map(array => array[i]));
            // }
            
            function freqMap(dist){
              var freq = new Map();
              for (const element of dist) {
                    if (freq.has(element, 1)){
                        var val = freq.get(element);
                        freq.set(element, val+1);
                    } else {
                        freq.set(element, 1);
                    }
                }
              return freq;
            }
            
            function freqArr(distArr){
                let arr = []
                for (const dist of distArr){
                    arr.push(freqMap(dist));
                }
                return arr;
            }
            
            function combProb(dist, q){
                let denom = 1;
                var freq = freqMap(dist, q);
                for (const key of freq.keys()) {
                    denom *= fact(freq.get(key));
                  }
                return fact(q)/denom;
            }
            
            function findTotalW(distArr, q){
                let W_tot = 0;
                for (const dist of distArr){
                    let W_d = combProb(dist, q);
                    W_tot += W_d;
                }
                return W_tot;
            }
            
            function findProbs(distArr, q){
                var arr = [];
                var W_tot = findTotalW(distArr, q);
                for (const dist of distArr){
                    arr.push(combProb(dist, q)/W_tot);
                }
                return arr;
            }
            
            function genComb(q, p){
              var comb = findCombinations(q, p);
              var combSet = new Set(comb.map(arr => JSON.stringify(arr.sort((a, b) => a - b))));
              var uniqueComb = Array.from(combSet, str => JSON.parse(str));
              return uniqueComb;
            }
        
            function combArr(fmap, q){
              var arr = [];
              for (let i=0; i<q+1; i++){
                if (fmap.has(i)){
                  arr.push(fmap.get(i))
                } else {
                    arr.push(0);
                }
              }
              return arr;
            }
            
            function finalCombTable(distArr, q){
                var arr = freqArr(distArr);
                var res = [];
                var labely = [];
                var labelx = [];
                for (let i=0; i<arr.length; i++){
                    let x = combArr(arr[i],q);
                    labelx.push(i+1);
                    res.push(x);
                    if (i < arr.length-1){
                        labely.push(i);
                }
            }
        return [labelx, res];
    }
    
    var q = 0;
    var p = 1;
    
    function setup(p5) {
        let canvas = document.getElementById('simCenterContainer');
        let p5Canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvas);
        p5Canvas.position(0,0,'relative');
        p5.noLoop();
    
    
      // Add color options with names and values.
     
      let b1 = p5.createButton('+');
      b1.position(50, 10);
      b1.mousePressed(reset1);
      
      let b2 = p5.createButton('-');
      b2.position(100, 10);
      b2.mousePressed(reset2);
      
      let b3 = p5.createButton('+');
      b3.position(150, 10);
      b3.mousePressed(reset3);
      
      let b4 = p5.createButton('-');
      b4.position(200, 10);
      b4.mousePressed(reset4);
    }
    
    function reset1(p5){
    //   p5.background(220);
      q += 1;
      gen(q,p);
    }
    
    function reset2(p5){
    //   p5.background(220);
        q -= 1;
        gen(q,p);
    }
    
    function reset4(p5){
        // p5.background(220);
        p -= 1;
        gen(q, p);
    }
    
    function reset3(p5){
        // p5.background(220);
      p += 1;
      gen(q, p);
    }
    
    function genDist(p5,arr, x1, x2, y1, y2, j=0){
      var fontSize = 13.5;
      var tableTop = y1;
      var tableBottom = y2;
      var rows = arr.length;
      p5.textSize(fontSize);
      for (let i=0; i<rows; i++){
        var y = p5.map(i, 0, rows, tableTop, tableBottom);
        
        if(i == 0){
          if (j == 0){
            p5.text('Quanta', x1-8, y);
          } else {
            p5.text('Dist. ' + j, x1, y);
          } 
        }
        
        if (j == 0){
            p5.fill(0);
          p5.text(arr[rows - 1 - i], x1 + 2, y + 1.1*fontSize);
        } else {
          if (arr[rows -1 - i] > 0){
            p5.fill('tomato');
            p5.text(arr[rows - 1 - i], x1 + 2, y + 1.1*fontSize);
          } else {
            p5.fill(100, 150, 255);
            p5.text(arr[rows - 1 - i], x1 + 2, y + 1.1*fontSize);
          }
        }
        p5.fill(0);
        p5.line(x1, y + 1.2*fontSize, x2, y + 1.2*fontSize );
        
      }
    }
    
    function genDists(p5,arr2d, x1, x2, y1, y2, padding){
      let temp1 = x1;
      let temp2 = x2;
      let dx = x2 - x1;
      let j = 1;
      for (const arr of arr2d){
        genDist(p5, arr, temp1, temp2, y1, y2, j);
        j += 1;
        temp1 = temp2 + padding;
        temp2 = temp1 + dx;
      }
    }
    
    function gen(p5, q, p){
      let com = genComb(q,p);
      let data = findProbs(com,q);
      let arr = finalCombTable(com,q);
      let label = genArr(q+1);
      genDist(p5,label, 30, 60, 70, 300);
      genDists(p5,arr[1], 80, 110, 70, 300, 23);
      drawBar(p5,data,arr[0]);
    }
    
    function drawBar(p5,data,labels) {
        let chartWidth = barchartWidth * 0.8; // 80% of canvas width
        let chartHeight = barchartHeight * 0.8; // 80% of canvas height
        let barWidth = chartWidth / data.length; // Calculate bar width
        let maxDataValue = p5.max(data); // Find the maximum data value
        
        // Draw bars
        for (let i = 0; i < data.length; i++) {
            let barHeight = p5.map(data[i], 0, maxDataValue, 0, chartHeight); // Scale bar height
            let x = x_offset + barchartWidth * 0.2 + i * barWidth; 
            let y = y_offset + barchartHeight * 0.9 - barHeight; 
            
            p5.fill(100, 150, 255); // Bar color
            p5.noStroke(); // No outline
            p5.rect(x, y, barWidth-5, barHeight);
        }
    
        p5.textAlign(CENTER, CENTER);
        p5.textSize(10);
        p5.fill(0);
        for (let i = 0; i < data.length; i++) {
            let x = x_offset + barchartWidth * 0.2 + i * barWidth + (barWidth - 5) / 2;
            let y = y_offset + barchartHeight * 0.95;
            p5.text(data[i].toFixed(2), x, y); // Display data value below each bar
            p5.text(labels[i], x, y+15); // Display data value below each bar
        }
    }
    
    function draw(p5) {
        p5.textSize(15);
        p5.text('q',30, 25);
        p5.text('p',130, 25);
      
    }
        
return (
    <Sketch setup={setup} draw={draw} />
)
}

export default Microstates;