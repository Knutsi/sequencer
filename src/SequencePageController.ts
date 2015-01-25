/**
 * Created by KnutSindre on 22.01.2015.
 */

/// <reference path="QueryString.ts" />
/// <reference path="Sequence.ts" />

module seq {

    export class SequencePageController {

        // variables that hold UI elements:
        list:HTMLDivElement;
        view:HTMLIFrameElement;

        // variables that identify the experiment:
        experiment_id:string;

        // variables that hold internal state:
        private _current_step:number = -1;   // the url in the sequence we currently are at.
        private _sequence:Sequence;
        private interval_id:number = null;


        constructor(load_url="sequences/main_sequence.json", list_role="list", view_role="view") {
            window.onbeforeunload = function() {
                return "We ask that you do not use the back button during this experiment.  Please press cancel."
            }

            // we'll load our div and iframe elements using the role names they have
            this.list = <HTMLDivElement>document.querySelector("[data-seq-role=" + list_role + "]");
            this.view = <HTMLIFrameElement>document.querySelector("[data-seq-role=" + view_role + "]");

            // generate experiment ID:
            var series = QueryString.series || "DEFAULT";
            this.experiment_id = series + "." + Math.random().toString();
            document.title += "-#" + this.experiment_id;

            // if we have a url to load, we load it now:
            if(load_url) {
                this.loadSequencefromUrl(load_url)
            }

            // start trigger-watcher:
            this.interval_id = setInterval( () => { this.handle_checkTrigger() }, 50 )
        }

        loadSequencefromUrl(url:string) {
            this.sequence = Sequence.fromURL(url);
            console.log("SequencePageController - loaded sequence at '" + url + "'");
        }

        renderList() {
            this.list.innerHTML = "";
            var ol = document.createElement("ol");
            this.list.appendChild(ol);

            this.sequence.entries.forEach(
                (entry, i) => {

                    var li = document.createElement("li");
                    ol.appendChild(li);

                    li.innerText = entry.title;
                    if(i == this.current_step) {
                          li.className = "active_item";
                    }
                }
            );
        }

        get sequence():Sequence {
            return this._sequence;
        }

        set sequence(sequence:Sequence) {
            this._sequence = sequence;
            this.current_step = 0;
        }

        get current_step() {
            return this._current_step;
        }

        set current_step(step:number) {

            if(step != this.current_step) {
                console.log("SequencePageController - Stepping to " + step);

                // prevents the timer from re-reading the nextpage and overstepping
                //this.view.src = "about:blank";

                // update internal counter:
                this._current_step = step;

                // update the list, and change view to the address of this step:
                this.renderList();
                var url = this.sequence.entries[step].url.replace("{EXPID}", this.experiment_id)
                this.view.src = url;

                // update location hashtag to make the back button less efficient, should the user apply it:
                document.location.hash = this.current_step.toString();
            }
        }

        handle_checkTrigger() {
            // make sure interval does not fire:
            if(this.interval_id != null) {
                clearInterval(this.interval_id);
                this.interval_id = null;
            }


            // we probably cannot access the contentDocument property of the iframe as
            // this voilates same-origin-policy, so we need to expect exceptions:

            try {
                var current_frame_url = this.view.contentDocument.location.href;
                if(current_frame_url.indexOf('nextplease.html') != -1) {
                    this.current_step++;
                }

            } catch (err) {
                // expected - no action needed
            }
            finally {
                this.interval_id = setInterval(() => { this.handle_checkTrigger() }, 50);
            }
        }
    }



}