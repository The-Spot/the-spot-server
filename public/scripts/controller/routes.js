'use strict';

page('/find', find => { 
  $('.enter').on('submit', (event) => {
    $('.home container'.hide())
  })

});

// page('/form', )

// page('/results', )

page.start();