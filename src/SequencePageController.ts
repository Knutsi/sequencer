/**
 * Created by KnutSindre on 22.01.2015.
 */

module seq {

    export class SequencePageController {

        list:HTMLDivElement;
        view:HTMLIFrameElement;

        private _current_step:number = -1;   // the url in the sequence we currently are at.
        private _sequence:Sequence;


        constructor(load_url="sequences/main_sequence.json", list_role="list", view_role="view") {
            /* we'll load our div and iframe elements using the role names they have */
            this.list = <HTMLDivElement>document.querySelector("[data-seq-role=" + list_role + "]");
            this.view = <HTMLIFrameElement>document.querySelector("[data-seq-role=" + view_role + "]");

            // if we have a url to load, we load it now:
            if(load_url) {
                this.loadSequencefromUrl(load_url)
            }
        }

        loadSequencefromUrl(url:string) {
            this.sequence = Sequence.fromURL(url);
            console.log("SequencePageController - loaded sequence at '" + url + "'");
        }

        renderList() {

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

                this._current_step = step;

                // update the list, and change view to the address of this step:
                this.renderList();
                this.view.document.location.href = this.sequence.entries[step].url;
            }
        }

        handleNextPageTrigger() {

        }

    }

}