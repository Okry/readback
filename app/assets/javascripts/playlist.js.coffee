$(document).on 'ready page:load', ->
  if location.pathname is '/'
    location.hash = '#now'
    $('[autofocus]').focus()

  showNowButton = ->
    $('h4.small-caps-title').animate {width: '85%'}, {duration: 'fast', queue: off}
    $('#now-button').fadeIn 'fast'

  enableScroll = ->
    now = $('#now')
    if now.offset()
      $(window).scroll ->
        diff = Math.abs $(window).scrollTop() - now.offset().top
        if diff > 100
          showNowButton()
          $(window).off 'scroll'
  enableScroll()

  $('#now-button').on 'click touchend', ->
    event.preventDefault()
    $('html, body').animate {scrollTop: $(this.hash).offset().top}, 'fast', ->
      $('h4.small-caps.title').animate {width: '100%'}, {duration: 'fast', queue: off}
      $('#now-button').hide()
      enableScroll()

  $('#submit-to-previous-show').on 'click touchend', ->
    previous = $('#submit-to-previous-show').attr 'data-previous-show'
    $('#override_episode').val 'true'
    $('form#new_song').attr 'action', "/episodes/#{previous}/songs"

  $('#trainee-attendance-hdr').on 'click touchend', ->
    $('#trainee-attendance').slideToggle 'fast'