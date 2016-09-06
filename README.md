# cycle-socketcluster

# A socketcluster driver for Cycle.js

npm install cycle-socketcluster

    import {run} from '@cycle/xstream-run';
    import xs from 'xstream';
    import {makeDOMDriver} from '@cycle/dom';
    import {makeSCDriver} from 'cycle-socketcluster';
    
    var main = require('../main').default;

    let drivers = {
        DOM: makeDOMDriver('body'),
        Socket: makeSCDriver({
            // any socketcluster-client options here
            port: 8000,
            hostname: localhost
            ...
        }),
    };

    run(function (sources) {

    let incoming$ = sources.Socket.get('incomingEvent').map(e => e.incomingTopSecretData)   
    let outgoing$ = sources.DOM
        .select('#text-field')
        .events(`keypress`)
        .map(e => {
            return {
                messageType: 'outgoingTopSecretData',
                message: e.currentTarget.value + e.key,
            };
        })
        
     
     return {
        DOM: sources.DOM
        Socket: outgoing$
     }
    }, drivers);

