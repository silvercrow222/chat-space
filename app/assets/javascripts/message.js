$(function() {
  function buildHTML(data){
    if ( data.image ) {
      let html = `<div class="MainChat__messageTop">
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
                  </div>`
      return html;
    } else {
      let html = `<div class="MainChat__messageTop">
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
                  </div>`
      return html;
    };
  };

  $('.MainChat__form').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MainChat__chatContents').append(html);
      $('.MainChat__formSend').prop('disabled', false);
      $('.MainChat__chatContents').animate({ scrollTop: $('.MainChat__chatContents')[0].scrollHeight });
      $('.MainChat__form')[0].reset();
    })
    .fail(function() {
      alert("メッセージの送信に失敗しました");
    });
  });
});