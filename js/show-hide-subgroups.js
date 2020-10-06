function show_subgroups() {
    document.getElementById('show_subgroups').style.display = 'none';
    jQuery(".hide").show();
    document.getElementById('hide_subgroups').style.display = 'inline-block';
};

function hide_subgroups() {
    document.getElementById('hide_subgroups').style.display = 'none';
    jQuery(".hide").hide();
    document.getElementById('show_subgroups').style.display = 'inline-block';
};
