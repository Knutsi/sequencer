/**
 * Created by KnutSindre on 25.01.2015.
 */

function enable_navstop() {
    window.onbeforeunload = function () {
        return "We ask that you do not use the back button during this experiment.  Please press cancel."
    }
}

function go_nostop(url) {
    window.onbeforeunload = undefined;
    window.location.href = url;
}


enable_navstop();