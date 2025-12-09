import { useState } from "react"

export const TabGenerator = ({rows,colums}) => {
    const [matrix, setMatrix] = useState([])
    const generateGrid = () => {
        let arr = Array.from({length: rows}, () => Array(colums).fill(0))
            console.log("arr>>>>", )
            let cnt = 0 
        for(let i=0; i<rows;i++) {
            if(i%2 === 0) {
                for(let j=0;j<colums;j++) {
                    arr[i][j] = ++cnt;
                }
            } else {
                for(let j= colums-1 ; j>=0;j--) {
                    arr[i][j] = ++cnt;
                }
            }
        }

        console.log("arr>>>",arr)
        setMatrix(arr)
        return arr;
    }
    return <div>
        <div>
        <label for="rows">Rows</label>
        <input id="rows" value={rows} name="rows"/>
        </div>
        <div>
        <label for="columns">COlumns</label>
        <input id="columns" value={colums} name="columns"/>
        <button onClick={generateGrid}>Submit</button>
        </div>
        <div style={{boder: "1px solid black"}} className="flex">
           {
            matrix && matrix?.map((row, index)=> {
                return  <div className="flexColumn padding8">{row?.map((col, index) => {
                    return <div>{col}</div>
                })}
                </div>
            })

           }
        </div>
    </div>
}