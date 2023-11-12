$(document).ready(function(){

    $('#search').keyup(function (){
        $("#result").html('');
        let searchField = $('#search').val();
        let expression = new RegExp(searchField, "i");
        $.getJSON('/getFormsRest', function(data){
            $.each(data,function (key,value){
                if(value.id.search(expression) !== -1 && expression.source !== '(?:)'){
                    console.log(expression.source)
                    const redirectUrl = `/form/${value.id}`;
                    const link = document.createElement("a");
                    link.href = redirectUrl;
                    link.innerHTML = value.id + '<br>' ;
                    $('#result').append(link);
                }
            });
        });
    });
    $.ajax({
        type:'GET',
        url:'/getFormsRest',
        success: function(data) {
            // Handle the form information
            injectFields(data)

        },
        error: function(error) {
            // Handle errors
            console.error('Error retrieving form information:', error);
        }
    });
    function injectFields(forms){
        const formContainer = $("#formsContainer");

        $.each(forms, function(index, form){
            const fromLabel = $('<label>').attr('for',`${index + 1}`).text(`${index + 1}.${JSON.stringify(form)}`);
            const redirectUrl = `/form/${form.id}`;

            // Create an anchor element
            const link = document.createElement("a");

            // Set the href attribute with the dynamic variable
            link.href = redirectUrl;

            // Set the link text
            link.innerHTML = "Form: " + form.id + "<br><br>";
            fromLabel.css("display","block");
            formContainer.append(link);
        });

    }
});

