jQuery(document).ready(function($) {
    $("#show_subgroups").click(function() {
        document.getElementById('show_subgroups').style.display = 'none';
        jQuery(".hide").show();
        document.getElementById('hide_subgroups').style.display = 'inline-block';
    });
    
    $("#hide_subgroups").click(function() {
        document.getElementById('hide_subgroups').style.display = 'none';
        jQuery(".hide").hide();
        document.getElementById('show_subgroups').style.display = 'inline-block';
    });
});