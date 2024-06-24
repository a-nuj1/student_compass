import React from 'react'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend } from "chart.js"

import {Line, Doughnut,} from "react-chartjs-2"
import { position } from '@chakra-ui/react';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend)



export function LineChart(){
    const labels = getYM();
    const options = {
        responsive:true,
        plugins:{
            legend:{
                position:'bottom',
            },
            title:{
                display:true,
                text:"Yearly Views",
            },
        },
    };

    const data = {
        labels,
        datasets:[
            {
                label: "Views",
                data: [11,10,29,15,52,9,7,50,40,61,11,40],
                borderColor: "rgba(107, 70, 193, 0.5)",
                backgroundColor:"#6b46c1",
            },
        ],
    };

    return (
        <Line options = {options} data = {data} ></Line>
    )
}




export const DoughnutChart = ()=>{
    const data = {
        labels:["subscribed", "Not-subscribed"],
        datasets:[
            {
                // label:"Views" ,
                data: [13, 80],
                borderColor: ["rgba(62, 12, 171)","rgba(214, 43, 129)"],
                backgroundColor:["rgba(62, 12, 171, 0.3)","rgba(214, 43, 129, 0.3)"],
                borderWidth:1,
            },
        ],
    };
    return(
        <Doughnut data={data} />
    )
}


function getYM(){
    const labels = [];
    const months = [
        'january',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const currM = new Date().getMonth();

    for (let i = currM + 1; i < months.length; i++) {
        labels.push(months[i]);
    }
    // console.log(labels);

    for (let i = 0; i <= currM; i++) {
        labels.push(months[i]);
    }
    // console.log(labels);

    return labels;
}