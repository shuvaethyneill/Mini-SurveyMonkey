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
        console.log("In inject graphs")
        console.log(form)
        const questionsContainer = $("#graphsContainer")

        $.each(form.graphs, function(index, graph) {

            const visual_div = $("<div>").attr({id: "chart-" + (graph.fieldName).replace(" ", "-")})
            questionsContainer.append(visual_div)
            visual_div.append("<h3> Question " + (index + 1) + ": " + graph.fieldName + "</h3>")
            var chart_id = "chart" + (index + 1)

            if (graph.graphType === "HISTOGRAMGRAPH") {
                //drawBarGraph(form.graph[field.id])
                var canvas = $('<canvas id=' + chart_id +' width="1000" height="600"></canvas>');
                var ctx = canvas[0].getContext('2d');
                visual_div.append(canvas);
                drawBarGraph(ctx, graph)
            }
            else if (graph.graphType === "PIEGRAPH"){
                var canvas = $('<canvas id=' + chart_id +' width="1000" height="600"></canvas>');
                var ctx = canvas[0].getContext('2d');
                visual_div.append(canvas);
                drawPieGraph(ctx, graph);
            } else if (graph.graphType === "TEXT") {
                displayTextResponses(visual_div, graph)
            }
        })
    }

    function displayTextResponses(visual_div, graph) {
        console.log("in display text responses")
        var table = $("<table>").css({
            'border-collapse': 'collapse',
            'width': '100%',
            'border': '1px solid #ddd',
            'margin-top': '10px',
            'max-height': '200px',
            'overflow-y': 'auto' // vertical scrolling
        });

        graph.textResponses.forEach(function(response) {
            var row = $("<tr>").css('border-bottom', '1px solid #ddd'); // Add border-bottom for each row
            var cell = $("<td>").css({
                'border': '1px solid #ddd',
                'padding': '8px',
                'text-align': 'left'
            }).text(response);
            row.append(cell);
            table.append(row);
        });

        visual_div.append(table);
        /*
        var textList = $("<ul>");
        graph.textResponses.forEach(function(response) {
            var listItem = $("<li>").text(response);
            textList.append(listItem);
        });
        visual_div.append(textList);

         */
    }

    function drawBarGraph(ctx) {
        var myChart = new Chart(ctx, {
            type: 'bar', // or 'line', 'pie', etc.
            data: {
                labels: graph.xLabels,
                datasets: [{
                    label: 'Answers',
                    data: graph.yData,
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
                        text: graph.fieldName,
                        fontSize: 16
                    }
                }
            }
        });
        console.log("end bar")
        myChart.update();
    }

    function drawPieGraph(ctx,graph) {
        console.log("in pie")
        console.log("graph")

        var myChart = new Chart(ctx, {
            type: 'pie', // or 'line', 'pie', etc.
            data: {
                labels: graph.xLabels,
                datasets: [{
                    data: graph.yData,
                    backgroundColor: getRandomColor(graph.yData.length),
                }]
            },
        });
        console.log("end pie")
        myChart.update();
    }

    function getRandomColor(length) {
        const colors = []
        for(let l = 0; l<length; l++){
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            colors.push(color);
        }
        return colors;

    }
})