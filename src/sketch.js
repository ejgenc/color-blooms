console.log("p5.js sketch loaded successfully!")

function setup () {
    let canvas_width = document.getElementById("canvas").clientWidth;
    let cnv = createCanvas(canvas_width, 500, P2D);
    cnv.parent("canvas");
    cnv.style("display", "block");
    noLoop();
}

function windowResized() {
    // --- Canvas resizing & responsiveness ---
    var canvas_width = document.getElementById("canvas").clientWidth;
    resizeCanvas(canvas_width, 500);
    // --- Canvas resizing & responsiveness ---
}

function draw () {
    color_blooms(shapeType="circle", shapeMode=CENTER, shapeCount=150,
                 shapeSize=150, sizeEnd=5, sizeIncrement=15, sizeIncNoise="medium",
                 squareArgs={}, 
                 sat=70, satNoise="high", hRange=[0, 360], hIncrement=5, hIncNoise = "medium",
                 bStart=80, bIncrement=5, bIncNoise="low", bDirection="decreasing",
                 startXNoise="medium", startYNoise="medium",
                 canvasBackground=(0, 60, 100));
    
}

function color_blooms(shape, shapeMode, shapeCount,
                      shapeSize, sizeEnd, sizeIncrement, sizeIncNoise="none",
                      squareArgs,
                      sat=50, satNoise="none", hRange, hIncrement, hIncNoise="none",
                      bStart=70, bIncrement, bIncNoise="none", bDirection="decreasing",
                      startXNoise="none", startYNoise="none",
                      canvasBackground) {
    
    let shapeVarDict = {"square": [rectMode, square],
                        "circle": [ellipseMode, circle]};

    let bDirectionDict = {"increasing": -1,
                          "decreasing": 1};

    let noiseDict = {
        sizeIncNoiseD: {"none": [0, 0],
                       "low": [-2, 2],
                       "medium": [-4, 4],
                       "high": [-8, 8]
        },
                                
        satNoiseD: {"none": [0, 0],
                   "low": [-10, 10],
                   "medium": [-20, 20],
                   "high": [-30, 30]

        },

        hIncNoiseD: {"none": [0, 0],
                     "low": [-10, 10],
                     "medium": [-20, 20],
                     "high": [-30, 30]
        },

        bIncNoiseD: {"none": [0, 0],
                     "low": [-2, 2],
                     "medium": [-3, 3],
                     "high": [-4, 4]
        },

        startXNoiseD: {"none": [0, 0],
                       "low": [-1, 1],
                       "medium": [-2, 2],
                       "high": [-3, 3]
        },

        startYNoiseD: {"none": [0, 0],
                       "low": [-1, 1],
                       "medium": [-2, 2],
                       "high": [-3, 3]
        },
    }

    if (squareArgs) {
        ({tl=0, tr=0, br=0, bl=0} = squareArgs);
    }

    colorMode(HSL);
    background(canvasBackground);
    shapeVarDict[shape][0](shapeMode);

    while (shapeCount > 0) {
        let startX = random(0, canvas.clientWidth);
        let startY = random(0, canvas.clientHeight);

        let size = shapeSize;
        let h = random(hRange[0], hRange[1]);
        let s = sat + random(noiseDict.satNoiseD[satNoise][0],
                             noiseDict.satNoiseD[satNoise][1]);
        let b = bStart;

        while (size >= sizeEnd) {
            noStroke()
            fill(h, s, b);

            startX += random(noiseDict.startXNoiseD[startXNoise][0],
                              noiseDict.startXNoiseD[startXNoise][1]);
            startY += + random(noiseDict.startYNoiseD[startYNoise][0],
                                noiseDict.startYNoiseD[startYNoise][1]);

            if (shapeType === "square") {
                if (squareArgs) {
                    shapeVarDict[shapeType][1](startX, startY, size,
                                               tl, tr, br, bl);
                }
                else {
                    shapeVarDict[shapeType][1](startX, startY, size); 
                }
            }
            else if (shapeType === "circle") {
                shapeVarDict[shapeType][1](startX, startY, size)
            } 

            size -= sizeIncrement + random(noiseDict.sizeIncNoiseD[sizeIncNoise][0],
                                           noiseDict.sizeIncNoiseD[sizeIncNoise][1]);
            h -= hIncrement + random(noiseDict.hIncNoiseD[hIncNoise][0],
                                     noiseDict.hIncNoiseD[hIncNoise][1]);
            b -= ((bDirectionDict[bDirection] * bIncrement) +
                   random(noiseDict.bIncNoiseD[bIncNoise][0],
                          noiseDict.bIncNoiseD[bIncNoise][1]));
        }
        shapeCount -= 1;
    }
}


