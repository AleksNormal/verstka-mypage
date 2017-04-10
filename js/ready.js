/**
 * Created by Master on 06.04.2017.
 */
$(document).ready(function(){
   var circuleOption = {
       animation: 1,
       animationStep: 5,
       foregroundBorderWidth: 10,
       backgroundBorderWidth: 25,
       foregroundColor: '#99cc33',
       backgroundColor: '#eeeeee',
       fontColor: '#99cc33',
       percentageTextSize: 30,
       animateInView: true,
       percentageY: 110
   };
    var options = circuleOption;
    options.percent = 100;
    $('#circle-opencart').circliful(options);



    options.percent = 95;
    options.replacePercentageByText = '95/100';
    $('#circle-pagespeed').circliful(options);

    options.replacePercentageByText = null;
    options.percent = 100;
    $('#circle-seo').circliful(options);

    options = circuleOption;
    options.percent = 0;
    options.backgroundColor = '#99cc33';
    options.foregroundColor = '#eeeeee';
    options.backgroundBorderWidth = 10;
    options.foregroundBorderWidth = 25;
    options.noPercentageSign = true;
    $('#circle-errors').circliful(options);
});