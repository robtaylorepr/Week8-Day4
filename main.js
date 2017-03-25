$(document).ready(function(){

  api_root       = "https://mysterious-reaches-87253.herokuapp.com/"
  all_notes_url  = api_root + 'api/notes'
  tag_notes_url  = api_root + '/api/notes/tag/'

$('#post_note').on('submit', function(ev){
  ev.preventDefault()
  $.post(api_root + "notes/create?token=" + get_token(), $(this).serialize())
    .done(function(note){
      $('#note_list').prepend(
        note_display(note)
      )
      reset_form('#post_note')
    })
})

$(document).on('click', '.tag_link', function(ev){
  ev.preventDefault()
  tag_name = $(ev.target).attr('href')
  console.log($(tag_name).html())
  populate_notes(tag_name)
})

function note_display(note) {
  return   `
    <div class="col-xs-12 note_entire">
      <p>${note.title}<p>
      <div>
      <img src="https://vetstreet.brightspotcdn.com/dims4/default/d742db0/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F98%2Fd98250a0d311e0a2380050568d634f%2Ffile%2FGolden-Retriever-3-645mk062411.jpg" alt="Golden Retreiver Image" class="img-thumbnail", height=150px, width=300px>
      <p class='media-body note_body''><small>${note.body}</small></p>
      <p><small>${moment(note.created_at).format('MMM Do YYYY, hh:mm:ss a')}</small></p>
      <p>${note.tags.map(function(tag){
        return `<a href=${tag.name} class='tag_link'>${tag.name}</a>`
      }).join(', ')}</p>
      </div>
    </div>
  `
}

function populate_notes(tag_name) {
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


  function first_load(){
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

  first_load()
})
