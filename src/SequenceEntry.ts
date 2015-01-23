/**
 * Created by KnutSindre on 23.01.2015.
 */

module seq {

    export class SequenceEntry {

        title:string;
        url:string;
        triggerNextURLRegex:string;

        static fromObject(obj:any):SequenceEntry {

            var entry = new SequenceEntry();

            entry.title = obj.title;
            entry.url =  obj.url;
            entry.triggerNextURLRegex = obj.triggerNextURLRegex;

            return entry;
        }
    }


}