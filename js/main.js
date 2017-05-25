$(document).ready(function(){

  var recencyValues  = ["24 hours", "3 days", "7 days", "30 days", "Forever"];
  var distanceValues = ["1 km", "2 km", "3 km", "4 km", "5 km", "7 km", "10 km",
                        "15 km", "20 km", "30 km", "60 km", "100 km", "200 km",
                        "300 km", "400 km", "500 km", "1000 km", "Everywhere"];

  function getSliderLabel(name, index) {
    var label = "";
    if (name == "recent"
      && typeof recencyValues[index] !== 'undefined') {
      label = recencyValues[index];
    } else if (name == "radius"
      && typeof distanceValues[index] !== 'undefined') {
      label = distanceValues[index];
    }
    return label;
  }

  var $filters = $('#filters');
  function showFilters() {
    $filters.addClass('open').removeClass('closed');
  }
  function hideFilters() {
    $filters.removeClass('open').addClass('closed');
  }

  // Form Submit
  $('#searchForm').submit(function(e) {
    var dataObj = {'search': $('#searchInput').val()};
    $('input.slider').each(function() {
      dataObj[this.name] = getSliderLabel(this.name, (this.value - 1))
        .replace(/\s+/g, '').toLowerCase();;
    });
    dataObj['sort'] = $('input[name=sort]:checked').val();
    dataObj['country_only'] = $('input[name=country_only]').is(':checked');
    var categories = [];
    $('input[name=categories]:checked').each(function() {
      categories.push(this.value);
    });
    dataObj['categories'] = categories;

    hideFilters();
    $('#searchData').html(JSON.stringify(dataObj, undefined, 2));
    $('#myModal').modal();
    console.log(dataObj);

    return false;
  });

  $('#submitButton').click(function(e) {
    $('#searchForm').submit();
  });

  // Filter Dropdowns
  $('#searchInput')
    .focus(showFilters);
    //.blur(hideFilters);

  // Slider Labels
  $('input.slider').change(function(e) {
    var slideIndex = e.value.newValue - 1;
    $('#'+this.dataset.target).html(getSliderLabel(this.name, slideIndex));
  });

  // Category Checkboxes
  var categoryCheckboxes = $('input[name=categories]:checkbox');
  categoryCheckboxes.change(function(e) {
    if(this.value=='all') {
      categoryCheckboxes.removeAttr('checked');
      this.checked = true;
    } else {
      $('input[value=all]:checkbox').removeAttr('checked');
    }
  });
});
