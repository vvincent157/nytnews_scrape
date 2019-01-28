$(document).ready(function(){
    console.log("Hello Link")
    $.ajax({
        url: "/allarticles"
    }).then(function(data){
        console.log(data)
        for (let index = 0; index < data.length; index++) {
            console.log(data[index].title);
            
        }
    })

})