$(document).ready(function(){

  api_root       = "https://mysterious-reaches-87253.herokuapp.com/"
  all_notes_url  = api_root + 'api/notes'
  new_note_url   = api_root + 'api/notes?'
  tag_notes_url  = api_root + 'api/notes/tag/'

$(document).on('click', '.note_show', function(ev){
  // ev.preventDefault()
  id_to_fetch = $(ev.target).attr("href")
  console.log($(id_to_fetch).html())
  $('#modal_magic .modal-body').html($(id_to_fetch).html())
  $('#modal_magic').modal('show')
})

$('#post_note').on('submit', function(ev){
  ev.preventDefault()
  $.post(new_note_url + $(this).serialize())
    .done(function(note){
      $('#note_list').prepend(
        note_display(note.note)
      )
      reset_form('#post_note')
    })
})

$(document).on('click', '.tag_link', function(ev){
  ev.preventDefault()
  tag_name = $(ev.target).attr('href')
  console.log($(tag_name).html())
  $('#id_show').empty().append(` : ${tag_name}`)
  show_all_notes_that_have_specific_tag(tag_name)
})

function note_display(note) {
  return   `
    <div class="col-xs-12 note_entire" id='${note.id}'>
      <p>${note.title}<p>
      <div>
      <img src="https://vetstreet.brightspotcdn.com/dims4/default/d742db0/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F98%2Fd98250a0d311e0a2380050568d634f%2Ffile%2FGolden-Retriever-3-645mk062411.jpg" alt="Golden Retreiver Image" class="img-thumbnail", height=150px, width=300px>
      <p class='media-body note_body''><small>${note.body}</small></p>
      <p><small><a href='#${note.id}' class='note_show'>${moment(note.created_at).format('MMM Do YYYY, hh:mm:ss a')}</a></small></p>
      <p>${note.tags.map(function(tag){
        return `<a href=${tag.name} class='tag_link'>${tag.name}</a>`
      }).join(', ')}</p>
      </div>
    </div>
  `
}

function show_all_notes_that_have_specific_tag(tag_name) {
  $('#note_list').empty()
  $.getJSON(tag_notes_url + tag_name)
    .done(function(response){
      response.tag.notes.forEach(function(note){
        $('#note_list').append(
            note_display(note)
        )
      })
    })
  }


  function show_all_notes(){
    $('#note_list').empty()
    $.getJSON(all_notes_url)
      .done(function(response){
        response.notes.forEach(function(note){
          $('#note_list').append(
            note_display(note)
          )
        })
        if(window.location.hash){
          $('a[href="' + window.location.hash + '"]').click()
        }
      })
  }

  show_all_notes()
})
