
let divDrop = $('#div-with-pattern');
let divDrag = $('#cardDrag');
let checkMark = $('#checkmark');
let wrongMark = $('#wrongmark');
let successMessage = $('#successMessage');
let correctCount = 0;


$( init );

function init() {

  // Hide the success message
  successMessage.hide();
  successMessage.css( {
    left: '0px',
    top: '0px',
    width: 0,
    height: 0
  } );


  // Reset 
  divDrag.html( '' );
  checkMark.css('display','none');
  wrongMark.css('display','none');


  // Create the Drag of shuffled items
  let selected = [ 'pencil','eraser','compass','sharpaner','brush','triangle','book' ];
  let unSelected = [ 'calculator','pen','ruler'];
  let allItems = [...selected , ...unSelected];
  allItems.sort( function() { return Math.random() - .5 } );  

  // Give selected items class
  for ( let i=0; i<10; i++ ){
    for (let j=0; j<7; j++){
      if(allItems[i] === selected[j]){
        $('<div>' + allItems[i] + '</div>').attr( 'class', 'selected item btn btn-primary' ).appendTo( '#cardDrag' ).draggable( {
          containment: '#content',
          stack: '#cardDrag div',
          cursor: 'move',
          revert: true
        } );
      }
      else if (allItems[i] === unSelected[j]){
        $('<div>' + allItems[i] + '</div>').attr( 'class', 'unselected item btn btn-primary' ).appendTo( '#cardDrag' ).draggable( {
          containment: '#content',
          stack: '#cardDrag div',
          cursor: 'move',
          revert: true
        } );
      }
    }
  }

  divDrop.droppable( {
                accept: '#cardDrag div',
                hoverClass: 'hovered',
                drop: handledivDrop
                } );


  // solve Button
  $("#solve").one("click",function(){
  divDrag.find('.selected').animate({"top": "+=400px"},'slow', checkCollisions);

  setTimeout(function() { 
    correct();
  }, 600);

  setTimeout(function() { 
    showSuccessMessage();
  }, 1800);
  });
}


function handledivDrop(event, ui) {
    let draggedItem = ui.draggable[0] ;  

    if (draggedItem.classList.contains('selected')){
      $(draggedItem).css('display','none');
      correct();
      correctCount ++;

        if (correctCount % 7 == 0 )
        showSuccessMessage();
    }

    else{
      wrongMark.css('display','block');
      wrong();
    }
}

function correct (){
  $(divDrop).css("background-color", "#28a745");
  checkMark.css('display','block');
  
  setTimeout(function() { 
    checkMark.css('display','none');
    divDrop.css("background-color", "");
}, 1300);
}

function wrong (){
  wrongMark.css('display','block');
  
  setTimeout(function() { 
    wrongMark.css('display','none');
}, 1300);
}

function getPositions(box) {
  var $box = $(box);
  var pos = $box.position();
  var width = $box.width();
  var height = $box.height();
  return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
}

function comparePositions(p1, p2) {
  var x1 = p1[0] < p2[0] ? p1 : p2;
  var x2 = p1[0] < p2[0] ? p2 : p1;
  return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
}

function checkCollisions(){
  var box = divDrop[0];
  var pos = getPositions(box);
  var pos2 = getPositions(this);
  var horizontalMatch = comparePositions(pos[0], pos2[0]);
  var verticalMatch = comparePositions(pos[1], pos2[1]);            
  var match = horizontalMatch && verticalMatch;
  if (match) { divDrag.find('.selected').hide() }
}

function showSuccessMessage (){
  successMessage.show();
    successMessage.animate({
      left: '42.5%',
      top: '50%',
      width: '250px',
      height: '150px',
      opacity: 1
    });
}
