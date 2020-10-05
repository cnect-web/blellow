function show_subgroups() {
    if(document.getElementById('show_subgroups')) {
        document.getElementById('show_subgroups').style.display = 'none';
        jQuery(".hide").show();
        document.getElementById('hide_subgroups').style.display = 'block';
    }
};

function hide_subgroups() {
    if(document.getElementById('show_subgroups')) {
        document.getElementById('hide_subgroups').style.display = 'none';
        jQuery(".hide").hide();
        document.getElementById('show_subgroups').style.display = 'block';
    }
};
