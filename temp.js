data = $.ajax({url: all_notes_url,
               data_type: 'json',
               async: true})
        .done(function(response){
          response.notes.forEach(function(note){
            // console.log(note.created_at)
            $('#note_list').append(
              `   <p> Function here </p>
                  <div class="col-xs-12 note_entire">
                    <p>${note.title}<p>
                    <div>
                    <img src="https://vetstreet.brightspotcdn.com/dims4/default/d742db0/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F98%2Fd98250a0d311e0a2380050568d634f%2Ffile%2FGolden-Retriever-3-645mk062411.jpg" alt="Golden Retreiver Image" class="img-thumbnail", height=150px, width=300px>
                    <p class='media-body note_body''><small>${note.body}</small></p>
                    <p><small>${moment(note.created_at).format('MMM Do YYYY, hh:mm:ss a')}</small></p>
                    <p>${note.tags.map(function(tag){
                      return `<a href='#'>${tag.name}</a>`
                    }).join(', ')}</p>
                    </div>
                  </div>
              `
            )
          })
        })
})
