$(document).ready(function() {
    var formId = $(document).find("#formId_span").data("backend-id")
    $.ajax({
        type: 'GET',
        url: '/getForm/' + formId,
        success: function(data) {
            // Handle the form information
            console.log('Form Information:', data);
            injectGraphs(data)

        },
        error: function(error) {
            // Handle errors
            console.error('Error retrieving form information:', error);
        }
    });

    function injectGraphs(form) {
        const questionsContainer = $("#graphsContainer")

        $.each(form.graphs, function(index, graph) {

            var graph_div = $("<div>").attr({id: "chart-" + (graph.question).replace(" ", "-")})
            var chart_id = "chart" + (index + 1)
            var canvas = $('<canvas id=' + chart_id +' width="1000" height="600"></canvas>');
            questionsContainer.append(graph_div)
            graph_div.append("<h3> Question " + (index + 1) + ": " + graph.question + "</h3>")
            graph_div.append(canvas);

            var ctx = canvas[0].getContext('2d');
            if (graph.graphType == "HISTOGRAMGRAPH") {
                //drawBarGraph(form.graph[field.id])
                drawBarGraph(ctx, graph)
            }
            if (graph.graphType == "PIEGRAPH"){
                drawPieGraph(ctx, graph);
            }
        })
    }

    function drawBarGraph(ctx) {
        console.log("in bar")
        const graph = {
            question: "test",
            x_labels: ["val_10", "val_20", "val_30"],
            y_data: ["5", "8", "1"]
        }
        var myChart = new Chart(ctx, {
            type: 'bar', // or 'line', 'pie', etc.
            data: {
                labels: graph.x_labels,
                datasets: [{
                    label: 'Answers',
                    data: graph.y_data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false, // Disable aspect ratio
                responsive: false, // Make the chart responsive
                scales: {
                    y: {
                        beginAtZero: true,
                        scaleLabel: {
                            display: true,
                            labelString: "# of Responses"
                        }
                    },
                    x: {
                        scaleLabel: {
                            display: true,
                            labelString: "Values"
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: graph.question,
                        fontSize: 16
                    }
                }
            }
        });
        console.log("end bar")
        myChart.update();
    }

    function drawPieGraph(ctx, graph) {
        console.log("in pie")

        var myChart = new Chart(ctx, {
            type: 'bar', // or 'line', 'pie', etc.
            data: {
                labels: graph.x_labels,
                datasets: [{
                    label: 'Answers',
                    data: graph.y_data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false, // Disable aspect ratio
                responsive: false, // Make the chart responsive
                scales: {
                    y: {
                        beginAtZero: true,
                        scaleLabel: {
                            display: true,
                            labelString: "# of Responses"
                        }
                    },
                    x: {
                        scaleLabel: {
                            display: true,
                            labelString: "Values"
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: graph.question,
                        fontSize: 16
                    }
                }
            }
        });
        console.log("end bar")
        myChart.update();
    }
})