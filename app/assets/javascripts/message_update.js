$(function() {
  function buildHTML(message) {
    var img = "";
    if (message.image) {
      img= `<img src= ${message.image} class="main2__image">`;
    }
    var html = `<div class="main__message">
                  <p class="main__message__name">${message.user_name}</p>
                  <p class="main__message__date">${message.created_at}</p>
                </div>
                <div class="main__message">
                  <p class="main__message__body">${message.content}</p>
                  <span src:${message.image_url}, class="main2__image"></span>
                </div>`
    return html;
  }
    function scroll() {
      $('.messages').stop().animate({scrollTop: $('.messages')[0].scrollHeight});
    }

  $(function(){
    $(function(){
      if (location.pathname.match(/\/groups\/\d+\/messages/)){
        var interval = setInterval(update, 5000);
      }
    });
    function update(){
      if ($('.main__body__messages')[0]){
        var messageId = $('.main__body__messages:last').attr('message_id');
        console.log(messageId)
      } else {
        return false
      }
      $.ajax({
        url: location.pathname,
        type: "GET",
        data: {id : messageId},
        dataType: 'json'
      })
      .done(function(data){
      console.log(data);
        if (data.length){
           data.forEach(function(message){
           var html = buildHTML(message);
            $('.messages').append(html);
            scroll()
          })
        }
      })
      .fail(function(){
        alert('自動更新に失敗しました')
      })
      clearInterval();
    }
  });
});
