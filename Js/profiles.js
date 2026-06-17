const profiles =
document.querySelectorAll(
".profile-card"
);

profiles.forEach(profile => {

    profile.addEventListener(
    "click",
    function(){

        const selectedProfile =
        this.dataset.profile;

        localStorage.setItem(
        "selectedProfile",
        selectedProfile
        );

        window.location.href =
        "dashboard.html";

    });

});