$(function() {
  function buildHTML(data){
    if ( data.image ) {
      let html = `<div class="MessageBox" data-message-id=${data.id}>
                    <div class="MainChat__messageTop">
                      <div class="MainChat__messageTop--name">
                        ${data.user_name}
                      </div>
                      <div class="MainChat__messageTop--day">
                        ${data.created_at}
                      </div>
                    </div>
                    <div class="MainChat__messageContents">
                      <p>
                        ${data.body}
                      </p>
                      <image src="${data.image}">
                    </div>
                  </div>`
      return html;
    } else {
      let html = `<div class="MessageBox" data-message-id=${data.id}>
                    <div class="MainChat__messageTop">
                      <div class="MainChat__messageTop--name">
                        ${data.user_name}
                      </div>
                      <div class="MainChat__messageTop--day">
                        ${data.created_at}
                      </div>
                    </div>
                    <div class="MainChat__messageContents">
                      <p>
                        ${data.body}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  };

  let reloadMessages = function() {
    let last_message_id = $('.MessageBox:last').data('message-id');
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages);
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message);
        });
        $('.MainChat__chatContents').append(insertHTML);
        $('.MainChat__chatContents').animate({ scrollTop: $('.MainChat__chatContents')[0].scrollHeight });
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  setInterval(reloadMessages, 7000);
});