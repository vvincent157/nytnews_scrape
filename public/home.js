$(document).ready(function(){
    console.log("Hello Link")
    $.ajax({
        url: "/allarticles"
    }).then(function(data){
        console.log(data)
        for (let index = 0; index < data.length; index++) {
            console.log(data[index].title);
            var h1 = $('<h1>');
            h1.text(data[index].title); 
            var div = $('<div>').append(h1)
            var button = $('<button>').text('Save Me');
            button.attr('name', data[index]._id)
            button.addClass('saveButton')
            div.append(button);
            $('#article-section').append(div)
        }
    })

    $(document).on('click', '.saveButton', function(){
        console.log('we got clickee!!!', $(this).attr('name'));
        $.ajax({
            url: "/updateArticles/" + $(this).attr('name'),
            type: 'PUT'
        }).then(function(weGotThisBack){
            console.log('this is what we got back', weGotThisBack);

        })

        
    });

})