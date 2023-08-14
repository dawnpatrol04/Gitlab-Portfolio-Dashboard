// Disable the on-canvas tooltip
Chart.defaults.pointHitDetectionRadius = 1;
Chart.defaults.plugins.tooltip.enabled = false;
Chart.defaults.plugins.tooltip.mode = 'index';
Chart.defaults.plugins.tooltip.position = 'nearest';
Chart.defaults.plugins.tooltip.external = coreui.ChartJS.customTooltips;
Chart.defaults.defaultFontColor = '#646470';
 

document.addEventListener('DOMContentLoaded', (event) => {
    fetch(API_URL + '/users/count-per-month/') // <-- use the global variable
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const cardChartUsers = new Chart(document.getElementById('kpi-card-users-data'), {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Users added',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: coreui.Utils.getStyle('--cui-primary'),
                        data: data.data
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: false
                            }
                        },
                        y: {
                            min: Math.min(...data.data) - .2, // Adjusting the min based on the data
                            max: Math.max(...data.data) + .2, // Adjusting the max based on the data
                            display: false,
                            grid: {
                                display: false
                            },
                            ticks: {
                                display: false
                            }
                        }
                    },
                    elements: {
                        line: {
                            borderWidth: 1,
                            tension: 0.4
                        },
                        point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching chart data:', error));
});




document.addEventListener('DOMContentLoaded', (event) => {
    fetch(API_URL + '/projects/count-per-month/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const cardChartProjects = new Chart(document.getElementById('kpi-card-projects-data'), {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Projects added',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: coreui.Utils.getStyle('--cui-info'),
                        data: data.data
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: false
                            }
                        },
                        y: {
                            min: Math.min(...data.data) - .2, // Adjusting the min based on the data
                            max: Math.max(...data.data) + .2, // Adjusting the max based on the data
                            display: false,
                            grid: {
                                display: false
                            },
                            ticks: {
                                display: false
                            }
                        }
                    },
                    elements: {
                        line: {
                            borderWidth: 1
                        },
                        point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching chart data:', error));
});

document.addEventListener('DOMContentLoaded', (event) => {
    fetch(API_URL + '/pipelines/count-per-month/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const cardChartPipelines = new Chart(document.getElementById('kpi-card-pipelines-data'), {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Pipelines added',
                        backgroundColor: 'rgba(255,255,255,.2)',
                        borderColor: 'rgba(255,255,255,.55)',
                        data: data.data,
                        fill: true
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            display: false
                        },
                        y: {                            
                        min: Math.min(...data.data) - .2, // Adjusting the min based on the data
                        max: Math.max(...data.data) + .2, // Adjusting the max based on the data
                            display: false
                        }
                    },
                    elements: {
                        line: {
                            borderWidth: 2,
                            tension: 0.4
                        },
                        point: {
                            radius: 0,
                            hitRadius: 10,
                            hoverRadius: 4
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching chart data:', error));
});



document.addEventListener('DOMContentLoaded', (event) => {

    function handleErrors(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    fetch(API_URL + '/commits/count-per-month/')
        .then(handleErrors)
        .then(data => {
            const cardChart4 = new Chart(document.getElementById('kpi-card-commits-data'), {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Commit dataset',
                        backgroundColor: 'rgba(255,255,255,.2)',
                        borderColor: 'rgba(255,255,255,.55)',
                        data: data.data,
                        barPercentage: 0.6
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                drawTicks: false
                            },
                            ticks: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                display: false,
                                drawBorder: false,
                                drawTicks: false
                            },
                            ticks: {
                                display: false
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching chart data for commits:', error));
});

document.addEventListener('DOMContentLoaded', (event) => {

    // ... other fetch functions ...

    fetch(API_URL + '/pipelines/by-source-per-month/')
    .then(response => response.json())
    .then(data => {
        const labels = [...new Set([].concat(...Object.keys(data).map(key => Object.keys(data[key]))))];
        const datasets = Object.keys(data).map((source, index) => {
            return {
                label: source,
                borderColor: coreui.Utils.getStyle(`--cui-${['info', 'success', 'danger'][index % 3]}`),
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: labels.map(label => data[source][label] || 0),
                fill: false
            };
        });

        const chartPipeDetail = new Chart(document.getElementById('pipeline-detail-chart'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 5,
                            fontSize: 14,
                            fontStyle: 'bold',
                            fontColor: '#444',
                            padding: 5,
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    y: {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.4
                    },
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                        hoverBorderWidth: 3
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching pipelines by source per month:', error));

});



