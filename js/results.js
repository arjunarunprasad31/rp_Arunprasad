async function getData(fileLocation) {
    const response = await fetch(fileLocation);
    const data = await response.text();
    console.log(data);

    const xGroup = [];
    const yMean = [];

    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const columns = row.split(',');
        const group = columns[0];
        xGroup.push(group);

        const mean = parseFloat(columns[1]);
        yMean.push(mean);

        console.log(group, mean);
    })

    return{xGroup, yMean};
}

async function createChart(chartID, chartLabel, fileLocation) {
    const data = await getData(fileLocation);
    const barChart = document.getElementById(chartID);

    const myChart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: data.xGroup,
            datasets: [{
                label: chartLabel,
                data: data.yMean,
                borderWidth: 1,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.2)',
                    'rgba(0, 255, 0, 0.2)',
                    'rgba(0, 255, 255, 0.2)',
                    'rgba(0, 0, 255, 0.2)',
                    'rgba(255, 0, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 255, 0, 1)',
                    'rgba(0, 255, 255, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 0, 255, 1)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Group'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: chartLabel
                    }
                }
            }
        }
    })
}

createChart('barChart1', 'Leaf Length (mm)', 'data/leaf-length.csv');
createChart('barChart2', 'Leaf Width (mm)', 'data/leaf-width.csv');
createChart('barChart3', 'Leaf Count', 'data/leaf-count.csv');